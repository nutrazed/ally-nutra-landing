import { useEffect, useId, useRef, useState } from 'react';
import { hideAndTint } from '../lib/imgFallback.js';

// Fronts keep their four format images (client clarification: the removal request
// was about the per-kind imagery in the popup, not the card fronts). The varieties
// popup stays gone — flipping shows only the kinds of this format (capsule shells,
// sachet/stick materials, pouch sizes/closures) as text from productVarieties.js,
// whose every entry traces to the Phase 0 audit (see that file's header). The
// back's old explanation paragraph stays dropped, and the popup-only fields
// (varietiesLabel, explanation) stay out of PRODUCTS.
//
// Flip interaction is unchanged from before: click/tap to flip — never hover
// (hover doesn't exist on touch, and causes accidental flips on desktop). Multiple
// cards can be flipped at once; each manages its own state independently.
export default function ProductCard({ product, varieties, cardHeight }) {
  const [flipped, setFlipped] = useState(false);
  const frontRef = useRef(null);
  const backFirstRef = useRef(null);
  const backId = useId();

  function toggleFlip() {
    setFlipped((f) => !f);
  }

  function goBack() {
    setFlipped(false);
  }

  // Moving focus with the flip: the trigger becomes inert as soon as the card flips,
  // so leaving focus on it would strand keyboard/AT users. Move focus onto the back
  // face's first control on open, and back to the front trigger on close.
  //
  // Skipped on initial mount (isFirstRender): this effect used to run unconditionally
  // on every mount too, since effects fire after the first render regardless of the
  // dependency array. That called frontRef.focus() on all four cards as they mounted —
  // each call stealing focus from the previous card — so the page loaded with the
  // LAST card's front button holding real, unrequested keyboard focus, visible as a
  // stray focus-ring outline (:focus-visible uses --ring, amber) with zero user
  // interaction. Confirmed by checking `.matches(':focus-visible')` on page load
  // before this fix — it was true on card 4 (Pouches) and false on cards 1-3, matching
  // exactly what the screenshot showed.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (flipped) {
      backFirstRef.current?.focus();
    } else {
      frontRef.current?.focus();
    }
  }, [flipped]);

  return (
    <div className={`product-card flip-card${flipped ? ' flipped' : ''}`}>
      <div className="card-inner" style={cardHeight ? { height: `${cardHeight}px` } : undefined}>
        <button
          type="button"
          ref={frontRef}
          className="card-face card-front"
          aria-expanded={flipped}
          aria-controls={backId}
          aria-label={`${product.title} — show the kinds`}
          onClick={toggleFlip}
          inert={flipped}
        >
          <div className="card-front-photo">
            <img
              src={product.img}
              width="900"
              height="675"
              alt={product.alt}
              loading="lazy"
              onError={hideAndTint}
              style={product.imageScale ? { '--card-photo-scale': product.imageScale } : undefined}
            />
          </div>
          <div className="product-body">
            <span className="product-format">{product.format}</span>
            <h3>{product.title}</h3>
            <p className="product-desc">{product.desc}</p>
            <div className="product-spec">{product.spec}</div>
            <span className="flip-affordance mono-chip" aria-hidden="true">The kinds of {product.title.toLowerCase()} →</span>
          </div>
        </button>

        <div id={backId} className="card-face card-back" inert={!flipped}>
          <div className="card-back-body">
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
            <button type="button" ref={backFirstRef} className="card-back-btn" onClick={goBack}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
