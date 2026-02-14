"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { resetPasswordSchema } from "../schema";
import { handleResetPassword } from "@/lib/actions/auth.actions";
import { toast } from "react-toastify";

export default function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!token) {
            toast.error("Invalid reset link. Please request a new one.");
            setLoading(false);
            return;
        }

        const formData = new FormData(e.currentTarget);
        const data = {
            newPassword: formData.get("newPassword") as string,
            confirmNewPassword: formData.get("confirmNewPassword") as string,
        };

        const result = resetPasswordSchema.safeParse(data);

        if (!result.success) {
            toast.error(result.error.issues[0].message);
            setLoading(false);
            return;
        }

        try {
            const response = await handleResetPassword(token, data.newPassword);
            if (response.success) {
                toast.success("Password reset successfully! Please log in.");
                router.push("/login");
            } else {
                toast.error(response.message || "Failed to reset password");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
            <div className="flex justify-center mb-4">
                <Image src="/images/logo.png" alt="Logo" width={100} height={100} className="object-contain" />
            </div>
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">Set New Password</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* New Password */}
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="New Password"
                        required
                        className="w-full rounded-xl border-0 bg-gray-100 py-4 pl-12 pr-12 text-gray-900 placeholder-gray-500 outline-none focus:bg-gray-50 focus:ring-2 focus:ring-teal-400"
                    />
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="confirmNewPassword"
                        placeholder="Confirm Password"
                        required
                        className="w-full rounded-xl border-0 bg-gray-100 py-4 pl-12 pr-12 text-gray-900 placeholder-gray-500 outline-none focus:bg-gray-50 focus:ring-2 focus:ring-teal-400"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-teal-400 py-4 font-semibold text-white transition-all hover:bg-teal-500 disabled:opacity-50"
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
}
