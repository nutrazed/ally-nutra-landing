import { Link } from 'react-router-dom';
import { sx } from '../lib/styleString.js';
import { hideAndTint } from '../lib/imgFallback.js';

import services01 from '../assets/images/services-01.jpg';
import services02 from '../assets/images/services-02.jpg';
import services03 from '../assets/images/services-03.jpg';
import services04 from '../assets/images/services-04.jpg';

import rd01 from '../assets/images/rd-01.jpg';
import rd02 from '../assets/images/rd-02.jpg';
import rd03 from '../assets/images/rd-03.jpg';
import rd04 from '../assets/images/rd-04.jpg';

// Relocated from the home view (2026 conversion restructure) — expands on the
// "Custom formulation R&D" teaser in the Additional services grid below. See
// docs/PLAN.md for why this moved off Home.
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

export default function Services() {
  return (
    <section aria-labelledby="services-h1">
      <section className="hero on-navy">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow on-dark">Services · full capability index</span>
            <h1 id="services-h1" style={sx('margin-top:14px;')}>Every form. Every formula. One partner.</h1>
            <p style={sx("color:hsl(0 0% 100% / .78);margin:18px 0 0;max-width:480px;")}>
              From raw ingredient to retail-ready product — Ally Nutra manufactures capsules,
              sachets, stick packs, and pouches under one cGMP-certified roof. No handoffs. No
              surprises.
            </p>
            <div className="hero-ctas">
              <Link to="/contact" className="btn btn-primary btn-lg">Get a free quote →</Link>
              <Link to="/contact" className="btn btn-outline-light btn-lg">Schedule a call</Link>
            </div>
          </div>
          <div className="svc-index">
            <div className="svc-index-item" style={sx("border-bottom:1px solid hsl(0 0% 100% / .1);")}>
              <span className="mono-chip" style={sx("color:hsl(0 0% 100% / .25);")}>Service index</span>
            </div>
            <div className="svc-index-item"><span className="svc-index-num">01</span><span className="svc-index-name">Capsule manufacturing</span><span className="svc-index-tag">Solid dose</span></div>
            <div className="svc-index-item"><span className="svc-index-num">02</span><span className="svc-index-name">Sachet manufacturing</span><span className="svc-index-tag">Powder</span></div>
            <div className="svc-index-item"><span className="svc-index-num">03</span><span className="svc-index-name">Stick pack manufacturing</span><span className="svc-index-tag">On-the-go</span></div>
            <div className="svc-index-item"><span className="svc-index-num">04</span><span className="svc-index-name">Pouch / bag manufacturing</span><span className="svc-index-tag">Resealable</span></div>
            <div className="svc-index-item" style={sx('background:hsl(var(--ally-orange)/.06);')}>
              <span className="svc-index-num">+</span>
              <span className="svc-index-name" style={sx("color:hsl(0 0% 100% / .55);font-weight:500;")}>Custom formulation · private label · Amazon FBA</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header left">
            <span className="eyebrow">Manufacturing formats</span>
            <h2>Four delivery formats. One certified facility.</h2>
            <p>Choose the format that fits your product, your market, and your customer — we manufacture all four in-house.</p>
          </div>
          <div className="grid grid-4">
            <div className="format-card">
              <div className="photo ratio-4x3">
                <img src={services03} width="700" height="525" alt="Assorted capsules and tablets" loading="lazy" onError={hideAndTint} />
              </div>
              <div className="format-body">
                <div className="format-num">Format-01</div>
                <h3 style={sx("font-size:18px;margin-bottom:4px;")}>Capsules</h3>
                <p style={sx("font-size:12px;margin-bottom:14px;")}>Two-piece · liquid-fill · vegan or gelatin</p>
                <ul className="bullet-list" style={sx('margin-bottom:14px;')}>
                  <li>Size 000 through size 3</li>
                  <li>Vegan HPMC or bovine gelatin</li>
                  <li>MOQ from 2,500 units</li>
                </ul>
                <Link to="/contact" className="btn-ghost" style={sx('font-size:13px;')}>Get a capsule quote →</Link>
              </div>
            </div>
            <div className="format-card">
              <div className="photo ratio-4x3">
                <img style={sx("filter:saturate(.87) sepia(.08);")} src={services01} width="1400" height="1050" alt="Blank metallic foil sachet pouch, sealed and unbranded" loading="lazy" decoding="async" onError={hideAndTint} />
              </div>
              <div className="format-body">
                <div className="format-num">Format-02</div>
                <h3 style={sx("font-size:18px;margin-bottom:4px;")}>Sachets</h3>
                <p style={sx("font-size:12px;margin-bottom:14px;")}>Single-serve · foil-lined · custom print</p>
                <ul className="bullet-list" style={sx('margin-bottom:14px;')}>
                  <li>3g–30g fill weight range</li>
                  <li>Foil, kraft, or clear options</li>
                  <li>MOQ from 5,000 units</li>
                </ul>
                <Link to="/contact" className="btn-ghost" style={sx('font-size:13px;')}>Get a sachet quote →</Link>
              </div>
            </div>
            <div className="format-card">
              <div className="photo ratio-4x3">
                <img src={services04} width="700" height="525" alt="Close-up of assorted colorful capsules and tablets" loading="lazy" onError={hideAndTint} />
              </div>
              <div className="format-body">
                <div className="format-num">Format-03</div>
                <h3 style={sx("font-size:18px;margin-bottom:4px;")}>Stick packs</h3>
                <p style={sx("font-size:12px;margin-bottom:14px;")}>On-the-go · narrow format · easy-tear</p>
                <ul className="bullet-list" style={sx('margin-bottom:14px;')}>
                  <li>2g–15g fill weight</li>
                  <li>Easy-tear perforation standard</li>
                  <li>MOQ from 10,000 units</li>
                </ul>
                <Link to="/contact" className="btn-ghost" style={sx('font-size:13px;')}>Get a stick pack quote →</Link>
              </div>
            </div>
            <div className="format-card">
              <div className="photo ratio-4x3">
                <img style={sx("filter:saturate(.87) sepia(.08);")} src={services02} width="1400" height="1050" alt="A hand holding a blank green resealable stand-up pouch" loading="lazy" decoding="async" onError={hideAndTint} />
              </div>
              <div className="format-body">
                <div className="format-num">Format-04</div>
                <h3 style={sx("font-size:18px;margin-bottom:4px;")}>Pouches / bags</h3>
                <p style={sx("font-size:12px;margin-bottom:14px;")}>Resealable · stand-up · bulk or retail</p>
                <ul className="bullet-list" style={sx('margin-bottom:14px;')}>
                  <li>50g–5,000g fill weight</li>
                  <li>Zipper reseal standard</li>
                  <li>MOQ from 2,000 units</li>
                </ul>
                <Link to="/contact" className="btn-ghost" style={sx('font-size:13px;')}>Get a pouch quote →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-rule">
        <div className="container">
          <div className="section-header left">
            <span className="eyebrow">Additional services</span>
            <h2>Beyond the bottle.</h2>
            <p>Manufacturing is the core — but we support your brand across the full product lifecycle.</p>
          </div>
          <div className="grid grid-2">
            <div className="card" style={sx("border-left:3px solid hsl(var(--ally-orange));")}>
              <div className="mono-chip" style={sx("color:hsl(var(--ally-orange-ink));margin-bottom:10px;")}>SVC-01 · formulation</div>
              <h3 style={sx("margin-bottom:10px;")}>Custom formulation R&amp;D</h3>
              <p style={sx('margin-bottom:16px;')}>Bring us a concept or a competitor product — our PhD formulators design from scratch, optimizing for efficacy, cost, and shelf stability.</p>
              <ul className="bullet-list">
                <li>Ingredient compatibility testing</li>
                <li>Stability &amp; accelerated aging studies</li>
                <li>Full R&amp;D documentation package</li>
              </ul>
            </div>
            <div className="card" style={sx("border-left:3px solid hsl(var(--ally-orange));")}>
              <div className="mono-chip" style={sx("color:hsl(var(--ally-orange-ink));margin-bottom:10px;")}>SVC-02 · private label</div>
              <h3 style={sx("margin-bottom:10px;")}>Private label launch</h3>
              <p style={sx('margin-bottom:16px;')}>Skip the R&amp;D. Choose from our library of 200+ proven formulas, apply your brand, and go to market in as little as three weeks.</p>
              <ul className="bullet-list">
                <li>200+ ready-to-brand formulas</li>
                <li>Low MOQ — from 100 bottles per SKU</li>
                <li>COA included on every batch</li>
              </ul>
            </div>
            <div className="card" style={sx("border-left:3px solid hsl(var(--ally-orange));")}>
              <div className="mono-chip" style={sx("color:hsl(var(--ally-orange-ink));margin-bottom:10px;")}>SVC-03 · packaging</div>
              <h3 style={sx("margin-bottom:10px;")}>Packaging &amp; label design</h3>
              <p style={sx('margin-bottom:16px;')}>Full-service packaging from structural design through print-ready artwork — compliant, shelf-ready, and on-brand.</p>
              <ul className="bullet-list">
                <li>FDA supplement facts panel generation</li>
                <li>Print-ready artwork files</li>
                <li>Barcode &amp; lot code setup</li>
              </ul>
            </div>
            <div className="card" style={sx("border-left:3px solid hsl(var(--ally-orange));")}>
              <div className="mono-chip" style={sx("color:hsl(var(--ally-orange-ink));margin-bottom:10px;")}>SVC-04 · fulfillment</div>
              <h3 style={sx("margin-bottom:10px;")}>Amazon FBA preparation</h3>
              <p style={sx('margin-bottom:16px;')}>We prep, label, and bundle your finished product to Amazon's exact FBA specifications, so your inventory arrives ready to sell.</p>
              <ul className="bullet-list">
                <li>FNSKU labeling &amp; poly-bagging</li>
                <li>Multi-unit bundling &amp; kitting</li>
                <li>Direct-to-FC shipping available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>R&amp;D and innovation</span>
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

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Our process · rev A</span>
            <h2>No runaround. No shortcuts.</h2>
            <p>Four stages. One accountable team. Every decision documented.</p>
          </div>
          <div className="grid grid-4">
            <div className="card stack-center">
              <div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.35);margin-bottom:12px;")}>Week 0</div>
              <div style={sx("width:44px;height:44px;border-radius:50%;background:hsl(var(--ally-navy));color:hsl(var(--ally-orange));display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;margin-bottom:14px;")}>01</div>
              <h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:8px;")}>Submit your quote</h4>
              <p style={sx("font-size:13px;")}>Tell us your product, format, and volume. Get an estimate fast.</p>
            </div>
            <div className="card stack-center">
              <div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.35);margin-bottom:12px;")}>Week 1–2</div>
              <div style={sx("width:44px;height:44px;border-radius:50%;background:hsl(var(--ally-navy));color:hsl(var(--ally-orange));display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;margin-bottom:14px;")}>02</div>
              <h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:8px;")}>Review &amp; finalize</h4>
              <p style={sx("font-size:13px;")}>We nail down formula, pricing, and timeline. No surprises.</p>
            </div>
            <div className="card stack-center">
              <div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.35);margin-bottom:12px;")}>Week 2–6</div>
              <div style={sx("width:44px;height:44px;border-radius:50%;background:hsl(var(--ally-navy));color:hsl(var(--ally-orange));display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;margin-bottom:14px;")}>03</div>
              <h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:8px;")}>Production kicks off</h4>
              <p style={sx("font-size:13px;")}>Components arrive, blending begins. You get real-time updates.</p>
            </div>
            <div className="card stack-center">
              <div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.35);margin-bottom:12px;")}>Week 6–8</div>
              <div style={sx("width:44px;height:44px;border-radius:50%;background:hsl(var(--ally-orange));color:hsl(var(--ally-navy));display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;margin-bottom:14px;")}>04</div>
              <h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:8px;")}>QC check &amp; ship</h4>
              <p style={sx("font-size:13px;")}>Every batch tested. COA issued. Shipped to your door or FBA.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={sx('text-align:center;')}>
        <div className="container">
          <span className="eyebrow" style={sx('justify-content:center;')}>Ready to manufacture?</span>
          <h2 style={sx("margin:14px auto 20px;max-width:640px;")}>Capsules, sachets, stick packs, or pouches — we've got you covered.</h2>
          <div style={sx("display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:24px;")}>
            <span className="chip">NSF cGMP</span>
            <span className="chip">FDA compliant</span>
            <span className="chip">Fast turnaround</span>
            <span className="chip">COA guaranteed</span>
          </div>
          <Link to="/contact" className="btn btn-primary btn-lg">Get a free quote →</Link>
        </div>
      </section>
    </section>
  );
}
