// app/components/DynamicLogo.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. Import React Icons ---
import { FaReact, FaDocker, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiRedis } from "react-icons/si";
import { RiTailwindCssLine } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io";
import { RiNextjsFill } from "react-icons/ri";

// Note: Next.js icon is often represented by a standard triangle/caret in text/emoji, 
// but we'll use a stylized div for a clean black-and-white look.

// --- Configuration ---
const CYCLE_INTERVAL_MS = 2500; // 2.5 seconds per logo display

// --- 2. Define the content sequence using imported Icons ---
const logoSequence = [
    { 
        id: 'name', 
        content: (
            <>
                <span className="text-cyan-400">Ujjwal</span>
                <span 
                    className="text-purple-400 ml-1"
                    style={{ textShadow: "0 0 5px rgba(153, 102, 255, 0.7)" }}
                >
                    Pandey
                </span>
            </>
        ),
        type: 'text',
        className: 'text-3xl font-extrabold tracking-wide',
    },
    { 
        id: 'react', 
        content: <FaReact className="text-cyan-400" />, 
        type: 'icon', 
        className: 'text-4xl filter drop-shadow(0 0 8px #61DAFB)' 
    },
    { 
        id: 'nextjs', 
        // Using a stylized div for the Next.js icon look
     content: <RiNextjsFill className="text-green-400" />,       
       type: 'icon', 
        className: 'text-4xl filter drop-shadow(0 0 8px #ffffff)' 
    },
 
    { 
        id: 'nodejs', 
        content: <FaNodeJs className="text-green-500" />, 
        type: 'icon', 
        className: 'text-4xl filter drop-shadow(0 0 8px #6AA259)' 
    },
    { 
        id: 'mongodb', 
        content: <SiMongodb className="text-green-400" />, 
        type: 'icon', 
        className: 'text-4xl filter drop-shadow(0 0 8px #4DB33D)' 
    },
    { 
        id: 'redis', 
        content: <SiRedis className="text-red-600" />, 
        type: 'icon', 
        className: 'text-4xl filter drop-shadow(0 0 8px #DC382D)' 
    },
    { 
        id: 'docker', 
        content: <FaDocker className="text-blue-500" />, 
        type: 'icon', 
        className: 'text-4xl filter drop-shadow(0 0 8px #0db7ed)' 
    },
    // Adding Tailwind and JavaScript for comprehensive representation
    { 
        id: 'tailwind', 
        content: <RiTailwindCssLine className="text-cyan-400" />, 
        type: 'icon', 
        className: 'text-4xl filter drop-shadow(0 0 8px #38bdf8)' 
    },
    { 
        id: 'javascript', 
        content: <IoLogoJavascript className="text-yellow-400" />, 
        type: 'icon', 
        className: 'text-4xl filter drop-shadow(0 0 8px #f7df1e)' 
    },
];

// Animation variants for the icon fade/scale transition
const itemVariants = {
    initial: { opacity: 0, scale: 0.8, y: -10 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, y: 10, transition: { duration: 0.2 } },
};

export default function DynamicLogo() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // useEffect manages the cycling timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % logoSequence.length);
        }, CYCLE_INTERVAL_MS);

        return () => clearInterval(timer);
    }, []); 

    const currentLogo = logoSequence[currentIndex];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentLogo.id} 
                className={`flex-shrink-0 cursor-pointer select-none h-8 flex items-center justify-center ${currentLogo.className}`}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={itemVariants}
            >
                {/* Render based on content type */}
                {currentLogo.content}
            </motion.div>
        </AnimatePresence>
    );
}