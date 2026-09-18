import { useEffect, useId, useRef, useState } from 'react';
import { hideAndTint } from '../lib/imgFallback.js';

// Fronts keep their four format images (client clarification). The varieties popup
// stays gone — flipping shows only the kinds of this format (capsule shells, sachet/
// stick materials, pouch sizes/closures) as text from productVarieties.js, whose
// every entry traces to the Phase 0 audit (see that file's header).
//
// Flip-back has no visible button (removed per client request): a transparent
// overlay button covers the whole back face — tap/click anywhere flips back. The
// kinds list beneath it is the card's "tiny scroll" fallback: the grid measures
// faces and sizes cards to fit, but if anything ever renders taller than measured
// (late webfont swap, browser zoom), the list scrolls inside the card instead of
// clipping. Because the overlay sits on top, wheel/touch events are forwarded to
// the list natively (passive:false), and a tap still flips while a drag scrolls
// (movement threshold below).

// Drag beyond this many px on the back face counts as a scroll gesture, not a tap.
const FLIP_TAP_THRESHOLD_PX = 6;
//
// Flip interaction is unchanged from before: click/tap to flip — never hover
// (hover doesn't exist on touch, and causes accidental flips on desktop). Multiple
// cards can be flipped at once; each manages its own state independently.
export default function ProductCard({ product, varieties, cardHeight }) {
  const [flipped, setFlipped] = useState(false);
  const frontRef = useRef(null);
  const backFirstRef = useRef(null);
  const kindsRef = useRef(null);
  const dragState = useRef({ y: 0, moved: false });
  const backId = useId();

  function toggleFlip() {
    setFlipped((f) => !f);
  }

  function goBack() {
    setFlipped(false);
  }

  // Native (non-passive) listeners forward wheel/touch from the overlay to the
  // kinds list, only when the list actually overflows — React's root listeners
  // are passive, so preventDefault (needed to stop the page scrolling under the
  // card) requires addEventListener here. At the list's scroll ends the event is
  // released back to the page, so the card never traps scrolling.
  useEffect(() => {
    const zone = backFirstRef.current;
    const list = kindsRef.current;
    if (!zone || !list) return;
    const overflowing = () => list.scrollHeight > list.clientHeight + 1;

    const onWheel = (e) => {
      if (!overflowing()) return;
      const atTop = list.scrollTop <= 0 && e.deltaY < 0;
      const atEnd = list.scrollTop + list.clientHeight >= list.scrollHeight - 1 && e.deltaY > 0;
      if (atTop || atEnd) return;
      e.preventDefault();
      list.scrollTop += e.deltaY;
    };
    const onTouchStart = (e) => {
      dragState.current = { y: e.touches[0].clientY, moved: false };
    };
    const onTouchMove = (e) => {
      if (!overflowing()) return;
      const s = dragState.current;
      const dy = s.y - e.touches[0].clientY;
      s.y = e.touches[0].clientY;
      if (Math.abs(dy) < 0.5) return;
      const before = list.scrollTop;
      const canScrollDown = before + list.clientHeight < list.scrollHeight - 1;
      const canScrollUp = before > 0;
      if ((dy > 0 && canScrollDown) || (dy < 0 && canScrollUp)) {
        e.preventDefault();
        list.scrollTop = before + dy;
        if (Math.abs(dy) > FLIP_TAP_THRESHOLD_PX || list.scrollTop !== before) {
          s.moved = true;
        }
      }
    };
    zone.addEventListener('wheel', onWheel, { passive: false });
    zone.addEventListener('touchstart', onTouchStart, { passive: true });
    zone.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      zone.removeEventListener('wheel', onWheel);
      zone.removeEventListener('touchstart', onTouchStart);
      zone.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // A tap on the overlay flips back — unless the gesture was used to scroll.
  function onFlipzoneClick() {
    if (dragState.current.moved) {
      dragState.current.moved = false;
      return;
    }
    goBack();
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
            <ul className="card-kinds" ref={kindsRef}>
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
          </div>
          {/* Flip-back: the visible "← Back" footer button was removed per client
              request ("it annoys me") — instead the whole back face flips back on
              click/tap via this transparent overlay. It stays a REAL button (not a
              clickable div) so keyboard/AT users get honest semantics, Receives
              focus on flip (below). Wheel/touch are forwarded to the kinds list
              when it overflows (the "tiny scroll"), so scrolling the card and
              tapping it to flip never fight: a drag scrolls, a tap flips. */}
          <button
            type="button"
            ref={backFirstRef}
            className="card-back-flipzone"
            aria-label={`${product.title} — flip back`}
            onClick={onFlipzoneClick}
          ></button>
        </div>
      </div>
    </div>
  );
}
