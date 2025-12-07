"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"
import { FaReact, FaDocker, FaPython, FaGithub, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiRedis } from "react-icons/si";
import { RiTailwindCssLine } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io";
import { BiLogoPostgresql } from "react-icons/bi";
import { RiNextjsFill } from "react-icons/ri";
import { SiPostman } from "react-icons/si";

import { DiMysql } from "react-icons/di";
import React from "react";
import Aurora from "@/src/components/Aurora/Aurora";
// Removed unused import: import { redirect } from "next/dist/server/api-utils";

// Variants are fine and reusable
const textVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
            duration: 0.8,
            type: "spring",
            damping: 10,
            stiffness: 100
        }
    },
};


export default function DragConstraints() {
    const router = useRouter();
    const constraintsRef = useRef<HTMLDivElement>(null)
    const [componentKey, setComponentKey] = useState(0); 

    const handleClick = ()=>{
        // router.refresh() is the App Router's soft reload (resetting positions)
        router.refresh(); 
        setComponentKey(prev => prev + 1); // Optional: Force component remount for full reset
    }

    return (
        // Changed mt-15 to pt-16 for correct navbar clearance
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-900 "> 
      <div className="mt-15 md:mt-10 flex flex-col items-center">
            <motion.h1
                className="animate-pulse h1Text text-4xl sm:text-6xl cursor-pointer font-extrabold  text-white mt-10 mb-10 uppercase tracking-widest z-10"
                initial="hidden"
                animate="visible"
                onClick={handleClick}
            >
                Skills
            </motion.h1>

            {/* Added sm:gap-4 and sm:p-4 for better spacing on small screens */}
            <motion.div 
                key={componentKey} // Used for forced reset
                className="flex flex-wrap gap-4 md:gap-14 justify-center items-center p-10 " 
                ref={constraintsRef} 
                style={constraints}
            >
        
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="w-20 h-20 md:w-60 md:h-60 flex justify-center items-center rounded-2xl"
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                >
                    <FaReact className="text-4xl md:text-6xl" color="rgb(97, 218, 251)"/>
                </motion.div>
     <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="w-20 h-20 md:w-60 md:h-60 flex justify-center items-center rounded-2xl"
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                >
                    <RiNextjsFill className="text-4xl md:text-6xl" color="rgb(97, 218, 251)"/>
                </motion.div>
                {/* MongoDB Icon */}
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="w-20 h-20 md:w-60 md:h-60 flex justify-center items-center rounded-2xl"
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                >
                    <SiMongodb className="text-4xl md:text-6xl" color="rgb(71, 162, 72)"/>
                </motion.div>

                {/* Tailwind CSS Icon */}
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="w-20 h-20 md:w-60 md:h-60 flex justify-center items-center rounded-2xl "
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                >
                    <RiTailwindCssLine className="text-5xl md:text-6xl" color="rgb(6, 182, 212)"/>
                </motion.div>

                {/* Docker Icon */}
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="w-20 h-20 md:w-60 md:h-60 flex justify-center items-center rounded-2xl"
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                >
                    <FaDocker className="text-4xl md:text-6xl" color="rgb(13, 183, 237)"/>
                </motion.div>

                {/* JavaScript Icon */}
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="w-20 h-20 md:w-60 md:h-60 flex justify-center items-center rounded-2xl"
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                >
                    <IoLogoJavascript className="text-4xl md:text-6xl" color="rgb(247, 223, 30)"/>
                </motion.div>

                {/* Python Icon */}
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="w-20 h-20 md:w-60 md:h-60 flex justify-center items-center rounded-2xl"
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                >
                    <FaPython className="text-4xl md:text-6xl" color="rgb(48, 105, 152)"/>
                </motion.div>

                {/* PostgreSQL Icon */}
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="w-20 h-20 md:w-60 md:h-60 flex justify-center items-center rounded-2xl"
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                >
                    <BiLogoPostgresql className="text-4xl md:text-6xl" color="rgb(51, 103, 145)"/>
                </motion.div>

                {/* GitHub Icon */}
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="w-20 h-20 md:w-60 md:h-60 flex justify-center items-center rounded-2xl"
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                >
                    <FaGithub className="text-4xl md:text-6xl" color="rgb(24, 23, 23)"/>
                </motion.div>
                
                {/* Node.js Icon */}
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="w-20 h-20 md:w-60 md:h-60 flex justify-center items-center rounded-2xl"
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                >
                    <FaNodeJs className="text-4xl md:text-6xl" color="rgb(104, 160, 99)"/>
                </motion.div>
                
                {/* Redis Icon */}
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="w-20 h-20 md:w-60 md:h-60 flex justify-center items-center rounded-2xl"
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                >
                    <SiRedis className="text-4xl md:text-6xl" color="rgb(216, 44, 32)"/>
                </motion.div>
                
                {/* MySQL Icon */}
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="w-20 h-20 md:w-60 md:h-60 flex justify-center items-center rounded-2xl"
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                >
                    <DiMysql className="text-4xl md:text-6xl" color="rgb(0, 117, 143)"/>
                </motion.div>
                     <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="w-20 h-20 md:w-60 md:h-60 flex justify-center items-center rounded-2xl"
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                >
                    <SiPostman className="text-4xl md:text-6xl" color="rgb(255, 108, 55)"/>
                </motion.div>
            </motion.div>
        </div>
        </div>
    )
}

// ============= STYLES =============
const constraints: React.CSSProperties = {
    // Width is now responsive via Tailwind utilities (sm:w-full, lg:w-90vw, etc.)
    // width: '100vw', 
    // height: '100vh', 
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    position: 'relative',
}

// The 'box' style is no longer needed as its properties were moved to the className
// The empty object is kept to avoid breaking the style prop reference in the JSX.
// const box: React.CSSProperties = {};