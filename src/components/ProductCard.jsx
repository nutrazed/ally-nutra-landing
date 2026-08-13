import { useEffect, useId, useRef, useState } from 'react';
import { hideAndTint } from '../lib/imgFallback.js';

// Click/tap to flip — never hover (hover doesn't exist on touch, and causes accidental
// flips on desktop). Multiple cards can be flipped at once; each manages its own state
// independently, so comparing capsules against sachets doesn't require re-flipping.
export default function ProductCard({ product, cardHeight, onOpenVarieties }) {
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
  useEffect(() => {
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
          aria-label={`${product.title} — show details`}
          onClick={toggleFlip}
          inert={flipped}
        >
          <div className="card-front-photo">
            <img src={product.img} width="900" height="675" alt={product.alt} loading="lazy" onError={hideAndTint} />
          </div>
          <div className="product-body">
            <span className="product-format">{product.format}</span>
            <h3>{product.title}</h3>
            <p className="product-desc">{product.desc}</p>
            <div className="product-spec">{product.spec}</div>
            <span className="flip-affordance mono-chip" aria-hidden="true">What is this? →</span>
          </div>
        </button>

        <div id={backId} className="card-face card-back" inert={!flipped}>
          <div className="card-back-body">
            <h3>{product.title}</h3>
            <p className="card-back-text">{product.explanation}</p>
            <button
              type="button"
              ref={backFirstRef}
              className="btn btn-outline card-varieties-btn"
              onClick={() => onOpenVarieties(product, backFirstRef)}
            >
              {product.varietiesLabel}
            </button>
            <button type="button" className="card-back-btn" onClick={goBack}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
