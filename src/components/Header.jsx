import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logoWhite from '../assets/images/logo-white.png';
import { SERVICE_KEYS, pageKeyFromPathname } from '../lib/pages.js';
import { useDemoRole } from '../contexts/DemoRoleContext.jsx';
import { quoteUrl, portalUrl, adminUrl } from '../lib/demoRole.js';
import { useExclusiveDropdown } from '../hooks/useExclusiveDropdown.js';
import {
  IconGrid,
  IconFactory,
  IconTag,
  IconCapsule,
  IconBuilding,
  IconBadge,
  IconPerson,
  IconHelp,
  IconMail,
} from './NavIcons.jsx';

// feature/nav-restructure: "Home" no longer has its own nav item — the logo
// (far left, see the <Link className="logo"> below) and the "Ally Nutra"
// nav item both link to /home instead — so every remaining item gets an
// icon (rule #3 of the brief).
const SERVICE_LINKS = [
  { to: '/services', label: 'All services', icon: IconGrid },
  { to: '/contract-manufacturing', label: 'Contract manufacturing', icon: IconFactory },
  { to: '/private-label', label: 'Private label supplements', icon: IconTag },
  { to: '/capsule-manufacturing', label: 'Capsule manufacturing', icon: IconCapsule },
];

const MAIN_LINKS = [
  { to: '/facility', label: 'Facility', icon: IconBuilding },
  { to: '/certifications', label: 'Certifications', icon: IconBadge },
  { to: '/about', label: 'About us', icon: IconPerson },
  { to: '/faq', label: 'FAQs', icon: IconHelp },
  { to: '/contact', label: 'Contact', icon: IconMail },
];

// Client-only account menu (feature/account-menu) — collapses what used to
// be a second nav row of links (feature/role-and-links) into one dropdown
// next to "Go to portal", so the header stays one row and toggling role no
// longer shifts the centered main-nav links. Labels/view ids match the
// portal's own left-rail nav verbatim (NAV in public/portal/index.html) for
// the first four; "Workspace" has no corresponding tab in the portal itself
// (it's a decorative item inside the portal's own account-menu dropdown, not
// a real view) so it links to the portal root rather than a specific view —
// left exactly as-is rather than invented as a fake tab, called out in the
// PR description.
//
// Divergence, also called out in the PR description: the portal's OWN
// account-menu dropdown (public/portal/index.html, `.menu` markup) shows
// Dashboard / Admin / Workspace / Log out — a shorter, different list than
// this one. "Admin" is deliberately not added here: this demo's role model
// (src/lib/demoRole.js) only defines `visitor` and `client`, no staff/admin
// role exists to gate an Admin item behind, so adding it would invent a
// destination and a permission tier the demo doesn't model.
const ACCOUNT_LINKS = [
  { view: 'dashboard', label: 'Dashboard' },
  { view: 'orders', label: 'Orders' },
  { view: 'documents', label: 'Documents' },
  { view: 'quotes', label: 'Quotes' },
  { view: undefined, label: 'Workspace' },
];

// Sourced from public/portal/index.html (#hdrAvatar "JW", .nm "Jordan") so
// both demo surfaces present the same identity — see the divergence note
// above for where the two intentionally differ (menu contents, not identity).
const CLIENT_INITIALS = 'JW';
const CLIENT_FIRST_NAME = 'Jordan';

// Ported from the source file's canonical header + its hash-router IIFE. Three
// pieces of interactive state that were plain DOM class toggles there:
//  - desktop Services dropdown: opens on hover via CSS (@media hover:hover in
//    global.css handles that half) AND on click via `desktopOpen`, so touch devices
//    (no hover) still get a working menu. Closes on outside click, Escape, or route
//    change — never by clicking the trigger again (matches the original comment:
//    a click always (re-)opens it, only outside-click/Escape/navigation close it).
//  - mobile hamburger menu: `mobileOpen`.
//  - mobile Services group nested inside the hamburger menu: `mobileServicesOpen`,
//    which also closes whenever the whole hamburger menu closes.
//
// Both trigger buttons carried `data-nav-link data-nav-target="services"` in the
// source AND their own toggle listener, so a click both navigates to /services and
// (re-)opens the panel/sublist in the same tick — `suppressCloseRef` reproduces
// that ordering (the router's own "close everything on route change" effect would
// otherwise immediately undo the desktop trigger's own setDesktopOpen(true)).
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentKey = pageKeyFromPathname(location.pathname);
  const onServiceView = SERVICE_KEYS.includes(currentKey);
  const { role, isClient, isAdmin, setRole } = useDemoRole();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);

  // Persistent conversion affordance: once the home hero scrolls out of view, the
  // header's call button swaps to a "Start your quote" link in the exact same slot —
  // same class, same size — so there is no second element to collide with the logo
  // or nav at any breakpoint. Driven by IntersectionObserver on #home-hero, not a
  // scroll handler. Never active off the home view (the element it observes only
  // exists there), so it is inherently absent on /contact too.
  const [heroOutOfView, setHeroOutOfView] = useState(false);
  const isHome = currentKey === 'home';

  useEffect(() => {
    if (!isHome) {
      setHeroOutOfView(false);
      return;
    }
    const heroEl = document.getElementById('home-hero');
    if (!heroEl || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroOutOfView(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  // Mobile header CTA fix: at the same width the nav collapses to a hamburger
  // (≤1100px), the persistent header slot leads with the quote CTA rather than the
  // phone number — the phone stays reachable inside the hamburger drawer (below).
  // A large amber phone button competing with "Start your quote" as the visible
  // primary action was flagged in the PR #2 follow-up audit; this is the fix.
  // Driven by matchMedia's change event, not a resize/scroll listener.
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1100px)');
    function sync() {
      setIsNarrow(mq.matches);
    }
    sync();
    if (mq.addEventListener) mq.addEventListener('change', sync);
    else if (mq.addListener) mq.addListener(sync);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', sync);
      else if (mq.removeListener) mq.removeListener(sync);
    };
  }, []);

  const showStickyQuote = currentKey !== 'contact' && (isNarrow || (isHome && heroOutOfView));

  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const accountContainerRef = useRef(null);
  const accountTriggerRef = useRef(null);
  const suppressDesktopCloseRef = useRef(false);

  // Shared open/outside-click/Escape state machine for the two desktop
  // panels — see useExclusiveDropdown.js. Registering both menus here (not
  // in an effect) means opening one automatically closes the other.
  const { openMenu, setOpenMenu, registerMenu, onEscapeKeyDown } = useExclusiveDropdown();
  registerMenu('services', { containerRef: dropdownRef, triggerRef });
  registerMenu('account', { containerRef: accountContainerRef, triggerRef: accountTriggerRef });
  const desktopOpen = openMenu === 'services';

  // Route change closes every open menu, matching goToPage()'s
  // closeMobileMenu() + closeServicesDropdown() calls — except the desktop
  // dropdown when the navigation was the dropdown trigger's own click.
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileAccountOpen(false);
    if (suppressDesktopCloseRef.current) {
      suppressDesktopCloseRef.current = false;
      return;
    }
    setOpenMenu(null);
  }, [location.pathname, setOpenMenu]);

  function onHamburgerClick() {
    setMobileOpen((open) => {
      const next = !open;
      if (!next) {
        setMobileServicesOpen(false);
        setMobileAccountOpen(false);
      }
      return next;
    });
  }

  function onDesktopTriggerClick() {
    suppressDesktopCloseRef.current = true;
    setOpenMenu('services');
    navigate('/services');
  }

  function onMobileTriggerClick() {
    setMobileServicesOpen((open) => !open);
    navigate('/services');
  }

  // Plain toggle — unlike Services, a click closes the account menu if it's
  // already open, and never navigates (this trigger only ever opens a menu).
  function onAccountTriggerClick() {
    setOpenMenu((current) => (current === 'account' ? null : 'account'));
  }

  function onMobileAccountTriggerClick() {
    setMobileAccountOpen((open) => !open);
  }

  function onLogoutClick() {
    setRole('visitor');
    setOpenMenu(null);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* fix/portal-nav-parity round 2: the logo image and the "Ally Nutra"
            nav item are two separate things, on purpose — the logo stays in
            its own spot on the left at every width (not just a <=1100px
            fallback), and "Ally Nutra" lives among the other nav items in
            .main-nav below, same as it did before this change. Image-only,
            no text here — the wordmark text belongs to the nav item, not
            to this mark. */}
        <Link to="/home" className="logo">
          <img className="logo-img" src={logoWhite} alt="Ally Nutra" width="783" height="627" />
        </Link>
        <nav className="main-nav" aria-label="Primary">
          {/* feature/nav-restructure (wordmark relocation): first item in the
              cluster, alongside Services — not a separate header element
              anymore at this width. fix/wordmark-nav-item: font-size and
              font-weight are the same --nav-item-* custom properties
              .main-nav>a:not(.nav-brand) uses (not copied literals — see
              global.css), and font-family/letter-spacing are simply
              inherited, same as every other item; colour is unconditionally
              amber and it never gets :hover — both enforced in global.css
              via :not(.nav-brand). */}
          <Link to="/home" className={`nav-brand${isHome ? ' active' : ''}`}>
            <IconCapsule />
            <span>Ally Nutra</span>
          </Link>
          <div
            className={`nav-dropdown hover-open${desktopOpen ? ' is-open' : ''}`}
            id="servicesDropdown"
            ref={dropdownRef}
            onKeyDown={onEscapeKeyDown}
          >
            <button
              ref={triggerRef}
              type="button"
              className={`nav-dropdown-trigger${onServiceView ? ' active' : ''}`}
              aria-expanded={desktopOpen ? 'true' : 'false'}
              aria-haspopup="true"
              aria-controls="servicesDropdownPanel"
              onClick={onDesktopTriggerClick}
            >
              <span>Services</span>
              <svg
                className="nav-dropdown-caret"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="nav-dropdown-panel" id="servicesDropdownPanel" role="menu" aria-label="Services">
              {SERVICE_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  role="menuitem"
                  aria-current={pageKeyFromPathname(link.to) === currentKey ? 'page' : undefined}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
          {MAIN_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
        {isClient && (
          <div
            className={`nav-dropdown account-menu${openMenu === 'account' ? ' is-open' : ''}`}
            id="accountMenu"
            ref={accountContainerRef}
            onKeyDown={onEscapeKeyDown}
          >
            <button
              ref={accountTriggerRef}
              type="button"
              className="account-trigger"
              aria-expanded={openMenu === 'account' ? 'true' : 'false'}
              aria-haspopup="true"
              aria-controls="accountMenuPanel"
              onClick={onAccountTriggerClick}
            >
              <span className="account-avatar" aria-hidden="true">
                {CLIENT_INITIALS}
              </span>
              <span className="account-name">{CLIENT_FIRST_NAME}</span>
              <svg
                className="nav-dropdown-caret"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className="nav-dropdown-panel nav-dropdown-panel--right"
              id="accountMenuPanel"
              role="menu"
              aria-label="Account"
            >
              {ACCOUNT_LINKS.map((link) => (
                <a key={link.label} href={portalUrl(role, link.view)} role="menuitem">
                  {link.label}
                </a>
              ))}
              {isAdmin && (
                <>
                  <div className="menu-divider" role="separator" />
                  {/* Staff-only — rendered only when role=admin, not merely hidden by
                      CSS, so there is nothing admin-shaped left in the DOM for a
                      client-role viewer to find. */}
                  <a href={adminUrl(role)} role="menuitem" className="menu-item-staff">
                    Admin
                    <span className="menu-item-staff-tag mono-chip">Staff</span>
                  </a>
                </>
              )}
              <div className="menu-divider" role="separator" />
              <button type="button" className="menu-item-muted" role="menuitem" onClick={onLogoutClick}>
                Logout
              </button>
            </div>
          </div>
        )}
        {isClient ? (
          <a href={portalUrl(role)} className="call-btn">
            <span>Go to portal</span>
          </a>
        ) : showStickyQuote ? (
          <a href={quoteUrl(role)} className="call-btn">
            <span>Start your quote</span>
          </a>
        ) : (
          <a href="tel:+18887205888" className="call-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.19 14.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>(888) 720-5888</span>
          </a>
        )}
        <button
          className="hamburger"
          id="hamburgerBtn"
          aria-expanded={mobileOpen ? 'true' : 'false'}
          aria-controls="mobileNav"
          aria-label="Toggle menu"
          onClick={onHamburgerClick}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        </div>
      </div>
      <nav id="mobileNav" className={`mobile-nav${mobileOpen ? ' is-open' : ''}`} aria-label="Mobile">
        <div className={`mobile-nav-group${mobileServicesOpen ? ' is-open' : ''}`} id="mobileServicesGroup">
          <button
            type="button"
            className={`mobile-nav-group-trigger${onServiceView ? ' active' : ''}`}
            aria-expanded={mobileServicesOpen ? 'true' : 'false'}
            aria-controls="mobileServicesList"
            onClick={onMobileTriggerClick}
          >
            <span className="mobile-nav-label"><IconGrid /><span>Services</span></span>
            <svg
              className="nav-dropdown-caret"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className="mobile-nav-sublist" id="mobileServicesList">
            {SERVICE_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={pageKeyFromPathname(link.to) === currentKey ? 'page' : undefined}
              >
                <link.icon />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
        {MAIN_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <link.icon />
            <span>{link.label}</span>
          </NavLink>
        ))}
        {isClient && (
          <div className={`mobile-nav-group${mobileAccountOpen ? ' is-open' : ''}`} id="mobileAccountGroup">
            <button
              type="button"
              className="mobile-nav-group-trigger"
              aria-expanded={mobileAccountOpen ? 'true' : 'false'}
              aria-controls="mobileAccountList"
              onClick={onMobileAccountTriggerClick}
            >
              <span className="mobile-account-label">
                <span className="account-avatar" aria-hidden="true">
                  {CLIENT_INITIALS}
                </span>
                {CLIENT_FIRST_NAME}
              </span>
              <svg
                className="nav-dropdown-caret"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="mobile-nav-sublist" id="mobileAccountList">
              {ACCOUNT_LINKS.map((link) => (
                <a key={link.label} href={portalUrl(role, link.view)}>
                  {link.label}
                </a>
              ))}
              {isAdmin && (
                <>
                  <div className="menu-divider mobile-menu-divider" role="separator" />
                  <a href={adminUrl(role)} className="menu-item-staff mobile-menu-item-staff">
                    Admin
                    <span className="menu-item-staff-tag mono-chip">Staff</span>
                  </a>
                </>
              )}
              <div className="menu-divider mobile-menu-divider" role="separator" />
              <button type="button" className="mobile-nav-sublist-logout" onClick={onLogoutClick}>
                Logout
              </button>
            </div>
          </div>
        )}
        <a href="tel:+18887205888" className="btn btn-primary call-btn">
          Call (888) 720-5888
        </a>
      </nav>
    </header>
  );
}
