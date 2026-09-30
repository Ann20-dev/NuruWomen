# Contributing

Work in a branch, use synthetic examples, and open small reviewable changes. Run `python -m pytest -q` from the AI folder before requesting review. Rerun `scripts.evaluate` for model/data changes and `scripts.export_openapi` for request-contract changes.

Explain what changed, what was tested and any behavioural trade-off. Model changes require data-science review; privacy/auth changes require security review; health content, safety notices and translations require qualified human review. Passing tests never substitutes for those reviews.

Keep translations and paraphrases in one dataset family and one split. Record if evaluation examples were inspected while tuning. Do not contribute real questions, identifiers, private credentials, unlicensed source text, opaque serialized model files or health-record screenshots.

Useful first contributions: independently review glossary drafts, add synthetic failure cases, improve screen-reader wording, add a fresh evaluation set, or improve integration documentation. Obtain the team's actual agreement before marking any content reviewed.
