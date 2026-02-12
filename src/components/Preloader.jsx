import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const greetings = [
    "Hello",
    "नमस्ते",
    "કેમ છો",
    "नमस्कार",
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
    "வணக்கம்",
    "खम्मा घणी"
];

import MediaPreloader from '../utils/mediaPreloader';

const Preloader = ({ onComplete }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Scroll Lock Logic
        const lockScroll = () => {
            document.body.style.overflow = 'hidden';
            if (window.lenis) window.lenis.stop();
        };

        lockScroll();

        // Polling to catch Lenis initialization (since child effect runs before parent)
        const checkLenis = setInterval(() => {
            if (window.lenis) {
                window.lenis.stop();
                clearInterval(checkLenis);
            }
        }, 50);

        return () => {
            clearInterval(checkLenis);
            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start();
        };
    }, []);

    useEffect(() => {
        // Trigger preloading of heavy assets immediately
        MediaPreloader.preloadCriticalAssets();

        // Words 1-6: Display for 500ms then switch.
        // Word 7 (Last): Display, then trigger onComplete to start Hero transition.

        if (index === greetings.length - 1) {
            // Last word is displayed. 
            // Wait for it to settle (Enter + partial Hold), then trigger transition.
            // Enter animation is ~0.35s. Give it ~800ms total visible time before starting fade.
            const timeout = setTimeout(() => {
                onComplete();
            }, 400);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setIndex((prev) => prev + 1);
        }, index === 0 ? 1000 : 300); // "Hello" stays for 1000ms, others for 300ms

        return () => clearTimeout(timeout);
    }, [index, onComplete]);

    const wordVariants = {
        initial: {
            opacity: 0,
            y: 10
        },
        enter: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1] // Smooth easeOut
            }
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.15,
                ease: "easeIn"
            }
        }
    };

    const containerVariants = {
        initial: {
            y: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        },
        exit: {
            y: "-100%",
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    };

    return (
        <motion.div
            className="preloader-container"
            variants={containerVariants}
            initial="initial"
            exit="exit"
        >
            <div className="greeting-wrapper">
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={index}
                        className="greeting-text"
                        variants={wordVariants}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                    >
                        <span className="greeting-dot"></span>
                        {greetings[index]}
                    </motion.h1>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Preloader;
