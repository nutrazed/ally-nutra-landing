import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { sx } from '../lib/styleString.js';
import { hideAndTint } from '../lib/imgFallback.js';
import { scrollToId } from '../lib/scrollToId.js';

import about01 from '../assets/images/about-01.jpg';
import about02 from '../assets/images/about-02.jpg';
import about03 from '../assets/images/about-03.jpg';
import about04 from '../assets/images/about-04.jpg';
import about05 from '../assets/images/about-05.jpg';
import about06 from '../assets/images/about-06.jpg';

// Relocated from the home view (2026 conversion restructure) — the process
// narrative a visitor wants once they're already interested in the company, not
// before. See docs/PLAN.md for why this moved off Home.
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
    body: 'Blending, encapsulation, and compression run under 21 CFR Part 111 in our Dover, Delaware facility. V-blenders and ribbon mixers from 50L to 1,500L handle the blend; tamping-pin encapsulators fill sizes 000 through 3 at ±2% weight tolerance with in-process weight verification. Every batch carries documented in-process checks and a full batch record, so the run is traceable from raw material lot through to finished goods release.',
  },
  {
    stage: 4,
    img: about04,
    alt: 'A worker tending an automated bottle-filling line loading amber glass bottles',
    title: 'Packaging and labeling',
    body: 'Product leaves retail-ready, not as bulk you still have to finish. Automated counting and filling, induction sealing, labeling, and shrink banding, plus sachet, stick pack, and stand-up pouch lines. We generate the FDA supplement facts panel, review claims for compliance, and set up barcode and lot coding. Artwork comes back print-ready with a structural dieline and mockup.',
  },
  {
    stage: 5,
    img: about05,
    alt: 'Rows of pallet racking stocked with boxed finished goods in a climate-controlled warehouse',
    title: 'Fulfillment',
    body: 'Finished goods are held in climate-controlled storage and ship from the East Coast, which puts most US destinations within two days. Amazon FBA prep is handled in-house — FNSKU labeling, poly-bagging, carton marking, pallet prep, and direct-to-fulfilment-center shipping. Multi-unit bundling and kitting available. Your client workspace shows order status and documents throughout, so you are not chasing email for a ship date.',
  },
];

// Sticky-scroll narrative. Ported from Home.jsx's original IntersectionObserver-driven
// implementation — always acts on the entry with the largest intersectionRatio, never
// more than one stage per callback, so two captions never both read as active during a
// fast scroll. Disconnected below 901px, where CSS switches to a plain inline stack.
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
            <span className="eyebrow">How we work</span>
            <h2 style={sx('margin:14px 0 18px;')}>
              From formula to finished product — <em style={sx('font-style:italic;color:hsl(var(--ally-navy))')}>five stages</em>.
            </h2>
            <p>
              Every order moves through the same documented process, whether it's your
              first SKU or your fiftieth.
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
        </div>
      </div>
    </section>
  );
}

// Relocated from the home view's "Company snapshot" — scroll-triggered count-up,
// played once via IntersectionObserver (never a scroll listener) + requestAnimationFrame
// (never setInterval). Certifications and format counts corrected to match the
// dedicated Certifications and Home pages exactly (see docs/PLAN.md).
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
        <div className="stat-cell">
          <span className="mono-chip">CH-03</span>
          <div className="stat-label">Units shipped</div>
          <div className="stat-value" aria-label="10M+">
            <span className="stat-ghost" aria-hidden="true">10M+</span>
            <AnimatedStat count={10} suffix="M+" mode={mode} delay={120} />
          </div>
          <div className="stat-sub">Across 500+ brands<br />US &amp; international</div>
        </div>
        <div className="stat-cell" style={sx('border-right:none;')}>
          <span className="mono-chip">CH-04</span>
          <div className="stat-label">Facility size</div>
          <div className="stat-value" data-static="true">50,000</div>
          <div className="stat-sub">Sq ft · Dover, Delaware<br />cGMP-certified</div>
        </div>
        <div className="stat-cell" style={sx('border-bottom:none;')}>
          <span className="mono-chip">CH-05</span>
          <div className="stat-label">Formats manufactured</div>
          <div className="stat-value" aria-label="4">
            <span className="stat-ghost" aria-hidden="true">4</span>
            <AnimatedStat count={4} suffix="" mode={mode} delay={180} />
          </div>
          <div className="stat-sub">Capsules · sachets<br />stick packs · pouches</div>
        </div>
        <div className="stat-cell" style={sx('border-bottom:none;')}>
          <span className="mono-chip">CH-06</span>
          <div className="stat-label">Certifications</div>
          <div className="stat-value" aria-label="6">
            <span className="stat-ghost" aria-hidden="true">6</span>
            <AnimatedStat count={6} suffix="" mode={mode} delay={240} />
          </div>
          <div className="stat-sub">cGMP · FDA · NSF<br />organic · halal · kosher</div>
        </div>
        <div className="stat-cell" style={sx('border-bottom:none;')}>
          <span className="mono-chip">CH-07</span>
          <div className="stat-label">In-house formulators</div>
          <div className="stat-value" aria-label="15+">
            <span className="stat-ghost" aria-hidden="true">15+</span>
            <AnimatedStat count={15} suffix="+" mode={mode} delay={300} />
          </div>
          <div className="stat-sub">PhDs · nutritionists<br />R&amp;D chemists on staff</div>
        </div>
        <div className="stat-cell" style={sx('border-right:none;border-bottom:none;')}>
          <span className="mono-chip">CH-08</span>
          <div className="stat-label">Raw materials on file</div>
          <div className="stat-value" aria-label="2,000+">
            <span className="stat-ghost" aria-hidden="true">2,000+</span>
            <AnimatedStat count={2000} suffix="+" mode={mode} delay={360} />
          </div>
          <div className="stat-sub">Traceable ingredients<br />full COA on request</div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section aria-labelledby="about-h1">
      <section className="hero on-navy">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow on-dark">About Ally Nutra</span>
            <h1 id="about-h1" style={sx('color:#fff;margin-top:14px;')}>The manufacturer brands trust to build beside them.</h1>
            <p style={sx("color:hsl(0 0% 100% / .78);margin:18px 0 0;max-width:480px;")}>
              We're not the biggest contract manufacturer. We're the one that picks up the phone,
              ships on time, and treats your brand like ours. Built in Dover, Delaware — built to
              be your ally.
            </p>
            <div className="hero-ctas">
              <Link to="/contact" className="btn btn-primary btn-lg">Work with us →</Link>
              <a href="#our-story" className="btn btn-outline-light btn-lg" onClick={scrollToId('our-story')}>
                Read our story
              </a>
            </div>
          </div>
          <div style={sx("background:hsl(0 0% 100% / .04);border:1px solid hsl(var(--ally-orange)/.3);border-radius:var(--radius-lg);padding:36px 32px;position:relative;")}>
            <div style={sx("font-family:var(--font-slab);font-size:64px;color:hsl(var(--ally-orange));line-height:1;opacity:.5;")}>"</div>
            <p style={sx("font-family:var(--font-slab);font-size:19px;font-weight:500;color:#fff;line-height:1.4;margin:8px 0 24px;")}>
              We built Ally Nutra to be the partner we wished we had —{' '}
              <span style={sx('color:hsl(var(--ally-orange));')}>
                honest pricing, real timelines, and a team that answers the phone.
              </span>
            </p>
            <div style={sx("display:flex;align-items:center;gap:14px;padding-top:18px;border-top:1px solid hsl(0 0% 100% / .15);")}>
              <div className="author-avatar" style={sx('width:42px;height:42px;')}>D</div>
              <div>
                <strong style={sx('display:block;color:#fff;font-size:14px;')}>Dasi</strong>
                <span style={sx("color:hsl(var(--ally-orange));font-size:11.5px;text-transform:uppercase;letter-spacing:0.08em;")}>Founder &amp; owner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Company snapshot</span>
            <h2>Built for scale. Obsessed with quality.</h2>
          </div>
          <StatPanel />
        </div>
      </section>

      <section className="section" id="our-story">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 style={sx('margin:14px 0 16px;')}>Built by people who've been on both sides.</h2>
            <p style={sx('margin-bottom:16px;')}>
              Ally Nutra was founded by people who know what it's like to be a small brand
              chasing a manufacturer for an updated quote, a sample that's three weeks late, or a
              COA that never arrived. We've felt that frustration — and we built a manufacturing
              company specifically designed to solve it.
            </p>
            <p style={sx('margin-bottom:16px;')}>
              Headquartered in <strong style={sx('color:hsl(var(--ally-navy));')}>Dover, Delaware</strong>,
              our 50,000-square-foot cGMP-certified facility serves brands across North America —
              from first-time founders launching a single SKU to established e-commerce operators
              scaling into retail.
            </p>
            <p>
              Today, we manufacture supplements for over 500 brands.{' '}
              <strong style={sx('color:hsl(var(--ally-navy));')}>
                Every one of them gets a real human, a real timeline, and a real product
              </strong>{' '}
              — every time.
            </p>
          </div>
          <div>
            <div className="photo ratio-4x3" style={sx('margin-bottom:16px;')}>
              <img
                style={sx("filter:saturate(.87) sepia(.08);")}
                src={about06}
                width="1400"
                height="1050"
                alt="Exterior of an industrial building with corrugated metal siding"
                loading="lazy"
                decoding="async"
                onError={hideAndTint}
              />
            </div>
            <div className="card" style={sx('padding:32px;')}>
              <div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.5);margin-bottom:10px;")}>Headquartered in</div>
              <h3 style={sx("font-size:28px;margin-bottom:16px;")}>Dover, Delaware</h3>
              <p style={sx('margin-bottom:20px;')}>
                A purpose-built supplement manufacturing facility on the U.S. East Coast —
                positioned for fast shipping to Amazon FBA, retail, and direct-to-consumer brands.
              </p>
              <div className="grid grid-2" style={sx("border-top:1px solid hsl(var(--border));padding-top:20px;")}>
                <div>
                  <strong style={sx("font-family:var(--font-slab);font-size:26px;color:hsl(var(--ally-orange));display:block;")}>50K</strong>
                  <span style={sx("font-size:11px;color:hsl(var(--muted-foreground));text-transform:uppercase;letter-spacing:0.05em;")}>Sq ft</span>
                </div>
                <div>
                  <strong style={sx("font-family:var(--font-slab);font-size:26px;color:hsl(var(--ally-orange));display:block;")}>12+</strong>
                  <span style={sx("font-size:11px;color:hsl(var(--muted-foreground));text-transform:uppercase;letter-spacing:0.05em;")}>Production lines</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutScroll />

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>What drives us</span>
            <h2>Mission &amp; vision.</h2>
            <p>Two simple principles — one to guide what we do today, the other to shape where we're headed tomorrow.</p>
          </div>
          <div className="grid grid-2">
            <div className="card" style={sx("border-left:4px solid hsl(var(--ally-orange));padding:36px;")}>
              <div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.5);margin-bottom:12px;")}>Our mission</div>
              <h3 style={sx("font-size:22px;margin-bottom:14px;")}>Build the manufacturing partner brands deserve.</h3>
              <p>To make supplement manufacturing transparent, accessible, and human — so brands of every size can launch quality products without losing months chasing answers, samples, or shipments.</p>
            </div>
            <div className="card" style={sx("border-left:4px solid hsl(var(--ally-orange));padding:36px;")}>
              <div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.5);margin-bottom:12px;")}>Our vision</div>
              <h3 style={sx("font-size:22px;margin-bottom:14px;")}>A world where every great brand can ship a great product.</h3>
              <p>A future where contract manufacturing isn't a black box of opaque pricing and missed deadlines, but a transparent, technology-enabled partnership that puts brand-builders in control of their supply chain.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Our values</span>
            <h2>How we show up — every day.</h2>
            <p>These aren't posters on the wall. They're the standards we hire for, fire for, and measure ourselves against.</p>
          </div>
          <div className="grid grid-3">
            <div className="card"><div style={sx("font-family:var(--font-slab);font-size:38px;color:hsl(var(--ally-orange)/.5);margin-bottom:10px;")}>01</div><h3 style={sx("font-size:17px;margin-bottom:8px;")}>Transparency</h3><p style={sx("font-size:13.5px;")}>Real pricing, real timelines, real updates. If something is delayed, we tell you why before you have to ask.</p></div>
            <div className="card"><div style={sx("font-family:var(--font-slab);font-size:38px;color:hsl(var(--ally-orange)/.5);margin-bottom:10px;")}>02</div><h3 style={sx("font-size:17px;margin-bottom:8px;")}>Quality, always</h3><p style={sx("font-size:13.5px;")}>cGMP isn't the ceiling — it's the floor. Every batch is tested, documented, and shipped only when it's right.</p></div>
            <div className="card"><div style={sx("font-family:var(--font-slab);font-size:38px;color:hsl(var(--ally-orange)/.5);margin-bottom:10px;")}>03</div><h3 style={sx("font-size:17px;margin-bottom:8px;")}>Speed with integrity</h3><p style={sx("font-size:13.5px;")}>Fast lead times, never at the expense of quality. We say no to corners that get cut at the customer's expense.</p></div>
            <div className="card"><div style={sx("font-family:var(--font-slab);font-size:38px;color:hsl(var(--ally-orange)/.5);margin-bottom:10px;")}>04</div><h3 style={sx("font-size:17px;margin-bottom:8px;")}>Real partnership</h3><p style={sx("font-size:13.5px;")}>Your brand's success is our success. We give honest advice, even when it means a smaller order today.</p></div>
            <div className="card"><div style={sx("font-family:var(--font-slab);font-size:38px;color:hsl(var(--ally-orange)/.5);margin-bottom:10px;")}>05</div><h3 style={sx("font-size:17px;margin-bottom:8px;")}>Show, don't tell</h3><p style={sx("font-size:13.5px;")}>Audits, certifications, COAs, batch records — we share the receipts so you don't have to take our word.</p></div>
            <div className="card"><div style={sx("font-family:var(--font-slab);font-size:38px;color:hsl(var(--ally-orange)/.5);margin-bottom:10px;")}>06</div><h3 style={sx("font-size:17px;margin-bottom:8px;")}>Built in America</h3><p style={sx("font-size:13.5px;")}>Made in Dover, Delaware. American jobs, American facility, American supply chain — and proud of it.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-rule">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Our journey</span>
            <h2>Milestones that made us.</h2>
            <p>Every brand has a story. This is ours — the moments that shaped how we build, hire, and serve.</p>
          </div>
          <div className="timeline">
            <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-year">Founded</div><h4>A different kind of manufacturer</h4><p style={sx("font-size:13.5px;")}>Ally Nutra was founded with one principle: to be the contract manufacturer brands actually wanted to call back.</p></div>
            <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-year">Year 2</div><h4>cGMP certification &amp; FDA registration</h4><p style={sx("font-size:13.5px;")}>Achieved cGMP certification under 21 CFR Part 111 and registered our facility with the FDA.</p></div>
            <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-year">Year 3</div><h4>Facility expansion to 50,000 sq ft</h4><p style={sx("font-size:13.5px;")}>Expanded our footprint in Dover, Delaware — adding production lines, a dedicated QC lab, and climate-controlled storage.</p></div>
            <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-year">Year 4</div><h4>Private label catalog launched</h4><p style={sx("font-size:13.5px;")}>Released our 200+ SKU private label catalog, helping new brands launch in weeks instead of months.</p></div>
            <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-year">Today</div><h4>500+ brands and counting</h4><p style={sx("font-size:13.5px;")}>Ally Nutra now serves over 500 supplement brands across North America and has shipped more than 10 million units.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Leadership</span>
            <h2>The people behind your product.</h2>
            <p>A small leadership team with deep operations experience — and one rule: every brand we work with knows who to call.</p>
          </div>
          {/* TODO: replace initials with real staff headshots once brand photography is scheduled.
               Placeholder avatars are used deliberately here instead of stock portraits, which
               would misrepresent named individuals. */}
          <div className="grid grid-3">
            <div className="team-card">
              <div className="team-avatar">D</div>
              <div className="team-info"><h4>Dasi</h4><div className="team-role">Founder &amp; owner</div><p style={sx("font-size:13px;")}>Leads Ally Nutra with a relentless focus on customer experience — personally involved in every major partnership.</p></div>
            </div>
            <div className="team-card">
              <div className="team-avatar">O</div>
              <div className="team-info"><h4>Operations</h4><div className="team-role">Manufacturing lead</div><p style={sx("font-size:13px;")}>A team of cGMP-trained production managers and supply chain specialists keeping timelines tight and quality high.</p></div>
            </div>
            <div className="team-card">
              <div className="team-avatar">Q</div>
              <div className="team-info"><h4>Quality</h4><div className="team-role">QC &amp; compliance</div><p style={sx("font-size:13px;")}>Manages in-house testing, third-party lab coordination, batch documentation, and regulatory compliance.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container hero-grid">
          <ul style={sx('list-style:none;')}>
            <li style={sx("display:flex;gap:16px;padding:16px 0;border-bottom:1px solid hsl(var(--border));")}>
              <div style={sx("flex-shrink:0;width:32px;height:32px;border-radius:50%;background:hsl(var(--ally-orange)/.15);color:hsl(var(--ally-navy));display:flex;align-items:center;justify-content:center;font-weight:700;")}>✓</div>
              <div><h4 style={sx("font-size:14.5px;color:hsl(var(--ally-navy));margin-bottom:4px;")}>One point of contact</h4><p style={sx("font-size:13px;")}>You'll know who's running your account, and they'll know your brand, your formulas, and your goals.</p></div>
            </li>
            <li style={sx("display:flex;gap:16px;padding:16px 0;border-bottom:1px solid hsl(var(--border));")}>
              <div style={sx("flex-shrink:0;width:32px;height:32px;border-radius:50%;background:hsl(var(--ally-orange)/.15);color:hsl(var(--ally-navy));display:flex;align-items:center;justify-content:center;font-weight:700;")}>✓</div>
              <div><h4 style={sx("font-size:14.5px;color:hsl(var(--ally-navy));margin-bottom:4px;")}>Real timelines, held</h4><p style={sx("font-size:13px;")}>We quote what we can ship. If something changes, you'll hear from us before it's a problem on your end.</p></div>
            </li>
            <li style={sx("display:flex;gap:16px;padding:16px 0;border-bottom:1px solid hsl(var(--border));")}>
              <div style={sx("flex-shrink:0;width:32px;height:32px;border-radius:50%;background:hsl(var(--ally-orange)/.15);color:hsl(var(--ally-navy));display:flex;align-items:center;justify-content:center;font-weight:700;")}>✓</div>
              <div><h4 style={sx("font-size:14.5px;color:hsl(var(--ally-navy));margin-bottom:4px;")}>Transparent pricing</h4><p style={sx("font-size:13px;")}>No hidden fees, no surprise charges. The number on your quote is the number on your invoice.</p></div>
            </li>
            <li style={sx("display:flex;gap:16px;padding:16px 0;")}>
              <div style={sx("flex-shrink:0;width:32px;height:32px;border-radius:50%;background:hsl(var(--ally-orange)/.15);color:hsl(var(--ally-navy));display:flex;align-items:center;justify-content:center;font-weight:700;")}>✓</div>
              <div><h4 style={sx("font-size:14.5px;color:hsl(var(--ally-navy));margin-bottom:4px;")}>Documents ready</h4><p style={sx("font-size:13px;")}>COA, batch records, FDA registration, and audit reports — pulled and sent within one business day.</p></div>
            </li>
          </ul>
          <div style={sx("background:hsl(var(--ally-navy));border-radius:var(--radius-lg);padding:36px 32px;color:#fff;")}>
            <h3 style={sx('color:#fff;margin-bottom:14px;')}>
              Built to be your <span style={sx('color:hsl(var(--ally-orange));')}>ally</span> — not just your manufacturer.
            </h3>
            <p style={sx('margin-bottom:22px;')}>Every brand we work with becomes part of the Ally Nutra family. We invest in your success because your success is ours.</p>
            <ul style={sx('list-style:none;')}>
              <li style={sx("padding:10px 0;border-bottom:1px solid hsl(0 0% 100% / .1);font-size:13.5px;")}><span style={sx('color:hsl(var(--ally-orange));margin-right:8px;')}>→</span>Same-day quote follow-ups</li>
              <li style={sx("padding:10px 0;border-bottom:1px solid hsl(0 0% 100% / .1);font-size:13.5px;")}><span style={sx('color:hsl(var(--ally-orange));margin-right:8px;')}>→</span>Free samples on approved formulas</li>
              <li style={sx("padding:10px 0;font-size:13.5px;")}><span style={sx('color:hsl(var(--ally-orange));margin-right:8px;')}>→</span>Direct-to-FBA shipping included</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-alt" style={sx('text-align:center;')}>
        <div className="container">
          <h2 style={sx('margin-bottom:16px;')}>Let's build something.</h2>
          <p style={sx("max-width:560px;margin:0 auto 24px;")}>
            If you're tired of being passed around, ghosted on quotes, or watching launches slip —
            let's talk. Real timelines, real pricing, real partnership.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">Start the conversation →</Link>
        </div>
      </section>
    </section>
  );
}
