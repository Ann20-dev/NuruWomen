"""Run from ai/: python examples/client.py (requires a running local API)."""
import json,os
from pathlib import Path
from urllib.request import Request,urlopen
key=os.environ['WHC_API_KEY']
body=(Path(__file__).parent/'analyze_en.json').read_bytes()
request=Request('http://127.0.0.1:8000/v1/analyze',data=body,
                headers={'Content-Type':'application/json','X-API-Key':key},method='POST')
with urlopen(request,timeout=10) as response:
    print(json.dumps(json.load(response),indent=2,ensure_ascii=False))
