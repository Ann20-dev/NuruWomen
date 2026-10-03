# Security and privacy: implemented behavior

This release is an early preview, not a deployed clinical service.

- The browser calls the same-origin Node gateway; the service key is never a Vite variable or browser credential.
- Python binds to `127.0.0.1:8000` inside the container. Node is the only public listener and uses Render's `PORT`.
- Analysis schemas enforce `synthetic_only: true`, codepoint limits and supported fields. This flag is a declaration, not an automatic guarantee that entered text is fictional.
- Requests are limited to 64 KiB. AI routes have per-IP, in-memory throttling and upstream timeouts. Multiple instances would require a shared limiter.
- Production browser requests must match the actual host origin or an explicit allowlist. This is browser-origin control, not user authentication.
- CSP prohibits inline scripts/eval and framing, and permits WebSocket connections only to the app's configured Nostr relays (`src/lib/appRelays.ts`). Inline styles remain permitted for the existing UI/animation components.
- Error responses and app logs omit submitted text. Python access logs are disabled. Hosting/network providers may still process IP addresses and metadata.
- Questions, answers and helpful votes are published to public Nostr relays. Anonymous posts are signed with a one-time keypair that is generated in the browser and discarded immediately; public events are permanent. Session-memory copies are cleared on reload/inactivity. UI preferences may still be held in localStorage by the retained app provider.
- Self-applied clinical labels are not trusted. The real clinician trust set is empty; seed personas do not establish real professional authority.
- No database credential, bcrypt/RBAC implementation or moderation approval system exists in this running release. The retained SQL file is an unconnected proposed schema.

Report vulnerabilities privately to the repository maintainers. Do not include real patient information in reports. Before enabling public health use, implement verified clinical review, consent, privacy testing, moderation and dependable persistence.
