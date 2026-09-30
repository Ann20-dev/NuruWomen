"""Bridge to Shakespeare's existing granular slugs. Routing is not diagnosis."""
import json
import re
import unicodedata
from app.config import DATA
TAXONOMY = json.loads((DATA / 'nuru_taxonomy.json').read_text(encoding='utf-8'))

def suggest_nuru_topics(text):
    text = ''.join(c for c in unicodedata.normalize('NFKC', text).lower() if unicodedata.category(c) != 'Cf')
    matches = []
    for row in TAXONOMY['topics']:
        score = sum(bool(re.search(r'(?<!\w)' + r'\s+'.join(re.escape(x) for x in kw.split()) + r'(?!\w)', text)) for kw in row['keywords'])
        if score:
            matches.append({'slug': row['slug'], 'score': score, 'broad_topic': row['broad_topic']})
    return sorted(matches, key=lambda x: (-x['score'], x['slug']))[:3]

def routing(text):
    from app.services.demo_topics import classify_demo
    detail = suggest_nuru_topics(text)
    demo = classify_demo(text)
    ids = demo['category_ids']
    # Retrieval is held when outside-scope or ambiguous wording needs a reviewer.
    primary = ids[0] if ids and not demo['outside_demo_cue'] and not demo['ambiguous_pregnancy_loss_wording'] else None
    return {**demo, 'legacy_taxonomy_version': TAXONOMY['version'], 'suggestions': detail,
            'broad_topic_for_retrieval': primary}
