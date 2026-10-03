# Retained source designs

The independent HTML dashboard is retained for comparison only. The final app implements the imported coverage view natively in React (heatmap on `/blind-spots`); this HTML is not a deployed page.

`nuru-data.ipynb` is the data scientist's extraction and scoring notebook. It fetches the WHO GHO indicators, folds in the menstrual-health proxy, and generates the canonical coverage CSVs (`data/topic_coverage_summary.csv`, `data/topic_country_detail.csv`). The documented level rule — level 2 = 3+ records, 1 = some records, 0 = none — is shown on the coverage page.

`nuru_commons.sql` is a proposed MySQL/MariaDB schema, not connected to the Node gateway or Python service. Do not execute it against an existing database without review: it includes DROP TABLE statements. This consolidation does not claim database authentication, clinical verification or RBAC from that design.

Canonical coverage CSVs now live in root `data/` and feed `scripts/sync-data.mjs`.

`data-science/` retains the data scientist's GitHub-ready package documentation: README, data dictionary, analysis plan, privacy/ethics notes and the JSON schemas. The clinically reviewed evidence catalog itself is canonical at `data/clinical_evidence_catalog.csv` and is validated + synced to `src/data/evidenceCatalog.json` by `scripts/sync-data.mjs`; it powers the research catalogue and on-device retrieval. The package's synthetic sample analytics files were not retained.
