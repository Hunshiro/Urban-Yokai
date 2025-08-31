import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useCart } from "../context/CartContext";

const ProductModal = ({ product, onClose, showToast }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({ ...product, qty });

    if (showToast) showToast(`${product.title} (${qty}) added to cart!`);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-xl flex items-center justify-center z-50">
      <motion.div
        className="bg-background bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-neonBlue border border-accent p-10 max-w-lg w-full relative animate-fade-in-up"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-accent text-3xl font-special hover:text-primary transition"
        >
          &times;
        </button>

        {/* Images / Carousel */}
        <div className="mb-6">
          {product.images && product.images.length > 1 ? (
            <Swiper spaceBetween={10} slidesPerView={1} className="h-48 w-full rounded-xl">
              {product.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={product.title}
                    className="h-48 w-auto mx-auto rounded-xl drop-shadow-neonPink object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src={product.images?.[0] || product.image}
              alt={product.title}
              className="h-48 w-auto mx-auto rounded-xl drop-shadow-neonPink object-contain"
            />
          )}
        </div>

        {/* Details */}
        <h2 className="font-heading text-3xl text-heading mb-2 drop-shadow-neonPink">
          {product.title}
        </h2>
        {product.category && (
          <p className="text-text-muted mb-2 font-special">{product.category}</p>
        )}
        {product.description && (
          <p className="text-text-base mb-4">{product.description}</p>
        )}
        <span className="text-primary font-bold text-2xl mb-4 block">
          ₹{product.price}
        </span>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-8 left-8 flex gap-2">
            {product.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-accent text-heading rounded-full text-xs font-bold shadow-neonBlue animate-fade-in-up"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Quantity Slider & Add to Cart */}
        <div className="flex flex-col items-center mt-8 gap-6">
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-heading">Quantity:</span>
              <span className="text-primary font-bold text-lg">{qty}</span>
            </div>
            <input
              type="range"
              min={1}
              max={product.stock || 20}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-3 px-8 py-3 
              bg-gradient-to-r from-primary via-accent to-secondary 
              text-white rounded-3xl font-bold text-lg 
              shadow-neonPink hover:scale-105 transition-all duration-300 
              glow-trail border-2 border-primary focus:outline-none focus:ring-2 focus:ring-accent"
            style={{ boxShadow: "0 0 16px #ec4899, 0 2px 8px #2563eb" }}
          >
            <span className="material-icons text-2xl"></span>
            Add {qty > 1 ? `${qty} Items` : "to Cart"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
