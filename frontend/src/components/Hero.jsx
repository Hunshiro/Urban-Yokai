import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Background from "../assets/yokai2.jpg";

const Hero = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* Background */}
      <motion.img
        src={Background}
        alt="Anime City Skyline"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 40 },
            size: { value: 2 },
            move: { enable: true, speed: 1 },
            color: { value: "#a855f7" },
            opacity: { value: 0.5 },
          },
        }}
        className="absolute inset-0"
      />

      {/* Hero Text */}
      <div className="relative z-10 text-center px-4">
        {/* Clean Holographic Title */}
        <div className="relative">
          {/* Main holographic layer */}
          <motion.h1
            className="text-5xl md:text-6xl font-orbitron font-bold text-white tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              textShadow: [
                "0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(236, 72, 153, 0.3)",
                "0 0 15px rgba(236, 72, 153, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)",
                "0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(236, 72, 153, 0.3)"
              ]
            }}
            transition={{
              opacity: { duration: 0.8, ease: "easeOut" },
              y: { duration: 1, ease: "easeOut" },
              textShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{
              scale: 1.02,
              textShadow: "0 0 20px rgba(168, 85, 247, 0.7), 0 0 40px rgba(236, 72, 153, 0.5)"
            }}
          >
            Urban Yokai
          </motion.h1>

          {/* Pink Neon Blossom Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Pink neon blossom particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`blossom-${i}`}
                className="absolute w-2 h-2 bg-pink-400 rounded-full shadow-[0_0_8px_#f472b6]"
                initial={{
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 80 - 40,
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0, 0.9, 0],
                  scale: [0, 1.3, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${20 + i * 5}%`,
                  top: `${30 + (i % 3) * 20}%`
                }}
              />
            ))}

            {/* Small twinkling particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`small-${i}`}
                className="absolute w-1 h-1 bg-cyan-300 rounded-full"
                initial={{
                  x: Math.random() * 600 - 300,
                  y: Math.random() * 120 - 60,
                  opacity: 0
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${10 + i * 10}%`,
                  top: `${20 + (i % 3) * 25}%`
                }}
              />
            ))}
          </div>
        </div>
        {/* Subtitle with blinking effect */}
        <motion.p
          className="mt-6 text-4xl md:text-3xl font-large text-yellow-200"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.span
            animate={{ opacity: [0, 1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            
          >
            Anime • Fashion • Lifestyle
          </motion.span>
        </motion.p>

        {/* Button */}
        <motion.a
          href="/shop"
          className="inline-block mt-10 px-10 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-white rounded-2xl shadow-lg hover:scale-110 transition-transform"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ boxShadow: "0px 0px 20px rgba(236,72,153,0.8)" }}
        >
          Shop Now
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
