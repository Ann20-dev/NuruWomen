"""Editorial checks only. Does not translate free text or certify clinical equivalence."""
import json
import re
from app.config import DATA

GLOSSARY=json.loads((DATA/'glossary_sw.json').read_text(encoding='utf-8'))

def check_translation(source,target,source_version,translated_from_version):
    flags=[]
    numbers=lambda s:sorted(re.findall(r'\d+(?:[.,]\d+)?',s))
    if numbers(source)!=numbers(target):flags.append('number_mismatch')
    if source_version!=translated_from_version:flags.append('stale_source_version')
    en_neg=bool(re.search(r'\b(no|not|never|without|cannot|do not)\b',source,re.I))
    sw_neg=bool(re.search(r'\b(si|sio|hakuna|bila|usi\w*|hai\w*|hawa\w*)\b',target,re.I))
    if en_neg!=sw_neg:flags.append('possible_negation_mismatch')
    if re.search(r'\b(abortion|miscarriage|termination of pregnancy)\b',source,re.I):
        flags.append('pregnancy_ending_terminology_review')
    suggestions=[g for g in GLOSSARY if re.search(r'\b'+re.escape(g['en'])+r'\b',source,re.I)]
    return {'checks':flags,'glossary_suggestions':suggestions,'ready_to_publish':False,
            'status':'human_language_and_clinical_review_required',
            'limitations':'Numbers, negation and terminology checks are incomplete. No flags does not prove equivalence. Swahili entries are unreviewed drafts.'}
