// app/components/CosmicJourney.tsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion'; 
import Aurora from '../Aurora/Aurora'; 
import Marquee from "react-fast-marquee" 
// --- Import Icons ---
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { TbFileCv } from "react-icons/tb";


// --- External Links Data (FINAL with Name property for Tooltip) ---
const externalLinks = [
    { name: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/ujjwal-pandey-3253691a7/', icon: <FaLinkedin size={60} className="text-cyan-400" /> },
    { name: 'GitHub Profile', href: 'https://github.com/ujjwal-07', icon: <FaGithub size={60} className="text-gray-300" /> }, 
    { name: 'Download Resume', href: 'https://drive.google.com/file/d/146vTp13OYTD_y38CWqmhv0vkR_eehI_f/view?usp=sharing', icon: <TbFileCv size={60} className="text-purple-400" />, download: 'Ujjwal_Pandey_CV.pdf' }, 
    
    // Repeating the sequence
    { name: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/ujjwal-pandey-3253691a7/', icon: <FaLinkedin size={60} className="text-cyan-400" /> },
    { name: 'GitHub Profile', href: 'https://github.com/ujjwal-07', icon: <FaGithub size={60} className="text-gray-300" /> }, 
    { name: 'Download Resume', href: 'https://drive.google.com/file/d/146vTp13OYTD_y38CWqmhv0vkR_eehI_f/view?usp=sharing', icon: <TbFileCv size={60} className="text-purple-400" />, download: 'Ujjwal_Pandey_CV.pdf' }, 
];

// --- Card Data (Unchanged) ---
const cards = [
    { 
        title: "My Story",
        description: "See the developer behind the screen: My journey from student to SDE, what drives my passion for scalable tech, and my core philosophy.", 
        color: "from-teal-500/80 to-green-500/80",
        link: "/AboutMe" 
    },
    { 
        title: "High-Impact Projects",
        description: "Explore the code I've shipped: Deep dives into full-stack architecture, performance optimization (Redis, Docker), and projects built for millions of users.", 
        color: "from-indigo-600/80 to-blue-500/80",
        link: "/Project" 
    },
    { 
        title: "Let's Connect",
        description: "Ready to collaborate on your next launch? Find my professional contacts, send a direct message, and let's turn ideas into functional reality.", 
        color: "from-rose-600/80 to-pink-500/80",
        link: "/ContactMe" 
    },
];

// --- Framer Motion Variants (Unchanged) ---

const cardContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: {
            staggerChildren: 0.2, 
            delayChildren: 0.1,  
        }
    },
};

const cardEntranceVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        transition: { 
            duration: 0.8, 
            ease: [0.17, 0.55, 0.55, 1],
        }
    },
};


// --- Marquee Link Sub-Component (FINAL FIX with Title Attribute) ---
interface MarqueeLinkProps {
    icon: React.ReactNode; 
    href?: string;
    download?: string;
    name: string; // Required for the title attribute
}

const MarqueeLink: React.FC<MarqueeLinkProps> = ({ icon, href = '#', download, name }) => (
    <motion.a 
        href={href}
        target={download ? '_self' : '_blank'} 
        rel="noopener noreferrer"
        download={download} 
        
        // FIX: Add the title attribute for the hover preview text
        title={name} 
        
        className="flex items-center justify-center p-6 mx-12 h-24 w-full transition duration-300 flex-shrink-0"
        whileHover={{ scale: 1.2, }}
    >
        {icon}
    </motion.a>
);


// --- Component ---
export default function CosmicJourney() {
    const targetRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);


    const splitText = (text: string) => text.split(" ").map((word, index) => (
        <motion.span 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            className="inline-block mr-2"
        >
            {word}
        </motion.span>
    ));
    
    return (
        <div className="relative min-h-[200vh] bg-[#121212] overflow-x-hidden text-white" ref={targetRef}>
            
            {/* 1. OGL AURORA BACKGROUND (Layer 0) */}
            <div className="fixed inset-0 z-0">
                <Aurora 
                    colorStops={['#9911ff', '#00ffff', '#ff33aa']} 
                    amplitude={1.2} 
                    blend={0.6}
                    speed={1.0}
                />
            </div>
            
            {/* 1.5. Dark Gradient Overlay for Depth (Layer 5) */}
            <div className="absolute inset-0 z-[5] pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            </div>

            
            {/* 2. CONTENT WRAPPER (Layer 10 - Foreground) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* --- HEADER SECTION with PARALLAX --- */}
                <motion.header
                    className="h-screen flex flex-col justify-center items-start text-left"
                    style={{ y, opacity }} 
                >
                    <motion.h1 
                        className="text-7xl sm:text-8xl lg:text-9xl font-extrabold mb-4 leading-tight"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <span className="text-purple-400">Ujjwal</span>
                        <span className="text-cyan-400"> Pandey</span>
                    </motion.h1>

                    <motion.p className="text-xl sm:text-2xl mt-6 text-gray-300">
                        {splitText("Explore the portfolio of a ")}
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="font-bold text-cyan-300 inline-block"
                            style={{ 
                                textShadow: "0 0 10px rgba(45, 212, 191, 0.9)",
                                animation: "pulse-glow 4s infinite alternate" 
                            }}
                        >
                            Full Stack Developer.
                        </motion.span>
                    </motion.p>
                </motion.header>
                
                {/* --- CARDS SECTION --- */}
                <section className="min-h-screen py-24">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center text-gray-200">
                        Navigation Hub
                    </h2>
                    
                    {/* Staggered Card Container */}
                    <motion.div 
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12"
                        initial="hidden"
                        whileInView="visible" 
                        viewport={{ once: true, amount: 0.3 }} 
                        variants={cardContainerVariants}
                    >
                        {cards.map((card, index) => (
                            <motion.a 
                                key={index}
                                href={card.link}
                                variants={cardEntranceVariants} // Applies the stagger effect
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(0, 0, 0, 0.7)" }}
                                className="relative p-6 sm:p-8 rounded-2xl overflow-hidden cursor-pointer bg-black/50 border border-cyan-500/20 transition-colors duration-300 ease-out"
                            >
                                {/* Faux 3D Glowing Border Effect (Increased Intensity) */}
                                <div 
                                    className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-50 filter blur-2xl transition-opacity duration-500`}
                                />
                                
                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">{card.title}</h3>
                                    <p className="text-md sm:text-lg text-gray-400">{card.description}</p>
                                </div>

                                {/* Inner Highlight on Hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl"
                                    whileHover={{ 
                                        boxShadow: `inset 0 0 10px 5px ${index === 0 ? '#10B981' : index === 1 ? '#3B82F6' : '#F43F5E'}`,
                                        opacity: 0.2,
                                    }}
                                    initial={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        ))}
                    </motion.div>
                </section>
                
                {/* --- MARQUEE LINKS SECTION (FINAL) --- */}
                <div className="py-12 border-y border-gray-700/50 w-full">
                    <Marquee 
                        gradient={false} 
                        speed={50} 
                        pauseOnHover={true}
                        className="overflow-hidden flex space-x-0 w-full" 
                    >
                        {externalLinks.map((link, index) => (
                            <MarqueeLink key={index + link.name} {...link} />
                        ))}
                    </Marquee>
                </div>
                

                {/* --- Footer/Detail Section --- */}
                <div className="mt-20 text-center text-gray-500 text-sm">
                    <p>Crafted by Ujjwal Pandey.</p>
                </div>

            </div>
        </div>
    );
}