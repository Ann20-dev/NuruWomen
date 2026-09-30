import pytest
from app.schemas import GapRecord
from app.services.analytics import gap_board

def rows(n,missing=None,consent=True):
    return [GapRecord(submission_id=f'demo-{i}',topic='healthy_aging',language='sw',analytics_consent=consent,
                      has_approved_card=(missing is not None and i>=missing)) for i in range(n)]

def test_small_cells_and_no_consent_hidden():
    assert gap_board(rows(24),'2026-09')['cells']==[]
    assert gap_board(rows(40,consent=False),'2026-09')['cells']==[]

def test_complementary_suppression():
    c=gap_board(rows(40,missing=18),'2026-09')['cells'][0]
    assert c['missing_approved_card'] is None and c['detail_suppressed']

def test_disclosable_cells_still_not_public():
    r=gap_board(rows(50,missing=25),'2026-09');assert r['cells'][0]['missing_percent']==50
    assert r['public_release_allowed'] is False

def test_duplicate_rejected():
    with pytest.raises(ValueError):gap_board(rows(1)+rows(1),'2026-09')
