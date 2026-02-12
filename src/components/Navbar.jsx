import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import echoLogo from '../assets/echo_logo_final.png';
import echoLogoWhite from '../assets/echo_logo_white.png';
// Using the new colored logo for dark mode sections
import echoLogoColoredDark from '../assets/echo_logo_colored_dark_bg.png';
import './Navbar.css';
import MediaPreloader from '../utils/mediaPreloader';

import useIsScrolling from '../hooks/useIsScrolling';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const navItems = ['About Us', 'Services', 'Projects'];
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    // Detect scrolling status
    // const isScrolling = useIsScrolling(150); // Removed timer-based logic for visibility
    const [isNavVisible, setIsNavVisible] = useState(true);
    const lastScrollY = React.useRef(0); // Track last scroll position

    const darkSections = ['software-used', 'personal-project', 'event-project', 'employee-party', 'footer-section'];

    const allSections = [
        'about-container', 'services', 'software-used', 'projects',
        'cerebrum-project', 'whitford-project', 'personal-project',
        'event-project', 'employee-party', 'contact-us',
        'get-in-touch-page', 'get-in-touch-card', 'footer-section'
    ];

    const [isHero, setIsHero] = useState(true);

    // Removed the timer-based useEffect 
    // useEffect(() => { ... }, [isScrolling]); 

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroHeight = window.innerHeight * 0.8;

            // 1. Hero / Logo Logic
            const newIsHero = currentScrollY < heroHeight;
            setIsHero(newIsHero);
            if (newIsHero) setIsOpen(false);

            // 2. Scroll Direction Logic (Show/Hide Navbar)
            if (currentScrollY > 100) {
                // If scrolling DOWN and not at top -> Hide
                if (currentScrollY > lastScrollY.current) {
                    setIsNavVisible(false);
                }
                // If scrolling UP -> Show
                else {
                    setIsNavVisible(true);
                }
            } else {
                // Always show at the very top
                setIsNavVisible(true);
            }
            lastScrollY.current = currentScrollY; // Update last position

            // 3. Active Section Logic
            let currentActive = '';
            for (const section of allSections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Detect section when it reaches the bottom of the navbar (70px height)
                    if (rect.top <= 70) {
                        currentActive = section;
                    }
                }
            }
            if (currentActive) setActiveSection(currentActive);
            else setActiveSection('');
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const isDarkMode = darkSections.includes(activeSection);

    return (
        <>
            <AnimatePresence>
                {/* Navbar is now always rendered, visibility controlled by isNavVisible and scroll */}
                <motion.nav
                    className={`navbar ${isOpen ? 'menu-open' : ''}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Unified Glass "Pill" Container */}
                    <motion.div
                        className={`nav-glass-container ${isDarkMode ? 'dark-mode-glass' : ''}`}
                        initial={{ y: 0 }}
                        animate={{
                            y: isNavVisible ? 0 : -100, // Move up out of view
                            opacity: isNavVisible ? 1 : 0
                        }}
                        transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smooth "pop"
                        }}
                    >
                        {/* Logo Section - Hidden on Hero */}
                        <div
                            className="nav-logo-wrapper"
                            style={{
                                opacity: (isOpen || !(isHomePage && isHero)) ? 1 : 0,
                                pointerEvents: (isOpen || !(isHomePage && isHero)) ? 'auto' : 'none',
                                transition: 'opacity 0.25s ease' // Slightly faster transition
                            }}
                        >
                            <Link
                                to="/"
                                onClick={() => {
                                    setIsOpen(false);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="logo-link"
                            >
                                {/* Triple-Layer Logo: All pre-loaded, switched via CSS for zero-latency color changes */}
                                <img
                                    src={echoLogoWhite}
                                    alt="Echo Social"
                                    className={`navbar-logo-img logo-white ${isOpen || (isDarkMode || activeSection === 'contact-us') ? 'visible' : ''}`}
                                />
                                <img
                                    src={echoLogoColoredDark}
                                    alt="Echo Social"
                                    className={`navbar-logo-img logo-colored-dark ${(!isOpen && isDarkMode && activeSection !== 'contact-us') ? 'visible' : ''}`}
                                />
                                <img
                                    src={echoLogo}
                                    alt="Echo Social"
                                    className={`navbar-logo-img logo-default ${(!isOpen && !isDarkMode && activeSection !== 'contact-us') ? 'visible' : ''}`}
                                />
                            </Link>
                        </div>
                        {/* Nav Items (Desktop) */}
                        <ul className="nav-list">
                            {navItems.map((item) => {
                                const linkId = item.replace(/\s+/g, '-').toLowerCase();
                                // Redirect 'contact-us' to 'about-container' since pages are merged
                                const targetId = linkId === 'contact-us' ? 'about-container' : (linkId === 'about-us' ? 'about-container' : linkId);
                                return (
                                    <li key={item} className="nav-item">
                                        <a
                                            href={`/#${targetId}`}
                                            className={`nav-link ${activeSection === linkId ? 'active' : ''} ${isDarkMode ? 'white-text' : ''}`}
                                            onMouseEnter={() => MediaPreloader.preloadCriticalAssets()}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* CTA Button (Desktop) */}
                        <div className="nav-cta-wrapper">
                            <Link to="/contact-live" className="nav-cta-btn">
                                <span className="cta-text">Get In Touch</span>
                                <span className="cta-icon-circle">
                                    {/* Using Lucide ArrowUpRight, but referencing standard SVG for stability if needed. Lucide is fine. */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7 7 17 7 17 17"></polyline>
                                    </svg>
                                </span>
                            </Link>
                        </div>

                        {/* Mobile Hamburger (Mobile Only) - Now INSIDE the pill */}
                        <div className="mobile-menu-btn" onClick={toggleMenu} style={{ color: isDarkMode ? '#fff' : '#000' }}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </div>

                    </motion.div>
                </motion.nav>
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            < AnimatePresence >
                {isOpen && (
                    <motion.div
                        className="mobile-nav-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ul className="mobile-nav-list">
                            {navItems.map((item) => {
                                const linkId = item.replace(/\s+/g, '-').toLowerCase();
                                const targetId = linkId === 'contact-us' ? 'about-container' : (linkId === 'about-us' ? 'about-container' : linkId);
                                return (
                                    <li key={item} className="mobile-nav-item" onClick={() => setIsOpen(false)}>
                                        <a href={`/#${targetId}`} className="mobile-nav-link">
                                            {item}
                                        </a>
                                    </li>
                                );
                            })}
                            {/* Explicit Get In Touch Item - Exact Replica of Desktop Button */}
                            <li className="mobile-nav-item">
                                <Link
                                    to="/contact-live"
                                    className="nav-cta-btn"
                                    onClick={() => setIsOpen(false)}
                                    style={{ margin: '0 auto' }}
                                >
                                    <span className="cta-text">Get In Touch</span>
                                    <span className="cta-icon-circle">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )
                }
            </AnimatePresence >
        </>
    );
};

export default Navbar;
