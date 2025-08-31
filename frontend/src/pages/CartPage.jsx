import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-8">
        <h2 className="font-heading text-3xl text-heading mb-6">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-text-muted">Your cart is empty.</div>
        ) : (
          <div>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} onRemove={removeFromCart} />
            ))}
            <div className="text-right mt-6">
              <span className="font-heading text-xl text-primary">
                Total: ₹{total}
              </span>
              <Link
                to="/checkout"
                className="ml-6 px-6 py-2 bg-accent text-heading rounded-2xl font-bold hover:bg-primary transition"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
