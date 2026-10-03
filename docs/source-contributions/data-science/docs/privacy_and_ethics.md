# Privacy, Ethics and Health-Data Rules

NuruWomen handles potentially sensitive health topics. The MVP analytics design should therefore
collect the minimum data needed to improve the product.

## GitHub rule

Only synthetic, aggregate, public, or appropriately licensed data belongs in the public repository.

Do not commit:
- personally identifying information,
- raw user chats,
- medical records,
- credentials or API keys,
- private clinical notes,
- private datasets,
- precise user locations.

## Analytics design

Prefer event-level metadata such as:
- topic,
- language,
- source count,
- retrieval confidence,
- response outcome,
- latency,
- optional helpful/not-helpful feedback.

Avoid storing the user's actual question unless the product has a documented privacy basis,
retention policy and access controls. For hackathon analytics, use synthetic text or no text.

## Evidence

Keep source provenance. Every evidence record should preserve:
- title,
- year,
- evidence type,
- DOI/PMID/PMCID where available,
- stable access link,
- topic tags.

Clinical evidence should be reviewed for currency and applicability before production use.
