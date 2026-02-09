"use client";

import Image from "next/image";
import { z } from "zod";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerSchema } from "../schema";
import { handleRegister } from "@/lib/actions/auth.actions";
import { toast } from "react-toastify";

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<"user" | "seller">("user");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const nameValue = formData.get("name") as string;
    const data = {
      name: nameValue,
      username: nameValue, // Automatically use Name as Username
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      role: role,
    };

    const result = registerSchema.safeParse(data);

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    try {
      const resultAction = await handleRegister(data);
      if (resultAction.success) {
        toast.success("Registration successful! Please login.");
        onSwitchToLogin?.();
      } else {
        toast.error(resultAction.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">

      <div className="flex justify-center mb-4">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>


      <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
        Create Your Account
      </h2>

      {/* Role Selection */}
      <div className="mb-6 flex gap-4">
        <button
          type="button"
          onClick={() => setRole("user")}
          className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all ${role === "user"
              ? "bg-teal-400 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          Register as Buyer
        </button>
        <button
          type="button"
          onClick={() => setRole("seller")}
          className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all ${role === "seller"
              ? "bg-teal-400 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          Register as Seller
        </button>
      </div>


      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full rounded-xl border-0 bg-gray-100 py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 outline-none focus:bg-gray-50 focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded-xl border-0 bg-gray-100 py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 outline-none focus:bg-gray-50 focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            className="w-full rounded-xl border-0 bg-gray-100 py-4 pl-12 pr-12 text-gray-900 placeholder-gray-500 outline-none focus:bg-gray-50 focus:ring-2 focus:ring-teal-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5" />
            ) : (
              <FaEye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="w-full rounded-xl border-0 bg-gray-100 py-4 pl-12 pr-12 text-gray-900 placeholder-gray-500 outline-none focus:bg-gray-50 focus:ring-2 focus:ring-teal-400"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirmPassword ? (
              <FaEyeSlash className="h-5 w-5" />
            ) : (
              <FaEye className="h-5 w-5" />
            )}
          </button>
        </div>


        <button
          type="submit"
          className="w-full rounded-xl bg-teal-400 py-4 font-semibold text-white transition-all hover:bg-teal-500"
        >
          Sign Up
        </button>
      </form>


      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="text-sm text-gray-500">or continue with</span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>


      <div className="flex justify-center gap-4">
        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-all hover:bg-gray-50">
          <svg className="h-6 w-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-all hover:bg-gray-50">
          <svg className="h-6 w-6" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>
      </div>


      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <span
          onClick={onSwitchToLogin}
          className="cursor-pointer font-semibold text-gray-900 hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
}