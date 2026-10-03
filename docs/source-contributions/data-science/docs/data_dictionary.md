# Data dictionary

## `sample_anonymous_events.csv`

| Field | Type | Meaning |
|---|---|---|
| `event_id` | string | Unique analytics event ID |
| `timestamp_utc` | datetime | Event time in UTC |
| `session_hash` | string | Anonymous non-reversible session identifier |
| `topic` | categorical | One of the five NuruWomen health topics |
| `language` | categorical | `en` or `sw` |
| `channel` | categorical | Interface/channel used |
| `response_outcome` | categorical | `answered`, `escalated`, or `fallback` |
| `safety_escalation` | boolean | Whether the response was routed to a safety/escalation flow |
| `retrieved_source_count` | integer | Number of evidence sources retrieved |
| `retrieval_confidence` | float | Retrieval-system confidence from 0 to 1 |
| `latency_ms` | integer | End-to-end response time in milliseconds |
| `user_feedback` | categorical | `helpful`, `not_helpful`, or `none` |

## `clinical_evidence_catalog.csv`

| Field | Meaning |
|---|---|
| `topic` | NuruWomen topic |
| `title` | Article/review title |
| `year` | Publication year, 2020+ |
| `journal_or_source` | Journal or evidence source |
| `evidence_type` | Systematic review, meta-analysis, clinical review, etc. |
| `pmid` / `pmcid` | PubMed identifiers when available |
| `doi` | DOI when available |
| `access_url` | Stable source URL |
| `open_access` | Access status note |
| `clinical_use` | Why the source is useful in NuruWomen |
| `library_tags` | Pipe-separated retrieval tags |

## Important exclusions

Never collect or commit:
- name
- phone number
- email
- national ID/passport number
- exact home address
- precise GPS coordinates
- raw medical records
- raw free-text health conversations in the public repo
