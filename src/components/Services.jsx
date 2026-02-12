import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const servicesData = [
    {
        id: 1,
        title: "Content Creation",
        description: <>Professional <strong>photography shoots</strong>, <strong>reel making</strong>, and <strong>short video production</strong> tailored for brand promotions and online presence.</>,
        color: "#1a1a1a", // Dark card
        textColor: "#fff"
    },
    {
        id: 2,
        title: "Social Media Designing",
        description: <>High-quality <strong>poster, Instagram post & story designs, and creative invitations</strong> for promotions, events, and brands.</>,
        color: "#fff", // Light card
        textColor: "#1a1a1a"
    },
    {
        id: 3,
        title: "Video Editing",
        description: <>Professional <strong>video editing for promotional and social media</strong> content.</>,
        color: "#1a1a1a",
        textColor: "#fff"
    },
    {
        id: 4,
        title: "Graphic Design",
        description: <>Complete graphic design solutions including <strong>brochures, business cards, visiting cards, and creative assets</strong> for branding, marketing, and print.</>,
        color: "#fff",
        textColor: "#1a1a1a"
    }
];

const Services = () => {
    return (
        <section className="services-container" id="services">
            {/* Background Grid */}
            <div className="animated-grid-bg"></div>

            <div className="services-header">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Cards <span className="serif-highlight">of</span> Services
                </motion.h2>
                <motion.p
                    className="services-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    A focused set of creative services designed to help brands communicate clearly and consistently.
                </motion.p>
            </div>

            <div className="cards-deck">
                {servicesData.map((service, index) => (
                    <Card key={service.id} service={service} index={index} />
                ))}
            </div>
        </section>
    );
};

const Card = ({ service, index }) => {
    return (
        <motion.div
            className="service-card"
            style={{
                backgroundColor: service.color,
                color: service.textColor,
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="card-top">
                <span className="card-num">{service.id}</span>
                <div className="card-hole"></div> {/* Decorative hole punch feel */}
            </div>

            <div className="card-main">
                <h3 className="card-title">{service.title}</h3>
                <div className="card-divider"></div>
                <p className="card-desc">{service.description}</p>
            </div>

            <div className="card-bottom-decor">
                <span>Echo</span>
                <span>Social</span>
            </div>
        </motion.div>
    );
};

export default Services;
