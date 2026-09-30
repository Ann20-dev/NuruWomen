from copy import deepcopy
from datetime import date
from app.services.retrieval import CARDS,retrieve,eligible,content_digest

TODAY=date(2026,9,25)

def approved_pair():
    en=deepcopy(next(c for c in CARDS if c['id']=='period-pain-en'))
    sw=deepcopy(next(c for c in CARDS if c['id']=='period-pain-sw'))
    for card in [en,sw]:
        card['demo_only']=False
        r={'status':'approved','reviewer_id':'synthetic-test-reviewer','reviewed_version':card['version'],
           'content_sha256':content_digest(card),'reviewed_at':'2026-09-01','valid_until':'2026-10-01'}
        card['clinical_review']=r;card['translation_review']=r.copy()
    return [en,sw]

def test_bundled_cards_never_approved():
    assert len(CARDS)==12 and not any(eligible(c,CARDS,TODAY) for c in CARDS)
    r=retrieve('period pain','menstrual_health','en')
    assert not r['approved_matches'] and not r['demo_matches']

def test_demo_opt_in_and_language():
    r=retrieve('hedhi maumivu','menstrual_health','sw',True)
    assert r['demo_matches'] and all(x['language']=='sw' for x in r['demo_matches'])
    assert not any(x['eligible_for_publication'] for x in r['demo_matches'])

def test_exact_version_digest_and_review_dates():
    cards=approved_pair();assert all(eligible(c,cards,TODAY) for c in cards)
    cards[0]['body']+=' Altered content.'
    assert not eligible(cards[0],cards,TODAY) and not eligible(cards[1],cards,TODAY)

def test_expiry_and_missing_reviewer():
    cards=approved_pair();assert not eligible(cards[0],cards,date(2027,1,1))
    cards[0]['clinical_review']['reviewer_id']=None
    assert not eligible(cards[0],cards,TODAY)

def test_stale_translation_and_withdrawal():
    cards=approved_pair();cards[0]['version']='3.0.0'
    assert not eligible(cards[1],cards,TODAY)
    cards=approved_pair();cards[0]['withdrawn']=True
    assert not eligible(cards[0],cards,TODAY) and not eligible(cards[1],cards,TODAY)


def test_requested_category_blocks_other_cards():
    result=retrieve('abortion mental health postpartum','menstrual_health','en',True)
    assert [r['id'] for r in result['demo_matches']]==['period-pain-en']
    assert retrieve('period pain',None,'en',True)['demo_matches']==[]
