# Consolidation review

Source reviewed: the supplied `NuruWomen-main (1).zip` snapshot. This review does not assert that it matches the latest GitHub main branch; no live GitHub fetch was performed.

## Retained and combined

- React/TypeScript interface and its established visual design, navigation, structured health articles, question examples and supporting animations.
- Node/Express gateway, request validation, safe errors, service-key boundary, timeouts and rate limiting.
- Python/FastAPI analysis, bilingual routing/privacy/safety rules, synthetic classifier, retrieval, translation checks, internal aggregate experiment and 106 existing tests.
- 20-reference evidence manifest, `.bib` and index, now also browseable at `/research`.
- Data-scientist summary/detail CSVs, now rendered at `/blind-spots`. The generated UI JSON is refreshed from canonical files at build time.

## Corrected

| Supplied problem | Consolidated behavior |
| --- | --- |
| Three Render services, duplicated frontend serving, fixed cross-service URL/host names | One Docker service, one origin; Node serves the built frontend and proxies AI calls to loopback Python |
| Browser allows public post although AI returns publication_allowed=false | Synthetic questions/responses/reactions saved only in tab memory; no public relay publication |
| AI key protection relies on separate service secrets | One runtime environment key shared only by local child processes; no browser secret |
| Gateway health returns OK while AI can be unavailable | Health checks Python readiness; supervisor stops both processes if either exits |
| Seed clinicians/articles look verified | Clearly marked demo personas and unreviewed drafts; no seed key grants live clinical authority |
| Self-label can classify arbitrary answer as clinical | Clinical trust requires the verified key set; self-label cannot confer it |
| Dashboard not connected; fabricated question analytics look live | Imported research-coverage CSVs rendered natively with provenance caveats |
| Frontend .env example exposes database-shaped VITE variables | Server-only environment template; no working database represented |
| Inline/eval script CSP and unsupported NIP-19 placeholders | Script CSP restricted to self; implemented note/event routes lead to local questions; unsupported views return 404 |
| Helpful count can increment twice and votes stored persistently | Session-memory reactions; display counts use the query result without duplicate increment |

## Removed from the deployable application

Removed 57 unreferenced TypeScript scaffold modules (see `REMOVED_SCAFFOLD.json`), unused agent/editor/MCP configuration, alternate package-manager lockfiles, and generated dependency/cache/build directories. Replaced empty/outdated top-level README and inaccurate security claims.

The independent HTML dashboard and proposed MySQL/MariaDB schema are retained as historical designs under `docs/source-contributions/`, outside the runtime image. Existing AI training/evaluation scripts, tests and license notices remain useful for the team and were retained. Original AI-only Docker instructions remain under `ai/` as component-development references; root deployment instructions are authoritative for this release.

## Open issues

This is a demonstration consolidation. No real clinician credentials, moderator approval queue, clinical review attestations, consented health analytics, persistent question database, full interface localization or research extraction provenance was supplied. The source manifest is a bibliography, not a download of full-text papers or evidence-card approval. These gaps are stated in the interface and project guide.
