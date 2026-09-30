"""Save a synthetic response for the browser contract checks; no key printed."""
import json,secrets
from fastapi.testclient import TestClient
from app.config import ROOT,Settings
from app.main import create_app
if __name__=='__main__':
    key=secrets.token_urlsafe(32)
    with TestClient(create_app(Settings(api_key=key))) as client:
        request=json.loads((ROOT/'examples/nuru_analyze_sw.json').read_text(encoding='utf-8'))
        response=client.post('/v1/nuru/analyze',json=request,headers={'X-API-Key':key})
        response.raise_for_status()
        (ROOT/'reports/nuru_demo_response.json').write_text(json.dumps(response.json(),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Wrote reports/nuru_demo_response.json using synthetic data.')
