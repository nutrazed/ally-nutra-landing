import { Link } from 'react-router-dom';
import { sx } from '../lib/styleString.js';
import { hideAndTint } from '../lib/imgFallback.js';

import homeHero from '../assets/images/home-hero.jpg';
import heroMachineWebm from '../assets/videos/hero-machine.webm';
import heroMachineMp4 from '../assets/videos/hero-machine.mp4';
import heroMachinePoster from '../assets/videos/hero-machine-poster.jpg';

import product01 from '../assets/images/product-01.jpg';
import product03 from '../assets/images/product-03.jpg';
import product04 from '../assets/images/product-04.jpg';
import product05 from '../assets/images/product-05.jpg';

// Facility photo strip (proof bar, §5). Reused from the images already committed to
// the repo — none sourced new for this strip. facility-01/02 remain unused after
// this (available for a future need); facility-03 and facility-04 were only used by
// Home's old FACILITY_ZONES gallery (removed in the PR #2 restructure) and are
// otherwise unused anywhere else in the app today. facility-05/06 ARE also used by
// Facility.jsx's own zone cards (Packaging, Logistics) — a thumbnail here and a full
// card there is a deliberate decision, not an accident (see PR description).
import facility03 from '../assets/images/facility-03.jpg';
import capsule01 from '../assets/images/capsule-01.jpg';
import facility04 from '../assets/images/facility-04.jpg';
import facility05 from '../assets/images/facility-05.jpg';
import facility06 from '../assets/images/facility-06.jpg';

import { useEffect, useRef, useState } from 'react';

// Real, live Calendly scheduling link — found read-only in the company repo
// (Ally-Nutra-LLC-New/ally-nutra), src/lib/calendlyBooking.ts, JOSH_CALENDLY_URL,
// on an unpublished local branch (landing-redesign/an-design-001-full-site, not yet
// on that repo's main). The company's own /schedule route will eventually host this
// same Calendly embed, but that migration isn't live on main yet, so linking to
// allynutra.com/schedule today would hit the old native booking flow instead. The
// raw Calendly URL works right now regardless of that migration's status. Update
// this constant (and drop this comment) once /schedule ships the embed on main.
const BOOKING_URL = 'https://calendly.com/josh-p-allynutra';

// "6 questions" = the six required fields on the real /contact form (fname, lname,
// email, brand, service, details — src/views/Contact.jsx:79-136), not the "5
// questions" figure originally drafted for this line. Verified against the form
// itself rather than assumed, per the PR #2 follow-up audit finding that the site's
// existing "5-minute form" claim already overstated the form's actual length.
const EXPECTATION_LINE = '6 questions, about 3 minutes. Quote back in 5 business days.';

// Lowest MOQ among the four corrected formats — Pouches, "MOQ FROM 2,000" in the
// PRODUCTS array below (this file). Capsules/Sachets/Stick packs are all higher
// (2,500 / 5,000 / 10,000 respectively), so 2,000 units is the honest floor to quote
// here, not a rounded-down guess.
const MOQ_LOWEST = '2,000 units';

// The only stated response-time commitment found anywhere in this repo:
// src/views/Contact.jsx:35 ("Response within 1 business day") and :157 ("Within 1
// business day: We confirm receipt and assign a real account manager."). Both agree,
// so this is a found fact, not a token.
const RESPONSE_TIME = '1 business day';

// Home hero encapsulation-machine video: falls back to the built-in SVG line
// drawing under prefers-reduced-motion, or if the video errors out.
function HeroMech() {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFailed(true);
      video.pause();
      video.removeAttribute('autoplay');
      return;
    }
    function onError() {
      setFailed(true);
    }
    video.addEventListener('error', onError);
    return () => video.removeEventListener('error', onError);
  }, []);

  return (
    <div className={`hero-mech${failed ? ' no-video' : ''}`} aria-hidden="true">
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroMachinePoster}
          aria-hidden="true"
          tabIndex="-1"
        >
          <source src={heroMachineWebm} type="video/webm" />
          <source src={heroMachineMp4} type="video/mp4" />
        </video>
        <div className="hero-video-tint"></div>
      </div>
      <svg
        className="hero-mech-svg"
        viewBox="0 0 400 460"
        width="400"
        height="460"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        role="presentation"
      >
        <g className="mech-struct">
          <line x1="172" y1="178" x2="172" y2="316" className="mech-line-struct" />
          <line x1="398" y1="178" x2="398" y2="316" className="mech-line-struct" />
          <circle cx="290" cy="68" r="4" className="mech-line-struct" />
          <rect x="182" y="344" width="216" height="66" rx="4" className="mech-line-struct" />
          <line x1="290" y1="410" x2="290" y2="420" className="mech-line-struct" />
          <rect x="150" y="420" width="280" height="18" rx="3" className="mech-line-struct" />
          <circle cx="168" cy="429" r="3" className="mech-line-struct" />
          <circle cx="290" cy="429" r="3" className="mech-line-struct" />
          <circle cx="412" cy="429" r="3" className="mech-line-struct" />
        </g>

        <g transform="translate(290,68)">
          <g className="crank-rotor">
            <circle r="62" className="mech-line-move" />
            <line x1="0" y1="0" x2="0" y2="55" className="mech-line-move" />
            <circle cx="0" cy="55" r="6" className="mech-line-move" />
          </g>
        </g>

        <g transform="translate(290,303)">
          <g className="mech-rod">
            <rect x="-2" y="-180" width="4" height="180" rx="2" className="mech-line-move" />
            <circle cx="0" cy="-180" r="5" className="mech-line-move" />
          </g>
        </g>

        <g className="mech-crosshead">
          <rect x="180" y="298" width="220" height="10" rx="2" className="mech-line-move" />
          <g className="pin-1"><line x1="190" y1="308" x2="190" y2="356" className="mech-line-move" /><rect x="185" y="304" width="10" height="8" rx="2" className="mech-line-move" /></g>
          <g className="pin-2"><line x1="228" y1="308" x2="228" y2="356" className="mech-line-move" /><rect x="223" y="304" width="10" height="8" rx="2" className="mech-line-move" /></g>
          <g className="pin-3"><line x1="266" y1="308" x2="266" y2="356" className="mech-line-move" /><rect x="261" y="304" width="10" height="8" rx="2" className="mech-line-move" /></g>
          <g className="pin-4"><line x1="304" y1="308" x2="304" y2="356" className="mech-line-move" /><rect x="299" y="304" width="10" height="8" rx="2" className="mech-line-move" /></g>
          <g className="pin-5"><line x1="342" y1="308" x2="342" y2="356" className="mech-line-move" /><rect x="337" y="304" width="10" height="8" rx="2" className="mech-line-move" /></g>
          <g className="pin-6"><line x1="380" y1="308" x2="380" y2="356" className="mech-line-move" /><rect x="375" y="304" width="10" height="8" rx="2" className="mech-line-move" /></g>
        </g>

        <clipPath id="plateWindow"><rect x="170" y="352" width="230" height="44" /></clipPath>
        <g clipPath="url(#plateWindow)">
          <g className="mech-plate">
            <rect x="177" y="358" width="26" height="30" rx="13" className="mech-line-move" />
            <rect x="215" y="358" width="26" height="30" rx="13" className="mech-line-move" />
            <rect x="253" y="358" width="26" height="30" rx="13" className="mech-line-move" />
            <rect x="291" y="358" width="26" height="30" rx="13" className="mech-line-move" />
            <rect x="329" y="358" width="26" height="30" rx="13" className="mech-line-move" />
            <rect x="367" y="358" width="26" height="30" rx="13" className="mech-line-move" />
            <rect x="405" y="358" width="26" height="30" rx="13" className="mech-line-move" />
          </g>
        </g>

        <rect className="mech-output" x="150" y="368" width="24" height="28" rx="12" fill="hsl(38 87% 55%)" />
      </svg>
      <div className="hero-mech-label">Encapsulation · 6-pin tamping · size 00</div>
    </div>
  );
}

// Exactly the four formats Ally Nutra manufactures today, per the production site
// (ally-nutra@main) and the landing-page audit's product-claim reconciliation.
// Do not add tablets, powders, gummies, liquids, or blister packs here — those were
// removed as unconfirmed claims, not omitted by oversight.
const PRODUCTS = [
  { img: product01, alt: 'A pile of amber softgel capsules', format: 'Format 01 · Capsules', title: 'Capsules', desc: 'Two-piece, liquid-fill, vegan HPMC or bovine gelatin.', spec: 'SIZE 000–3 · MOQ FROM 2,500' },
  { img: product03, alt: 'Flat foil single-serve sachets stacked on a white surface', format: 'Format 02 · Sachets', title: 'Sachets', desc: 'Single-serve, foil-lined, nitrogen flushed, custom print.', spec: '3g–30g FILL · MOQ FROM 5,000' },
  { img: product04, alt: 'A torn-open narrow stick pack lying on a white surface', format: 'Format 03 · Stick packs', title: 'Stick packs', desc: 'Narrow, portable, easy-tear. High-barrier film options.', spec: '2g–15g FILL · MOQ FROM 10,000' },
  { img: product05, alt: 'A blank kraft stand-up pouch with a resealable zipper top', format: 'Format 04 · Pouches', title: 'Pouches', desc: 'Resealable stand-up, matte, gloss, or kraft finish.', spec: '50g–5,000g FILL · MOQ FROM 2,000' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Tell us about your product', body: 'Format, quantity, and a rough idea — that’s enough to start.', time: '5-MINUTE FORM' },
  { step: '02', title: 'We scope and price it', body: 'A transparent, line-item quote — material, manufacturing, and startup cost.', time: 'QUOTE IN 5 BUSINESS DAYS' },
  { step: '03', title: 'You approve, we lock the formula', body: 'Once you sign off, the formulation is frozen for that production run.', time: 'FORMULATION FROZEN AT SIGN-OFF' },
  { step: '04', title: 'Production and ship', body: 'Blended, filled, packaged, and shipped to your warehouse or FBA.', time: '4–8 WEEKS' },
];

// Right column characterises an industry-wide pattern a B2B buyer would recognize
// from experience — never a named competitor.
const COMPARISON_ROWS = [
  { notice: 'Getting a quote', withUs: '5 business days, priced line by line', usual: '"We’ll get back to you shortly"' },
  { notice: 'Who you deal with', withUs: 'One named account manager who knows your formula', usual: 'A shared sales inbox' },
  { notice: 'The price you’re told', withUs: 'The number on your quote is the number on your invoice', usual: 'An estimate, then adjustments' },
  { notice: 'Documentation', withUs: 'COA and batch records within one business day of asking', usual: 'Ask, then wait' },
  { notice: 'Formula changes', withUs: 'Locked at sign-off; revisions documented, never silent', usual: 'Substitutions you find out about later' },
  { notice: 'If you’re too small today', withUs: 'We say so, explain why, and keep you on the waitlist', usual: 'Strung along or ignored' },
];

const CREDENTIAL_STRIP = [
  { label: 'cGMP certified', to: '/certifications' },
  { label: 'FDA registered', to: '/certifications' },
  { label: 'NSF', to: '/certifications' },
  { label: '50,000 sq ft', to: '/facility' },
  { label: '500+ brands', to: '/about' },
  { label: '2,000+ materials', to: '/about' },
];

// Captions corrected against the format-data fix already shipped: the encapsulation
// cell reads "SIZES 000–3" (not "000–4") to match the corrected capsule-size claim
// now canonical everywhere else in the repo (CapsuleManufacturing.jsx, Services.jsx,
// this file's own PRODUCTS array) — see PR description for why this deliberately
// deviates from the literal draft caption text.
const FACILITY_STRIP = [
  { img: facility03, alt: 'A large stainless steel blending tank on the production floor', caption: 'PRODUCTION FLOOR', sub: 'BLENDING · ISO 8' },
  { img: capsule01, alt: 'A dense pile of freshly encapsulated two-piece capsules', caption: 'ENCAPSULATION', sub: 'SIZES 000–3 · ±2%' },
  { img: facility04, alt: 'A gloved technician pipetting samples into a rack of test vials in the QC lab', caption: 'QC LABORATORY', sub: 'HPLC · MICROBIAL' },
  { img: facility05, alt: 'A bottle moving under a filling funnel on an automated packaging line', caption: 'PACKAGING LINE', sub: 'INDUCTION SEAL' },
  { img: facility06, alt: 'A warehouse aisle lined with shrink-wrapped stacks of finished goods cartons', caption: 'FINISHED GOODS', sub: 'FBA PREP · DIRECT SHIP' },
];

const EXPLORE_LINKS = [
  { to: '/facility', title: 'Facility', line: 'A tour of where your product is made.' },
  { to: '/certifications', title: 'Certifications', line: 'cGMP, FDA, NSF, and more — audited annually.' },
  { to: '/services', title: 'R&D & innovation', line: 'How we turn ingredient research into formulas.' },
  { to: '/faq', title: 'FAQ', line: '26 questions, answered with precision.' },
];

export default function Home() {
  return (
    <>
      {/* 1 — HERO: the only job of this section is stating what we do, for whom, and
          giving the visitor a way to act immediately. Everything that used to live here
          (the dosage-form checklist, the sticky-scroll About narrative) either restated
          a disputed claim or belonged on a page a genuinely interested visitor reaches
          second, not first — see docs/PLAN.md for the audit this restructure answers. */}
      <section className="hero hero-home" id="home-hero">
        <img
          className="hero-bg-photo"
          src={homeHero}
          width="1440"
          height="1920"
          alt=""
          loading="eager"
        />
        <div className="hero-bg-tint" aria-hidden="true"></div>
        <div className="container hero-grid">
          <div>
            <span className="eyebrow on-dark">Trusted contract manufacturer since 2015</span>
            <h1 style={sx('margin-top:14px;')}>Custom supplement manufacturing for wellness brands.</h1>
            <p className="lede" style={sx('margin:18px 0 24px;max-width:520px;')}>
              Capsules, sachets, stick packs, and pouches — cGMP-certified production,
              transparent pricing, and formulation help if you need it.
            </p>
            <div className="hero-ctas">
              <Link to="/contact" className="btn btn-primary btn-lg">Start your quote →</Link>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-invert btn-lg">Not sure yet? Book a call</a>
            </div>
            <p className="hero-expectation">{EXPECTATION_LINE}</p>
            <div className="qual-bar">
              <div className="qual-cell">
                <span className="qual-value">{MOQ_LOWEST}</span>
                <span className="qual-label">Minimum order</span>
              </div>
              <div className="qual-cell">
                <span className="qual-value">4–8 weeks</span>
                <span className="qual-label">Concept to door</span>
              </div>
              <div className="qual-cell">
                <span className="qual-value">500+ brands</span>
                <span className="qual-label">Manufactured for</span>
              </div>
            </div>
          </div>
          <HeroMech />
        </div>
      </section>

      {/* 2 — PROMISE BAR: answers the ghosting objection at the top of the page, where
          the decision is being made, instead of leaving it buried in FAQ Q.22. One
          line, one amber dot, nothing else — this is a statement, not a pitch. */}
      <section className="promise-bar">
        <div className="container promise-bar-row">
          <span className="promise-bar-dot" aria-hidden="true"></span>
          <p>
            We reply within {RESPONSE_TIME}. If you're not the right fit for us yet, we'll say
            so and tell you why — you won't be strung along.
          </p>
        </div>
      </section>

      {/* TRUST STRIP: replaces the old full-height Company Snapshot stat panel as
          this page's credibility beat. The richer 8-stat animated panel moved to
          About.jsx, where a visitor who wants that depth already is. */}
      <section className="trust-strip">
        <div className="container trust-strip-row">
          <span>cGMP certified</span>
          <span className="trust-strip-dot" aria-hidden="true">·</span>
          <span>FDA registered</span>
          <span className="trust-strip-dot" aria-hidden="true">·</span>
          <span>Dover, Delaware</span>
          <span className="trust-strip-dot" aria-hidden="true">·</span>
          <span>500+ brands served</span>
        </div>
      </section>

      {/* 3 — WHAT WE MAKE: exactly the four confirmed formats. */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>What we make</span>
            <h2>Four formats, all in-house.</h2>
          </div>
          <div className="product-grid">
            {PRODUCTS.map((p) => (
              <div className="product-card" key={p.title}>
                <img src={p.img} width="900" height="675" alt={p.alt} loading="lazy" onError={hideAndTint} />
                <div className="product-body">
                  <span className="product-format">{p.format}</span>
                  <h3>{p.title}</h3>
                  <p className="product-desc">{p.desc}</p>
                  <div className="product-spec">{p.spec}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON: "why brands choose us", framed as what changes, not a features
          list. Right column characterises the industry-wide pattern, never a named
          competitor. Amber check glyph on the middle column only — everywhere else
          on this section is navy and mono. Reflows to stacked cards below 760px. */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Why brands choose us</span>
            <h2>What you'll actually notice.</h2>
          </div>
          <div className="comparison-table">
            <div className="comparison-row head">
              <div>What you'll notice</div>
              <div>With Ally Nutra</div>
              <div>The usual experience</div>
            </div>
            {COMPARISON_ROWS.map((row) => (
              <div className="comparison-row" key={row.notice}>
                <div className="comparison-notice">{row.notice}</div>
                <div className="comparison-withus">
                  <span className="comparison-mobile-label">With Ally Nutra</span>
                  <svg className="comparison-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{row.withUs}</span>
                </div>
                <div className="comparison-usual">
                  <span className="comparison-mobile-label">The usual experience</span>
                  <span>{row.usual}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF BAR: facility, certifications, and company stats were moved off the
          home view in the PR #2 restructure. They come back here — compressed, but
          with the photography intact, because the photographs ARE the proof of
          operations. Row 1 text-only credential strip; row 2 five-photo facility
          strip, captions required (an unlabelled photo is decoration, a labelled one
          is evidence). Light section, no navy overlay — desaturation only. */}
      <section className="section proof-bar-section">
        <div className="container">
          <div className="credential-strip">
            {CREDENTIAL_STRIP.map((c) => (
              <Link to={c.to} key={c.label}>{c.label}</Link>
            ))}
          </div>
          <Link to="/facility" className="facility-strip">
            {FACILITY_STRIP.map((f) => (
              <div className="facility-strip-item" key={f.caption}>
                <div className="facility-strip-photo">
                  <img src={f.img} width="300" height="225" alt={f.alt} loading="lazy" onError={hideAndTint} />
                </div>
                <span className="facility-strip-caption">{f.caption}</span>
                <span className="facility-strip-sub mono-chip">{f.sub}</span>
              </div>
            ))}
          </Link>
        </div>
      </section>

      {/* 4 — HOW IT WORKS: the highest-value addition in this restructure. Answers
          "what am I committing to if I click" before the click, which is what a B2B
          buyer's hesitation is actually about. Deliberately navy + mono, no amber —
          amber on this page marks the action, not the explanation. */}
      <section className="section-navy how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow on-dark" style={sx('justify-content:center;')}>How it works</span>
            <h2>Four steps. No surprises.</h2>
          </div>
          <div className="grid grid-4 how-it-works-grid">
            {HOW_IT_WORKS.map((s) => (
              <div className="how-it-works-card" key={s.step}>
                <span className="how-it-works-num mono-chip">{s.step}</span>
                <h3>{s.title}</h3>
                <p className="how-it-works-body">{s.body}</p>
                <span className="how-it-works-time mono-chip">{s.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — WHY BRANDS STAY: unchanged claim-and-receipt rows. */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">Why Ally Nutra</span>
          <h2 style={sx('margin:14px 0 16px;')}>Quality we can prove. Service you'll feel.</h2>
          <p className="lede" style={sx('margin-bottom:12px;max-width:640px;')}>
            We're not the biggest manufacturer — we're the one that answers emails, hits
            timelines, and actually formulates with you rather than at you.
          </p>

          <div className="why-row">
            <span className="why-row-num">01</span>
            <div>
              <h3>Certified and audited</h3>
              <p className="why-row-desc">cGMP, FDA-registered, third-party audited, with full facility transparency.</p>
            </div>
            <div className="why-evidence">
              <span className="why-evidence-label">The receipt</span>
              <p className="why-evidence-text">
                21 CFR Part 111 · audited annually by an independent body · FDA facility
                registration active, renewed biennially · audit reports available on request to
                qualified buyers
              </p>
            </div>
          </div>

          <div className="why-row">
            <span className="why-row-num">02</span>
            <div>
              <h3>Full traceability</h3>
              <p className="why-row-desc">Every batch documented from raw material lot through to finished goods release.</p>
            </div>
            <div className="why-evidence">
              <span className="why-evidence-label">The receipt</span>
              <p className="why-evidence-text">
                COA on every batch · spec sheets and ingredient origin on request · lot-level
                production records retained · documentation sent within one business day
              </p>
            </div>
          </div>

          <div className="why-row">
            <span className="why-row-num">03</span>
            <div>
              <h3>Real communication</h3>
              <p className="why-row-desc">Dedicated project managers. No ghosting, no bait-and-switch on pricing or timelines.</p>
            </div>
            <div className="why-evidence">
              <span className="why-evidence-label">The receipt</span>
              <p className="why-evidence-text">
                one named account manager per brand · quote returned in 5 business days · the
                number on your quote is the number on your invoice
              </p>
            </div>
          </div>

          <div className="why-row">
            <span className="why-row-num">04</span>
            <div>
              <h3>Formulation expertise</h3>
              <p className="why-row-desc">PhD chemists and nutritionists on staff — we help you build products, not just fill them.</p>
            </div>
            <div className="why-evidence">
              <span className="why-evidence-label">The receipt</span>
              <p className="why-evidence-text">
                15+ formulators, nutritionists and R&amp;D chemists · 2,000+ raw materials on file
                · stability and accelerated aging studies run in-house
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — PROOF: unchanged testimonials, attributions unchanged. */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>What our partners say</span>
            <h2>Trusted by brands that actually ship.</h2>
          </div>
          {/* TODO: replace with real names, companies, and headshots once client permission is
               obtained. Current attributions are initials-only and cannot be verified by a reader. */}
          <div className="grid grid-3">
            <div className="card testimonial">
              <span className="testimonial-outcome">Reformulated in 48 hours · ship date held</span>
              <p>"Ally Nutra rescued a launch we thought was dead. They reformulated around a supply issue in 48 hours and still hit our ship date. They don't just manufacture — they partner."</p>
              <div className="testimonial-author">
                <div className="author-avatar">ER</div>
                <div className="author-info"><h5>Emily R.</h5><small>Founder, wellness brand · USA</small></div>
              </div>
            </div>
            <div className="card testimonial">
              <span className="testimonial-outcome">Fourth manufacturer · first to communicate</span>
              <p>"We've worked with three manufacturers before Ally. None communicated like this. Clear pricing, real timelines, and COAs that actually show up when promised."</p>
              <div className="testimonial-author">
                <div className="author-avatar">DL</div>
                <div className="author-info"><h5>David L.</h5><small>COO, supplement co. · USA</small></div>
              </div>
            </div>
            <div className="card testimonial">
              <span className="testimonial-outcome">Now their #1 SKU</span>
              <p>"Their formulation team helped us design a product our R&amp;D lead couldn't crack. It's now our #1 SKU. I'll never use another CMO."</p>
              <div className="testimonial-author">
                <div className="author-avatar">SD</div>
                <div className="author-info"><h5>Sophie D.</h5><small>Brand manager, nutrition startup</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — EXPLORE: compact reference index. This is how facility/certifications/R&D/
          FAQ content stays reachable after being demoted off the home view. */}
      <section className="explore-strip">
        <div className="container">
          <div className="explore-grid">
            {EXPLORE_LINKS.map((l) => (
              <Link to={l.to} className="explore-card" key={l.to}>
                <span className="explore-card-title">{l.title}</span>
                <span className="explore-card-line">{l.line}</span>
                <span className="explore-card-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — FINAL CTA: both actions repeated, plus the phone number. */}
      <section className="section-navy" style={sx('text-align:center;')}>
        <div className="container">
          <h2 style={sx('max-width:640px;margin:0 auto 24px;')}>
            Ready to build something your customers will{' '}
            <em style={sx('font-style:italic;color:hsl(var(--ally-orange));')}>actually</em> reorder?
          </h2>
          <div className="hero-ctas" style={sx('justify-content:center;margin-top:0;')}>
            <Link to="/contact" className="btn btn-primary btn-lg">Get a quote →</Link>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-invert btn-lg">Book a 20-minute call</a>
          </div>
        </div>
      </section>
    </>
  );
}
