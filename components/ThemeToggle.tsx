/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
        );
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative p-3 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-200 dark:from-indigo-900 dark:to-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-300 dark:from-indigo-800 dark:to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Sun and Moon with smooth transitions */}
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.div
                            key="moon"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.3, type: "spring" }}
                            className="text-indigo-100"
                        >
                            <FiMoon className="text-xl" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ scale: 0, rotate: 90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -90 }}
                            transition={{ duration: 0.3, type: "spring" }}
                            className="text-amber-500"
                        >
                            <FiSun className="text-xl" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Subtle glow effect */}
            <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-amber-300/20 to-orange-400/20 dark:from-indigo-400/20 dark:to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        </motion.button>
    );
}

export default ThemeToggle;