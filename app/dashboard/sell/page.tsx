"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleCreateProduct } from "@/lib/actions/product.actions";
import { toast } from "react-toastify";
import Sidebar from "../_components/Sidebar";

export default function SellPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const result = await handleCreateProduct(formData);
            if (result.success) {
                toast.success("Product listed successfully!");
                router.push("/dashboard");
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#fcfcfc] text-gray-900 font-sans">
            <Sidebar activePage="sell" />

            <main className="flex-1 p-10 lg:p-20 bg-white overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-10">List Your Sneaker</h1>

                    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="e.g. Jordan 1 Retro High OG"
                                    className="w-full bg-[#f5f5f5] border-none rounded-2xl py-4 px-6 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none transition-all"
                                />
                            </div>

                            {/* Brand */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Brand Name</label>
                                <input
                                    type="text"
                                    name="brand"
                                    required
                                    placeholder="e.g. Nike, Adidas, Puma"
                                    className="w-full bg-[#f5f5f5] border-none rounded-2xl py-4 px-6 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Description</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                placeholder="Tell us about your sneaker..."
                                className="w-full bg-[#f5f5f5] border-none rounded-2xl py-4 px-6 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none transition-all resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Condition */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Condition</label>
                                <select
                                    name="condition"
                                    required
                                    className="w-full bg-[#f5f5f5] border-none rounded-2xl py-4 px-6 text-gray-800 focus:ring-2 focus:ring-teal-400 outline-none transition-all appearance-none"
                                >
                                    <option value="new">Brand New</option>
                                    <option value="thrift">Thrift (Used)</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Price (Rs.)</label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    placeholder="0.00"
                                    className="w-full bg-[#f5f5f5] border-none rounded-2xl py-4 px-6 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Sneaker Photo</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    required
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="w-full aspect-video bg-[#f5f5f5] rounded-[30px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center transition-all group-hover:border-teal-400 group-hover:bg-[#f0f9f9]">
                                    {preview ? (
                                        <div className="relative w-full h-full p-4">
                                            <img src={preview} alt="Preview" className="w-full h-full object-contain mix-blend-multiply" />
                                        </div>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-300 mb-4 group-hover:text-teal-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                            </svg>
                                            <p className="text-gray-400 font-medium">Click to upload your photo</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-6 rounded-[25px] text-xl transition-all shadow-lg shadow-teal-100 disabled:opacity-50"
                        >
                            {loading ? "Listing..." : "List Product Now"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
