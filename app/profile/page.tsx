"use client";

import React, { useState, useRef } from "react";
import { FiSearch, FiCamera, FiUser, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const SidebarItem = ({ label, badge, active, href }: { label: string, badge?: string, active?: boolean, href: string }) => (
    <Link href={href}>
        <div
            className={`px-8 py-3 cursor-pointer transition-all duration-200 hover:opacity-70 flex items-center justify-between group`}
        >
            <div className="flex items-center gap-3">
                <span className={`text-5xl font-light tracking-tight ${active ? "text-gray-900" : "text-gray-400"}`} style={{ fontFamily: "serif" }}>{label}</span>
                {badge && (
                    <span className="bg-gray-600 text-white text-[12px] px-3 py-1 rounded-full uppercase font-bold mt-4">
                        {badge}
                    </span>
                )}
            </div>
        </div>
    </Link>
);

export default function ProfilePage() {
    const { user, checkAuth } = useAuth();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const getImageUrl = (path: string | null | undefined) => {
        if (!path) return null;
        if (path.startsWith("http")) return path;
        return `http://localhost:5050${path}`;
    };
    const fileInputRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const formData = new FormData();
            if (nameRef.current) formData.append("name", nameRef.current.value);

            // If there's a file in the input, append it
            const file = fileInputRef.current?.files?.[0];
            if (file) {
                formData.append("image", file);
            }

            const { handleUpdateProfile } = await import("@/lib/actions/auth.actions");
            const result = await handleUpdateProfile(formData);

            if (result.success) {
                await checkAuth(); // Refresh profile image from database
                alert("Profile updated successfully!");
            } else {
                alert(result.message || "Failed to update profile");
            }
        } catch (error: any) {
            alert(error.message || "Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#fcfcfc] text-gray-900 font-sans">
            {/* Sidebar - Consistent with Dashboard */}
            <aside className="w-[420px] bg-[#f5f5f5] flex flex-col h-screen sticky top-0 hidden xl:flex">
                <div className="p-16">
                    <h1 className="text-6xl font-bold tracking-tight text-gray-800 mb-20 ml-4">
                        Sneak<span className="text-gray-900">Fit.</span>
                    </h1>

                    <div className="relative mb-24 px-4">
                        <div className="absolute inset-y-0 left-12 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-600 text-3xl" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-[#f3e8e2] border-none rounded-[35px] py-8 pl-20 pr-8 text-2xl text-gray-800 placeholder-gray-400 focus:ring-0 outline-none transition-all"
                        />
                    </div>

                    <nav className="flex flex-col gap-8">
                        <SidebarItem label="Shoes" href="/dashboard" />
                        <SidebarItem label="My Cart" href="#" />
                        <SidebarItem label="Most Sales" href="#" />
                        <SidebarItem label="Thrifts" badge="New" href="#" />
                        <SidebarItem label="Profile" active href="/profile" />
                        <SidebarItem label="Support" href="#" />
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-20 bg-white overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-16">
                        <h2 className="text-6xl font-bold text-gray-900 tracking-tighter" style={{ fontFamily: "serif" }}>My Profile</h2>
                        <p className="text-gray-400 text-xl mt-4">Manage your account information and preferences.</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Left: Avatar Upload */}
                        <div className="flex flex-col items-center gap-8">
                            <div className="relative group cursor-pointer" onClick={handleImageClick}>
                                <div className="w-64 h-64 rounded-[60px] bg-[#f0f0f0] overflow-hidden border-8 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
                                    {profileImage || getImageUrl(user?.image) ? (
                                        <img
                                            src={profileImage || getImageUrl(user?.image)!}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#ececec]">
                                            <FiUser className="text-8xl text-gray-300" />
                                        </div>
                                    )}

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <div className="bg-white/20 p-6 rounded-full">
                                            <FiCamera className="text-white text-4xl" />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Edit Button */}
                                <div className="absolute -bottom-4 -right-4 bg-black text-white p-5 rounded-3xl shadow-xl hover:scale-110 transition-transform">
                                    <FiCamera className="text-2xl" />
                                </div>
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Click to upload photo</p>
                        </div>

                        {/* Right: Form Fields */}
                        <div className="lg:col-span-2 flex flex-col gap-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                        <input
                                            type="text"
                                            ref={nameRef}
                                            defaultValue={user?.name || ""}
                                            placeholder="Enter your name"
                                            className="w-full bg-[#f9f9f9] border-none rounded-[25px] py-6 pl-16 pr-6 text-xl text-gray-800 placeholder-gray-300 focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
                                    <div className="relative">
                                        <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                        <input
                                            type="email"
                                            ref={emailRef}
                                            defaultValue={user?.email || ""}
                                            placeholder="Enter your email"
                                            className="w-full bg-[#f9f9f9] border-none rounded-[25px] py-6 pl-16 pr-6 text-xl text-gray-800 placeholder-gray-300 focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Phone Number</label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                        <input
                                            type="tel"
                                            ref={phoneRef}
                                            defaultValue={user?.phone || ""}
                                            placeholder="Enter phone number"
                                            className="w-full bg-[#f9f9f9] border-none rounded-[25px] py-6 pl-16 pr-6 text-xl text-gray-800 placeholder-gray-300 focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Location</label>
                                    <div className="relative">
                                        <FiMapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                        <input
                                            type="text"
                                            ref={locationRef}
                                            defaultValue={user?.location || ""}
                                            placeholder="Enter your location"
                                            className="w-full bg-[#f9f9f9] border-none rounded-[25px] py-6 pl-16 pr-6 text-xl text-gray-800 placeholder-gray-300 focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="bg-black text-white text-xl font-bold py-8 px-16 rounded-[30px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 w-full md:w-auto"
                                >
                                    {isSaving ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            Saving Changes...
                                        </div>
                                    ) : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
