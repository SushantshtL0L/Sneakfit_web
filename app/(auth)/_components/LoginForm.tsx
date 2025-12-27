"use client";

import Image from "next/image";
import { z } from "zod";
import { loginSchema } from "../schema";

interface LoginFormProps {
  onSwitchToSignup?: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = loginSchema.safeParse(data);
    
    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    // TODO: Add your login logic here
    console.log("Login data:", result.data);
    alert("Login successful!");
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
        Welcome Back
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="text-right text-sm text-gray-600 cursor-pointer hover:text-black">
          Forgot password?
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-black py-3 text-white font-semibold hover:opacity-90"
        >
          Login
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
        Don't have an account?{" "}
        <span
          onClick={onSwitchToSignup}
          className="cursor-pointer font-semibold text-black hover:underline"
        >
          Sign up
        </span>
      </p>
    </div>
  );
}