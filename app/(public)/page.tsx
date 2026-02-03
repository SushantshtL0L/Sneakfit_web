"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (loading) return;

  //   if (isAuthenticated && user) {
  //     if (user.role === "admin") {
  //       router.replace("/admin");
  //     } else {
  //       router.replace("/dashboard");
  //     }
  //   }
  // }, [isAuthenticated, user, loading, router]);

  if (loading) return null;

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* BIG BACK TEXT */}
      <h1 className="absolute text-[200px] font-extrabold text-red-600/90 opacity-90 top-40 uppercase tracking-tighter">
        GOLDSTAR
      </h1>

      {/* SHOE IMAGE */}
      <div className="z-5 relative top-20">
        <Image
          src="/images/shoe.png" // put your shoe image in public/
          alt="Goldstar Shoe"
          width={880}
          height={600}
          priority
        />
      </div>

      {/* BOTTOM TEXT */}
      <div className="absolute bottom-5 text-center">

        <h2 className="text-6xl md:text-7xl lg:text-5xl font-extrabold text-white/80">
          THE NEW 2025
        </h2>
        <p className="mt-2 text-sm">
          Aba ko Hidai Hami Sanga
        </p>
      </div>
    </main>
  );
}

// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import { motion } from "framer-motion";
// import { 
//   FaLinkedin, 
//   FaGithub, 
//   FaInstagram, 
//   FaTwitter,
//   FaArrowDown,
//   FaStar,
//   FaFire,
//   FaLeaf,
//   FaRunning,
//   FaCrown
// } from "react-icons/fa";

// export default function HomePage() {
//   const { isAuthenticated, user, loading } = useAuth();
//   const router = useRouter();
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     if (loading) return;

//     if (isAuthenticated && user) {
//       if (user.role === "admin") {
//         router.replace("/admin");
//       } else {
//         router.replace("/dashboard");
//       }
//     }
//   }, [isAuthenticated, user, loading, router]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   if (loading) return null;

//   const features = [
//     { 
//       title: "Premium Quality", 
//       desc: "Handcrafted with finest materials",
//       icon: <FaCrown className="text-xl" />
//     },
//     { 
//       title: "Eco-Friendly", 
//       desc: "Sustainable production methods",
//       icon: <FaLeaf className="text-xl" />
//     },
//     { 
//       title: "Performance", 
//       desc: "Engineered for athletes",
//       icon: <FaRunning className="text-xl" />
//     },
//     { 
//       title: "Innovation", 
//       desc: "Cutting-edge technology",
//       icon: <FaFire className="text-xl" />
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-x-hidden">
//       {/* Navigation Bar - Minimal */}
//       <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//         isScrolled ? "bg-black/90 backdrop-blur-md py-3" : "bg-transparent py-5"
//       }`}>
//         <div className="w-full px-4 lg:px-8 flex justify-between items-center">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
//               <span className="font-bold">GS</span>
//             </div>
//             <span className="text-lg font-bold">GOLDSTAR</span>
//           </div>

//           <div className="flex space-x-6">
//             <a
//               href="https://linkedin.com/in/yourprofile"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-linkedin hover:scale-110 transition-all"
//               title="LinkedIn"
//             >
//               <FaLinkedin className="text-sm" />
//             </a>
//             <a
//               href="https://github.com/yourusername"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-gray-800 hover:scale-110 transition-all"
//               title="GitHub"
//             >
//               <FaGithub className="text-sm" />
//             </a>
//           </div>
//         </div>
//       </nav>

//       {/* Main Hero Section - Matching Original Layout */}
//       <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
//         {/* BIG BACK TEXT - Matching Original */}
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="absolute text-[180px] md:text-[250px] lg:text-[300px] xl:text-[350px] font-extrabold text-red-600/90 opacity-90 top-20 md:top-10 uppercase tracking-tighter leading-none select-none"
//         >
//           GOLDSTAR
//         </motion.h1>

//         {/* SHOE IMAGE - Matching Original Position */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="z-10 relative top-10 md:top-20 lg:top-24"
//         >
//           <div className="relative w-[300px] h-[200px] md:w-[600px] md:h-[400px] lg:w-[800px] lg:h-[500px] xl:w-[900px] xl:h-[550px]">
//             <Image
//               src="/images/shoe.png"
//               alt="Goldstar Shoe"
//               fill
//               className="object-contain drop-shadow-2xl"
//               priority
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
//             />
//           </div>
//         </motion.div>

//         {/* BOTTOM TEXT - Matching Original Position */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="absolute bottom-8 md:bottom-12 text-center z-10"
//         >
//           <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white/90 mb-2">
//             THE NEW 2025
//           </h2>
//           <p className="text-sm md:text-base lg:text-lg text-gray-400 italic">
//             Aba ko Hidai Hami Sanga
//           </p>
//         </motion.div>

//         {/* Scroll Indicator */}
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ repeat: Infinity, duration: 1.5 }}
//           className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-10"
//         >
//           <FaArrowDown className="text-xl md:text-2xl text-white/60" />
//         </motion.div>

//         {/* Background Gradient Effects */}
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-red-500/5 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
//       </main>

//       {/* Features Section - Modern Add-on */}
//       <section className="py-16 md:py-24 px-4 lg:px-8 bg-gradient-to-b from-black to-gray-900">
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12 md:mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
//               <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
//                 SNEAKFIT
//               </span>
//               <span> Technology</span>
//             </h2>
//             <p className="text-gray-400 text-lg max-w-3xl mx-auto">
//               Revolutionizing comfort with cutting-edge footwear technology
//             </p>
//           </motion.div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all group border border-white/10"
//               >
//                 <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-400 text-sm">{feature.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Technology Showcase */}
//       <section className="py-16 md:py-24 px-4 lg:px-8 bg-black">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="relative"
//             >
//               <div className="relative h-64 md:h-80 lg:h-96">
//                 <Image
//                   src="/images/shoe.png"
//                   alt="Goldstar Technology"
//                   fill
//                   className="object-contain"
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
//                 />
//               </div>
//             </motion.div>
            
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <h2 className="text-3xl md:text-4xl font-bold mb-6">
//                 Engineered for Excellence
//               </h2>
//               <p className="text-gray-300 mb-6">
//                 Every Goldstar shoe combines innovative design with premium materials. 
//                 Our SneakFit technology ensures optimal comfort and performance for every step.
//               </p>
//               <ul className="space-y-3">
//                 {[
//                   "Advanced Cushioning System",
//                   "Breathable Mesh Design",
//                   "Durable Rubber Outsole",
//                   "Ergonomic Support"
//                 ].map((item, index) => (
//                   <li key={index} className="flex items-center">
//                     <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Footer with Social Links */}
//       <footer className="py-8 px-4 lg:px-8 border-t border-white/10">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="mb-6 md:mb-0 text-center md:text-left">
//               <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
//                   <span className="font-bold">GS</span>
//                 </div>
//                 <span className="text-xl font-bold">GOLDSTAR</span>
//               </div>
//               <p className="text-gray-400 text-sm">
//                 © 2025 Goldstar Sneakers. All rights reserved.
//               </p>
//               <p className="text-gray-500 text-xs italic mt-1">
//                 "Aba ko Hidai Hami Sanga"
//               </p>
//             </div>

//             <div className="flex space-x-4">
//               <a
//                 href="https://linkedin.com/in/yourprofile"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-linkedin hover:scale-110 transition-all"
//                 title="LinkedIn"
//               >
//                 <FaLinkedin className="text-lg" />
//               </a>
//               <a
//                 href="https://github.com/yourusername"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gray-800 hover:scale-110 transition-all"
//                 title="GitHub"
//               >
//                 <FaGithub className="text-lg" />
//               </a>
//               <a
//                 href="https://instagram.com/yourprofile"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 hover:scale-110 transition-all"
//                 title="Instagram"
//               >
//                 <FaInstagram className="text-lg" />
//               </a>
//               <a
//                 href="https://twitter.com/yourprofile"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-twitter hover:scale-110 transition-all"
//                 title="Twitter"
//               >
//                 <FaTwitter className="text-lg" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }