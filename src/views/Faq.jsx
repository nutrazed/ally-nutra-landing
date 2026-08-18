import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { sx } from '../lib/styleString.js';

const FAQ_GROUPS = [
  {
    cat: 'getting-started',
    title: 'Getting started',
    items: [
      { qMark: 'Q.01', question: 'What does a contract supplement manufacturer actually do?', answer: 'As a contract manufacturer, Ally Nutra handles the full production side of your supplement brand — sourcing raw ingredients, formulating, blending, encapsulating or filling, and packaging — so you can focus on building and selling your brand.' },
      { qMark: 'Q.02', question: 'How do I get started with a project?', answer: "Start by requesting a quote through our online form. You'll tell us your product type, target format, and quantity. Once a quote is signed off, we proceed to invoicing, payment, and procurement." },
      { qMark: 'Q.03', question: 'Do I need to have my formula ready before contacting you?', answer: 'Not at all. We work with brands at every stage — whether you have a finished, lab-verified formula or just a concept and a target benefit.' },
      { qMark: 'Q.04', question: 'What product formats can you manufacture?', answer: 'Our core capabilities are capsules, sachets, stick packs, and resealable pouches — plus private-label finished goods on any of those formats. Available options are listed in the quote form.' },
    ],
  },
  {
    cat: 'manufacturing',
    title: 'Manufacturing & production',
    items: [
      { qMark: 'Q.05', question: 'Where is your manufacturing facility located?', answer: 'Ally Nutra is based in Dover, Delaware, USA. All production runs through our domestic facility, giving you full visibility and US-based quality oversight.' },
      { qMark: 'Q.06', question: 'Can you handle custom formulations?', answer: 'Yes. Custom formulation is a core part of what we do. Our team works with you on ingredient selection, standardization, dosages, and label claims, then locks the final formulation before production begins.' },
      { qMark: 'Q.07', question: 'What is your private label program?', answer: 'Our private label program lets you launch with pre-developed, proven formulas under your own brand — a faster path to market than full custom development.' },
      { qMark: 'Q.08', question: 'How do you ensure product quality and consistency?', answer: 'Quality is governed by our cGMP-aligned quality management system. Every batch follows documented procedures with in-process checks, so each run is traceable and consistent.' },
      { qMark: 'Q.09', question: "Can the formulation change after I've signed off?", answer: 'Once you sign off in the client quote portal, the formulation is locked and the quote version is frozen for that run. Any changes are handled as a new, documented revision.' },
    ],
  },
  {
    cat: 'compliance',
    title: 'Certifications & compliance',
    items: [
      { qMark: 'Q.10', question: 'Are you cGMP certified?', answer: "Yes. Ally Nutra operates under current Good Manufacturing Practices (cGMP), the FDA's quality standard for dietary supplement manufacturing." },
      { qMark: 'Q.11', question: 'Is your facility FDA registered?', answer: 'Yes, our facility is FDA registered. Registration and cGMP compliance demonstrate that we meet federal standards for manufacturing and labeling.' },
      { qMark: 'Q.12', question: 'Will my products be compliant for sale on Amazon and major retailers?', answer: 'We manufacture to US labeling and compliance standards, and we offer Amazon FBA prep so your products arrive marketplace-ready.' },
      { qMark: 'Q.13', question: 'Can you provide documentation and certificates of analysis?', answer: 'Yes. We provide the batch and quality documentation your brand needs for compliance and retailer onboarding, including COAs on request.' },
    ],
  },
  {
    cat: 'pricing',
    title: 'Pricing & minimum orders',
    items: [
      { qMark: 'Q.14', question: 'What is your minimum order quantity (MOQ)?', answer: 'MOQs vary by product format and formulation complexity. When you submit a quote request, your minimums are calculated for your specific project.' },
      { qMark: 'Q.15', question: 'How is pricing determined?', answer: 'Pricing reflects your ingredients, format, order volume, and packaging requirements. Higher volumes generally lower your per-unit cost.' },
      { qMark: 'Q.16', question: 'How do I get an accurate quote?', answer: 'Use our online quote form — it adapts to your product type and gathers the details we need to price accurately.' },
      { qMark: 'Q.17', question: 'What are your payment terms?', answer: 'After you sign off on your quote, we issue an invoice and proceed to payment before procurement begins. Specific terms are confirmed during quoting.' },
    ],
  },
  {
    cat: 'fulfillment',
    title: 'Orders & fulfillment',
    items: [
      { qMark: 'Q.18', question: 'What are your typical lead times?', answer: 'Lead times depend on formulation, ingredient sourcing, and order volume. Your estimated timeline is provided with your quote.' },
      { qMark: 'Q.19', question: 'Do you offer Amazon FBA prep?', answer: "Yes. We offer FBA prep so your finished products arrive at Amazon's fulfillment centers correctly labeled and packaged." },
      { qMark: 'Q.20', question: 'Can I track my order through production?', answer: 'Yes. Your client workspace gives you visibility into your orders, documents, and project status.' },
      { qMark: 'Q.21', question: 'Do you handle packaging and finishing?', answer: 'Yes. We deliver retail-ready finished goods — including bottling, labeling, and packaging — so your product ships ready to sell.' },
      { qMark: 'Q.22', question: "What happens if I'm not yet a qualified fit?", answer: "If your project isn't an immediate fit, we'll let you know honestly and offer to keep you on our waitlist." },
    ],
  },
  {
    cat: 'private-label',
    title: 'Private label',
    items: [
      { qMark: 'Q.23', question: "What's the minimum order for private label?", answer: "Most private label SKUs start at 100 bottles per flavor/SKU — lower than our standard contract manufacturing minimums, since you're selecting from an already-approved formula rather than commissioning a new one. Some specialty formats may have higher minimums, confirmed in your quote." },
      { qMark: 'Q.24', question: 'Do you provide label design?', answer: "Yes — our in-house design team can create FDA-compliant labels and packaging artwork for a small additional fee. You're also welcome to bring your own designer." },
      { qMark: 'Q.25', question: 'Can I get a sample before ordering?', answer: 'Yes — free samples are available on approved catalog formulas, so you can verify quality, taste, and packaging before committing to a full run.' },
      { qMark: 'Q.26', question: 'Can I tweak a private label formula?', answer: 'Minor adjustments — flavor, color, capsule type — are often possible. Major changes typically move the project into our custom contract manufacturing track instead.' },
    ],
  },
];

const CATEGORY_BUTTONS = [
  { cat: 'all', label: 'All questions', count: 26 },
  { cat: 'getting-started', label: 'Getting started', count: 4 },
  { cat: 'manufacturing', label: 'Manufacturing', count: 5 },
  { cat: 'compliance', label: 'Certifications & compliance', count: 4 },
  { cat: 'pricing', label: 'Pricing & MOQ', count: 4 },
  { cat: 'fulfillment', label: 'Orders & fulfillment', count: 5 },
  { cat: 'private-label', label: 'Private label', count: 4 },
];

// FAQ accordion item. Ported from the source file's script: opening measures
// .accordion-panel's real scrollHeight (unaffected by its own max-height:0/overflow
// clipping) at the moment of the click and animates to that pixel value; closing
// resets max-height to nothing so the CSS transition collapses it back to 0.
function AccordionItem({ qMark, question, answer, hidden }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const [openHeight, setOpenHeight] = useState(0);

  function toggle() {
    if (open) {
      setOpen(false);
    } else {
      if (panelRef.current) setOpenHeight(panelRef.current.scrollHeight + 20);
      setOpen(true);
    }
  }

  return (
    <div
      className="accordion-item"
      data-open={open ? 'true' : 'false'}
      style={hidden ? { display: 'none' } : undefined}
    >
      <button className="accordion-trigger" aria-expanded={open ? 'true' : 'false'} onClick={toggle}>
        <span className="q-mark">{qMark}</span>
        <span className="q-text">{question}</span>
        <span className="accordion-icon" aria-hidden="true"></span>
      </button>
      <div
        className="accordion-panel"
        ref={panelRef}
        style={{ maxHeight: open ? `${openHeight}px` : '0px' }}
      >
        <div className="accordion-panel-inner">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

// FAQ category filter + live search. Ported from the source file's script:
//  - clicking a category button filters by data-cat, shows every item in matching
//    groups, and clears the search box.
//  - typing in the search box instead matches question+answer text across ALL
//    groups regardless of the selected category (bypassing the category filter
//    entirely), forces the "All questions" button to read active while a term is
//    present, and shows the "no results" panel when nothing matches. Clearing the
//    box back to empty (while still in "search mode") makes every question visible
//    again rather than reapplying whatever category was previously selected —
//    that quirk is in the original DOM-class-toggling logic and is reproduced here
//    via the `filterMode` state rather than smoothed over.
export default function Faq() {
  const [activeCat, setActiveCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('category');

  function handleCatClick(cat) {
    setFilterMode('category');
    setActiveCat(cat);
    setSearchTerm('');
  }

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
    setFilterMode('search');
    if (value.trim()) setActiveCat('all');
  }

  const term = searchTerm.toLowerCase().trim();
  const visualActiveCat = filterMode === 'search' && term ? 'all' : activeCat;

  const groupResults = FAQ_GROUPS.map((group) => {
    const matches = group.items.map((item) => {
      if (filterMode === 'category') return true;
      if (!term) return true;
      return `${item.qMark} ${item.question} ${item.answer}`.toLowerCase().includes(term);
    });
    const groupHasMatch = matches.some(Boolean);
    const hidden =
      filterMode === 'category'
        ? !(activeCat === 'all' || group.cat === activeCat)
        : Boolean(term) && !groupHasMatch;
    return { group, matches, hidden, groupHasMatch };
  });

  const anyVisible = filterMode === 'search' ? groupResults.some((r) => r.groupHasMatch) : true;
  const showNoResults = filterMode === 'search' && Boolean(term) && !anyVisible;

  return (
    <section aria-labelledby="faq-h1">
      <section className="hero on-navy" style={sx('padding-bottom:56px;')}>
        <div className="container" style={sx('max-width:720px;')}>
          <span className="eyebrow on-dark">Support · knowledge base</span>
          <h1 id="faq-h1" style={sx('color:#fff;margin:14px 0 16px;')}>Questions, answered with precision.</h1>
          <p style={sx("color:hsl(0 0% 100% / .78);max-width:600px;")}>
            Everything you need to know about contract manufacturing with Ally Nutra — from
            minimum order quantities and certifications to lead times, formulation, and
            fulfillment.
          </p>
          <div style={sx('position:relative;max-width:560px;margin-top:28px;')}>
            <svg
              viewBox="0 0 20 20"
              fill="none"
              style={sx("position:absolute;left:16px;top:50%;transform:translateY(-50%);width:18px;height:18px;color:hsl(0 0% 100% / .4);")}
            >
              <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <label htmlFor="faqSearch" className="visually-hidden">Search questions</label>
            <input
              type="text"
              id="faqSearch"
              placeholder={'Search questions — try "MOQ", "lead time", "cGMP"…'}
              value={searchTerm}
              onChange={handleSearchChange}
              style={sx("width:100%;padding:15px 18px 15px 46px;border-radius:var(--radius-md);border:1px solid hsl(0 0% 100% / .18);background:hsl(0 0% 100% / .07);color:#fff;font-size:15px;font-family:inherit;")}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-layout">
          <aside className="rail">
            <div className="rail-label">Categories</div>
            {CATEGORY_BUTTONS.map((c) => (
              <button
                key={c.cat}
                className={`cat-btn${visualActiveCat === c.cat ? ' active' : ''}`}
                data-cat={c.cat}
                onClick={() => handleCatClick(c.cat)}
              >
                {c.label} <span className="count">{c.count}</span>
              </button>
            ))}
          </aside>

          <div className="faq-content">
            {groupResults.map(({ group, matches, hidden }) => (
              <div key={group.cat} className={`faq-group${hidden ? ' hidden' : ''}`} data-cat={group.cat}>
                <div className="faq-group-head">
                  <span className="dot"></span>
                  <h2 style={sx('font-size:22px;')}>{group.title}</h2>
                </div>
                {group.items.map((item, i) => (
                  <AccordionItem
                    key={item.qMark}
                    qMark={item.qMark}
                    question={item.question}
                    answer={item.answer}
                    hidden={!matches[i]}
                  />
                ))}
              </div>
            ))}

            <div
              id="noResults"
              style={{
                ...sx('text-align:center;padding:64px 20px;color:hsl(var(--muted-foreground));'),
                display: showNoResults ? 'block' : 'none',
              }}
            >
              <h3 style={sx('margin-bottom:8px;')}>No matching questions</h3>
              <p>Try a different keyword, or reach out and we'll answer directly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-navy" style={sx('padding:56px 0;')}>
        <div className="container" style={sx("display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;")}>
          <div>
            <h2 style={sx('color:#fff;margin-bottom:6px;font-size:26px;')}>Still have questions?</h2>
            <p>Our team is ready to talk through your project — no pressure, just answers.</p>
          </div>
          <div style={sx("display:flex;gap:12px;flex-wrap:wrap;")}>
            <Link to="/contact" className="btn btn-primary btn-lg">Get instant quote →</Link>
            <a href="tel:8887205888" className="btn btn-outline-light btn-lg">Call (888) 720-5888</a>
          </div>
        </div>
      </section>
    </section>
  );
}
