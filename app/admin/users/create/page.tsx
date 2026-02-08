"use client";

import React, { useState, useRef, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiShield, FiCamera, FiPlus } from "react-icons/fi";
import { handleAdminCreateUser } from "@/lib/actions/auth.actions";
import { AdminCreateUserData, adminCreateUserSchema } from "@/app/(auth)/schema";


export default function CreateUserPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AdminCreateUserData>({
        resolver: zodResolver(adminCreateUserSchema),
        defaultValues: {
            role: "user"
        }
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (values: AdminCreateUserData) => {
        setError(null);
        startTransition(async () => {
            try {
                const formData = new FormData();
                // Append all text values
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                // Append image if selected
                const file = fileInputRef.current?.files?.[0];
                if (file) {
                    formData.append("image", file);
                }

                const result = await handleAdminCreateUser(formData);
                if (result.success) {
                    alert("User created successfully!");
                    router.push("/admin/users");
                } else {
                    setError(result.message || "Failed to create user");
                }
            } catch (err: any) {
                setError(err.message || "An error occurred");
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-700 p-4 md:p-8">
            <Link href="/admin/users" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold group">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Users
            </Link>

            <div className="bg-white rounded-[50px] shadow-sm border border-gray-100 p-8 md:p-16">
                <header className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: "serif" }}>Create New User</h2>
                    <p className="text-gray-400 mt-4 text-lg md:text-xl">Register a new account with specific roles and details.</p>
                </header>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100 italic">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Image Upload Component */}
                    <div className="flex flex-col items-center gap-6">
                        <div
                            className="relative w-40 h-40 md:w-48 md:h-48 rounded-[40px] bg-gray-50 overflow-hidden border-4 border-dashed border-gray-200 cursor-pointer hover:border-black transition-colors group"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2 text-center p-4">
                                    <FiCamera className="text-4xl" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Upload Photo</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <FiCamera className="text-3xl" />
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] text-center">Optional: Add profile picture</p>
                    </div>

                    {/* Form Fields Component */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
                                <div className="relative">
                                    <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                    <input
                                        {...register("name")}
                                        className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-16 pr-6 text-lg text-gray-800 focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                        placeholder="Enter name"
                                    />
                                </div>
                                {errors.name?.message && <p className="text-xs text-red-500 ml-2 italic">{errors.name.message}</p>}
                            </div>

                            {/* Username */}
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Username</label>
                                <div className="relative">
                                    <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                    <input
                                        {...register("username")}
                                        className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-16 pr-6 text-lg text-gray-800 focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                        placeholder="Enter username"
                                    />
                                </div>
                                {errors.username?.message && <p className="text-xs text-red-500 ml-2 italic">{errors.username.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
                                <div className="relative">
                                    <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                    <input
                                        {...register("email")}
                                        className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-16 pr-6 text-lg text-gray-800 focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                        placeholder="Enter email"
                                    />
                                </div>
                                {errors.email?.message && <p className="text-xs text-red-500 ml-2 italic">{errors.email.message}</p>}
                            </div>

                            {/* Role */}
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Account Role</label>
                                <div className="relative">
                                    <FiShield className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                    <select
                                        {...register("role")}
                                        className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-16 pr-6 text-lg text-gray-800 focus:ring-2 focus:ring-black/5 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="user">USER</option>
                                        <option value="admin">ADMIN</option>
                                    </select>
                                </div>
                                {errors.role?.message && <p className="text-xs text-red-500 ml-2 italic">{errors.role.message}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Temporary Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                    <input
                                        type="password"
                                        {...register("password")}
                                        className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-16 pr-6 text-lg text-gray-800 focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                        placeholder="Create password"
                                    />
                                </div>
                                {errors.password?.message && <p className="text-xs text-red-500 ml-2 italic">{errors.password.message}</p>}
                            </div>
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex items-center justify-center gap-4 w-full bg-black text-white text-xl font-bold py-6 rounded-[25px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                            >
                                {isPending ? (
                                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <><FiPlus className="text-2xl" /> Create User</>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
