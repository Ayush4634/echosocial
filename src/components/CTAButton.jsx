import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './CTAButton.css';

const CTAButton = ({ text = "Get in Touch", onClick }) => {
    return (
        <motion.button
            className="premium-cta-btn"
            onClick={onClick}
            initial="idle"
            whileHover="hover"
            animate="idle"
        >
            <motion.span
                className="cta-text"
                variants={{
                    idle: { x: 0 },
                    hover: { x: -4 } // Subtle shift left
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {text}
            </motion.span>

            <motion.span
                className="cta-icon-wrapper"
                variants={{
                    idle: { x: 0, opacity: 0.6 },
                    hover: { x: 4, opacity: 1 } // Slide right and full opacity
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <ArrowRight size={18} strokeWidth={2} />
            </motion.span>
        </motion.button>
    );
};

export default CTAButton;
