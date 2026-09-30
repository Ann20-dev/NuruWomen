"""Start a real local Uvicorn process, test HTTP, and shut it down. No key printed."""
import json,os,secrets,socket,subprocess,sys,time
import httpx
from app.config import ROOT

if __name__=='__main__':
    with socket.socket() as sock:
        sock.bind(('127.0.0.1',0));port=sock.getsockname()[1]
    key=secrets.token_urlsafe(32);env=dict(os.environ,WHC_API_KEY=key,WHC_DEMO_MODE='true')
    process=subprocess.Popen([sys.executable,'-m','uvicorn','app.main:create_app','--factory','--host','127.0.0.1',
                              '--port',str(port),'--no-access-log'],cwd=ROOT,env=env,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    try:
        with httpx.Client(base_url=f'http://127.0.0.1:{port}',trust_env=False,timeout=3) as client:
            ready=False
            for _ in range(100):
                if process.poll() is not None:raise RuntimeError('Local API exited before startup completed')
                try:
                    if client.get('/health').status_code==200:ready=True;break
                except httpx.TransportError:pass
                time.sleep(.1)
            if not ready:raise RuntimeError('Local API did not become ready within the startup window')
            payload=json.loads((ROOT/'examples/analyze_sw.json').read_text(encoding='utf-8'))
            unauth=client.post('/v1/analyze',json=payload)
            response=client.post('/v1/analyze',headers={'X-API-Key':key},json=payload)
            assert unauth.status_code==401
            assert response.status_code==200
            assert response.json()['publication_allowed'] is False
            assert response.json()['evidence']['demo_matches']
            nuru_payload=json.loads((ROOT/'examples/nuru_analyze_sw.json').read_text(encoding='utf-8'))
            nuru=client.post('/v1/nuru/analyze',headers={'X-API-Key':key},json=nuru_payload)
            assert nuru.status_code==200 and nuru.json()['schema_version']=='nuru-ai-v2'
            assert nuru.json()['publication_allowed'] is False
            assert nuru.json()['routing']['suggestions'][0]['slug']=='severe-period-pain'
            result={'nuru_analyze_http':200,'real_http_server':True,'health':200,'unauthenticated_request':401,'authenticated_analyze':200,
                    'swahili_demo_cards_returned':True,'publication_allowed':False,'python':sys.version.split()[0]}
            (ROOT/'reports/http_smoke.json').write_text(json.dumps(result,indent=2)+'\n')
            print(json.dumps(result,indent=2))
    finally:
        process.terminate()
        try:process.wait(timeout=5)
        except subprocess.TimeoutExpired:process.kill();process.wait()
