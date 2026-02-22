"use client";

import React from "react";
import { FiSearch, FiShoppingCart, FiTrendingUp, FiTag, FiUser, FiPlusSquare, FiShoppingBag, FiArrowRight, FiBox, FiSun, FiMoon, FiHeart, FiClipboard } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SidebarItem = ({
    label,
    badge,
    active,
    href,
    icon: Icon,
    theme
}: {
    label: string,
    badge?: string,
    active?: boolean,
    href: string,
    icon: any,
    theme: string
}) => (
    <Link href={href} className="block relative group">
        <motion.div
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`
                px-6 py-4 rounded-2xl flex items-center justify-between transition-all duration-300
                ${active
                    ? theme === 'dark' ? 'bg-white text-black shadow-xl shadow-black/20' : 'bg-neutral-900 text-white shadow-xl shadow-neutral-200'
                    : theme === 'dark' ? 'text-neutral-500 hover:bg-neutral-800 hover:text-white' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'}
            `}
        >
            <div className="flex items-center gap-4">
                <div className={`
                    p-2 rounded-xl transition-colors
                    ${active
                        ? theme === 'dark' ? 'bg-black/10 text-black' : 'bg-white/10 text-white'
                        : theme === 'dark' ? 'bg-neutral-800 text-neutral-500 group-hover:bg-neutral-700' : 'bg-neutral-200/50 text-neutral-500 group-hover:bg-neutral-200'}
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
                    className={`w-1.5 h-6 rounded-full ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            ) : (
                <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400" />
            )}
        </motion.div>
    </Link>
);

export default function Sidebar({ activePage }: { activePage: "shoes" | "thrifts" | "sell" | "profile" | "support" | "sales" | "cart" | "orders" | "wishlist" | "manage-orders" }) {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { wishlistItems } = useWishlist();
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
    }, [searchValue, router, mounted]);

    return (
        <aside className={`w-[360px] border-r flex flex-col min-h-screen hidden xl:flex pb-20 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0d0d0d] border-neutral-800' : 'bg-[#f8f9fa] border-neutral-100'}`}>
            <div className="p-10 flex flex-col h-full">
                <div className="flex justify-between items-center mb-12">
                    <Link href="/dashboard">
                        <div className="flex items-center gap-3 group">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 ${theme === 'dark' ? 'bg-white' : 'bg-neutral-900'}`}>
                                <span className={`font-black text-2xl ${theme === 'dark' ? 'text-black' : 'text-white'}`}>S</span>
                            </div>
                            <h1 className={`text-3xl font-black tracking-tighter cursor-pointer ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                                SneakFit<span className="text-neutral-400">.</span>
                            </h1>
                        </div>
                    </Link>

                    {/* Quick Access Toggle in Sidebar */}
                    <button
                        onClick={toggleTheme}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg ${theme === 'dark' ? 'bg-white text-black' : 'bg-neutral-900 text-white'}`}
                    >
                        {theme === 'light' ? <FiMoon className="text-xl" /> : <FiSun className="text-xl" />}
                    </button>
                </div>

                <div className="relative mb-12 group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none group-focus-within:text-blue-500 transition-colors text-neutral-400">
                        <FiSearch className="text-xl" />
                    </div>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Look for kicks..."
                        className={`w-full border-none rounded-2xl py-5 pl-14 pr-6 text-sm font-semibold placeholder-neutral-400 focus:ring-2 outline-none transition-all shadow-sm ${theme === 'dark' ? 'bg-neutral-800 text-white focus:ring-neutral-700' : 'bg-neutral-100 text-neutral-900 focus:ring-neutral-200'}`}
                    />
                </div>

                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-6 px-4">
                    Marketplace
                </div>
                <nav className="flex flex-col gap-2 flex-1">
                    <SidebarItem label="Shoes" active={activePage === "shoes"} href="/dashboard" icon={FiShoppingBag} theme={theme} />
                    <SidebarItem label="Thrifts" active={activePage === "thrifts"} badge="New" href="/dashboard/thrifts" icon={FiTag} theme={theme} />
                    <SidebarItem label="Most Sales" active={activePage === "sales"} href="#" icon={FiTrendingUp} theme={theme} />

                    <div className="mt-8 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-6 px-4">
                        Account
                    </div>
                    <SidebarItem label="My Cart" active={activePage === "cart"} href="/dashboard/cart" icon={FiShoppingCart} theme={theme} />
                    <SidebarItem label="My Wishlist" active={activePage === "wishlist"} href="/dashboard/wishlist" icon={FiHeart} badge={wishlistItems.length > 0 ? String(wishlistItems.length) : undefined} theme={theme} />
                    <SidebarItem label="My Orders" active={activePage === "orders"} href="/dashboard/orders" icon={FiBox} theme={theme} />
                    {isSeller && (
                        <SidebarItem label="Sell Item" active={activePage === "sell"} href="/dashboard/sell" icon={FiPlusSquare} theme={theme} />
                    )}
                    {isSeller && (
                        <SidebarItem label="Manage Orders" active={activePage === "manage-orders"} href="/dashboard/orders/manage" icon={FiClipboard} theme={theme} />
                    )}
                    <SidebarItem label="Profile" active={activePage === "profile"} href="/profile" icon={FiUser} theme={theme} />
                </nav>

                <div className={`mt-10 p-6 rounded-3xl relative overflow-hidden group transition-colors ${theme === 'dark' ? 'bg-white' : 'bg-neutral-900'}`}>
                    <div className={`relative z-10 ${theme === 'dark' ? 'text-black' : 'text-white'}`}>
                        <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>Upgrade</p>
                        <p className="text-lg font-bold mb-4">Go Pro & Save</p>
                        <button className={`text-xs font-black py-2 px-4 rounded-xl transition-colors uppercase ${theme === 'dark' ? 'bg-neutral-900 text-white hover:bg-black' : 'bg-white text-black hover:bg-neutral-200'}`}>
                            Learn More
                        </button>
                    </div>
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -mr-16 -mt-16 transition-colors ${theme === 'dark' ? 'bg-black/5 group-hover:bg-black/10' : 'bg-white/5 group-hover:bg-white/10'}`}></div>
                </div>
            </div>
        </aside>
    );
}
