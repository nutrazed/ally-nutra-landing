import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import VarietyVisual from './VarietyVisual.jsx';

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Rendered in a PORTAL at document.body — the trigger lives inside a
// transform-style:preserve-3d card face, and a modal mounted inside that 3D context
// renders skewed/clipped/behind the card in every browser tested. Portalling to the
// root sidesteps the 3D containing block entirely.
export default function VarietiesPopup({ data, triggerRef, onClose }) {
  const dialogRef = useRef(null);
  const headingId = useId();
  const scrollYRef = useRef(0);

  // Focus enters the dialog on open, is trapped inside, and returns to the trigger on
  // close. Escape and backdrop click close it. Background scroll is locked (position
  // fixed at the current offset, restored exactly on close — no page jump).
  useEffect(() => {
    const triggerEl = triggerRef?.current;
    scrollYRef.current = window.scrollY;
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    const firstFocusable = dialogRef.current?.querySelector(FOCUSABLE);
    (firstFocusable || dialogRef.current)?.focus();

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      window.scrollTo(0, scrollYRef.current);
      // Focus returns to the button that opened this popup.
      triggerEl?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return createPortal(
    <div className="varieties-popup-backdrop" onClick={onBackdropClick}>
      <div
        ref={dialogRef}
        className="varieties-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
      >
        <button type="button" className="varieties-popup-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <h2 id={headingId} className="varieties-popup-heading">{data.format}</h2>
        <p className="varieties-popup-intro">{data.intro}</p>

        <div className="varieties-grid">
          {data.varieties.map((v) => (
            <div className="variety-cell" key={v.id}>
              <div className="variety-visual">
                {v.visual === 'rung3' ? (
                  <div className="variety-visual-none" aria-hidden="true">
                    <span className="mono-chip">{v.spec}</span>
                  </div>
                ) : v.visual === 'rung1' ? (
                  <img className="variety-photo" src={v.photo} alt={v.photoAlt} loading="lazy" />
                ) : (
                  <VarietyVisual render={v.render} />
                )}
              </div>
              <span className="variety-name">{v.name}</span>
              {v.visual !== 'rung3' && <span className="variety-spec mono-chip">{v.spec}</span>}
              {v.note && <p className="variety-note">{v.note}</p>}
            </div>
          ))}
        </div>

        <div className="varieties-popup-footer">
          <Link to="/contact" className="btn btn-primary" onClick={onClose}>Start your quote →</Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
