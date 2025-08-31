import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const NeonLogo = () => (
  <motion.svg
    width="120"
    height="40"
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ filter: "blur(2px)", opacity: 0 }}
    animate={{ filter: "blur(0px)", opacity: 1 }}
    transition={{ duration: 1 }}
    className="drop-shadow-[0_0_16px_#ec4899]"
  >
    <text
      x="0"
      y="28"
      fontFamily="'Press Start 2P', cursive"
      fontSize="28"
      fill="#f472b6"
      stroke="#22d3ee"
      strokeWidth="2"
    >
      RAPCOD
    </text>
    <line
      x1="10"
      y1="35"
      x2="110"
      y2="35"
      stroke="#22d3ee"
      strokeWidth="3"
      strokeDasharray="8 4"
    />
  </motion.svg>
);

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Cart" },
  { href: "/admin", label: "Admin" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <header className="sticky top-0 z-50 bg-black bg-opacity-80 backdrop-blur-xl flex items-center justify-between px-8 py-4 shadow-lg border border-gray-800 rounded-3xl">
        <div className="flex items-center gap-4">
          {/* Animated Neon SVG Logo */}
          <NeonLogo />
        </div>
        
        {/* Desktop Navbar */}
        <nav className="hidden md:flex gap-8 text-white font-medium">
          {navLinks.map((link) => (
            link.label === "Cart" ? (
              <a
                key={link.href}
                href={link.href}
                className="group relative px-3 py-1 rounded-3xl transition text-lg hover:text-pink-400"
              >
                <span className="relative z-10">{link.label}</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-neonPink animate-bounce">
                    {cartCount}
                  </span>
                )}
                <span className="absolute left-0 right-0 bottom-0 h-1 rounded-full bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="group relative px-3 py-1 rounded-3xl transition text-lg hover:text-pink-400"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute left-0 right-0 bottom-0 h-1 rounded-full bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
              </a>
            )
          ))}
        </nav>
        
        {/* Mobile Navbar Toggle */}
        <button
          className="md:hidden flex flex-col items-center justify-center w-12 h-12 rounded-full bg-black bg-opacity-70 border border-gray-700 shadow-[0_0_10px_#ec4899] focus:outline-none focus:ring-2 focus:ring-cyan-400 z-50 relative"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <motion.span
            className="block w-6 h-1 bg-cyan-400 rounded-full mb-1.5"
            animate={{
              rotate: menuOpen ? 45 : 0,
              y: menuOpen ? 4 : 0,
              backgroundColor: menuOpen ? "#f472b6" : "#22d3ee",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          ></motion.span>
          <motion.span
            className="block w-6 h-1 bg-cyan-400 rounded-full mb-1.5"
            animate={{
              opacity: menuOpen ? 0 : 1,
              scaleX: menuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          ></motion.span>
          <motion.span
            className="block w-6 h-1 bg-cyan-400 rounded-full"
            animate={{
              rotate: menuOpen ? -45 : 0,
              y: menuOpen ? -4 : 0,
              backgroundColor: menuOpen ? "#f472b6" : "#22d3ee",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          ></motion.span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMenuOpen(false)}
            />
            
            {/* Mobile Menu Drawer */}
            <motion.nav
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: "easeInOut",
                type: "spring",
                damping: 25,
                stiffness: 200
              }}
              className="fixed top-0 right-0 w-64 h-full bg-black bg-opacity-95 backdrop-blur-xl shadow-[0_0_20px_#ec4899] border-l border-gray-800 z-50 flex flex-col gap-8 pt-24 px-8"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-xl text-cyan-400 hover:text-pink-400 transition-colors duration-300 relative group"
                  onClick={() => setMenuOpen(false)}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  {link.label}
                  <motion.span
                    className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              
              {/* Decorative neon line */}
              <motion.div
                className="mt-8 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;