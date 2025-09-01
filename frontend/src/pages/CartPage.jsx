import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

// Sample CartItem component with improved quantity input text color
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  // Fallback image for missing or invalid images
  const fallbackImage = "https://via.placeholder.com/80?text=Image+Not+Found";

  return (
    <motion.div
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md border border-gray-100 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={item.images?.[0] || fallbackImage}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md"
        loading="lazy"
        onError={(e) => (e.target.src = fallbackImage)}
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600">
          ₹{Number(item.price).toLocaleString("en-IN")} x {item.qty}
        </p>
        <p className="text-indigo-600 font-semibold">
          Total: ₹{(Number(item.price) * item.qty).toLocaleString("en-IN")}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <motion.input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value > 0) {
              onUpdateQuantity(item.id, value);
            }
          }}
          className="w-16 p-2 border border-gray-300 rounded-md text-center text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:text-indigo-600 transition-colors duration-200"
          aria-label={`Quantity for ${item.name}`}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
        <motion.button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          onClick={() => onRemove(item.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </motion.button>
      </div>
    </motion.div>
  );
};

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Calculate total with proper currency formatting
  const total = cart
    .reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.qty) || 0;
      return sum + price * qty;
    }, 0)
    .toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto p-6 md:p-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Cart
        </motion.h2>
        {cart.length === 0 ? (
          <motion.div
            className="text-center text-gray-500 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Your cart is empty.{" "}
            <Link
              to="/shop"
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition"
              aria-label="Go to shop"
            >
              Start shopping!
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </AnimatePresence>
            <motion.div
              className="text-right mt-8 bg-white p-4 rounded-lg shadow-md border border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="text-xl md:text-2xl font-semibold text-gray-800">
                Total: <span className="text-indigo-600">₹{total}</span>
              </span>
              <Link
                to="/checkout"
                className="ml-6 inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold hover:from-indigo-600 hover:to-purple-600 transition"
                aria-label="Proceed to checkout"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Checkout
                </motion.span>
              </Link>
            </motion.div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;