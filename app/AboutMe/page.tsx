// app/components/AboutMeJourney.tsx
"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// Import the LinkedIn icon (assuming you have lucide-react installed)
import { Linkedin } from 'lucide-react'; 

// Define the Milestones
const milestones = [
    { 
        title: "Educational Foundation", 
        subtitle: "Completed my BE in Computer Engineering",
        details: "Thakur College of Engineering and Technology (TCET), Mumbai. Built a strong technical base in software development and data structures.",
        year: "2019 - 2023",
        color: "bg-purple-600",
        icon: "🎓"
    },
    { 
        title: "First Professional Experience", 
        subtitle: "6-Month Internship at Forkodes",
        details: "Gained hands-on experience in full-stack web development, working with modern JavaScript frameworks during the 7th semester of college.",
        year: "Jun 2022 - Dec 2022",
        color: "bg-cyan-600",
        icon: "📚"
    },
    { 
        title: "Associate QA (Jio Platforms)", 
        subtitle: "Automation Tester",
        details: ["Worked for 4 months in Automation Testing at Jio Platforms Limited.", "Focused on quality assurance and creating robust test scripts."],
        year: "Jan 2024 - Apr 2024",
        color: "bg-orange-500", 
        icon: "🔬" // FIX: Changed 'icons' to 'icon' and used a professional emoji
    },
    { 
        title: "SDE (Jio Platforms)", 
        subtitle: "Software Engineer at Jio Platforms Limited",
        details: "Working on scalable enterprise solutions and contributing to high-impact projects since joining in early 2024. Focused on performance and reliability.",
        year: "Jan 2024 - Present",
        color: "bg-emerald-600",
        icon: "💡" // Used a professional SDE icon
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

    // Check if details is a string or an array for proper rendering
    const detailsArray = Array.isArray(milestone.details) ? milestone.details : [milestone.details];

    const placementClass = index % 2 === 0 ? "lg:mr-auto lg:text-left" : "lg:ml-auto lg:text-right";
    
    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale, rotate }}
            className={`flex w-full ${placementClass} mb-32 max-w-lg transition-all duration-300`}
        >
            <div className="flex-1 p-8 rounded-2xl shadow-xl border border-gray-700/50 bg-gray-800 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                    {/* Icon container */}
                    <div className={`flex items-center justify-center p-2 rounded-full h-12 w-12 text-2xl text-white mr-4 ${milestone.color}`}>
                        {milestone.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-300">{milestone.year}</h3>
                </div>

                <h2 className="text-4xl font-extrabold text-cyan-400 mb-2">{milestone.title}</h2>
                <h4 className="text-xl font-medium text-purple-300 mb-4">{milestone.subtitle}</h4>
                
                {/* Handle rendering details as list or paragraph */}
                <ul className="text-lg text-gray-400 leading-relaxed list-disc list-inside space-y-2">
                    {detailsArray.map((detail, i) => (
                        <li key={i} className={Array.isArray(milestone.details) ? "" : "list-none"}>{detail}</li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};


// --- Main Journey Component ---
export default function AboutMeJourney() {
    // LinkedIn URL
    const LINKEDIN_URL = "https://www.linkedin.com/in/ujjwal-pandey-3253691a7/";

    return (
        <div className="min-h-screen bg-gray-900 text-white pt-24 pb-20 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* --- HEADER --- */}
                <header className="text-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-6xl md:text-8xl font-extrabold text-white mb-4"
                    >
                        My Journey
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-2xl text-gray-400 mb-6"
                    >
                        A chronological path through education, experience, and career.
                    </motion.p>
                    
                    {/* --- LINKEDIN BUTTON/LINK --- */}
                    <motion.a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 border border-purple-400 rounded-full text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.5 }}
                    >
                        <Linkedin size={20} className="mr-2" />
                        Connect on LinkedIn
                    </motion.a>
                </header>

                {/* --- VERTICAL TIMELINE --- */}
                <div className="relative">
                    {/* The Center Vertical Line (visible on desktop) */}
                    <div className="hidden lg:block absolute left-1/2 w-1 bg-gray-700 h-full transform -translate-x-1/2 top-0" />
                    
                    {/* Map Milestones */}
                    {milestones.map((milestone, index) => (
                        <MilestoneCard key={index} milestone={milestone} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}