import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ChevronDown, X, Check, ArrowRight, Home } from 'lucide-react';
import './GetInTouch.css';
import { Link } from 'react-router-dom';
import SuccessGif from '../assets/Success.gif';

const GetInTouch = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
    const [submittedEmail, setSubmittedEmail] = useState(''); // Store email for success message

    const servicesList = [
        'Video Editing',
        'Photoshoot',
        'Photo Editing',
        'Content Creation',
        'Graphic Designing',
        'Website Design & Development',
        'Full Event Coverage',
        'Drone Shoot'
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const toggleService = (service) => {
        let newSelected;
        if (selectedServices.includes(service)) {
            newSelected = selectedServices.filter(s => s !== service);
        } else {
            newSelected = [...selectedServices, service];
        }
        setSelectedServices(newSelected);

        if (newSelected.length > 0 && errors.services) {
            setErrors(prev => ({ ...prev, services: '' }));
        }
    };

    const removeService = (service) => {
        const newSelected = selectedServices.filter(s => s !== service);
        setSelectedServices(newSelected);
    };

    // Validation Regex Patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    // Check validity in real-time
    const isFormValid =
        formData.name.trim() !== '' &&
        formData.email.trim() !== '' &&
        emailRegex.test(formData.email) &&
        formData.phone.trim() !== '' &&
        phoneRegex.test(formData.phone.replace(/[\s-]/g, '')) &&
        selectedServices.length > 0 &&
        formData.message.trim() !== '';

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (selectedServices.length === 0) {
            newErrors.services = 'Please select at least one service';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Please describe your project';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setFormStatus('submitting');

        // Artificial delay for smooth animation experience
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1500));

        // EmailJS Service Configuration
        const SERVICE_ID = 'service_oi1xauj';
        const ADMIN_TEMPLATE_ID = 'template_vfvpll9';
        const USER_TEMPLATE_ID = 'template_z28809u';
        const PUBLIC_KEY = 'Mreeuc9zpJj_4y7HQ';

        const templateParams = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            services: selectedServices.join(', '),
            message: formData.message
        };

        Promise.all([
            emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams, PUBLIC_KEY),
            emailjs.send(SERVICE_ID, USER_TEMPLATE_ID, templateParams, PUBLIC_KEY),
            minLoadingTime
        ])
            .then(() => {
                console.log('Emails sent successfully');
                setSubmittedEmail(formData.email); // Save email for display
                setFormStatus('success');
                // do NOT clear formData here to prevent "email to ." bug
            })
            .catch((error) => {
                console.error('Failed', error);
                setFormStatus('error');
            });
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', message: '' }); // Clear only on reset
        setSelectedServices([]);
        setFormStatus('idle');
        setErrors({}); // Clear errors on reset
        setSubmittedEmail(''); // Clear submitted email
    };

    return (
        <motion.div
            key="v4-redesign"
            className="get-in-touch-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* ... Animation Elements ... */}

            {/* WRAPPER FOR RELATIVE POSITIONING */}
            <div className="git-card-wrapper">
                {/* 1. TOP-LEFT: Moves RIGHT */}
                <div className="echo-watermark watermark-top-left">
                    {/* Ghost Element for Positioning */}
                    <span style={{ opacity: 0 }}>LETS WORK TOGETHER</span>

                    {/* Marquee Overlay */}
                    <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', width: 'max-content' }}>
                        <motion.div
                            style={{ display: 'flex', willChange: 'transform', transform: 'translateZ(0)' }}
                            initial={{ x: "-50%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                        >
                            {/* Reduced repeats for performance - covers huge width already */}
                            {[...Array(4)].map((_, i) => (
                                <span key={i} style={{ marginRight: '2em' }}>  TOGETHER WORK LET'S  </span>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* 2. BOTTOM-RIGHT: Moves LEFT */}
                <div className="echo-watermark watermark-bottom-right">
                    {/* Ghost Element */}
                    <span style={{ opacity: 0 }}>MAKING YOUR BRAND'S VOICE HEARD</span>

                    {/* Marquee Overlay */}
                    <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', width: 'max-content' }}>
                        <motion.div
                            style={{ display: 'flex', willChange: 'transform', transform: 'translateZ(0)' }}
                            initial={{ x: "0%" }}
                            animate={{ x: "-50%" }}
                            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                        >
                            {/* Reduced repeats for performance */}
                            {[...Array(4)].map((_, i) => (
                                <span key={i} style={{ marginRight: '2em' }}>MAKING YOUR BRAND'S VOICE HEARD</span>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    className="get-in-touch-card"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: 'relative', zIndex: 10 }}
                >
                    <AnimatePresence mode='wait'>
                        {formStatus === 'success' ? (
                            <motion.div
                                key="success-view"
                                className="success-view-container"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <motion.div
                                    className="success-animation-wrapper"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                                >
                                    <img
                                        src={SuccessGif}
                                        alt="Success"
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h2 className="success-title">Message Sent Successfully!</h2>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <p className="success-sub">Thank you for reaching out. We've sent a confirmation email to <strong>{submittedEmail}</strong>.</p>
                                </motion.div>

                                <motion.div
                                    className="check-inbox-card"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="mail-icon-home">
                                        <Mail size={24} />
                                    </div>
                                    <h3 className="inbox-title">Check Your Inbox</h3>
                                    <p className="inbox-text">
                                        <strong>Your Echo is heard.</strong><br />
                                        We will analyze your requirements and get back to you within 24-48 hours.
                                    </p>
                                </motion.div>

                                <motion.div
                                    className="success-actions"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <Link to="/" className="action-btn primary">
                                        Back to Home <ArrowRight size={16} />
                                    </Link>

                                    <button
                                        className="action-btn secondary"
                                        onClick={resetForm}
                                    >
                                        Send another message <ArrowRight size={16} />
                                    </button>
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="split-view"
                                className="git-content-wrapper"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Left Side - Creative / Info */}
                                <div className="git-creative-section">
                                    <div className="creative-header">
                                        <h1 className="main-title">
                                            <span className="title-sans">GET</span><br />
                                            <span className="title-serif">In Touch</span>
                                        </h1>
                                        <p className="sub-tagline">Making Your Brand's Voice Heard.</p>
                                        <div className="decorative-line"></div>
                                        <p className="disclaimer-text">
                                            <strong>Disclaimer</strong><br />
                                            Please fill out the form if you’d like to collaborate with us or discuss a project. We aim to respond within 24–48 hours, but if you don’t hear back, do check your spam folder just in case.<br />
                                            Prefer a quicker connection? Feel free to reach out to us directly via email or phone.<br /><br />
                                            By submitting this form, you agree that Echo Social may store your details solely for communication regarding your enquiry. Your information is kept secure and will never be shared or sold.
                                        </p>
                                    </div>

                                    <div className="contact-info-block" style={{ position: 'relative', zIndex: 9999 }}>
                                        <a
                                            href="https://mail.google.com/mail/?view=cm&fs=1&to=helloechosocial@gmail.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="info-item"
                                            style={{ position: 'relative', zIndex: 10000, cursor: 'pointer' }}
                                        >
                                            <div className="info-icon-circle"><Mail size={18} /></div>
                                            <span>helloechosocial@gmail.com</span>
                                        </a>
                                        <a
                                            href="tel:+919723192377"
                                            className="info-item"
                                            style={{ position: 'relative', zIndex: 10000, cursor: 'pointer' }}
                                        >
                                            <div className="info-icon-circle"><Phone size={18} /></div>
                                            <span>+91 97231 92377</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Right Side - Form */}
                                <div className="git-form-section">
                                    {/* Loading Overlay */}
                                    {formStatus === 'submitting' && (
                                        <motion.div
                                            key="loading-overlay"
                                            className="loading-overlay"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="spinner-large"></div>
                                            <p className="loading-text">Sending your Echo...</p>
                                        </motion.div>
                                    )}

                                    <form
                                        className="git-form"
                                        onSubmit={handleSubmit}
                                        noValidate
                                        style={{ filter: formStatus === 'submitting' ? 'blur(4px)' : 'none', pointerEvents: formStatus === 'submitting' ? 'none' : 'auto', transition: 'filter 0.3s ease' }}
                                    >
                                        {formStatus === 'error' && (
                                            <div className="error-banner" style={{ color: 'red', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                                Something went wrong. Please try again or contact us directly.
                                            </div>
                                        )}

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Full Name <span style={{ color: 'red' }}>*</span></label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    className={errors.name ? 'input-error' : ''}
                                                    disabled={formStatus === 'submitting'}
                                                />
                                                {errors.name && <span className="error-message">{errors.name}</span>}
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Email <span style={{ color: 'red' }}>*</span></label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@example.com"
                                                    className={errors.email ? 'input-error' : ''}
                                                    disabled={formStatus === 'submitting'}
                                                />
                                                {errors.email && <span className="error-message">{errors.email}</span>}
                                            </div>
                                            <div className="form-group">
                                                <label>Phone Number <span style={{ color: 'red' }}>*</span></label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+91 99999 99999"
                                                    className={errors.phone ? 'input-error' : ''}
                                                    disabled={formStatus === 'submitting'}
                                                />
                                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                                            </div>
                                        </div>

                                        <div className="form-group custom-select-wrapper" ref={dropdownRef}>
                                            <label>I need help with... <span style={{ color: 'red' }}>*</span></label>

                                            <div
                                                className={`custom-select-container ${errors.services ? 'input-error' : ''} ${isDropdownOpen ? 'active' : ''}`}
                                                onClick={() => formStatus !== 'submitting' && setIsDropdownOpen(!isDropdownOpen)}
                                                style={{ opacity: formStatus === 'submitting' ? 0.7 : 1 }}
                                            >
                                                <div className="selected-tags-display">
                                                    {selectedServices.length === 0 && <span className="placeholder-text">Select services</span>}
                                                    <AnimatePresence>
                                                        {selectedServices.map(service => (
                                                            <motion.span
                                                                key={service}
                                                                className="tag-chip"
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0.8 }}
                                                                onClick={(e) => { e.stopPropagation(); removeService(service); }}
                                                            >
                                                                {service} <X size={12} className="tag-close-icon" />
                                                            </motion.span>
                                                        ))}
                                                    </AnimatePresence>
                                                </div>
                                                <div className="dropdown-arrow">
                                                    <ChevronDown size={18} className={isDropdownOpen ? 'rotate-180' : ''} style={{ transition: 'transform 0.3s ease' }} />
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {isDropdownOpen && (
                                                    <motion.div
                                                        className="dropdown-menu"
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        {servicesList.map(service => (
                                                            <div
                                                                key={service}
                                                                className={`dropdown-item ${selectedServices.includes(service) ? 'selected' : ''}`}
                                                                onClick={() => toggleService(service)}
                                                            >
                                                                <div className={`checkbox-custom ${selectedServices.includes(service) ? 'checked' : ''}`}>
                                                                    {selectedServices.includes(service) && <Check size={12} color="white" />}
                                                                </div>
                                                                <span>{service}</span>
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            {errors.services && <span className="error-message">{errors.services}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label>Tell us about your project <span style={{ color: 'red' }}>*</span></label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Describe your vision..."
                                                className={errors.message ? 'input-error' : ''}
                                                required
                                                disabled={formStatus === 'submitting'}
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="submit-btn"
                                            disabled={!isFormValid || formStatus === 'submitting'}
                                            style={{
                                                opacity: (!isFormValid || formStatus === 'submitting') ? 0.7 : 1,
                                                cursor: (!isFormValid || formStatus === 'submitting') ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            {formStatus === 'submitting' ? (
                                                <>
                                                    Sending...
                                                </>
                                            ) : (
                                                'Send Message'
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div >
    );
};

export default GetInTouch;
