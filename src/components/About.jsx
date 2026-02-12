import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowRight, Star } from 'lucide-react';
import ayushProfileNew from '../assets/ayush_profile_v2.png';
import kunjProfileNew from '../assets/kunj_profile_new.jpg';
import './About.css';

// Using actual image
const ayushImg = ayushProfileNew;

const About = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="about-container" id="about-container">
            <div className="about-content-wrapper">

                {/* LEFT COLUMN: Intro & Contact Info */}
                <motion.div
                    className="about-left"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h4 className="section-greeting">Hello, We Are</h4>
                    <h1 className="brand-title">
                        <span className="star-element red-star">
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 0L61 35L95 35L68 57L79 91L50 70L21 91L32 57L5 35L39 35L50 0Z" fill="#ff4d4d" />
                            </svg>
                        </span>
                        Echo <span className="brand-social-serif">Social</span>
                        <span className="star-element blue-flower">
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 0 L60 35 L95 25 L70 50 L95 75 L60 65 L50 100 L40 65 L5 75 L30 50 L5 25 L40 35 Z" fill="#4d79ff" />
                            </svg>
                        </span>
                    </h1>

                    <p className="brand-description">
                        We turn brands into conversations people actually remember.
                        <br /><br />
                        Our focus lies in <span className="highlight">social media strategy, brand identity, and content creation</span>.
                        We design engaging digital experiences that resonate with audiences and drive real engagement.
                    </p>

                    <div className="about-footer-info">
                        <p className="footer-tagline">Let's build something meaningful together.</p>

                        <div className="contact-rows">
                            {/* Row 1: Mail and Location */}
                            <div className="contact-row">
                                <a href="mailto:helloechosocial@gmail.com" className="contact-pill">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg> helloechosocial@gmail.com
                                </a>
                                <a href="https://www.google.com/maps/search/?api=1&query=Ahmedabad,+Gujarat,+India" target="_blank" rel="noreferrer" className="contact-pill">
                                    <MapPin size={18} /> Ahmedabad, Gujarat, India
                                </a>
                            </div>

                            {/* Row 2: Phone Numbers */}
                            <div className="contact-row">
                                <a href="tel:+919723192377" className="contact-pill">
                                    <Phone size={18} /> +91 97231 92377
                                </a>
                                <a href="tel:+916355678569" className="contact-pill">
                                    <Phone size={18} /> +91 63556 78569
                                </a>
                            </div>
                        </div>
                    </div>

                </motion.div>

                {/* RIGHT COLUMN: What We Do & Team */}
                <motion.div
                    className="about-right"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0, x: 50 },
                        visible: {
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 0.8,
                                ease: "easeOut",
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >

                    {/* What We Do Section */}
                    <div className="info-card what-we-do">

                        <h3 className="card-heading our-approach-heading">
                            <span className="oa-sans">Our</span> <span className="oa-serif">Approach</span>
                        </h3>
                        <div className="services-cloud">
                            {/* Row 1: First 3 tags */}
                            <div className="services-row">
                                {["Strategy before content", "Visuals that tell stories", "Built for social-first brands"].map((service, index) => {
                                    const colors = ["purple", "green", "orange"];
                                    return (
                                        <motion.span
                                            key={service}
                                            className={`service-tag ${colors[index]}`}
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.8 },
                                                visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {service}
                                        </motion.span>
                                    );
                                })}
                            </div>

                            {/* Row 2: Remaining 2 tags */}
                            <div className="services-row">
                                {["Design with purpose", "Consistency across every post"].map((service, index) => {
                                    const colors = ["gray", "pink"];
                                    return (
                                        <motion.span
                                            key={service}
                                            className={`service-tag ${colors[index]}`}
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.8 },
                                                visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {service}
                                        </motion.span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Managed By Section */}
                    <div className="info-card managed-by">

                        <h3 className="card-heading our-approach-heading">
                            <span className="oa-sans">Managed</span> <span className="oa-serif">By</span>
                        </h3>
                        <motion.div
                            className="profiles-row"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
                            }}
                        >

                            {/* Ayush */}
                            <motion.div
                                className="profile-item"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <div className="profile-circle-wrapper">
                                    <img src={ayushImg} alt="Ayush Nikose" className="profile-img" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Ayush+Nikose&background=0D8ABC&color=fff' }} />
                                </div>
                                <h4 className="profile-name">
                                    <span className="profile-sans">Ayush</span> <span className="profile-sans">Nikose</span>
                                </h4>
                                <p className="profile-role">Photography · Video Editing<br />Content Creation · Drone Visuals</p>

                                <div className="connect-section">
                                    <h5 className="connect-heading">CONNECT WITH ME</h5>
                                    <div className="connect-icons">
                                        {/* Mail */}
                                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ayushnikose@gmail.com" target="_blank" rel="noopener noreferrer">
                                            <svg viewBox="0 0 48 48" className="icon-pop-hover">
                                                <rect width="48" height="48" fill="rgba(0,0,0,0)" />
                                                <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path>
                                                <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
                                                <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 6,16.2 13,23.7 24,31.95 35,23.7 42,16.2"></polygon>
                                                <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path>
                                                <path fill="#c62828" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0C43.076,8,45,9.924,45,12.298z"></path>
                                            </svg>
                                        </a>
                                        {/* Instagram */}
                                        <a href="https://www.instagram.com/ayushh.jpeg/" target="_blank" rel="noopener noreferrer">
                                            <img src="/assets/icons/instagram_new.png" alt="Instagram" className="icon-pop-hover" />
                                        </a>
                                        {/* WhatsApp */}
                                        <a href="https://api.whatsapp.com/send?phone=919723192377&text=Hello,%20Ayush%20Nikose" target="_blank" rel="noopener noreferrer">
                                            <img src="/assets/icons/whatsapp_3d.png" alt="WhatsApp" className="icon-pop-hover" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="vertical-divider"></div>

                            {/* Kunj */}
                            <motion.div
                                className="profile-item"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <div className="profile-circle-wrapper">
                                    <img src={kunjProfileNew} alt="Kunj Mehta" className="profile-img" />
                                </div>
                                <h4 className="profile-name">
                                    <span className="profile-sans">Kunj</span> <span className="profile-sans">Mehta</span>
                                </h4>
                                <p className="profile-role">Reels · Editing <br /> Typography · Visual Design</p>

                                <div className="connect-section">
                                    <h5 className="connect-heading">CONNECT WITH ME</h5>
                                    <div className="connect-icons">
                                        {/* Mail */}
                                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mehtakunj1604@gmail.com" target="_blank" rel="noopener noreferrer">
                                            <svg viewBox="0 0 48 48" className="icon-pop-hover">
                                                <rect width="48" height="48" fill="rgba(0,0,0,0)" />
                                                <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path>
                                                <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
                                                <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 6,16.2 13,23.7 24,31.95 35,23.7 42,16.2"></polygon>
                                                <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path>
                                                <path fill="#c62828" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0C43.076,8,45,9.924,45,12.298z"></path>
                                            </svg>
                                        </a>
                                        {/* Instagram */}
                                        <a href="https://www.instagram.com/in_kunj04/" target="_blank" rel="noopener noreferrer">
                                            <img src="/assets/icons/instagram_new.png" alt="Instagram" className="icon-pop-hover" />
                                        </a>
                                        {/* WhatsApp */}
                                        <a href="https://api.whatsapp.com/send?phone=916355678569&text=Hello,%20Kunj%20Mehta" target="_blank" rel="noopener noreferrer">
                                            <img src="/assets/icons/whatsapp_3d.png" alt="WhatsApp" className="icon-pop-hover" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>



                </motion.div>
            </div>

            {/* Decorative Background Elements */}
            <div className="decorations-wrapper">
                {/* 1. Orange Crosses (Top Right) */}
                <div className="decor-element orange-crosses">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                        <path d="M20 20 L30 30 M30 20 L20 30" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                        <path d="M70 10 L80 20 M80 10 L70 20" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                        <path d="M50 50 L60 60 M60 50 L50 60" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </div>

                {/* 2. Purple Wavy Line (Bottom Left) */}
                <div className="decor-element purple-wave">
                    <svg width="150" height="50" viewBox="0 0 150 50" fill="none">
                        <path d="M10 25 Q 30 5, 50 25 T 90 25 T 130 25" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" fill="none" />
                    </svg>
                </div>

                {/* 3. Yellow Dots Grid (Bottom Right) */}
                <div className="decor-element yellow-dots">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                        <circle cx="20" cy="20" r="3" fill="#eab308" />
                        <circle cx="50" cy="20" r="3" fill="#eab308" />
                        <circle cx="80" cy="20" r="3" fill="#eab308" />
                        <circle cx="20" cy="50" r="3" fill="#eab308" />
                        <circle cx="50" cy="50" r="3" fill="#eab308" />
                        <circle cx="80" cy="50" r="3" fill="#eab308" />
                        <circle cx="20" cy="80" r="3" fill="#eab308" />
                        <circle cx="50" cy="80" r="3" fill="#eab308" />
                        <circle cx="80" cy="80" r="3" fill="#eab308" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default About;
