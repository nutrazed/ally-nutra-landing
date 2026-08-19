# Investigation: the real scheduling / booking flow in Ally-Nutra-LLC-New/ally-nutra

**Date:** 2026-08-19
**Type:** Read-only investigation. Nothing was changed, committed, branched, or pushed in the
company repo (`Ally-Nutra-LLC-New/ally-nutra`) or any of its checkouts.

## Source of truth

**Checkout used as a read vantage point:** `~/Documents/dev/ally-nutra-bug036-routing-removal`
(remote `Ally-Nutra-LLC-New/ally-nutra`, branch `fix/remove-dead-mac-mini-routing-BUG-036`, working
tree clean — 0 modified files). This checkout's own branch is ~110 commits behind `origin/main`, so
it was **not** read directly. Instead, every claim below was read via
`git -C ~/Documents/dev/ally-nutra-bug036-routing-removal show origin/main:<path>` (or `git log`,
`git ls-tree`, `git merge-base --is-ancestor` against `origin/main`), which reads the actual current
production tree from the git object database without ever touching the working directory or index.
Fetched once at the start of this investigation.

**Ref read from:** `origin/main` @ `f49d057a6206b584e6af754a3cdf9e84209f36bd`, "Merge pull request
#1338 from Ally-Nutra-LLC-New/staging", 2026-08-18 16:50:51 -0400.

**Other checkouts touched, read-only, no writes:** `~/ally-nutra` (branch `fix/a2p-sms-optin-page`,
confirmed uncommitted state exactly as described: `docs/features/README.md`, `public/sitemap.xml`,
`supabase/config.toml`, `vercel.json` modified; `docs/features/sms-optin.md`,
`public/sms-optin.html`, `supabase/functions/sms-optin/`,
`supabase/migrations/20260805080000_sms_optins_table.sql` untracked — read via `git status`/`git
diff`/`cat`, nothing staged, stashed, or checked out). `~/Documents/dev/ally-nutra-admin-popups` and
`~/Documents/dev/ally-nutra-sms-optin-branding` were not needed once `origin/main` access was
confirmed from the bug036 checkout.

**Git safety:** no `git checkout`/`switch`/`stash`/`clean`/`restore`/`branch -d`/`worktree add` was
run anywhere. No commits, branches, or pushes.

---

## Q1 — Is it in-house or third-party?

**Answer: third-party, and it has changed providers twice in about a month. Today it is iClosed.
Neither the in-house system nor Calendly is live for new bookings.**

Timeline, each step confirmed on `origin/main` via `git merge-base --is-ancestor <sha> origin/main`:

1. **In-house** (pre-~2026-07-21): `appointments` + `availability_slots` tables, Daily.co video
   rooms, `book-appointment`/`cancel-appointment`/`reschedule-appointment`/
   `admin-reschedule-appointment` edge functions. Documented in
   `docs/features/calendly-meetings.md`: "brittle: timezone bugs, 'can't schedule' failures, and
   per-rep availability upkeep."
2. **Calendly** (live ~2026-07-21, in-house stack formally deleted 2026-08-06 per
   `docs/features/calendly-scheduling-cutover.md` and migration
   `supabase/migrations/20260806150000_unschedule_daily_crons.sql`): `/schedule` embedded
   `JOSH_CALENDLY_URL` = `calendly.com/josh-p-allynutra` — **this is the exact URL** the marketing
   repo (`nutrazed/ally-nutra-landing`) copied into `src/views/Home.jsx`'s
   `BOOKING_URL`/`JOSH_CALENDLY_URL` reference, confirmed by that file's own comment
   (`src/views/Home.jsx:52-53` in this repo): *"a real, live Calendly link (found read-only in the
   company repo, `src/lib/calendlyBooking.ts`, `JOSH_CALENDLY_URL`)."* So the marketing repo's
   constant was accurate when written, and is now doubly stale — the marketing site itself no
   longer links to it (repointed to the `/quote` demo per `feature/role-and-links`), **and** the
   underlying Calendly link it names is no longer live in the real app either.
3. **iClosed** (live since 2026-08-11, commit `93b7d059`/PR sequence culminating in `37f098ce`
   "chore+feat: retire Daily.co, the AI receptionist, and Calendly booking (#1200)", confirmed
   ancestor of `origin/main`): all Calendly booking surfaces (`/schedule`, `/work-with-us`,
   `/capsules-supplement-manufacturer`, the quote form) moved to a single iClosed event
   `ally-nutra-consultation` with two hosts (Josh, Shaun) — iClosed does the round-robin itself.
   `src/lib/iclosedEvents.ts` (`ICLOSED_CONSULTATION_URL`, `buildIClosedBookingUrl`) is the current
   canonical source.

**What decides which path a booking takes, in code:** nothing decides between Calendly and iClosed
today — Calendly is retired for new bookings. The only live decision left is *which page* renders
the same iClosed embed (`Schedule.tsx`, the quote wizard, `CapsulesManufacturer.tsx`, the static
`/work-with-us` landing page `public/lp/index.html`) — all of them mount the identical
`ally-nutra-consultation` event via `IClosedInlineEmbed`/`buildIClosedBookingUrl`. `calendly-webhook`
and `calendly-register-webhook` are **still deployed** (`supabase/functions/calendly-webhook/`,
`calendly-register-webhook/`) purely to sync the last ~15 legacy Calendly-sourced meetings (latest
2026-08-31, per PR #1200's message) into `meetings` — no new bookings can be created through them.

---

## Q2 — Where the code lives

All of the following exist on `origin/main` today (verified via `git ls-tree -r --name-only
origin/main` / `git show origin/main:<path>`):

| File | What it does |
|---|---|
| `src/pages/Schedule.tsx` | `/schedule` route (`src/components/AnimatedRoutes.tsx:199`). Renders the iClosed embed; prefills `name`+`email` from URL query params only. |
| `src/pages/QualifyResult.tsx` | Post-quote-qualification result page; the "Qualified" outcome includes a "Pick a 20-minute window" line and (per grep) its own path into the booking flow. |
| `src/pages/ThankYouBooked.tsx` (`/thank-you-booked`) | Post-booking landing page with an autoplay VSL; deliberately does **not** restate booking details — "iClosed owns the confirmation." |
| `src/pages/CapsulesManufacturer.tsx` | Paid landing page, its own iClosed embed + "Book a free 20-minute discovery call" CTA. |
| `public/lp/index.html:215-266` | Static (non-React) `/work-with-us` page; embeds iClosed via its own `<script>` loader and its own copy of the postMessage-origin check. |
| `src/lib/iclosedEvents.ts` | Canonical constants: `ICLOSED_CONSULTATION_URL`, `ICLOSED_BOOKING_MESSAGE_TYPE = "iclosed.call_scheduled"`, `isIClosedBookingMessage` (exact match, not prefix — avoids firing on the ~60 `iclosed.widget_height` noise messages per visit), `fireIClosedBookingConversion` (GTM `dataLayer` push, once-per-load guarded), `buildIClosedBookingUrl` (prefill via `iclosedName`/`iclosedEmail`/`iclosedPhone`). |
| `src/hooks/useIClosedBooking.ts` | Shared `postMessage` handler → fires the conversion event → redirects to `/thank-you-booked`. Used by `Schedule.tsx`, `Quote.tsx`, `CapsulesManufacturer.tsx`. |
| `src/components/scheduling/IClosedInlineEmbed.tsx` | The actual `<iframe>`. No `onLoad`/`onError`, no loading state, no timezone param. |
| `src/utils/scheduleUtils.ts` | **Dead code.** Old in-house slot model (`SlotRecord`, RPC `book_appointment_by_time`, per-specialist adjacent-slot check for a 30-minute meeting). Only importer anywhere in the repo is its own test file. |
| `src/components/quote/steps/ContactMethodStep.tsx` | Mid-quote-wizard "schedule/call/message" branch; requires name+email+phone, then navigates to `/schedule?name=&email=&phone=` — **but `Schedule.tsx` never reads the `phone` param** (see Q5). |
| `src/components/quote/saveScheduleLead.ts` | Persists a `leads` row (explicit error handling — a prior version silently swallowed insert failures, "CRM Audit P0-3 / #742") before the wizard navigates to `/schedule`. |
| `src/components/admin/LeadDetailModal.tsx:2408-2427` | Admin "Book meeting" button; calls `buildIClosedBookingUrl({name, email, phone})`, opens in a new tab. Comment confirms the old per-rep `calendly_user_mappings` lookup "is gone" here. |
| `src/pages/AdminMeetings.tsx` | `/admin/meetings` — the canonical admin view. Queries `meetings` directly; stats, rep filter, per-row Join/Reschedule/Cancel links to `meetings.reschedule_url`/`cancel_url`. |
| `src/components/admin/UpcomingAppointmentsSidebar.tsx:10-11` | Sidebar widget; comment: "iClosed is the live scheduling system — bookings land in the `meetings` table via iclosed-webhook." Always renders in ET, never browser-local. |
| `supabase/functions/iclosed-webhook/index.ts`, `mapIClosedCall.ts`, `resolveLead.ts` (+ tests) | Public webhook (`verify_jwt=false`, shared-secret auth). Captures every raw payload into `iclosed_webhook_events` first, then upserts into `meetings` keyed on `iclosed_call_id`. Resolves/creates the `leads` row by email. |
| `supabase/functions/iclosed-backfill/index.ts` | One-off backfill for bookings made 2026-08-11→12, before the webhook existed. |
| `supabase/functions/calendly-webhook/index.ts`, `mapInvitee.ts` | Still live, kept on purpose for the ~15 remaining legacy Calendly meetings (retire after 2026-08-31). Authenticity is by **re-fetching from the Calendly API**, not HMAC (Calendly Standard plan doesn't provide a signing key). |
| `supabase/functions/calendly-register-webhook/index.ts` | Companion one-time webhook-subscription registration. |
| `supabase/functions/send-callback-invite/index.ts`, `resolveSchedulingUrl.ts` | Emails a scheduling link for a requested callback. `resolveSchedulingUrl()` is now a hardcoded constant returning `ICLOSED_CONSULTATION_URL` — the old per-rep lookup "can never return null now" (comment). |
| `supabase/functions/send-meeting-reminders/index.ts` | SMS/email reminder sender — **confirmed dead**, see Q6. |
| `src/pages/Admin.tsx:230,287,311,315,323` | Dashboard "Total Appointments" KPI — reads the **legacy `appointments`** table, frozen since the 2026-08-11 cutover (does not count `meetings`). |
| `supabase/functions/hubspot-fetch-activities/index.ts:143,174` | Rep meeting-count rollup for HubSpot — also reads only legacy `appointments`, so undercounts every booking made since the cutover. |

**No client-portal appointments view was found** in `src/pages/` (confirmed by the Q8 fork; not
exhaustively checked in `src/workspace/`, see "Could not determine").

**Migrations creating/altering `meetings`:**
`supabase/migrations/20260805080100_meetings.sql` (original create, comment: "Replaces the
appointments/availability_slots/Daily model for NEW bookings"), `20260812000000_iclosed_webhook.sql`
(+`iclosed_call_id`, +`iclosed_webhook_events`), `20260812010000_iclosed_call_id_plain_unique.sql`,
`20260812020000_meetings_outcome.sql` (+`outcome`/`outcome_at`), `20260812030000_meetings_iclosed_uuid.sql`
(+`iclosed_call_uuid` — the webhook's `callPreviewId` and the REST API's numeric `id` are different
identifiers for the same call), `20260812040000_meetings_attribution.sql` (+UTM/`gclid`/`fbp`).

No `DROP TABLE` for `appointments` or `availability_slots` was found in any migration — both tables
are frozen history, not deleted (`docs/features/calendly-scheduling-cutover.md`: "dropping it would
cascade into leads/orders").

---

## Q3 — The data model

- **Availability source:** not a table, not a static config — it lives entirely inside iClosed.
  `Schedule.tsx`'s own comment: "Availability is read live from iClosed, so a host changing their
  hours for a single day needs nothing synced on our side." The old in-house `availability_slots`
  table and its cron (`auto-extend-availability`) both still have migrations on disk but the edge
  function and every caller of `getBookableTimesForDate` (the only client-side reader) are gone or
  dead — this data model is vestigial, not live.
- **Slot duration:** the booking copy itself disagrees inside current production — see Q4.
- **Buffers / daily capacity:** not configured in this codebase for the current (iClosed) provider —
  entirely opaque to Ally Nutra's own code. The *old* in-house model (`scheduleUtils.ts`, dead)
  encoded a 15-minute slot grid with an "adjacent slot must also be free" rule for a 30-minute
  meeting — not relevant to current behavior.
- **Per-specialist vs. shared pool:** shared pool, round-robin, handled entirely by iClosed.
  `iclosedEvents.ts`: "This single event carries BOTH Josh and Shaun as hosts, so iClosed does the
  round-robin itself... assignment is the scheduler's job now, not ours." `buildIClosedBookingUrl` is
  explicitly rep-agnostic. The only surviving per-rep code path is `AdminMeetings.tsx`'s rep *filter*
  (reads `meetings.rep_user_id`, which `mapIClosedCall.ts` populates by resolving the iClosed host
  email) — filtering after the fact, not choosing who gets booked.
  - Historical color: an internal complaint is on record. `docs/features/schedule-rep-load-balance.md`:
    *"152 of 152 bookings over 90 days went to Josh"* before Shaun was added, reported directly as
    *"josh is getting so many meetings, he will come take meetings as well."* The fix at the time
    (`next_scheduling_url()` Postgres RPC, least-loaded-rep selection) was itself later made obsolete
    by the move to iClosed's built-in round-robin — that RPC is confirmed dead code today (no callers).
- **Timezone handling:** visitor-facing side is **not in the repo** — no `timezone`/
  `Intl.DateTimeFormat` reference anywhere in `IClosedInlineEmbed.tsx` or `useIClosedBooking.ts`
  (grepped, zero matches); it's inside iClosed's iframe. `meetings.scheduled_at`/`end_at` are stored
  as `TIMESTAMPTZ` (timezone-aware storage). Admin-facing display is hardcoded, not detected:
  `UpcomingAppointmentsSidebar.tsx` comment: "Always render in ET with an explicit label — never
  browser-local (matches AdminMeetings)."
- **`meetings` current full column set** (base + 4 follow-on migrations): `id,
  calendly_event_uri (UNIQUE), calendly_invitee_uri, lead_id, rep_user_id, invitee_name,
  invitee_email, invitee_phone, scheduled_at, end_at, event_type, status, google_meet_url,
  reschedule_url, cancel_url, canceled_reason, raw, created_at, updated_at, iclosed_call_id, outcome,
  outcome_at, iclosed_call_uuid, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid,
  fbp`.
- **What writes to `meetings` today:** three writers — `calendly-webhook` (legacy, ~15 meetings
  left), `iclosed-webhook` (current primary path for every booking surface), and `iclosed-backfill`
  (one-time gap-fill for the ~1 day between the Calendly cutover and the iClosed webhook shipping).

---

## Q4 — How long is the call (production reality, verified against `origin/main`, not assumed)

**Both the demo's numbers are wrong relative to *current* production, but production itself is not
internally consistent either — and it changed underneath a naive grep.**

A first pass reading a stale local checkout (110 commits behind `origin/main`) found "30-minute" in
every relevant file. Re-reading the *actual current* `origin/main` tree directly found it had since
changed to "20-minute" in the user-facing copy:

- `src/pages/Schedule.tsx:47` (current): *"A 20-minute discovery call with our team — pick a slot
  that works for you."*
- `src/pages/QualifyResult.tsx:331` (current): *"...quote. Pick a 20-minute window that works for
  you."*
- `src/pages/CapsulesManufacturer.tsx:195`: *"Book a free 20-minute discovery call..."*
- `src/components/readiness-score/scoring.ts:205,241,279`: three more "20-minute" references.

But **`supabase/functions/send-meeting-reminders/index.ts`** (lines 17, 20, 150, 163, 366, 370, 399,
403) still says **"30 minutes"** throughout — e.g. *"Your call is in 30 minutes!"* This is not
actually a duration contradiction: read closely, this describes when the *reminder* fires relative
to the meeting's start time (30 minutes before), not the meeting's length. (This function is
confirmed dead code regardless — see Q6 — so it doesn't currently reach a real user either way.)

**`src/utils/scheduleUtils.ts:14`** *is* a genuine duration reference ("when it books a
**30-minute** meeting") but this entire file is dead code (Q2/Q3) — a leftover from the retired
in-house slot system, not live.

**So: production's live, user-facing answer today is 20 minutes.** The demo's "15-minute call" (in
`public/quote/index.html`'s booking intro) matches *nothing* found anywhere in current or historical
production copy — 15 minutes does not appear as a call-duration figure anywhere in the company repo.
The demo's "30-minute window" (in the Qualified outcome) matches what production said **before** a
20-minute rewrite that has since shipped — it was right for an earlier snapshot of `Schedule.tsx`/
`QualifyResult.tsx1`, and is now stale by one generation. Neither number in the demo currently
matches live production; "20 minutes" is the one to use if this gets corrected.

---

## Q5 — What it collects and what it prefills

The actual slot-and-contact-entry **form** lives entirely inside iClosed's iframe — this codebase
cannot see or validate its fields beyond three prefill parameters
(`iclosedName`/`iclosedEmail`/`iclosedPhone`, per `buildIClosedBookingUrl`/`IClosedInlineEmbed.tsx`).
What Ally Nutra's own code does before handing off:

- **`/schedule` directly** (`Schedule.tsx:14-16`): reads only `name` and `email` from the URL query
  string; **no `phone` param is read**, even though the code that navigates here
  (`ContactMethodStep.tsx:56-63`) *does* construct and pass a `phone` param. This is a real,
  verifiable prefill drop — a visitor who already typed their phone number into the quote wizard
  has to re-enter it (or however iClosed's own form handles a missing prefill) purely because
  `Schedule.tsx` never reads the parameter that was sent to it.
- **The in-app quote wizard's own embed** (`src/pages/Quote.tsx`, confirmed by a parallel
  investigation): prefills `name`, `email`, **and** an E.164-normalized `phone` — richer than the
  standalone `/schedule` page.
- **Gate check:** `/schedule` is a bare top-level route
  (`src/components/AnimatedRoutes.tsx:199`), no auth wrapper, no quote-submission requirement.
  Anyone can navigate to it directly, with or without query params, and book. `/book/:slug` 404-guards
  by redirecting to `/schedule` (`AnimatedRoutes.tsx:336` — the redirect comment there still says
  "the Calendly-backed /schedule page," itself stale).
- **Can someone book without submitting a quote?** Yes, unambiguously. Beyond the open `/schedule`
  route, the quote wizard itself has a mid-flow "schedule a call" branch
  (`ContactMethodStep.tsx`) that only requires name/email/phone (validated client-side, "Please fill
  in your name, email, phone before scheduling a call" if missing) — it does **not** require the
  quote to be finished. `saveScheduleLead.ts` inserts a `leads` row with
  `completion_stage: "submitted", completion_pct: 100, has_scheduled_call: true, contact_method:
  'schedule', lead_source: 'scheduling'` at that point, then navigates to `/schedule` — a partial
  quote is short-circuited straight into a "complete" lead the moment someone chooses to schedule
  instead of finishing the form.

---

## Q6 — What happens after booking

- **Confirmation email / calendar invite:** none from Ally Nutra's own code.
  `src/pages/ThankYouBooked.tsx` comment states this explicitly: booking details are "deliberately
  NOT restated... iClosed owns the confirmation (it renders its own summary and sends the calendar
  invite/email)."
- **Video link:** not generated by this codebase (Daily.co is fully retired). `mapIClosedCall.ts`
  extracts a `google_meet_url` from the iClosed payload when the location type indicates Google Meet
  and mirrors it onto `meetings.google_meet_url` — passively recorded, not created here.
- **CRM/pipeline record:** yes. `iclosed-webhook/resolveLead.ts` finds-or-creates a `leads` row by
  email (`insert_lead_deduped`, carrying UTM/`gclid`/`fbp` attribution) and sets
  `leads.has_scheduled_call = true`; `meetings.lead_id` links back. This fixed a measured, real
  defect: a code comment (found by a parallel investigation) cites **"86 of 246 meetings in 90 days
  (35%) had lead_id = null"** before this resolver existed (measured 2026-08-14) — a concrete volume
  figure: roughly 246 meetings across all providers in a 90-day window, prior to this fix.
- **SMS reminders — confirmed NOT a live consumer of anything, including the A2P opt-in work.**
  `send-meeting-reminders/index.ts` is a real, fairly sophisticated function (Twilio SMS + email
  queue, `sms_consent`-gated, quiet-hours-aware, an `ENABLE_BOOKING_SMS` flag) — but it reads from
  the **legacy `appointments`** table, and has **zero live callers** anywhere in the current
  codebase (confirmed by full-repo grep). `docs/features/calendly-scheduling-cutover.md`'s own
  "Known gaps / follow-ups" section lists it explicitly: *"send-meeting-reminders... now
  stale/likely-orphaned (were driven by deleted Daily flows) — harmless, remove in a follow-up."*
  **So: booking today is not a consumer of the A2P SMS opt-in campaign.** The reminder code that
  would eventually consume it is dead, reading a table that no new booking ever writes to.
  No `a2p`/`10dlc` string exists anywhere in `src/` or `supabase/functions/` on `main` — the
  in-flight `~/ally-nutra` branch's `sms_optins` table (read separately, uncommitted) is a
  **standalone TCPA proof-of-consent ledger** for A2P 10DLC campaign approval (`campaign CM698bad`,
  error 30882), explicitly kept apart from `leads`/quotes/meetings by design (migration comment:
  "Kept separate from the quote pipeline so opt-ins do not create bogus quote/lead records") — it is
  infrastructure to get SMS sending *allowed* at all by carriers, not a per-booking consent gate, and
  it is not wired to `send-meeting-reminders` or any meeting flow.
- **SMS/TCPA consent question — provider history, current status unknown.** During the Calendly era,
  the old native form's explicit SMS-consent checkbox was replaced by a required custom question
  configured *on Calendly's own event*, not in this codebase (`docs/features/calendly-meetings.md`,
  "SMS consent / TCPA" section — verified 2026-07-20 against a screenshot of the live page, which is
  not itself in the repo). **Whether an equivalent consent question exists on the current iClosed
  event is not documented anywhere in this repo** — no `docs/features/iclosed-*.md` exists at all.
  This is a real open question, not something I could confirm either way from the codebase.

---

## Q7 — Reschedule and cancel

**Both exist as a real mechanism today — but not "reply to the confirmation email," and not
uniformly proven for every event type yet.**

- `mapIClosedCall.ts` normalizes incoming iClosed events into `booked | rescheduled | canceled |
  outcome | unknown` and extracts `event.rescheduleLink`/`event.cancelLink` into
  `meetings.reschedule_url`/`cancel_url`. A `rescheduled` event upserts the same row (matched on
  `iclosed_call_id`) with an updated `scheduled_at`; `canceled` sets `status='canceled'` +
  `canceled_reason`.
- **Client mechanism:** iClosed's own hosted reschedule/cancel pages, reached via links **iClosed
  itself** puts in **its own** confirmation email. Ally Nutra sends no confirmation email for
  iClosed bookings (Q6), so there is no "reply to this email to reschedule" mechanism in the current
  flow — that phrasing in the `public/quote/index.html` demo does not correspond to any inbound-email
  handler in the real app (no reschedule-parsing logic was found anywhere; grepped for
  `handle-email-reply`-style functions, none exists for meetings). If that copy were carried into a
  real redesign as-is, it would be describing a mechanism that does not exist for the current
  provider.
- **Admin mechanism:** real and working uniformly for both providers.
  `AdminMeetings.tsx:293-310` renders Reschedule/Cancel buttons directly from
  `meetings.reschedule_url`/`cancel_url` whenever present on an upcoming meeting — same two columns
  serve both legacy-Calendly and current-iClosed rows.
- **Confirmed residual risk, not a confirmed incident:** `mapIClosedCall.ts`'s own comment says only
  the `booked` action has actually been observed against a real iClosed delivery
  (`iclosed_webhook_events` captured one on 2026-08-12); `rescheduled`/`canceled` are inferred from a
  guessed event-name vocabulary, not yet observed live. If iClosed's real payload for those two
  differs from the guess, such a delivery would be captured (in `iclosed_webhook_events`) but land as
  `action:'unknown'`/`meeting_id: NULL` — recorded, not lost, but also not reflected in `meetings`
  until someone reads and fixes the mapper. No live database access was available to confirm whether
  this has actually happened.

---

## Q8 — The ops side

- **Admin:** `AdminMeetings.tsx` (full list, `.from("meetings")`, rep filter, Join/Reschedule/Cancel
  links) and `UpcomingAppointmentsSidebar.tsx` (same table) are the canonical current views, and they
  **do** get populated by iClosed bookings — the "iClosed doesn't reach the CRM" gap that a still-live
  code comment in `Schedule.tsx` claims ("KNOWN GAP... bookings made here are invisible in the CRM.
  See ally-os#231 item 1.") is **stale**; the fix (`iclosed-webhook`, PR #1176, 2026-08-12) shipped
  the day *before* the retirement commit (PR #1200, 2026-08-13) that repeated the same "no webhook
  yet" claim in its own commit message — both statements were already out of date the moment they
  were written.
- **Client portal:** no client-facing "your upcoming meetings" view was found under `src/pages/`; the
  `src/workspace/` tree was not exhaustively searched, so treat this as "not found," not "confirmed
  absent" (see "Could not determine").
- **Real, current gap for a redesign to watch for:** two internal reporting surfaces still read only
  the legacy `appointments` table and will never reflect a booking made after 2026-08-11:
  `src/pages/Admin.tsx`'s dashboard "Total Appointments" KPI, and
  `supabase/functions/hubspot-fetch-activities/index.ts`'s rep meeting-count rollup for HubSpot (its
  own comment even says "meetings → appointments.host_user_id (Daily.co, stays here long-term)" —
  written for the *old* system, never updated when `meetings` became the live table). A picker
  redesign wouldn't touch these directly, but anyone using them to judge "how well is the new picker
  performing" would be reading a frozen, pre-cutover number.
- **A structurally similar risk already happened once, elsewhere in the app** (worth flagging as a
  pattern, not a scheduling bug itself): commit `b39c6917` (2026-08-18) fixed 53 leads (41 real
  companies) stranded and invisible to every rep because BQA scoring was switched off 2026-08-10 but
  the completion gate waiting on a score was never removed — the exact same class of failure
  (an upstream system retired, a downstream reader never updated to match) this investigation was
  checking for on the booking side.

---

## Q9 — Failure and edge states

`Schedule.tsx` renders `IClosedInlineEmbed` as a bare `<iframe>` — no `onLoad`/`onError`, no loading
skeleton, no timeout, no retry, no timezone parameter. The real slot-picking UI is entirely inside
`app.iclosed.io`'s iframe, a third party this codebase has zero visibility into.

| State | Handled in this codebase? |
|---|---|
| No availability in range | Not handled — inside the iframe |
| All slots taken | Not handled — inside the iframe |
| Slot taken between load and submit | Not handled — inside the iframe, no client-side re-check |
| Invalid/unrecognized visitor timezone | Not handled — no timezone param is ever sent to the iframe at all |
| Booking submitted twice | Not handled for the booking itself (that's inside the iframe); the app-side analytics *event* is de-duplicated per page load (`fireIClosedBookingConversion`'s module-level guard), which is a different thing |
| Network failure loading the widget | Not handled — plain `<iframe src=...>`, no error boundary, no fallback UI |

**Honest summary:** every one of these is either delegated wholesale to a third-party iframe with no
wrapper handling at all, or (double-submit) only partially covered on the analytics side. A redesign
of the visitor-facing picker has essentially a blank slate to design real handling for all six —
none of it currently exists to preserve.

---

## Q10 — Evidence of how it performs

- **Analytics: real, and confirmed against a live test, not a guess.** Commit `909b3ff4`
  (2026-08-13) is a genuine root-cause fix: *"A real test booking on allynutra.com/schedule
  (2026-08-13) revealed"* that iClosed keys its postMessages on `type`, never `event` — so the old
  GTM bridge tag's `calendly`-prefix check silently never fired for iClosed. The commit documents the
  full observed message vocabulary (`iclosed.widget_height` fires ~60×/visit as noise,
  `iclosed.potential`, `iclosed.qualified`, `iclosed.call_scheduled` = the real conversion) and fixes
  it with an exact-match check plus a once-per-load guard, deliberately scoped to feed GA4 only
  (iClosed's own native Meta Pixel/GTM integrations were separately enabled on the ad account the
  same day, to avoid double-counting a conversion).
- **Booking-volume evidence:** two real, dated numbers exist, both from commit messages, neither from
  a live dashboard:
  - **~246 meetings in a 90-day window** (all providers, measured 2026-08-14, cited as the
    denominator for the 35%-null-`lead_id` defect in Q6).
  - **6 iClosed-specific meetings** measured 2026-08-15 (very early post-cutover), all 6 resolved to
    a lead, 0% orphan rate.
  - No dashboard widget or persisted metric showing a running booking count over time was found
    anywhere in `src/pages/Admin*` beyond the stale `appointments`-only KPI (Q8).
- **A real, quoted internal complaint exists**, about load distribution rather than the picker's UX:
  *"josh is getting so many meetings, he will come take meetings as well"* — the trigger for adding
  Shaun as a second rep and building the (since-obsoleted) `next_scheduling_url()` load-balancer
  (`docs/features/schedule-rep-load-balance.md`).
- **A real, active bugfix trail during the iClosed build-out** (all in commit *titles*, i.e. what the
  authors themselves called them): "map iClosed's real payload paths, not guesses"; "stop a sparse
  iClosed event wiping booking details"; "read the Meet URL, not the location type"; "iClosed
  pagination is 0-indexed, start at page 0"; three consecutive fixes to "correct the iClosed API
  host, report network errors." This is the normal signature of integrating against an undocumented
  third-party webhook (iClosed publishes no payload schema, confirmed by
  `iclosed_webhook_events`'s own table comment), not evidence of an unusually broken system — but it
  does mean the mapping logic was wrong more than once before it stabilized.
- **No customer-facing complaint, no drop-off/abandonment instrumentation** on `/schedule` itself was
  found anywhere (no PostHog or equivalent event tracking iframe-load failure or time-to-book) — only
  the post-booking conversion fires. **This absence is itself a finding:** nothing in this codebase
  would currently show anyone that a visitor opened `/schedule` and never booked.

---

## What I could not determine, and why

- **Whether an SMS/TCPA consent question exists on the current iClosed event.** The Calendly-era
  equivalent was documented and screenshot-verified (`docs/features/calendly-meetings.md`); no
  equivalent `docs/features/iclosed-*.md` exists, and this codebase has no visibility into iClosed's
  own event configuration. Not in the repo.
- **Whether `iclosed_webhook_events` currently holds any real `meeting_id IS NULL` rows** — i.e.
  whether the reschedule/cancel-mapping residual risk (Q7) has actually manifested for a real
  booking. No live database query access from a git checkout; only the code path that would produce
  such a row could be confirmed, not whether it has fired.
- **Whether `ICLOSED_WEBHOOK_SECRET` is actually set in the deployed environment, or whether the
  webhook is actually registered on iClosed's side.** Confirmed in code; deployment/runtime state is
  not observable from a repo checkout.
- **Whether a client-facing "your upcoming meeting" view exists anywhere under `src/workspace/`** —
  not exhaustively searched; treat "not found" in this investigation as inconclusive, not as
  "confirmed absent."
- **Whether the `Schedule.tsx` inline comment claiming the CRM-visibility gap is still open reflects
  any real current discrepancy, or is simply an un-updated comment.** Everything else in the repo
  (the webhook, the migration, the sidebar comment, the AdminMeetings query) contradicts it, but this
  can't be proven from source alone without deployment visibility.
- **GitHub issues, Slack, or any complaint channel outside git history.** Only commit messages and
  code comments were searched; no issue tracker was consulted (none was accessible from this
  investigation's tools). "ally-os#231" is referenced by name in two places
  (`Schedule.tsx`'s stale comment and the `iclosed_webhook.sql` migration) but that tracker (a
  separate repo, `ally-os`) was not read.
