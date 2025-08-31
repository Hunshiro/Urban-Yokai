import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Background from "../assets/background.png";

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
        {/* Animated Title */}
        <motion.h1
  className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f7ff] via-[#ff00ff] to-[#b700ff] bg-[length:300%_300%] drop-shadow-md tracking-wide"
  initial={{ opacity: 0, y: 50 }}
  animate={{ 
    opacity: 1, 
    y: [0, -10, 0], // Subtle bounce effect
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  }}
  transition={{ 
    opacity: { duration: 0.8, ease: "easeOut" },
    y: { duration: 1, ease: "easeInOut", times: [0, 0.5, 1] },
    backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" },
  }}
  whileHover={{ 
    scale: 1.05,
    textShadow: "0 0 15px rgba(0, 247, 255, 0.9), 0 0 30px rgba(255, 0, 255, 0.7)",
  }}
>
  <motion.span
    animate={{
      textShadow: [
        "0 0 8px rgba(0, 247, 255, 0.7)",
        "0 0 12px rgba(255, 0, 255, 0.7)",
        "0 0 16px rgba(183, 0, 255, 0.7)",
      ],
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="bg-gradient-to-r from-[#00f7ff] via-[#ff00ff] to-[#b700ff] bg-[length:300%_300%] bg-clip-text text-transparent inline-block"
  >
    Urban Yokai
  </motion.span>
</motion.h1>
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
