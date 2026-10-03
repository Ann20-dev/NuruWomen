# Backend review notes

Issues found while wiring the Ask page to the AI gateway. None are fixed by
that work. Each needs an owner.

## 1. `docs/ai-handoff/` was deleted from `main`

Commit `33bb6bc` ("Delete docs/ai-handoff directory") removed all eight
handoff documents, including `TEAM_HANDOFF.md`, which is the integration
contract between the AI service and the rest of the app. `ai/docs/INTEGRATION.md`
and `ai/README.md` still tell readers to start there. (Their relative paths,
`docs/TEAM_HANDOFF.md`, did not match `docs/ai-handoff/` even before the
deletion, so the `ai/` owner may want to fix those links when it is restored.)

The gateway's schemas and the frontend client were built against it, and the
code cites it in comments.

**Action:** restore the directory from `126e68a`:

```sh
git checkout 126e68a -- docs/ai-handoff
```

## 2. Root `.env.example` puts database credentials in `VITE_` variables

The root `.env.example` defines `VITE_DB_HOST`, `VITE_DB_PORT`,
`VITE_DB_NAME`, `VITE_DB_USER` and `VITE_DB_PASS`.

Vite inlines every `VITE_` variable it is given into the browser JavaScript
bundle, where anyone can read it. If someone copies this file to `.env`, fills
in real values and builds, the database host and credentials ship to every
visitor. The example user is `root`.

Nothing in `src/` reads these variables today, so the current build is clean.
I built the app and searched `dist/` to confirm this. The danger is the
template itself: it teaches the wrong pattern.

**Action:** remove the `VITE_DB_*` lines from the root `.env.example`. Database
settings belong in a server-side env file with no `VITE_` prefix, read only by
server code.

## 3. `questions.nostr_pubkey` is `NOT NULL`

In `nuru_commons.sql`, the `questions` table requires a `nostr_pubkey`.

This causes two problems:

- **It blocks anonymous asking through a private workflow.** A question
  submitted to the server without a Nostr identity cannot be stored.
- **It links a woman's questions together.** If someone posts under their own
  key, every question they ask shares one pubkey in one table, which can be
  joined in a single query. Separate questions about contraception, a
  pregnancy and an STI become one profile.

**Action:** make the column nullable. Better still, do not store a pubkey on
private submissions at all. If a question is later published to Nostr, keep
the event id, not the author.

## 4. `audit_logs.ip_address` stores identifying data

An IP address identifies a household or a phone, and a court order or a breach
can turn it into a name. Logging it next to actions on a reproductive health
service creates the kind of record this project exists to avoid.

**Action:** drop the column. If abuse tracking needs something, store a
short-lived keyed hash with a rotating key and a retention limit, and write
down why. The gateway already rate limits by IP in memory without storing or
logging addresses.

## 5. No claim token, so there is no way back to a submission

The schema has nothing that lets an anonymous person return to their question.
Anonymous Nostr posts are signed with a one-time key that is thrown away, and
the database has no account to fall back on.

**Action:** add a `claim_token_hash` column (or a separate table) to
`questions`, as described in `identity-decisions.md` section 4. Store only the
hash.

## Also worth knowing

**Personal questions still go to public relays.** `TEAM_HANDOFF.md` says
personal questions must not be sent to public Nostr relays and that
`useNuruPublish` must not be the submission step. For the hackathon they still
are. The privacy check now runs and gates the Post button, but publishing is
public and permanent. The private submission workflow is post-hackathon work
and depends on items 3 to 5 above.

**The name check is narrow.** The AI service's redaction caught "My name is
Demo Person" and "Naitwa Mtu Mfano", and phone numbers in both languages. It did
not catch a bare name in the title ("Question from Jane Wanjiku"). This is a
known limit of pattern matching, which the service itself warns about, but it
belongs with the `ai/` owner.
