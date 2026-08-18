import { Link } from 'react-router-dom';
import { sx } from '../lib/styleString.js';
import { hideOnly } from '../lib/imgFallback.js';
import { scrollToId } from '../lib/scrollToId.js';

import cert01 from '../assets/images/cert-01.jpg';
import cert02 from '../assets/images/cert-02.jpg';

export default function Certifications() {
  return (
    <section aria-labelledby="cert-h1">
      <section className="hero on-navy">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow on-dark">Certifications &amp; compliance</span>
            <h1 id="cert-h1" style={sx('color:#fff;margin-top:14px;')}>Audited, verified, trusted.</h1>
            <p style={sx("color:hsl(0 0% 100% / .78);margin:18px 0 0;max-width:480px;")}>
              When buyers, retailers, and regulators ask for proof — we have it. Every
              certification we hold is third-party audited, current, and available for
              verification.
            </p>
            <div className="hero-ctas">
              <Link to="/contact" className="btn btn-primary btn-lg">Request documentation →</Link>
              <a href="#cert-grid" className="btn btn-outline-light btn-lg" onClick={scrollToId('cert-grid')}>
                View certifications
              </a>
            </div>
          </div>
          <div style={sx('position:relative;height:300px;')}>
            <div style={sx("position:absolute;width:180px;height:180px;top:20%;left:50%;transform:translate(-50%,-50%);border-radius:50%;background:hsl(var(--ally-orange));color:hsl(var(--ally-navy));display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:var(--font-slab);border:4px solid hsl(0 0% 100% / .3);")}>
              <span style={sx("font-size:9px;letter-spacing:0.15em;opacity:.75;")}>Certified</span>
              <span style={sx("font-size:32px;font-weight:600;")}>cGMP</span>
              <span style={sx("font-size:8px;letter-spacing:0.1em;opacity:.75;")}>21 CFR 111</span>
            </div>
            <div style={sx("position:absolute;width:110px;height:110px;top:0;left:6%;border-radius:50%;background:#fff;color:hsl(var(--ally-navy));display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:var(--font-slab);transform:rotate(-12deg);")}>
              <span style={sx("font-size:8px;opacity:.6;")}>FDA</span><span style={sx("font-size:18px;font-weight:600;")}>REG</span>
            </div>
            <div style={sx("position:absolute;width:100px;height:100px;bottom:2%;right:4%;border-radius:50%;background:hsl(var(--ally-navy));border:1px solid hsl(var(--ally-orange)/.4);color:hsl(var(--ally-orange));display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:var(--font-slab);transform:rotate(10deg);")}>
              <span style={sx("font-size:8px;opacity:.6;")}>NSF</span><span style={sx("font-size:16px;font-weight:600;")}>NSF</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight section-alt" style={sx('text-align:center;')}>
        <div className="container">
          <div style={sx("display:flex;justify-content:center;gap:36px;flex-wrap:wrap;align-items:center;")}>
            <span className="eyebrow" style={sx('justify-content:center;')}>Audited &amp; renewed annually</span>
            <div style={sx("display:flex;gap:26px;flex-wrap:wrap;")}>
              <strong style={sx("font-family:var(--font-slab);color:hsl(var(--ally-navy)/.7);")}>cGMP</strong>
              <strong style={sx("font-family:var(--font-slab);color:hsl(var(--ally-navy)/.7);")}>FDA</strong>
              <strong style={sx("font-family:var(--font-slab);color:hsl(var(--ally-navy)/.7);")}>NSF</strong>
              <strong style={sx("font-family:var(--font-slab);color:hsl(var(--ally-navy)/.7);")}>USDA organic</strong>
              <strong style={sx("font-family:var(--font-slab);color:hsl(var(--ally-navy)/.7);")}>Halal</strong>
              <strong style={sx("font-family:var(--font-slab);color:hsl(var(--ally-navy)/.7);")}>Kosher</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Why it matters</span>
            <h2>Certifications are more than stickers.</h2>
            <p>They're proof your product is real, your labels are honest, and your business is built on a foundation buyers and regulators can trust.</p>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <div style={sx("width:48px;height:48px;background:hsl(var(--ally-orange)/.14);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:hsl(var(--ally-navy));")}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h3 style={sx("font-size:17px;margin-bottom:8px;")}>Buyer confidence</h3>
              <p style={sx("font-size:13.5px;")}>Retailers like Amazon, Walmart, and major distributors require proof of cGMP and FDA registration. Our certifications open doors.</p>
            </div>
            <div className="card">
              <div style={sx("width:48px;height:48px;background:hsl(var(--ally-orange)/.14);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:hsl(var(--ally-navy));")}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4" /><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.49 0 4.74 1.01 6.36 2.64" /></svg>
              </div>
              <h3 style={sx("font-size:17px;margin-bottom:8px;")}>Regulatory defensibility</h3>
              <p style={sx("font-size:13.5px;")}>If a regulator audits your brand, our documentation is your defense — full batch records, COAs, and SOP audits.</p>
            </div>
            <div className="card">
              <div style={sx("width:48px;height:48px;background:hsl(var(--ally-orange)/.14);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:hsl(var(--ally-navy));")}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              </div>
              <h3 style={sx("font-size:17px;margin-bottom:8px;")}>Product integrity</h3>
              <p style={sx("font-size:13.5px;")}>Certifications mean every batch is tested, every claim is supported, and every label is what's actually inside.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="cert-grid">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Our certifications</span>
            <h2>Complete compliance portfolio.</h2>
            <p>Every certification listed here is current, third-party audited, and verifiable. Documentation is available on request for qualified buyers.</p>
          </div>
          <div className="grid grid-2">
            <div className="cert-card">
              <div className="cert-badge gold"><span className="b-top">Certified</span><span className="b-main">cGMP</span><span className="b-bot">21 CFR 111</span></div>
              <div>
                <h3 style={sx("font-size:18px;margin-bottom:4px;")}>cGMP certification</h3>
                <div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.5);margin-bottom:10px;")}>Third-party audited annually</div>
                <p style={sx("font-size:13.5px;")}>Current Good Manufacturing Practices certification under 21 CFR Part 111 — the FDA standard for dietary supplement manufacturing.</p>
                <div className="cert-meta"><span><strong>Status</strong>Active</span><span><strong>Renewed</strong>Annually</span></div>
              </div>
            </div>
            <div className="cert-card">
              <div className="cert-badge navy"><span className="b-top">U.S.</span><span className="b-main">FDA</span><span className="b-bot">Registered</span></div>
              <div>
                <h3 style={sx("font-size:18px;margin-bottom:4px;")}>FDA facility registration</h3>
                <div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.5);margin-bottom:10px;")}>U.S. Food &amp; Drug Administration</div>
                <p style={sx("font-size:13.5px;")}>Active FDA facility registration as a dietary supplement manufacturer, renewed biennially and in good standing for inspection any time.</p>
                <div className="cert-meta"><span><strong>Type</strong>Facility</span><span><strong>Renewal</strong>Biennial</span></div>
              </div>
            </div>
            <div className="cert-card">
              <div className="cert-badge gold"><span className="b-top">NSF</span><span className="b-main">NSF</span><span className="b-bot">Certified</span></div>
              <div>
                <h3 style={sx("font-size:18px;margin-bottom:4px;")}>NSF Certified for Sport®</h3>
                <div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.5);margin-bottom:10px;")}>NSF International</div>
                <p style={sx("font-size:13.5px;")}>Recognized banned-substance testing program required by major sports leagues — tested ingredients, batches, and final products.</p>
                <div className="cert-meta"><span><strong>Standard</strong>NSF/ANSI 173</span><span><strong>Audit</strong>Annual</span></div>
              </div>
            </div>
            <div className="cert-card">
              <div className="cert-badge navy"><span className="b-top">USDA</span><span className="b-main">ORG</span><span className="b-bot">Certified</span></div>
              <div>
                <h3 style={sx("font-size:18px;margin-bottom:4px;")}>USDA organic</h3>
                <div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.5);margin-bottom:10px;")}>USDA National Organic Program</div>
                <p style={sx("font-size:13.5px;")}>Certified to handle and manufacture USDA Organic dietary supplements, required for any product carrying the USDA Organic seal.</p>
                <div className="cert-meta"><span><strong>Type</strong>Handler/processor</span><span><strong>Audit</strong>Annual</span></div>
              </div>
            </div>
            <div className="cert-card">
              <div className="cert-badge gold"><span className="b-top">Halal</span><span className="b-main">حلال</span><span className="b-bot">Certified</span></div>
              <div>
                <h3 style={sx("font-size:18px;margin-bottom:4px;")}>Halal certification</h3>
                <div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.5);margin-bottom:10px;")}>Recognized halal authority</div>
                <p style={sx("font-size:13.5px;")}>Halal certification for ingredient sourcing and production processes, opening markets across MENA, Southeast Asia, and beyond.</p>
                <div className="cert-meta"><span><strong>Markets</strong>Global</span><span><strong>Audit</strong>Annual</span></div>
              </div>
            </div>
            <div className="cert-card">
              <div className="cert-badge navy"><span className="b-top">Kosher</span><span className="b-main">כשר</span><span className="b-bot">Certified</span></div>
              <div>
                <h3 style={sx("font-size:18px;margin-bottom:4px;")}>Kosher certification</h3>
                <div className="mono-chip" style={sx("color:hsl(var(--ally-navy)/.5);margin-bottom:10px;")}>Recognized kashrut authority</div>
                <p style={sx("font-size:13.5px;")}>Kosher-certified production capability for brands targeting Jewish consumer markets and kosher-compliant retailers.</p>
                <div className="cert-meta"><span><strong>Status</strong>Active</span><span><strong>Audit</strong>Annual</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">What you get</span>
            <h2 style={sx('margin:14px 0 16px;')}>Documentation you can send to buyers.</h2>
            <p style={sx('margin-bottom:24px;')}>Every order includes the documentation you need to defend your brand to customers, regulators, and retailers.</p>
            <ul style={sx('list-style:none;')}>
              <li style={sx("display:flex;gap:16px;padding:14px 0;border-bottom:1px solid hsl(var(--border));")}>
                <div style={sx("flex-shrink:0;width:34px;height:34px;border-radius:50%;background:hsl(var(--ally-navy));color:hsl(var(--ally-orange));display:flex;align-items:center;justify-content:center;font-family:var(--font-slab);font-weight:600;font-size:14px;")}>1</div>
                <div><h4 style={sx("font-size:14.5px;color:hsl(var(--ally-navy));margin-bottom:4px;")}>Certificate of analysis (COA)</h4><p style={sx("font-size:13px;")}>Every batch ships with a third-party verified COA detailing potency, purity, and contaminant testing.</p></div>
              </li>
              <li style={sx("display:flex;gap:16px;padding:14px 0;border-bottom:1px solid hsl(var(--border));")}>
                <div style={sx("flex-shrink:0;width:34px;height:34px;border-radius:50%;background:hsl(var(--ally-navy));color:hsl(var(--ally-orange));display:flex;align-items:center;justify-content:center;font-family:var(--font-slab);font-weight:600;font-size:14px;")}>2</div>
                <div><h4 style={sx("font-size:14.5px;color:hsl(var(--ally-navy));margin-bottom:4px;")}>Manufacturer statement</h4><p style={sx("font-size:13px;")}>Signed statement confirming production location, facility registration, and cGMP compliance.</p></div>
              </li>
              <li style={sx("display:flex;gap:16px;padding:14px 0;")}>
                <div style={sx("flex-shrink:0;width:34px;height:34px;border-radius:50%;background:hsl(var(--ally-navy));color:hsl(var(--ally-orange));display:flex;align-items:center;justify-content:center;font-family:var(--font-slab);font-weight:600;font-size:14px;")}>3</div>
                <div><h4 style={sx("font-size:14.5px;color:hsl(var(--ally-navy));margin-bottom:4px;")}>Batch records</h4><p style={sx("font-size:13px;")}>Lot-level documentation tracking every step from raw material receipt through finished goods release.</p></div>
              </li>
            </ul>
          </div>
          <div className="photo ratio-4x3">
            <img src={cert01} width="800" height="600" alt="Lab technician documenting results at a bench of analytical equipment" loading="lazy" onError={hideOnly} />
          </div>
        </div>
      </section>

      <section className="section section-rule">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Testing protocols</span>
            <h2>Every batch, every test.</h2>
            <p>Identity, potency, purity, microbial, and stability — all tested by ISO-accredited third-party labs before any product leaves our facility.</p>
          </div>
          <div className="grid grid-4" style={sx('margin-bottom:40px;')}>
            <div className="card" style={sx("padding:26px;text-align:center;")}>
              <div style={sx("width:44px;height:44px;background:hsl(var(--ally-orange)/.15);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;color:hsl(var(--ally-orange));")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
              </div>
              <h4 style={sx("color:hsl(var(--ally-navy));font-size:15px;margin-bottom:8px;")}>Identity testing</h4>
              <p style={sx("font-size:12.5px;")}>FTIR, HPLC, and DNA verification confirm what's on the label is what's in the bottle.</p>
            </div>
            <div className="card" style={sx("padding:26px;text-align:center;")}>
              <div style={sx("width:44px;height:44px;background:hsl(var(--ally-orange)/.15);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;color:hsl(var(--ally-orange));")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-5" /></svg>
              </div>
              <h4 style={sx("color:hsl(var(--ally-navy));font-size:15px;margin-bottom:8px;")}>Potency testing</h4>
              <p style={sx("font-size:12.5px;")}>Quantitative analysis confirms each active ingredient hits its labeled dose.</p>
            </div>
            <div className="card" style={sx("padding:26px;text-align:center;")}>
              <div style={sx("width:44px;height:44px;background:hsl(var(--ally-orange)/.15);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;color:hsl(var(--ally-orange));")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
              </div>
              <h4 style={sx("color:hsl(var(--ally-navy));font-size:15px;margin-bottom:8px;")}>Purity testing</h4>
              <p style={sx("font-size:12.5px;")}>Heavy metals, pesticides, residual solvents, and contaminant screens at parts-per-billion sensitivity.</p>
            </div>
            <div className="card" style={sx("padding:26px;text-align:center;")}>
              <div style={sx("width:44px;height:44px;background:hsl(var(--ally-orange)/.15);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;color:hsl(var(--ally-orange));")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="12" cy="14" r="3" /></svg>
              </div>
              <h4 style={sx("color:hsl(var(--ally-navy));font-size:15px;margin-bottom:8px;")}>Microbial testing</h4>
              <p style={sx("font-size:12.5px;")}>Total plate count, yeast/mold, E. coli, salmonella, and pathogen screens on every batch.</p>
            </div>
          </div>
          <div className="photo ratio-16x9" style={sx('max-width:900px;margin:0 auto;')}>
            <img src={cert02} width="1200" height="675" alt="Close-up of a laboratory microscope objective lens" loading="lazy" onError={hideOnly} />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Our audit process</span>
            <h2>How we stay certified.</h2>
            <p>Certifications are only as good as their renewals. Here's how we keep ours current — every single year.</p>
          </div>
          <div className="grid grid-4">
            <div className="stack-center">
              <div style={sx("width:56px;height:56px;border-radius:50%;background:#fff;color:hsl(var(--ally-orange));font-family:var(--font-slab);font-size:22px;font-weight:600;display:flex;align-items:center;justify-content:center;margin-bottom:16px;border:3px solid hsl(var(--ally-orange));")}>1</div>
              <h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Self-audit</h4>
              <p style={sx("font-size:13px;")}>Internal quality team reviews SOPs and the facility quarterly.</p>
            </div>
            <div className="stack-center">
              <div style={sx("width:56px;height:56px;border-radius:50%;background:#fff;color:hsl(var(--ally-orange));font-family:var(--font-slab);font-size:22px;font-weight:600;display:flex;align-items:center;justify-content:center;margin-bottom:16px;border:3px solid hsl(var(--ally-orange));")}>2</div>
              <h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Third-party inspection</h4>
              <p style={sx("font-size:13px;")}>Independent auditors conduct on-site inspections annually.</p>
            </div>
            <div className="stack-center">
              <div style={sx("width:56px;height:56px;border-radius:50%;background:#fff;color:hsl(var(--ally-orange));font-family:var(--font-slab);font-size:22px;font-weight:600;display:flex;align-items:center;justify-content:center;margin-bottom:16px;border:3px solid hsl(var(--ally-orange));")}>3</div>
              <h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Corrective action</h4>
              <p style={sx("font-size:13px;")}>Any findings are addressed within documented CAPA timelines.</p>
            </div>
            <div className="stack-center">
              <div style={sx("width:56px;height:56px;border-radius:50%;background:#fff;color:hsl(var(--ally-orange));font-family:var(--font-slab);font-size:22px;font-weight:600;display:flex;align-items:center;justify-content:center;margin-bottom:16px;border:3px solid hsl(var(--ally-orange));")}>4</div>
              <h4 style={sx("font-size:15px;color:hsl(var(--ally-navy));margin-bottom:6px;")}>Recertification</h4>
              <p style={sx("font-size:13px;")}>Certificates are renewed and made available to clients.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={sx('text-align:center;')}>
        <div className="container">
          <span className="eyebrow" style={sx('justify-content:center;')}>Documentation library</span>
          <h2 style={sx("margin:14px auto 16px;max-width:560px;")}>Need documentation now?</h2>
          <p style={sx("max-width:560px;margin:0 auto 24px;")}>
            If you're closing a buyer, listing on Amazon, or responding to a regulator — we'll get
            you what you need within one business day. cGMP certificate, FDA registration letter,
            COA, liability insurance, allergen statement, and country-of-origin documentation are
            all on file.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">Request documentation →</Link>
        </div>
      </section>
    </section>
  );
}
