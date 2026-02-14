"use client";

import React from "react";

import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

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

export default function Sidebar({ activePage }: { activePage: "shoes" | "thrifts" | "sell" | "profile" | "support" | "sales" | "cart" }) {
    const { user } = useAuth();

    const userRole = user?.role?.toLowerCase() || "";
    const isSeller = userRole === "seller" || userRole === "admin";
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);


    return (
        <aside className="w-[420px] bg-[#f5f5f5] border-r border-transparent flex flex-col min-h-screen hidden xl:flex transition-colors duration-300">
            <div className="p-16 flex flex-col h-full">
                <div className="flex justify-between items-center mb-20">
                    <Link href="/dashboard">
                        <h1 className="text-6xl font-bold tracking-tight text-gray-800 ml-4 cursor-pointer transition-colors">
                            Sneak<span className="text-gray-900">Fit.</span>
                        </h1>
                    </Link>

                </div>

                <div className="relative mb-24 px-4">
                    <div className="absolute inset-y-0 left-12 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-600 text-3xl" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-[#f3e8e2] border-none rounded-[35px] py-8 pl-20 pr-8 text-2xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-gray-400 outline-none transition-all"
                    />
                </div>

                <nav className="flex flex-col gap-8 flex-1">
                    <SidebarItem label="Shoes" active={activePage === "shoes"} href="/dashboard" />
                    <SidebarItem label="My Cart" active={activePage === "cart"} href="/dashboard/cart" />
                    {isSeller && (
                        <SidebarItem label="Sell Item" active={activePage === "sell"} href="/dashboard/sell" />
                    )}
                    <SidebarItem label="Most Sales" active={activePage === "sales"} href="#" />
                    <SidebarItem label="Thrifts" active={activePage === "thrifts"} badge="New" href="/dashboard/thrifts" />
                    <SidebarItem label="Profile" active={activePage === "profile"} href="/profile" />
                </nav>
            </div>
        </aside>
    );
}
