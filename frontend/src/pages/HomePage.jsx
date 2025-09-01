import React from "react";
import Fox from "../assets/fox.png";
import Background from "../assets/bgyokai.jpg" ;
import Katana from "../assets/kataana.jpg";
import Header from "../components/Header";
import Hero from "../components/Hero";

import Footer from "../components/Footer";
import { motion } from "framer-motion";


const featured = [
  {
    id: 1,
    title: "Cyber-Fox Plushie",
    image: Background,
    price: 999,
    desc: "Limited edition kitsune guardian plush!",
  },
  {
    id: 2,
    title: "Neon Katana Keychain",
    price: 299,
    image:Katana,
    desc: "Glowing anime katana for your keys.",
  },
];

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 relative">
        <Hero />
        {/* Mascot with glow and parallax */}
        {/* <motion.img
          src= {Fox}
          alt="Cyber-Fox Mascot"
          className="absolute right-8 top-24 w-40 h-40 drop-shadow-[0_0_32px_#ec4899] animate-fade-in"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        /> */}
        {/* Featured products glassmorphism card */}
        <section className="relative z-10 max-w-4xl mx-auto mt-[-5rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col items-center hover:shadow-xl hover:border-blue-300 transition-all"
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <img src={item.image} alt={item.title} className="h-24 w-auto mb-4 rounded-xl shadow-md" />
                <h3 className="font-heading text-xl text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.desc}</p>
                <span className="text-blue-600 font-bold text-lg mb-2">₹{item.price}</span>
                <button className="px-6 py-2 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition">Buy Now</button>
              </motion.div>
            ))}
          </div>
        </section>
        {/* Animated CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a href="/shop" className="px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl shadow-lg font-heading text-2xl hover:scale-105 transition-all">Explore Full Collection</a>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
