"""Regressions found in the uploaded Shakespeare app; synthetic inputs only."""
import pytest
from app.services.privacy import inspect_privacy
from app.services.safety import check_safety
from app.services.nuru import routing, suggest_nuru_topics

@pytest.mark.parametrize('text', ['I have a question about my health.', 'I walk for 45 minutes every day.', 'Contact 0712345678.', 'I like grapes.'])
def test_false_topic_matches_removed(text):
    assert suggest_nuru_topics(text) == []

@pytest.mark.parametrize('text,slug', [('Nina maumivu makali wakati wa hedhi.', 'severe-period-pain'), ('Ninatokwa na damu nyingi na ninazimia.', 'heavy-bleeding'), ('Tell me about PCOS.', 'pcos'), ('Ninahitaji maelezo ya uzazi wa mpango.', 'contraception')])
def test_bilingual_detailed_routing(text,slug):
    assert slug in [x['slug'] for x in suggest_nuru_topics(text)]

def test_no_condition_inference_from_symptom():
    assert 'pcos' not in [x['slug'] for x in suggest_nuru_topics('facial hair and acne')]
    assert 'endometriosis' not in [x['slug'] for x in suggest_nuru_topics('painful periods and sex')]

def test_no_broad_class_for_unsupported_topic():
    r=routing('I want information about infertility.')
    assert r['broad_topic_for_retrieval'] is None and r['scope_status']=='needs_human_routing'

def test_pregnancy_phrase_preserved():
    text='Mimi ni mjamzito na nina maumivu.'
    assert inspect_privacy(text)['redacted_text']==text

def test_name_redaction_does_not_swallow_health_clause():
    assert inspect_privacy('Naitwa Amina na nina maumivu.')['redacted_text']=='Naitwa [NAME] na nina maumivu.'

def test_safety_false_positives_and_swahili():
    assert check_safety('I like grapes.')['rule_ids']==[]
    assert 'pregnancy_concern' not in check_safety('I have been bleeding for two weeks.')['rule_ids']
    assert set(check_safety('Ninatokwa na damu nyingi na ninazimia.','sw')['rule_ids'])=={'heavy_bleeding','fainting'}
    assert 'pregnancy_concern' in check_safety('Mimi ni mjamzito na ninatokwa na damu.','sw')['rule_ids']

def test_nuru_endpoint_and_separate_offsets(client,headers):
    payload={'title':'Synthetic period pain question', 'content':'🌍 My name is Demo Person, I have severe period pain.', 'response_language':'sw', 'synthetic_only':True, 'include_demo_cards':True}
    assert client.post('/v1/nuru/analyze',json=payload).status_code==401
    response=client.post('/v1/nuru/analyze',headers=headers,json=payload)
    assert response.status_code==200
    r=response.json()
    assert r['schema_version']=='nuru-ai-v2' and r['publication_allowed'] is False
    assert 'Demo Person' not in response.text
    assert r['privacy']['content']['offset_unit']=='unicode_codepoints'
    assert r['routing']['suggestions'][0]['slug']=='severe-period-pain'
    assert r['evidence']['approved_matches']==[]
    assert all(c['language']=='sw' for c in r['evidence']['demo_matches'])

@pytest.mark.parametrize('change',[{'title':'x'*121},{'content':'x'*2880},{'synthetic_only':False},{'response_language':'fr'},{'unexpected':'private-synthetic'}])
def test_nuru_rejects_invalid_input(client,headers,change):
    payload={'title':'Synthetic question','content':'I have period pain.','response_language':'en','synthetic_only':True}|change
    response=client.post('/v1/nuru/analyze',headers=headers,json=payload)
    assert response.status_code==422 and 'private-synthetic' not in response.text

def test_outside_mapping_suppresses_retrieval(client,headers):
    r=client.post('/v1/nuru/analyze',headers=headers,json={'title':'Synthetic infertility question','content':'Tell me about infertility.','response_language':'en','synthetic_only':True,'include_demo_cards':True}).json()
    assert r['routing']['scope_status']=='needs_human_routing'
    assert r['evidence']['approved_matches']==[] and r['evidence']['demo_matches']==[]

@pytest.mark.parametrize('text,expected',[
 ('Explain menstrual health.', ['menstrual_health']),
 ('Nataka maelezo kuhusu afya ya hedhi.', ['menstrual_health']),
 ('Information on healthy ageing.', ['healthy_aging']),
 ('Ukomo wa hedhi ni nini?', ['healthy_aging']),
 ('Explain postpartum recovery.', ['postpartum']),
 ('Nataka kujifunza kuhusu kunyonyesha.', ['postpartum']),
 ('What is contraception?', ['sexual_health']),
 ('Maambukizi ya zinaa ni nini?', ['sexual_health']),
 ('Information on mental health.', ['mental_health']),
 ('Nina wasiwasi baada ya kujifungua.', ['postpartum','mental_health']),
 ('Tell me about abortion.', ['sexual_health']),
 ('Nataka maelezo kuhusu utoaji mimba.', ['sexual_health']),
 ('Emotional support after abortion.', ['sexual_health','mental_health']),
 ('Msaada wa kihisia baada ya kutoa mimba.', ['sexual_health','mental_health']),
 ('I am 45 and enjoy walking.', []),
 ('What is a urinary tract infection?', []),
])
def test_five_category_routing_and_overlap(text,expected):
    assert routing(text)['category_ids']==expected

def test_ambiguous_loss_not_forced_into_abortion():
    r=routing('Nina huzuni baada ya kuharibika kwa mimba.')
    assert r['ambiguous_pregnancy_loss_wording'] and r['subtopic_ids']==[]
    assert r['broad_topic_for_retrieval'] is None

def test_safety_still_runs_outside_demo(client,headers):
    r=client.post('/v1/nuru/analyze',headers=headers,json={'title':'Synthetic example','content':'I am pregnant and bleeding.','response_language':'en','synthetic_only':True}).json()
    assert 'pregnancy_concern' in r['safety']['rule_ids']
    assert r['routing']['category_ids']==[] and r['review']['required']
    assert 'scope_review' in r['review']['reason_codes']

def test_catalog_and_missing_approved_content(client,headers):
    assert client.get('/v1/nuru/topics').status_code==401
    catalog=client.get('/v1/nuru/topics',headers=headers).json()
    assert len(catalog['topics'])==5
    r=client.post('/v1/nuru/analyze',headers=headers,json={'title':'Synthetic example','content':'Tell me about abortion.','response_language':'sw','synthetic_only':True,'include_demo_cards':True}).json()
    assert r['routing']['subtopic_ids']==['abortion']
    assert [c['id'] for c in r['evidence']['demo_matches']]==['abortion-sw']
    assert r['review']['knowledge_status']=='no_approved_answer'
    assert not r['review']['clinical_authority_verified_by_ai']
