import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './views/Home.jsx';
import Services from './views/Services.jsx';
import ContractManufacturing from './views/ContractManufacturing.jsx';
import PrivateLabel from './views/PrivateLabel.jsx';
import CapsuleManufacturing from './views/CapsuleManufacturing.jsx';
import Facility from './views/Facility.jsx';
import Certifications from './views/Certifications.jsx';
import About from './views/About.jsx';
import Faq from './views/Faq.jsx';
import Contact from './views/Contact.jsx';
import { TITLES, pageKeyFromPathname } from './lib/pages.js';

// Canonical header/footer layout wrapping every page-view, mirroring the source
// file's single <header>/<main>/<footer> shell that the old hash-router toggled
// section[data-page] visibility inside of. react-router now owns which view renders
// (via <Outlet/>), so this layout only needs to reproduce the two side-effects the
// old router's activate()/goToPage() used to run on every navigation: scroll to top,
// and set document.title from the same TITLES map.
function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const key = pageKeyFromPathname(location.pathname);
    document.title = TITLES[key] || 'Ally Nutra';
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contract-manufacturing" element={<ContractManufacturing />} />
          <Route path="/private-label" element={<PrivateLabel />} />
          <Route path="/capsule-manufacturing" element={<CapsuleManufacturing />} />
          <Route path="/facility" element={<Facility />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
