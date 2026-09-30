"""Conservative pattern suggestions, NOT anonymisation or general name recognition."""
import re
import unicodedata

PATTERNS = [
    ('EMAIL', re.compile(r'(?<![\w.+-])[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}', re.I), 0),
    ('PHONE', re.compile(r'(?<!\w)(?:(?:\+?254|00254)[\s.-]?[17]|0[17])(?:[\s.-]?\d){8}(?!\d)'), 0),
    ('IDENTIFIER', re.compile(r'\b(?:national\s*id|id\s*(?:number|no\.?)?|kitambulisho|passport)\s*[:#=-]?\s*([A-Z0-9-]{5,20})\b', re.I), 1),
    ('NAME', re.compile(r'\b(?:my name is|i am called|jina langu ni|ninaitwa|naitwa)\s+([\w\'-]+(?:[ \t]+[\w\'-]+){0,2})', re.I), 1),
    ('LOCATION', re.compile(r'\b(?:i live (?:at|in)|my address is|ninaishi(?:\s+(?:katika|mtaa\s+wa))?)\s+([^\n,.!?;]{2,70})', re.I), 1),
    ('HANDLE', re.compile(r'(?<!\w)@[A-Za-z0-9_]{3,30}\b'), 0),
]


def inspect_privacy(text: str) -> dict:
    # Keep original codepoint positions; reject zero-width obfuscation as a warning,
    # rather than silently changing the string and misaligning replacement offsets.
    candidates = []
    for kind, pattern, group in PATTERNS:
        for match in pattern.finditer(text):
            start, end = match.span(group)
            if kind == 'NAME':
                stop_words = {'i', 'and', 'but', 'have', 'am', 'na', 'nina', 'ninaumwa', 'ninahisi', 'mjamzito', 'maumivu', 'hedhi', 'damu'}
                for word in re.finditer(r"[\w'-]+", text[start:end]):
                    if word.group().lower() in stop_words:
                        end = start + word.start()
                        break
                while end > start and text[end-1].isspace():
                    end -= 1
                if end == start:
                    continue
            candidates.append({'kind': kind, 'start': start, 'end': end})
    # Prefer widest span for overlaps (email before embedded @handle).
    accepted = []
    for span in sorted(candidates, key=lambda x: (-(x['end']-x['start']), x['start'])):
        if not any(span['start'] < s['end'] and s['start'] < span['end'] for s in accepted):
            accepted.append(span)
    accepted.sort(key=lambda x:x['start'])
    redacted = text
    for span in reversed(accepted):
        redacted = redacted[:span['start']] + '['+span['kind']+']' + redacted[span['end']:]
    warnings = ['Patterns can miss names, workplaces, indirect locations, unusual numbers and identifying stories. User and human review are required.']
    if any(unicodedata.category(c) == 'Cf' for c in text):
        warnings.append('Invisible formatting characters detected; manual inspection is required.')
    return {'redacted_text':redacted, 'spans':accepted, 'offset_unit':'unicode_codepoints',
            'contains_detected_identifiers':bool(accepted), 'requires_user_confirmation':True,
            'anonymity_guaranteed':False, 'warnings':warnings}
