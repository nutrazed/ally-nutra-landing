import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { sx } from '../lib/styleString.js';
import { hideAndTint } from '../lib/imgFallback.js';
import CheckIcon from '../components/CheckIcon.jsx';

import homeHero from '../assets/images/home-hero.jpg';
import heroMachineWebm from '../assets/videos/hero-machine.webm';
import heroMachineMp4 from '../assets/videos/hero-machine.mp4';
import heroMachinePoster from '../assets/videos/hero-machine-poster.jpg';

import about01 from '../assets/images/about-01.jpg';
import about02 from '../assets/images/about-02.jpg';
import about03 from '../assets/images/about-03.jpg';
import about04 from '../assets/images/about-04.jpg';
import about05 from '../assets/images/about-05.jpg';

import rd01 from '../assets/images/rd-01.jpg';
import rd02 from '../assets/images/rd-02.jpg';
import rd03 from '../assets/images/rd-03.jpg';
import rd04 from '../assets/images/rd-04.jpg';

import product01 from '../assets/images/product-01.jpg';
import product02 from '../assets/images/product-02.jpg';
import product03 from '../assets/images/product-03.jpg';
import product04 from '../assets/images/product-04.jpg';
import product05 from '../assets/images/product-05.jpg';
import product06 from '../assets/images/product-06.jpg';
import product07 from '../assets/images/product-07.jpg';
import product08 from '../assets/images/product-08.jpg';

import facility01 from '../assets/images/facility-01.jpg';
import facility02 from '../assets/images/facility-02.jpg';
import facility03 from '../assets/images/facility-03.jpg';
import facility04 from '../assets/images/facility-04.jpg';
import facility05 from '../assets/images/facility-05.jpg';
import facility06 from '../assets/images/facility-06.jpg';

const ABOUT_STAGES = [
  {
    stage: 1,
    img: about01,
    alt: 'A lab technician pipetting a coloured solution into a multi-well tray during formulation work',
    title: 'Formulation support',
    body: "We help shape the formula before anything is locked — ingredient selection, standardisation percentages, dosages, and label claims. Bring a finished lab-verified formula or just a concept and a target benefit; both start the same way. Our formulators check ingredient compatibility, run stability and accelerated aging studies, and tune taste, texture, and flow. Once you sign off, the formulation is locked and the quote version is frozen for that run.",
  },
  {
    stage: 2,
    img: about02,
    alt: 'Two technicians running instrumented tests on samples in a materials testing lab',
    title: 'Ingredient sourcing',
    body: 'Raw materials are sourced against your approved spec and held in quarantine on arrival. Every shipment is sampled and identity-tested — FTIR, HPLC, or DNA verification depending on the material — before it is released to production. Supplier certificates of analysis are verified against our own results rather than taken on trust. Storage is temperature- and humidity-controlled with FIFO lot tracking and dedicated allergen segregation.',
  },
  {
    stage: 3,
    img: about03,
    alt: 'A tray of freshly filled capsules on an encapsulation line, ready for inspection',
    title: 'cGMP manufacturing',
    body: 'Blending, encapsulation, and compression run under 21 CFR Part 111 in our Dover, Delaware facility. V-blenders and ribbon mixers from 50L to 1,500L handle the blend; tamping-pin encapsulators fill sizes 000 through 4 at ±2% weight tolerance with in-process weight verification. Every batch carries documented in-process checks and a full batch record, so the run is traceable from raw material lot through to finished goods release.',
  },
  {
    stage: 4,
    img: about04,
    alt: 'A worker tending an automated bottle-filling line loading amber glass bottles',
    title: 'Packaging and labeling',
    body: 'Product leaves retail-ready, not as bulk you still have to finish. Automated counting and filling, induction sealing, labeling, and shrink banding, plus blister, sachet, stick pack, and stand-up pouch lines. We generate the FDA supplement facts panel, review claims for compliance, and set up barcode and lot coding. Artwork comes back print-ready with a structural dieline and mockup.',
  },
  {
    stage: 5,
    img: about05,
    alt: 'Rows of pallet racking stocked with boxed finished goods in a climate-controlled warehouse',
    title: 'Fulfillment',
    body: 'Finished goods are held in climate-controlled storage and ship from the East Coast, which puts most US destinations within two days. Amazon FBA prep is handled in-house — FNSKU labeling, poly-bagging, carton marking, pallet prep, and direct-to-fulfilment-center shipping. Multi-unit bundling and kitting available. Your client workspace shows order status and documents throughout, so you are not chasing email for a ship date.',
  },
];

const RD_CELLS = [
  {
    num: '01 · Formulation',
    img: rd01,
    alt: 'A gloved formulator weighing powder on an analytical balance',
    title: 'From concept to locked formula',
    body: 'Ingredient selection, standardisation percentages, dosing, and label claims are resolved before anything is fixed. We screen for compatibility, run stability and accelerated aging studies, and tune taste, texture, and flow.',
    receive: 'Formulation brief · stability data · label claim review',
  },
  {
    num: '02 · Evidence review',
    img: rd02,
    alt: 'A researcher reading closely printed pages of a technical text',
    title: 'Doses matched to the research',
    body: 'We select ingredients with published human data and match your dose to the levels actually studied — not the level that costs least. Claims are checked against what the evidence will support.',
    receive: 'Ingredient dossier · claim substantiation notes',
  },
  {
    num: '03 · Custom development',
    img: rd03,
    alt: 'Rows of empty small-batch glass sample bottles awaiting fill',
    title: 'Bench to production batch',
    body: 'Bring a concept or a competitor product. We benchmark it, model target cost, run prototype rounds with you, then scale from bench to full production without the formula drifting.',
    receive: 'Prototypes · cost model · scale-up plan',
  },
  {
    num: '04 · Sustainability',
    img: rd04,
    alt: 'An empty kraft cardboard packaging box seen from above',
    title: 'A supply-chain decision',
    body: 'Sustainability is a sourcing decision, not a marketing one. We prioritise suppliers with transparent sourcing and work with packaging partners on recyclable formats — and say so only where it is true.',
    receive: 'Sourcing disclosure · packaging options',
  },
];

const PRODUCTS = [
  { img: product01, alt: 'A pile of amber softgel capsules', format: 'Format 01 · Capsules', title: 'Capsules', desc: 'Two-piece, liquid-fill, vegan HPMC or bovine gelatin.', spec: 'SIZE 000–3 · MOQ FROM 2,500' },
  { img: product02, alt: 'A scattered pile of round white tablets', format: 'Format 02 · Tablets', title: 'Tablets', desc: 'Compressed, chewable, and bilayer with custom tooling.', spec: 'MULTI-TIP TOOLING · MOQ ON REQUEST' },
  { img: product03, alt: 'Flat foil single-serve sachets stacked on a white surface', format: 'Format 03 · Sachets', title: 'Sachets', desc: 'Single-serve, foil-lined, nitrogen flushed, custom print.', spec: '3g–30g FILL · MOQ FROM 5,000' },
  { img: product04, alt: 'A torn-open narrow stick pack lying on a white surface', format: 'Format 04 · Stick packs', title: 'Stick packs', desc: 'Narrow, portable, easy-tear. High-barrier film options.', spec: '2g–15g FILL · MOQ FROM 10,000' },
  { img: product05, alt: 'A blank kraft stand-up pouch with a resealable zipper top', format: 'Format 05 · Pouches', title: 'Pouches', desc: 'Resealable stand-up, matte, gloss, or kraft finish.', spec: '50g–5,000g FILL · MOQ FROM 2,000' },
  { img: product06, alt: 'A scoop spilling loose powder onto a flat surface', format: 'Format 06 · Powders', title: 'Powders', desc: 'Auger-fill and net-weight into bulk tubs and jars.', spec: 'TUBS · JARS · MOQ ON REQUEST' },
  { img: product07, alt: 'A pile of colorful gummy bears', format: 'Format 07 · Gummies', title: 'Gummies', desc: 'Pectin-based or gelatin-based, custom shapes, flavors, and active loads.', spec: 'PECTIN · GELATIN · MOQ ON REQUEST' },
  { img: product08, alt: 'An amber glass dropper bottle lying on linen fabric', format: 'Format 08 · Liquids', title: 'Liquids', desc: 'Tinctures, syrups, and shots — dropper bottles or single-serve, cold-fill capable.', spec: 'DROPPER · SINGLE-SERVE · MOQ ON REQUEST' },
];

const FACILITY_ZONES = [
  { img: facility01, alt: 'A stack of empty wooden pallets staged in a warehouse doorway', zone: 'Zone 01 · Receiving', title: 'Raw material intake', desc: 'Climate-controlled dock with quarantine staging. Every shipment sampled and identity-tested before release.', spec: 'COA VERIFICATION · QUARANTINE BAY' },
  { img: facility02, alt: 'Warehouse aisle lined with shelving stocked with large ingredient drums and sacks', zone: 'Zone 02 · Storage', title: 'Raw material warehouse', desc: 'Temperature- and humidity-controlled storage with FIFO lot tracking and dedicated allergen segregation.', spec: 'CLIMATE CONTROLLED · LOT TRACKED' },
  { img: facility03, alt: 'A large stainless steel blending or mixing tank on a production floor', zone: 'Zone 03 · Production', title: 'Blending and manufacturing', desc: 'V-blenders and ribbon mixers, encapsulators, tablet presses, and powder fillers — all under one roof.', spec: '50L–1,500L · ISO 8 / CLASS 100,000' },
  { img: facility04, alt: 'A gloved technician pipetting samples into a rack of test vials', zone: 'Zone 04 · Quality', title: 'QC laboratory', desc: 'On-site lab for in-process weight checks, dissolution testing, microbial screening, and finished goods release.', spec: 'HPLC · ISO 7 / CLASS 10,000 BOOTH' },
  { img: facility05, alt: 'A bottle moving under a filling funnel on an automated packaging line', zone: 'Zone 05 · Packaging', title: 'Bottling and packaging', desc: 'Automated counting and filling, induction sealing, labeling, and shrink banding, plus sachet and stick pack lines.', spec: 'AUTO-COUNTER · INDUCTION SEAL' },
  { img: facility06, alt: 'A warehouse aisle lined with shrink-wrapped stacks of plain cartons', zone: 'Zone 06 · Logistics', title: 'Finished goods and shipping', desc: 'Climate-controlled finished goods warehouse with a dedicated FBA prep zone, palletisation, and direct ship lanes.', spec: 'FBA PREP · DIRECT SHIP' },
];

// Home hero encapsulation-machine video: falls back to the built-in SVG line
// drawing under prefers-reduced-motion, or if the video errors out — ported from
// the standalone <script> block near the end of the source file's <body>.
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

// Home "About" section only: sticky-scroll narrative. Ported from the source file's
// IntersectionObserver-driven script — always acts on the entry with the largest
// intersectionRatio, never more than one stage per callback (the invariant called
// out in the source comment right above the observer), so two captions never both
// read as active during a fast scroll. Disconnected below 901px, where CSS switches
// to a plain inline stack (matching the @media (max-width:900px) block in global.css).
function AboutScroll() {
  const stageRefs = useRef({});
  const [activeStage, setActiveStage] = useState(1);
  const activeStageRef = useRef(1);

  useEffect(() => {
    activeStageRef.current = activeStage;
  }, [activeStage]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    let observer = null;

    function connect() {
      if (observer) return;
      observer = new IntersectionObserver(
        (entries) => {
          let best = null;
          entries.forEach((entry) => {
            if (entry.isIntersecting && (!best || entry.intersectionRatio > best.intersectionRatio)) {
              best = entry;
            }
          });
          if (best) {
            const stage = Number(best.target.dataset.stage);
            if (stage !== activeStageRef.current) {
              activeStageRef.current = stage;
              setActiveStage(stage);
            }
          }
        },
        { rootMargin: '-35% 0px -45% 0px', threshold: 0 }
      );
      Object.values(stageRefs.current).forEach((el) => el && observer.observe(el));
    }
    function disconnect() {
      if (!observer) return;
      observer.disconnect();
      observer = null;
    }

    const mq = window.matchMedia('(min-width: 901px)');
    function syncToBreakpoint() {
      if (mq.matches) connect();
      else disconnect();
    }
    syncToBreakpoint();
    if (mq.addEventListener) mq.addEventListener('change', syncToBreakpoint);
    else if (mq.addListener) mq.addListener(syncToBreakpoint);

    return () => {
      disconnect();
      if (mq.removeEventListener) mq.removeEventListener('change', syncToBreakpoint);
      else if (mq.removeListener) mq.removeListener(syncToBreakpoint);
    };
  }, []);

  function goTo(stage) {
    stageRefs.current[stage]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <section className="section about-scroll">
      <div className="container about-scroll-grid">
        <div className="about-sticky-col">
          <div className="about-frame">
            {ABOUT_STAGES.map((s) => (
              <img
                key={s.stage}
                className={`about-img${activeStage === s.stage ? ' on' : ''}`}
                data-stage={s.stage}
                src={s.img}
                width="900"
                height="675"
                alt={s.alt}
                loading={s.stage === 1 ? 'eager' : 'lazy'}
                onError={hideAndTint}
              />
            ))}
            <div className="about-img-tint" aria-hidden="true"></div>
          </div>
          <div className="about-rail" role="group" aria-label="Jump to a stage">
            {ABOUT_STAGES.map((s) => (
              <button
                key={s.stage}
                type="button"
                className={`about-rail-num${activeStage === s.stage ? ' on' : ''}`}
                data-goto={s.stage}
                aria-label={`Go to stage ${s.stage}: ${s.title}`}
                onClick={() => goTo(s.stage)}
              >
                {String(s.stage).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="about-intro">
            <span className="eyebrow">About Ally Nutra</span>
            <h2 style={sx('margin:14px 0 18px;')}>
              A contract manufacturing partner built around{' '}
              <em style={sx('font-style:italic;color:hsl(var(--ally-navy))')}>your</em> brand.
            </h2>
            <p style={sx('margin-bottom:14px;')}>
              Ally Nutra LLC is a US-based contract supplement manufacturer supporting wellness
              brands end-to-end — from formulation support and ingredient sourcing through
              manufacturing, packaging, labeling, and fulfillment.
            </p>
            <p>
              We operate in a cGMP-certified facility, support all major dosage forms, and hold
              ourselves to the standards our partners demand of us: clean documentation, honest
              timelines, and real transparency on pricing.
            </p>
          </div>

          {ABOUT_STAGES.map((s) => (
            <div
              key={s.stage}
              ref={(el) => {
                stageRefs.current[s.stage] = el;
              }}
              className={`about-stage${activeStage === s.stage ? ' on' : ''}`}
              data-stage={s.stage}
            >
              <div className="about-stage-mobile-img">
                <img
                  src={s.img}
                  width="900"
                  height="675"
                  alt={s.alt}
                  loading={s.stage === 1 ? 'eager' : 'lazy'}
                  onError={hideAndTint}
                />
              </div>
              <span className="about-stage-num">{String(s.stage).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}

          <Link to="/about" className="btn btn-outline about-cta">
            Learn more about us →
          </Link>
        </div>
      </div>
    </section>
  );
}

// Home "Company snapshot" section only: scroll-triggered count-up, played once via
// IntersectionObserver (never a scroll listener) + requestAnimationFrame (never
// setInterval) — ported from the source file's script block near the end of <body>.
function AnimatedStat({ count, suffix, mode, delay }) {
  const [display, setDisplay] = useState('0');
  const rafRef = useRef(null);

  useEffect(() => {
    if (mode === 'final') {
      setDisplay(count.toLocaleString() + suffix);
      return;
    }
    if (mode !== 'animate') return;

    let start = null;
    let cancelled = false;
    const duration = 1400;
    function easeOutCubic(p) {
      return 1 - Math.pow(1 - p, 3);
    }
    const timer = setTimeout(() => {
      function step(ts) {
        if (cancelled) return;
        if (start === null) start = ts;
        const p = Math.min(1, (ts - start) / duration);
        const eased = easeOutCubic(p);
        const current = Math.round(eased * count);
        // Suffix only on the true final frame — a counting "347+" is a lie.
        setDisplay(current.toLocaleString() + (p >= 1 ? suffix : ''));
        if (p < 1) rafRef.current = requestAnimationFrame(step);
      }
      rafRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mode, count, suffix, delay]);

  return (
    <span className="stat-live" aria-hidden="true" data-count={count} data-suffix={suffix}>
      {display}
    </span>
  );
}

function StatPanel() {
  const panelRef = useRef(null);
  const [mode, setMode] = useState('idle');
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setMode('final');
      setRevealed(true);
      return;
    }
    if (typeof IntersectionObserver === 'undefined') {
      setMode('final');
      setRevealed(true);
      return;
    }

    // Loaded already scrolled past this section (deep link, hash jump, etc.) — show
    // finals immediately rather than sitting on a stale "0" that never gets a chance
    // to animate.
    const initialRect = panel.getBoundingClientRect();
    if (initialRect.bottom < 0) {
      setMode('final');
      setRevealed(true);
      return;
    }

    let played = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (played) return;
          if (entry.isIntersecting) {
            played = true;
            setRevealed(true);
            setMode('animate');
            io.unobserve(panel);
          } else if (entry.boundingClientRect.bottom < 0) {
            // Scrolled straight past without ever crossing the 0.5 threshold (fast
            // flick) — show finals rather than leaving it at "0".
            played = true;
            setMode('final');
            setRevealed(true);
            io.unobserve(panel);
          }
        });
      },
      { threshold: [0, 0.5] }
    );
    io.observe(panel);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`stat-panel${revealed ? ' in' : ''}`} ref={panelRef}>
      <div className="stat-panel-head">
        <span>System · Ally Nutra QMS</span>
        <span>Dover, Delaware</span>
      </div>
      <div className="grid grid-4" style={sx('gap:0;')}>
        <div className="stat-cell">
          <span className="mono-chip">CH-01</span>
          <div className="stat-label">Years in business</div>
          <div className="stat-value" aria-label="10+">
            <span className="stat-ghost" aria-hidden="true">10+</span>
            <AnimatedStat count={10} suffix="+" mode={mode} delay={0} />
          </div>
          <div className="stat-sub">Operating since 2015<br />Dover, Delaware · USA</div>
        </div>
        <div className="stat-cell">
          <span className="mono-chip">CH-02</span>
          <div className="stat-label">Brands served</div>
          <div className="stat-value stat-value-accent" aria-label="500+">
            <span className="stat-ghost" aria-hidden="true">500+</span>
            <AnimatedStat count={500} suffix="+" mode={mode} delay={60} />
          </div>
          <div className="stat-sub">US &amp; international markets<br />DTC · retail · B2B</div>
        </div>
        <div className="stat-cell" data-static="true">
          <span className="mono-chip">CH-03</span>
          <div className="stat-label">Lead time</div>
          <div className="stat-value">4–8 wks</div>
          <div className="stat-sub">Standard production run<br />Rush timelines available</div>
        </div>
        <div className="stat-cell" style={sx('border-right:none;')}>
          <span className="mono-chip">CH-04</span>
          <div className="stat-label">Dosage forms</div>
          <div className="stat-value" aria-label="8+">
            <span className="stat-ghost" aria-hidden="true">8+</span>
            <AnimatedStat count={8} suffix="+" mode={mode} delay={120} />
          </div>
          <div className="stat-sub">Caps · powders · gummies<br />tablets · liquids · sticks</div>
        </div>
        <div className="stat-cell" style={sx('border-bottom:none;')}>
          <span className="mono-chip">CH-05</span>
          <div className="stat-label">Certifications</div>
          <div className="stat-value" aria-label="7">
            <span className="stat-ghost" aria-hidden="true">7</span>
            <AnimatedStat count={7} suffix="" mode={mode} delay={180} />
          </div>
          <div className="stat-sub">cGMP · NSF · organic · kosher<br />halal · non-GMO · ISO</div>
        </div>
        <div className="stat-cell" style={sx('border-bottom:none;')}>
          <span className="mono-chip">CH-06</span>
          <div className="stat-label">In-house formulators</div>
          <div className="stat-value" aria-label="15+">
            <span className="stat-ghost" aria-hidden="true">15+</span>
            <AnimatedStat count={15} suffix="+" mode={mode} delay={240} />
          </div>
          <div className="stat-sub">PhDs · nutritionists<br />R&amp;D chemists on staff</div>
        </div>
        <div className="stat-cell" style={sx('border-bottom:none;')}>
          <span className="mono-chip">CH-07</span>
          <div className="stat-label">Raw materials on file</div>
          <div className="stat-value" aria-label="2,000+">
            <span className="stat-ghost" aria-hidden="true">2,000+</span>
            <AnimatedStat count={2000} suffix="+" mode={mode} delay={300} />
          </div>
          <div className="stat-sub">Traceable ingredients<br />full COA on request</div>
        </div>
        <div className="stat-cell" style={sx('border-right:none;border-bottom:none;')}>
          <span className="mono-chip">CH-08</span>
          <div className="stat-label">MOQ flexibility</div>
          <div className="stat-value" aria-label="100">
            <span className="stat-ghost" aria-hidden="true">100</span>
            <AnimatedStat count={100} suffix="" mode={mode} delay={360} />
          </div>
          <div className="stat-sub">bottles · scales to 1M+</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero hero-home">
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
            <h1 style={sx('margin-top:14px;')}>Your brand. Our science. Formulated together.</h1>
            <p className="lede" style={sx('margin:18px 0 24px;max-width:520px;')}>
              Ally Nutra is a full-service contract supplement manufacturer helping wellness
              brands launch, scale, and stand out — with cGMP-certified production, transparent
              pricing, and in-house formulation expertise.
            </p>
            <ul className="bullet-list">
              <li>
                <CheckIcon width={18} height={18} />
                <span><strong>Turnkey OEM/ODM</strong> — from raw concept to retail-ready shipment.</span>
              </li>
              <li>
                <CheckIcon width={18} height={18} />
                <span><strong>Flexible MOQs</strong> — low-MOQ launches to high-volume production runs.</span>
              </li>
              <li>
                <CheckIcon width={18} height={18} />
                <span><strong>All major dosage forms</strong> — capsules, powders, gummies, tablets, liquids.</span>
              </li>
              <li>
                <CheckIcon width={18} height={18} />
                <span><strong>Full traceability</strong> — a COA and batch documentation on every order.</span>
              </li>
            </ul>
            <div className="hero-ctas">
              <Link to="/contact" className="btn btn-primary btn-lg">Get a free quote →</Link>
              <Link to="/services" className="btn btn-outline-invert btn-lg">Explore capabilities</Link>
            </div>
          </div>
          <HeroMech />
        </div>
      </section>

      <section className="section-navy" style={sx('padding:56px 0;text-align:center;')}>
        <div className="container">
          <p style={sx('font-family:var(--font-slab);font-size:24px;font-weight:500;line-height:1.4;max-width:820px;margin:0 auto;color:#fff;')}>
            "Whether you're launching your first SKU or scaling to a national retail footprint —
            we build the formula, the product, and the partnership that gets you there."
          </p>
        </div>
      </section>

      <AboutScroll />

      <section className="section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Company snapshot</span>
            <h2>Built for scale. Obsessed with quality.</h2>
          </div>
          <StatPanel />
        </div>
      </section>

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

      <section className="section-navy">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow on-dark" style={sx('justify-content:center;')}>R&amp;D and innovation</span>
            <h2>Science is the product.</h2>
            <p>
              Our in-house team works where nutrition science meets manufacturing — turning
              ingredient research into formulas that work, taste good, and hold up on the shelf.
            </p>
          </div>

          <div className="rd-matrix">
            {RD_CELLS.map((cell) => (
              <div className="rd-cell" key={cell.num}>
                <span className="rd-cell-num">{cell.num}</span>
                <div className="rd-cell-photo">
                  <img src={cell.img} width="600" height="200" alt={cell.alt} loading="lazy" onError={hideAndTint} />
                </div>
                <h3>{cell.title}</h3>
                <p className="rd-cell-body">{cell.body}</p>
                <div className="rd-cell-receive">
                  <span className="rd-cell-receive-label">You receive</span>
                  <p className="rd-cell-receive-text">{cell.receive}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>What we make</span>
            <h2>Eight formats, all in-house.</h2>
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

      <section className="section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Inside the facility</span>
            <h2>See where your product gets made.</h2>
            <p>We run a tight, modern operation — audit-ready, clearly documented, and open for our partners to visit any time.</p>
          </div>
          <div className="fac-grid">
            {FACILITY_ZONES.map((z) => (
              <div className="fac-card" key={z.zone}>
                <img src={z.img} width="900" height="600" alt={z.alt} loading="lazy" onError={hideAndTint} />
                <div className="fac-body">
                  <span className="fac-zone">{z.zone}</span>
                  <h3>{z.title}</h3>
                  <p className="fac-desc">{z.desc}</p>
                  <div className="fac-spec">{z.spec}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
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

      <section className="section-navy" style={sx('text-align:center;')}>
        <div className="container">
          <h2 style={sx('max-width:640px;margin:0 auto 24px;')}>
            Ready to build something your customers will{' '}
            <em style={sx('font-style:italic;color:hsl(var(--ally-orange));')}>actually</em> reorder?
          </h2>
          <Link to="/contact" className="btn btn-primary btn-lg">Get a free quote →</Link>
        </div>
      </section>
    </>
  );
}
