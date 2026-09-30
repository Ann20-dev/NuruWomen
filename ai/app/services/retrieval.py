"""Retrieve exact-language demo cards; independent approval checks fail closed."""
import hashlib
import json
import re
from datetime import date
from app.config import DATA

CARDS=json.loads((DATA/'evidence_cards.json').read_text(encoding='utf-8'))

def content_digest(card):
    fields={k:card[k] for k in ['id','language','version','source_version','title','body','topic','sources']}
    return hashlib.sha256(json.dumps(fields,sort_keys=True,ensure_ascii=False,separators=(',',':')).encode()).hexdigest()

def approval_valid(review,card,today):
    try:
        return (review['status']=='approved' and bool(review['reviewer_id'])
                and review['reviewed_version']==card['version']
                and review['content_sha256']==content_digest(card)
                and date.fromisoformat(review['reviewed_at'])<=today<=date.fromisoformat(review['valid_until']))
    except (KeyError,TypeError,ValueError):
        return False

def eligible(card,all_cards,today=None):
    today=today or date.today()
    if card.get('demo_only',True) or card.get('withdrawn',True): return False
    if not approval_valid(card.get('clinical_review',{}),card,today): return False
    if card['language']=='sw':
        original=next((c for c in all_cards if c['id']==card.get('source_card_id') and c['language']=='en'),None)
        if not original or card['source_version']!=original['version']: return False
        if not eligible(original,all_cards,today):return False
        if not approval_valid(card.get('translation_review',{}),card,today):return False
    return True

def retrieve(text,topic,language='en',include_demo=False,subtopic=None):
    terms=set(re.findall(r'\w+',text.lower()))
    results=[]
    for card in CARDS:
        if card['language']!=language or card['topic']!=topic:continue
        if subtopic and subtopic not in card.get('subtopics',[]):continue
        if not subtopic and card.get('subtopics'):continue
        keywords=set(re.findall(r'\w+',' '.join(card['keywords']).lower()))
        overlap=len(terms&keywords)
        score=(2 if topic==card['topic'] else 0)+overlap
        if score<=0:continue
        approved=eligible(card,CARDS)
        if not approved and not (include_demo and card.get('demo_only')):continue
        results.append({'id':card['id'],'title':card['title'],'body':card['body'],'language':language,
                        'version':card['version'],'source_version':card['source_version'],
                        'sources':card['sources'],'ranking_score':score,
                        'clinical_review_status':card['clinical_review']['status'],
                        'translation_review_status':card['translation_review']['status'],
                        'eligible_for_publication':approved,'demo_only':card['demo_only']})
    results.sort(key=lambda r:(-r['ranking_score'],r['id']))
    return {'approved_matches':[r for r in results if r['eligible_for_publication']][:3],
            'demo_matches':[r for r in results if not r['eligible_for_publication']][:3],
            'language':language,'approved_answer_available':any(r['eligible_for_publication'] for r in results),
            'method':'keyword_and_topic_ranking','language_fallback_used':False}
