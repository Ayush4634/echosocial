import React, { useEffect } from 'react';
import './PrivacyPolicy.css';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-page">
            <div className="privacy-container">
                <button onClick={() => navigate('/')} className="back-button">
                    <ArrowLeft size={20} /> Back to Home
                </button>
                <header className="privacy-header">
                    <h1 className="privacy-title">
                        Privacy Policy
                        <span className="hide-on-mobile"> – </span>
                        <br className="show-on-mobile" />
                        Echo Social Agency
                    </h1>
                    <p className="effective-date">Effective Date: 1 January 2026</p>
                    <div className="privacy-divider-line"></div>
                </header>

                <div className="privacy-content">
                    <p className="privacy-intro">
                        Echo Social Agency ('we', 'our', or 'us') values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect information when you interact with our website, services, or communication channels.
                    </p>

                    <section className="privacy-section">
                        <h2>1. Information We Collect</h2>
                        <ul>
                            <li><strong>Personal Information:</strong> such as name, email address, phone number, company name, and project details submitted through contact forms or communication.</li>
                            <li><strong>Technical Data:</strong> including IP address, browser type, device information, pages visited, and cookies.</li>
                            <li><strong>Business Information:</strong> shared for project inquiries, collaborations, or service agreements.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>2. How We Use Your Information</h2>
                        <ul>
                            <li>To respond to inquiries and provide our services.</li>
                            <li>To improve website functionality, content, and user experience.</li>
                            <li>To communicate updates, proposals, and service-related information.</li>
                            <li>To comply with legal and regulatory obligations.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>3. Sharing of Information</h2>
                        <ul>
                            <li>We do not sell or rent personal data.</li>
                            <li>Information may be shared with trusted partners only when required to deliver services.</li>
                            <li>We may disclose information when required by law or legal process.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>4. Data Security</h2>
                        <ul>
                            <li>We implement technical and organizational security measures to protect your information.</li>
                            <li>No method of internet transmission or storage is completely secure, but we strive to use commercially acceptable protection methods.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>5. Cookies and Tracking</h2>
                        <ul>
                            <li>Our website may use cookies to analyze traffic and improve user experience.</li>
                            <li>You can manage or disable cookies through browser settings.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>6. Your Rights</h2>
                        <ul>
                            <li>You may request access, correction, or deletion of your personal data.</li>
                            <li>You may opt out of marketing communications at any time.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>7. Third-Party Links</h2>
                        <ul>
                            <li>Our website may contain links to third-party platforms.</li>
                            <li>We are not responsible for their privacy policies or content.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>8. Policy Updates</h2>
                        <ul>
                            <li>This Privacy Policy may be updated periodically.</li>
                            <li>Updates will be posted on this page with a revised effective date.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>9. Contact Information</h2>
                        <ul className="contact-list-plain">
                            <li>Echo Social Agency</li>
                            <li>Email: helloechosocial@gmail.com</li>
                            <li>Phone: +91-97231 92377</li>
                            <li>Location: Ahmedabad, India</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
