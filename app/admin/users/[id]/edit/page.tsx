"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiUser, FiMail, FiShield, FiSave } from "react-icons/fi";

export default function EditUserPage() {
    const { id } = useParams();

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <Link href="/admin/users" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold group">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Discard Changes
            </Link>

            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-12">
                <header className="mb-12">
                    <h2 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "serif" }}>Edit User</h2>
                    <p className="text-gray-400 mt-2">Modify user information and access levels.</p>
                </header>

                <form className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
                        <div className="relative">
                            <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                defaultValue="Sushant Shrestha"
                                className="w-full bg-gray-50 border-none rounded-3xl py-6 pl-16 pr-6 text-xl text-gray-800 focus:ring-2 focus:ring-black/5 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
                        <div className="relative">
                            <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="email"
                                defaultValue="sushant@example.com"
                                className="w-full bg-gray-50 border-none rounded-3xl py-6 pl-16 pr-6 text-xl text-gray-800 focus:ring-2 focus:ring-black/5 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Account Role</label>
                        <div className="relative">
                            <FiShield className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <select className="w-full bg-gray-50 border-none rounded-3xl py-6 pl-16 pr-6 text-xl text-gray-800 focus:ring-2 focus:ring-black/5 outline-none transition-all appearance-none cursor-pointer">
                                <option value="user">USER</option>
                                <option value="admin" selected>ADMIN</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button className="flex items-center justify-center gap-3 w-full bg-black text-white text-xl font-bold py-6 rounded-3xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                            <FiSave /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
