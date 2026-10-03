# NuruWomen Data Science

Starter package for the NuruWomen data scientist.

## Scope

This folder supports analytics and evidence-quality work for the five MVP topics:

1. Menstrual health
2. Healthy aging
3. Postpartum health
4. Sexual health
5. Mental health

The package deliberately uses **anonymous, synthetic interaction data**. Do not commit names,
phone numbers, email addresses, precise locations, medical-record numbers, raw chat transcripts,
or other directly identifying health information to GitHub.

## Folder structure

```text
data-science/
├── README.md
├── requirements.txt
├── .gitignore
├── data/
│   ├── clinical_evidence_catalog.csv
│   ├── sample_anonymous_events.csv
│   └── sample_topic_metrics.csv
├── schemas/
│   ├── event_schema.json
│   └── evidence_schema.json
├── docs/
│   ├── data_dictionary.md
│   ├── analysis_plan.md
│   └── privacy_and_ethics.md
├── src/
│   ├── validate_data.py
│   ├── build_topic_summary.py
│   └── evidence_quality_report.py
├── notebooks/
│   └── 01_exploratory_analysis.ipynb
└── tests/
    └── test_validate_data.py
```

## First run

From the repository root:

```bash
cd data-science
python -m venv .venv
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python src/validate_data.py
python src/build_topic_summary.py
python src/evidence_quality_report.py
pytest
```

## What the data scientist should own

- Define product KPIs for the five-topic MVP.
- Track topic coverage, English/Swahili usage, retrieval quality, fallbacks, safety escalation and latency.
- Audit evidence coverage by topic, publication year and evidence type.
- Measure answer usefulness only from privacy-safe feedback.
- Produce aggregate reports for the product team.
- Identify evidence gaps without making clinical diagnoses or treatment decisions.
- Work with AI/clinical reviewers before changing thresholds used for health or safety behavior.

## Current evidence seed

The clinical catalogue currently contains **20 evidence records** from 2020 onward.
