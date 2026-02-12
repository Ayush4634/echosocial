import React from 'react';
import { motion } from 'framer-motion';
import { Image, Info } from 'lucide-react';
import './EventProject.css';

const EventProject = () => {
    // Stagger container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    // Individual item reveal
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.215, 0.610, 0.355, 1.000] // easeOutCubic
            }
        }
    };

    // Logo reveal
    const logoVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.5 }
        }
    };

    return (
        <section id="event-project" className="event-project-section">
            <motion.div
                className="event-bg-overlay"
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            ></motion.div>

            <motion.div
                className="mediateam-logo"
                variants={logoVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <img src="/assets/echo_visuals_logo_transparent.png" alt="Echo Visuals" />
            </motion.div>

            <motion.div
                className="event-content-container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1, margin: "-50px" }}
            >
                <motion.div className="event-main-title" variants={itemVariants}>
                    <span className="live-text">LIVE</span> CONCERT &<br />
                    EVENT PHOTOGRAPHY
                </motion.div>

                <motion.div className="event-meta-row" variants={itemVariants}>
                    <span>SHOW</span>
                    <span className="dot">•</span>
                    <span>LIVE PERFORMANCE</span>
                    <span className="dot">•</span>
                    <span>STAGE PHOTOGRAPHY</span>
                </motion.div>

                <motion.h2 className="event-sub-title" variants={itemVariants}>
                    Curated moments from live performances
                </motion.h2>

                <motion.p className="event-description desktop-only" variants={itemVariants}>
                    My work revolves around capturing the essence of live shows, the artist’s presence on stage and the collective energy of the crowd.
                    <br /><br />
                    With a focus on light, rhythm, and decisive moments, I frame performances as visual experiences, not just events. Every photograph is intentionally selected to reflect intensity, connection, and scale.
                    <br /><br />
                    This collection represents a curated view of my live music and event photography.
                </motion.p>

                <motion.p className="event-description mobile-only" variants={itemVariants}>
                    Capturing the essence of live shows and the raw energy of the crowd. Every shot is framed to reflect the rhythm and scale of the performance.
                </motion.p>

                <motion.div className="event-buttons" variants={itemVariants}>
                    <button className="btn-remind" onClick={() => {
                        document.getElementById('employee-party')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        <Image size={18} fill="black" />
                        <span>View Gallery</span>
                    </button>
                    <button className="btn-info">
                        <span>Behind The Lens</span>
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default EventProject;
