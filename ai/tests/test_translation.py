from app.services.translation import check_translation

def test_numbers_and_source_versions():
    r=check_translation('Wait 2 days','Subiri siku 3','v2','v1')
    assert {'number_mismatch','stale_source_version'} <= set(r['checks'])
    assert r['ready_to_publish'] is False

def test_negation_and_glossary():
    r=check_translation('Do not assume hormones explain everything.','Homoni zinaeleza kila kitu.','v1','v1')
    assert 'possible_negation_mismatch' in r['checks'] and r['glossary_suggestions']

def test_no_flags_is_not_approval():
    r=check_translation('2 days','siku 2','v1','v1');assert r['checks']==[]
    assert not r['ready_to_publish']


def test_pregnancy_ending_terms_require_language_review():
    from app.services.translation import check_translation
    r=check_translation('abortion','kuharibika kwa mimba','v1','v1')
    assert 'pregnancy_ending_terminology_review' in r['checks']
    assert not r['ready_to_publish']
