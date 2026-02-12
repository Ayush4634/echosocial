import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Aperture, PenTool, Camera, Clapperboard, Film, MessageCircle, Palette } from 'lucide-react';
import './Contact.css';



const TiltCard = ({ children }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className="profile-card"
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="card-inner-3d" style={{ transform: "translateZ(30px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

const Contact = () => {
    return (
        <section id="contact-us" className="contact-section">
            {/* Viewfinder UI Overlay */}
            <div className="viewfinder-corner top-left"></div>
            <div className="viewfinder-corner top-right"></div>
            <div className="viewfinder-corner bottom-left"></div>
            <div className="viewfinder-corner bottom-right"></div>

            {/* Creative Side Elements */}
            <div className="side-decor left-decor">
                <div className="film-strip">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="film-perforation"></div>
                    ))}
                </div>
            </div>
            <div className="side-decor right-decor">
                <motion.div
                    className="echo-star-decor"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {/* 8-Pointed Star SVG representing the brand */}
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 0L61.2 38.8L100 50L61.2 61.2L50 100L38.8 61.2L0 50L38.8 38.8L50 0Z" fill="#ff3333" opacity="0.9" />
                    </svg>
                </motion.div>
            </div>

            {/* Background Gradients & Floating Icons */}
            <div className="bg-elements">
                <div className="gradient-blob purple-blob"></div>
                <div className="gradient-blob teal-blob"></div>

                <motion.div
                    className="floating-icon icon-1"
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Camera size={60} strokeWidth={1} />
                </motion.div>

                <motion.div
                    className="floating-icon icon-2"
                    animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <Clapperboard size={80} strokeWidth={1} />
                </motion.div>

                <motion.div
                    className="floating-icon icon-3"
                    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                    <Aperture size={100} strokeWidth={1} />
                </motion.div>
            </div>

            <div className="contact-container-full">
                {/* Top: Header Section & Inquiry Text */}
                <motion.div
                    className="contact-header-top"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="contact-heading">
                        Let’s <span className="highlight-work">Work</span> Together!
                    </h2>
                    <p className="contact-subtitle">Photography • Video Editing • Content Creation • Graphic Design</p>

                    <div className="center-inquiry-block">
                        <h3 className="inquiry-title">Have a project in mind?</h3>
                        <p className="inquiry-sub">Tell us about your idea and let’s turn it into something visually powerful.</p>
                    </div>
                </motion.div>

                {/* Middle: Managed By & Cards */}

                {/* Managed By Section with Arrows */}
                <motion.div
                    className="managed-by-container"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="managed-text">Managed By</span>
                    <svg className="managed-arrows" width="850" height="130" viewBox="0 0 850 130" fill="none">
                        {/* Left Arrow: Curly Loop Style */}
                        <path d="M300 45 C 240 45 220 10 250 25 C 280 40 180 70 160 110" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" fill="none" />
                        <path d="M160 110 L 160 100 M 160 110 L 172 105" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />

                        {/* Right Arrow: Curly Loop Style */}
                        <path d="M500 45 C 560 45 580 10 550 25 C 520 40 620 70 640 110" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" fill="none" />
                        <path d="M640 110 L 640 100 M 640 110 L 628 105" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
                    </svg>
                </motion.div>

                <motion.div
                    className="contact-cards-row"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {/* Ayush Card */}
                    <div className="card-wrapper">
                        <TiltCard>
                            <div className="creative-frame">
                                <div className="profile-image-wrapper">
                                    <img src="/assets/ayush_profile.png" alt="Ayush Nikose" className="profile-image" />
                                </div>
                            </div>

                            <h4 className="card-name">AYUSH NIKOSE</h4>
                            <p className="card-role">VISUALS</p>

                            <div className="connect-section">
                                <p className="connect-label">CONNECT WITH ME</p>
                                <div className="card-socials">
                                    {/* Mail */}
                                    <a href="#" className="card-icon" aria-label="Email">
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
                                    <a href="#" className="card-icon" aria-label="Instagram">
                                        <img src="/assets/icons/instagram_new.png" alt="Instagram" className="icon-pop-hover" />
                                    </a>
                                    {/* WhatsApp */}
                                    <a href="#" className="card-icon" aria-label="WhatsApp">
                                        <img src="/assets/icons/whatsapp_new.png" alt="WhatsApp" className="icon-pop-hover" />
                                    </a>
                                </div>
                            </div>
                        </TiltCard>
                    </div>

                    {/* Gap replaces connector */}

                    {/* Kunj Card */}
                    <div className="card-wrapper">
                        <TiltCard>
                            <div className="creative-frame k-frame">
                                <div className="profile-image-wrapper">
                                    <img src="https://ui-avatars.com/api/?name=Kunj+Mehta&background=random" alt="Kunj Mehta" className="profile-image" />
                                </div>
                            </div>

                            <h4 className="card-name">KUNJ MEHTA</h4>
                            <p className="card-role">DESIGN</p>

                            <div className="connect-section">
                                <p className="connect-label">CONNECT WITH ME</p>
                                <div className="card-socials">
                                    {/* Mail */}
                                    <a href="#" className="card-icon" aria-label="Email">
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
                                    <a href="#" className="card-icon" aria-label="Instagram">
                                        <img src="/assets/icons/instagram_new.png" alt="Instagram" className="icon-pop-hover" />
                                    </a>
                                    {/* WhatsApp */}
                                    <a href="#" className="card-icon" aria-label="WhatsApp">
                                        <img src="/assets/icons/whatsapp_new.png" alt="WhatsApp" className="icon-pop-hover" />
                                    </a>
                                </div>
                            </div>
                        </TiltCard>
                    </div>
                </motion.div>
            </div>

            {/* Professional Agency Footer */}
            {/* Professional Glass Footer */}
            {/* Footer moved to global App.jsx */}
        </section>
    );
};

export default Contact;
