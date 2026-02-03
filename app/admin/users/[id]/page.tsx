"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiUser, FiMail, FiShield, FiClock } from "react-icons/fi";

export default function ViewUserPage() {
    const { id } = useParams();

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <Link href="/admin/users" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold group">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Users
            </Link>

            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-12">
                <div className="flex flex-col items-center gap-6 text-center">
                    <div className="w-32 h-32 rounded-[40px] bg-gray-100 flex items-center justify-center text-gray-300">
                        <FiUser className="text-6xl" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "serif" }}>User Details</h2>
                        <p className="text-gray-400 mt-2 font-mono uppercase text-xs tracking-[0.3em]">User ID: {id}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div className="p-8 bg-gray-50 rounded-3xl space-y-2">
                        <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 tracking-widest">
                            <FiUser /> Full Name
                        </div>
                        <div className="text-xl font-bold text-gray-900">Sushant Shrestha</div>
                    </div>

                    <div className="p-8 bg-gray-50 rounded-3xl space-y-2">
                        <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 tracking-widest">
                            <FiMail /> Email Address
                        </div>
                        <div className="text-xl font-bold text-gray-900">sushant@example.com</div>
                    </div>

                    <div className="p-8 bg-gray-50 rounded-3xl space-y-2">
                        <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 tracking-widest">
                            <FiShield /> Account Role
                        </div>
                        <div className="text-xl font-bold text-gray-900 uppercase tracking-tighter">Admin</div>
                    </div>

                    <div className="p-8 bg-gray-50 rounded-3xl space-y-2">
                        <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 tracking-widest">
                            <FiClock /> Member Since
                        </div>
                        <div className="text-xl font-bold text-gray-900">Feb 01, 2024</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
