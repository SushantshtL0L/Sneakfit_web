"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiUser } from "react-icons/fi";
import { handleAdminGetAllUsers, handleAdminDeleteUser } from "@/lib/actions/auth.actions";
import { toast } from "react-toastify";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState('all');

    const fetchUsers = async () => {
        setLoading(true);
        const result = await handleAdminGetAllUsers(selectedRole);
        if (result.success) {
            setUsers(result.data);
        } else {
            toast.error(result.message || "Failed to fetch users");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [selectedRole]);

    const onDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            const result = await handleAdminDeleteUser(id);
            if (result.success) {
                toast.success("User deleted successfully");
                fetchUsers();
            } else {
                toast.error(result.message || "Failed to delete user");
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "serif" }}>User Management</h2>
                    <p className="text-gray-500 mt-2">Manage all system users and their permissions.</p>
                </div>
                <Link
                    href="/admin/users/create"
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <FiPlus /> Create New User
                </Link>
            </div>

            <div className="flex gap-2">
                {['all', 'admin', 'seller', 'user'].map((role) => (
                    <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${selectedRole === role
                            ? 'bg-white text-black'
                            : 'bg-white/5 text-gray-500 hover:bg-white/10'
                            }`}
                    >
                        {role === 'all' ? 'All Users' : role.charAt(0).toUpperCase() + role.slice(1) + 's'}
                    </button>
                ))}
            </div>

            <div className="bg-black rounded-3xl shadow-sm border border-white/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-xs font-black uppercase tracking-widest text-gray-400">
                            <th className="px-8 py-6">User</th>
                            <th className="px-8 py-6">Role</th>
                            <th className="px-8 py-6">Joined</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-8 py-10 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        <span>Loading user data...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-8 py-10 text-center text-gray-500">No users found.</td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="hover:bg-white/5 transition-colors text-white">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-gray-400">
                                                {user.image ? (
                                                    <img src={user.image} alt="" className="w-full h-full object-cover rounded-2xl" />
                                                ) : (
                                                    <FiUser className="text-xl" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-purple-900/30 text-purple-400' : 'bg-blue-900/30 text-blue-400'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-gray-500 text-sm">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/users/${user._id}`} title="View">
                                                <div className="p-2 text-gray-500 hover:text-white transition-colors">
                                                    <FiEye className="text-lg" />
                                                </div>
                                            </Link>
                                            <Link href={`/admin/users/${user._id}/edit`} title="Edit">
                                                <div className="p-2 text-gray-500 hover:text-white transition-colors">
                                                    <FiEdit2 className="text-lg" />
                                                </div>
                                            </Link>
                                            <button
                                                onClick={() => onDelete(user._id)}
                                                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <FiTrash2 className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

