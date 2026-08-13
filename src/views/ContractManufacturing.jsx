import { Link } from 'react-router-dom';
import { sx } from '../lib/styleString.js';
import { hideAndTint } from '../lib/imgFallback.js';
import { scrollToId } from '../lib/scrollToId.js';

import contract01 from '../assets/images/contract-01.jpg';
import contract02 from '../assets/images/contract-02.jpg';
import contract03 from '../assets/images/contract-03.jpg';

export default function ContractManufacturing() {
  return (
    <section aria-labelledby="cm-h1">
      <section className="hero on-navy">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow on-dark">Contract manufacturing</span>
            <h1 id="cm-h1" style={sx('margin-top:14px;')}>From formula to finished product — built to your brand.</h1>
            <p style={sx("color:hsl(0 0% 100% / .78);margin:18px 0 0;max-width:520px;")}>
              Full-service supplement manufacturing in Dover, Delaware. We handle formulation,
              blending, encapsulation, packaging, and Amazon FBA prep — so you focus on growing
              your brand.
            </p>
            <div className="hero-ctas">
              <Link to="/contact" className="btn btn-primary btn-lg">Get a quote in 5 minutes →</Link>
              <a href="#cm-capabilities" className="btn btn-outline-invert btn-lg" onClick={scrollToId('cm-capabilities')}>
                View capabilities
              </a>
            </div>
          </div>
          <div className="svc-stats">
            <div className="svc-stat"><div className="svc-stat-num">500+</div><div className="svc-stat-label">Brands served</div></div>
            <div className="svc-stat"><div className="svc-stat-num">cGMP</div><div className="svc-stat-label">Certified facility</div></div>
            <div className="svc-stat"><div className="svc-stat-num">2,500</div><div className="svc-stat-label">Min. order qty</div></div>
            <div className="svc-stat"><div className="svc-stat-num">4–6 wk</div><div className="svc-stat-label">Avg. lead time</div></div>
          </div>
        </div>
      </section>

      <section className="section" style={sx('padding-bottom:0;')}>
        <div className="container">
          <div className="photo ratio-16x9">
            <img
              style={sx("filter:saturate(.87) sepia(.08);")}
              src={contract03}
              width="1400"
              height="787"
              alt="Wide view of a cleanroom production floor with operators in protective coveralls"
              loading="lazy"
              decoding="async"
              onError={hideAndTint}
            />
          </div>
        </div>
      </section>

      <section className="section" id="cm-capabilities">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>What we do</span>
            <h2>End-to-end manufacturing capabilities</h2>
            <p className="lede">One partner. One quote. One accountable team — from raw ingredient sourcing to your fulfillment center.</p>
          </div>
          <div className="grid grid-4">
            <div className="svc-num-card"><span className="num">01 · Formulation</span><h3>Formulation</h3><p>Custom formulas built to your brief, or use one of our 200+ proven base formulas. R&amp;D team on-site.</p></div>
            <div className="svc-num-card"><span className="num">02 · Manufacturing</span><h3>Manufacturing</h3><p>cGMP-certified blending, encapsulation, and powder/liquid filling for sachets, stick packs, and pouches — all under one roof.</p></div>
            <div className="svc-num-card"><span className="num">03 · Packaging</span><h3>Packaging</h3><p>Bottles, sachets, stick packs, and pouches. Custom labels and shrink wrap included.</p></div>
            <div className="svc-num-card"><span className="num">04 · FBA prep</span><h3>FBA prep</h3><p>Amazon-ready cartons, FNSKU labeling, polybag, bundling — shipped directly to FBA centers.</p></div>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Our process</span>
            <h2>From first call to finished pallet</h2>
            <p className="lede">A transparent five-step process designed to get your product to market faster — without compromising quality.</p>
          </div>
          <div className="grid grid-3" style={sx('grid-template-columns:repeat(5,1fr);')}>
            <div className="card stack-center"><div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.35);margin-bottom:12px;")}>Step 1</div><div style={sx("width:44px;height:44px;border-radius:50%;background:hsl(var(--ally-navy));color:hsl(var(--ally-orange));display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;margin-bottom:14px;")}>01</div><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:8px;")}>Discovery</h4><p style={sx("font-size:13px;")}>Brief us on your product, formula, and target market.</p></div>
            <div className="card stack-center"><div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.35);margin-bottom:12px;")}>Step 2</div><div style={sx("width:44px;height:44px;border-radius:50%;background:hsl(var(--ally-navy));color:hsl(var(--ally-orange));display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;margin-bottom:14px;")}>02</div><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:8px;")}>Quote</h4><p style={sx("font-size:13px;")}>Receive transparent pricing within 5 business days.</p></div>
            <div className="card stack-center"><div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.35);margin-bottom:12px;")}>Step 3</div><div style={sx("width:44px;height:44px;border-radius:50%;background:hsl(var(--ally-navy));color:hsl(var(--ally-orange));display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;margin-bottom:14px;")}>03</div><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:8px;")}>Sample</h4><p style={sx("font-size:13px;")}>Approve formula and packaging via a free pilot batch.</p></div>
            <div className="card stack-center"><div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.35);margin-bottom:12px;")}>Step 4</div><div style={sx("width:44px;height:44px;border-radius:50%;background:hsl(var(--ally-navy));color:hsl(var(--ally-orange));display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;margin-bottom:14px;")}>04</div><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:8px;")}>Production</h4><p style={sx("font-size:13px;")}>Full QC testing at every stage, cGMP compliant.</p></div>
            <div className="card stack-center"><div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.35);margin-bottom:12px;")}>Step 5</div><div style={sx("width:44px;height:44px;border-radius:50%;background:hsl(var(--ally-orange));color:hsl(var(--ally-navy));display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;margin-bottom:14px;")}>05</div><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:8px;")}>Ship</h4><p style={sx("font-size:13px;")}>Direct to your warehouse, FBA, or 3PL of choice.</p></div>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Inside the line</span>
            <h2>A look at the floor.</h2>
            <p className="lede">Two of the core stages every batch passes through on its way from formula to finished product.</p>
          </div>
          <div className="grid grid-2">
            <div>
              <div className="photo ratio-4x3">
                <img
                  style={sx("filter:saturate(.87) sepia(.08);")}
                  src={contract01}
                  width="1400"
                  height="1050"
                  alt="Close-up of a stainless steel blending tank lid and fittings"
                  loading="lazy"
                  decoding="async"
                  onError={hideAndTint}
                />
              </div>
              <p style={sx("margin-top:12px;font-size:13px;color:hsl(var(--muted-foreground));text-align:center;")}>Blending — active ingredients and excipients homogenized before fill.</p>
            </div>
            <div>
              <div className="photo ratio-4x3">
                <img
                  style={sx("filter:saturate(.87) sepia(.08);")}
                  src={contract02}
                  width="1400"
                  height="1050"
                  alt="Rows of glass bottles moving through an automated packaging line"
                  loading="lazy"
                  decoding="async"
                  onError={hideAndTint}
                />
              </div>
              <p style={sx("margin-top:12px;font-size:13px;color:hsl(var(--muted-foreground));text-align:center;")}>Packaging — filled, sealed, and labeled on the line.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-navy">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow on-dark" style={sx('justify-content:center;')}>Minimum order quantities</span>
            <h2>MOQs that match your stage</h2>
            <p style={sx("color:hsl(0 0% 100% / .78);max-width:640px;margin:0 auto;")}>Whether you're launching your first SKU or scaling to retail, we have a tier for you.</p>
          </div>
          <div className="svc-table on-navy" style={sx('max-width:900px;margin:0 auto;')}>
            <div className="svc-table-row head" style={sx('grid-template-columns:2fr 1fr 1fr 1fr;')}><div>Product type</div><div>Starter</div><div>Growth</div><div>Scale</div></div>
            <div className="svc-table-row" style={sx('grid-template-columns:2fr 1fr 1fr 1fr;')}><div className="product">Capsules</div><div>2,500 units</div><div>10,000 units</div><div>50,000+</div></div>
            <div className="svc-table-row" style={sx('grid-template-columns:2fr 1fr 1fr 1fr;')}><div className="product">Sachets</div><div>5,000 units</div><div>20,000 units</div><div>50,000+</div></div>
            <div className="svc-table-row" style={sx('grid-template-columns:2fr 1fr 1fr 1fr;')}><div className="product">Stick packs</div><div>10,000 units</div><div>25,000 units</div><div>50,000+</div></div>
            <div className="svc-table-row" style={sx('grid-template-columns:2fr 1fr 1fr 1fr;')}><div className="product">Pouches</div><div>2,000 units</div><div>10,000 units</div><div>50,000+</div></div>
          </div>
          <p style={sx("text-align:center;color:hsl(0 0% 100% / .6);font-size:13.5px;margin-top:24px;")}>
            Looking for the full format lineup?{' '}
            <Link to="/home" style={sx('color:hsl(var(--ally-orange));text-decoration:underline;')}>See all four formats we manufacture →</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={sx('max-width:760px;text-align:center;')}>
          <span className="eyebrow" style={sx('justify-content:center;')}>Quality &amp; compliance</span>
          <h2 style={sx('margin:14px 0 12px;')}>Built on a foundation of trust.</h2>
          <p style={sx('margin-bottom:24px;')}>
            cGMP certified, FDA registered, third-party audited annually, with a Certificate of
            Analysis on every batch — the same standards documented in full on our certifications
            page.
          </p>
          <Link to="/certifications" className="btn btn-outline">See our certifications →</Link>
        </div>
      </section>

      <section className="section-navy" style={sx('text-align:center;')}>
        <div className="container">
          <h2 style={sx('max-width:640px;margin:0 auto 24px;')}>
            Ready to build your <em style={sx('font-style:italic;color:hsl(var(--ally-orange));')}>product</em>?
          </h2>
          <Link to="/contact" className="btn btn-primary btn-lg">Start your quote →</Link>
        </div>
      </section>
    </section>
  );
}
