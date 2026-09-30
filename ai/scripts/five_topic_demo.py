"""Run every demo category and selected overlaps, with no external calls or credentials printed."""
import json
import secrets
from fastapi.testclient import TestClient
from app.config import ROOT, Settings
from app.main import create_app

if __name__ == '__main__':
    key=secrets.token_urlsafe(32)
    examples=json.loads((ROOT/'examples/five_topic_demo.json').read_text(encoding='utf-8'))
    results=[]
    with TestClient(create_app(Settings(api_key=key))) as client:
        for example in examples:
            response=client.post('/v1/nuru/analyze',headers={'X-API-Key':key},json=example['request'])
            response.raise_for_status()
            result=response.json()
            assert result['routing']['category_ids']==example['expected_categories']
            assert result['publication_allowed'] is False
            results.append({'expected_categories':example['expected_categories'],'response':result})
    (ROOT/'reports/five_topic_demo.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'{len(results)} fictional demo cases passed. Wrote reports/five_topic_demo.json.')
