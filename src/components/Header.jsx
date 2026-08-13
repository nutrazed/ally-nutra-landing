import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logoWhite from '../assets/images/logo-white.png';
import { SERVICE_KEYS, pageKeyFromPathname } from '../lib/pages.js';

const SERVICE_LINKS = [
  { to: '/services', label: 'All services' },
  { to: '/contract-manufacturing', label: 'Contract manufacturing' },
  { to: '/private-label', label: 'Private label supplements' },
  { to: '/capsule-manufacturing', label: 'Capsule manufacturing' },
];

const MAIN_LINKS = [
  { to: '/facility', label: 'Facility' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/about', label: 'About us' },
  { to: '/faq', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
];

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

  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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
  const suppressDesktopCloseRef = useRef(false);

  // Route change closes every open menu, matching goToPage()'s
  // closeMobileMenu() + closeServicesDropdown() calls — except the desktop
  // dropdown when the navigation was the dropdown trigger's own click.
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    if (suppressDesktopCloseRef.current) {
      suppressDesktopCloseRef.current = false;
      return;
    }
    setDesktopOpen(false);
  }, [location.pathname]);

  // Outside click closes the desktop dropdown only.
  useEffect(() => {
    if (!desktopOpen) return;
    function onDocClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDesktopOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [desktopOpen]);

  function onDropdownKeyDown(e) {
    if (e.key === 'Escape') {
      setDesktopOpen(false);
      triggerRef.current?.focus();
    }
  }

  function onHamburgerClick() {
    setMobileOpen((open) => {
      const next = !open;
      if (!next) setMobileServicesOpen(false);
      return next;
    });
  }

  function onDesktopTriggerClick() {
    suppressDesktopCloseRef.current = true;
    setDesktopOpen(true);
    navigate('/services');
  }

  function onMobileTriggerClick() {
    setMobileServicesOpen((open) => !open);
    navigate('/services');
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/home" className="logo">
          <img className="logo-img" src={logoWhite} alt="Ally Nutra" width="783" height="627" />
        </Link>
        <nav className="main-nav" aria-label="Primary">
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Home
          </NavLink>
          <div
            className={`nav-dropdown${desktopOpen ? ' is-open' : ''}`}
            id="servicesDropdown"
            ref={dropdownRef}
            onKeyDown={onDropdownKeyDown}
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
              Services
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
                  {link.label}
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
              {link.label}
            </NavLink>
          ))}
        </nav>
        {showStickyQuote ? (
          <Link to="/contact" className="call-btn">
            <span>Start your quote</span>
          </Link>
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
      <nav id="mobileNav" className={`mobile-nav${mobileOpen ? ' is-open' : ''}`} aria-label="Mobile">
        <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : undefined)}>
          Home
        </NavLink>
        <div className={`mobile-nav-group${mobileServicesOpen ? ' is-open' : ''}`} id="mobileServicesGroup">
          <button
            type="button"
            className={`mobile-nav-group-trigger${onServiceView ? ' active' : ''}`}
            aria-expanded={mobileServicesOpen ? 'true' : 'false'}
            aria-controls="mobileServicesList"
            onClick={onMobileTriggerClick}
          >
            Services
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
                {link.label}
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
            {link.label}
          </NavLink>
        ))}
        <a href="tel:+18887205888" className="btn btn-primary call-btn">
          Call (888) 720-5888
        </a>
      </nav>
    </header>
  );
}
