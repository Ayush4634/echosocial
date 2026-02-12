import React, { useEffect } from 'react';
import './PrivacyPolicy.css'; // Reusing the same styles for consistency
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
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
                        Terms & Conditions
                        <span className="hide-on-mobile"> – </span>
                        <br className="show-on-mobile" />
                        Echo Social Agency
                    </h1>
                    <p className="effective-date">Effective Date: 1 January 2026</p>
                    <div className="privacy-divider-line"></div>
                </header>

                <div className="privacy-content">
                    <p className="privacy-intro">
                        These Terms & Conditions govern the use of the Echo Social Agency website and services. By accessing our website or engaging with our services, you agree to be bound by these terms.
                    </p>

                    <section className="privacy-section">
                        <h2>1. Services</h2>
                        <ul>
                            <li>Echo Social Agency provides services including but not limited to photography, videography, video editing, graphic design, branding, and social media management.</li>
                            <li>Service details, timelines, and pricing are confirmed on a project-to-project basis.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>2. Use of Website</h2>
                        <ul>
                            <li>You agree to use our website only for lawful purposes.</li>
                            <li>Unauthorized use, copying, or misuse of website content is prohibited.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>3. Intellectual Property</h2>
                        <ul>
                            <li>All content, designs, logos, images, videos, and text are the intellectual property of Echo Social Agency unless stated otherwise.</li>
                            <li>Clients receive usage rights only as agreed in writing.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>4. Payments & Refunds</h2>
                        <ul>
                            <li>Payments must be made as per agreed terms before or during project execution.</li>
                            <li>Advance payments are non-refundable unless otherwise stated.</li>
                            <li>Refunds, if applicable, will be processed based on project status and agreement.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>5. Client Responsibilities</h2>
                        <ul>
                            <li>Clients must provide accurate information, content, and approvals in a timely manner.</li>
                            <li>Delays caused by the client may affect delivery timelines.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>6. Limitation of Liability</h2>
                        <ul>
                            <li>Echo Social Agency shall not be liable for indirect or consequential damages.</li>
                            <li>We are not responsible for losses arising from third-party platforms or services.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>7. Termination</h2>
                        <ul>
                            <li>We reserve the right to suspend or terminate services if terms are violated.</li>
                            <li>Clients may terminate services as per agreed contract terms.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>8. Third-Party Tools & Platforms</h2>
                        <ul>
                            <li>We may use third-party tools such as social media platforms, hosting services, or analytics tools.</li>
                            <li>Echo Social Agency is not responsible for third-party service changes or outages.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>9. Governing Law</h2>
                        <ul>
                            <li>These terms shall be governed by and interpreted according to the laws of India.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>10. Changes to Terms</h2>
                        <ul>
                            <li>We may update these Terms & Conditions at any time.</li>
                            <li>Continued use of services constitutes acceptance of updated terms.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>11. Contact Information</h2>
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

export default Terms;
