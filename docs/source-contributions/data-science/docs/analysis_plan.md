# NuruWomen Data Science Analysis Plan

## 1. MVP questions

The data scientist should help the team answer:

- Which of the five topics are used most often?
- Are English and Swahili users receiving comparable retrieval coverage?
- How often does the system fall back because evidence is missing or retrieval confidence is low?
- How often are safety escalation pathways triggered?
- Does each answer retrieve at least one relevant clinical source?
- Which topics have weak or outdated evidence coverage?
- What is the median/average response latency?
- When users provide feedback, what proportion report the answer as helpful?

## 2. Suggested MVP KPIs

### Evidence coverage
- Number of clinical sources per topic
- Median publication year
- % of records published within the last 3 years
- % with DOI or PMID/PMCID
- % marked open access
- Distribution by evidence type

### Retrieval
- Mean and median retrieval confidence
- % of answered events with at least 1 source
- Fallback rate by topic
- Fallback rate by language
- Mean sources retrieved per answer

### Safety
- Escalation rate by topic
- Never interpret a higher escalation rate as “worse performance” without clinical review
- Audit false negatives and false positives only with approved, de-identified evaluation sets

### User experience
- Helpfulness among rated interactions
- Response latency
- Language distribution
- Topic distribution

## 3. Analysis cadence

For the hackathon:
- Run quality checks on every dataset update.
- Produce an aggregate topic report before each demo.
- Review evidence gaps with the AI and clinical-content team.

For a future production system:
- Daily automated data validation
- Weekly product-quality dashboard
- Monthly evidence freshness review
- Quarterly bias/fairness and safety audit

## 4. Fairness checks

Compare, where sample size is sufficient:
- English vs Swahili retrieval coverage
- English vs Swahili fallback rates
- English vs Swahili helpfulness
- Topic-level differences

Do not infer protected characteristics from names, language, location or conversation content.

## 5. Clinical boundary

Data science may identify patterns, gaps and quality issues. It must not:
- diagnose users,
- determine treatment,
- assign individual medical risk without a validated clinical protocol,
- silently change safety thresholds without clinical approval.
