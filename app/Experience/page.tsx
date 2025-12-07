// app/components/AboutMeJourney.tsx
"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { icons } from 'lucide-react';

// Define the Milestones - RESTRUCTURED PROFESSIONAL PROGRESSION
const milestones = [
    { 
        title: "Initial Professional Exposure", 
        subtitle: "6-Month Internship at Forkodes",
        details: ["Gained hands-on experience as a Full Stack Web Developer.", "Worked with modern JavaScript frameworks."],
        year: "Jun 2022 - Dec 2022",
        color: "bg-cyan-600",
        icons: "📚"

    },
    { 
        title: "Associate QA (Jio Platforms Limited)", 
        subtitle: "Automation Tester",
        details: ["Worked for 4 months in Automation Testing at Jio Platforms Limited.", "Focused on quality assurance and creating robust test scripts."],
        year: "Jan 2024 - Apr 2024",
        color: "bg-orange-500", // New color for the QA step
        icons : "🌱"
        
    },
    {
        title: "SDE (Jio Platforms Limited)",
        subtitle: " Full Stack Development",
        details: [
          "Implemented Redis caching, reducing API response time from 100ms to 4ms.",
    "Developed and maintained multiple high-performance frontend applications using React and Next.js, focusing on SEO and accessibility.",
    "Designed and secured internal DAM system used by 100+ users (RBAC).",
    "Containerized application stack with Docker and Docker Compose, simplifying deployment."
        ],
        year: "Apr 2024 - Present",
        color: "bg-red-500",
        icons : "💻"
      
    },
 
   
];


// --- Sub-Component for each Timeline Item (The core of the animation) ---
const MilestoneCard = ({ milestone, index }: { milestone: typeof milestones[0], index: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "center 0.5"] 
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 5 : -5, 0]);

    const placementClass = index % 2 === 0 ? "lg:mr-auto lg:text-left" : "lg:ml-auto lg:text-right";
    
    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale, rotate }}
            className={`flex w-full ${placementClass} mb-32 max-w-lg transition-all duration-300`}
        >
            <div className="flex-1 p-8 rounded-2xl shadow-xl border border-gray-700/50 bg-gray-800 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center p-2 rounded-full h-12 w-12 text-2xl text-white mr-4" style={{ backgroundColor: milestone.color.replace('bg-', '') }}>
                        {milestone.icons}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-300">{milestone.year}</h3>
                </div>

                <h2 className="text-4xl font-extrabold text-cyan-400 mb-2">{milestone.title}</h2>
                <h4 className="text-xl font-medium text-white-300 mb-4">{milestone.subtitle}</h4>
                
                {/* Dynamically render details as a list for better readability */}
                <ul className="text-lg text-gray-400 leading-relaxed list-disc list-inside space-y-2">
                    {milestone.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};


// --- Main Journey Component ---
export default function AboutMeJourney() {
    return (
        // Wrapper for fixed navbar padding and dark background
        <div className="min-h-screen bg-gray-900 text-white pt-24 pb-20 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* --- HEADER --- */}
                <header className="text-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-8xl font-extrabold text-white mb-4"
                    >
                        My Professional Progression
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-2xl text-gray-400"
                    >
                    </motion.p>
                </header>

                {/* --- VERTICAL TIMELINE --- */}
                <div className="relative">
                    {/* The Center Vertical Line (visible on desktop) */}
                    <div className="hidden lg:block absolute left-1/2 w-1 bg-cyan-400/50 h-full transform -translate-x-1/2 top-0" />
                    
                    {/* Map Milestones */}
                    {milestones.map((milestone, index) => (
                        <MilestoneCard key={index} milestone={milestone} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}