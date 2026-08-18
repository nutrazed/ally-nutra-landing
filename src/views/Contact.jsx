import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sx } from '../lib/styleString.js';
import { scrollToId } from '../lib/scrollToId.js';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  // PROTOTYPE — this form is not wired to a backend. Submitting renders the success
  // state below (so the design can be demonstrated) instead of an alert(), but no
  // data is transmitted anywhere. See README.md ("Prototype status") before wiring
  // this up for real — the visible notice in the success state must come out only
  // once there is an actual endpoint behind it.
  function handleSubmit(e) {
    e.preventDefault();
    console.warn('[prototype] Contact form submitted — no data was transmitted. Production wiring pending.');
    setSubmitted(true);
  }

  return (
    <section aria-labelledby="contact-h1">
      <section className="hero on-navy" style={sx('text-align:center;')}>
        <div className="container">
          <span className="eyebrow on-dark" style={sx('justify-content:center;')}>Get in touch</span>
          <h1 id="contact-h1" style={sx("color:#fff;margin:14px auto 16px;max-width:640px;")}>Let's build something together.</h1>
          <p style={sx("color:hsl(0 0% 100% / .78);max-width:520px;margin:0 auto 32px;")}>
            Quote in five business days. Real timelines. Real pricing. Real human beings on the
            other end of the line.
          </p>
          <div className="grid grid-3" style={sx('max-width:900px;margin:0 auto;')}>
            <a href="tel:+18887205888" className="quick-tile">
              <div className="q-label">Call</div><div className="q-value">(888) 720-5888</div><div className="q-sub">Mon–Fri · 8 AM–6 PM EST</div>
            </a>
            <a href="mailto:hello@allynutra.com" className="quick-tile">
              <div className="q-label">Email</div><div className="q-value">hello@allynutra.com</div><div className="q-sub">Response within 1 business day</div>
            </a>
            <a href="#contact-form" className="quick-tile" onClick={scrollToId('contact-form')}>
              <div className="q-label">Quote request</div><div className="q-value">5-minute form</div><div className="q-sub">Quote returned in 5 business days</div>
            </a>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="contact-form">
        <div className="container hero-grid" style={sx('align-items:start;')}>
          {submitted ? (
            <div className="card" style={sx('padding:40px;')} role="status">
              <div className="quote-success-icon" aria-hidden="true">✓</div>
              <h2 style={sx('margin:16px 0 10px;font-size:26px;')}>Quote request received.</h2>
              <p style={sx('margin-bottom:20px;')}>
                Thanks — we'll confirm receipt within 1 business day and follow up with a
                discovery call to scope your project.
              </p>
              <p className="quote-success-notice">
                Prototype — this form does not send. Production wiring pending.
              </p>
              <button
                type="button"
                className="btn btn-outline"
                style={sx('margin-top:20px;')}
                onClick={() => setSubmitted(false)}
              >
                ← Back to form
              </button>
            </div>
          ) : (
          <form className="card" style={sx('padding:40px;')} onSubmit={handleSubmit}>
            <span className="eyebrow">Quote request</span>
            <h2 style={sx('margin:12px 0 10px;font-size:28px;')}>Tell us about your project.</h2>
            <p style={sx('margin-bottom:28px;')}>
              The more detail you share, the faster we can return a transparent quote with
              timeline and cost. No commitment required — most quotes come back in 5 business
              days.
            </p>

            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="fname">First name <span className="req">*</span></label>
                <input id="fname" type="text" placeholder="Jane" required />
              </div>
              <div className="form-field">
                <label htmlFor="lname">Last name <span className="req">*</span></label>
                <input id="lname" type="text" placeholder="Doe" required />
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="email">Email address <span className="req">*</span></label>
                <input id="email" type="email" placeholder="jane@yourbrand.com" required />
              </div>
              <div className="form-field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" placeholder="(555) 123-4567" />
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="brand">Brand / company <span className="req">*</span></label>
                <input id="brand" type="text" placeholder="Your Brand, LLC" required />
              </div>
              <div className="form-field">
                <label htmlFor="website">Website</label>
                <input id="website" type="text" placeholder="yourbrand.com" />
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="service">Service interested in <span className="req">*</span></label>
                <select id="service" required defaultValue="">
                  <option value="">Select a service…</option>
                  <option>Contract manufacturing</option>
                  <option>Private label supplements</option>
                  <option>Capsule manufacturing</option>
                  <option>Sachets, stick packs, or pouches</option>
                  <option>Packaging &amp; FBA prep</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="volume">Estimated order volume</label>
                <select id="volume" defaultValue="">
                  <option value="">Select a range…</option>
                  <option>100–1,000 units</option>
                  <option>1,000–5,000 units</option>
                  <option>5,000–25,000 units</option>
                  <option>25,000+ units</option>
                  <option>Not sure yet</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="details">Tell us about your project <span className="req">*</span></label>
              <textarea
                id="details"
                placeholder="Briefly describe your product, formulation needs, packaging preferences, target launch date, and anything else we should know."
                required
              ></textarea>
            </div>
            <div style={sx("display:flex;gap:12px;align-items:flex-start;padding:14px;background:hsl(var(--muted));border-radius:var(--radius-md);border:1px solid hsl(var(--border));margin-bottom:20px;")}>
              <input type="checkbox" id="newsletter" style={sx('margin-top:3px;accent-color:hsl(var(--ally-orange));')} />
              <label htmlFor="newsletter" style={sx("font-size:12.5px;color:hsl(var(--muted-foreground));font-weight:400;")}>
                <strong style={sx('color:hsl(var(--ally-navy));')}>Keep me posted.</strong> Send
                occasional updates on new services and industry insights. Optional — we never
                spam.
              </label>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Submit quote request →</button>
            <p style={sx('text-align:center;font-size:12.5px;margin-top:14px;')}>By submitting, you agree to our privacy policy. We never share your information.</p>
          </form>
          )}

          <aside className="info-panel">
            <div className="eyebrow on-dark" style={sx('margin-bottom:14px;')}>What happens next</div>
            <h3>From form to quote in five business days.</h3>
            <p style={sx('margin-bottom:24px;')}>We don't believe in form black holes. Here's exactly what happens after you hit submit.</p>
            <ul className="info-list">
              <li><div className="info-num">1</div><div><strong>Within 1 business day</strong><p>We confirm receipt and assign a real account manager.</p></div></li>
              <li><div className="info-num">2</div><div><strong>Within 2 business days</strong><p>Discovery call — we ask the right questions to scope your project.</p></div></li>
              <li><div className="info-num">3</div><div><strong>Within 5 business days</strong><p>Transparent quote in your inbox — pricing, timeline, MOQs.</p></div></li>
              <li><div className="info-num">4</div><div><strong>Approve &amp; begin</strong><p>Once approved, production starts and ships in 4–6 weeks.</p></div></li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow" style={sx('justify-content:center;')}>Direct lines</span>
            <h2>Reach the right team faster.</h2>
            <p>Already a customer or have a specific need? Skip the form and reach out to the team handling what you're looking for.</p>
          </div>
          <div className="grid grid-3">
            <div className="dept-card">
              <div style={sx("width:44px;height:44px;background:hsl(var(--ally-orange)/.15);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:hsl(var(--ally-navy));")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18l-2 13H5L3 3z" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
              </div>
              <h3 style={sx("font-size:17px;margin-bottom:8px;")}>Sales &amp; new projects</h3>
              <p style={sx("font-size:13px;margin-bottom:16px;")}>New brands, new SKUs, formula scoping, and pricing inquiries.</p>
              <div style={sx("border-top:1px solid hsl(var(--border));padding-top:12px;font-size:13.5px;")}>
                <a href="mailto:sales@allynutra.com" style={sx('display:block;color:hsl(var(--ally-navy));font-weight:600;')}>sales@allynutra.com</a>
                <a href="tel:+18887205888" style={sx('display:block;color:hsl(var(--ally-navy));font-weight:600;margin-top:4px;')}>(888) 720-5888</a>
              </div>
            </div>
            <div className="dept-card">
              <div style={sx("width:44px;height:44px;background:hsl(var(--ally-orange)/.15);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:hsl(var(--ally-navy));")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" /><polyline points="9 11 9 7 15 7 15 11" /></svg>
              </div>
              <h3 style={sx("font-size:17px;margin-bottom:8px;")}>Customer success</h3>
              <p style={sx("font-size:13px;margin-bottom:16px;")}>Existing accounts: re-orders, status updates, and account questions.</p>
              <div style={sx("border-top:1px solid hsl(var(--border));padding-top:12px;font-size:13.5px;")}>
                <a href="mailto:success@allynutra.com" style={sx('display:block;color:hsl(var(--ally-navy));font-weight:600;')}>success@allynutra.com</a>
              </div>
            </div>
            <div className="dept-card">
              <div style={sx("width:44px;height:44px;background:hsl(var(--ally-orange)/.15);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:hsl(var(--ally-navy));")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4" /><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.49 0 4.74 1.01 6.36 2.64" /></svg>
              </div>
              <h3 style={sx("font-size:17px;margin-bottom:8px;")}>QC &amp; documentation</h3>
              <p style={sx("font-size:13px;margin-bottom:16px;")}>COAs, batch records, and regulatory documentation for any order.</p>
              <div style={sx("border-top:1px solid hsl(var(--border));padding-top:12px;font-size:13.5px;")}>
                <a href="mailto:qc@allynutra.com" style={sx('display:block;color:hsl(var(--ally-navy));font-weight:600;')}>qc@allynutra.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container hero-grid">
          <div className="map-embed">
            <iframe
              src="https://www.google.com/maps?q=Dover,Delaware&output=embed"
              title="Map showing Dover, Delaware"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div>
            <span className="eyebrow">Visit us</span>
            <h2 style={sx('margin:14px 0 16px;')}>Ally Nutra headquarters.</h2>
            <p className="lede" style={sx('margin-bottom:20px;')}>Dover, Delaware<br />United States</p>
            <ul style={sx('list-style:none;margin-bottom:24px;')}>
              <li style={sx("display:flex;gap:14px;padding:12px 0;border-bottom:1px solid hsl(var(--border));")}>
                <div style={sx("flex-shrink:0;width:34px;height:34px;border-radius:var(--radius-sm);background:hsl(var(--ally-orange)/.15);display:flex;align-items:center;justify-content:center;color:hsl(var(--ally-navy));")}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                </div>
                <div><strong style={sx('display:block;font-size:13.5px;color:hsl(var(--ally-navy));')}>Hours of operation</strong><span style={sx("font-size:13px;")}>Monday–Friday · 8:00 AM–6:00 PM EST</span></div>
              </li>
              <li style={sx("display:flex;gap:14px;padding:12px 0;border-bottom:1px solid hsl(var(--border));")}>
                <div style={sx("flex-shrink:0;width:34px;height:34px;border-radius:var(--radius-sm);background:hsl(var(--ally-orange)/.15);display:flex;align-items:center;justify-content:center;color:hsl(var(--ally-navy));")}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" /></svg>
                </div>
                <div><strong style={sx('display:block;font-size:13.5px;color:hsl(var(--ally-navy));')}>Direct phone</strong><span style={sx("font-size:13px;")}>+1 (888) 720-5888</span></div>
              </li>
              <li style={sx("display:flex;gap:14px;padding:12px 0;")}>
                <div style={sx("flex-shrink:0;width:34px;height:34px;border-radius:var(--radius-sm);background:hsl(var(--ally-orange)/.15);display:flex;align-items:center;justify-content:center;color:hsl(var(--ally-navy));")}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div><strong style={sx('display:block;font-size:13.5px;color:hsl(var(--ally-navy));')}>Tours by appointment</strong><span style={sx("font-size:13px;")}>Walk our facility — see the lines, meet the team.</span></div>
              </li>
            </ul>
            <a href="#contact-form" className="btn btn-outline" onClick={scrollToId('contact-form')}>Schedule a visit →</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={sx('max-width:760px;text-align:center;')}>
          <span className="eyebrow" style={sx('justify-content:center;')}>Frequently asked</span>
          <h2 style={sx('margin:14px 0 12px;')}>Common questions before you reach out.</h2>
          <p style={sx('margin-bottom:24px;')}>
            These are a quick preview — for the full list of 22 questions with search and
            filtering, visit our FAQ page.
          </p>
          <Link to="/faq" className="btn btn-primary">Browse all FAQs →</Link>
        </div>
      </section>

      <section className="section section-navy" style={sx('text-align:center;')}>
        <div className="container">
          <h2 style={sx('color:#fff;margin-bottom:12px;')}>Prefer to talk?</h2>
          <p style={sx("max-width:520px;margin:0 auto 24px;")}>
            Skip the form — pick up the phone. Real humans answer Mon–Fri, 8 AM–6 PM EST. We'll
            have answers in minutes, not days.
          </p>
          <a href="tel:+18887205888" className="btn btn-primary btn-lg">Call (888) 720-5888 →</a>
        </div>
      </section>
    </section>
  );
}
