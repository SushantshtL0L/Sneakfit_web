"use client";

import React, { useEffect, useState, use } from "react";
import Sidebar from "../../_components/Sidebar";
import { handleGetProductById } from "@/lib/actions/product.actions";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleDeleteProduct } from "@/lib/actions/product.actions";
import { FiShoppingBag, FiUser, FiPlus, FiMinus, FiCheck, FiStar, FiEdit, FiTrash2 } from "react-icons/fi";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("42");
    const { addToCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();


    const isAdmin = user?.role === "admin";
    const isOwner = user && product?.seller && (
        (typeof product.seller === 'string' ? product.seller : product.seller._id?.toString() || product.seller.id?.toString()) === user.id
    );
    const canManage = isAdmin || isOwner;

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
        },
        {
            id: "2",
            brand: "ADIDAS",
            name: "Men Black Solid Adivat Running Shoes",
            price: "1619",
            rating: "4.7",
            sold: "4500",
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=400",
            isNew: true,
            condition: "new"
        },
        {
            id: "3",
            brand: "ADIDAS",
            name: "Men Black Solid Adivat Running Shoes",
            price: "1619",
            rating: "4.7",
            sold: "4500",
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400",
            isNew: false,
            condition: "thrift",
            size: "44"
        },
        {
            id: "4",
            brand: "Puma",
            name: "Men White & Black Colourblocked IDP Sneakers",
            price: "1619",
            rating: "4.5",
            sold: "4500",
            image: "https://images.unsplash.com/photo-1620138546344-7b2c38516ee3?auto=format&fit=crop&q=80&w=400",
            isNew: true,
            condition: "new"
        },
        {
            id: "5",
            brand: "ADIDAS",
            name: "Men Black Solid Adivat Running Shoes",
            price: "1619",
            rating: "4.7",
            sold: "4500",
            image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=400",
            isNew: true,
            condition: "new"
        },
        {
            id: "6",
            brand: "ADIDAS",
            name: "Men Black Solid Adivat Running Shoes",
            price: "1619",
            rating: "4.7",
            sold: "4500",
            image: "https://images.unsplash.com/photo-1512374382149-4332c6c021f1?auto=format&fit=crop&q=80&w=400",
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
                // Check dummy products if API fails
                const dummy = dummyProducts.find(p => p.id === id);
                if (dummy) {
                    setProduct(dummy);
                }
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#fcfcfc] items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-screen bg-[#fcfcfc] items-center justify-center">
                <p className="text-2xl text-gray-500">Product not found</p>
            </div>
        );
    }

    const imageUrl = product.image.startsWith("http")
        ? product.image
        : `http://localhost:5050${product.image}`;

    const isThrift = product.condition === "thrift";

    const handleAddToCart = () => {
        const sizeToUse = isThrift ? (product.size || "42") : selectedSize;
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

    return (
        <div className="flex min-h-screen bg-[#fcfcfc] text-gray-900 font-sans overflow-hidden">
            <Sidebar activePage="shoes" />

            {/* Main Content Area */}
            <main className="flex-1 bg-[#e8e2d6] relative flex flex-col min-h-screen">
                {/* Header Icons */}
                <div className="absolute top-12 right-12 flex items-center gap-8 z-20">
                    <FiShoppingBag className="text-3xl text-gray-700 cursor-pointer hover:opacity-100 transition-opacity opacity-70" strokeWidth={1.5} />
                    <FiUser className="text-3xl text-gray-700 cursor-pointer hover:opacity-100 transition-opacity opacity-70" strokeWidth={1.5} />
                </div>

                {/* Content Wrapper */}
                <div className="flex-1 flex items-center px-24 relative overflow-hidden">
                    {/* Background Graphic (Large Faded Circle/Number) */}
                    <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[70%] h-[90%] pointer-events-none select-none flex items-center justify-center">
                        {/* Circle Background */}
                        <div className="absolute w-full aspect-square border-[80px] border-white/20 rounded-full"></div>
                        <div className="absolute w-[85%] aspect-square border-[60px] border-white/20 rounded-full"></div>

                        {/* Large Number 90 */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45rem] font-black text-white/30 leading-none select-none opacity-40">
                            90
                        </div>
                    </div>

                    {/* Left Side: Product Info */}
                    <div className="w-1/2 z-10 flex flex-col justify-center py-20">
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-gray-500 text-xl font-medium mb-2"
                        >
                            Comfort and quality at every step.
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-8xl font-bold leading-[1.1] text-gray-900 mb-6"
                        >
                            {product.name}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <div className="flex items-center gap-1">
                                <FiStar className="text-yellow-400 fill-yellow-400 text-xl" />
                                <span className="text-lg font-bold text-gray-900 pt-1">{product.rating || "4.5"}</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            <span className="text-gray-500 font-medium">{product.sold || "4.5k"} Sold</span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-500 text-xl max-w-lg leading-relaxed mb-12"
                        >
                            {product.description || "Experience the ultimate in comfort and convenience with our shoes, featuring a cushioned insole that cradles your feet with every step."}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col gap-10"
                        >
                            <p className="text-7xl font-bold text-gray-900 tracking-tight">
                                Rs {Number(product.price).toLocaleString()}
                            </p>

                            <div className="flex items-center gap-8">
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                                        {isThrift ? "Fixed Size" : "Select Size"}
                                    </span>
                                    <div className="flex gap-3">
                                        {isThrift ? (
                                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold bg-gray-900 text-white shadow-lg">
                                                {product.size || "42"}
                                            </div>
                                        ) : (
                                            ["40", "41", "42", "43", "44"].map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold transition-all ${selectedSize === size
                                                        ? "bg-gray-900 text-white"
                                                        : "bg-white text-gray-600 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-[#6db56f] mt-7 text-white px-12 py-5 rounded-2xl flex items-center gap-4 text-xl font-bold shadow-xl shadow-green-900/10 hover:bg-[#5da061] transition-all transform active:scale-95"
                                >
                                    <FiShoppingBag className="text-2xl" />
                                    Add To Cart
                                </button>
                            </div>

                            {canManage && (
                                <div className="flex items-center gap-4 mt-4">
                                    <Link
                                        href={`/dashboard/product/${product._id || product.id}/edit`}
                                        className="flex-1 bg-neutral-900 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-black transition-colors"
                                    >
                                        <FiEdit /> Edit Product
                                    </Link>
                                    <button
                                        onClick={onDelete}
                                        className="bg-red-500/10 text-red-500 p-4 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                        title="Delete Product"
                                    >
                                        <FiTrash2 className="text-xl" />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Side: Product Image */}
                    <div className="w-1/2 relative h-full flex items-center justify-end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -25, x: 100 }}
                            animate={{ opacity: 1, scale: 1.15, rotate: -15, x: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 40,
                                damping: 12,
                                delay: 0.2
                            }}
                            className="relative z-20 w-[140%] -mr-[30%]"
                        >
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-auto drop-shadow-[0_60px_60px_rgba(0,0,0,0.2)] select-none pointer-events-none"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Pagination Info */}
                <div className="px-24 pb-12">
                    <p className="text-xl font-bold text-gray-800 tracking-widest opacity-60">
                        01 / 05
                    </p>
                </div>
            </main>
        </div>
    );
}
