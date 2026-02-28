"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const HomeBanner = () => {
    return (
        <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-[2rem] md:rounded-[3rem] my-8 px-4 md:px-0">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-black">
                {/* Abstract shapes for premium feel */}
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-white/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[70%] bg-orange-500/20 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black uppercase tracking-[0.3em] bg-white/10 backdrop-blur-md rounded-full text-white/90 border border-white/20">
                        Season Sale 2025
                    </span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white italic tracking-tighter uppercase mb-6 drop-shadow-2xl">
                        Level Up Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-white/80">
                            Sneaker Game
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-white/70 text-lg md:text-xl font-medium mb-10 leading-relaxed">
                        Discover the most exclusive collection of authenticated premium sneakers.
                        From limited editions to everyday classics.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/dashboard"
                            className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.2)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Shop Now <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                        <Link
                            href="/dashboard/thrifts"
                            className="px-10 py-5 bg-black/30 backdrop-blur-md border border-white/20 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all hover:bg-white/10"
                        >
                            Explore Thrifts
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Animated background element */}
            <motion.div
                animate={{
                    rotate: [0, 5, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-[-10%] right-[-5%] z-0 opacity-20 hidden lg:block"
            >
                <span className="text-[20rem] font-black text-white italic tracking-tighter leading-none select-none">
                    SNEAK
                </span>
            </motion.div>
        </section>
    );
};

export default HomeBanner;
