import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-background text-text-muted py-8 px-4 mt-12 shadow-soft">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="RAPCOD Logo" className="h-8 w-auto" />
          <span className="font-heading text-lg text-primary">RAPCOD</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary">Instagram</a>
          <a href="#" className="hover:text-primary">Twitter</a>
          <a href="#" className="hover:text-primary">Discord</a>
        </div>
        <form className="flex gap-2">
          <input type="email" placeholder="Newsletter Email" className="px-3 py-2 rounded-2xl bg-background border border-secondary text-text-base" />
          <button className="px-4 py-2 bg-primary text-heading rounded-2xl font-bold hover:bg-accent transition">Subscribe</button>
        </form>
      </div>
      <div className="text-center text-xs mt-6">&copy; {new Date().getFullYear()} RAPCOD. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
