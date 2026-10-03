# Security & Privacy Policy - Nuru Women

## Privacy-First Architecture
* **Anonymous Community Engagement:** Regular users interact with zero registration using client-side Nostr keypairs stored in `localStorage`.
* **Zero IP Logging:** Server endpoints for public questions do not log client IP addresses or personal metadata.

## Medical Professional Authentication
* RBAC is strictly limited to Admin, Doctor, Nurse, and Qualified Professional roles.
* Professional passwords are hashed using Bcrypt (cost factor >= 12).

## Security Standards
* All database queries must use prepared statements / parameterized queries.
* Nostr event signatures (`sig`) are verified cryptographically before publication.

## Reporting Vulnerabilities
Please report any security or privacy concerns directly to the project maintainers rather than opening public GitHub issues.