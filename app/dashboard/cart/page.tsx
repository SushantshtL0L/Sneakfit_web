"use client";

import React from "react";
import Sidebar from "../_components/Sidebar";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, updateSize } = useCart();

    const handleRemove = (id: string, size: string) => {
        removeFromCart(id, size);
        toast.info("Item removed from cart");
    };

    const handleQuantityChange = (id: string, size: string, currentQty: number, delta: number) => {
        updateQuantity(id, size, currentQty + delta);
    };

    const sizes = ["38", "39", "40", "41", "42", "43", "44", "45"];

    return (
        <div className="flex min-h-screen bg-[#f5f5f5] text-gray-900 font-sans transition-colors duration-300">
            <Sidebar activePage="cart" />

            {/* Main Content Area */}
            <main className="flex-1 bg-[#d9d9d9] relative flex flex-col transition-colors duration-300">
                <div className="p-12 max-w-6xl mx-auto w-full flex-1 flex flex-col pb-48">
                    <h1 className="text-4xl font-bold mb-8 text-gray-800">My Cart</h1>

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
                                        className="bg-[#ececec] rounded-[40px] p-8 flex items-center gap-12 shadow-sm relative group transition-colors duration-300"
                                    >
                                        {/* Product Image */}
                                        <div className="w-56 h-36 bg-white rounded-3xl flex items-center justify-center overflow-hidden shadow-sm">
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
                                                    <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{item.brand}</h3>
                                                    <p className="text-base text-gray-500 max-w-md line-clamp-2">{item.name}</p>
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
                                                    <div className="w-12 h-6 bg-black rounded-sm shadow-sm"></div>
                                                    <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">{item.color || "White"}</span>
                                                </div>
                                                <div className="h-6 w-[1px] bg-gray-400"></div>
                                                <div className="flex items-center gap-3 font-bold text-gray-700 uppercase tracking-widest text-sm relative">
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
                    <div className="fixed bottom-0 left-[420px] right-0 bg-transparent p-12 z-30 pointer-events-none">
                        <div className="max-w-6xl mx-auto flex items-end justify-between pointer-events-auto">
                            <div className="flex flex-col gap-2">
                                <span className="text-gray-500 font-medium tracking-widest uppercase text-xs">Total Price</span>
                                <span className="text-5xl font-bold text-gray-900 leading-none">Rs {totalPrice.toLocaleString()}</span>
                            </div>
                            <button className="bg-[#23d19d] text-white px-24 py-8 rounded-[30px] text-3xl font-bold shadow-2xl shadow-[#23d19d]/40 hover:bg-[#1eb88a] transition-all transform active:scale-95">
                                Checkout
                            </button>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
