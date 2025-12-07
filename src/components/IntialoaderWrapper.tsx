// app/components/InitialLoaderWrapper.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReliablePulsarLoader from './LoadingScreen/CosmicPulseLoader'; 
import { usePathname } from 'next/navigation';

// Key used in Local Storage to track completed load
const HAS_LOADED_KEY = 'website_has_completed_initial_load'; 
// Duration to show loader: 3 cycles * 3.0s = 9.0s + 0.5s fade-out = 9500ms
const LOADER_DURATION_MS = 9500; 

export default function InitialLoaderWrapper({ children }: { children: React.ReactNode }) {
    // 1. Tracks if the current hard load needs the timer to run
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    // 2. Tracks when the fade-out process should begin
    const [isDoneLoading, setIsDoneLoading] = useState(false);
    const pathname = usePathname(); // Used to ensure logic runs reliably

    useEffect(() => {
        // --- 1. Skip Animation for Internal Navigation ---
        // If the flag is set, this is a soft navigation (not a hard reload). We hide instantly.
        if (typeof window !== 'undefined' && localStorage.getItem(HAS_LOADED_KEY) === 'true') {
            setIsInitialLoad(false);
            setIsDoneLoading(true);
            return;
        }

        // --- 2. If Initial Load (or Hard Refresh): Force Timer ---
        
        const timer = setTimeout(() => {
            // After the animation duration, signal the component to start fading out
            setIsDoneLoading(true); 
            
            // Set the flag in Local Storage only after the animation is finished
            if (typeof window !== 'undefined') {
                localStorage.setItem(HAS_LOADED_KEY, 'true');
            }
        }, LOADER_DURATION_MS);

        return () => clearTimeout(timer);
    }, [pathname]); // Rerun effect if navigation occurs

    // --- Animation Variants for the Loader Wrapper Fade-Out ---
    const loaderVariants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0, transition: { duration: 0.5 } }, 
    };

    // If the flag is set AND we are done loading (and fading is complete), render children only.
    if (!isInitialLoad && isDoneLoading) {
        return <>{children}</>;
    }

    // Render the loader while the timer is running, and handle the transition out.
    return (
        <motion.div
            // Sets initial visibility
            initial="visible"
            // Triggers the fade-out when isDoneLoading becomes true
            animate={isDoneLoading ? "hidden" : "visible"} 
            variants={loaderVariants}
            
            // CRITICAL: This ensures the component is REMOVED from the DOM only AFTER the fade animation finishes.
            onAnimationComplete={(definition) => {
                if (definition === 'hidden') {
                    // Force final re-render to completely remove the loader from the DOM
                    setIsInitialLoad(false); 
                }
            }}
            className="fixed inset-0 z-[10000] pointer-events-auto"
        >
            <ReliablePulsarLoader />
        </motion.div>
    );
}