// app/components/AuroraNavbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import DynamicLogo from "../DynamicLogo";

// Define the navigation items
const navItems = [
  { name: "Home", href: "/" },
  { name: "Experience", href: "/Experience" },
  { name: "Skills", href: "/Skills" },
  { name: "Contact", href: "/ContactMe" },
];

export default function AuroraNavbar() {
  const router = useRouter();
  const rawPathname = usePathname(); // Use a local variable for the hook result

  // --- SAFETY CHECK ---
  // If the pathname is null or undefined (SSR/static export), return a non-breaking element
  if (!rawPathname) {
      // You can return a simple, un-animated placeholder to maintain height if needed, 
      // but returning null is safer if you rely heavily on pathname logic.
      return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-gray-900/50 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8"></div>
        </nav>
      ); 
  }

  // Once rawPathname is confirmed, we can use it safely.
  const pathname = rawPathname;

  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  // Sync active link state with the current URL path
  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => {
      // Use the safe pathname variable here
      const normalizedPath = pathname.toLowerCase().replace(/\/$/, "");
      const normalizedHref = item.href.toLowerCase().replace(/\/$/, "");

      if (
        item.name === "Home" &&
        (normalizedPath === "/" || normalizedPath === "/home")
      ) {
        return true;
      }
      return normalizedPath === normalizedHref;
    });

    setActiveItem(currentIndex !== -1 ? currentIndex : 0);
  }, [pathname]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLinkClick = (index: number) => {
    const targetHref = navItems[index].href;
    setActiveItem(index);
    setIsOpen(false);
    router.push(targetHref);
  };

  const menuVariants = {
    closed: { opacity: 0, y: -10 },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900/50 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Dynamic Logo Component */}
          <motion.div
            className="flex items-center flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push("/")}
          >
            <div className="text-3xl font-extrabold">
              <DynamicLogo />
            </div>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 relative">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`
                    relative px-3 py-2 text-lg font-bold transition-all duration-300 ease-in-out
                    ${
                      index === activeItem
                        ? "text-white"
                        : "text-gray-400 hover:text-cyan-300 hover:scale-105"
                    }
                  `}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(index);
                  }}
                  whileHover={{
                    y: -2,
                    textShadow:
                      index !== activeItem
                        ? "0 0 8px rgba(45, 212, 191, 0.7)"
                        : "none",
                  }}
                >
                  {item.name}
                  {index === activeItem && (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex-shrink-0">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-400 hover:text-cyan-400 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden origin-top"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(index);
                  }}
                  className={`
                    block rounded-md px-3 py-2 text-base font-medium transition-colors
                    ${
                      index === activeItem
                        ? "bg-cyan-900/50 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-cyan-300"
                    }
                  `}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}