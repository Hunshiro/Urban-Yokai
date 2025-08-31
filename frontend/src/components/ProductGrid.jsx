import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductCard = ({ product, onClick, onEdit, onDelete }) => (
  <motion.div
    className="bg-background bg-opacity-70 backdrop-blur-xl rounded-3xl shadow-glass border border-primary p-6 flex flex-col items-center cursor-pointer hover:shadow-neonPink hover:border-accent transition-all duration-300 relative overflow-hidden"
    whileHover={{ scale: 1.05, rotate: -2 }}
    onClick={() => onClick(product)}
  >
    <div className="mb-4 w-full flex justify-center items-center">
      {product.images && product.images.length > 1 ? (
        <Swiper spaceBetween={10} slidesPerView={1} className="h-32 w-40 rounded-xl">
          {product.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img src={img} alt={product.title} className="h-32 w-auto mx-auto rounded-xl drop-shadow-neonBlue object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src={product.images?.[0] || product.image}
          alt={product.title}
          className="h-32 w-auto mx-auto rounded-xl drop-shadow-neonBlue object-cover"
        />
      )}
    </div>
    <h3 className="font-heading text-xl text-heading mb-2">{product.title}</h3>
    <p className="text-text-muted mb-2">{product.category}</p>
    <span className="text-primary font-bold text-lg mb-2">₹{product.price}</span>
    {/* Floating tag badges */}
    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
      {(product.tags || []).map((tag, idx) => (
        <motion.span
          key={idx}
          className="px-2.5 py-1 bg-accent text-heading rounded-full text-xs font-semibold shadow-neonBlue bg-opacity-90 backdrop-blur-sm border border-accent-dark"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.3 }}
        >
          {tag}
        </motion.span>
      ))}
    </div>
    {/* Admin action buttons */}
    <div className="absolute top-3 right-3 flex gap-2 z-10">
      {onEdit && (
        <button
          className="px-2 py-1 bg-accent text-heading rounded-lg text-xs font-bold shadow-neonBlue hover:bg-primary transition"
          onClick={e => { e.stopPropagation(); onEdit(product); }}
        >Edit</button>
      )}
      {onDelete && (
        <button
          className="px-2 py-1 bg-red-500 text-heading rounded-lg text-xs font-bold shadow-neonPink hover:bg-red-700 transition"
          onClick={e => { e.stopPropagation(); onDelete(product); }}
        >Delete</button>
      )}
    </div>
  </motion.div>
);

const ProductGrid = ({ products = [], onProductClick, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-screen-xl mx-auto">
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