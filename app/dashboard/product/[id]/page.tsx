"use client";

import React, { useEffect, useState, use } from "react";
import Sidebar from "../../_components/Sidebar";
import { handleGetProductById } from "@/lib/actions/product.actions";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleDeleteProduct } from "@/lib/actions/product.actions";
import { useTheme } from "@/context/ThemeContext";
import { handleCreateReview, handleGetProductReviews, handleDeleteReview } from "@/lib/actions/review.actions";
import { useWishlist } from "@/context/WishlistContext";
import { FiShoppingBag, FiUser, FiPlus, FiMinus, FiCheck, FiStar, FiEdit, FiTrash2, FiMessageCircle, FiSend, FiHeart } from "react-icons/fi";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("42");
    const [reviews, setReviews] = useState<any[]>([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { addToCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const { theme } = useTheme();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();


    const isAdmin = user?.role === "admin";
    const isOwner = user && product?.seller && (
        (typeof product.seller === 'string' ? product.seller : product.seller._id?.toString() || product.seller.id?.toString()) === user.id
    );
    const canManage = isAdmin || isOwner;

    const dummyProducts = [
        {
            id: "1",
            brand: "Puma",
            name: "Men White & Black Colourblocked IDP Sneakers",
            price: "2300",
            rating: "4.5",
            sold: "4500",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400",
            isNew: true,
            condition: "new"
        }
    ];

    useEffect(() => {
        const fetchProduct = async () => {
            const result = await handleGetProductById(id);
            if (result.success) {
                setProduct(result.data);
            } else {
                const dummy = dummyProducts.find(p => p.id === id);
                if (dummy) setProduct(dummy);
            }
            setLoading(false);
        };

        const fetchReviews = async () => {
            const result = await handleGetProductReviews(id);
            if (result.success) {
                setReviews(result.data);
            }
        };

        fetchProduct();
        fetchReviews();
    }, [id]);

    const onDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const result = await handleDeleteProduct(product._id || product.id);
            if (result.success) {
                toast.success("Product deleted successfully");
                router.push("/dashboard");
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Failed to delete product");
        }
    };

    const handleAddToCart = () => {
        const sizeToUse = product.condition === "thrift" ? (product.size || "42") : selectedSize;
        addToCart({
            id: product.id || product._id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            brand: product.brand || "SneakFit",
            quantity: 1,
            size: sizeToUse,
            color: product.color || "White",
            description: product.description || "",
            condition: product.condition || (product.isNew ? "new" : "thrift")
        });
        toast.success(`${product.name} (Size ${sizeToUse}) added to cart!`);
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast.warning("Please login to leave a review");
            return;
        }
        if (!newReview.comment.trim()) return;

        setIsSubmitting(true);
        const result = await handleCreateReview({
            product: id,
            rating: newReview.rating,
            comment: newReview.comment
        });

        if (result.success) {
            toast.success("Review submitted!");
            setNewReview({ rating: 5, comment: "" });
            // Refresh reviews
            const updated = await handleGetProductReviews(id);
            if (updated.success) setReviews(updated.data);
        } else {
            toast.error(result.message);
        }
        setIsSubmitting(false);
    };

    const handleReviewDelete = async (reviewId: string) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        const result = await handleDeleteReview(reviewId);
        if (result.success) {
            toast.success("Review deleted");
            // Refresh reviews
            const updated = await handleGetProductReviews(id);
            if (updated.success) setReviews(updated.data);
        } else {
            toast.error(result.message);
        }
    };

    if (loading) {
        return (
            <div className={`flex min-h-screen items-center justify-center transition-colors ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#fcfcfc]'}`}>
                <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme === 'dark' ? 'border-white' : 'border-gray-900'}`}></div>
            </div>
        );
    }

    if (!product) return null;

    const imageUrl = product.image.startsWith("http") ? product.image : `http://localhost:5050${product.image}`;

    return (
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#fcfcfc]'}`}>
            <Sidebar activePage="shoes" />

            <main className={`flex-1 relative flex flex-col min-h-screen overflow-y-auto transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#e8e2d6]'}`}>

                {/* Product Section */}
                <div className="min-h-screen flex items-center px-24 relative overflow-hidden">
                    {/* Background Graphic */}
                    <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[70%] h-[90%] pointer-events-none select-none flex items-center justify-center">
                        <div className={`absolute w-full aspect-square border-[80px] rounded-full ${theme === 'dark' ? 'border-white/5' : 'border-white/20'}`}></div>
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45rem] font-black leading-none select-none opacity-40 ${theme === 'dark' ? 'text-white/10' : 'text-white/30'}`}>90</div>
                    </div>

                    <div className="w-1/2 z-10 flex flex-col justify-center py-20">
                        <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className={`text-8xl font-bold leading-[1.1] mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{product.name}</motion.h1>
                        <p className={`text-7xl font-bold tracking-tight mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Rs {Number(product.price).toLocaleString()}</p>

                        <div className="flex items-center gap-8">
                            <button onClick={handleAddToCart} className="bg-[#6db56f] text-white px-12 py-5 rounded-2xl flex items-center gap-4 text-xl font-bold shadow-xl hover:bg-[#5da061] transition-all transform active:scale-95">
                                <FiShoppingBag /> Add To Cart
                            </button>
                            <button
                                onClick={() => {
                                    const itemId = product.id || product._id;
                                    if (isInWishlist(itemId)) {
                                        removeFromWishlist(itemId);
                                        toast.info("Removed from wishlist");
                                    } else {
                                        addToWishlist({
                                            id: itemId,
                                            name: product.name,
                                            price: Number(product.price),
                                            image: product.image,
                                            brand: product.brand || "SneakFit",
                                            condition: product.condition,
                                        });
                                        toast.success("Added to wishlist!");
                                    }
                                }}
                                className={`p-5 rounded-2xl flex items-center justify-center transition-all transform active:scale-95 ${isInWishlist(product.id || product._id)
                                        ? "bg-red-500 text-white shadow-xl shadow-red-500/30"
                                        : theme === "dark" ? "bg-neutral-900 text-neutral-400 hover:text-red-500 border border-neutral-800" : "bg-white text-neutral-400 hover:text-red-500 border border-neutral-100 shadow-sm"
                                    }`}
                                title={isInWishlist(product.id || product._id) ? "Remove from wishlist" : "Add to wishlist"}
                            >
                                <FiHeart size={24} className={isInWishlist(product.id || product._id) ? "fill-white" : ""} />
                            </button>
                            {canManage && (
                                <div className="flex gap-4">
                                    <Link href={`/dashboard/product/${product._id || product.id}/edit`} className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}><FiEdit size={24} /></Link>
                                    <button onClick={onDelete} className="bg-red-500 text-white p-5 rounded-2xl"><FiTrash2 size={24} /></button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-1/2 relative h-full flex items-center justify-end">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.8, rotate: -25, x: 100 }}
                            animate={{ opacity: 1, scale: 1.15, rotate: -15, x: 0 }}
                            src={imageUrl} className={`w-[140%] -mr-[30%] select-none pointer-events-none ${theme === 'dark' ? 'drop-shadow-[0_60px_60px_rgba(255,255,255,0.05)]' : 'drop-shadow-[0_60px_60px_rgba(0,0,0,0.2)]'}`}
                        />
                    </div>
                </div>

                {/* Reviews Section */}
                <section className={`px-24 py-32 transition-colors ${theme === 'dark' ? 'bg-[#050505]' : 'bg-white'}`}>
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-between items-end mb-16">
                            <div>
                                <h2 className={`text-5xl font-black tracking-tighter uppercase ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Reviews<span className="text-teal-500">.</span></h2>
                                <p className="text-neutral-500 text-lg mt-2">What our community says about these kicks.</p>
                            </div>
                            <div className="flex items-center gap-2 bg-teal-500/10 px-6 py-3 rounded-2xl">
                                <FiStar className="text-teal-500 fill-teal-500 text-xl" />
                                <span className="text-2xl font-black text-teal-500">{reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "0.0"}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                            {/* Write Review */}
                            <div className="lg:col-span-1">
                                <form onSubmit={handleSubmitReview} className={`p-8 rounded-[40px] sticky top-10 border ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-[#f9f9f9] border-neutral-100'}`}>
                                    <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Write a Review</h3>

                                    <div className="mb-8">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-3 block">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                                    className="transition-transform active:scale-90"
                                                >
                                                    <FiStar
                                                        className={`text-3xl ${newReview.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'}`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-3 block">Your Feedback</label>
                                        <textarea
                                            value={newReview.comment}
                                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                            placeholder="What's the vibe?"
                                            className={`w-full p-6 rounded-3xl min-h-[150px] outline-none transition-all ${theme === 'dark' ? 'bg-neutral-800 text-white focus:ring-2 focus:ring-teal-500/50' : 'bg-white text-gray-800 focus:ring-2 focus:ring-black/5'}`}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-teal-500 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-teal-600 transition-all disabled:opacity-50"
                                    >
                                        {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <><FiSend /> Post Review</>}
                                    </button>
                                </form>
                            </div>

                            {/* Reviews List */}
                            <div className="lg:col-span-2 space-y-10">
                                {reviews.length === 0 ? (
                                    <div className="py-20 text-center border-2 border-dashed border-neutral-200 rounded-[50px] flex flex-col items-center justify-center text-neutral-400 gap-4">
                                        <FiMessageCircle size={60} />
                                        <p className="text-xl font-medium uppercase tracking-widest">No reviews yet. Be the first!</p>
                                    </div>
                                ) : (
                                    reviews.map((rev) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            key={rev._id}
                                            className={`p-10 rounded-[40px] border transition-all ${theme === 'dark' ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-100 shadow-sm'}`}
                                        >
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center overflow-hidden">
                                                        {rev.user?.image ? (
                                                            <img src={`http://localhost:5050${rev.user.image}`} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <FiUser className="text-2xl text-teal-500" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{rev.user?.name || "SneakFit User"}</h4>
                                                        <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">{new Date(rev.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FiStar key={i} className={`text-sm ${i < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'}`} />
                                                        ))}
                                                    </div>
                                                    {(user?.role === "admin" || (rev.user && (rev.user._id === user?.id || rev.user === user?.id))) && (
                                                        <button
                                                            onClick={() => handleReviewDelete(rev._id)}
                                                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                                                            title="Delete Review"
                                                        >
                                                            <FiTrash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <p className={`text-xl leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>{rev.comment}</p>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
