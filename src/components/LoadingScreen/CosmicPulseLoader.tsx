// app/components/ReliablePulsarLoader.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Duration for one full cycle (out and back in)
const CYCLE_DURATION = 3.0; 

// Base animation variants for the expanding rings
const pulseVariants = {
    // Hidden state for a smooth start
    hidden: { scale: 0.1, opacity: 0 }, 
    
    // Animation state for the loop
    pulse: {
        scale: 1.5,
        // Opacity keyframes: Fade in, hold, fade out
        opacity: [0, 0.4, 0.6, 0.2, 0], 
        transition: {
            duration: CYCLE_DURATION,
            repeat: Infinity,
            ease: "easeOut",
            repeatType: "loop",
        },
    },
};

export default function ReliablePulsarLoader() {
    return (
        // Full screen, dark background wrapper
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 z-[9999]">
            
            {/* --- Animation Container --- */}
            <div className="relative w-48 h-48 flex items-center justify-center">

                {/* 1. Innermost Core (Stays bright) */}
                <motion.div
                    className="absolute w-10 h-10 rounded-full bg-cyan-400 shadow-xl"
                    animate={{ 
                        scale: [1, 1.1, 1], // Subtle breathing effect
                        opacity: [1, 0.9, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* 2. Ring 1 (Immediate Pulse) */}
                <motion.div
                    className="absolute w-full h-full rounded-full bg-cyan-400/80 border border-cyan-400"
                    initial="hidden"
                    animate="pulse"
                />

                {/* 3. Ring 2 (Delayed Pulse - Uses transition prop for explicit delay) */}
                <motion.div
                    className="absolute w-full h-full rounded-full bg-purple-500/80 border border-purple-500"
                    initial="hidden"
                    animate="pulse"
                />

                {/* 4. Ring 3 (Further Delayed Pulse) */}
                <motion.div
                    className="absolute w-full h-full rounded-full bg-pink-500/80 border border-pink-500"
                    initial="hidden"
                    animate="pulse"
                />

            </div>
            
            {/* Loading Text */}
            <motion.p 
                className="absolute mt-64 text-xl font-medium text-gray-400 tracking-widest"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
                NAVIGATING COSMIC PATHWAYS...
            </motion.p>
        </div>
    );
}