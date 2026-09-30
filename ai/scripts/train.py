"""Fit the reproducible baseline and report its build metadata; no unsafe pickle files."""
import hashlib
import json
from app.config import DATA, ROOT
from app.services.topics import TopicEngine

if __name__=='__main__':
    engine=TopicEngine()
    report={'method':'TF-IDF + logistic regression','examples':len(engine.rows),
            'vocabulary_size':len(engine.vectorizer.vocabulary_),
            'training_sha256':hashlib.sha256((DATA/'topic_train.json').read_bytes()).hexdigest(),
            'persisted_model':False,'reason':'The small model is rebuilt from the bundled training data on startup.'}
    (ROOT/'reports').mkdir(exist_ok=True)
    (ROOT/'reports/model_build.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report,indent=2))
