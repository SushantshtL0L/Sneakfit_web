"use client";

import Link from "next/link";
import { useState } from "react";
import LoginForm from "@/app/(auth)/_components/LoginForm";
import RegisterForm from "@/app/(auth)/_components/RegisterForm";

const navItemClass =
  "relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleClose = () => {
    setOpen(false);
    // Reset to login view when closing
    setTimeout(() => setIsLogin(true), 300);
  };

  return (
    <>
      {/* HEADER */}
      <header className="flex items-center justify-between px-10 py-6">
        {/* Logo */}
        <h1 className="text-xl font-bold">SneakFit.</h1>

        {/* Navigation */}
        <nav className="ml-10 flex space-x-10 text-sm font-bold">
          <Link href="/" className={navItemClass}>
            Home
          </Link>

          <Link href="/about" className={navItemClass}>
            About us
          </Link>

          <Link href="/service" className={navItemClass}>
            Services
          </Link>

          {/* Sign In */}
          <span
            onClick={() => setOpen(true)}
            className={`${navItemClass} cursor-pointer`}
          >
            Sign In
          </span>
        </nav>
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