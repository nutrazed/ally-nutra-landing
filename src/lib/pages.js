// Ported from the source file's hash-router IIFE (PAGE_KEYS / SERVICE_KEYS / TITLES,
// originally near the end of <body>). PAGE_KEYS is now implicit in the <Routes> list in
// App.jsx; SERVICE_KEYS and TITLES are still needed at runtime for the "any service view
// counts as active" nav-dropdown rule and the per-route <title>, so they live here.
export const SERVICE_KEYS = [
  'services',
  'contract-manufacturing',
  'private-label',
  'capsule-manufacturing',
];

export const TITLES = {
  home: 'Ally Nutra — Contract supplement manufacturing',
  services: 'Our services | Ally Nutra',
  'contract-manufacturing': 'Contract supplement manufacturing | Ally Nutra',
  'private-label': 'Private label supplements | Ally Nutra',
  'capsule-manufacturing': 'Capsule manufacturing | Ally Nutra',
  facility: 'Our facility | Ally Nutra',
  certifications: 'Certifications | Ally Nutra',
  about: 'About us | Ally Nutra',
  faq: 'Frequently asked questions | Ally Nutra',
  contact: 'Contact us | Ally Nutra',
};

// Derives the page key from a react-router pathname, e.g. "/contact" -> "contact".
export function pageKeyFromPathname(pathname) {
  return pathname.replace(/^\//, '') || 'home';
}
