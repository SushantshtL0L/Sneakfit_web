"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../_components/Sidebar";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiPackage, FiCreditCard, FiCheckCircle, FiArrowRight, FiArrowLeft, FiTruck, FiPhone, FiUser, FiInfo } from "react-icons/fi";
import { toast } from "react-toastify";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleCreateOrder } from "@/lib/actions/order.actions";

const STEPS = [
    { id: 'address', label: 'ADDRESS', icon: <FiMapPin /> },
    { id: 'summary', label: 'SUMMARY', icon: <FiPackage /> },
    { id: 'payment', label: 'PAYMENT', icon: <FiCreditCard /> }
];

const PAYMENT_METHODS = [
    {
        id: 'khalti',
        name: 'Khalti',
        logo: 'https://docs.khalti.com/img/logo.png',
        color: 'border-purple-600',
        textColor: 'text-purple-600',
        description: 'Pay using Khalti Wallet or MBanking'
    },
    {
        id: 'esewa',
        name: 'eSewa',
        logo: 'https://esewa.com.np/common/images/esewa_logo.png',
        color: 'border-green-600',
        textColor: 'text-green-600',
        description: 'Pay using eSewa Wallet'
    },
    {
        id: 'cod',
        name: 'Cash on Delivery',
        icon: <FiTruck />,
        color: 'border-orange-500',
        textColor: 'text-orange-500',
        description: 'Pay when you receive your kicks'
    }
];

export default function CheckoutPage() {
    const { cartItems, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const { theme } = useTheme();
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        address: user?.location || "",
        city: "Kathmandu",
        paymentMethod: ""
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: prev.name || user.name || "",
                phone: prev.phone || user.phone || "",
                address: prev.address || user.location || ""
            }));
        }
    }, [user]);

    useEffect(() => {
        if (cartItems.length === 0 && !isSuccess) {
            router.push("/dashboard/cart");
        }
    }, [cartItems, isSuccess, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        if (currentStep === 0) {
            if (!formData.name || !formData.phone || !formData.address) {
                toast.warning("Please fill in all shipping details");
                return;
            }
        }
        if (currentStep === 2) {
            if (!formData.paymentMethod) {
                toast.warning("Please select a payment method");
                return;
            }
            processOrder();
            return;
        }
        setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const processOrder = async () => {
        setIsProcessing(true);

        try {
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
                paymentMethod: formData.paymentMethod,
                shippingAddress: {
                    fullName: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city
                }
            };

            const result = await handleCreateOrder(orderData);

            if (result.success) {
                // Keep the fake delay/simulation for cinematic effect
                setTimeout(() => {
                    setOrderNumber(`#SF-${Math.floor(Math.random() * 90000) + 10000}`);
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

    if (isSuccess) {
        return (
            <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'}`}>
                <Sidebar activePage="cart" />
                <main className={`flex-1 flex flex-col items-center justify-center p-12 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#d9d9d9]'}`}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-40 h-40 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-teal-500/20"
                        >
                            <FiCheckCircle className="text-8xl text-white" />
                        </motion.div>

                        <h2 className={`text-7xl font-black mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            ORDER PLACED!
                        </h2>
                        <p className="text-xl text-neutral-500 max-w-md mx-auto mb-12">
                            Your order <span className="font-bold text-teal-500">{orderNumber}</span> via <span className="uppercase font-bold">{formData.paymentMethod}</span> has been confirmed.
                        </p>

                        <Link href="/dashboard">
                            <button className="bg-teal-500 text-white px-16 py-6 rounded-3xl text-2xl font-bold hover:bg-teal-600 transition-all flex items-center gap-3 group shadow-xl shadow-teal-500/20 mx-auto">
                                Continue Shopping
                                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </Link>
                    </motion.div>
                </main>
            </div>
        );
    }

    return (
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'}`}>
            <Sidebar activePage="cart" />

            <main className={`flex-1 relative flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#d9d9d9]'}`}>

                {/* Checkout Progress Header */}
                <div className="p-12 max-w-5xl mx-auto w-full">
                    <div className="flex justify-between items-center mb-16 relative">
                        {/* Progress Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2 z-0" />
                        <motion.div
                            className="absolute top-1/2 left-0 h-[2px] bg-teal-500 -translate-y-1/2 z-0"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />

                        {STEPS.map((step, idx) => (
                            <div key={step.id} className="relative z-10 flex flex-col items-center gap-4">
                                <motion.div
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all ${idx <= currentStep
                                        ? 'bg-teal-500 text-white shadow-xl shadow-teal-500/20'
                                        : theme === 'dark' ? 'bg-neutral-900 text-neutral-600 border border-neutral-800' : 'bg-white text-neutral-300 border border-neutral-100'
                                        }`}
                                    animate={idx === currentStep ? { scale: 1.1 } : { scale: 1 }}
                                >
                                    {idx < currentStep ? <FiCheckCircle /> : step.icon}
                                </motion.div>
                                <span className={`text-[10px] font-black tracking-widest ${idx <= currentStep ? 'text-teal-500' : 'text-neutral-500'}`}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Step Content */}
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                {currentStep === 0 && (
                                    <motion.div
                                        key="address"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className={`text-4xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>SHIPPING DETAILS</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black tracking-widest text-neutral-500 ml-4">FULL NAME</label>
                                                <div className="relative">
                                                    <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
                                                    <input
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="John Doe"
                                                        className={`w-full rounded-[24px] py-5 pl-14 pr-6 text-xl outline-none focus:ring-2 transition-all ${theme === 'dark' ? 'bg-neutral-900 text-white focus:ring-neutral-800 placeholder-neutral-700' : 'bg-white text-gray-900 focus:ring-teal-100'}`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black tracking-widest text-neutral-500 ml-4">PHONE NUMBER</label>
                                                <div className="relative">
                                                    <FiPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
                                                    <input
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="98XXXXXXXX"
                                                        className={`w-full rounded-[24px] py-5 pl-14 pr-6 text-xl outline-none focus:ring-2 transition-all ${theme === 'dark' ? 'bg-neutral-900 text-white focus:ring-neutral-800 placeholder-neutral-700' : 'bg-white text-gray-900 focus:ring-teal-100'}`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-[10px] font-black tracking-widest text-neutral-500 ml-4">STREET ADDRESS</label>
                                                <div className="relative">
                                                    <FiMapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
                                                    <input
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        placeholder="Building, Street, Area"
                                                        className={`w-full rounded-[24px] py-5 pl-14 pr-6 text-xl outline-none focus:ring-2 transition-all ${theme === 'dark' ? 'bg-neutral-900 text-white focus:ring-neutral-800 placeholder-neutral-700' : 'bg-white text-gray-900 focus:ring-teal-100'}`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black tracking-widest text-neutral-500 ml-4">CITY</label>
                                                <select
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className={`w-full rounded-[24px] py-5 px-8 text-xl outline-none focus:ring-2 transition-all appearance-none ${theme === 'dark' ? 'bg-neutral-900 text-white focus:ring-neutral-800' : 'bg-white text-gray-900 focus:ring-teal-100'}`}
                                                >
                                                    <option>Kathmandu</option>
                                                    <option>Lalitpur</option>
                                                    <option>Bhaktapur</option>
                                                    <option>Pokhara</option>
                                                </select>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 1 && (
                                    <motion.div
                                        key="summary"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className={`text-4xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>ORDER SUMMARY</h2>

                                        <div className="space-y-4">
                                            {cartItems.map((item) => (
                                                <div key={`${item.id}-${item.size}`} className={`p-6 rounded-[32px] flex items-center gap-6 ${theme === 'dark' ? 'bg-neutral-900 shadow-xl shadow-black/20' : 'bg-white shadow-lg shadow-neutral-100'}`}>
                                                    <div className={`w-24 h-24 rounded-2xl flex items-center justify-center p-2 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-[#f5f5f5]'}`}>
                                                        <img
                                                            src={item.image.startsWith("http") ? item.image : `http://localhost:5050${item.image}`}
                                                            alt={item.name}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                                                        <p className="text-sm text-neutral-500 uppercase tracking-widest font-bold">Size: {item.size} • Qty: {item.quantity}</p>
                                                    </div>
                                                    <div className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                        Rs {(item.price * item.quantity).toLocaleString()}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className={`p-8 rounded-[40px] space-y-4 ${theme === 'dark' ? 'bg-teal-500/10 border border-teal-500/20' : 'bg-teal-50 border border-teal-100'}`}>
                                            <div className="flex items-center gap-3 text-teal-500">
                                                <FiInfo className="text-xl" />
                                                <p className="text-sm font-bold uppercase tracking-widest">Delivery Estimates</p>
                                            </div>
                                            <p className={`text-lg ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                                                Standard Delivery: Expected within <span className="font-bold text-teal-500">2-3 Business Days</span>.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div
                                        key="payment"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className={`text-4xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>SELECT PAYMENT</h2>

                                        <div className="grid grid-cols-1 gap-4">
                                            {PAYMENT_METHODS.map((method) => (
                                                <button
                                                    key={method.id}
                                                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                                                    className={`flex items-center justify-between p-8 rounded-[35px] border-2 transition-all relative overflow-hidden group ${formData.paymentMethod === method.id
                                                        ? `${method.color} bg-opacity-5 scale-[1.02] shadow-xl`
                                                        : theme === 'dark' ? 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700' : 'border-neutral-100 bg-white hover:border-teal-200'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-6 relative z-10">
                                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-colors ${formData.paymentMethod === method.id ? method.textColor : 'text-neutral-400'
                                                            }`}>
                                                            {method.logo ? (
                                                                <img src={method.logo} alt={method.name} className="w-12 object-contain" />
                                                            ) : (
                                                                method.icon
                                                            )}
                                                        </div>
                                                        <div className="text-left">
                                                            <span className={`text-2xl font-black block leading-none mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{method.name}</span>
                                                            <span className="text-sm text-neutral-500 font-medium">{method.description}</span>
                                                        </div>
                                                    </div>
                                                    {formData.paymentMethod === method.id && (
                                                        <motion.div
                                                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                            className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${method.textColor.replace('text', 'bg')}`}
                                                        >
                                                            <FiCheckCircle className="text-white text-xl" />
                                                        </motion.div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Order Checkout Card */}
                        <div className="lg:col-span-1">
                            <div className={`rounded-[48px] p-10 sticky top-12 shadow-2xl transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0d0d0d] border border-neutral-800' : 'bg-white shadow-neutral-200'}`}>
                                <h3 className={`text-2xl font-black mb-8 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>CHECKOUT</h3>

                                <div className="space-y-6 mb-10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-500 font-bold uppercase text-xs tracking-widest">Subtotal</span>
                                        <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Rs {totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-500 font-bold uppercase text-xs tracking-widest">Shipping</span>
                                        <span className="text-teal-500 font-black text-xl">FREE</span>
                                    </div>
                                    <div className="h-[1px] bg-neutral-100 dark:bg-neutral-800" />
                                    <div className="flex justify-between items-end">
                                        <span className="text-neutral-500 font-bold uppercase text-xs tracking-widest">Total Payable</span>
                                        <span className={`text-4xl font-black leading-none ${theme === 'dark' ? 'text-white' : 'text-teal-600'}`}>Rs {totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={nextStep}
                                        disabled={isProcessing}
                                        className="w-full bg-[#23d19d] text-white py-6 rounded-3xl text-2xl font-black shadow-xl shadow-[#23d19d]/20 hover:bg-[#1eb88a] transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                                    >
                                        {currentStep === 2 ? 'PAY NOW' : 'CONTINUE'}
                                        <FiArrowRight />
                                    </button>

                                    {currentStep > 0 && (
                                        <button
                                            onClick={prevStep}
                                            className="w-full text-neutral-500 font-black uppercase text-xs tracking-[.25em] py-4 hover:text-neutral-800 dark:hover:text-white transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FiArrowLeft /> GO BACK
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Processing Overlay */}
                <AnimatePresence>
                    {isProcessing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex flex-col items-center justify-center text-white"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 border-4 border-white/20 border-t-teal-400 rounded-full mb-10"
                            />
                            <h3 className="text-4xl font-black tracking-tighter mb-4 italic">PROCESSING ORDER...</h3>
                            <p className="text-teal-400 font-bold tracking-widest uppercase animate-pulse">
                                {formData.paymentMethod === 'cod' ? 'Confirming details' : `Connecting to ${formData.paymentMethod}`}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
        </div>
    );
}
