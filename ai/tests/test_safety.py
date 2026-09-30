import pytest
from app.services.safety import check_safety

@pytest.mark.parametrize('text,rule',[
 ('I am bleeding heavily.','heavy_bleeding'),('Nina damu nyingi.','heavy_bleeding'),
 ('I feel faint.','fainting'),('Ninahisi kuzimia.','fainting'),
 ('I have severe pelvic pain.','severe_pain'),('Nina maumivu makali.','severe_pain'),
 ('I cannot breathe.','breathing'),('Siwezi kupumua.','breathing'),
 ('I want to kill myself.','self_harm'),('Nataka kujiua.','self_harm'),
 ('Someone is threatening to kill me.','immediate_threat'),('Niko hatarini.','immediate_threat')])
def test_selected_concerns(text,rule):
    r=check_safety(text);assert rule in r['rule_ids']
    assert r['status']=='potential_urgent_concern' and not r['clinically_validated']

def test_nonmatch_never_clearance():
    r=check_safety('What is menopause?');assert r['status']=='no_rule_match'
    assert r['human_review_required'] and r['message'] is None

def test_negated_history_can_trigger_as_documented():
    assert check_safety('I do not have severe pain now.')['status']=='potential_urgent_concern'

def test_swahili_notice_selected():
    assert check_safety('Nina damu nyingi','sw')['message'].startswith('UJUMBE WA MAJARIBIO')
