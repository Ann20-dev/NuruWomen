"""Local API demonstration using synthetic examples, no external server or real data."""
import json
import secrets
from fastapi.testclient import TestClient
from app.config import ROOT,DATA,Settings
from app.main import create_app

if __name__=='__main__':
    key=secrets.token_urlsafe(32)
    with TestClient(create_app(Settings(api_key=key))) as client:
        headers={'X-API-Key':key}
        examples={}
        for language,text in [('en','My name is Demo Person, my number is 0712345678. I have severe period pain.'),
                              ('sw','Naitwa Mtu Mfano, nina maumivu makali wakati wa hedhi.')]:
            response=client.post('/v1/analyze',headers=headers,json={'text':text,'response_language':language,'synthetic_only':True,'include_demo_cards':True})
            response.raise_for_status();examples[language]=response.json()
        gap=client.post('/v1/gaps',headers=headers,json=json.loads((DATA/'gap_demo.json').read_text()))
        gap.raise_for_status();examples['gap_board']=gap.json()
    (ROOT/'reports').mkdir(exist_ok=True)
    (ROOT/'reports/demo_output.json').write_text(json.dumps(examples,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    print(json.dumps(examples,indent=2,ensure_ascii=False))
