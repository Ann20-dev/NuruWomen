"""Unreviewed broad alert examples. A non-match must never become a safety verdict."""
import json
import re
import unicodedata
from app.config import DATA

RULES = json.loads((DATA / 'safety_rules.json').read_text(encoding='utf-8'))

def check_safety(text: str, language: str = 'en') -> dict:
    normalized = ''.join(c for c in unicodedata.normalize('NFKC',text).lower() if unicodedata.category(c) != 'Cf')
    found = []
    for rule in RULES['rules']:
        if (any(re.search(p, normalized) for p in rule['patterns'])
                and all(re.search(p, normalized) for p in rule.get('all_patterns', []))):
            found.append(rule['id'])
    messages = {
        'en': 'DEMO NOTICE: If you may be in immediate danger or seriously unwell, seek urgent help from a local health service. Do not wait for an online reply. These prototype rules cannot assess your safety.',
        'sw': 'UJUMBE WA MAJARIBIO: Ikiwa uko hatarini au unaumwa sana, tafuta msaada wa haraka katika kituo cha afya. Usisubiri jibu mtandaoni. Mfumo huu wa majaribio hauwezi kutathmini usalama wako.'
    }
    return {'status':'potential_urgent_concern' if found else 'no_rule_match', 'rule_ids':found,
            'message':messages[language] if found else None, 'human_review_required':True,
            'rule_review_status':RULES['review_status'], 'clinically_validated':False,
            'limitations':'No match is not reassurance. Negated, historical or quoted language may still trigger an alert; indirect urgent wording may be missed.'}
