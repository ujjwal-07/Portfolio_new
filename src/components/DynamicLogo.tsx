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
import { SiPostman } from "react-icons/si";
import { SiPostgresql } from 'react-icons/si'; // Adding PostgreSQL icon as a placeholder for Postgress

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
        content: <RiNextjsFill className="text-white" />, 
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
    { 
        id: 'postman', 
        content: <SiPostman className="text-orange-400" />, // Using SiPostman
        type: 'icon', 
        className: 'text-4xl filter drop-shadow(0 0 8px #f7df1e)' 
    },
    { 
        id: 'postgres', 
        content: <SiPostgresql className="text-blue-500" />, // Corrected icon for Postgres
        type: 'icon', 
        className: 'text-4xl filter drop-shadow(0 0 8px #4169E1)' 
    },
];

// Animation variants for the icon fade/scale transition
const itemVariants = {
    initial: { opacity: 0, scale: 0.8, y: -10 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, y: 10, transition: { duration: 0.2 } },
};

export default function DynamicLogo() {
    const [isMounted, setIsMounted] = useState(false); // New state for hydration guard
    const [currentIndex, setCurrentIndex] = useState(0);

    // FIX: The cycling timer now starts only after the component has mounted, 
    // ensuring the first server-rendered output is stable.
    useEffect(() => {
        setIsMounted(true);
        
        // Start the timer ONLY after mounting
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % logoSequence.length);
        }, CYCLE_INTERVAL_MS);

        return () => clearInterval(timer);
    }, []); 

    // --- Hydration Guard ---
    if (!isMounted) {
        // Render the stable state (your name) during server render and initial client render
        const stableLogo = logoSequence[0]; 
        return (
            <div className={`flex-shrink-0 select-none h-8 flex items-center justify-center ${stableLogo.className}`}>
                {stableLogo.content}
            </div>
        );
    }

    // --- Dynamic Rendering (After Hydration) ---
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