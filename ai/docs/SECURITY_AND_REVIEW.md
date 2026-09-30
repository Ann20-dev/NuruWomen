# Security, privacy and content-review boundaries

This release intentionally accepts only an explicit synthetic-demo request contract. It fails startup if demo mode is disabled. That prevents an accidental configuration switch from being mistaken for real-user readiness; it cannot verify that a caller actually used synthetic text.

## Implemented controls

- All processing endpoints require a random service key; no default working credential is shipped.
- JSON models reject extra fields; text and total byte limits are enforced.
- Validation errors do not echo the submitted health text.
- Responses are marked `Cache-Control: no-store`.
- There is no database or file-writing in request handlers; no raw request-body logging or outbound AI/network calls are implemented.
- The API key stays in the server environment. Tests and demo scripts generate temporary keys.
- Demo retrieval is opt-in and separated from approved matches.
- Approval checks require non-demo status, exact version and content digest, valid dates, a reviewer ID, and no withdrawal. Swahili additionally requires current English source approval and translation approval.
- No request text, personal user key or hash of a private submission is sent to Nostr by this folder.

These controls are prototype safeguards, not a penetration-test certificate or legal compliance finding. Python memory, host swap, crash dumps, infrastructure logs, tracing and reverse proxies can still expose data. Redacted text can remain identifying.

## Important omissions and responsibilities

TLS, rate limiting, firewall rules, end-user authentication, consent records, role-based moderation, audit logs, retention, deletion, backup handling, incident response and credential rotation belong to the wider application and its operators. The Docker sample is not a complete secure deployment. Do not expose this demo directly to the internet.

Use `127.0.0.1` for local testing. For server-to-server integration, use a protected internal network and appropriate transport security. Render all user-derived text as plain text; redaction is not HTML sanitisation. No regex filter can establish anonymity.

## Before a real-user pilot

1. Appoint clinical and language reviewers, define response scope and obtain appropriate clinical governance.
2. Replace all draft rules, notices and evidence cards through a documented, permission-controlled review process. Do not simply change `demo_only` or invent a reviewer name.
3. Verify professional credentials outside this service. A reviewer ID in a JSON file is not credential verification.
4. Obtain a privacy assessment, lawful processing basis, clear consent choices and retention/deletion procedures appropriate to the operating context.
5. Perform independent bilingual evaluation, security testing and end-to-end application tests.
6. Define staffing and response hours; do not imply a 24-hour emergency service.
7. Design a deliberate production-mode implementation and release review. This source release has no enabled production switch.

## Reporting and contribution

Report a suspected vulnerability privately to the team maintainer using the private channel the team establishes. Do not include real health records in public issues. The team must add its actual contact before inviting real users; no working security email is invented here.

Sources for the prior design: Kenya ODPC health-data guidance and WHO health-AI guidance are linked in `SOURCES.md`. This file states engineering responsibilities, not legal advice.
