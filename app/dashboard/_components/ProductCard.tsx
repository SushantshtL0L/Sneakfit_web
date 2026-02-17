"use client";

import React from "react";
import { FiHeart, FiStar, FiTrash2, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { handleDeleteProduct } from "@/lib/actions/product.actions";
import { toast } from "react-toastify";
import Link from "next/link";

const ProductCard = ({ product, currentUserId, onDeleted }: { product: any, currentUserId?: string, onDeleted?: (id: string) => void }) => {
    // Logic to handle image URLs (local uploads vs external links)
    const imageUrl = product.image.startsWith("http")
        ? product.image
        : `http://localhost:5050${product.image}`;

    const isOwner = currentUserId && product.seller && (
        (typeof product.seller === 'string' ? product.seller : product.seller._id?.toString() || product.seller.id?.toString()) === currentUserId
    );

    const onDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;

        try {
            const result = await handleDeleteProduct(product._id || product.id);
            if (result.success) {
                toast.success("Product deleted successfully");
                if (onDeleted) onDeleted(product._id || product.id);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Failed to delete product");
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group"
        >
            <Link href={`/dashboard/product/${product._id || product.id}`} className="cursor-pointer block">
                <div className="relative aspect-[4/5] bg-white rounded-[40px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-neutral-100">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain p-10 transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Condition Badge */}
                    <div className="absolute top-6 left-6">
                        <span className={`
                            px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
                            ${product.condition === 'new' ? 'bg-black text-white' : 'bg-orange-500 text-white'}
                        `}>
                            {product.condition || 'Pre-owned'}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="absolute top-6 right-6 flex flex-col gap-3">
                        <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center text-neutral-400 hover:text-red-500 transition-colors shadow-sm">
                            <FiHeart className="text-xl" />
                        </button>

                        {isOwner && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onDelete();
                                }}
                                className="w-10 h-10 bg-red-500/10 backdrop-blur-md rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            >
                                <FiTrash2 className="text-xl" />
                            </button>
                        )}
                    </div>

                    {/* Featured Label */}
                    {(product.isNew || product.rating > 4.5) && (
                        <div className="absolute bottom-6 left-6">
                            <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md px-3 py-1 rounded-lg text-neutral-900 shadow-sm border border-neutral-100">
                                <FiStar className="text-orange-400 fill-orange-400" />
                                <span className="text-[10px] font-bold">TOP RATED</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 px-2">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-1">
                                {product.brand || "Limited Edition"}
                            </span>
                            <h3 className="text-lg font-bold text-neutral-800 leading-tight group-hover:text-black transition-colors line-clamp-1">
                                {product.name}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 bg-neutral-50 p-4 rounded-3xl border border-neutral-100 group-hover:bg-black group-hover:border-black transition-all duration-500">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-neutral-400 group-hover:text-neutral-500">PRICE</span>
                            <span className="text-xl font-black text-neutral-900 group-hover:text-white font-sans">
                                Rs. {(() => {
                                    const rawPrice = product.price || product.Price;
                                    if (!rawPrice) return "??";
                                    const numericPrice = typeof rawPrice === 'string'
                                        ? parseFloat(rawPrice.replace(/[^0-9.]/g, ''))
                                        : rawPrice;
                                    return isNaN(numericPrice) ? "???" : numericPrice.toLocaleString();
                                })()}
                            </span>
                        </div>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black shadow-sm transform group-hover:rotate-90 transition-transform duration-500">
                            <FiArrowRight className="text-xl" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};


export default ProductCard;
