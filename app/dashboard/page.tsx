"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./_components/Sidebar";
import ProductCard from "./_components/ProductCard";
import { handleGetAllProducts } from "@/lib/actions/product.actions";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const [liveProducts, setLiveProducts] = useState<any[]>([]);
  const { user } = useAuth();
  const currentUserId = user?.id || user?._id;

  const dummyProducts = [
    {
      id: 1,
      brand: "Puma",
      name: "Men White & Black Colourblocked IDP Sneakers",
      price: "2300",
      rating: "4.5",
      sold: "4500",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400",
      isNew: true
    },
    {
      id: 2,
      brand: "ADIDAS",
      name: "Men Black Solid Adivat Running Shoes",
      price: "1619",
      rating: "4.7",
      sold: "4500",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=400",
      isNew: true
    },
    {
      id: 3,
      brand: "ADIDAS",
      name: "Men Black Solid Adivat Running Shoes",
      price: "1619",
      rating: "4.7",
      sold: "4500",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400",
      isNew: false
    },
    {
      id: 4,
      brand: "Puma",
      name: "Men White & Black Colourblocked IDP Sneakers",
      price: "1619",
      rating: "4.5",
      sold: "4500",
      image: "https://images.unsplash.com/photo-1620138546344-7b2c38516ee3?auto=format&fit=crop&q=80&w=400",
      isNew: true
    },
    {
      id: 5,
      brand: "ADIDAS",
      name: "Men Black Solid Adivat Running Shoes",
      price: "1619",
      rating: "4.7",
      sold: "4500",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=400",
      isNew: true
    },
    {
      id: 6,
      brand: "ADIDAS",
      name: "Men Black Solid Adivat Running Shoes",
      price: "1619",
      rating: "4.7",
      sold: "4500",
      image: "https://images.unsplash.com/photo-1512374382149-4332c6c021f1?auto=format&fit=crop&q=80&w=400",
      isNew: true
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await handleGetAllProducts();
      if (result.success) {
        setLiveProducts(result.data);
      }
    };
    fetchProducts();
  }, []);

  const allProducts = [...liveProducts, ...dummyProducts];

  const handleProductDeleted = (id: string) => {
    setLiveProducts(prev => prev.filter(p => (p._id || p.id) !== id));
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfc] text-gray-900 font-sans">
      <Sidebar activePage="shoes" />

      {/* Main Content */}
      <main className="flex-1 p-20 bg-white overflow-y-auto">
        <header className="flex justify-between items-center mb-20 px-4">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Most Popular</h2>
          <button className="text-[16px] font-black uppercase tracking-[0.3em] text-gray-900 hover:opacity-60 transition-opacity">
            SEE ALL
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-28 px-4">
          {allProducts.map((product, index) => (
            <ProductCard
              key={product._id || product.id || index}
              product={product}
              currentUserId={currentUserId}
              onDeleted={handleProductDeleted}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
