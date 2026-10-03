# Identity decisions

Status: agreed for the hackathon build. Revisit before any real health data is
collected.

NuruWomen is for women asking about reproductive health, often about things
they cannot safely ask in person. In that setting, every identifier we collect
or create is something that can be subpoenaed, leaked, seized with a phone, or
used to link one question to another. These decisions follow from that.

## 1. No signup to ask or answer

Asking and answering need no account, email, phone number or password.

An account is a durable link between a person and everything they have asked.
We do not want to hold that link, so we do not create it. A signup step would
also turn away exactly the people who most need the service: anyone sharing a
phone, anyone whose messages are read by someone else.

Today, an anonymous question is signed with a one-time Nostr keypair generated
in the browser (`generateSecretKey` in `src/hooks/useNuruPublish.ts`) and then
discarded. Someone who already uses Nostr can choose to post under their own
key instead. That is their choice, made per question.

## 2. Clinicians and moderators must be authenticated

The opposite rule applies to people who answer with authority or who moderate.
An answer labelled as coming from a clinician is only worth anything if we have
verified that the person is one, and moderation actions have to be attributable
so they can be reviewed.

So: anonymous for people asking and for peer answers; verified, authenticated
accounts for clinicians and moderators.

**Not yet built.** There is no clinician verification and no moderator login.
Until there is, nothing in the app should present an answer as verified by a
clinician on the basis of who posted it.

## 3. No notifications

We considered telling someone when their question has been answered, and ruled
it out.

Every delivery channel is an identifier. Email, SMS, WhatsApp and push tokens
all tie a question to a person or a device, and some (an SMS arriving on a
shared phone) disclose the question to whoever else sees it. There is no
channel that notifies without identifying.

People come back and check instead. Section 4 is how they find their question.

## 4. Claim tokens to return to a question (recommended)

Because the keypair is thrown away, someone who closes the tab today has no
reliable way back to their question.

Recommendation: at submission, generate a high-entropy random claim token and
show it once ("save this code to find your answer"). Store only a hash of it
against the question. Presenting the token later lets the person view replies,
and later edit or withdraw the question.

Properties we want:

- The token is random, not derived from anything about the person.
- Only a hash is stored, so a database leak does not let anyone claim
  questions.
- One token per question. Tokens are not linked to each other, so holding
  several does not reveal that one person asked them all.
- Losing the token loses access. There is no recovery, because recovery needs
  an identifier.

This belongs in the private submission workflow, which is not built yet. The
current database schema has no column for it (see `backend-review-notes.md`).

## 5. Nostr keys stay in the frontend; the server holds no user keys

Signing happens in the browser, through a one-time key, a browser extension,
a pasted `nsec` or a remote signer. The gateway in `server/` never sees, stores
or generates a user's private key, and has no route that accepts one.

The only secret the server holds is the service key for the private AI
service. Keeping user keys out of the server means a server compromise cannot
be used to impersonate users or sign as them.

The frontend side has its own risk: a pasted `nsec` sits in `localStorage`,
where any successful XSS can read it. That is why the project treats XSS as
the top security concern (see `AGENTS.md`).
