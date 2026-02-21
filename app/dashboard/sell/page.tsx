"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleCreateProduct } from "@/lib/actions/product.actions";
import { toast } from "react-toastify";
import Sidebar from "../_components/Sidebar";
import { useTheme } from "@/context/ThemeContext";

export default function SellPage() {
    const router = useRouter();
    const { theme } = useTheme();
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
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#fcfcfc]'}`}>
            <Sidebar activePage="sell" />

            <main className={`flex-1 p-10 lg:p-20 overflow-y-auto transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                <div className="max-w-3xl mx-auto">
                    <h1 className={`text-4xl font-bold mb-10 transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>List Your Sneaker</h1>

                    <form onSubmit={handleSubmit} className={`space-y-8 p-8 rounded-[40px] shadow-sm border transition-colors ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-100'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div>
                                <label className={`block text-sm font-bold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-700'}`}>Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="e.g. Jordan 1 Retro High OG"
                                    className={`w-full border-none rounded-2xl py-4 px-6 outline-none transition-all focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-neutral-800 text-white placeholder-neutral-500' : 'bg-[#f5f5f5] text-gray-800'
                                        }`}
                                />
                            </div>

                            {/* Brand */}
                            <div>
                                <label className={`block text-sm font-bold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-700'}`}>Brand Name</label>
                                <input
                                    type="text"
                                    name="brand"
                                    required
                                    placeholder="e.g. Nike, Adidas, Puma"
                                    className={`w-full border-none rounded-2xl py-4 px-6 outline-none transition-all focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-neutral-800 text-white placeholder-neutral-500' : 'bg-[#f5f5f5] text-gray-800'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className={`block text-sm font-bold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-700'}`}>Description</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                placeholder="Tell us about your sneaker..."
                                className={`w-full border-none rounded-2xl py-4 px-6 outline-none transition-all resize-none focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-neutral-800 text-white placeholder-neutral-500' : 'bg-[#f5f5f5] text-gray-800'
                                    }`}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Condition */}
                            <div>
                                <label className={`block text-sm font-bold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-700'}`}>Condition</label>
                                <select
                                    name="condition"
                                    required
                                    className={`w-full border-none rounded-2xl py-4 px-6 outline-none transition-all appearance-none focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-[#f5f5f5] text-gray-800'
                                        }`}
                                >
                                    <option value="new">Brand New</option>
                                    <option value="thrift">Thrift (Used)</option>
                                </select>
                            </div>

                            {/* Size */}
                            <div>
                                <label className={`block text-sm font-bold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-700'}`}>Size</label>
                                <input
                                    type="text"
                                    name="size"
                                    required
                                    placeholder="42"
                                    className={`w-full border-none rounded-2xl py-4 px-6 outline-none transition-all focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-neutral-800 text-white placeholder-neutral-500' : 'bg-[#f5f5f5] text-gray-800'
                                        }`}
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className={`block text-sm font-bold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-700'}`}>Price (Rs.)</label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    placeholder="0.00"
                                    className={`w-full border-none rounded-2xl py-4 px-6 outline-none transition-all focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-neutral-800 text-white placeholder-neutral-500' : 'bg-[#f5f5f5] text-gray-800'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className={`block text-sm font-bold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-700'}`}>Sneaker Photo</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    required
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className={`w-full aspect-video rounded-[30px] border-2 border-dashed flex flex-col items-center justify-center transition-all group-hover:border-teal-400 ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 group-hover:bg-neutral-800/80' : 'bg-[#f5f5f5] border-gray-200 group-hover:bg-[#f0f9f9]'
                                    }`}>
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
                            className={`w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-6 rounded-[25px] text-xl transition-all shadow-lg disabled:opacity-50 ${theme === 'dark' ? 'shadow-black/20' : 'shadow-teal-100'}`}
                        >
                            {loading ? "Listing..." : "List Product Now"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
