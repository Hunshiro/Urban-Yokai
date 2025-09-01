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
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-10 max-w-lg w-full relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 text-3xl hover:text-gray-600 transition"
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
                    className="h-48 w-auto mx-auto rounded-xl shadow-lg object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src={product.images?.[0] || product.image}
              alt={product.title}
              className="h-48 w-auto mx-auto rounded-xl shadow-lg object-contain"
            />
          )}
        </div>

        {/* Details */}
        <h2 className="font-heading text-3xl text-gray-800 mb-2">
          {product.title}
        </h2>
        {product.category && (
          <p className="text-gray-600 mb-2 font-medium">{product.category?.name || product.category}</p>
        )}
        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}
        <span className="text-blue-600 font-bold text-2xl mb-4 block">
          ₹{product.price}
        </span>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-8 left-8 flex gap-2">
            {product.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold shadow-sm border border-indigo-200"
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
              <span className="font-bold text-gray-800">Quantity:</span>
              <span className="text-blue-600 font-bold text-lg">{qty}</span>
            </div>
            <input
              type="range"
              min={1}
              max={product.stock || 20}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-3 px-8 py-3
              bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
              text-white rounded-3xl font-bold text-lg
              shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300
              border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <span className="text-2xl">🛒</span>
            Add {qty > 1 ? `${qty} Items` : "to Cart"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
