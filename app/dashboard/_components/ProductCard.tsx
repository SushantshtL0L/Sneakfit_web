"use client";

import React from "react";
import { FiHeart, FiStar, FiTrash2 } from "react-icons/fi";
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
            whileHover={{ y: -5 }}
            className="bg-transparent"
        >
            <Link href={`/dashboard/product/${product._id || product.id}`} className="cursor-pointer block group">
                <div className="relative aspect-square bg-[#ececec] rounded-[40px] overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply p-8 transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top Left Icon (Star/Badge) */}
                    <div className="absolute top-8 left-8">
                        <div className={product.isNew || product.condition === 'new' ? "text-[#9381ff]" : "text-gray-400 opacity-20"}>
                            <FiStar className={`text-2xl ${product.isNew || product.condition === 'new' ? "fill-[#9381ff]" : ""}`} strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Top Right Heart icon */}
                    <div className="absolute top-8 right-8 flex flex-col gap-3">
                        <FiHeart className="text-white text-3xl drop-shadow-sm opacity-60 hover:opacity-100 cursor-pointer transition-opacity" strokeWidth={1.5} />

                        {isOwner && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onDelete();
                                }}
                                className="bg-red-500 p-2 rounded-full text-white shadow-lg hover:bg-red-600 transition-colors z-20"
                            >
                                <FiTrash2 className="text-xl" />
                            </button>
                        )}
                    </div>

                    {/* Heart icon at bottom center (floating) */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                        <FiHeart className="text-white text-3xl opacity-40" strokeWidth={1} />
                    </div>
                </div>

                <div className="mt-8 px-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-[14px] font-bold text-gray-800 uppercase tracking-tight">
                            {product.brand || "Seller Item"}
                        </p>
                        <h3 className="text-[14px] font-medium text-gray-900 line-clamp-1 mt-1">
                            {product.name}
                        </h3>
                        {product.description && (
                            <p className="text-[12px] text-gray-500 line-clamp-2 mt-2 italic">
                                {product.description}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-4 mt-6 text-[15px]">
                        <span className="font-bold text-gray-900">{product.rating || "5.0"}</span>
                        <div className="w-[1.5px] h-4 bg-gray-300"></div>
                        <span className="bg-[#dcdcdc] px-4 py-1.5 rounded-md font-bold text-[11px] text-gray-700 tracking-wider">
                            {product.sold || "0"} SOLD
                        </span>
                    </div>

                    <div className="mt-6">
                        <p className="text-xl font-bold text-gray-900 font-sans">
                            Rs. {(() => {
                                const rawPrice = product.price || product.Price;
                                if (!rawPrice) return "Contact";
                                const numericPrice = typeof rawPrice === 'string'
                                    ? parseFloat(rawPrice.replace(/[^0-9.]/g, ''))
                                    : rawPrice;
                                return isNaN(numericPrice)
                                    ? "Contact"
                                    : <span className="text-2xl">{Number(numericPrice).toLocaleString()}</span>;
                            })()}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
