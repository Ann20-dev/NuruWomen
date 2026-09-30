import secrets
import pytest
from fastapi.testclient import TestClient
from app.config import Settings
from app.main import create_app

@pytest.fixture
def key():return secrets.token_urlsafe(32)

@pytest.fixture
def client(key):
    with TestClient(create_app(Settings(api_key=key))) as client:yield client

@pytest.fixture
def headers(key):return {'X-API-Key':key}
