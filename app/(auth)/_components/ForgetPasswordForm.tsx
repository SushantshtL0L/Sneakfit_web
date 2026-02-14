"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { forgetPasswordSchema } from "../schema";
import { handleForgotPassword } from "@/lib/actions/auth.actions";
import { toast } from "react-toastify";

export default function ForgetPasswordForm() {
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;

        const result = forgetPasswordSchema.safeParse({ email });

        if (!result.success) {
            toast.error(result.error.issues[0].message);
            setLoading(false);
            return;
        }

        try {
            const response = await handleForgotPassword(email);
            if (response.success) {
                setIsSent(true);
                toast.success("Reset link sent to your email!");
            } else {
                toast.error(response.message || "Failed to send reset link");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (isSent) {
        return (
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg text-center">
                <div className="flex justify-center mb-6 text-teal-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
                <p className="text-gray-600 mb-8">We've sent a password reset link to your email address. It will expire in 1 hour.</p>
                <Link href="/login" className="block w-full rounded-xl bg-teal-400 py-4 font-semibold text-white transition-all hover:bg-teal-500 text-center">
                    Back to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
            <div className="flex justify-center mb-4">
                <Image src="/images/logo.png" alt="Logo" width={100} height={100} className="object-contain" />
            </div>
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
            <p className="text-center text-gray-500 mb-8 text-sm">No worries! Enter your email and we'll send you a reset link.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        className="w-full rounded-xl border-0 bg-gray-100 py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 outline-none focus:bg-gray-50 focus:ring-2 focus:ring-teal-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-teal-400 py-4 font-semibold text-white transition-all hover:bg-teal-500 disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>

            <div className="mt-8 text-center">
                <Link href="/login" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors">
                    Back to Login
                </Link>
            </div>
        </div>
    );
}
