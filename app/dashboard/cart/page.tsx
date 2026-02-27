"use client";

import React, { useState } from "react";
import Sidebar from "../_components/Sidebar";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiCheckCircle, FiLoader, FiArrowRight, FiX, FiCreditCard, FiTruck } from "react-icons/fi";
import { toast } from "react-toastify";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleCreateOrder } from "@/lib/actions/order.actions";

const PAYMENT_METHODS = [
    {
        id: 'khalti',
        name: 'Khalti',
        logo: 'https://docs.khalti.com/img/logo.png',
        color: 'border-purple-600',
        textColor: 'text-purple-600'
    },
    {
        id: 'esewa',
        name: 'eSewa',
        logo: 'https://esewa.com.np/common/images/esewa_logo.png',
        color: 'border-green-600',
        textColor: 'text-green-600'
    },
    {
        id: 'cod',
        name: 'Cash on Delivery',
        icon: <FiTruck />,
        color: 'border-orange-500',
        textColor: 'text-orange-500'
    }
];

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, updateSize, clearCart } = useCart();
    const { user } = useAuth();
    const { theme } = useTheme();
    const router = useRouter();

    const handleRemove = (id: string, size: string) => {
        removeFromCart(id, size);
        toast.info("Item removed from cart");
    };

    const handleQuantityChange = (id: string, size: string, currentQty: number, delta: number) => {
        updateQuantity(id, size, currentQty + delta);
    };

    const sizes = ["38", "39", "40", "41", "42", "43", "44", "45"];

    return (
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'}`}>
            <Sidebar activePage="cart" />

            {/* Main Content Area */}
            <main className={`flex-1 relative flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#d9d9d9]'}`}>
                <div className="p-12 max-w-6xl mx-auto w-full flex-1 flex flex-col pb-48">
                    <h1 className={`text-4xl font-bold mb-8 transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>My Cart</h1>

                    {cartItems.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
                            <FiShoppingBag className="text-8xl opacity-20" />
                            <p className="text-2xl font-medium">Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={`${item.id}-${item.size}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className={`rounded-[40px] p-8 flex items-center gap-12 shadow-sm relative group transition-colors duration-300 ${theme === 'dark' ? 'bg-neutral-900 border border-neutral-800' : 'bg-[#ececec]'
                                            }`}
                                    >
                                        {/* Product Image */}
                                        <div className={`w-56 h-36 rounded-3xl flex items-center justify-center overflow-hidden shadow-sm transition-colors ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'}`}>
                                            <img
                                                src={item.image.startsWith("http") ? item.image : `http://localhost:5050${item.image}`}
                                                alt={item.name}
                                                className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 flex flex-col gap-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className={`text-2xl font-bold tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{item.brand}</h3>
                                                    <p className={`text-base max-w-md line-clamp-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{item.name}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemove(item.id, item.size)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <FiTrash2 className="text-4xl" />
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-10 mt-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-12 h-6 rounded-sm shadow-sm ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
                                                    <span className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`}>{item.color || "White"}</span>
                                                </div>
                                                <div className="h-6 w-[1px] bg-gray-400"></div>
                                                <div className={`flex items-center gap-3 font-bold uppercase tracking-widest text-sm relative ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`}>
                                                    <span className="opacity-60">|</span>
                                                    <span>Size {item.size}</span>
                                                    {item.condition !== "thrift" && (
                                                        <select
                                                            value={item.size}
                                                            onChange={(e) => updateSize(item.id, item.size, e.target.value)}
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                        >
                                                            {sizes.map(s => (
                                                                <option key={s} value={s}>{s}</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>

                                                <div className="flex-1 flex justify-end">
                                                    <div className="flex items-center bg-[#23d19d] rounded-2xl px-8 py-3 gap-10 shadow-lg shadow-[#23d19d]/20">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.size, item.quantity, -1)}
                                                            className="text-white text-2xl hover:scale-125 transition-transform"
                                                        >
                                                            <FiMinus />
                                                        </button>
                                                        <span className="text-white font-bold text-2xl min-w-[30px] text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.size, item.quantity, 1)}
                                                            className="text-white text-2xl hover:scale-125 transition-transform"
                                                        >
                                                            <FiPlus />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Checkout Footer */}
                {cartItems.length > 0 && (
                    <div className="fixed bottom-0 left-[360px] right-0 bg-transparent p-12 z-30 pointer-events-none">
                        <div className="max-w-6xl mx-auto flex items-end justify-between pointer-events-auto">
                            <div className="flex flex-col gap-2">
                                <span className={`font-medium tracking-widest uppercase text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>Total Price</span>
                                <span className={`text-5xl font-bold leading-none ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Rs {totalPrice.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={() => {
                                    if (user?.role === "seller") {
                                        toast.error("Seller accounts are not allowed to place orders.");
                                        return;
                                    }
                                    router.push("/dashboard/checkout");
                                }}
                                className={`px-24 py-8 rounded-[30px] text-3xl font-bold shadow-2xl transition-all transform active:scale-95 min-w-[320px] flex items-center justify-center ${user?.role === "seller"
                                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed shadow-none"
                                    : "bg-[#23d19d] text-white shadow-[#23d19d]/40 hover:bg-[#1eb88a]"
                                    }`}
                                disabled={user?.role === "seller"}
                            >
                                {user?.role === "seller" ? "Disabled" : "Checkout"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Payment modal removed as checkout is now handled in its own page */}

            </main>
        </div >
    );
}
