import { Link } from 'react-router-dom';
import logoWhite from '../assets/images/logo-white.png';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img className="footer-logo-img" src={logoWhite} alt="" width="783" height="627" />
            <p>
              A US-based contract supplement manufacturer helping wellness brands launch, scale,
              and stay on shelf. cGMP certified. FDA registered. Built for partnership.
            </p>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><Link to="/services">Contract manufacturing</Link></li>
              <li><Link to="/services">Private label</Link></li>
              <li><Link to="/services">Capsule manufacturing</Link></li>
              <li><Link to="/services">All services</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/facility">Facility</Link></li>
              <li><Link to="/certifications">Certifications</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Get in touch</h5>
            <ul>
              <li><a href="tel:+18887205888">+1 (888) 720-5888</a></li>
              <li><a href="mailto:hello@allynutra.com">hello@allynutra.com</a></li>
              <li>Dover, Delaware<br />United States</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ally Nutra LLC. All rights reserved.</span>
          <span>Privacy · Terms · Sitemap</span>
        </div>
      </div>
    </footer>
  );
}
