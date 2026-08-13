// ════════════════════════════════════════════════════════════════
// AN-DEMO role switch — shared by public/quote/index.html and
// public/portal/index.html (feature/role-and-links). This is a
// presentation-only role toggle: there is no auth, no account, no
// server. Loaded via a plain <script src> since these two pages are
// static files copied verbatim by Vite, not built React components.
//
// Source of truth, in order: (1) URL query param ?role=, (2)
// sessionStorage key "an-demo-role", (3) default "visitor". The query
// param is checked first specifically because it's the one thing that
// survives a full page load from the React app into these static
// files. sessionStorage (not localStorage) so each demo session starts
// clean for the next person who opens the link.
// ════════════════════════════════════════════════════════════════
(function () {
  var ROLE_KEY = 'an-demo-role';
  var VALID = { visitor: true, client: true };

  function currentRole() {
    var params = new URLSearchParams(window.location.search);
    var fromParam = params.get('role');
    if (VALID[fromParam]) {
      try { window.sessionStorage.setItem(ROLE_KEY, fromParam); } catch {}
      return fromParam;
    }
    try {
      var stored = window.sessionStorage.getItem(ROLE_KEY);
      if (VALID[stored]) return stored;
    } catch {}
    return 'visitor';
  }

  function setRole(role) {
    if (!VALID[role]) return;
    try { window.sessionStorage.setItem(ROLE_KEY, role); } catch {}
    var url = new URL(window.location.href);
    url.searchParams.set('role', role);
    window.history.replaceState(window.history.state, '', url);
    applyRole(role);
    document.dispatchEvent(new CustomEvent('an-role-change', { detail: { role: role } }));
  }

  // Elements that link back into the app (logo, marketing nav) carry a
  // data-an-role-href template with a {role} placeholder — e.g.
  // data-an-role-href="../?role={role}". Re-resolved on every role
  // change so a toggle updates them without a page reload.
  function applyRole(role) {
    document.querySelectorAll('[data-an-role-href]').forEach(function (el) {
      var tpl = el.getAttribute('data-an-role-href');
      el.setAttribute('href', tpl.replace('{role}', role));
    });
    document.querySelectorAll('.an-demo-switch [data-role]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-role') === role));
    });
  }

  function injectStyle() {
    var style = document.createElement('style');
    style.textContent =
      '.an-demo-switch{position:fixed;left:16px;bottom:16px;z-index:9999;display:flex;' +
      'align-items:center;gap:8px;padding:7px 12px;background:rgba(20,28,38,.92);' +
      'border:1px dashed rgba(255,255,255,.28);border-radius:6px;' +
      "font-family:'JetBrains Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace;" +
      'font-size:11px;color:rgba(255,255,255,.65);letter-spacing:.04em;}' +
      '.an-demo-switch .an-demo-label{white-space:nowrap}' +
      '.an-demo-switch button{font-family:inherit;font-size:11px;font-weight:600;' +
      'letter-spacing:.03em;background:none;border:none;color:rgba(255,255,255,.55);' +
      'cursor:pointer;padding:3px 6px;border-radius:4px}' +
      '.an-demo-switch button[aria-pressed="true"]{color:#fff;background:rgba(255,255,255,.14)}' +
      '.an-demo-switch button:hover{color:#fff}' +
      '.an-demo-switch button:focus-visible{outline:2px solid #F0A829;outline-offset:1px}' +
      '.an-demo-switch .an-demo-sep{color:rgba(255,255,255,.25)}' +
      '@media (max-width:480px){.an-demo-switch{left:8px;bottom:8px;padding:6px 9px}}';
    document.head.appendChild(style);
  }

  function mount() {
    injectStyle();
    var role = currentRole();
    var el = document.createElement('div');
    el.className = 'an-demo-switch';
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', 'Demo role switch');
    el.innerHTML =
      '<span class="an-demo-label">DEMO &middot; viewing as</span>' +
      '<button type="button" data-role="visitor">Visitor</button>' +
      '<span class="an-demo-sep" aria-hidden="true">|</span>' +
      '<button type="button" data-role="client">Client</button>';
    document.body.appendChild(el);
    el.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-role]');
      if (btn) setRole(btn.getAttribute('data-role'));
    });
    applyRole(role);
  }

  window.ANDemo = { getRole: currentRole, setRole: setRole };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
