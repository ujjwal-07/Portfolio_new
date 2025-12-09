// app/components/ModularProjectShowcase.tsx
"use client";

import { motion, Variants } from "framer-motion";
import React from "react";
// Import the ExternalLink icon from lucide-react
import { ExternalLink } from 'lucide-react'; 

// --- Data Definition ---
const projectData = [
    {
        name: "OneTrace – Productivity Platform",
        role: "Project Lead & Full Stack Developer",
        techStack: ["Next.js", "Node.js", "Express", "MongoDB", "Redis", "Tailwind CSS"],
        achievements: [
            "Developed scalable home screen and landing page.",
            "Led independent frontend revamp, delivering fully responsive components.",
            "Implemented advanced optimization (lazy loading, caching) for high traffic.",
            "Built and optimized Activity Calendar for heavy concurrent usage.",
            "Integrated efficient state management to maintain data consistency."
        ],
        color: "#ff9933", // Orange/Gold
        link: "https://www.onetracewebsite.com", // Placeholder Link
    },
    {
        name: "Digital Asset Management System (DAM)",
        role: "Full Stack Developer",
        techStack: ["React.js", "Tailwind CSS", "Node.js", "MySQL", "Express.js", "Redis", "Docker"],
        achievements: [
            "Designed secure internal DAM used by 100+ users.",
            "Integrated Redis caching (reduced response time from 100ms to 4ms).",
            "Implemented role-based access control (RBAC).",
            "Containerized frontend and backend with Docker Compose."
        ],
        color: "#66ffcc", // Mint Green
        link: "https://github.com/ujjwal-07/DAM-repo", // Placeholder Link
    },
    {
        name: "App Revamp (Frontend Development)",
        role: "Frontend Lead",
        techStack: ["Next.js", "React.js", "UI Libraries", "Docker"],
        achievements: [
            "Developed scalable home screen and landing page for thousands of active users.",
            "Led independent frontend revamp, delivering high-quality, production-ready components.",
            "Implemented frontend optimization (lazy loading, code-splitting, and caching).",
            "Configured Dockerfile to streamline deployment."
        ],
        color: "#ff66cc", // Hot Pink
        // No link provided for this project
    },
    {
        name: "Frontend Developer — High-Traffic National Campaign Platform",
        role: "Frontend Developer",
        techStack: ["Next.js", "Tailwind CSS", "react-fast-marquee", "react-slick"],
        achievements: [
            "Delivered Viksit Bharat website integrated into NaMo app & site (10M+ downloads).",
            "Designed responsive, modular UI under tight deadlines."
        ],
        color: "#3399ff", // Bright Blue
        link: "https://www.vikasyatra-demo.in", // Placeholder Link
    },
];


// --- Variants for Staggered Grid Entrance ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: {
            staggerChildren: 0.15, 
        } 
    },
};

const cardItemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
        }
    },
};


/**
 * ==============   Component Logic   ================
 */

// Define interface including the optional link property
interface ProjectDataType {
    name: string;
    role: string;
    techStack: string[];
    achievements: string[];
    color: string;
    link?: string; // Optional link property
}

interface ProjectCardProps {
    project: ProjectDataType;
}

function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            variants={cardItemVariants}
            className="w-full h-full relative p-6 rounded-2xl overflow-hidden"
            style={{
                backgroundColor: "rgba(30, 30, 30, 0.9)",
                borderTop: `4px solid ${project.color}`,
                boxShadow: `0 0 10px ${project.color}50`,
            }}
            whileHover={{ 
                y: -5, 
                scale: 1.02, 
                boxShadow: `0 0 25px ${project.color}ff`,
                transition: { type: "spring", stiffness: 300 } 
            }}
        >
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                    <h3 className="text-2xl font-bold text-white mb-1 mr-3">{project.name}</h3>
                    
                    {/* --- NEW LINK TAG --- */}
                    {/* {project.link && (
                        <motion.a 
                            href={project.link}
                            target="_blank" // Opens link in a new tab
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full -mt-2"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            style={{ color: project.color }} // Apply the project color to the icon
                            title={`View ${project.name} Live`} // Tooltip on hover
                        >
                            <ExternalLink size={20} />
                        </motion.a>
                    )} */}
                </div>
            </div>
            
            <p className="text-sm font-medium opacity-70" style={{ color: project.color }}>{project.role}</p>

            {/* Achievements */}
            <h4 className="text-sm font-semibold text-gray-400 mb-2 mt-4">KEY ACHIEVEMENTS:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm pl-4">
                {project.achievements.map((achieve, i) => (
                    <li key={i}>{achieve}</li>
                ))}
            </ul>

            {/* Tech Stack Chips */}
            <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                    <span 
                        key={i} 
                        className="text-xs px-3 py-1 rounded-full font-mono font-medium"
                        style={{ backgroundColor: `${project.color}20`, color: project.color, border: `1px solid ${project.color}80` }}
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

export default function ModularProjectShowcase() {
    return (
        <div style={container} className="relative bg-gray-900">
            <motion.h2 
                style={timelineHeader}
                initial={{ opacity: 0, y: -40, scale: 0.9 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 50 }}
            >
                <span style={{ fontWeight: 900 }}>HIGH-IMPACT</span> PROJECTS
            </motion.h2>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2, once: true }}
            >
                {projectData.map((project) => (
                    <ProjectCard project={project} key={project.name} />
                ))}
            </motion.div>
        </div>
    );
}


/**
 * ==============   Styles   ================
 */

const timelineHeader: React.CSSProperties = {
    textAlign: "center",
    fontSize: "3rem",
    color: "#fff",
    marginBottom: "50px",
textShadow: "0 0 10px rgba(0, 255, 255, 0.8), 0 0 15px rgba(255, 51, 204, 0.3)",    fontWeight: 600, 
    letterSpacing: "0.15em",
};

const container: React.CSSProperties = {
    margin: "0 auto",
    padding: "100px 20px 200px 20px",
    position: "relative",
};