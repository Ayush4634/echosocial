import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer id="footer-section" className="glass-footer">
            <div className="footer-glass-container">
                <div className="footer-grid">
                    <div className="footer-col brand-col">
                        <img src="/assets/echo_social_logo_footer.png" alt="Echo Social" className="footer-brand-logo" />
                        <div className="footer-socials">
                            <a href="https://www.instagram.com/ayushh.jpeg/?hl=en" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram"><Instagram size={18} /></a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=helloechosocial@gmail.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Mail"><Mail size={18} /></a>
                            <a href="tel:+919723192377" className="social-link" aria-label="Phone"><Phone size={18} /></a>
                        </div>
                    </div>

                    {/* Column 2: Services */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Services</h4>
                        <ul className="footer-links-list services-list">
                            <li><a href="#">Photography</a></li>
                            <li><a href="#">Video Production</a></li>
                            <li><a href="#">Social Media Management</a></li>
                            <li><a href="#">Graphic Design</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Company</h4>
                        <ul className="footer-links-list">
                            <li><a href="/#about-container">About Us</a></li>
                            <li><a href="/#projects">Our Work</a></li>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Get in Touch</h4>
                        <ul className="footer-contact-list">
                            <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=helloechosocial@gmail.com" target="_blank" rel="noopener noreferrer">helloechosocial@gmail.com</a></li>
                            <li><a href="tel:+919723192377">+91-97231 92377</a></li>
                            <li><a href="tel:+916355678569">+91-63556 78569</a></li>
                            <li><span>Ahmedabad, Gujarat, India</span></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <p className="copyright-text">© 2026 Echo Social. All rights reserved.</p>
                    <p className="created-by-text">Created by Ayush Nikose</p>
                    <div className="footer-bottom-links">
                        <Link to="/terms">Terms & Conditions</Link>
                        <span className="separator">•</span>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
