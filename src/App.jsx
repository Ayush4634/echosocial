import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import SoftwareUsed from './components/SoftwareUsed';
import Projects from './components/Projects';
import CerebrumProject from './components/CerebrumProject';
import DualVideoShowcase from './components/DualVideoShowcase';
import WhitfordProject from './components/WhitfordProject';
import PersonalProject from './components/PersonalProject';
import EventProject from './components/EventProject';
import EmployeeParty from './components/EmployeeParty';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';

import Footer from './components/Footer';
import GetInTouch from './components/GetInTouch';
import Preloader from './components/Preloader';


function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Enforce scroll to top on refresh/load
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        // Optional: Reset to auto if you leave this app, but for SPA it's fine.

        // Initialize Lenis for Smooth Scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: false, // Performance test: disabled smooth scroll
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });
        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <AnimatePresence>
                {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {/* Main Content mounts behind the Preloader (which is z-9999) */}
            <Navbar /> {/* Moved outside app-container to ensure position: fixed works correctly */}

            {/* Main Content mounts behind the Preloader (which is z-9999) */}
            <motion.div
                className="app-container"
                initial={{ y: "100%" }}
                animate={{ y: loading ? "100%" : "0%" }}
                transition={{
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1]
                }}
            >
                <Routes>
                    <Route path="/" element={
                        <div className="global-scale-wrapper">
                            <main>
                                <Hero showHero={!loading} />
                                <About />
                                <Services />
                                <SoftwareUsed />
                                <Projects />
                                <CerebrumProject />
                                <DualVideoShowcase />
                                <WhitfordProject />
                                <PersonalProject />
                                <EventProject />
                                <EmployeeParty />
                            </main>
                        </div>
                    } />
                    <Route path="/contact-live" element={
                        <div className="global-scale-wrapper">
                            <GetInTouch />
                        </div>
                    } />
                    <Route path="/privacy-policy" element={
                        <div className="global-scale-wrapper">
                            <PrivacyPolicy />
                        </div>
                    } />
                    <Route path="/terms" element={
                        <div className="global-scale-wrapper">
                            <Terms />
                        </div>
                    } />
                </Routes>
                <Footer />
            </motion.div>
        </Router>
    );
}

export default App;
