"""Synthetic editorial aggregates, never disease prevalence or a public privacy service."""
from collections import defaultdict

MIN_CELL=25

def gap_board(records,month):
    groups=defaultdict(list);seen=set()
    for r in records:
        if r.submission_id in seen:
            raise ValueError('Duplicate submission IDs are not accepted')
        seen.add(r.submission_id)
        if r.analytics_consent:groups[(r.topic,r.language)].append(r)
    cells=[]
    for (topic,language),rows in sorted(groups.items()):
        if len(rows)<MIN_CELL:continue
        missing=sum(not r.has_approved_card for r in rows)
        # Suppress both complementary subcells if either is small. Exact zero is allowed.
        disclose=(missing==0 or missing==len(rows) or min(missing,len(rows)-missing)>=MIN_CELL)
        cells.append({'topic':topic,'language':language,'question_submissions':len(rows),
                      'missing_approved_card':missing if disclose else None,
                      'missing_percent':round(100*missing/len(rows),1) if disclose else None,
                      'detail_suppressed':not disclose,'suggested_action':'editorial_review'})
    return {'month':month,'cells':cells,'minimum_cell_size':MIN_CELL,'synthetic_only':True,
            'unit':'question_submissions_not_people','public_release_allowed':False,
            'limitations':'Internal synthetic demonstration only. No grand totals are released. Repeated queries can reveal small groups; threshold suppression alone is not a privacy guarantee.'}
