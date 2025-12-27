"use client";

import Image from "next/image";
import { z } from "zod";
import { registerSchema } from "../schema";

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const result = registerSchema.safeParse(data);
    
    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    // TODO: Add your registration logic here
    console.log("Register data:", result.data);
    alert("Registration successful!");
  };

  return (
    <div className="w-full">
      {/* Centered Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h2 className="text-center text-2xl font-bold text-black mb-6">
        Create Account
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="PhoneNumber"
          placeholder="Phone Number"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-black outline-none focus:border-black"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-black outline-none focus:border-black"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-black outline-none focus:border-black"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-black outline-none focus:border-black"
        />

        <button
          type="submit"
          className="w-full rounded-md bg-black py-3 text-white font-semibold hover:opacity-90"
        >
          Sign Up
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="text-sm text-gray-500">OR</span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      <button className="w-full rounded-md border border-gray-300 py-3 font-semibold text-black hover:bg-gray-100">
        Continue with Google
      </button>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <span
          onClick={onSwitchToLogin}
          className="cursor-pointer font-semibold text-black hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
}