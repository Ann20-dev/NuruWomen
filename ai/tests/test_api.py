import json
import pytest
from app.config import Settings

DATA={'text':'My name is Demo Person, my number is 0712345678. I have severe period pain.',
      'response_language':'en','synthetic_only':True,'include_demo_cards':True}

def test_health_and_auth(client,headers):
    assert client.get('/health').json()['mode']=='synthetic_demo'
    assert client.post('/v1/analyze',json=DATA).status_code==401
    assert client.post('/v1/analyze',headers={'X-API-Key':'wrong'},json=DATA).status_code==401
    r=client.post('/v1/analyze',headers=headers,json=DATA)
    assert r.status_code==200 and r.headers['cache-control']=='no-store'
    assert r.json()['publication_allowed'] is False
    assert 'Demo Person' not in r.text and '0712345678' not in r.text
    assert r.json()['safety']['status']=='potential_urgent_concern'

@pytest.mark.parametrize('body',[
 {'text':'   ','synthetic_only':True}, {'text':'x'*3001,'synthetic_only':True},
 {'text':'test','synthetic_only':False},{'text':'test'},
 {'text':'test','synthetic_only':True,'phone':'sensitive'},
 {'text':['sensitive text'],'synthetic_only':True},
 {'text':'test','synthetic_only':True,'response_language':'fr'}])
def test_invalid_requests_do_not_echo_text(client,headers,body):
    r=client.post('/v1/analyze',headers=headers,json=body)
    assert r.status_code==422 and 'sensitive' not in r.text

def test_oversized_and_malformed_bodies(client,headers):
    r=client.post('/v1/analyze',headers=headers,content=b'x'*70000)
    assert r.status_code==413
    r=client.post('/v1/analyze',headers=headers,content=b'{"text":"private-demo",',)
    assert r.status_code==422 and 'private-demo' not in r.text

def test_extra_health_text_in_analytics_rejected(client,headers):
    r=client.post('/v1/gaps',headers=headers,json={'month':'2026-09','synthetic_only':True,'records':[
        {'submission_id':'demo-1','topic':'healthy_aging','language':'sw','analytics_consent':True,'has_approved_card':False,'text':'private-demo'}]})
    assert r.status_code==422 and 'private-demo' not in r.text

def test_all_processing_routes_require_key(client):
    for route in ['privacy','classify','retrieve','analyze','translation-check','gaps']:
        assert client.post('/v1/'+route,json={}).status_code==401

def test_config_fails_closed(monkeypatch):
    monkeypatch.delenv('WHC_API_KEY',raising=False)
    with pytest.raises(RuntimeError):Settings.from_env()
    monkeypatch.setenv('WHC_API_KEY','REPLACE_'+'x'*40)
    with pytest.raises(RuntimeError):Settings.from_env()
    monkeypatch.setenv('WHC_API_KEY','x'*40);monkeypatch.setenv('WHC_DEMO_MODE','false')
    with pytest.raises(RuntimeError):Settings.from_env()
