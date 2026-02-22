"use client";

import React from "react";
import { FiHeart, FiStar, FiTrash2, FiArrowRight, FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import { handleDeleteProduct } from "@/lib/actions/product.actions";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useWishlist } from "@/context/WishlistContext";

const ProductCard = ({ product, currentUserId, onDeleted }: { product: any, currentUserId?: string, onDeleted?: (id: string) => void }) => {
    const { user } = useAuth();
    const router = useRouter();
    const { theme } = useTheme();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const wishlisted = isInWishlist(product._id || product.id);

    const imageUrl = product.image.startsWith("http")
        ? product.image
        : `http://localhost:5050${product.image}`;

    const isOwner = currentUserId && product.seller && (
        (typeof product.seller === 'string' ? product.seller : product.seller._id?.toString() || product.seller.id?.toString()) === currentUserId
    );

    const isAdmin = user?.role === "admin";
    const canManage = isOwner || isAdmin;

    const navigateToDetail = () => {
        router.push(`/dashboard/product/${product._id || product.id}`);
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const id = product._id || product.id;
        if (wishlisted) {
            removeFromWishlist(id);
            toast.info("Removed from wishlist");
        } else {
            addToWishlist({
                id,
                name: product.name,
                price: Number(product.price || product.Value || 0),
                image: product.image,
                brand: product.brand || "SneakFit",
                condition: product.condition,
                description: product.description || "",
                size: product.size
            });
            toast.success("Added to wishlist!");
        }
    };

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
            className="group cursor-pointer"
            onClick={navigateToDetail}
        >
            <div className="block">
                <div className={`relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100'}`}>
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain p-10 transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Condition Badge */}
                    <div className="absolute top-6 left-6">
                        <span className={`
                            px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
                            ${product.condition === 'new' ? theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white' : 'bg-orange-500 text-white'}
                        `}>
                            {product.condition || 'Pre-owned'}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
                        <button
                            onClick={handleWishlistToggle}
                            className={`w-10 h-10 backdrop-blur-md rounded-xl flex items-center justify-center transition-all shadow-sm ${wishlisted
                                ? "bg-red-500 text-white shadow-red-500/30"
                                : theme === "dark" ? "bg-neutral-800/80 text-neutral-400 hover:text-red-500" : "bg-white/80 text-neutral-400 hover:text-red-500"
                                }`}
                            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <FiHeart className={`text-xl ${wishlisted ? "fill-white" : ""}`} />
                        </button>

                        {canManage && (
                            <>
                                <Link
                                    href={`/dashboard/product/${product._id || product.id}/edit`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-10 h-10 bg-blue-500/10 backdrop-blur-md rounded-xl flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                                >
                                    <FiEdit className="text-xl" />
                                </Link>
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
                            </>
                        )}
                    </div>

                    {/* Featured Label */}
                    {(product.isNew || product.rating > 4.5) && (
                        <div className="absolute bottom-6 left-6">
                            <div className={`flex items-center gap-1 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm border ${theme === 'dark' ? 'bg-neutral-800/80 text-white border-neutral-700' : 'bg-white/80 text-neutral-900 border-neutral-100'}`}>
                                <FiStar className="text-orange-400 fill-orange-400" />
                                <span className="text-[10px] font-bold">TOP RATED</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 px-2">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                                    {product.brand || "Limited Edition"}
                                </span>
                                {product.size && (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-500'}`}>
                                        EU {product.size}
                                    </span>
                                )}
                            </div>
                            <h3 className={`text-lg font-bold leading-tight transition-colors line-clamp-1 ${theme === 'dark' ? 'text-white' : 'text-neutral-800 group-hover:text-black'}`}>
                                {product.name}
                            </h3>
                        </div>
                    </div>

                    <div className={`flex items-center justify-between mt-4 p-4 rounded-3xl border transition-all duration-500 ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800 group-hover:bg-white group-hover:border-white' : 'bg-neutral-50 border-neutral-100 group-hover:bg-black group-hover:border-black'}`}>
                        <div className="flex flex-col">
                            <span className={`text-[10px] font-bold group-hover:text-neutral-500 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>PRICE</span>
                            <span className={`text-xl font-black font-sans transition-colors ${theme === 'dark' ? 'text-white group-hover:text-black' : 'text-neutral-900 group-hover:text-white'}`}>
                                Rs. {(() => {
                                    const rawPrice = product.price || product.Value;
                                    const priceToFormat = typeof rawPrice === 'string' ? parseFloat(rawPrice) : rawPrice;
                                    return priceToFormat?.toLocaleString() || "0";
                                })()}
                            </span>
                        </div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transform group-hover:rotate-90 transition-transform duration-500 ${theme === 'dark' ? 'bg-neutral-800 text-white group-hover:bg-black group-hover:text-white' : 'bg-white text-black'}`}>
                            <FiArrowRight className="text-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
