import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductCard = ({ product, onClick, onEdit, onDelete }) => (
  <motion.div
    className="bg-white rounded-3xl shadow-xl border border-gray-300 p-0 flex flex-col cursor-pointer hover:shadow-2xl hover:border-pink-500 transition-all duration-300 relative overflow-hidden min-h-[400px]"
    whileHover={{ scale: 1.05, y: -8 }}
    onClick={() => onClick(product)}
  >
    {/* Image Section - Takes up most of the card */}
    <div className="w-full h-64 flex justify-center items-center bg-gray-50 rounded-t-3xl overflow-hidden">
      {product.images && product.images.length > 1 ? (
        <Swiper spaceBetween={10} slidesPerView={1} className="h-full w-full">
          {product.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img src={img} alt={product.title} className="h-full w-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src={product.images?.[0] || product.image}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      )}
    </div>

    {/* Content Section - Text and price at bottom */}
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="font-heading text-2xl text-gray-900 mb-2 text-center font-semibold line-clamp-2">{product.title}</h3>
      <p className="text-gray-700 mb-3 text-center italic text-sm">{product.category?.name || product.category}</p>
      <div className="mt-auto">
        <span className="text-pink-600 font-extrabold text-2xl block text-center">₹{product.price}</span>
      </div>
    </div>

    {/* Floating tag badges */}
    <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[70%]">
      {(product.tags || []).map((tag, idx) => (
        <motion.span
          key={idx}
          className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold shadow-md border border-pink-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.3 }}
        >
          {tag}
        </motion.span>
      ))}
    </div>
    {/* Admin action buttons */}
    <div className="absolute top-4 right-4 flex gap-3 z-10">
      {onEdit && (
        <button
          className="px-3 py-1 bg-pink-500 text-white rounded-lg text-sm font-bold shadow-lg hover:bg-pink-600 transition"
          onClick={e => { e.stopPropagation(); onEdit(product); }}
        >Edit</button>
      )}
      {onDelete && (
        <button
          className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-bold shadow-lg hover:bg-red-600 transition"
          onClick={e => { e.stopPropagation(); onDelete(product); }}
        >Delete</button>
      )}
    </div>
  </motion.div>
);

const ProductGrid = ({ products = [], onProductClick, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-screen-xl mx-auto px-4">
      {products.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
          onClick={onProductClick}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductGrid;