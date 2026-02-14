"use client";

import React from "react";
import Sidebar from "../_components/Sidebar";
import { motion } from "framer-motion";
import {
    FiMessageCircle,
    FiMail,
    FiPhone,
    FiChevronRight,
    FiHelpCircle,
    FiTruck,
    FiRefreshCcw,
    FiShield
} from "react-icons/fi";

const SupportCard = ({ iconPath, title, description, color }: { iconPath: React.ReactNode, title: string, description: string, color: string }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-start gap-6 cursor-pointer group"
    >
        <div className={`p-6 rounded-3xl ${color} bg-opacity-10 text-2xl group-hover:scale-110 transition-transform duration-300`}>
            {iconPath}
        </div>
        <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 leading-relaxed text-lg">{description}</p>
        </div>
    </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
    <div className="py-8 border-b border-gray-100 group cursor-pointer">
        <div className="flex items-center justify-between">
            <h4 className="text-xl font-bold text-gray-800 group-hover:text-teal-500 transition-colors">{question}</h4>
            <FiChevronRight className="text-gray-300 text-2xl group-hover:translate-x-2 transition-transform" />
        </div>
        <p className="mt-4 text-gray-500 hidden group-hover:block transition-all">
            {answer}
        </p>
    </div>
);

export default function SupportPage() {
    return (
        <div className="flex min-h-screen bg-[#fcfcfc] text-gray-900 font-sans">
            <Sidebar activePage="support" />

            <main className="flex-1 p-8 md:p-20 bg-white">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-24 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-7xl font-bold tracking-tighter text-gray-900 mb-8"
                            style={{ fontFamily: 'serif' }}
                        >
                            How can we <span className="text-teal-400">help?</span>
                        </motion.h1>
                        <p className="text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Search our knowledge base or connect with our support team to get your questions answered.
                        </p>
                    </div>

                    {/* Quick Contact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
                        <SupportCard
                            iconPath={<FiMessageCircle className="text-teal-500" />}
                            title="Live Chat"
                            description="Chat with our expert sneakerheads for instant help with your orders."
                            color="bg-teal-500"
                        />
                        <SupportCard
                            iconPath={<FiMail className="text-blue-500" />}
                            title="Email Support"
                            description="Send us an email at help@sneakfit.com and we'll reply within 24 hours."
                            color="bg-blue-500"
                        />
                        <SupportCard
                            iconPath={<FiPhone className="text-purple-500" />}
                            title="Call Center"
                            description="Available Mon-Fri, 9am - 6pm. Direct support for urgent issues."
                            color="bg-purple-500"
                        />
                    </div>

                    {/* Categories */}
                    <div className="mb-32">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-4">
                            <span className="w-12 h-1 bg-teal-400 rounded-full"></span>
                            Browse by Category
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: <FiTruck />, label: "Shipping" },
                                { icon: <FiRefreshCcw />, label: "Returns" },
                                { icon: <FiShield />, label: "Verification" },
                                { icon: <FiHelpCircle />, label: "General" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ backgroundColor: '#f9f9f9' }}
                                    className="p-8 rounded-3xl border border-gray-100 flex items-center gap-5 cursor-pointer"
                                >
                                    <div className="text-2xl text-teal-400">{item.icon}</div>
                                    <span className="text-lg font-bold text-gray-700">{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-[#fcfcfc] p-16 rounded-[60px] border border-gray-100">
                        <h2 className="text-4xl font-bold text-gray-900 mb-16">Frequently Asked Questions</h2>
                        <div className="space-y-2">
                            <FAQItem
                                question="How do I verify the authenticity of my sneakers?"
                                answer="Every pair listed on SneakFit goes through a multi-step digital and physical verification process by our experts."
                            />
                            <FAQItem
                                question="What is the average shipping time?"
                                answer="Orders typically arrive within 3-5 business days depending on your location and the seller's responsiveness."
                            />
                            <FAQItem
                                question="Can I return a thrifted item?"
                                answer="Thrifted items are sold 'as-is' unless they significantly differ from the description and photos provided by the seller."
                            />
                            <FAQItem
                                question="How do I become a featured seller?"
                                answer="Mainain a 4.5+ rating and completing at least 20 successful sales will automatically qualify you for featured status."
                            />
                        </div>
                    </div>

                    {/* Footer Contact */}
                    <div className="mt-32 text-center py-20 bg-teal-400 rounded-[50px] text-white">
                        <h2 className="text-4xl font-bold mb-6">Didn't find what you're looking for?</h2>
                        <p className="text-xl opacity-90 mb-10">Our team is standby to help you with anything.</p>
                        <button className="bg-white text-teal-400 px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                            Contact Support Now
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
