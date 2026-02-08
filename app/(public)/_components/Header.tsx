"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LoginForm from "@/app/(auth)/_components/LoginForm";
import RegisterForm from "@/app/(auth)/_components/RegisterForm";

const navItemClass =
  "relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setIsLogin(true), 300);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
              <span className="font-bold text-white">GS</span>
            </div>
            <span className="text-lg font-bold text-white">SneakFit.</span>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-6 text-sm font-bold text-white">
            <Link href="/" className={navItemClass}>
              Home
            </Link>
            <Link href="/about" className={navItemClass}>
              About us
            </Link>
            <Link href="/service" className={navItemClass}>
              Services
            </Link>
            <span
              onClick={() => setOpen(true)}
              className={`${navItemClass} cursor-pointer`}
            >
              Sign In
            </span>
          </nav>
        </div>
      </header>

      {/* AUTH POPUP */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark background */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={handleClose}
          />
          {/* Auth box */}
          <div className="relative z-50 w-full max-w-md rounded-2xl bg-[#f3ede8] p-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-xl hover:opacity-70"
            >
              ✕
            </button>

            {isLogin ? (
              <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
