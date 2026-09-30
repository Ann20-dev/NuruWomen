import json
import pytest
from app.config import DATA
from app.services.topics import TopicEngine

@pytest.fixture(scope='module')
def engine():return TopicEngine()

@pytest.mark.parametrize('text,expected',[
 ('What is PCOS?','menstrual_health'),('Afya ya akili ni nini?','mental_health'),
 ('What is perimenopause?','healthy_aging'),('Kipindi cha kuelekea ukomo wa hedhi ni nini?','healthy_aging'),
 ('My menstrual cramps interrupt my daily work.','menstrual_health'),
 ('What is postpartum recovery?','postpartum'),('What is sexual health?','sexual_health')])
def test_routing_smoke_examples(engine,text,expected):
    assert engine.classify(text)['primary_topic']==expected

def test_unknown_vocabulary_abstains(engine):
    assert engine.classify('galaxies telescopes superconductors')['primary_topic']=='uncertain'

def test_family_split_and_counts():
    a=json.loads((DATA/'topic_train.json').read_text());b=json.loads((DATA/'topic_test.json').read_text())
    assert len(a)==120 and len(b)==60
    assert not ({x['family_id'] for x in a}&{x['family_id'] for x in b})
    assert all(x['synthetic'] for x in a+b)
