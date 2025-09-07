import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo3.png"

// Assuming CartContext is defined elsewhere
import { useCart } from "../context/CartContext"; // Adjust path as needed

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Cart" },
  { href: "/admin", label: "Admin" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();

  // Get user profile from localStorage
  let userProfile = null;
  try {
    userProfile = JSON.parse(window.localStorage.getItem('userProfile'));
  } catch {}

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-white to-gray-50 h-22 flex items-center justify-between px-6 py-4 shadow-md border-b border-gray-200">
        <div className="flex items-center">
          {/* Animated Logo Placeholder - Replace src with your actual logo */}
          <motion.img
            src={logo} // Adjust path to your logo
            alt="Urban Yokai Logo"
            className="h-20 w-20 rounded-full"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex gap-6 text-gray-800 font-semibold">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="group relative px-4 py-2 rounded-full transition-all text-lg hover:text-indigo-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{link.label}</span>
              {link.label === "Cart" && cartCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-bold rounded-full px-2 py-1 shadow-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  {cartCount}
                </motion.span>
              )}
              <motion.span
                className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Google Login/Profile */}
        <div>
          {userProfile ? (
            <img
              src={userProfile.picture || '/profile.png'}
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-primary"
              title={userProfile.name}
            />
          ) : (
            <a href={`${import.meta.env.VITE_BACKEND_URL}api/auth/google`} className="px-6 py-2 bg-primary text-black rounded-2xl font-bold hover:bg-accent transition">Login</a>
          )}
        </div>

        {/* Mobile Navbar Toggle */}
        <motion.button
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full bg-gray-100 border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 z-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className="block w-5 h-0.5 bg-indigo-600 rounded-full mb-1"
            animate={{
              rotate: menuOpen ? 45 : 0,
              y: menuOpen ? 3 : 0,
              backgroundColor: menuOpen ? "#ec4899" : "#4f46e5",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-indigo-600 rounded-full mb-1"
            animate={{
              opacity: menuOpen ? 0 : 1,
              scaleX: menuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-indigo-600 rounded-full"
            animate={{
              rotate: menuOpen ? -45 : 0,
              y: menuOpen ? -3 : 0,
              backgroundColor: menuOpen ? "#ec4899" : "#4f46e5",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gray-900 z-40"
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
                stiffness: 200,
              }}
              className="fixed top-0 right-0 w-72 h-full bg-white bg-opacity-95 backdrop-blur-lg shadow-xl border-l border-gray-200 z-50 flex flex-col gap-6 pt-20 px-6"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-lg text-gray-800 hover:text-indigo-600 font-semibold transition-colors duration-300 relative group"
                  onClick={() => setMenuOpen(false)}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {link.label}
                  <motion.span
                    className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}

              {/* Decorative neon line */}
              <motion.div
                className="mt-6 w-full h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
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