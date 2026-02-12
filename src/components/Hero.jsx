import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PenTool, Camera, Folder } from 'lucide-react';
import newLogo from '../assets/hero_logo_v3.png';
import starRed from '../assets/star_red_v2.png';
import flowerBlue from '../assets/flower_blue_v2.png';
import contentCameraImg from '../assets/content_camera.png';
import davinciImg from '../assets/davinci_new.png';
import capcutImg from '../assets/capcut_new.png';
import aiImg from '../assets/ai_hero_new.png';
import psImg from '../assets/ps_hero_new.png';
import instaImg from '../assets/instagram_new.png';
import FloatingItem from './FloatingItem';
import './Hero.css';

// --- Icon Components ---
const PrIcon = ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="20" fill="#00005B" />
        <path d="M30 32H44.5C51 32 55.5 33.5 58 36.5C60.5 39.5 60.5 44 60.5 48.5C60.5 53 59 57.5 56.5 60C54 62.5 49.5 64 43 64H38V74H30V32ZM38 56.5H43.5C46.5 56.5 48.5 55.5 50 54C51.5 52.5 52.5 50 52.5 47C52.5 44 51.5 42 50 40.5C48.5 39 46.5 38.5 43.5 38.5H38V56.5ZM66 48H73.5V52.5C73.5 52.5 75.5 48.5 81 48.5V56.5C75 56.5 73.5 60 73.5 64.5V74H66V48Z" fill="#D8A5FF" />
    </svg>
);

const PsIcon = ({ size = 32 }) => (
    <img src={psImg} alt="Photoshop" style={{ width: size, height: size, objectFit: 'contain' }} />
);

const InstaIcon = ({ size }) => (
    <img src={instaImg} alt="Instagram" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
);

const LrIcon = ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="20" fill="#001E36" />
        <path d="M28 32H36V66.5H53V74H28V32ZM62 48H69.5V52.5C69.5 52.5 71.5 48.5 77 48.5V56.5C71 56.5 69.5 60 69.5 64.5V74H62V48Z" fill="#2CA5E0" />
    </svg>
);

const DavinciIcon = ({ size = 32 }) => (
    <img src={davinciImg} alt="DaVinci" style={{ width: size, height: size, objectFit: 'contain' }} />
);

const CapCutIcon = ({ size = 32 }) => (
    <img src={capcutImg} alt="CapCut" style={{ width: size, height: size, objectFit: 'contain' }} />
);

const AiIcon = ({ size = 32 }) => (
    <img src={aiImg} alt="Illustrator" style={{ width: size, height: size, objectFit: 'contain' }} />
);

const CameraIconItem = ({ size = 32 }) => (
    <img src={contentCameraImg} alt="Content" style={{ width: size, height: size, objectFit: 'contain' }} />
);

// --- CURVED MOBILE LAYOUT - MIRROR SYMMETRY ---
// Row 1 (Top Arc): 2 icons - mirrors Bottom Arc
// Row 2 (Upper Arc): 4 icons - curves DOWN toward logo
// Center: Logo (~43% from top)
// Row 3 (Lower Arc): 4 icons - curves UP toward logo (mirrors Upper)
// Row 4 (Bottom Arc): 2 icons - mirrors Top Arc
const heroIcons = [
    // ============ ROW 1: TOP ARC (2 icons) ============
    // Perfectly aligned horizontally at 13% from top
    // Shifted LEFT for better centering
    {
        id: 'social-media',
        label: 'social media',
        type: 'folder',
        desktop: { x: '15%', y: '20%', rotate: -5 },
        mobile: { x: '14%', y: '13%', rotate: -5 },
        row: 'top-arc'
    },
    {
        id: 'editing',
        label: 'editing',
        type: 'folder',
        desktop: { x: '75%', y: '15%', rotate: 5 },
        mobile: { x: '54%', y: '13%', rotate: 5 },
        row: 'top-arc'
    },

    // ============ ROW 2: UPPER ARC (4 icons) ============
    // Curves DOWN: outer icons LOWER (30%), inner icons HIGHER (27%)
    {
        id: 'premiere',
        label: 'Premiere Pro',
        type: 'icon',
        icon: PrIcon,
        desktop: { x: '5%', y: '65%', rotate: 12 },
        mobile: { x: '8%', y: '30%', rotate: -8 },
        row: 'upper-arc'
    },
    {
        id: 'content',
        label: 'Content',
        type: 'icon',
        icon: CameraIconItem,
        desktop: { x: '22%', y: '50%', rotate: 3 },
        mobile: { x: '30%', y: '27%', rotate: -3 },
        row: 'upper-arc'
    },
    {
        id: 'design',
        label: 'Design',
        type: 'icon',
        icon: PenTool,
        desktop: { x: '28%', y: '25%', rotate: -15 },
        mobile: { x: '55%', y: '27%', rotate: 3 },
        row: 'upper-arc'
    },
    {
        id: 'instagram',
        label: 'Instagram',
        type: 'icon',
        icon: InstaIcon,
        desktop: { x: '85%', y: '40%', rotate: -10 },
        mobile: { x: '78%', y: '30%', rotate: 8 },
        row: 'upper-arc'
    },

    // ============ ROW 3: LOWER ARC (4 icons) ============
    // Curves UP: outer icons HIGHER (62%), inner icons LOWER (65%)
    // MIRRORS Upper Arc around the logo center - moved DOWN for equal spacing
    {
        id: 'lightroom',
        label: 'Lightroom',
        type: 'icon',
        icon: LrIcon,
        desktop: { x: '55%', y: '12%', rotate: -8 },
        mobile: { x: '8%', y: '62%', rotate: 8 },
        row: 'lower-arc'
    },
    {
        id: 'photoshop',
        label: 'Photoshop',
        type: 'icon',
        icon: PsIcon,
        desktop: { x: '70%', y: '45%', rotate: 10 },
        mobile: { x: '30%', y: '65%', rotate: 3 },
        row: 'lower-arc'
    },
    {
        id: 'davinci',
        label: 'DaVinci',
        type: 'icon',
        icon: DavinciIcon,
        desktop: { x: '35%', y: '82%', rotate: 5 },
        mobile: { x: '55%', y: '65%', rotate: -3 },
        row: 'lower-arc'
    },
    {
        id: 'capcut',
        label: 'CapCut',
        type: 'icon',
        icon: CapCutIcon,
        desktop: { x: '90%', y: '80%', rotate: -12 },
        mobile: { x: '78%', y: '62%', rotate: -8 },
        row: 'lower-arc'
    },

    // ============ ROW 4: BOTTOM ARC (2 icons) ============
    // Perfectly aligned horizontally at 78% from top
    // MIRRORS Top Arc (matching X positions: 20%, 54%)
    {
        id: 'branding',
        label: 'branding',
        type: 'folder',
        desktop: { x: '20%', y: '70%', rotate: 8 },
        mobile: { x: '14%', y: '78%', rotate: 5 },
        row: 'bottom-arc'
    },
    {
        id: 'illustrator',
        label: 'Illustrator',
        type: 'icon',
        icon: AiIcon,
        desktop: { x: '70%', y: '80%', rotate: 8 },
        mobile: { x: '62%', y: '78%', rotate: -5 },
        row: 'bottom-arc'
    },
];

const Hero = ({ showHero }) => {
    const { scrollY } = useScroll();

    // Simplifed Transforms
    const scale = useTransform(scrollY, [0, 300], [1, 2.5]);
    const y = useTransform(scrollY, [0, 300], [0, -400]);
    const opacity = useTransform(scrollY, [200, 400], [1, 0]);
    const floatingOpacity = useTransform(scrollY, [0, 200], [1, 0]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="hero-container">
            {/* Main Content */}
            <div className="hero-center">
                <motion.div
                    className="logo-wrapper"
                    style={{ scale, y, opacity }}
                >
                    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                        <motion.img
                            src={newLogo}
                            alt="Echo Social"
                            className="hero-logo"
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: isMobile ? -5 : 0 }}
                            transition={{ duration: 1.2, ease: [0.34, 1.2, 0.64, 1], delay: 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        />

                        {/* Red Star */}
                        <motion.div
                            className="hero-star-element"
                            style={{ position: 'absolute', top: '7%', left: '6%', width: '18%', aspectRatio: '1/1', zIndex: 10 }}
                            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1.2, delay: 0.1 }}
                        >
                            <motion.img
                                src={starRed}
                                alt=""
                                style={{ width: '100%', height: '100%' }}
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                            />
                        </motion.div>

                        {/* Blue Flower */}
                        <motion.div
                            className="hero-star-element"
                            style={{ position: 'absolute', top: '35%', left: '80%', width: '15%', aspectRatio: '1/1', zIndex: 10 }}
                            initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1.5, delay: 0.1 }}
                        >
                            <motion.img
                                src={flowerBlue}
                                alt=""
                                style={{ width: '100%', height: '100%' }}
                                animate={{ rotate: -360 }}
                                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
                className="floating-layer"
                style={{ opacity: floatingOpacity }}
            >
                {heroIcons.map((item, index) => {
                    const pos = isMobile ? item.mobile : item.desktop;
                    let extraClasses = "";
                    let itemScale = 1;

                    if (isMobile) {
                        if (item.row === 'top-arc') itemScale = 0.85;
                        else if (item.row === 'upper-arc') itemScale = 0.95;
                        else if (item.row === 'lower-arc') itemScale = 0.95;
                        else if (item.row === 'bottom-arc') itemScale = 0.85;
                    }

                    return (
                        <FloatingItem
                            key={item.id}
                            type={item.type}
                            label={item.label}
                            icon={item.icon}
                            x={pos.x}
                            y={pos.y}
                            rotate={pos.rotate}
                            scaleProp={itemScale}
                            className={extraClasses}
                            delay={0.1 + (index * 0.1)}
                            isMobile={isMobile}
                            physicsEnabled={true}
                        />
                    );
                })}
            </motion.div>

            {/* Scroll Hint */}
            <motion.div
                className="scroll-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.65, y: [0, 6, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
            >
                <div className="scroll-hint-inner">
                    <span className="scroll-arrow">↓</span>
                    <span className="scroll-text">Scroll to explore</span>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
