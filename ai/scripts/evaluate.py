"""Descriptive synthetic routing evaluation, not independent clinical validation."""
from datetime import datetime,timezone
import json
from sklearn.metrics import accuracy_score,classification_report
from app.config import DATA,ROOT
from app.services.topics import TopicEngine,LABELS
from app.services.privacy import inspect_privacy

def evaluate():
    train=json.loads((DATA/'topic_train.json').read_text(encoding='utf-8'))
    test=json.loads((DATA/'topic_test.json').read_text(encoding='utf-8'))
    assert not ({r['family_id'] for r in train}&{r['family_id'] for r in test})
    assert not ({r['text'].casefold() for r in train}&{r['text'].casefold() for r in test})
    engine=TopicEngine();results={};errors=[]
    for language in ['en','sw','mixed']:
        rows=[r for r in test if r['language']==language]
        expected=[r['topic'] for r in rows]
        predicted=[engine.classify(inspect_privacy(r['text'])['redacted_text'])['primary_topic'] for r in rows]
        results[language]={'n':len(rows),'accuracy':accuracy_score(expected,predicted),
                          'per_topic':classification_report(expected,predicted,labels=list(LABELS),output_dict=True,zero_division=0)}
        errors.extend({'example_id':r['id'],'expected':e,'predicted':p} for r,e,p in zip(rows,expected,predicted) if e!=p)
    return {'created_at_utc':datetime.now(timezone.utc).isoformat(),'training_n':len(train),'heldout_n':len(test),
            'split_unit':'question family, including all three language variants','results':results,'errors':errors,
            'limitations':['Small author-created synthetic benchmark with unreviewed translations.',
                          'No independent clinical validation, demographic fairness evidence or calibrated probabilities.',
                          'This evaluation set was inspected during baseline development; it is held out from fitting, not a blind final benchmark. Collect a new independently reviewed test set before pilot claims.',
                          'Five routing categories only; out-of-domain rejection is limited.',
                          'Privacy and safety unit tests are separate and do not establish population-level recall.']}

if __name__=='__main__':
    report=evaluate();(ROOT/'reports').mkdir(exist_ok=True)
    (ROOT/'reports/evaluation.json').write_text(json.dumps(report,indent=2)+'\n')
    lines=['# Synthetic evaluation results','',report['created_at_utc'],'',
           '| Language | Held-out examples | Primary-topic accuracy |','|---|---:|---:|']
    for lang,r in report['results'].items():lines.append(f"| {lang} | {r['n']} | {r['accuracy']:.1%} |")
    lines+=['','120 training examples; 60 held-out examples. All translations/paraphrases in a family remain in one split.','',
            'These numbers describe this small synthetic set only. They are not clinical accuracy or evidence of production readiness. This set was inspected while revising the baseline, so a new blind test set is needed.','',
            '## Observed mismatches','']+[f"- {e['example_id']}: expected {e['expected']}, predicted {e['predicted']}" for e in report['errors']]
    lines+=['','## Limitations','']+['- '+x for x in report['limitations']]
    (ROOT/'reports/EVALUATION.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print('\n'.join(lines))
