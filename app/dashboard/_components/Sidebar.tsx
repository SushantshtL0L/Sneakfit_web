"use client";

import React from "react";
import { FiSearch, FiShoppingCart, FiTrendingUp, FiTag, FiUser, FiPlusSquare, FiShoppingBag, FiArrowRight, FiBox } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SidebarItem = ({
    label,
    badge,
    active,
    href,
    icon: Icon
}: {
    label: string,
    badge?: string,
    active?: boolean,
    href: string,
    icon: any
}) => (
    <Link href={href} className="block relative group">
        <motion.div
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`
                px-6 py-4 rounded-2xl flex items-center justify-between transition-all duration-300
                ${active
                    ? 'bg-neutral-900 text-white shadow-xl shadow-neutral-200'
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'}
            `}
        >
            <div className="flex items-center gap-4">
                <div className={`
                    p-2 rounded-xl transition-colors
                    ${active ? 'bg-white/10 text-white' : 'bg-neutral-200/50 text-neutral-500 group-hover:bg-neutral-200'}
                `}>
                    <Icon className="text-xl" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tight uppercase">{label}</span>
                    {badge && (
                        <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase">
                            {badge}
                        </span>
                    )}
                </div>
            </div>
            {active ? (
                <motion.div
                    layoutId="active-nav"
                    className="w-1.5 h-6 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            ) : (
                <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400" />
            )}
        </motion.div>
    </Link>
);

export default function Sidebar({ activePage }: { activePage: "shoes" | "thrifts" | "sell" | "profile" | "support" | "sales" | "cart" | "orders" }) {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchValue, setSearchValue] = React.useState(searchParams.get("search") || "");
    const [mounted, setMounted] = React.useState(false);

    const userRole = user?.role?.toLowerCase() || "";
    const isSeller = userRole === "seller" || userRole === "admin";

    React.useEffect(() => setMounted(true), []);

    // Live Search Logic (Debounced)
    React.useEffect(() => {
        if (!mounted) return;

        // Only push if the search actually differs from the current URL to prevent loops
        const currentSearch = searchParams.get("search") || "";
        if (searchValue === currentSearch) return;

        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchValue) {
                params.set("search", searchValue);
            } else {
                params.delete("search");
            }
            router.push(`/dashboard?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue, router, mounted]); // Removed searchParams from here

    return (
        <aside className="w-[360px] bg-[#f8f9fa] border-r border-neutral-100 flex flex-col min-h-screen hidden xl:flex pb-20">
            <div className="p-10 flex flex-col h-full">
                <div className="flex justify-between items-center mb-12">
                    <Link href="/dashboard">
                        <div className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                                <span className="text-white font-black text-2xl">S</span>
                            </div>
                            <h1 className="text-3xl font-black tracking-tighter text-neutral-900 cursor-pointer">
                                SneakFit<span className="text-neutral-400">.</span>
                            </h1>
                        </div>
                    </Link>
                </div>

                <div className="relative mb-12 group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none group-focus-within:text-neutral-900 transition-colors text-neutral-400">
                        <FiSearch className="text-xl" />
                    </div>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Look for kicks..."
                        className="w-full bg-neutral-100 border-none rounded-2xl py-5 pl-14 pr-6 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-200 outline-none transition-all shadow-sm"
                    />
                </div>

                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-6 px-4">
                    Marketplace
                </div>
                <nav className="flex flex-col gap-2 flex-1">
                    <SidebarItem label="Shoes" active={activePage === "shoes"} href="/dashboard" icon={FiShoppingBag} />
                    <SidebarItem label="Thrifts" active={activePage === "thrifts"} badge="New" href="/dashboard/thrifts" icon={FiTag} />
                    <SidebarItem label="Most Sales" active={activePage === "sales"} href="#" icon={FiTrendingUp} />

                    <div className="mt-8 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-6 px-4">
                        Account
                    </div>
                    <SidebarItem label="My Cart" active={activePage === "cart"} href="/dashboard/cart" icon={FiShoppingCart} />
                    <SidebarItem label="My Orders" active={activePage === "orders"} href="/dashboard/orders" icon={FiBox} />
                    {isSeller && (
                        <SidebarItem label="Sell Item" active={activePage === "sell"} href="/dashboard/sell" icon={FiPlusSquare} />
                    )}
                    <SidebarItem label="Profile" active={activePage === "profile"} href="/profile" icon={FiUser} />
                </nav>

                <div className="mt-10 p-6 bg-neutral-900 rounded-3xl relative overflow-hidden group">
                    <div className="relative z-10 text-white">
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Upgrade</p>
                        <p className="text-lg font-bold mb-4">Go Pro & Save</p>
                        <button className="bg-white text-black text-xs font-black py-2 px-4 rounded-xl hover:bg-neutral-200 transition-colors uppercase">
                            Learn More
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors"></div>
                </div>
            </div>
        </aside>
    );
}

