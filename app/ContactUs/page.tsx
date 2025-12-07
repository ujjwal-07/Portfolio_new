// app/components/ContactPage.tsx
"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertTriangle, Check } from 'lucide-react'; 
import { motion, useAnimationControls } from 'framer-motion';

// --- Configuration ---
const EMAIL_ADDRESS = "p.ujjwal.8888@gmail.com";
const API_ENDPOINT = '/api/contact'; 

// --- Framer Motion Variants ---

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.5,
        },
    },
};

const headerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { duration: 0.8 } 
    },
};

// --- Main Component ---
export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'failed'>('idle');
    const [emailCopied, setEmailCopied] = useState(false);
    const iconControls = useAnimationControls();
    
    // --- Launch/Crash Animation and Submission Handler ---
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (status === 'submitting') return;

        setStatus('submitting');
        
        // Prep Animation: Icon moves left (pre-launch check)
        iconControls.start({ x: -90, transition: { duration: 0.4 } });
        
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        let success = false;
        
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Check if the response status is 200-299
            success = response.ok;

        } catch (error) {
            console.error("Network or Fetch Error:", error);
            success = false;
        }

        // Final Animation Sequence
        if (success) {
            // Success: Launch icon up and off-screen
            iconControls.start({ 
                y: -100, opacity: 0, rotate: 45, 
                transition: { duration: 0.5, ease: "easeIn" }
            });
            setStatus('success');
            e.currentTarget.reset(); 
        } else {
            // Failure: Crash/Shake animation
            iconControls.start({
                x: [-100, -90, -110, -90, -100], 
                rotate: [0, 10, -10, 5, 0],
                transition: { duration: 0.3, repeat: 3, repeatType: 'mirror' }
            }).then(() => {
                // Reset icon to center position after crash
                iconControls.start({ x: 0, rotate: 0, transition: { duration: 0.5 } });
            });
            setStatus('failed');
        }
        
        // Reset status to allow re-submission
        setTimeout(() => setStatus('idle'), 3000);
    };

    // --- Copy Email Handler ---
    const handleCopyEmail = async (email: string) => {
        try {
            await navigator.clipboard.writeText(email);
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };
    
    const isIdle = status === 'idle' || status === 'failed';

    return (
        // Note: Outer page wrapper must define the dark background and min-height
        <div className="min-h-screen pt-20 pb-16 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <motion.header 
                    className="text-center mb-16"
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold text-cyan-400 mb-4">
                        Let's Launch Together
                    </h1>
                    <p className="text-xl text-gray-400">
                        Ready to begin your project's cosmic journey? Reach out below.
                    </p>
                </motion.header>

                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    
                    {/* --- CONTACT FORM --- */}
                    <motion.div 
                        className="lg:col-span-2 bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl"
                        // Custom motion for the form container to enter the view
                        variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.6 } } }}
                    >
                        <h2 className="text-3xl font-bold mb-8 text-white">Send a Direct Message</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Inputs */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-150" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-150" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                                <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-150 resize-none"></textarea>
                            </div>

                            {/* --- ANIMATED BUTTON --- */}
                            <motion.button 
                                type="submit" 
                                disabled={!isIdle}
                                className="w-full relative overflow-hidden py-3 px-6 border border-transparent rounded-lg text-lg font-semibold text-gray-900 bg-cyan-400 hover:bg-cyan-500 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <motion.span 
                                        animate={iconControls} 
                                        initial={{ x: 0 }} 
                                        className="relative flex items-center"
                                    >
                                        {status === 'failed' ? (
                                            <AlertTriangle size={20} className="text-red-600" />
                                        ) : status === 'success' ? (
                                            <Check size={20} className="text-green-600" />
                                        ) : (
                                            <Send size={20} />
                                        )}
                                    </motion.span>
                                    
                                    <span className="min-w-[150px]">
                                        {status === 'submitting' && 'Launching...'}
                                        {status === 'success' && 'Mission Success!'}
                                        {status === 'failed' && 'Mission Failed!'}
                                        {status === 'idle' && 'Send Message'}
                                    </span>
                                </div>
                            </motion.button>

                            {(status === 'success' || status === 'failed') && (
                                <p className={`mt-4 text-center ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                    {status === 'success' ? "Message sent successfully! We'll be in touch soon." : "Transmission error! Please check your form and try again."}
                                </p>
                            )}
                        </form>
                    </motion.div>

                    {/* --- CONTACT INFO --- */}
                    <motion.div 
                        className="lg:col-span-1 space-y-8"
                        // Custom motion for the info cards to enter the view (staggered delay)
                        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6 } } }}
                    >
                        <InfoCard 
                            icon={Mail} 
                            title={emailCopied ? "Copied to Clipboard!" : "Email Address"} 
                            content={EMAIL_ADDRESS} 
                            link={`mailto:${EMAIL_ADDRESS}`}
                            onClick={() => handleCopyEmail(EMAIL_ADDRESS)}
                            isCopied={emailCopied} 
                        />
                        
                        <InfoCard 
                            icon={Phone} 
                            title="Phone Number" 
                            content="9372948328" 
                            link="tel:+919372948328"
                        />

                        <InfoCard 
                            icon={MapPin} 
                            title="Location" 
                            content="Kalyan" 
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

// Reusable Info Card Component
interface InfoCardProps {
    icon: React.ElementType;
    title: string;
    content: string;
    link?: string;
    onClick?: () => void;
    isCopied?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, title, content, link, onClick, isCopied }) => (
    <motion.div 
        onClick={onClick}
        className={`p-6 rounded-xl shadow-lg border transition-all duration-300 
                    ${onClick ? 'cursor-pointer' : ''} 
                    ${isCopied ? 'bg-green-700/50 border-green-500/70' : 'bg-gray-800 border-cyan-500/30'}
                  `}
        whileHover={onClick ? { 
            scale: 1.03, 
            boxShadow: `0 0 15px ${isCopied ? 'rgba(16, 185, 129, 0.7)' : 'rgba(45, 212, 191, 0.5)'}`,
        } : {}}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <div className="flex items-start space-x-4">
            <div 
                className={`p-3 rounded-full ${isCopied ? 'bg-green-500/80 text-white' : 'bg-cyan-700/50 text-cyan-400'}`}
            >
                <Icon size={24} />
            </div>
            <div>
                <h3 className="text-xl font-bold mb-1 text-white">{title}</h3>
                {link && !onClick ? (
                    <a href={link} className="text-lg text-gray-300 hover:text-cyan-400 transition-colors">
                        {content}
                    </a>
                ) : (
                    <p className="text-lg text-gray-300">{content}</p>
                )}
            </div>
        </div>
    </motion.div>
);