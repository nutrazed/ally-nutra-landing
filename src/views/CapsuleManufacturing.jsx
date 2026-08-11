import { Link } from 'react-router-dom';
import { sx } from '../lib/styleString.js';
import { hideAndTint } from '../lib/imgFallback.js';
import { scrollToId } from '../lib/scrollToId.js';

import capsule01 from '../assets/images/capsule-01.jpg';
import capsule02 from '../assets/images/capsule-02.jpg';

export default function CapsuleManufacturing() {
  return (
    <section aria-labelledby="capmfg-h1">
      <section className="hero on-navy">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow on-dark">Capsule manufacturing</span>
            <h1 id="capmfg-h1" style={sx('margin-top:14px;')}>Precision encapsulation, at every scale.</h1>
            <p style={sx("color:hsl(0 0% 100% / .78);margin:18px 0 0;max-width:520px;")}>
              Two-piece hard-shell capsule manufacturing with industry-leading consistency.
              Vegetarian and gelatin shells, sizes 000 to 3, single-fill or multi-ingredient
              blends — all under one cGMP-certified roof.
            </p>
            <div className="hero-ctas">
              <Link to="/contact" className="btn btn-primary btn-lg">Get a capsule quote →</Link>
              <a href="#cap-types" className="btn btn-outline-invert btn-lg" onClick={scrollToId('cap-types')}>
                Explore options
              </a>
            </div>
          </div>
          <div className="svc-stats">
            <div className="svc-stat"><div className="svc-stat-num">2M+</div><div className="svc-stat-label">Capsules / day</div></div>
            <div className="svc-stat"><div className="svc-stat-num">±2%</div><div className="svc-stat-label">Fill tolerance</div></div>
            <div className="svc-stat"><div className="svc-stat-num">100%</div><div className="svc-stat-label">Optical inspection</div></div>
            <div className="svc-stat"><div className="svc-stat-num">2,500</div><div className="svc-stat-label">Min. order qty</div></div>
          </div>
        </div>
      </section>

      <section className="section" id="cap-types">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Capsule types</span>
            <h2>Vegetarian or gelatin — your call</h2>
            <p className="lede">Two trusted shell technologies, each with their own strengths. Choose based on your formula, audience, and the certifications you need to carry.</p>
          </div>
          <div className="grid grid-2">
            <div className="card">
              <h3 style={sx('margin-bottom:14px;')}>Vegetarian (HPMC)</h3>
              <p style={sx('margin-bottom:16px;')}>Plant-based hypromellose shells. Perfect for vegan, vegetarian, halal, and kosher product lines.</p>
              <ul className="svc-spec-list">
                <li><span className="lbl">Material</span><span className="val">HPMC (plant cellulose)</span></li>
                <li><span className="lbl">Vegan</span><span className="val">Yes</span></li>
                <li><span className="lbl">Halal / kosher</span><span className="val">Both available</span></li>
                <li><span className="lbl">Heat stable</span><span className="val">Yes</span></li>
                <li><span className="lbl">Best for</span><span className="val">Plant-based brands</span></li>
              </ul>
            </div>
            <div className="card">
              <h3 style={sx('margin-bottom:14px;')}>Gelatin (bovine)</h3>
              <p style={sx('margin-bottom:16px;')}>Industry-standard gelatin shells. Cost-effective, excellent dissolution, and proven performance.</p>
              <ul className="svc-spec-list">
                <li><span className="lbl">Material</span><span className="val">Bovine gelatin</span></li>
                <li><span className="lbl">Cost efficiency</span><span className="val">Best value</span></li>
                <li><span className="lbl">Dissolution</span><span className="val">~10 minutes</span></li>
                <li><span className="lbl">Color options</span><span className="val">20+ colors</span></li>
                <li><span className="lbl">Best for</span><span className="val">Mainstream brands</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Capsule sizes</span>
            <h2>From 000 to 3 — all sizes available</h2>
            <p className="lede">Pick the right fill volume for your formula. Smaller is easier to swallow; larger fits more active ingredient per capsule.</p>
          </div>
          <div className="svc-table on-light" style={sx('max-width:880px;margin:0 auto;')}>
            <div className="svc-table-row head" style={sx('grid-template-columns:1fr 1fr 1.6fr 1fr;')}><div>Size</div><div>Fill capacity</div><div>Common use</div><div>Length</div></div>
            <div className="svc-table-row" style={sx('grid-template-columns:1fr 1fr 1.6fr 1fr;')}><div className="product">000</div><div>1,000 mg</div><div>High-dose herbal blends</div><div>26.1 mm</div></div>
            <div className="svc-table-row" style={sx('grid-template-columns:1fr 1fr 1.6fr 1fr;')}><div className="product">00</div><div>735 mg</div><div>Most common — supplements, vitamins</div><div>23.3 mm</div></div>
            <div className="svc-table-row" style={sx('grid-template-columns:1fr 1fr 1.6fr 1fr;')}><div className="product">0</div><div>500 mg</div><div>Vitamins, mineral blends</div><div>21.7 mm</div></div>
            <div className="svc-table-row" style={sx('grid-template-columns:1fr 1fr 1.6fr 1fr;')}><div className="product">1</div><div>400 mg</div><div>Pediatric &amp; smaller doses</div><div>19.4 mm</div></div>
            <div className="svc-table-row" style={sx('grid-template-columns:1fr 1fr 1.6fr 1fr;')}><div className="product">2</div><div>300 mg</div><div>Concentrated extracts</div><div>18.0 mm</div></div>
            <div className="svc-table-row" style={sx('grid-template-columns:1fr 1fr 1.6fr 1fr;')}><div className="product">3</div><div>200 mg</div><div>Premium/single-ingredient SKUs</div><div>15.9 mm</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Fill capabilities</span>
            <h2>Every fill type, under one roof</h2>
            <p className="lede">Powder, pellet, liquid, or multi-component — our encapsulation lines handle the full range of modern supplement formulations.</p>
          </div>
          <div className="grid grid-3">
            <div className="svc-num-card"><span className="num">Powder fill</span><h3>Powder fill</h3><p>Standard dry powder encapsulation — single ingredients or complex multi-ingredient blends with precision dosing.</p></div>
            <div className="svc-num-card"><span className="num">Pellet &amp; bead fill</span><h3>Pellet &amp; bead fill</h3><p>Time-release, enteric-coated, or multi-actives that need to be physically separated within the same capsule.</p></div>
            <div className="svc-num-card"><span className="num">Liquid &amp; oil fill</span><h3>Liquid &amp; oil fill</h3><p>Liquid-filled hard capsules for oils, MCTs, lipid-based actives — sealed and leak-proof for shelf stability.</p></div>
            <div className="svc-num-card"><span className="num">Multi-component</span><h3>Multi-component</h3><p>Capsule-in-capsule and tablet-in-capsule for combining incompatible actives or staged release.</p></div>
            <div className="svc-num-card"><span className="num">Custom blending</span><h3>Custom blending</h3><p>In-house V-blenders and ribbon blenders for homogenous mixing of even the trickiest active loads.</p></div>
            <div className="svc-num-card"><span className="num">Polish &amp; inspect</span><h3>Polish &amp; inspect</h3><p>Every batch polished, deduster-cleaned, and 100% optical-inspected before bottling.</p></div>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="grid grid-2">
            <div>
              <div className="photo ratio-4x3">
                <img
                  style={sx("filter:saturate(.87) sepia(.08);")}
                  src={capsule01}
                  width="1400"
                  height="1050"
                  alt="A dense pile of assorted two-piece capsules in bright colors"
                  loading="lazy"
                  decoding="async"
                  onError={hideAndTint}
                />
              </div>
              <p style={sx("margin-top:12px;font-size:13px;color:hsl(var(--muted-foreground));text-align:center;")}>Encapsulated and ready for the next stage.</p>
            </div>
            <div>
              <div className="photo ratio-4x3">
                <img
                  style={sx("filter:saturate(.87) sepia(.08);")}
                  src={capsule02}
                  width="1400"
                  height="1050"
                  alt="Tablets tumbling into a rotating polishing pan from a feeder chute"
                  loading="lazy"
                  decoding="async"
                  onError={hideAndTint}
                />
              </div>
              <p style={sx("margin-top:12px;font-size:13px;color:hsl(var(--muted-foreground));text-align:center;")}>Polish &amp; inspect — deduster-cleaned before bottling.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-navy">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow on-dark" style={sx('justify-content:center;')}>Process</span>
            <h2>From powder to polished capsule</h2>
            <p style={sx("color:hsl(0 0% 100% / .78);max-width:640px;margin:0 auto;")}>A four-stage encapsulation flow with full traceability at every step.</p>
          </div>
          <div className="grid grid-4">
            <div className="card stack-center" style={sx("background:hsl(0 0% 100% / .05);border-color:hsl(0 0% 100% / .12);")}>
              <div style={sx("width:44px;height:44px;border-radius:50%;background:hsl(var(--ally-orange));color:hsl(var(--ally-navy));display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;margin-bottom:14px;")}>01</div>
              <h4 style={sx("font-size:15px;color:#fff;margin-bottom:8px;")}>Blend</h4>
              <p style={sx("font-size:13px;color:hsl(0 0% 100% / .65);")}>Active ingredients and excipients homogenized in a V-blender or ribbon mixer.</p>
            </div>
            <div className="card stack-center" style={sx("background:hsl(0 0% 100% / .05);border-color:hsl(0 0% 100% / .12);")}>
              <div style={sx("width:44px;height:44px;border-radius:50%;background:hsl(var(--ally-orange));color:hsl(var(--ally-navy));display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;margin-bottom:14px;")}>02</div>
              <h4 style={sx("font-size:15px;color:#fff;margin-bottom:8px;")}>Encapsulate</h4>
              <p style={sx("font-size:13px;color:hsl(0 0% 100% / .65);")}>Precision tamp-pin filling at controlled humidity and temperature.</p>
            </div>
            <div className="card stack-center" style={sx("background:hsl(0 0% 100% / .05);border-color:hsl(0 0% 100% / .12);")}>
              <div style={sx("width:44px;height:44px;border-radius:50%;background:hsl(var(--ally-orange));color:hsl(var(--ally-navy));display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;margin-bottom:14px;")}>03</div>
              <h4 style={sx("font-size:15px;color:#fff;margin-bottom:8px;")}>Polish &amp; inspect</h4>
              <p style={sx("font-size:13px;color:hsl(0 0% 100% / .65);")}>Capsules deduster-cleaned, polished, and 100% optically inspected.</p>
            </div>
            <div className="card stack-center" style={sx("background:hsl(0 0% 100% / .05);border-color:hsl(0 0% 100% / .12);")}>
              <div style={sx("width:44px;height:44px;border-radius:50%;background:hsl(var(--ally-orange));color:hsl(var(--ally-navy));display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;margin-bottom:14px;")}>04</div>
              <h4 style={sx("font-size:15px;color:#fff;margin-bottom:8px;")}>Bottle &amp; pack</h4>
              <p style={sx("font-size:13px;color:hsl(0 0% 100% / .65);")}>Counted, sealed, labeled, and master-cartoned to your spec.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Packaging options</span>
            <h2>Bottled, blistered, or bulk</h2>
            <p className="lede">Whatever the format — we ship finished, retail-ready product to your warehouse, 3PL, or FBA.</p>
          </div>
          <div className="grid grid-4">
            <div className="card stack-center"><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Bottles</h4><p style={sx("font-size:12.5px;")}>PET, HDPE, or amber glass bottles. Induction-sealed with tamper-evident shrink bands.</p></div>
            <div className="card stack-center"><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Blister packs</h4><p style={sx("font-size:12.5px;")}>Aluminum-PVC blisters for daily-dose, travel, or trial-sized SKUs.</p></div>
            <div className="card stack-center"><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Pouches &amp; sachets</h4><p style={sx("font-size:12.5px;")}>Stand-up pouches and single-serve sachets for travel and trial sizes.</p></div>
            <div className="card stack-center"><h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Bulk pack</h4><p style={sx("font-size:12.5px;")}>Bulk drums or food-grade liners for B2B re-packers and clinical buyers.</p></div>
          </div>
        </div>
      </section>

      <section className="section-navy" style={sx('text-align:center;')}>
        <div className="container">
          <h2 style={sx('max-width:640px;margin:0 auto 24px;')}>
            Ready to <em style={sx('font-style:italic;color:hsl(var(--ally-orange));')}>manufacture</em>?
          </h2>
          <p style={sx("color:hsl(0 0% 100% / .78);max-width:520px;margin:0 auto 24px;")}>
            Send us your formula or use ours. Capsule quotes returned in 5 business days with
            full transparency on cost, lead time, and MOQ.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">Get a capsule quote →</Link>
        </div>
      </section>
    </section>
  );
}
