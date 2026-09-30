"""Validated process settings. No secret defaults or automatic .env loading."""
from dataclasses import dataclass
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data'
MAX_BODY_BYTES = 65536

@dataclass(frozen=True)
class Settings:
    api_key: str
    demo_mode: bool = True

    @classmethod
    def from_env(cls):
        key = os.environ.get('WHC_API_KEY', '')
        if len(key) < 32 or key.startswith('REPLACE_') or not key.isascii() or any(c.isspace() for c in key):
            raise RuntimeError('Set WHC_API_KEY to a randomly generated ASCII token of at least 32 characters.')
        if os.environ.get('WHC_DEMO_MODE', 'true').lower() != 'true':
            raise RuntimeError('This release supports synthetic demonstrations only; real health use is not enabled.')
        return cls(api_key=key)
