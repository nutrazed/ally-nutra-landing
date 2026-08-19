// Nav icon set (feature/nav-restructure). One icon per destination in
// Header.jsx's SERVICE_LINKS and MAIN_LINKS — nine distinct glyphs, all drawn
// on the same 16x16 grid with the same stroke so they read as a single set
// rather than nine icons from different sources. Inline SVG only (no icon
// library, no emoji, per the brief). aria-hidden + focusable="false" on every
// one: the adjacent label carries the meaning, these are decorative.
function NavIcon({ children }) {
  return (
    <svg
      className="nav-icon"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

// /services, and reused on the "Services" dropdown trigger itself so every
// top-level nav item (not just the four panel rows) carries an icon.
export function IconGrid() {
  return (
    <NavIcon>
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </NavIcon>
  );
}

// /contract-manufacturing — sawtooth factory roofline on a baseline.
export function IconFactory() {
  return (
    <NavIcon>
      <path d="M2 14V8l3-2.5v2.5l3-2.5v2.5l3-2.5v2.5l3-2.5V14" />
      <line x1="1.5" y1="14" x2="14.5" y2="14" />
    </NavIcon>
  );
}

// /private-label — price tag with its punch hole.
export function IconTag() {
  return (
    <NavIcon>
      <path d="M2 8.2 8.2 2H13a1 1 0 0 1 1 1v4.8L7.8 14 2 8.2Z" />
      <circle cx="10.3" cy="5.7" r="1" />
    </NavIcon>
  );
}

// /capsule-manufacturing — two-piece capsule shell.
export function IconCapsule() {
  return (
    <NavIcon>
      <rect x="2" y="6" width="12" height="4" rx="2" />
      <line x1="8" y1="6" x2="8" y2="10" />
    </NavIcon>
  );
}

// /facility — building with a 2x2 window grid.
export function IconBuilding() {
  return (
    <NavIcon>
      <rect x="3" y="2.5" width="10" height="11" rx="1" />
      <rect x="5.3" y="5" width="1.8" height="1.8" />
      <rect x="8.9" y="5" width="1.8" height="1.8" />
      <rect x="5.3" y="8.4" width="1.8" height="1.8" />
      <rect x="8.9" y="8.4" width="1.8" height="1.8" />
    </NavIcon>
  );
}

// /certifications — shield with a checkmark.
export function IconBadge() {
  return (
    <NavIcon>
      <path d="M8 2 13 4v4.2c0 3.6-2.3 6-5 6.8-2.7-.8-5-3.2-5-6.8V4Z" />
      <path d="M5.6 8.1 7.1 9.6 10.3 6.2" />
    </NavIcon>
  );
}

// /about — head and shoulders.
export function IconPerson() {
  return (
    <NavIcon>
      <circle cx="8" cy="5.2" r="2.4" />
      <path d="M3 14c0-3 2.3-5.2 5-5.2s5 2.2 5 5.2" />
    </NavIcon>
  );
}

// /faq — question mark in a circle. The dot is a zero-length round-capped
// line, not a separate shape, so its stroke matches the mark exactly.
export function IconHelp() {
  return (
    <NavIcon>
      <circle cx="8" cy="8" r="6" />
      <path d="M6.1 6.3a1.9 1.9 0 1 1 2.9 1.6c-.7.4-1 .9-1 1.6" />
      <line x1="8" y1="11.3" x2="8" y2="11.31" />
    </NavIcon>
  );
}

// /contact — envelope.
export function IconMail() {
  return (
    <NavIcon>
      <rect x="2" y="4" width="12" height="9" rx="1.3" />
      <path d="M2.6 5 8 9.2 13.4 5" />
    </NavIcon>
  );
}
