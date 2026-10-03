# NIP.md — NuruWomen Protocol Extensions

NuruWomen (Women's Health Commons Africa) is a privacy-first women's health
knowledge commons built on Nostr. This document describes how the app uses
existing NIPs and where it extends the protocol.

## Design principles

1. **Three knowledge layers stay separated.** Lived experience, clinical
   education, and structured evidence are distinct, labelled event types that
   clients must never visually merge.
2. **Public health conversation only.** Medical records, diagnoses, names,
   phone numbers, and identifying details never belong on public relays. The
   client actively detects and strips PII before publication.
3. **Provenance over popularity.** Answers carry explicit type labels and
   professional-role attestations. "Helpful" votes replace likes.

## Existing NIPs used

| NIP | Usage |
| --- | --- |
| NIP-01 | Questions and answers are kind `1` notes. |
| NIP-07 | Browser-signer login; private keys never touch the site. |
| NIP-10 | Answers thread onto questions with `e`/`p` markers. |
| NIP-23 | Long-form, clinician-reviewed library articles (kind `30023`). |
| NIP-32 | Self-labels classify answer type (`nuru.answer-type` namespace). |
| NIP-51 | Verified-clinician registry as a follow set (kind `30000`). |
| NIP-25 | "Helpful" votes are kind `7` reactions with content `+`. |

## Event schemas

### Question — kind `1`

```jsonc
{
  "kind": 1,
  "content": "Anonymized question text (PII stripped client-side).",
  "tags": [
    ["t", "nuru-commons"],          // commons marker — filterable
    ["t", "perimenopause"],         // one or more topic tags
    ["subject", "Short question title"],
    ["alt", "Anonymous women's health question on NuruWomen"]
  ]
}
```

Query: `{ kinds: [1], "#t": ["nuru-commons"] }`. Root questions are events
without an `e` tag; replies carry NIP-10 markers.

### Answer — kind `1` reply with NIP-32 self-label

```jsonc
{
  "kind": 1,
  "content": "Answer text.",
  "tags": [
    ["e", "<question-id>", "", "root"],
    ["p", "<question-author>"],
    ["t", "nuru-commons"],
    ["L", "nuru.answer-type"],
    ["l", "lived-experience", "nuru.answer-type"],   // or "clinical-response"
    ["alt", "Labelled answer on NuruWomen"]
  ]
}
```

| Label | Meaning | Render rule |
| --- | --- | --- |
| `lived-experience` | Personal experience. **Not medical advice.** | clay |
| `clinical-response` | Health-education response from a verified professional. Not a consultation. | teal |

Replies without a label default to `lived-experience`, unless the author's
pubkey appears in the verified-clinician registry, in which case clients should
render the reply as `clinical-response`.

### Evidence Card — kind `35113` (addressable, custom)

Structured, clinician-reviewed education attached to a topic. Addressed by
`d` tag = card slug (e.g. `severe-menstrual-pain`).

```jsonc
{
  "kind": 35113,
  "content": "<JSON payload, see below>",
  "tags": [
    ["d", "severe-menstrual-pain"],
    ["t", "menstrual-health"],
    ["t", "nuru-commons"],
    ["title", "Severe menstrual pain"],
    ["reviewed_at", "1789344000"],
    ["reviewer", "Clinical review panel"],
    ["alt", "Clinician-reviewed women's health evidence card"]
  ]
}
```

`content` JSON:

```jsonc
{
  "summary": "One-paragraph plain-language overview.",
  "commonCauses": ["..."],
  "redFlags": ["Symptom patterns that warrant prompt assessment"],
  "questionsForClinician": ["What to ask at an appointment"],
  "sources": [{ "label": "WHO ...", "url": "https://..." }],
  "reviewedAt": 1789344000,
  "reviewer": "Clinical review panel"
}
```

Clients must attribute trust via `authors` (the commons authority pubkey) —
the `d` tag alone is not a trust boundary.

### Verified-clinician registry — kind `30000` (NIP-51 follow set)

Published by the commons authority key with `d` =
`nuru-verified-clinicians`; `p` tags enumerate clinician pubkeys that the
project has **manually verified against professional registers**. NIP-05
alone is never treated as proof of licensure.

### Helpful vote — kind `7`

`e` tag targets an answer or evidence card; content is `"+"`. Clients render
counts as "Helpful — 142", never as likes.

## Privacy architecture

| Layer | Public relays | Never public |
| --- | --- | --- |
| Content | Anonymous questions, labelled answers, evidence cards, reviewed articles, aggregate blind-spot stats | Medical records, names, phone numbers, addresses, ID numbers, lab results, detailed private history |

* Client-side PII detection strips names, phone numbers, emails, ID numbers,
  and precise locations **before** signing.
* Blind-spot statistics are published only in aggregate with a minimum
  threshold (k ≥ 25) so small groups cannot be re-identified.
* Private messaging (NIP-17/NIP-44) is a future extension and must carry
  explicit forward-secrecy and metadata warnings.
