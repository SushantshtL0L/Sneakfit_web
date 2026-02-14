"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./_components/Sidebar";
import ProductCard from "./_components/ProductCard";
import Pagination from "./_components/Pagination";
import SupportSection from "./_components/SupportSection";
import { handleGetAllProducts } from "@/lib/actions/product.actions";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const [liveProducts, setLiveProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 6;

  const { user } = useAuth();
  const currentUserId = user?.id || user?._id;

  const fetchProducts = async () => {
    setLoading(true);
    const result = await handleGetAllProducts(page, limit);
    if (result.success) {
      if (result.data.products) {
        setLiveProducts(result.data.products);
        setTotalPages(result.data.totalPages);
        setTotalProducts(result.data.total);
      } else {
        // Fallback backend ko lagi
        setLiveProducts(result.data);
        setTotalPages(1);
        setTotalProducts(result.data.length);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handleProductDeleted = (id: string) => {
    fetchProducts(); // Refresh current page
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfc] text-gray-900 font-sans">
      <Sidebar activePage="shoes" />

      {/* Main Content */}
      <main className="flex-1 p-20 bg-white">
        <header className="flex justify-between items-center mb-20 px-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Most Popular</h2>
            <p className="text-sm text-gray-400 font-medium">Showing {liveProducts.length} of {totalProducts} shoes</p>
          </div>
          <button className="text-[16px] font-black uppercase tracking-[0.3em] text-gray-900 hover:opacity-60 transition-opacity">
            SEE ALL
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-10 h-10 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium">Discovering latest sneakers...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-28 px-4">
              {liveProducts.map((product, index) => (
                <ProductCard
                  key={product._id || product.id || index}
                  product={product}
                  currentUserId={currentUserId}
                  onDeleted={handleProductDeleted}
                />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />

            <SupportSection />
          </>
        )}
      </main>
    </div>
  );
}
