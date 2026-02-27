// "use client";

// import Image from "next/image";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

// export default function HomePage() {
//   const { isAuthenticated, user, loading } = useAuth();
//   const router = useRouter();

//   // useEffect(() => {
//   //   if (loading) return;

//   //   if (isAuthenticated && user) {
//   //     if (user.role === "admin") {
//   //       router.replace("/admin");
//   //     } else {
//   //       router.replace("/dashboard");
//   //     }
//   //   }
//   // }, [isAuthenticated, user, loading, router]);

//   if (loading) return null;

//   return (
//     <main className="relative min-h-screen flex items-center justify-center overflow-hidden">

//       {/* BIG BACK TEXT */}
//       <h1 className="absolute text-[200px] font-extrabold text-red-600/90 opacity-90 top-40 uppercase tracking-tighter">
//         GOLDSTAR
//       </h1>

//       {/* SHOE IMAGE */}
//       <div className="z-5 relative top-20">
//         <Image
//           src="/images/shoe.png" // put your shoe image in public/
//           alt="Goldstar Shoe"
//           width={880}
//           height={600}
//           priority
//         />
//       </div>

//       {/* BOTTOM TEXT */}
//       <div className="absolute bottom-5 text-center">

//         <h2 className="text-6xl md:text-7xl lg:text-5xl font-extrabold text-white/80">
//           THE NEW 2025
//         </h2>
//         <p className="mt-2 text-sm">
//           Aba ko Hidai Hami Sanga
//         </p>
//       </div>
//     </main>
//   );
// }


"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaArrowDown,
  FaCrown,
  FaLeaf,
  FaRunning,
  FaFire
} from "react-icons/fa";
import Header from "./_components/Header";

export default function HomePage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return null;

  const features = [
    { title: "Premium Quality", desc: "Handcrafted with finest materials", icon: <FaCrown className="text-xl" /> },
    { title: "Eco-Friendly", desc: "Sustainable production methods", icon: <FaLeaf className="text-xl" /> },
    { title: "Performance", desc: "Engineered for athletes", icon: <FaRunning className="text-xl" /> },
    { title: "Innovation", desc: "Cutting-edge technology", icon: <FaFire className="text-xl" /> },
  ];

  return (
    <div className="min-h-screen !bg-black text-white overflow-x-hidden">
      {/* Use only Header component */}


      {/* HERO SECTION */}
      <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 !bg-black">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute text-[150px] md:text-[230px] lg:text-[250px] xl:text-[300px] font-extrabold text-[#c30101] opacity-100 top-20 md:top-10 uppercase tracking-tighter leading-none select-none z-0"
        >
          GOLDSTAR
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10 relative top-10 md:top-20 lg:top-24"
        >
          <div className="relative w-[300px] h-[200px] md:w-[600px] md:h-[400px] lg:w-[800px] lg:h-[500px] xl:w-[900px] xl:h-[550px]">
            <Image
              src="/images/shoe.png"
              alt="Goldstar Shoe"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-16 text-center z-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white/90 mb-2">
            THE NEW 2025
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-400 italic">
            Aba ko Hidai Hami Sanga
          </p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
        >
          <FaArrowDown className="text-xl md:text-2xl text-white/60" />
        </motion.div>
      </main>

      {/* FEATURES SECTION */}
      <section className="py-16 md:py-24 px-4 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                SNEAKFIT
              </span>
              <span> Technology</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Revolutionizing comfort with cutting-edge footwear technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all group border border-white/10"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-4 lg:px-8 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-8">
              About <span className="text-red-600">SneakFit</span>
            </h2>
            <div className="space-y-8 text-neutral-400 text-lg leading-relaxed">
              <p>
                SneakFit is more than just an e-commerce platform; it's a destination for true sneaker enthusiasts. Born from the culture of the streets, we bridge the gap between high-end luxury and everyday style.
              </p>
              <p>
                Whether you're looking for the latest limited-edition drops from global brands or searching for that perfect pair of authenticated thrifted kicks, SneakFit has you covered. Our platform is built on trust, authenticity, and a passion for footwear.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-12 pt-8">
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Authenticity</h4>
                  <p className="text-sm">Every pair is inspected for quality and genuineness.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Sustainability</h4>
                  <p className="text-sm">Promoting thrift culture to reduce fashion waste.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 px-4 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase"
          >
            What We <span className="text-red-600">Deliver</span>
          </motion.h2>
          <p className="text-neutral-500 mt-4 max-w-xl mx-auto">Providing a seamless shopping experience for the modern sneakerhead.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Branded New Shoes",
              desc: "Get your hands on the latest releases from top global brands, fully authenticated and guaranteed new.",
              icon: <FaCrown className="text-2xl" />
            },
            {
              title: "Premium Thrift Store",
              desc: "A curated marketplace for high-quality, pre-owned sneakers. Sustainability meets street style.",
              icon: <FaLeaf className="text-2xl" />
            },
            {
              title: "SneakFit Seller Hub",
              desc: "A dedicated platform for sellers to list their inventory and reach thousands of sneaker enthusiasts.",
              icon: <FaFire className="text-2xl" />
            }
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-neutral-900/50 border border-white/5 hover:bg-neutral-800/50 transition-all group"
            >
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
                <span className="font-bold">GS</span>
              </div>
              <span className="text-xl font-bold">GOLDSTAR</span>
            </div>
            <p className="text-gray-400 text-sm">© 2025 Goldstar Sneakers. All rights reserved.</p>
            <p className="text-gray-500 text-xs italic mt-1">"Aba ko Hidai Hami Sanga"</p>
          </div>

          <div className="flex space-x-4">
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-linkedin hover:scale-110 transition-all" title="LinkedIn"><FaLinkedin className="text-lg" /></a>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gray-800 hover:scale-110 transition-all" title="GitHub"><FaGithub className="text-lg" /></a>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 hover:scale-110 transition-all" title="Instagram"><FaInstagram className="text-lg" /></a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-twitter hover:scale-110 transition-all" title="Twitter"><FaTwitter className="text-lg" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
