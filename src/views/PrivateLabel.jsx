import { Link } from 'react-router-dom';
import { sx } from '../lib/styleString.js';
import { hideAndTint } from '../lib/imgFallback.js';
import { scrollToId } from '../lib/scrollToId.js';

import privateLabel01 from '../assets/images/private-label-01.jpg';
import privateLabel02 from '../assets/images/private-label-02.jpg';
import privateLabel03 from '../assets/images/private-label-03.jpg';

const CATALOG = [
  { cat: 'Daily wellness', name: 'Multivitamin complex', moq: '100', unit: '60 caps' },
  { cat: 'Performance', name: 'Whey protein isolate', moq: '250', unit: '2 lb tub' },
  { cat: 'Beauty', name: 'Collagen peptides', moq: '100', unit: '30 servings' },
  { cat: 'Energy', name: 'B-complex energy', moq: '100', unit: '90 caps' },
  { cat: 'Immunity', name: 'Immune support+', moq: '100', unit: '60 caps' },
  { cat: 'Sleep', name: 'Melatonin + magnesium', moq: '100', unit: '60 caps' },
  { cat: 'Gut health', name: 'Probiotic 50B CFU', moq: '100', unit: '30 caps' },
  { cat: 'Heart health', name: 'Omega-3 fish oil', moq: '100', unit: '120 softgels' },
];

export default function PrivateLabel() {
  return (
    <section aria-labelledby="pl-h1">
      <section className="hero on-navy">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow on-dark">Private label supplements</span>
            <h1 id="pl-h1" style={sx('margin-top:14px;')}>Launch your own brand — without the wait.</h1>
            <p style={sx("color:hsl(0 0% 100% / .78);margin:18px 0 0;max-width:520px;")}>
              Skip the formulation phase. Choose from 200+ proven, ready-to-ship supplement
              formulas. Add your label, your brand, your story — and we handle the rest.
            </p>
            <div className="hero-ctas">
              <Link to="/contact" className="btn btn-primary btn-lg">Browse the catalog →</Link>
              <a href="#pl-how" className="btn btn-outline-invert btn-lg" onClick={scrollToId('pl-how')}>
                How it works
              </a>
            </div>
          </div>
          <div className="svc-stats">
            <div className="svc-stat"><div className="svc-stat-num">200+</div><div className="svc-stat-label">Ready formulas</div></div>
            <div className="svc-stat"><div className="svc-stat-num">100</div><div className="svc-stat-label">MOQ per SKU</div></div>
            <div className="svc-stat"><div className="svc-stat-num">4–6 wk</div><div className="svc-stat-label">Launch time</div></div>
            <div className="svc-stat"><div className="svc-stat-num">$0</div><div className="svc-stat-label">Formulation fee</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Why private label</span>
            <h2>Speed to market, without the risk</h2>
            <p className="lede">Private labeling lets you launch a real brand in weeks — not months — using formulas that are already tested, compliant, and ready to manufacture.</p>
          </div>
          <div className="grid grid-3">
            <div className="svc-num-card"><span className="num">Launch in 4–6 weeks</span><h3>Launch in 4–6 weeks</h3><p>Skip 3–6 months of formulation, R&amp;D, and stability testing. Our pre-formulated catalog is already approved and production-ready.</p></div>
            <div className="svc-num-card"><span className="num">Lower cost to launch</span><h3>Lower cost to launch</h3><p>No formulation fees. No R&amp;D charges. Lower MOQs starting at 100 bottles per SKU. Capital stays where it belongs — in your marketing.</p></div>
            <div className="svc-num-card"><span className="num">Pre-tested and compliant</span><h3>Pre-tested and compliant</h3><p>Every formula is batch-tested, FDA-compliant, and carries a Certificate of Analysis. Sell with confidence on Amazon, Shopify, or retail.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>A blank canvas</span>
            <h2>Every detail, ready for your label.</h2>
            <p className="lede">A blank label means a blank canvas — your brand goes on every bottle, carton, and case.</p>
          </div>
          <div className="grid grid-3">
            <div>
              <div className="photo ratio-4x3">
                <img style={sx("filter:saturate(.87) sepia(.08);")} src={privateLabel01} width="1400" height="1050" alt="Clear supplement bottle with a completely blank white label" loading="lazy" decoding="async" onError={hideAndTint} />
              </div>
            </div>
            <div>
              <div className="photo ratio-4x3">
                <img style={sx("filter:saturate(.87) sepia(.08);")} src={privateLabel02} width="1400" height="1050" alt="Amber supplement bottle with a blank label on a kitchen counter" loading="lazy" decoding="async" onError={hideAndTint} />
              </div>
            </div>
            <div>
              <div className="photo ratio-4x3">
                <img style={sx("filter:saturate(.87) sepia(.08);")} src={privateLabel03} width="1400" height="1050" alt="Wrapped pallets of cartons stacked on warehouse racking" loading="lazy" decoding="async" onError={hideAndTint} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Featured catalog</span>
            <h2>200+ ready-to-brand formulas</h2>
            <p className="lede">From everyday wellness to performance and beauty — choose from a deep catalog of pre-formulated supplements.</p>
          </div>
          <div className="grid grid-4">
            {CATALOG.map((item) => (
              <div className="svc-catalog-card" key={item.name}>
                <div className="svc-catalog-img"></div>
                <div className="svc-catalog-body">
                  <span className="svc-catalog-cat">{item.cat}</span>
                  <h4>{item.name}</h4>
                  <div className="svc-catalog-meta">
                    <span>MOQ <strong>{item.moq}</strong></span>
                    <span>{item.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={sx('text-align:center;margin-top:40px;')}>
            <Link to="/contact" className="btn btn-primary">Request full catalog (200+ SKUs) →</Link>
          </div>
        </div>
      </section>

      <section className="section" id="pl-how">
        <div className="container hero-grid">
          <ul className="bullet-list" style={sx('list-style:none;')}>
            <li style={sx("padding:16px 0;border-bottom:1px solid hsl(var(--border));")}><strong style={sx('color:hsl(var(--ally-navy));display:block;margin-bottom:4px;')}>1. Pick your formula</strong>Browse our 200+ SKU catalog and select the formulas that fit your brand positioning.</li>
            <li style={sx("padding:16px 0;border-bottom:1px solid hsl(var(--border));")}><strong style={sx('color:hsl(var(--ally-navy));display:block;margin-bottom:4px;')}>2. Send your label</strong>Upload your design or use our in-house design team for a small additional fee.</li>
            <li style={sx("padding:16px 0;border-bottom:1px solid hsl(var(--border));")}><strong style={sx('color:hsl(var(--ally-navy));display:block;margin-bottom:4px;')}>3. Choose packaging</strong>Bottles, pouches, or jars — match the format to your customer's expectations.</li>
            <li style={sx("padding:16px 0;border-bottom:1px solid hsl(var(--border));")}><strong style={sx('color:hsl(var(--ally-navy));display:block;margin-bottom:4px;')}>4. Approve &amp; produce</strong>We send a digital proof. Once approved, production starts and ships in 4–6 weeks.</li>
            <li style={sx('padding:16px 0;')}><strong style={sx('color:hsl(var(--ally-navy));display:block;margin-bottom:4px;')}>5. Ship anywhere</strong>Direct to your warehouse, 3PL, or Amazon FBA — fully labeled, sealed, and ready to sell.</li>
          </ul>
          <div>
            <span className="eyebrow" style={sx('justify-content:center;')}>How it works</span>
            <h2 style={sx('margin:14px 0 12px;')}>Your brand on every detail.</h2>
            <p>From the label to the bottle to the seal — every touchpoint customized to your brand identity.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Who we serve</span>
            <h2>Built for brands at every stage</h2>
            <p className="lede">Whether you're launching your first product or expanding a successful brand line, private label gets you to market faster.</p>
          </div>
          <div className="grid grid-4">
            <div className="card stack-center"><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Amazon sellers</h4><p style={sx("font-size:12.5px;")}>FBA-ready packaging, FNSKU labels, and compliant cartons shipped direct to fulfillment centers.</p></div>
            <div className="card stack-center"><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>D2C brands</h4><p style={sx("font-size:12.5px;")}>Beautiful unboxing experiences and premium packaging that converts on Shopify and direct-to-consumer.</p></div>
            <div className="card stack-center"><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Gyms &amp; coaches</h4><p style={sx("font-size:12.5px;")}>Branded protein, recovery, and performance lines with your name on the bottle and your story on the label.</p></div>
            <div className="card stack-center"><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Clinics &amp; practitioners</h4><p style={sx("font-size:12.5px;")}>Practitioner-grade supplements with your clinic branding — a new revenue line for your practice.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-rule">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Timeline</span>
            <h2>From order to shelf in weeks</h2>
            <p style={sx("max-width:640px;margin:0 auto;")}>A proven, transparent timeline so you can plan launches, marketing campaigns, and inventory with confidence.</p>
          </div>
          <div className="grid grid-4">
            <div className="svc-timeline-card"><div className="svc-timeline-week">Week 1</div><div className="svc-timeline-label">Onboarding</div><h4>Quote &amp; setup</h4><p>Formula selection, label upload, and PO confirmation.</p></div>
            <div className="svc-timeline-card"><div className="svc-timeline-week">Week 2</div><div className="svc-timeline-label">Design</div><h4>Proof approval</h4><p>Digital label proof reviewed and signed off by your team.</p></div>
            <div className="svc-timeline-card"><div className="svc-timeline-week">Week 3–5</div><div className="svc-timeline-label">Production</div><h4>Manufacturing</h4><p>Filling, labeling, sealing, and full QA testing.</p></div>
            <div className="svc-timeline-card"><div className="svc-timeline-week">Week 6</div><div className="svc-timeline-label">Logistics</div><h4>Ship to you</h4><p>Direct ship to warehouse, 3PL, or FBA — your choice.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Private label vs custom</span>
            <h2>Which path is right for you?</h2>
            <p className="lede">Both paths lead to a real brand. The difference is timeline, cost, and how custom you need to go.</p>
          </div>
          <div className="svc-compare">
            <div className="svc-compare-row head"><div></div><div className="featured">Private label</div><div>Custom formulation</div></div>
            <div className="svc-compare-row body"><div>Time to launch</div><div className="featured">4–6 weeks</div><div>3–6 months</div></div>
            <div className="svc-compare-row body"><div>Minimum order</div><div className="featured">100 bottles</div><div>2,500+ units</div></div>
            <div className="svc-compare-row body"><div>Formulation fees</div><div className="featured">None</div><div>$3,000–$15,000</div></div>
            <div className="svc-compare-row body"><div>Formula customization</div><div className="featured">Pick from catalog</div><div>Fully bespoke</div></div>
            <div className="svc-compare-row body"><div>Best for</div><div className="featured">Speed to market</div><div>Differentiated formulas</div></div>
          </div>
          <p style={sx("text-align:center;color:hsl(var(--muted-foreground));font-size:13.5px;margin-top:24px;")}>
            Have questions before you choose?{' '}
            <Link to="/faq" style={sx('color:hsl(var(--ally-navy));text-decoration:underline;')}>Browse our FAQ →</Link>
          </p>
        </div>
      </section>

      <section className="section section-navy" style={sx('text-align:center;')}>
        <div className="container">
          <h2 style={sx('max-width:640px;margin:0 auto 24px;')}>
            Ready to launch your <em style={sx('font-style:italic;color:hsl(var(--ally-orange));')}>brand</em>?
          </h2>
          <Link to="/contact" className="btn btn-primary btn-lg">Request the catalog →</Link>
        </div>
      </section>
    </section>
  );
}
