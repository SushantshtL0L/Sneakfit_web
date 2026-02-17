"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./_components/Sidebar";
import ProductCard from "./_components/ProductCard";
import Pagination from "./_components/Pagination";
import SupportSection from "./_components/SupportSection";
import FeaturedOffers from "./_components/FeaturedOffers";
import SettingsDropdown from "./_components/SettingsDropdown";
import { handleGetAllProducts } from "@/lib/actions/product.actions";
import { useAuth } from "@/context/AuthContext";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

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
    const result = await handleGetAllProducts(page, limit, search);
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
  }, [page, search]);

  const handleProductDeleted = (id: string) => {
    fetchProducts(); // Refresh current page
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-neutral-900 font-sans">
      <Sidebar activePage="shoes" />

      {/* Main Content */}
      <main className="flex-1 p-10 lg:p-16 bg-white overflow-hidden">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 px-4 gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-black text-neutral-900 tracking-tighter uppercase">
              New Drops<span className="text-neutral-300">.</span>
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                Showing {liveProducts.length} of {totalProducts} items
              </span>
              <div className="h-1 w-1 rounded-full bg-neutral-300"></div>
              <span className="text-xs font-bold text-neutral-900 uppercase tracking-widest bg-neutral-100 px-3 py-1 rounded-full">
                Spring '24 Collection
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-50 border border-neutral-100 text-sm font-bold text-neutral-600 hover:bg-neutral-100 transition-colors">
              <FiFilter />
              Filter
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-900 text-white text-sm font-bold hover:bg-neutral-800 transition-colors shadow-xl shadow-neutral-200">
              Sort By
              <FiChevronDown />
            </button>
            <div className="ml-2">
              <SettingsDropdown />
            </div>
          </div>
        </header>

        {/* Featured Section */}
        <FeaturedOffers />

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-neutral-100 border-t-neutral-900 rounded-full"
            />
            <p className="text-neutral-400 font-bold uppercase tracking-widest text-xs">Summoning Kicks...</p>
          </div>
        ) : (
          <div className="px-4">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold text-neutral-900 tracking-tight">Marketplace</h3>
              <button className="text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors">
                View Trends
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
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

            <div className="mt-20 border-t border-neutral-50 pt-20">
              <SupportSection />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

