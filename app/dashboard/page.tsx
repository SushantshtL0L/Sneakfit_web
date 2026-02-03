"use client";

import React from "react";
import { FiSearch, FiHeart, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";

const SidebarItem = ({ label, badge, active, href }: { label: string, badge?: string, active?: boolean, href: string }) => (
  <Link href={href}>
    <div className={`px-8 py-3 cursor-pointer transition-all duration-200 hover:opacity-70 flex items-center justify-between group`}>
      <div className="flex items-center gap-3">
        <span className={`text-5xl font-light tracking-tight ${active ? "text-gray-900" : "text-gray-400"}`} style={{ fontFamily: "serif" }}>{label}</span>
        {badge && (
          <span className="bg-gray-600 text-white text-[12px] px-3 py-1 rounded-full uppercase font-bold mt-4">
            {badge}
          </span>
        )}
      </div>
    </div>
  </Link>
);

const ProductCard = ({ product }: { product: any }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-transparent"
  >
    <div className="relative aspect-square bg-[#ececec] rounded-[40px] overflow-hidden group">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-contain mix-blend-multiply p-8 transition-transform duration-500 group-hover:scale-105"
      />

      {/* Top Left Icon (Star/Badge) */}
      <div className="absolute top-8 left-8">
        <div className={product.isNew ? "text-[#9381ff]" : "text-gray-400 opacity-20"}>
          <FiStar className={`text-2xl ${product.isNew ? "fill-[#9381ff]" : ""}`} strokeWidth={1.5} />
        </div>
      </div>

      {/* Top Right Heart icon */}
      <div className="absolute top-8 right-8">
        <FiHeart className="text-white text-3xl drop-shadow-sm opacity-60 hover:opacity-100 cursor-pointer transition-opacity" strokeWidth={1.5} />
      </div>

      {/* Heart icon at bottom center (floating) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <FiHeart className="text-white text-3xl opacity-40" strokeWidth={1} />
      </div>
    </div>

    <div className="mt-8 px-2">
      <div className="flex flex-col gap-1">
        <p className="text-[14px] font-bold text-gray-800 uppercase tracking-tight">{product.brand}</p>
        <h3 className="text-[14px] font-medium text-gray-400 line-clamp-1 mt-1">{product.name}</h3>
      </div>

      <div className="flex items-center gap-4 mt-6 text-[15px]">
        <span className="font-bold text-gray-900">{product.rating}</span>
        <div className="w-[1.5px] h-4 bg-gray-300"></div>
        <span className="bg-[#dcdcdc] px-4 py-1.5 rounded-md font-bold text-[11px] text-gray-700 tracking-wider">
          {product.sold} SOLD
        </span>
      </div>

      <div className="mt-6">
        <p className="text-xl font-bold text-gray-900 font-sans">
          Rs .<span className="text-2xl">{product.price}</span>
        </p>
      </div>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  const products = [
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

  return (
    <div className="flex min-h-screen bg-[#fcfcfc] text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-[420px] bg-[#f5f5f5] flex flex-col h-screen sticky top-0">
        <div className="p-16">
          <h1 className="text-6xl font-bold tracking-tight text-gray-800 mb-20 ml-4">
            Sneak<span className="text-gray-900">Fit.</span>
          </h1>

          <div className="relative mb-24 px-4">
            <div className="absolute inset-y-0 left-12 flex items-center pointer-events-none">
              <FiSearch className="text-gray-600 text-3xl" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#f3e8e2] border-none rounded-[35px] py-8 pl-20 pr-8 text-2xl text-gray-800 placeholder-gray-400 focus:ring-0 outline-none transition-all"
            />
          </div>

          <nav className="flex flex-col gap-8">
            <SidebarItem label="Shoes" active href="/dashboard" />
            <SidebarItem label="My Cart" href="#" />
            <SidebarItem label="Most Sales" href="#" />
            <SidebarItem label="Thrifts" badge="New" href="#" />
            <SidebarItem label="Profile" href="/profile" />
            <SidebarItem label="Support" href="#" />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-20 bg-white overflow-y-auto">
        <header className="flex justify-between items-center mb-20 px-4">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Most Popular</h2>
          <button className="text-[16px] font-black uppercase tracking-[0.3em] text-gray-900 hover:opacity-60 transition-opacity">
            SEE ALL
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-28 px-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
