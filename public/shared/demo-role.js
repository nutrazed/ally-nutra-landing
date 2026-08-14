// ════════════════════════════════════════════════════════════════
// AN-DEMO role switch — shared by public/quote/index.html,
// public/portal/index.html, and public/admin/index.html
// (feature/role-and-links, feature/admin-role). This is a
// presentation-only role toggle: there is no auth, no account, no
// server. Loaded via a plain <script src> since these pages are
// static files copied verbatim by Vite, not built React components.
//
// *** SECURITY NOTE — READ BEFORE REUSING ANY OF THIS ***
// A `?role=admin` URL parameter that reveals an admin interface is NOT
// access control. Anyone can type the param and see the admin surface —
// there is no server-side check, no session, no permission of any kind
// behind it. Fine for a demo/prototype; a serious vulnerability if this
// pattern (or this code) ever shipped to a real product.
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
  var VALID = { visitor: true, client: true, admin: true };
  var OPTIONS = [
    { value: 'visitor', label: 'Visitor' },
    { value: 'client', label: 'Client' },
    { value: 'admin', label: 'Admin' },
  ];

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
    document.querySelectorAll('.an-demo-switch [data-an-role]').forEach(function (btn) {
      var checked = btn.getAttribute('data-an-role') === role;
      btn.setAttribute('aria-checked', String(checked));
      btn.tabIndex = checked ? 0 : -1;
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
      '.an-demo-switch button[aria-checked="true"]{color:#fff;background:rgba(255,255,255,.14)}' +
      '.an-demo-switch button:hover{color:#fff}' +
      '.an-demo-switch button:focus-visible{outline:2px solid #F0A829;outline-offset:1px}' +
      '.an-demo-switch .an-demo-sep{color:rgba(255,255,255,.25)}' +
      '@media (max-width:480px){.an-demo-switch{left:8px;bottom:8px;padding:6px 9px}}';
    document.head.appendChild(style);
  }

  // role="radiogroup" + roving tabindex — Tab moves into/out of the group
  // as one stop, ArrowLeft/ArrowRight move the checked option within it,
  // same pattern as the React DemoRoleSwitch component.
  function mount() {
    injectStyle();
    var role = currentRole();
    var el = document.createElement('div');
    el.className = 'an-demo-switch';
    el.setAttribute('role', 'radiogroup');
    el.setAttribute('aria-label', 'Demo role switch');

    var html = '<span class="an-demo-label">DEMO &middot; viewing as</span>';
    OPTIONS.forEach(function (opt, i) {
      if (i > 0) html += '<span class="an-demo-sep" aria-hidden="true">|</span>';
      html += '<button type="button" role="radio" data-an-role="' + opt.value + '">' + opt.label + '</button>';
    });
    el.innerHTML = html;
    document.body.appendChild(el);

    el.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-an-role]');
      if (btn) setRole(btn.getAttribute('data-an-role'));
    });
    el.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var btn = e.target.closest('[data-an-role]');
      if (!btn) return;
      e.preventDefault();
      var index = OPTIONS.findIndex(function (opt) { return opt.value === btn.getAttribute('data-an-role'); });
      var dir = e.key === 'ArrowRight' ? 1 : -1;
      var nextIndex = (index + dir + OPTIONS.length) % OPTIONS.length;
      var nextRole = OPTIONS[nextIndex].value;
      setRole(nextRole);
      var nextBtn = el.querySelector('[data-an-role="' + nextRole + '"]');
      if (nextBtn) nextBtn.focus();
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
