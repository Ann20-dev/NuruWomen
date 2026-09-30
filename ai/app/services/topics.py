"""Supervised TF-IDF + logistic-regression routing baseline, fit on training data only."""
import json
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from app.config import DATA

LABELS=('menstrual_health','healthy_aging','postpartum','sexual_health','mental_health')
# Remove shared question scaffolding. Topic words and important medical negations stay.
STOP_WORDS='i my me the a an is are do does can could how what why where about to of for in and with it that this would like want information understand learn explanation questions question nina nataka kuhusu kwa nini ni na ya wa yangu ningependa kuelewa maelezo ninaweza ninahitaji wapi gani je'.split()
MIN_MARGIN=0.20  # Routing heuristic, not a clinical probability.

def detect_language(text):
    words=set(re.findall(r'\w+',text.lower()))
    en=len(words & {'the','my','is','are','what','how','period','periods','sleep','doctor','bleeding'})
    sw=len(words & {'nina','hedhi','damu','usingizi','daktari','homoni','nini','kwa','na','yangu','ni'})
    return 'mixed' if en and sw else 'sw' if sw else 'en' if en else 'unknown'

class TopicEngine:
    def __init__(self):
        self.rows=json.loads((DATA/'topic_train.json').read_text(encoding='utf-8'))
        self.vectorizer=TfidfVectorizer(ngram_range=(1,2),sublinear_tf=True,strip_accents='unicode',stop_words=STOP_WORDS)
        self.matrix=self.vectorizer.fit_transform([r['text'] for r in self.rows])
        self.model=LogisticRegression(C=4.0,class_weight='balanced',max_iter=1000,random_state=7)
        self.model.fit(self.matrix,[r['topic'] for r in self.rows])

    def classify(self,text):
        vector=self.vectorizer.transform([text])
        raw=self.model.decision_function(vector)[0]
        ranked=sorted(zip(self.model.classes_,map(float,raw)),key=lambda x:(-x[1],x[0]))
        margin=ranked[0][1]-ranked[1][1]
        uncertain=(vector.nnz==0 or margin<MIN_MARGIN)
        tags=[] if uncertain else [{'topic':str(label),'decision_score':round(score,4)} for label,score in ranked if score>0 and score>=ranked[0][1]-0.5][:2]
        return {'primary_topic':str(ranked[0][0]) if not uncertain else 'uncertain','topics':tags,
                'language_guess':detect_language(text),'needs_topic_review':True,
                'method':'tfidf_logistic_regression','score_meaning':'uncalibrated decision scores, not clinical probabilities',
                'decision_margin':round(margin,4),'model_version':'synthetic-five-topic-v3','training_examples':len(self.rows)}
