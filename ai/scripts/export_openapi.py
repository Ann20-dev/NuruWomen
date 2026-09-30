"""Export a versioned integration contract, without embedding any service credentials."""
import json,secrets
from app.config import ROOT,Settings
from app.main import create_app
if __name__=='__main__':
    app=create_app(Settings(api_key=secrets.token_urlsafe(32)))
    target=ROOT/'docs/openapi.json'
    target.write_text(json.dumps(app.openapi(),indent=2)+'\n')
    print('Wrote docs/openapi.json')
