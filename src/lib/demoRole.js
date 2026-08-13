// AN-DEMO role model (feature/role-and-links) — presentation-only, no auth,
// no account, no password. Two roles: 'visitor' (default) and 'client'.
//
// Source of truth, in order: (1) the real URL query param ?role=, (2)
// sessionStorage key "an-demo-role", (3) default 'visitor'.
//
// Read window.location.search directly rather than react-router's
// useSearchParams/useLocation: this app uses HashRouter, which derives its
// own Location by parsing everything AFTER the #. useSearchParams would
// only ever see a query string placed after the hash (e.g. #/facility?x=1),
// never the browser's real query string before the # (e.g. /?role=client).
// The query param is deliberately kept in the real query string BECAUSE it
// needs to survive a full page navigation to the static /quote/ and
// /portal/ files, which have no access to React Router state at all — only
// the real URL crosses that boundary.
export const ROLE_KEY = 'an-demo-role';
export const VISITOR = 'visitor';
export const CLIENT = 'client';
const VALID = { [VISITOR]: true, [CLIENT]: true };

export function readRoleFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const fromParam = params.get('role');
  if (VALID[fromParam]) {
    try {
      window.sessionStorage.setItem(ROLE_KEY, fromParam);
    } catch {
      // sessionStorage unavailable (e.g. privacy mode) — param is still authoritative this load.
    }
    return fromParam;
  }
  try {
    const stored = window.sessionStorage.getItem(ROLE_KEY);
    if (VALID[stored]) return stored;
  } catch {
    // ignore
  }
  return VISITOR;
}

// Updates the real query string (not react-router state) so the change
// survives independently of hash-route navigation, then mirrors it to
// sessionStorage. Does not touch location.hash.
export function writeRoleToLocation(role) {
  if (!VALID[role]) return;
  try {
    window.sessionStorage.setItem(ROLE_KEY, role);
  } catch {
    // ignore
  }
  const url = new URL(window.location.href);
  url.searchParams.set('role', role);
  window.history.replaceState(window.history.state, '', url);
}

// import.meta.env.BASE_URL is Vite's configured `base` ('/ally-nutra-landing/'
// in this repo), always trailing-slash-terminated — using it here (rather
// than a hardcoded path) keeps these links correct in dev, preview, and the
// deployed build without hand-tracking the base path in three places.
const BASE = import.meta.env.BASE_URL;

export function quoteUrl(role) {
  return `${BASE}quote/?role=${role}`;
}

// `view` deep-links into a specific portal tab (see the ?view= handling
// added to public/portal/index.html); omit it to land on the portal's
// default (dashboard).
export function portalUrl(role, view) {
  return view ? `${BASE}portal/?role=${role}&view=${view}` : `${BASE}portal/?role=${role}`;
}
