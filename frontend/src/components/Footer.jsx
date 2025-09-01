import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-white to-gray-50 text-gray-600 py-10 px-6 mt-12 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <motion.img
            src={logo} // Replace with your actual logo path
            alt="RAPCOD Logo"
            className="h-10 w-auto rounded-full"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.span
            className="font-bold text-xl text-indigo-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Urban Yokai
          </motion.span>
        </div>

        {/* Social Links */}
        <div className="flex gap-6">
          {[
            { name: "Instagram", href: "#" },
            { name: "Twitter", href: "#" },
            { name: "Discord", href: "#" },
          ].map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-indigo-500 font-medium transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Newsletter Form */}
        <form className="flex gap-3">
          <motion.input
            type="email"
            placeholder="Join our newsletter"
            className="px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <motion.button
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold hover:from-indigo-600 hover:to-purple-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Subscribe
          </motion.button>
        </form>
      </div>

      {/* Copyright */}
      <motion.div
        className="text-center text-sm text-gray-500 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        &copy; {new Date().getFullYear()} RAPCOD. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;