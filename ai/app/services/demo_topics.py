"""Five-category routing with explicit cues, overlaps and abstention. Never diagnosis."""
import json
import re
import unicodedata
from app.config import DATA
CATALOG = json.loads((DATA/'taxonomy.json').read_text(encoding='utf-8'))

def normalized(text):
    return ''.join(c for c in unicodedata.normalize('NFKC',text).lower() if unicodedata.category(c)!='Cf')

def pattern(phrase):
    return r'(?<!\w)' + r'\s+'.join(re.escape(p) for p in phrase.split()) + r'(?!\w)'

def has(text,phrase):
    return bool(re.search(pattern(phrase),text))

def classify_demo(text):
    clean=normalized(text)
    categories=[]
    for topic in CATALOG['topics']:
        candidate=clean
        for phrase in topic['ignore_phrases']:
            candidate=re.sub(pattern(phrase),' ',candidate)
        cues=[kw for kw in topic['keywords'] if has(candidate,kw)]
        if cues:categories.append({'id':topic['id'],'score':len(cues),'matched_cues':cues})
    # Keep the canonical order: these are multi-label suggestions, not ranked diseases.
    abortion=any(has(clean,kw) for kw in CATALOG['subtopics'][0]['keywords'])
    ambiguous=any(has(clean,kw) for kw in CATALOG['ambiguous_pregnancy_loss_terms'])
    outside=any(has(clean,kw) for kw in CATALOG['out_of_scope_keywords'])
    # "termination of pregnancy" is within the configured abortion subtopic.
    if abortion:outside=any(has(re.sub(pattern('termination of pregnancy'),' ',clean),kw) for kw in CATALOG['out_of_scope_keywords'])
    return {'taxonomy_version':CATALOG['version'],'categories':categories,
            'category_ids':[c['id'] for c in categories],
            'subtopic_ids':['abortion'] if abortion else [],
            'ambiguous_pregnancy_loss_wording':ambiguous,
            'outside_demo_cue':outside,
            'scope_status':'mixed_scope' if categories and outside else 'in_demo' if categories else 'needs_human_routing',
            'needs_topic_review':True,'diagnosis':False,'method':'explicit_bilingual_cues'}
