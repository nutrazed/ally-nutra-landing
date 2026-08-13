// Rung-2 brand-controlled renderings for the varieties popup — deliberate SVG/CSS
// diagrams, never presented as photographs. See src/data/productVarieties.js and the
// PR description for why each variety landed on this rung (no company-repo
// photograph distinguishes one variety from another for any of these).

const CAPSULE_SHELL_COLORS = {
  hpmc: { cap: '#5B8C3A', body: '#EAF3E3', label: 'HPMC' },
  gelatin: { cap: 'hsl(var(--ally-navy))', body: '#F0A829', label: 'Gelatin' },
  pullulan: { cap: '#2E5D9E', body: '#E3ECF7', label: 'Pullulan' },
  'delayed-release': { cap: '#71717A', body: '#F4F4F5', label: 'DR' },
};

function CapsuleShellSVG({ variant }) {
  const c = CAPSULE_SHELL_COLORS[variant] || CAPSULE_SHELL_COLORS.hpmc;
  const banded = variant === 'delayed-release';
  return (
    <svg viewBox="0 0 160 80" width="100%" height="72" role="img" aria-label={`${c.label} capsule shell diagram`}>
      <rect x="10" y="20" width="70" height="40" rx="20" fill={c.cap} />
      <rect x="80" y="20" width="70" height="40" rx="20" fill={c.body} />
      <rect x="70" y="20" width="20" height="40" fill={c.cap} opacity="0.15" />
      {banded && (
        <>
          <rect x="14" y="24" width="4" height="32" fill="#fff" opacity="0.4" />
          <rect x="24" y="24" width="4" height="32" fill="#fff" opacity="0.4" />
          <rect x="34" y="24" width="4" height="32" fill="#fff" opacity="0.4" />
        </>
      )}
    </svg>
  );
}

const MATERIAL_SWATCH_STYLES = {
  'foil-laminate': { fill: 'url(#foilGradient)', label: 'Foil laminate' },
  'kraft-paper': { fill: '#B8935F', label: 'Kraft paper' },
  'matte-film': { fill: '#F4F4F1', stroke: '#D8D8D3', label: 'Matte film' },
  'glossy-film': { fill: 'url(#glossGradient)', label: 'Glossy film' },
  'clear-film': { fill: 'none', dashed: true, label: 'Clear film' },
};

function MaterialSwatchSVG({ variant }) {
  const s = MATERIAL_SWATCH_STYLES[variant] || MATERIAL_SWATCH_STYLES['matte-film'];
  return (
    <svg viewBox="0 0 160 80" width="100%" height="72" role="img" aria-label={`${s.label} material swatch`}>
      <defs>
        <linearGradient id="foilGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DCE1E6" />
          <stop offset="45%" stopColor="#F5F7F9" />
          <stop offset="55%" stopColor="#AEB6BD" />
          <stop offset="100%" stopColor="#DCE1E6" />
        </linearGradient>
        <linearGradient id="glossGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#F0F0F0" />
          <stop offset="35%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E4E4E4" />
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="10"
        width="140"
        height="60"
        rx="8"
        fill={s.fill}
        stroke={s.stroke || 'hsl(var(--ally-navy)/.25)'}
        strokeWidth={s.dashed ? 2 : 1}
        strokeDasharray={s.dashed ? '6 5' : undefined}
      />
    </svg>
  );
}

function PouchSizeSVG({ wIn, hIn, variant }) {
  // Proportional outlines, scaled to the largest confirmed pouch size (10x14in) so all
  // four render at true relative scale within a shared viewBox — see quoteOptions.ts.
  const MAX_W = 10;
  const MAX_H = 14;
  const boxW = 60;
  const boxH = 70;
  const w = (wIn / MAX_W) * boxW;
  const h = (hIn / MAX_H) * boxH;
  const x = 80 - w / 2;
  const y = 75 - h;
  return (
    <svg viewBox="0 0 160 80" width="100%" height="72" role="img" aria-label={`${variant} inch pouch, drawn to relative scale`}>
      <rect x={x} y={y} width={w} height={h} rx="4" fill="#EDE8DE" stroke="hsl(var(--ally-navy)/.5)" strokeWidth="1.5" />
      <line x1={x + 6} y1={y + 6} x2={x + w - 6} y2={y + 6} stroke="hsl(var(--ally-navy)/.4)" strokeWidth="2" />
    </svg>
  );
}

const CLOSURE_LABELS = {
  'zip-lock': 'Zip-lock closure',
  'tear-notch': 'Tear-notch closure',
  'spout-cap': 'Spout cap closure',
  'heat-seal': 'Heat-seal closure',
};

function PouchClosureSVG({ variant }) {
  return (
    <svg viewBox="0 0 160 80" width="100%" height="72" role="img" aria-label={CLOSURE_LABELS[variant] || 'Pouch closure diagram'}>
      <rect x="45" y="14" width="70" height="56" rx="4" fill="#EDE8DE" stroke="hsl(var(--ally-navy)/.5)" strokeWidth="1.5" />
      {variant === 'zip-lock' && (
        <path d="M50 26 L54 22 L58 26 L62 22 L66 26 L70 22 L74 26 L78 22 L82 26 L86 22 L90 26 L94 22 L98 26 L102 22 L106 26 L110 22"
          fill="none" stroke="hsl(var(--ally-orange))" strokeWidth="2" />
      )}
      {variant === 'tear-notch' && (
        <path d="M45 30 L52 20 L58 30" fill="#fff" stroke="hsl(var(--ally-navy)/.5)" strokeWidth="1.5" />
      )}
      {variant === 'spout-cap' && (
        <>
          <rect x="72" y="4" width="16" height="16" rx="3" fill="hsl(var(--ally-orange))" />
          <rect x="76" y="0" width="8" height="8" rx="2" fill="hsl(var(--ally-navy))" />
        </>
      )}
      {variant === 'heat-seal' && (
        <line x1="45" y1="16" x2="115" y2="16" stroke="hsl(var(--ally-navy))" strokeWidth="3" strokeDasharray="4 3" />
      )}
    </svg>
  );
}

export default function VarietyVisual({ render }) {
  if (!render) return null;
  switch (render.kind) {
    case 'capsule-shell':
      return <CapsuleShellSVG variant={render.variant} />;
    case 'material-swatch':
      return <MaterialSwatchSVG variant={render.variant} />;
    case 'pouch-size':
      return <PouchSizeSVG wIn={render.wIn} hIn={render.hIn} variant={render.variant} />;
    case 'pouch-closure':
      return <PouchClosureSVG variant={render.variant} />;
    default:
      return null;
  }
}
