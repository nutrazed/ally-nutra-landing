import { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import VarietiesPopup from './VarietiesPopup.jsx';
import { VARIETIES_BY_FORMAT } from '../data/productVarieties.js';
import { hideAndTint } from '../lib/imgFallback.js';

// Fixed card height, shared by all four cards so the grid never jumps when one flips.
// Measured from BOTH faces' actual rendered content, not assumed to be the back (the
// back has more text, but the front carries a full aspect-ratio photo plus its own
// text — for these four cards the front is in fact the taller face; measuring only
// the back clipped the bottom of every front card). Each face is rendered in normal
// (non-absolute) flow inside an off-screen probe at the grid's real width, so
// scrollHeight reflects true content height; the shared height is the max found
// across all faces of all cards. Re-measured on resize, since text reflows at
// narrower widths (see §6).
export default function ProductCardsGrid({ products }) {
  const [cardHeight, setCardHeight] = useState(null);
  const [popup, setPopup] = useState(null); // { product, triggerRef } | null
  const frontProbeRefs = useRef([]);
  const backProbeRefs = useRef([]);
  const gridRef = useRef(null);

  useEffect(() => {
    function measure() {
      const fronts = frontProbeRefs.current.filter(Boolean).map((el) => el.scrollHeight);
      const backs = backProbeRefs.current.filter(Boolean).map((el) => el.scrollHeight);
      const all = [...fronts, ...backs];
      if (all.length === 0) return;
      const max = Math.max(...all) + 2; // +2px rounding safety margin
      setCardHeight((prev) => (prev === null || Math.abs(prev - max) > 1 ? max : prev));
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (gridRef.current) ro.observe(gridRef.current);
    return () => ro.disconnect();
  }, [products]);

  function handleOpenVarieties(product, triggerRef) {
    setPopup({ product, triggerRef });
  }

  function handleClose() {
    setPopup(null);
  }

  return (
    <>
      {/* Off-screen measurement pass: renders each face's real content, in normal
          flow, at the grid's actual width — then this whole block is hidden. The
          visible cards below reuse the resulting cardHeight. */}
      <div className="card-height-probe" aria-hidden="true">
        <div className="product-grid card-height-probe-grid" ref={gridRef}>
          {products.map((p, i) => (
            <div className="card-height-probe-item" key={p.title}>
              <div className="card-front-probe" ref={(el) => (frontProbeRefs.current[i] = el)}>
                <div className="card-front-photo">
                  <img src={p.img} width="900" height="675" alt="" loading="eager" onError={hideAndTint} />
                </div>
                <div className="product-body">
                  <span className="product-format">{p.format}</span>
                  <h3>{p.title}</h3>
                  <p className="product-desc">{p.desc}</p>
                  <div className="product-spec">{p.spec}</div>
                  <span className="flip-affordance mono-chip">What is this? →</span>
                </div>
              </div>
              <div className="card-back-body" ref={(el) => (backProbeRefs.current[i] = el)}>
                <h3>{p.title}</h3>
                <p className="card-back-text">{p.explanation}</p>
                <span className="btn btn-outline card-varieties-btn">{p.varietiesLabel}</span>
                <span className="card-back-btn">← Back</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.title} product={p} cardHeight={cardHeight} onOpenVarieties={handleOpenVarieties} />
        ))}
      </div>

      {popup && (
        <VarietiesPopup
          data={VARIETIES_BY_FORMAT[popup.product.title]}
          triggerRef={popup.triggerRef}
          onClose={handleClose}
        />
      )}
    </>
  );
}
