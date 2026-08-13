# Landing Page Review — Conversion Architecture & Product Claims Audit

**Repo audited:** `nutrazed/ally-nutra-landing` @ `c1eb94121a33db1d9419a531d77b33f06fc0f95a` (2026-08-11)
**Company repo (product facts):** `Ally-Nutra-LLC-New/ally-nutra` @ `main`
**Company repo (conversion / booking, in-flight):** `Ally-Nutra-LLC-New/ally-nutra` @ `landing-redesign/an-design-001-full-site`, HEAD `dcdfb732`
**Design-direction reference (non-authoritative for product facts):** `landing-redesign.html`, `Ally Nutra Design System (standalone).html`

Every claim below is cited `file:line`. Where a claim in the original brief could not be reproduced in current code, that is stated explicitly rather than assumed.

---

## 1. Executive summary

Both complaints are supported by the evidence, for different reasons than you might expect.

**Complaint 1 (not conversion-engineered):** The home view's *very top* is actually fine — a working "Get a free quote" CTA and phone number sit above the fold at both 1440×900 and 390×844 (§2.5). The real defect is downstream: **the quote form does not submit anything.** `Contact.jsx:6-9` calls `e.preventDefault()` and shows `alert('Thanks — this is a design mockup, so nothing was actually sent.')`. Every "quote" CTA on all 10 views, and every CTA labeled "Schedule a call/visit" or "Request a tour," resolves to this same dead form. **There is no meeting-booking mechanism anywhere in the codebase** — zero booking SDK, zero backend call of any kind (3 runtime dependencies total: react, react-dom, react-router-dom). Meanwhile the company's real, currently-live site already has a working native booking flow at `/schedule`, and is mid-migration to Calendly on an unmerged branch.

**Complaint 2 (advertises products not offered):** Confirmed, with a headline-level conflict: the personal repo's home view claims **"Eight formats, all in-house"** (`Home.jsx:759`, backed by an 8-item product grid). The company's actual production homepage (`ally-nutra@main`) states, in six separate places including its SEO title tag, that it offers **exactly four formats — capsules, sachets, stick packs, pouches.** Tablets, powders, gummies, and liquids appear nowhere in production. The personal repo also contradicts itself internally on capsule sizes (000–3 vs. 000–4), capsule MOQ (2,500 vs. 10,000), format count (8 vs. 6 vs. 5 vs. 4, all within the repo), certification count (7 claimed vs. 6 actually documented), and FAQ count (22 vs. 26).

Three of the six contradictions your team flagged as "already known" — the phone number, the private-label MOQ, and the samples fee — **do not reproduce in the current codebase.** Every instance found says the same thing (one phone number, 100-unit MOQ, free samples). These may have existed in an earlier draft; they are not in what's live today. Report them as resolved-or-never-shipped, not as open bugs.

---

## 2. Conversion findings

### 2.1 CTA inventory (all 10 views)

| View | CTA text | Destination | Real action? |
|---|---|---|---|
| Home.jsx:624,843 | "Get a free quote →" | `/contact` | Real nav → dead form |
| Home.jsx:625 | "Explore capabilities" | `/services` | Real nav |
| Home.jsx:388 | "Learn more about us →" | `/about` | Real nav |
| Services.jsx:24,218 | "Get a free quote →" | `/contact` | Real nav → dead form |
| Services.jsx:25 | **"Schedule a call"** | `/contact` | **Fake — same dead quote form, no scheduling** |
| Services.jsx:65,81,97,113 | "Get a [format] quote →" ×4 | `/contact` | Real nav → dead form |
| CapsuleManufacturing.jsx:23,203 | "Get a capsule quote →" | `/contact` | Real nav → dead form |
| CapsuleManufacturing.jsx:24 | "Explore options" | `#cap-types` | Scroll anchor, same page |
| Certifications.jsx:23,272 | "Request documentation →" | `/contact` | Real nav → dead form |
| Certifications.jsx:24 | "View certifications" | `#cert-grid` | Scroll anchor |
| Contact.jsx:117 | "Submit quote request →" | form `onSubmit` | **Broken — `alert()`, nothing sent (Contact.jsx:6-9)** |
| Contact.jsx:212 | **"Schedule a visit →"** | `#contact-form` | **Fake — scrolls to the same dead form** |
| Contact.jsx:225 | "Browse all FAQs →" | `/faq` | Real nav |
| Contact.jsx:236 | "Call (888) 720-5888 →" | `tel:` | Real |
| ContractManufacturing.jsx:24 | "Get a quote in 5 minutes →" | `/contact` | Real nav → dead form |
| ContractManufacturing.jsx:25 | "View capabilities" | `#cm-capabilities` | Scroll anchor |
| ContractManufacturing.jsx:148 | "See all eight formats we manufacture →" | `/home` | Real nav (asserts the "eight formats" claim disputed in §3) |
| ContractManufacturing.jsx:162 | "See our certifications →" | `/certifications` | Real nav |
| ContractManufacturing.jsx:171 | "Start your quote →" | `/contact` | Real nav → dead form |
| Facility.jsx:28 | **"Request a tour →"** | `/contact` | **Fake — no tour scheduling, same dead quote form** |
| Facility.jsx:29 | "Explore the facility" | `#facility-areas` | Scroll anchor |
| Facility.jsx:214 | "Go to contact →" | `/contact` | Real nav → dead form |
| Faq.jsx:260 | "Get instant quote →" | `/contact` | Real nav → dead form (also see "5-minute"/"instant" framing, §2.6) |
| Faq.jsx:261 | "Call (888) 720-5888" | `tel:` | Real |
| PrivateLabel.jsx:34 | "Browse the catalog →" | `/contact` | **Misleading — no catalog exists to browse (§3.2)** |
| PrivateLabel.jsx:35 | "How it works" | `#pl-how` | Scroll anchor |
| PrivateLabel.jsx:114,195 | "Request full catalog (200+ SKUs) →" / "Request the catalog →" | `/contact` | **Misleading — routes to generic quote form, no catalog delivered** |
| PrivateLabel.jsx:185 | "Browse our FAQ →" | `/faq` | Real nav |
| About.jsx:22 | "Work with us →" | `/contact` | Real nav → dead form |
| About.jsx:23 | "Read our story" | `#our-story` | Scroll anchor |
| About.jsx:241 | "Start the conversation →" | `/contact` | Real nav → dead form |
| Header.jsx:163-168 (sticky, all pages) | "(888) 720-5888" | `tel:` | Real, always visible (`.site-header{position:sticky}`, global.css:83) |

**No `href="#"` dead links exist anywhere in the repo.** Every CTA either navigates, scroll-anchors, or `tel:`/`mailto:`s somewhere real. The failure mode is worse than a dead link: several CTAs use booking/tour/catalog language that **implies a capability the destination doesn't have** — "Schedule a call," "Schedule a visit," "Request a tour," "Browse the catalog" all land on the same generic 10-field quote form, and that form doesn't submit.

### 2.2 Path to conversion

- **Request a quote:** 1 click from Home (`Home.jsx:624`) to `/contact`. Form is NOT on the home view — every quote CTA navigates away to Contact. Form has 10 fields (`Contact.jsx:46-108`): 6 required (first name, last name, email, brand/company, service dropdown, project details textarea), 4 optional (phone, website, order-volume dropdown, newsletter checkbox). **Submitting returns a JS alert; no data is sent anywhere** (`Contact.jsx:6-9`) — there is no backend, no `fetch`/`axios`/API call, no Supabase/Formspree/EmailJS integration anywhere in `src/` (confirmed by repo-wide grep; `package.json` dependencies are `react`, `react-dom`, `react-router-dom` only).
- **Book a meeting: no mechanism exists.** Grep across the entire repo for `calendly|hubspot|cal\.com|savvycal|acuity|book.?a.?meeting|schedule.?meeting|google.?calendar` returns zero matches in `src/` or `package.json`. Every CTA using scheduling language (`Services.jsx:25`, `Contact.jsx:212`, `Facility.jsx:28`) routes to the same non-functional quote form. This is not a gap to quietly fill — it's the finding.

### 2.3 Scroll depth to first conversion CTA (measured, Playwright, built `dist/` served via `vite preview`)

| Metric | 1440×900 | 390×844 |
|---|---|---|
| First quote CTA offset (`Home.jsx:624`, "Get a free quote") | 698px | 723px |
| Viewport height | 900px | 844px |
| Viewport-heights of scroll needed | **0.78 (within first screen)** | **0.86 (within first screen, tight)** |
| Total home view height | 10,224px | 23,409px |
| First-CTA offset as % of total height | 6.8% | 3.1% |

The primary quote CTA is visible without scrolling at both sizes — on mobile it clears the fold by only ~15–20px of margin (button bottom ≈829px vs. 844px viewport; real mobile browsers reserve additional space for URL-bar chrome, so in practice it may sit just below the visible fold on many devices). The header's phone CTA (`Header.jsx:163-168`) is sticky and visible at 0 scroll on every page at every viewport — confirmed at both 1440px and 390px (no breakpoint hides it; the 1100px media query at `global.css:134-136` hides only `.main-nav`, not `.call-btn`).

The scroll-depth numbers are good. The overall page length (10,224px desktop / 23,409px mobile — **≈11.4 and ≈27.7 viewport-heights respectively**) is not; see §2.4.

### 2.4 Section-by-section purpose audit (Home view)

Classification: **CONVERTS** (direct quote/booking CTA) · **SUPPORTS** (credibility needed to convert) · **REFERENCE** (detail wanted only once already interested) · **DECORATIVE** (neither). Two calls are genuinely borderline and flagged as such — this classification is a judgment call, not a measurement.

| # | Section (class, Home.jsx) | Desktop px | Mobile px | Category | Why |
|---|---|---|---|---|
| 1 | `.hero.hero-home` | 843 | 1,213 | **CONVERTS** | Headline + 2 CTAs |
| 2 | `.section-navy` (pull quote) | 213 | 314 | DECORATIVE | Self-authored tagline, no evidence, no action |
| 3 | `.section.about-scroll` (5-stage sticky scroll) | 2,416 | 3,522 | SUPPORTS | Process credibility, ends in a soft CTA to `/about` |
| 4 | `.section-alt` (company snapshot / StatPanel) | 526 | 1,053 | SUPPORTS | Trust stats (years, brands, certs) |
| 5 | `.section` ("Why Ally Nutra", 4-row + "receipts") | 786 | 1,323 | SUPPORTS | Direct credibility claims with evidence |
| 6 | `.section-navy` (R&D and innovation, 4-cell) | 621 | 2,017 | REFERENCE *(borderline SUPPORTS)* | Methodology depth wanted once already interested |
| 7 | `.section` (product grid, 8 formats) | 1,965 | 6,827 | SUPPORTS *(borderline REFERENCE)* | Core fit-qualifying info, but see §3 — 4 of 8 claims are disputed |
| 8 | `.section-alt` (facility, 6 zones) | 1,702 | 4,859 | REFERENCE | Matches the team's own example of "informational" content |
| 9 | `.section` (testimonials, 3 cards) | 549 | 1,093 | SUPPORTS, **but flagged unverifiable in its own code comment** | See below |
| 10 | `.section-navy` (final CTA) | 161 | 168 | **CONVERTS** | "Get a free quote" |

**Ratio (desktop, main content only, 9,782px):** CONVERTS 10.3% : SUPPORTS 63.8% : REFERENCE 23.7% : DECORATIVE 2.2%
**Ratio (mobile, 22,389px):** CONVERTS 6.2% : SUPPORTS 61.7% : REFERENCE 30.7% : DECORATIVE 1.4%

If section 7 (product grid) is instead scored REFERENCE — a defensible alternative reading, since it's a spec-dump — the desktop split becomes CONVERTS 10.3% : SUPPORTS 43.7% : REFERENCE 43.7% : DECORATIVE 2.2%. Either way, roughly 9 out of every 10 pixels on the home view are not a direct conversion push, which is exactly the team's complaint, quantified.

**Testimonials are marked unverifiable in the source itself:** `Home.jsx:806-807` — `// TODO: replace with real names, companies, and headshots once client permission is obtained. Current attributions are initials-only and cannot be verified by a reader.` A credibility section that admits its own attributions can't be verified directly contradicts the "Transparent — lead with proof" principle in the adopted design spec (§4 below).

### 2.5 Above-the-fold test (1440×900 and 390×844, no scroll)

Screenshots captured via Playwright against the built `dist/` output.

| Question | 1440×900 | 390×844 |
|---|---|---|
| (a) What does this company do? | **Yes** — "Ally Nutra is a full-service contract supplement manufacturer helping wellness brands launch, scale, and stand out" | **Yes** — same copy, stacked |
| (b) Who is it for? | **Yes, generically** — "wellness brands," reinforced by "Flexible MOQs," "Turnkey OEM/ODM" | **Yes, generically** — same |
| (c) What am I meant to do next? | **Yes** — "Get a free quote" and "Explore capabilities," both visually primary | **Yes** — same two buttons, stacked |

All three pass at both sizes. This is a genuine strength of the current design and should not be broken in any restructure — the problem is not the hero, it's everything the hero's promise fails to deliver on (§2.1–2.2).

### 2.6 Friction audit — quote form (`Contact.jsx:35-119`)

- 10 fields total, 6 required (first name, last name, email, brand/company, service-interested dropdown, project-details textarea).
- Copy claims "5-minute form" (`Contact.jsx:29`) and elsewhere "Get a quote in 5 minutes" (`ContractManufacturing.jsx:24`) and "Get instant quote" (`Faq.jsx:260`) — a free-text required paragraph plus 6 required fields is a reasonable ask for a manufacturing RFQ, but "instant" and "5 minutes" both overpromise relative to the stated downstream process (`Contact.jsx:126-129`: confirmation in 1 business day, discovery call in 2, quote in 5 business days — i.e., **quote turnaround is 5 business days, not instant or 5 minutes**).
- The form **does** set post-submission expectations well (`Contact.jsx:121-131`, the "What happens next" 4-step timeline) — this is good practice, undermined entirely by the form not submitting.

---

## 3. Product-claim reconciliation

Source of truth for **product/service facts**: `Ally-Nutra-LLC-New/ally-nutra@main`, `src/pages/Index.tsx` + `src/components/landing/*.tsx` — the real, live production homepage. Confirmed byte-identical to the current in-flight branch (`git diff --stat main...HEAD` shows zero changes to `Index.tsx` or `src/components/landing/`), so branch choice does not affect this comparison.

`landing-redesign.html` and `allynutra-lp-clone` carry **zero authority** for this section (see §6 for why each is excluded).

### 3.1 Production's own claims (ally-nutra@main)

| Claim | Citation |
|---|---|
| Exactly 4 formats: capsules, sachets, stick packs, pouches | SEO title (`Index.tsx:38`: "Capsules, Sachets, Stick Packs & More"), SEO description (`Index.tsx:16-17,40`: "capsules, sachets, stick packs, and resealable pouches"), Hero format list (`HeroSection.tsx:44-47`: "Capsules • Sachets • Stick Packs • Pouches"), CapabilitiesSection heading (`CapabilitiesSection.tsx:~40`: "Four delivery formats. One trusted partner."), CapabilitiesSection `capabilities` array (`CapabilitiesSection.tsx:8-30`, exactly 4 entries), WhyChooseUsSection copy (`WhyChooseUsSection.tsx:~78`: "capsules, sachets, stick packs, and pouches"), Footer copy (`Footer.tsx:18`: same four) |
| Primary CTA is a phone call, not a quote form | `CTASection.tsx:22-30`: "Ready to Get Started? Call Us Now" is the headline and primary button; quote/schedule are labeled "Secondary CTAs" (`CTASection.tsx:33`) |
| Two real, tracked target actions: quote (`/quote`) and booking (`/schedule`) | `HeroSection.tsx:60-77`, `CTASection.tsx:44-58`, `HowItWorksSection.tsx:14-24` — all route to real internal pages, with `trackCtaClick` analytics on the scheduling CTAs |
| Stats: "1,000+ Products Made," "4hr Email Response," "100% USA Made" | `WhyChooseUsSection.tsx:33-37` |
| Same phone number as personal repo | `CTASection.tsx:25`, `Footer.tsx:22`: `(888) 720-5888` |
| Different support email than personal repo | `Footer.tsx:~82`: `support@allynutra.com` vs. personal repo's `hello@allynutra.com` (`Contact.jsx:25`) |

### 3.2 Reconciliation table

| Claim | Personal repo | Production (ally-nutra@main) | Verdict |
|---|---|---|---|
| Manufactures capsules, sachets, stick packs, pouches | Home.jsx:112-120 (4 of 8) | Confirmed, repeatedly (§3.1) | **CONFIRMED** |
| Manufactures tablets | Home.jsx:114 ("Compressed, chewable, bilayer"); Services.jsx:61 (000-4 sizing, contradicts own page) | Not mentioned anywhere in Index.tsx or its 5 landing components | **REMOVE** — pending team confirmation |
| Manufactures powders | Home.jsx:118; Facility.jsx:167 ("powder filling lines") | Not mentioned | **REMOVE** — pending team confirmation |
| Manufactures gummies | Home.jsx:119 | Not mentioned | **REMOVE** — pending team confirmation |
| Manufactures liquids | Home.jsx:120 | Not mentioned | **REMOVE** — pending team confirmation |
| "Eight formats, all in-house" | Home.jsx:759 | Contradicted — production says "Four delivery formats" (`CapabilitiesSection.tsx`) | **CONFLICT** |
| Capsule sizes 000–3 | Home.jsx:113; CapsuleManufacturing.jsx:19,76,81-86 | Not stated in the 5 landing components read (would need `/services` deep page, out of scope for this pass) | **UNRESOLVED** vs. production; **internally CONFLICT** vs. own repo (see below) |
| Capsule sizes 000–4 | Home.jsx:59 (About stage 3 body); Services.jsx:61 | — | **CONFLICT** (internal, personal repo only — Home.jsx contradicts itself at lines 59 vs. 113) |
| Capsule MOQ 2,500 | Home.jsx:113; CapsuleManufacturing.jsx:33; ContractManufacturing.jsx:33,140 | Not stated in landing components read | **UNRESOLVED** vs. production; **internally CONFLICT** — Services.jsx:63 says 10,000 for the same product |
| Private label MOQ 100 bottles/SKU | PrivateLabel.jsx:42,58,178; Services.jsx:144; Home.jsx:572-576; Faq.jsx:62 | Not addressed (production has no dedicated private-label page in the 5 files read) | **UNRESOLVED** — internally consistent (all 5 personal-repo instances agree on 100) |
| "200+" private-label formulas/SKUs | PrivateLabel.jsx:30,41,95,114,122; Services.jsx:141,143; ContractManufacturing.jsx:64; About.jsx:167 | Not addressed | **UNRESOLVED**, and separately: the repo's own `CATALOG` array (`PrivateLabel.jsx:10-19`) only enumerates 8 illustrative SKUs — the "200+" figure has zero backing data in this codebase either way |
| $0 formulation fee for private label; $3,000–$15,000 for custom | PrivateLabel.jsx:44,179 | Production quoting (per this repo's own `docs/architecture` / `.claude/rules/quoting.md`) charges a **flat $3,000 startup fee unconditionally**, on every quote, plus material and manufacturing cost — not a fee that varies $0 vs. $3–15K by program | **CONFLICT** — needs a real pricing-team decision, not just a copy fix |
| Certifications: "7" — cGMP, NSF, organic, kosher, halal, non-GMO, ISO | Home.jsx:544-549 | Personal repo's own dedicated Certifications.jsx page documents only **6**: cGMP, FDA, NSF, USDA organic, Halal, Kosher (`Certifications.jsx:101-156`) — "non-GMO" and "ISO" appear on neither the Certifications page nor anywhere in production | **CONFLICT** (internal) + **REMOVE** (non-GMO, ISO) — pending confirmation. Note: "ISO" on Home.jsx:549 is plausibly a confusion with the ISO-8/ISO-7 *cleanroom air classifications* named in Facility.jsx:201-203, which are not product certifications |
| FAQ count: "22" | Contact.jsx:222 | Personal repo's own Faq.jsx has 26 questions (`FAQ_GROUPS`, `Faq.jsx:5-68`; `CATEGORY_BUTTONS` "all" count = 26, `Faq.jsx:71`) | **CONFLICT** (internal, not one of the 6 originally flagged — found during this audit) |
| Phone (888) 720-5888 | Consistent everywhere in current code (Header, Footer, Contact, Faq, About) | Same number (`CTASection.tsx:25`) | **CONFIRMED** — matches production |
| Phone (302) 555-0100 | **Not present in any current `.jsx` file.** Found only in one now-superseded source mockup, `~/Downloads/contract-manufacturing-page.html:695`, which was not carried into the built app | — | Original brief's contradiction (a) **does not reproduce in current code** |
| Private label MOQ "1,000 units" | **Not present anywhere in current code.** Repo-wide search found no such figure attached to private label; the only "1,000"s are a capsule fill-weight spec (CapsuleManufacturing.jsx:81) and generic order-volume dropdown ranges (Contact.jsx:93-94) | — | Original brief's contradiction (c) **does not reproduce in current code** |
| Samples: "free pilot batch" vs. "small fee credited to first order" | Every instance found says **free**: ContractManufacturing.jsx:82, About.jsx:227, Faq.jsx:64. Zero instances of a fee-based version anywhere in the repo | — | Original brief's contradiction (e) **does not reproduce in current code** |
| Email response time | "Response within 1 business day" (Contact.jsx:26) | "4hr Email Response" stat (`WhyChooseUsSection.tsx:35`) | **CONFLICT** — found during this audit, not one of the original 6 |
| Lead time | "4–8 wks" (Home.jsx StatPanel, `Home.jsx:528-531`) | "4–6 wk" (PrivateLabel.jsx:43, ContractManufacturing.jsx:34, Contact.jsx:129) | **CONFLICT** (internal, minor) — found during this audit |
| Support email | `hello@allynutra.com` (Contact.jsx:25) | `support@allynutra.com` (Footer.tsx:~82) | **CONFLICT** — found during this audit |

**REMOVE list — awaiting team confirmation before anything is cut:**
1. Tablets as a manufactured format
2. Powders as a manufactured format
3. Gummies as a manufactured format
4. Liquids as a manufactured format
5. "Non-GMO" as a held certification
6. "ISO" as a held certification (distinct from the ISO-class cleanroom ratings, which ARE real per Facility.jsx)

Absence from production is evidence, not proof — it is entirely possible Ally Nutra manufactures all eight formats and production's copy is simply narrower/older. **This must be confirmed by the team before any of the above is deleted.**

### 3.3 Conversion architecture — company repo comparison

Production (`main`) already has a materially better conversion architecture than the personal repo on the actions that matter:

- **Quote:** `/quote` is a real, tracked route (`TrackedLink to="/quote"`, `trackCtaClick`, `HeroSection.tsx:60-66`). Not audited end-to-end in this pass (out of scope — this task covers the personal repo and the landing surface only), but it is backed by a real app, not a mock `alert()`.
- **Booking exists today, natively, and is mid-migration to Calendly:**
  - **As shipped on `main` right now:** `/schedule` renders the native `Schedule` page and `/book/:slug` renders `BookSpecialist.tsx` (556 lines) — a real per-specialist booking flow backed by `book_appointment_atomic`/`reschedule_appointment_atomic`/`cancel_appointment_atomic` RPCs, `availability_slots`, and Daily.co video rooms (per this repo's own `AGENTS.md` "Domain-specific" gotchas).
  - **On the current in-flight branch (`landing-redesign/an-design-001-full-site`, unmerged):** `BookSpecialist.tsx` is deleted entirely (`git diff --stat main...HEAD`: -556 lines), `/book/:slug` now redirects to `/schedule` (`AnimatedRoutes.tsx:340-343`: *"Legacy per-rep native booking (BookSpecialist) is decommissioned — Calendly... the Calendly-backed /schedule page instead of 404ing"*), and `Schedule.tsx` is rewritten from ~558 lines to 82 lines as a thin Calendly inline-embed wrapper (`src/pages/Schedule.tsx:1-60`), hardcoded to a single rep for now (`src/lib/calendlyBooking.ts:1-3`: *"Josh is the only scheduling rep today... Multi-rep later: swap for a lookup / round-robin"*).
  - This migration is **not yet on `main`** and not yet live in production.
- **What the landing page would need to integrate with:** once the Calendly migration ships, a "book a meeting" CTA on the landing page should link to the company's real `/schedule` route (which itself hosts the Calendly embed) rather than embedding Calendly a second time — this keeps a single integration point and lets the booking backend change (native → Calendly → whatever's next) without the landing page needing to know. This is a architectural note for the team's decision, not a design the personal repo should implement independently.

### 3.4 Design system comparison

| Token | AN-DESIGN-001 v1.0 (adopted spec) | Personal repo (`tokens.css`) | Production (`main`, `index.css`) | landing-redesign.html (self-labeled "v2") |
|---|---|---|---|---|
| Navy | `#1E3A5F` / `214 52% 24%` | `214 52% 24%` — **exact match** | `215 60% 22%` — close, not exact | `#1E3A5F` present |
| Orange | `#F0A829` / `38 87% 55%` | `38 87% 55%` — **exact match** | `39 92% 55%` — close, not exact | `#F0A829` present |
| Light navy | `#2E5D9E` / `215 55% 40%` | `215 55% 40%` — **exact match** | `215 55% 40%` — **exact match** | present |
| Fonts | Roboto Slab / Roboto / JetBrains Mono | Same, exact | JetBrains Mono confirmed (`index.css:298`); Roboto/Roboto Slab not directly grepped in this pass | Roboto Slab / Roboto / JetBrains Mono confirmed |
| Radius scale | sm 4px / md 6px / lg 8px, `--radius: 0.5rem` | Not independently verified in this pass | `--radius: 0.5rem` confirmed (`index.css:38`) | Not verified |

**Design-direction relationship (design only — not evidence for product facts):** The personal repo's product content is traced, with file-timestamp evidence, to 10 single-file HTML mockups uploaded to `~/Downloads` between 2026-08-10 21:05 and 2026-08-11 04:05 (`ally-nutra-homepage.html`, `ally-nutra-services.html`, `facility-page.html`, `certifications-page.html`, `about-us-page.html`, `contact-us-page.html`, `faq-page.html`, `contract-manufacturing-page.html`, `private-label-page.html`, `capsule-manufacturing-page.html`) — one file per one of the personal repo's 10 views, matching exactly. Every one of these 10 mockups uses an **older, different palette** (`#F5A623` / `#1B2B4B`, Inter + Playfair Display — confirmed via grep on all 10 files) that does not match AN-DESIGN-001, production, or the personal repo's own shipped CSS. The personal repo's actual `tokens.css` was rebranded to AN-DESIGN-001's exact v1.0 values (table above) — meaning the **visual system and the product content in the personal repo came from two different, unreconciled sources**: an old-palette content mockup set for what to say, and the AN-DESIGN-001 spec for how it should look. Neither source was product-fact-checked against production. This is the most direct, evidenced explanation available for how the format/MOQ/certification contradictions in §3.2 came to exist.

`landing-redesign.html` (`ally-nutra` repo, commit `16c48c2f`, 2026-08-09, explicitly marked in its own commit message: *"never merged (same standing as admin-side.html)"*) is a separate, later single-file exploration of the same AN-DESIGN-001 brief. It labels its own token block "AN-DESIGN-001 **v2**" (`landing-redesign.html:14`) — one version number ahead of the adopted spec's "v1.0" masthead. **UNRESOLVED, not asserted:** whether this "v2" is an intentional successor to the adopted v1.0 document or an independent/mislabeled exploration — the only observable evidence is the version-string mismatch and the later commit date; no causal link between the two documents was found in either repo's history.

### 3.5 Technical stack — migration assessment

| | Personal repo | Production (`ally-nutra@main`) |
|---|---|---|
| React | 19.2.8 | 18.3.1 |
| Router | react-router-dom 7.18.2, **HashRouter** (`App.jsx:2,42`) | react-router-dom 6.30.1, **BrowserRouter** (`App.tsx:5,94`) |
| Build tool | Vite 8.2.0 | Vite 5.4.19 |
| Language | Plain JS/JSX | TypeScript 5.8.3 |
| Styling | Hand-written CSS, custom tokens (no framework) | Tailwind 3.4.17 + shadcn/ui (Radix) |
| Backend | None — 3 total dependencies, zero network calls | Supabase (Postgres, Auth, Edge Functions) |
| Hosting | GitHub Pages via `actions/deploy-pages`, base path `/ally-nutra-landing/` | Vercel, SPA rewrites in `vercel.json` |

Migrating this content into the company repo is **not a lift-and-shift**. It requires: (1) a routing conversion (Hash → Browser — trivial given Vercel already SPA-rewrites), (2) a full visual re-implementation in Tailwind/shadcn rather than porting the hand-written CSS, (3) wiring the quote form to a real backend (the company repo already has lead-capture patterns to follow — not audited in this pass), (4) resolving every item in the REMOVE/CONFLICT lists in §3.2 before the content is trustworthy to ship, and (5) a decision on the booking question in §4 below, since the destination architecture is actively changing underneath the company repo right now.

---

## 4. The booking question (decision needed — no recommendation implied by this framing)

**Is there to be a meeting-booking path on the landing page at all, and if so, via what mechanism?**

- **Option A — Link out to the company's existing `/schedule` route.** Once the Calendly migration (§3.3) ships to `main`, this is a single `<Link>`, no new integration work, and stays in sync automatically as the company's booking backend evolves. Tradeoff: the landing page has zero control over that page's design/copy, and it's coupled to a migration that hasn't landed yet.
- **Option B — Embed Calendly directly on the landing page**, using the same `JOSH_CALENDLY_URL` / `buildCalendlyBookingUrl` helper the company repo already has (`src/lib/calendlyBooking.ts`). Tradeoff: duplicates the integration point — if the company adds multi-rep routing or changes providers later, the landing page needs a second update.
- **Option C — No booking mechanism on the landing page; funnel to quote only**, treating "request a quote" as the sole primary action and letting `/schedule` be reached only after a lead is qualified (mirroring production's current pattern, where quote/schedule are both present but the phone call is framed as primary — `CTASection.tsx:22-30`). Tradeoff: this narrows the two-action mandate in the original brief down to one, which may not be what the team wants.

This document does not pick one — that's a product decision for the team, not an inference from code.

---

## 5. Proposed restructure of the home view (NOT implemented)

Ordered by impact. Each item names what moves/cuts/adds and the finding it answers. No code was changed to produce this list.

1. **Fix or replace the quote form's submit handler before anything else ships.** Answers: §2.2, §2.1 (Contact.jsx:6-9). Nothing else on this list matters while the one real conversion path is a JS alert.
2. **Resolve the booking-mechanism decision (§4) and either build it or stop implying it exists.** Answers: §2.1, §2.2, §3.3. At minimum, rename every CTA that currently says "Schedule a call/visit" or "Request a tour" to something the destination actually delivers (a quote form), until a real mechanism exists.
3. **Reconcile the product/format claims against §3.2 before this ships anywhere production-adjacent.** What's cut depends entirely on the team's REMOVE-list confirmation (§3.2) — this document does not pre-decide it.
4. **Re-balance the home view's section mix.** What moves: the facility-zone grid (§2.4, section 8) and R&D matrix (section 6) are REFERENCE-classified, high-pixel-weight (1,702px + 621px desktop; 4,859px + 2,017px mobile — the single biggest contributor to the 23,409px mobile page height) content the team itself named as symptomatic. Consider moving both to their existing dedicated pages (`/facility`, already exists) and leaving only a one-line teaser + link on Home. What's added: nothing structurally new is required — the hero, above-the-fold pattern, and "Why Ally Nutra" section (§2.5, §2.4 section 5) already work; the fix is subtraction, not addition. Answers: §2.4's pixel ratio.
5. **Fix or remove the testimonials section's unverifiable-attribution problem** (`Home.jsx:806-807`) before shipping — either get real, attributable testimonials or drop the section. A credibility section that documents its own unverifiability in a code comment is a liability, not an asset. Answers: §2.4 section 9.
6. **Align CTA copy with actual turnaround** — stop saying "instant" (Faq.jsx:260) and "5 minutes" (ContractManufacturing.jsx:24) when the documented process is 5 business days (Contact.jsx:126-129). Answers: §2.6.

---

## 6. Migration assessment

Covered in full in §3.5. Summary: routing conversion is trivial; visual re-implementation in Tailwind/shadcn is substantial; backend wiring for the quote form is required and currently has zero starting point in the personal repo; every REMOVE/CONFLICT item in §3.2 must be resolved with the team before content ships; the booking destination (§4) is a moving target because the company repo's own booking system is mid-migration. `allynutra-lp-clone` was **excluded entirely** from this audit — it is a stale (HEAD 2026-03-02, single branch, no updates since) Lovable-generated clone with no confirmed relationship to either the personal repo or current production content, and the team's own answer to the Phase-0 clarifying question specified `ally-nutra@main` as the sole product-facts source of truth. It is flagged here only so the exclusion and its reasoning are on record, not because it contributed evidence to this report.

---

## 7. Open questions

Everything below is UNRESOLVED and needs a one-line answer from the team.

1. Does Ally Nutra actually manufacture tablets, powders, gummies, and liquids in-house, or is production's "four formats" claim the accurate, current one? (§3.2 REMOVE list)
2. Are "non-GMO" and "ISO" certifications actually held, or was "ISO" a mix-up with the ISO-8/ISO-7 cleanroom air-class ratings mentioned on the Facility page? (§3.2)
3. What is the actual capsule size range — 000–3 or 000–4? (§3.2)
4. What is the actual capsule MOQ — 2,500 or 10,000 — and does it vary by tier the way `ContractManufacturing.jsx:140`'s Starter/Growth/Scale table implies? (§3.2)
5. Is the private-label "$0 formulation fee" framing (PrivateLabel.jsx:44,179) still accurate given the company's real quoting structure charges a flat $3,000 startup fee on every quote? (§3.2)
6. Is "200+" private-label formulas a real, current catalog count, or aspirational copy? (§3.2)
7. What is the actual quote-response SLA — same-day, 1 business day, or 5 business days? Three different numbers appear across the personal repo's own pages. (§2.6, §3.2)
8. Is there to be a meeting-booking path on the landing page at all, and via which of the three options in §4?
9. Once the Calendly migration (§3.3) merges to `main`, should the landing page link out to `/schedule` or embed Calendly directly? (§4, Option A vs. B)
10. Is `hello@allynutra.com` or `support@allynutra.com` the correct public-facing support address? (§3.2)
11. Whose relationship, if any, does `landing-redesign.html`'s self-labeled "v2" token set have to the adopted AN-DESIGN-001 v1.0 document — successor, sibling exploration, or mislabeling? (§3.4) — flagged for completeness; does not block any decision above.
