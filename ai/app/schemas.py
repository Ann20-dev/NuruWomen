"""Strict request contracts; private text is never accepted in analytics records."""
from typing import Literal
from pydantic import BaseModel, ConfigDict, Field, field_validator

Topic = Literal['menstrual_health', 'healthy_aging', 'postpartum', 'sexual_health', 'mental_health']
Language = Literal['en', 'sw', 'mixed', 'unknown']

class StrictModel(BaseModel):
    model_config = ConfigDict(extra='forbid')

class TextRequest(StrictModel):
    text: str = Field(min_length=1, max_length=3000)
    response_language: Literal['en', 'sw'] = 'en'
    synthetic_only: Literal[True]

    @field_validator('text')
    @classmethod
    def meaningful_text(cls, v):
        if not v.strip():
            raise ValueError('Text cannot be blank')
        if any(ord(c) < 32 and c not in '\n\r\t' for c in v):
            raise ValueError('Unsupported control character')
        return v  # Keep offsets aligned with the original text, including whitespace.

class AnalyzeRequest(TextRequest):
    include_demo_cards: bool = False

class TranslationRequest(StrictModel):
    source_text: str = Field(min_length=1, max_length=3000)
    target_text: str = Field(min_length=1, max_length=3000)
    source_version: str = Field(pattern=r'^[A-Za-z0-9._-]{1,32}$')
    translated_from_version: str = Field(pattern=r'^[A-Za-z0-9._-]{1,32}$')
    synthetic_only: Literal[True]

class GapRecord(StrictModel):
    submission_id: str = Field(pattern=r'^demo-[A-Za-z0-9-]{1,40}$')
    topic: Topic
    language: Literal['en', 'sw', 'mixed']
    analytics_consent: bool
    has_approved_card: bool

class GapRequest(StrictModel):
    month: str = Field(pattern=r'^20\d{2}-(0[1-9]|1[0-2])$')
    records: list[GapRecord] = Field(max_length=200)
    synthetic_only: Literal[True]


class NuruRequest(StrictModel):
    title: str = Field(min_length=1, max_length=120)
    content: str = Field(min_length=1, max_length=2879)
    response_language: Literal['en', 'sw']
    synthetic_only: Literal[True]
    include_demo_cards: bool = False

    @field_validator('title', 'content')
    @classmethod
    def meaningful_text(cls, value):
        return TextRequest.meaningful_text(value)
