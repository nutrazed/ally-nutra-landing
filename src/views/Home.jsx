import { Link } from 'react-router-dom';
import { sx } from '../lib/styleString.js';
import { hideAndTint } from '../lib/imgFallback.js';
import ProductCardsGrid from '../components/ProductCardsGrid.jsx';
import { useDemoRole } from '../contexts/DemoRoleContext.jsx';
import { quoteUrl, scheduleUrl } from '../lib/demoRole.js';

import homeHero from '../assets/images/home-hero.jpg';
import heroMachineWebm from '../assets/videos/hero-machine.webm';
import heroMachineMp4 from '../assets/videos/hero-machine.mp4';
import heroMachinePoster from '../assets/videos/hero-machine-poster.jpg';

// "What we make" cards carry no photos (kinds-only rework, client request): the
// client has no per-format photo sources they want published on these cards, so
// the front is type-only and the back lists the kinds (productVarieties.js) —
// see ProductCard.jsx. The four former card-front images (products/product-*.png,
// plus the three variety popup photos) stay in the repo, credited and marked
// unused in IMAGE-CREDITS.md, available if a future round sources replacements.

// Format showcase slides (§5, replaces the five-photo facility strip). Four
// client-supplied branded format cards — one per confirmed format — sourced from
// the client's Google Drive folder (see IMAGE-CREDITS.md for the full URL and
// per-file notes) as 3.png/4.png/5.png/6.png, 3375×3375 PNG (2.5/2.0/1.9/1.2 MB),
// resized to 900×900 and palette-quantized here (119.3/87.1/94.7/64.1 KB). The
// slides carry their own baked-in headline + "Best for" list, sized for
// full-screen viewing — which is why §5 presents them as one-large-slide-at-a-time
// carousel rather than a thumbnail row: at 4-up thumbnail width the baked text
// renders unreadably small, and the slides' own arrow-button affordances were
// designed for exactly this carousel presentation. Real-text spec chips under the
// carousel duplicate the key facts (fill ranges, MOQs) as accessible text for
// small screens, where the baked art scales down.
//
// The facility photos this replaces: facility-03/04 become unused (kept in the
// repo per convention, credits updated); facility-05/06 remain used by
// Facility.jsx and Services.jsx; about-03 remains used by About.jsx. The
// /facility link the old strip carried survives in the credential strip above
// ("50,000 sq ft").
import showcaseCapsules from '../assets/images/formats/format-showcase-capsules.png';
import showcaseSachets from '../assets/images/formats/format-showcase-sachets.png';
import showcasePouches from '../assets/images/formats/format-showcase-pouches.png';
// The stick-pack slide is the one designed card whose baked artwork the client
// rejected ("the stick pack photo is not good"). Rather than swap in another
// photo (the Drive folder's other stick-pack shots — fan spreads, vertical-text
// cards — are different aspect ratios or break the slide family's design
// language), slide 3 is drawn in code using the company's own official stick-pack
// render (the visual live on allynutra.com's homepage today, from
// Ally-Nutra-LLC-New/ally-nutra src/assets/format-stick-packs.png) as artwork.
// Same content architecture as the three designed cards — eyebrow, orange
// headline, BEST FOR list, arrow affordance — so the carousel stays coherent;
// real text instead of baked pixels, so this slide is fully accessible where the
// others rely on alt text. See StickPackSlide below.
import stickPackRender from '../assets/images/formats/stick-pack-render.png';

// Work With Us VSL (§6.5). The exact video that opens the company site's
// /work-with-us landing page (Ally-Nutra-LLC-New/ally-nutra, public/lp/assets/
// video/finalized-vsl-*.mp4, served at allynutra.com/work-with-us), copied
// read-only from that repo at origin/main. 720p (38.6 MB) for desktop and 360p
// (10.8 MB) as the narrow-viewport/small-pipe source, selected via <source
// media>; the 64.7 MB 1080p master was deliberately NOT bundled — the player's
// max on-page width is 880px, well under 720p's needs, and it would add more
// than the entire video budget again for no visible gain. Poster frame 93 KB.
// Duration 4:09 (ffprobe: 249.359s) — the caption under the player states it.
import vsl720 from '../assets/videos/work-with-us-vsl-720.mp4';
import vsl360 from '../assets/videos/work-with-us-vsl-360.mp4';
import vslPoster from '../assets/videos/work-with-us-vsl-poster.jpg';

// Final-CTA card (§09): the client's "Your Supplements, Our Expertise" branded card
// (Drive 20.png, 3375×4219, 14.8 MB → 840×1050 palette-quantized, 352.9 KB). Clicking
// it opens the quote flow — same quoteUrl(role) target as the "Start your quote"
// button above it, per the client's request. Alt text describes the baked content
// since the card's own text is pixels.
import readyToBuildCta from '../assets/images/ready-to-build-cta.png';

import { useEffect, useRef, useState } from 'react';

// The hero/final-CTA button used to point at a real, live Calendly link
// (found read-only in the company repo, src/lib/calendlyBooking.ts,
// JOSH_CALENDLY_URL — since retired there in favor of iClosed, per the
// scheduling-flow investigation this session). feature/role-and-links then
// repointed both buttons at the /quote/ static flow instead, under the label
// "Book a call" — a button labelled to book a call that actually opened a
// quote form. feature/nav-restructure fixes both: they now open
// scheduleUrl(role) (the /schedule/ prototype's own booking flow) and read
// "Schedule a call", matching what they do.

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

// Testimonials gate (§07) — see the section comment there. Flip to true once the
// client supplies real, permissioned quotes; the disabled markup is unchanged and
// ready.
const SHOW_TESTIMONIALS = false;

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

// desc/spec text is UNCHANGED from the pre-rework cards — only the img/alt fields
// (kinds-only rework) and the popup-only fields (varietiesLabel, explanation) are
// gone. desc/spec claims are as audited before: known-unconfirmed sachet/stick-pack
// material claims ("nitrogen flushed", "High-barrier film options") were already
// deliberately left as-is by the earlier pass; that debt is unchanged here.
const PRODUCTS = [
  {
    format: 'Format 01 · Capsules',
    title: 'Capsules',
    desc: 'Two-piece, liquid-fill, vegan HPMC or bovine gelatin.',
    spec: 'SIZE 000–3 · MOQ FROM 2,500',
  },
  {
    format: 'Format 02 · Sachets',
    title: 'Sachets',
    desc: 'Single-serve, foil-lined, nitrogen flushed, custom print.',
    spec: '3g–30g FILL · MOQ FROM 5,000',
  },
  {
    format: 'Format 03 · Stick packs',
    title: 'Stick packs',
    desc: 'Narrow, portable, easy-tear. High-barrier film options.',
    spec: '2g–15g FILL · MOQ FROM 10,000',
  },
  {
    format: 'Format 04 · Pouches',
    title: 'Pouches',
    desc: 'Resealable stand-up, matte, gloss, or kraft finish.',
    spec: '50g–5,000g FILL · MOQ FROM 2,000',
  },
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

// One slide per confirmed format, in PRODUCTS order. `spec` strings are copied
// verbatim from the PRODUCTS array above — the carousel adds no claim the flip
// cards don't already make. `alt` describes what each baked-in slide actually
// shows (headline, best-for list, artwork), since the slide text itself is an
// image and invisible to assistive tech; the active-slide info bar below the
// carousel re-states the spec as real text for the same reason.
const FORMAT_SHOWCASE = [
  {
    img: showcaseCapsules,
    alt: 'Capsules format slide: headline "Flexible formulation, easy to swallow", best for botanicals, probiotics, custom blends; artwork of two white two-piece capsules held in steel tweezers',
    title: 'Capsules',
    spec: 'SIZE 000–3 · MOQ FROM 2,500',
    to: '/capsule-manufacturing',
    linkLabel: 'Capsule manufacturing',
  },
  {
    img: showcaseSachets,
    alt: 'Sachets format slide: headline "Single-serve convenience, premium presentation", best for powdered supplements, drink mixes, travel-friendly products; artwork of a hand holding a blank white sachet',
    title: 'Sachets',
    spec: '3G–30G FILL · MOQ FROM 5,000',
    to: '/services',
    linkLabel: 'All services',
  },
  {
    // Drawn in code (see StickPackSlide) — the designed 5.png slide's artwork was
    // rejected by the client; headline/best-for list reproduce that slide's own
    // baked copy verbatim, spec from PRODUCTS as with the other slides.
    render: 'stick-pack',
    title: 'Stick packs',
    spec: '2G–15G FILL · MOQ FROM 10,000',
    to: '/services',
    linkLabel: 'All services',
  },
  {
    img: showcasePouches,
    alt: 'Pouches format slide: headline "Bulk-friendly, resealable packaging", best for protein powders, superfood blends, bulk supplements; artwork of a blank white stand-up pouch',
    title: 'Pouches',
    spec: '50G–5,000G FILL · MOQ FROM 2,000',
    to: '/services',
    linkLabel: 'All services',
  },
];

// Code-drawn replacement for the designed stick-pack slide (see the import note
// above). Copy is the rejected 5.png slide's own baked text, reproduced verbatim —
// no new claims. Layout mirrors the designed cards' architecture: format eyebrow,
// two-line orange headline, numbered BEST FOR list on a navy panel, arrow
// affordance bottom-right (decorative on the designed cards; decorative here too).
function StickPackSlide() {
  return (
    <div className="format-slide-card">
      <span className="format-slide-eyebrow mono-chip">Format 03 · Stick packs</span>
      <div className="format-slide-main">
        <div className="format-slide-art">
          <img src={stickPackRender} width="800" height="800" alt="A blank white stick pack, angled, with a soft shadow — Ally Nutra's own render" loading="lazy" />
        </div>
        <div className="format-slide-copy">
          <h3 className="format-slide-headline">On-the-go format, portion-controlled</h3>
          <div className="format-slide-bestfor">
            <span className="format-slide-bestfor-label mono-chip">Best for</span>
            <ol className="format-slide-bestfor-list">
              <li>Energy blends</li>
              <li>Electrolytes</li>
              <li>Collagen</li>
            </ol>
          </div>
        </div>
      </div>
      <span className="format-slide-arrow" aria-hidden="true">→</span>
    </div>
  );
}

// Scroll-snap carousel: native horizontal scrolling (touch, trackpad, keyboard
// when focused) does the paging; the prev/next buttons and dots scroll the
// matching slide into view; the info bar under the track mirrors the centered
// slide as real text. No transform-based slide machinery on purpose — snap
// scrolling keeps dragging native on touch and needs no index math to stay in
// sync with gesture paging (onScroll just reports which slide ended up nearest
// center).
function FormatCarousel() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollTo = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(FORMAT_SHOWCASE.length - 1, index));
    const slide = track.children[clamped];
    if (slide) slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((slide, i) => {
      const dist = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - mid);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    setActive(best);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollTo(active - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollTo(active + 1); }
  };

  const current = FORMAT_SHOWCASE[active];

  return (
    <div
      className="format-carousel"
      role="group"
      aria-roledescription="carousel"
      aria-label="Format showcase"
      onKeyDown={onKeyDown}
    >
      <div className="format-track" ref={trackRef} onScroll={onScroll} tabIndex={0}>
        {FORMAT_SHOWCASE.map((f, i) => (
          <div
            className="format-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${FORMAT_SHOWCASE.length}: ${f.title}`}
            key={f.title}
          >
            {f.render === 'stick-pack' ? <StickPackSlide /> : (
              <img src={f.img} width="900" height="900" alt={f.alt} loading="lazy" onError={hideAndTint} />
            )}
          </div>
        ))}
      </div>
      <div className="format-nav">
        <button type="button" className="format-arrow" aria-label="Previous format" onClick={() => scrollTo(active - 1)}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <div className="format-dots">
          {FORMAT_SHOWCASE.map((f, i) => (
            <button
              type="button"
              className="format-dot"
              key={f.title}
              aria-current={i === active}
              aria-label={`Show ${f.title}`}
              onClick={() => scrollTo(i)}
            ></button>
          ))}
        </div>
        <button type="button" className="format-arrow" aria-label="Next format" onClick={() => scrollTo(active + 1)}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
      <div className="format-active-info" aria-live="polite">
        <span className="format-active-name">{current.title}</span>
        <span className="mono-chip">{current.spec}</span>
        <Link to={current.to} className="format-active-link">{current.linkLabel} →</Link>
      </div>
    </div>
  );
}

export default function Home() {
  const { role, isClient } = useDemoRole();
  return (
    <>
      {/* 01 — HERO: the only job of this section is stating what we do, for whom, and
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
              <a href={quoteUrl(role)} className="btn btn-primary btn-lg">{isClient ? 'Start a new quote' : 'Start your quote →'}</a>
              <a href={scheduleUrl(role)} className="btn btn-outline-invert btn-lg">Not sure yet? Schedule a call</a>
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

      {/* 02 — PROMISE BAR: answers the ghosting objection at the top of the page, where
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

      {/* 03 — WHAT WE MAKE: exactly the four confirmed formats. Supersedes the old
          text-only trust strip that used to sit here (removed in this restructure) —
          the richer credential + photo proof bar at position 05 covers that job with
          more evidence, so a second, thinner version of the same claim right here
          would have been redundant.
          First section of the light field (03-07, see section-banding fix): its top
          edge meets the navy promise bar, so that edge's padding is trimmed 88px→64px
          per Fix 3 (a full 88px of light plus the navy block's own padding read as a
          gap before a wall). Bottom edge is a within-field boundary against 04, so it
          keeps the standard 88px. */}
      <section className="section" style={sx('padding-top:64px;')}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>What we make</span>
            <h2>Four formats, all in-house.</h2>
          </div>
          <ProductCardsGrid products={PRODUCTS} />
        </div>
      </section>

      {/* 04 — COMPARISON: "why brands choose us", framed as what changes, not a features
          list. Right column characterises the industry-wide pattern, never a named
          competitor. Amber check glyph on the middle column only — everywhere else
          on this section is navy and mono. Reflows to stacked cards below 760px.
          No longer section-alt (grey) — see section-banding fix: this section is part
          of the continuous light field now, separated from its neighbours by the
          section-rule hairline instead of a background change. */}
      <section className="section section-rule">
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

      {/* 05 — FORMAT SHOWCASE: was the five-photo facility strip (credential strip +
          five captioned stock photos linking to /facility). Replaced with the four
          client-supplied branded format cards: the facility photos were stock
          (Unsplash — see IMAGE-CREDITS.md), so they proved nothing about THIS
          factory that the credential strip's linked claims don't already carry;
          the branded cards at least show the real formats in the client's own
          house style. The credential strip row is kept unchanged on top — the
          linked proof (certifications, facility, stats) survives; only the photo
          row below it changed. Light section, slides presented as-is (near-white
          baked backgrounds sit on --background without a seam), no tint. */}
      <section className="section section-rule format-showcase-section">
        <div className="container">
          <div className="credential-strip">
            {CREDENTIAL_STRIP.map((c) => (
              <Link to={c.to} key={c.label}>{c.label}</Link>
            ))}
          </div>
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Our formats</span>
            <h2>Four ways to ship your product.</h2>
            <p className="lede">
              Every format shown blank — your brand's labels and print finish the pack.
            </p>
          </div>
          <FormatCarousel />
        </div>
      </section>

      {/* 06 — WHY BRANDS STAY: unchanged claim-and-receipt rows. */}
      <section className="section section-rule">
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

      {/* 06.5 — VSL: the same video that opens the company site's /work-with-us
          landing page (allynutra.com/work-with-us), placed between the "Why Ally
          Nutra" claims (06) and the partner testimonials (07): claims, then the
          people making them on camera, then the customers corroborating. The h2
          is the video page's own headline, quoted verbatim — it titles the video
          the player below it plays, so it makes no claim this section doesn't
          deliver. Click-to-play with native controls: this is a talking-head
          video with an audio track (AAC), and autoplaying it muted would
          misrepresent it; the poster frame carries the section until pressed
          play. 720p source on viewports ≥700px, 360p below and as fallback. */}
      <section className="section section-rule vsl-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Work with us</span>
            <h2>Is your manufacturer holding your brand back?</h2>
            <p className="lede">
              The same video that opens our Work With Us page — watch it here, no form and no gate.
            </p>
          </div>
          <figure className="vsl-frame">
            <video className="vsl-video" controls preload="metadata" poster={vslPoster}>
              <source src={vsl720} type="video/mp4" media="(min-width: 700px)" />
              <source src={vsl360} type="video/mp4" />
              <a href="https://allynutra.com/work-with-us">Watch the video on allynutra.com</a>
            </video>
            <figcaption className="mono-chip vsl-caption">4:09 · from allynutra.com/work-with-us</figcaption>
          </figure>
        </div>
      </section>

      {/* 07 — PROOF (testimonials): DISABLED while awaiting accurate testimonials.
          The client will supply real names/companies/quotes (the old TODO below
          already flagged the current attributions as unverifiable initials-only
          placeholders). The section is retained behind this flag — content and
          styling unchanged — so re-enabling is a one-line flip once the real
          data arrives. Do NOT re-enable with the placeholder attributions. */}
      {SHOW_TESTIMONIALS && (
      <section className="section section-rule" style={sx('padding-bottom:64px;')}>
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
      )}

      {/* 08 — HOW IT WORKS: immediately before the final ask (deliberate — removes
          the last hesitation right before the click, rather than being read early
          and forgotten). Mono step/time labels kept, no amber — amber on this page
          marks the action, not the explanation.
          Navy-banding fix: this section and 09 were both navy, making the bottom
          of the page 1,328px of unbroken navy (how-it-works + CTA + footer) with
          no light section between two navy blocks and the footer. Converted to
          light — section-rule hairline (matching 07's own top-edge treatment)
          keeps it visually separate from its now-same-toned neighbours; the step
          cards move from a translucent-white dark-surface treatment to the
          standard card surface (see .how-it-works-card in global.css). */}
      <section className="section section-rule how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>How it works</span>
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

      {/* 09 — FINAL CTA: both actions repeated, plus the same expectation line as the
          hero and the phone number as a fallback.
          Navy-banding fix: converted from section-navy to light (see 08's comment
          for the full rationale — this and 08 were the two navy sections making
          the page bottom 1,328px of unbroken navy). Every hardcoded dark-surface
          color below is reworked for the light background: the `em` emphasis was
          --ally-orange (1.98:1 on light, fails AA) -> --ally-orange-ink (4.56:1);
          .btn-outline-invert (dark-surface outline) -> .btn-outline (its
          light-surface counterpart, already defined in global.css); the three
          white/opacity inline colors -> --muted-foreground / --ally-navy, the
          same tokens the rest of the light-surface site uses for this role
          (matching Contact.jsx:182's tel-link treatment). The h2 needed no
          inline change — removing section-navy lets it fall back to the global
          `h2{color:hsl(var(--ally-navy))}` default automatically. */}
      <section className="section section-rule" style={sx('text-align:center;')}>
        <div className="container">
          <h2 style={sx('max-width:640px;margin:0 auto 24px;')}>
            Ready to build something your customers will{' '}
            <em style={sx('font-style:italic;color:hsl(var(--ally-orange-ink));')}>actually</em> reorder?
          </h2>
          <div className="hero-ctas" style={sx('justify-content:center;margin-top:0;')}>
            <a href={quoteUrl(role)} className="btn btn-primary btn-lg">{isClient ? 'Start a new quote' : 'Start your quote →'}</a>
            <a href={scheduleUrl(role)} className="btn btn-outline btn-lg">Not sure yet? Schedule a call</a>
          </div>
          <p className="hero-expectation" style={sx('color:hsl(var(--muted-foreground));margin-top:20px;')}>{EXPECTATION_LINE}</p>
          <p style={sx('margin-top:12px;font-size:13px;color:hsl(var(--muted-foreground));')}>
            Prefer to talk first? <a href="tel:+18887205888" style={sx('color:hsl(var(--ally-navy));font-weight:600;text-decoration:underline;')}>(888) 720-5888</a>
          </p>
          {/* Client-requested final visual: the branded CTA card, clickable through to
              the quote flow (same destination as the primary button above — one more
              way to say yes, placed right before the footer). Portrait 4:5, capped at
              400px so it reads as a card, not a poster. */}
          <a href={quoteUrl(role)} className="cta-card-link">
            <img
              src={readyToBuildCta}
              width="840"
              height="1050"
              alt="Ally Nutra card: “Your Supplements, Our Expertise” over stand-up pouch and stick-pack artwork — start your quote"
              className="cta-card"
            />
          </a>
        </div>
      </section>

    </>
  );
}
