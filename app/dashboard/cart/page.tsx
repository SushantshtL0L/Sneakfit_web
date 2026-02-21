"use client";

import React, { useState } from "react";
import Sidebar from "../_components/Sidebar";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiCheckCircle, FiLoader, FiArrowRight, FiX, FiCreditCard, FiTruck } from "react-icons/fi";
import { toast } from "react-toastify";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
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
    const { theme } = useTheme();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const handleRemove = (id: string, size: string) => {
        removeFromCart(id, size);
        toast.info("Item removed from cart");
    };

    const handleQuantityChange = (id: string, size: string, currentQty: number, delta: number) => {
        updateQuantity(id, size, currentQty + delta);
    };

    const startProcessing = async () => {
        if (!selectedMethod) {
            toast.warning("Please select a payment method");
            return;
        }

        setShowPaymentModal(false);
        setIsProcessing(true);

        try {
            // Prepare order data
            const orderData = {
                items: cartItems.map(item => ({
                    product: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    size: item.size,
                    image: item.image
                })),
                totalAmount: totalPrice,
                paymentMethod: selectedMethod
            };

            const result = await handleCreateOrder(orderData);

            if (result.success) {
                // Keep the fake delay for cinematic effect
                setTimeout(() => {
                    setIsProcessing(false);
                    setIsSuccess(true);
                    clearCart();
                    toast.success("Order Placed Successfully!");
                }, 2000);
            } else {
                setIsProcessing(false);
                toast.error(result.message || "Failed to place order");
            }
        } catch (error) {
            setIsProcessing(false);
            toast.error("An error occurred while placing your order");
        }
    };

    const sizes = ["38", "39", "40", "41", "42", "43", "44", "45"];

    return (
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'}`}>
            <Sidebar activePage="cart" />

            {/* Main Content Area */}
            <main className={`flex-1 relative flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#d9d9d9]'}`}>

                <AnimatePresence>
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-1 flex flex-col items-center justify-center p-12 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-10 shadow-2xl shadow-green-500/20"
                            >
                                <FiCheckCircle className="text-7xl text-white" />
                            </motion.div>

                            <h2 className={`text-6xl font-black mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                ORDER PLACED!
                            </h2>
                            <p className="text-xl text-neutral-500 max-w-md mb-12">
                                Your order <span className="font-bold text-teal-500">#SF-{Math.floor(Math.random() * 90000) + 10000}</span> via <span className="uppercase font-bold">{selectedMethod}</span> has been received.
                                Get ready to step up your game!
                            </p>

                            <Link href="/dashboard">
                                <button className="bg-teal-500 text-white px-12 py-5 rounded-3xl text-xl font-bold hover:bg-teal-600 transition-all flex items-center gap-3 group shadow-xl shadow-teal-500/20">
                                    Continue Shopping
                                    <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </Link>
                        </motion.div>
                    ) : (
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
                    )}
                </AnimatePresence>

                {/* Checkout Footer */}
                {cartItems.length > 0 && !isSuccess && (
                    <div className="fixed bottom-0 left-[360px] right-0 bg-transparent p-12 z-30 pointer-events-none">
                        <div className="max-w-6xl mx-auto flex items-end justify-between pointer-events-auto">
                            <div className="flex flex-col gap-2">
                                <span className={`font-medium tracking-widest uppercase text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}`}>Total Price</span>
                                <span className={`text-5xl font-bold leading-none ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Rs {totalPrice.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={() => setShowPaymentModal(true)}
                                className="bg-[#23d19d] text-white px-24 py-8 rounded-[30px] text-3xl font-bold shadow-2xl shadow-[#23d19d]/40 hover:bg-[#1eb88a] transition-all transform active:scale-95 disabled:opacity-50 min-w-[320px] flex items-center justify-center"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}

                {/* Payment Selection Modal */}
                <AnimatePresence>
                    {showPaymentModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110] flex items-center justify-center p-6"
                        >
                            <motion.div
                                initial={{ y: 50, scale: 0.9 }}
                                animate={{ y: 0, scale: 1 }}
                                className={`w-full max-w-xl rounded-[50px] p-12 relative shadow-2xl ${theme === 'dark' ? 'bg-[#0d0d0d] border border-neutral-800' : 'bg-white'}`}
                            >
                                <button
                                    onClick={() => setShowPaymentModal(false)}
                                    className="absolute top-8 right-8 text-neutral-400 hover:text-red-500 transition-colors"
                                >
                                    <FiX className="text-3xl" />
                                </button>

                                <h3 className={`text-3xl font-black mb-10 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    CHOOSE PAYMENT
                                </h3>

                                <div className="grid grid-cols-1 gap-4 mb-10">
                                    {PAYMENT_METHODS.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setSelectedMethod(method.id)}
                                            className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${selectedMethod === method.id
                                                ? `${method.color} bg-opacity-10 scale-105`
                                                : theme === 'dark' ? 'border-neutral-800 bg-neutral-900/50 grayscale hover:grayscale-0' : 'border-neutral-100 bg-[#f9f9f9] grayscale hover:grayscale-0'
                                                }`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`text-3xl ${selectedMethod === method.id ? method.textColor : 'text-neutral-400'}`}>
                                                    {method.logo ? (
                                                        <img src={method.logo} alt={method.name} className="h-8 object-contain" />
                                                    ) : (
                                                        method.icon
                                                    )}
                                                </div>
                                                <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{method.name}</span>
                                            </div>
                                            {selectedMethod === method.id && (
                                                <FiCheckCircle className={`text-2xl ${method.textColor}`} />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={startProcessing}
                                    className="w-full bg-[#23d19d] text-white py-6 rounded-[30px] text-2xl font-bold shadow-xl shadow-[#23d19d]/20 hover:bg-[#1eb88a] transition-all flex items-center justify-center gap-3"
                                >
                                    Pay Now <FiArrowRight />
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Processing Overlay */}
                <AnimatePresence>
                    {isProcessing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[120] flex flex-col items-center justify-center text-white"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 border-4 border-white/20 border-t-teal-400 rounded-full mb-10"
                            />
                            <h3 className="text-3xl font-black tracking-widest uppercase">Processing {selectedMethod === 'cod' ? 'Order' : 'Payment'}</h3>
                            <p className="text-teal-400 font-bold mt-2">
                                {selectedMethod === 'cod' ? 'Generating order details...' : `Connecting to ${selectedMethod}...`}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
        </div>
    );
}
