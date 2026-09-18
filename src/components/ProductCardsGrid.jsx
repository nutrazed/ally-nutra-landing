import { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import { VARIETIES_BY_FORMAT } from '../data/productVarieties.js';

// Fixed card height, shared by all four cards so the grid never jumps when one flips.
// Measured from BOTH faces' actual rendered content in normal (non-absolute) flow
// inside an off-screen probe at the grid's real width, so scrollHeight reflects true
// content height; the shared height is the max found across all faces of all cards.
// Re-measured on resize, since text reflows at narrower widths (see §6).
// The front carries a full aspect-ratio photo plus its own text — historically the
// taller face; the kinds-list back can outgrow it at narrow widths — so measuring
// both faces stays necessary.
export default function ProductCardsGrid({ products }) {
  const [cardHeight, setCardHeight] = useState(null);
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

  return (
    <>
      {/* Off-screen measurement pass: renders each face's real content, in normal
          flow, at the grid's actual width — then this whole block is hidden.
          The visible cards below reuse the resulting cardHeight. */}
      <div className="card-height-probe" aria-hidden="true">
        <div className="product-grid card-height-probe-grid" ref={gridRef}>
          {products.map((p, i) => {
            const varieties = VARIETIES_BY_FORMAT[p.title];
            return (
              <div className="card-height-probe-item" key={p.title}>
                <div className="card-front-probe" ref={(el) => (frontProbeRefs.current[i] = el)}>
                  <div className="card-front-photo">
                    <img src={p.img} width="900" height="675" alt="" loading="eager" />
                  </div>
                  <div className="product-body">
                    <span className="product-format">{p.format}</span>
                    <h3>{p.title}</h3>
                    <p className="product-desc">{p.desc}</p>
                    <div className="product-spec">{p.spec}</div>
                    <span className="flip-affordance mono-chip">The kinds of {p.title.toLowerCase()} →</span>
                  </div>
                </div>
                <div className="card-back-body" ref={(el) => (backProbeRefs.current[i] = el)}>
                  <h3>{varieties.format}</h3>
                  <p className="card-back-intro">{varieties.intro}</p>
                  <ul className="card-kinds">
                    {varieties.varieties.map((v) => (
                      <li className="card-kind" key={v.id}>
                        <div className="card-kind-topline">
                          <span className="card-kind-name">{v.name}</span>
                          <span className="card-kind-spec mono-chip">{v.spec}</span>
                        </div>
                        <span className="card-kind-note">{v.note}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="card-back-btn">← Back</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard
            key={p.title}
            product={p}
            varieties={VARIETIES_BY_FORMAT[p.title]}
            cardHeight={cardHeight}
          />
        ))}
      </div>
    </>
  );
}
