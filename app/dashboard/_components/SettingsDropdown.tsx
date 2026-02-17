"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSettings, FiMoon, FiSun, FiLock, FiLogOut, FiChevronRight, FiUser } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SettingsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { logout, user } = useAuth();
    const router = useRouter();

    // ... handle click outside and other logic ...
    // (Existing useEffect and functions remain same, adding user to dependencies if needed, but not required for simple display)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Settings Button */}
            <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-neutral-100 border border-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-50 transition-all"
            >
                <FiSettings className="text-xl" />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-80 bg-white rounded-[32px] shadow-2xl shadow-black/5 border border-neutral-100 p-6 z-50 overflow-hidden"
                    >
                        {/* User Header Section */}
                        <div className="flex items-center gap-4 mb-6 p-2">
                            <div className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                                {user?.name?.[0] || 'U'}
                            </div>
                            <div className="flex flex-col">
                                <h4 className="font-black text-neutral-900 leading-none mb-1">{user?.name || 'User'}</h4>
                                <p className="text-[10px] font-bold text-neutral-400 truncate w-32">{user?.email || 'user@example.com'}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2 px-2">Account Management</p>

                            {/* Profile Section */}
                            <button
                                onClick={() => router.push("/profile")}
                                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-all">
                                        <FiUser />
                                    </div>
                                    <span className="font-bold text-neutral-800 text-sm">View Profile</span>
                                </div>
                                <FiChevronRight className="text-neutral-300 group-hover:text-neutral-900" />
                            </button>

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-all">
                                        {isDarkMode ? <FiSun /> : <FiMoon />}
                                    </div>
                                    <span className="font-bold text-neutral-800 text-sm">Dark Theme</span>
                                </div>
                                <div className={`w-10 h-5 rounded-full transition-colors relative ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-200'}`}>
                                    <motion.div
                                        animate={{ x: isDarkMode ? 20 : 0 }}
                                        className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-sm"
                                    />
                                </div>
                            </button>

                            {/* Change Password */}
                            <button
                                onClick={() => router.push("/profile?action=change-password")}
                                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-all">
                                        <FiLock />
                                    </div>
                                    <span className="font-bold text-neutral-800 text-sm">Change Password</span>
                                </div>
                                <FiChevronRight className="text-neutral-300 group-hover:text-neutral-900" />
                            </button>

                            <div className="h-px bg-neutral-100 my-2" />

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-red-50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                        <FiLogOut />
                                    </div>
                                    <span className="font-bold text-red-600 text-sm">Logout</span>
                                </div>
                            </button>
                        </div>

                        {/* Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 z-[-1]"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
