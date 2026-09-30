import pytest
from app.services.privacy import inspect_privacy

@pytest.mark.parametrize('value',['0712345678','0112345678','+254712345678','254112345678','00254712345678','0712 345 678','+254 712 345 678'])
def test_kenyan_phone_formats(value):
    result=inspect_privacy('Demo number: '+value)
    assert '[PHONE]' in result['redacted_text'] and value not in result['redacted_text']

@pytest.mark.parametrize('text,kind',[
 ('My name is Demo Person, I have a question.','NAME'),
 ('Naitwa Mtu Mfano, nina swali.','NAME'),
 ('Contact demo@example.invalid for this fictional exercise.','EMAIL'),
 ('My national ID: 12345678.','IDENTIFIER'),
 ('Ninaishi Mtaa wa Mfano, nina swali.','LOCATION'),
 ('My account is @demo_handle.','HANDLE')])
def test_context_patterns(text,kind):
    r=inspect_privacy(text);assert any(s['kind']==kind for s in r['spans'])
    assert not r['anonymity_guaranteed'] and r['requires_user_confirmation']

def test_offsets_are_original_unicode_codepoints():
    text='🌍 My number is 0712345678.';r=inspect_privacy(text)
    s=r['spans'][0];assert text[s['start']:s['end']]=='0712345678'

def test_email_overlap_and_multiple_spans():
    r=inspect_privacy('My name is Demo Person, email demo@example.invalid, phone 0712345678.')
    assert [x['kind'] for x in r['spans']]==['NAME','EMAIL','PHONE']
    assert 'demo@example.invalid' not in r['redacted_text']

def test_health_text_preserved():
    text='Nina maumivu wakati wa hedhi.'
    assert inspect_privacy(text)['redacted_text']==text

def test_invisible_char_warning():
    assert len(inspect_privacy('0712\u200b345678')['warnings'])==2
