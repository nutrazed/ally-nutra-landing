import { Link } from 'react-router-dom';
import { sx } from '../lib/styleString.js';
import { hideAndTint } from '../lib/imgFallback.js';
import { scrollToId } from '../lib/scrollToId.js';

import about06 from '../assets/images/about-06.jpg';

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

      <section className="section-tight section-alt" style={sx('border-bottom:1px solid hsl(var(--border));')}>
        <div className="container simple-stats">
          <div className="simple-stat"><div className="num">500+</div><div className="lbl">Brands served</div></div>
          <div className="simple-stat"><div className="num">10M+</div><div className="lbl">Units shipped</div></div>
          <div className="simple-stat"><div className="num">50,000</div><div className="lbl">Sq ft facility</div></div>
          <div className="simple-stat"><div className="num">100%</div><div className="lbl">Made in USA</div></div>
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

      <section className="section-alt">
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

      <section className="section-navy">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow on-dark" style={sx('justify-content:center;')}>Our journey</span>
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

      <section className="section-alt">
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

      <section className="section-alt" style={sx('text-align:center;')}>
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
