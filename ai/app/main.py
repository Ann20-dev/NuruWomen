"""Internal API. No database, request-text logs, generative answers or outbound AI calls."""
from contextlib import asynccontextmanager
import secrets
from fastapi import FastAPI, Depends, Security, HTTPException, Request
from fastapi.security import APIKeyHeader
from fastapi.exceptions import RequestValidationError
from starlette.responses import JSONResponse
from app import __version__
from app.config import Settings, MAX_BODY_BYTES
from app.schemas import TextRequest, AnalyzeRequest, TranslationRequest, GapRequest, NuruRequest
from app.services.privacy import inspect_privacy
from app.services.safety import check_safety
from app.services.topics import TopicEngine
from app.services.retrieval import retrieve
from app.services.translation import check_translation
from app.services.analytics import gap_board
from app.services.nuru import routing
from app.services.demo_topics import CATALOG

class BodyLimit:
    """Count actual bytes, including chunked bodies; never trust Content-Length alone."""
    def __init__(self,app): self.app=app
    async def __call__(self,scope,receive,send):
        if scope['type']!='http':return await self.app(scope,receive,send)
        chunks=[];total=0
        while True:
            message=await receive()
            if message['type']=='http.disconnect':return
            total+=len(message.get('body',b''))
            if total>MAX_BODY_BYTES:
                return await JSONResponse({'detail':'Request body too large'},status_code=413)(scope,receive,send)
            chunks.append(message.get('body',b''))
            if not message.get('more_body',False):break
        sent=False
        async def replay():
            nonlocal sent
            if not sent:
                sent=True
                return {'type':'http.request','body':b''.join(chunks),'more_body':False}
            return await receive()
        await self.app(scope,replay,send)


def create_app(settings=None):
    settings=settings or Settings.from_env()
    if not settings.demo_mode:raise RuntimeError('Only demo mode is implemented')
    @asynccontextmanager
    async def lifespan(app):
        app.state.topics=TopicEngine()
        yield
    app=FastAPI(title='WHC AI - synthetic demonstration',version=__version__,lifespan=lifespan,
                description='Internal server-to-server API. All bundled health content/rules are unreviewed. Never send real health records to this demo.')
    app.add_middleware(BodyLimit)
    header=APIKeyHeader(name='X-API-Key',auto_error=False)
    def authenticate(key=Security(header)):
        if not isinstance(key,str) or not key.isascii() or not secrets.compare_digest(key,settings.api_key):
            raise HTTPException(status_code=401,detail='Invalid service credentials')
    auth=[Depends(authenticate)]

    @app.middleware('http')
    async def no_cache(request,call_next):
        response=await call_next(request)
        response.headers['Cache-Control']='no-store'
        response.headers['X-Content-Type-Options']='nosniff'
        return response

    @app.exception_handler(RequestValidationError)
    async def safe_validation(request,exc):
        # FastAPI's default error can echo user input. Omit input, context and message.
        return JSONResponse({'detail':'Invalid request. Check field types and limits in /docs.'},status_code=422)

    @app.get('/health')
    def health():return {'status':'ok','version':__version__,'mode':'synthetic_demo','clinically_validated':False}

    @app.get('/v1/nuru/topics',dependencies=auth)
    def topic_catalog():return CATALOG

    def topic_for(text):return app.state.topics.classify(inspect_privacy(text)['redacted_text'])

    def routed_evidence(text,language,include_demo):
        route=routing(text)
        return retrieve(text,route['broad_topic_for_retrieval'],language,include_demo,'abortion' if 'abortion' in route['subtopic_ids'] else None)

    @app.post('/v1/privacy',dependencies=auth)
    def privacy(payload:TextRequest):return inspect_privacy(payload.text)

    @app.post('/v1/classify',dependencies=auth)
    def classify(payload:TextRequest):return topic_for(payload.text)

    @app.post('/v1/retrieve',dependencies=auth)
    def search(payload:AnalyzeRequest):
        cleaned=inspect_privacy(payload.text)['redacted_text']
        return routed_evidence(cleaned,payload.response_language,payload.include_demo_cards)

    @app.post('/v1/analyze',dependencies=auth)
    def analyze(payload:AnalyzeRequest):
        privacy=inspect_privacy(payload.text)
        topics=app.state.topics.classify(privacy['redacted_text'])
        # Safety reads original text in memory so redaction cannot remove a warning cue.
        safety=check_safety(payload.text,payload.response_language)
        return {'schema_version':'1.0','mode':'synthetic_demo','privacy':privacy,'safety':safety,'classification':topics,
                'evidence':routed_evidence(privacy['redacted_text'],payload.response_language,payload.include_demo_cards),
                'publication_allowed':False,'decision_owner':'human_moderator',
                'notice':'Prototype assistance only. No diagnosis, verified anonymity or clinical clearance.'}

    @app.post('/v1/translation-check',dependencies=auth)
    def translation(payload:TranslationRequest):
        return check_translation(payload.source_text,payload.target_text,payload.source_version,payload.translated_from_version)

    @app.post('/v1/gaps',dependencies=auth)
    def gaps(payload:GapRequest):
        try:return gap_board(payload.records,payload.month)
        except ValueError:raise HTTPException(status_code=422,detail='Duplicate submission IDs')
    @app.post('/v1/nuru/analyze',dependencies=auth)
    def nuru_analyze(payload:NuruRequest):
        # Scan separately to preserve exact title/body offsets for the app.
        title_privacy = inspect_privacy(payload.title)
        content_privacy = inspect_privacy(payload.content)
        cleaned = title_privacy['redacted_text'] + '\n' + content_privacy['redacted_text']
        route = routing(cleaned)
        evidence = {'approved_matches': [], 'demo_matches': [], 'language': payload.response_language,
                    'approved_answer_available': False, 'language_fallback_used': False}
        if route['broad_topic_for_retrieval']:
            evidence = retrieve(cleaned, route['broad_topic_for_retrieval'], payload.response_language, payload.include_demo_cards, 'abortion' if 'abortion' in route['subtopic_ids'] else None)
        reasons = ['topic_confirmation']
        if title_privacy['contains_detected_identifiers'] or content_privacy['contains_detected_identifiers']:
            reasons.append('identifier_review')
        safety = check_safety(payload.title + '\n' + payload.content, payload.response_language)
        if safety['rule_ids']:reasons.append('potential_urgent_concern')
        if route['scope_status'] != 'in_demo':reasons.append('scope_review')
        if route['ambiguous_pregnancy_loss_wording']:reasons.append('pregnancy_loss_wording_review')
        if not evidence['approved_answer_available']:reasons.append('no_approved_answer_in_requested_language')
        return {'schema_version': 'nuru-ai-v2', 'mode': 'synthetic_demo',
                'privacy': {'title': title_privacy, 'content': content_privacy},
                'safety': safety,
                'review': {'required': True, 'reason_codes': reasons, 'knowledge_status': 'approved_content_available' if evidence['approved_answer_available'] else 'no_approved_answer', 'clinical_authority_verified_by_ai': False},
                'routing': route, 'classification': app.state.topics.classify(cleaned),
                'evidence': evidence, 'publication_allowed': False,
                'decision_owner': 'human_moderator',
                'notice': 'Unreviewed prototype. Suggestions do not establish anonymity, safety or a diagnosis.'}
    return app
