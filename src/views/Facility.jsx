import { Link } from 'react-router-dom';
import { sx } from '../lib/styleString.js';
import { hideAndTint, hideOnly } from '../lib/imgFallback.js';
import { scrollToId } from '../lib/scrollToId.js';

import facility05 from '../assets/images/facility-05.jpg';
import facility06 from '../assets/images/facility-06.jpg';
import facility07 from '../assets/images/facility-07.jpg';
import facility08 from '../assets/images/facility-08.jpg';
import facility09 from '../assets/images/facility-09.jpg';
import facility10 from '../assets/images/facility-10.jpg';
import facility11 from '../assets/images/facility-11.jpg';

export default function Facility() {
  return (
    <section aria-labelledby="facility-h1">
      <section className="hero on-navy">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow on-dark">Our facility</span>
            <h1 id="facility-h1" style={sx('color:#fff;margin-top:14px;')}>cGMP manufacturing in Dover, Delaware.</h1>
            <p style={sx("color:hsl(0 0% 100% / .78);margin:18px 0 0;max-width:480px;")}>
              A purpose-built supplement manufacturing facility designed for accuracy,
              traceability, and scale. Every batch made here is engineered to pass — for you, for
              the FDA, and for your customers.
            </p>
            <div className="hero-ctas">
              <Link to="/contact" className="btn btn-primary btn-lg">Request a tour →</Link>
              <a href="#facility-areas" className="btn btn-outline-light btn-lg" onClick={scrollToId('facility-areas')}>
                Explore the facility
              </a>
            </div>
          </div>
          <div className="photo ratio-4x3">
            <img src={facility07} width="1000" height="750" alt="Low-angle view of a glass-fronted commercial building exterior" loading="lazy" onError={hideAndTint} />
          </div>
        </div>
      </section>

      <section className="section-tight" style={sx('border-bottom:1px solid hsl(var(--border));')}>
        <div className="container simple-stats">
          <div className="simple-stat"><div className="num">50,000</div><div className="lbl">Sq ft facility</div></div>
          <div className="simple-stat"><div className="num">12+</div><div className="lbl">Production lines</div></div>
          <div className="simple-stat"><div className="num">2M+</div><div className="lbl">Units per day</div></div>
          <div className="simple-stat"><div className="num">100%</div><div className="lbl">Made in USA</div></div>
        </div>
      </section>

      <section className="section">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Facility overview</span>
            <h2 style={sx('margin:14px 0 16px;')}>Built for brands that take quality seriously.</h2>
            <p style={sx('margin-bottom:24px;')}>
              Our 50,000-square-foot manufacturing facility in Dover, Delaware was designed
              around one principle: every batch should be reproducible, traceable, and
              indistinguishable from the last. From climate-controlled raw material storage to
              ISO-class clean rooms, every space was engineered for cGMP compliance.
            </p>
            <ul className="bullet-list">
              <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Single-floor production layout — no cross-contamination risk</li>
              <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Dedicated allergen-segregated production lines</li>
              <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>On-site QC laboratory for in-process testing</li>
              <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Climate-controlled finished goods warehouse</li>
            </ul>
          </div>
          <div className="card" style={sx('padding:0;overflow:hidden;')}>
            <div className="grid" style={sx("grid-template-columns:1.2fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:1px;background:hsl(var(--border));")}>
              <div style={sx("grid-row:span 2;background:hsl(var(--ally-navy));color:hsl(var(--ally-orange));display:flex;align-items:center;justify-content:center;text-align:center;font-size:12px;font-weight:600;padding:16px;")}>Production floor</div>
              <div style={sx("background:hsl(var(--muted));display:flex;align-items:center;justify-content:center;text-align:center;font-size:12px;font-weight:600;color:hsl(var(--ally-navy));padding:16px;")}>QC lab</div>
              <div style={sx("background:hsl(var(--ally-orange)/.15);display:flex;align-items:center;justify-content:center;text-align:center;font-size:12px;font-weight:600;color:hsl(var(--ally-navy));padding:16px;")}>Raw storage</div>
              <div style={sx("background:hsl(var(--ally-orange)/.15);display:flex;align-items:center;justify-content:center;text-align:center;font-size:12px;font-weight:600;color:hsl(var(--ally-navy));padding:16px;")}>Packaging</div>
              <div style={sx("background:hsl(var(--muted));display:flex;align-items:center;justify-content:center;text-align:center;font-size:12px;font-weight:600;color:hsl(var(--ally-navy));padding:16px;")}>Finished goods</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="facility-areas">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Facility areas</span>
            <h2>A tour of where your product is made.</h2>
            <p>Six dedicated zones working together — each engineered for its role in turning your formula into a finished product.</p>
          </div>
          <div className="grid grid-3">
            <div className="area-card">
              <div className="photo ratio-4x3"><img src={facility07} width="700" height="525" alt="Low-angle view of a glass-fronted commercial building exterior" loading="lazy" onError={hideAndTint} /></div>
              <div className="area-body">
                <div className="area-tag">Receiving</div>
                <h3 style={sx("font-size:17px;margin-bottom:8px;")}>Raw material intake</h3>
                <p style={sx("font-size:13px;margin-bottom:12px;")}>Climate-controlled receiving dock with quarantine staging. Every shipment is sampled and tested before release to production.</p>
                <span className="chip">Quarantine bay</span> <span className="chip">COA verification</span>
              </div>
            </div>
            <div className="area-card">
              <div className="photo ratio-4x3"><img src={facility08} width="700" height="467" alt="Aerial view of warehouse pallet racking stocked with cartons" loading="lazy" onError={hideAndTint} /></div>
              <div className="area-body">
                <div className="area-tag">Storage</div>
                <h3 style={sx("font-size:17px;margin-bottom:8px;")}>Raw material warehouse</h3>
                <p style={sx("font-size:13px;margin-bottom:12px;")}>Temperature- and humidity-controlled storage with FIFO lot tracking and dedicated allergen segregation.</p>
                <span className="chip">Climate-controlled</span> <span className="chip">Lot tracked</span>
              </div>
            </div>
            <div className="area-card">
              <div className="photo ratio-4x3"><img src={facility09} width="700" height="466" alt="Technician working along a row of processing equipment" loading="lazy" onError={hideAndTint} /></div>
              <div className="area-body">
                <div className="area-tag">Production</div>
                <h3 style={sx("font-size:17px;margin-bottom:8px;")}>Blending &amp; manufacturing</h3>
                <p style={sx("font-size:13px;margin-bottom:12px;")}>High-shear V-blenders, ribbon mixers, encapsulators, tablet presses, and powder fillers — all under one roof.</p>
                <span className="chip">V-blender</span> <span className="chip">Encapsulator</span>
              </div>
            </div>
            <div className="area-card">
              <div className="photo ratio-4x3"><img src={facility10} width="700" height="466" alt="Three lab scientists in white coats working at a bench" loading="lazy" onError={hideAndTint} /></div>
              <div className="area-body">
                <div className="area-tag">Quality</div>
                <h3 style={sx("font-size:17px;margin-bottom:8px;")}>QC laboratory</h3>
                <p style={sx("font-size:13px;margin-bottom:12px;")}>On-site lab for in-process weight checks, dissolution testing, microbial screening, and finished goods release.</p>
                <span className="chip">In-process QC</span> <span className="chip">Micro testing</span>
              </div>
            </div>
            <div className="area-card">
              <div className="photo ratio-4x3"><img src={facility05} width="700" height="466" alt="A bottle moving under a filling funnel on an automated packaging line" loading="lazy" onError={hideAndTint} /></div>
              <div className="area-body">
                <div className="area-tag">Packaging</div>
                <h3 style={sx("font-size:17px;margin-bottom:8px;")}>Bottling &amp; packaging</h3>
                <p style={sx("font-size:13px;margin-bottom:12px;")}>Automated bottle filling, induction sealing, labeling, and shrink banding — plus sachet and stick pack lines.</p>
                <span className="chip">Auto-counter</span> <span className="chip">Induction seal</span>
              </div>
            </div>
            <div className="area-card">
              <div className="photo ratio-4x3"><img src={facility06} width="700" height="466" alt="A warehouse aisle lined with shrink-wrapped stacks of plain cartons" loading="lazy" onError={hideAndTint} /></div>
              <div className="area-body">
                <div className="area-tag">Logistics</div>
                <h3 style={sx("font-size:17px;margin-bottom:8px;")}>Finished goods &amp; shipping</h3>
                <p style={sx("font-size:13px;margin-bottom:12px;")}>Climate-controlled finished goods warehouse with a dedicated FBA prep zone, palletization, and direct ship lanes.</p>
                <span className="chip">FBA prep</span> <span className="chip">Direct ship</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Equipment</span>
            <h2>Industrial-grade machinery.</h2>
            <p>A mix of trusted Western and Asian equipment manufacturers — chosen for reliability, accuracy, and FDA-validated reproducibility.</p>
          </div>
          <div className="grid grid-2">
            <div className="equip-card">
              <div className="equip-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg></div>
              <div><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>V-blenders &amp; ribbon mixers</h4><p style={sx("font-size:13px;margin-bottom:10px;")}>Capacities from 50L to 1,500L for homogenous blending of even the trickiest active loads.</p><span className="equip-tag">50L–1,500L</span></div>
            </div>
            <div className="equip-card">
              <div className="equip-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="12" rx="10" ry="4" /></svg></div>
              <div><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Capsule encapsulators</h4><p style={sx("font-size:13px;margin-bottom:10px;")}>Tamping-pin filling machines, sizes 000–3, with in-process weight verification.</p><span className="equip-tag">2M+ caps/day</span></div>
            </div>
            <div className="equip-card">
              <div className="equip-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /></svg></div>
              <div><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Tablet presses</h4><p style={sx("font-size:13px;margin-bottom:10px;")}>Rotary presses for compressed tablets, chewables, and bilayer formats with custom tooling.</p><span className="equip-tag">Custom tooling</span></div>
            </div>
            <div className="equip-card">
              <div className="equip-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h18l-2 13H5L3 7z" /></svg></div>
              <div><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Powder filling lines</h4><p style={sx("font-size:13px;margin-bottom:10px;")}>Auger-fill and net-weight fillers for sachets, stick packs, and bulk tubs.</p><span className="equip-tag">Sachets · sticks · tubs</span></div>
            </div>
            <div className="equip-card">
              <div className="equip-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="2" width="12" height="20" rx="2" /></svg></div>
              <div><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Bottle counter &amp; filler</h4><p style={sx("font-size:13px;margin-bottom:10px;")}>Automated capsule and tablet counting with induction sealing and shrink banding.</p><span className="equip-tag">Auto-inspect</span></div>
            </div>
            <div className="equip-card">
              <div className="equip-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg></div>
              <div><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>QC lab instruments</h4><p style={sx("font-size:13px;margin-bottom:10px;")}>HPLC, dissolution testers, friability, hardness, microbial enumeration, and analytical balances.</p><span className="equip-tag">HPLC</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-rule">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Compliance &amp; clean rooms</span>
            <h2 style={sx('margin:14px 0 16px;')}>Built to pass every audit.</h2>
            <p style={sx('margin-bottom:20px;')}>
              cGMP from the ground up — from facility design through standard operating
              procedures, batch documentation, and ongoing audits.
            </p>
            <ul style={sx('list-style:none;')}>
              <li style={sx("padding:16px 0;border-bottom:1px solid hsl(var(--border));")}><h4 style={sx("color:hsl(var(--ally-orange-ink));font-size:15px;margin-bottom:6px;")}>Validated SOPs</h4><p style={sx("font-size:13px;")}>Every process documented in current Good Manufacturing Practice SOPs, reviewed annually.</p></li>
              <li style={sx("padding:16px 0;border-bottom:1px solid hsl(var(--border));")}><h4 style={sx("color:hsl(var(--ally-orange-ink));font-size:15px;margin-bottom:6px;")}>Batch records</h4><p style={sx("font-size:13px;")}>Every batch fully documented from raw material lot to finished goods release.</p></li>
              <li style={sx('padding:16px 0;')}><h4 style={sx("color:hsl(var(--ally-orange-ink));font-size:15px;margin-bottom:6px;")}>Annual third-party audits</h4><p style={sx("font-size:13px;")}>FDA registration plus annual NSF and independent cGMP audits — reports available on request.</p></li>
            </ul>
          </div>
          <div>
            <div className="photo ratio-4x3" style={sx('margin-bottom:16px;')}>
              <img src={facility11} width="800" height="600" alt="Close-up profile of a worker wearing clear safety goggles" loading="lazy" onError={hideOnly} />
            </div>
            <div style={sx("background:hsl(var(--muted));border:1px solid hsl(var(--border));border-radius:var(--radius-lg);padding:22px;")}>
              <div style={sx("display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid hsl(var(--border));font-size:13.5px;")}><span>Encapsulation suite</span><span style={sx("color:hsl(var(--ally-orange-ink));font-weight:700;font-family:var(--font-mono);font-size:12px;")}>ISO 8</span></div>
              <div style={sx("display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid hsl(var(--border));font-size:13.5px;")}><span>Powder blending</span><span style={sx("color:hsl(var(--ally-orange-ink));font-weight:700;font-family:var(--font-mono);font-size:12px;")}>ISO 8</span></div>
              <div style={sx("display:flex;justify-content:space-between;padding:10px 0;font-size:13.5px;")}><span>QC sampling booth</span><span style={sx("color:hsl(var(--ally-orange-ink));font-weight:700;font-family:var(--font-mono);font-size:12px;")}>ISO 7</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={sx('text-align:center;')}>
        <div className="container">
          <span className="eyebrow" style={sx('justify-content:center;')}>Visit us</span>
          <h2 style={sx("margin:14px auto 16px;max-width:600px;")}>Find us in Dover, Delaware.</h2>
          <p style={sx("max-width:560px;margin:0 auto 24px;")}>Full address, hours, and directions live on our contact page — along with a map and a form to schedule a walkthrough.</p>
          <Link to="/contact" className="btn btn-primary btn-lg">Go to contact →</Link>
        </div>
      </section>
    </section>
  );
}
