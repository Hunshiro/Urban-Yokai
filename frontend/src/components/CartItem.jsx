import React from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item, onRemove }) => {
  const { addToCart, setCart } = useCart();

  const increment = () => {
    addToCart({ ...item, qty: 1 });
  };
  const decrement = () => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, qty: Math.max(1, cartItem.qty - 1) }
          : cartItem
      )
    );
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-background rounded-2xl shadow-soft mb-4">
      <img src={item.images?.[0] || item.image} alt={item.title} className="h-16 w-auto rounded-xl" />
      <div className="flex-1">
        <h4 className="font-heading text-lg text-heading">{item.title}</h4>
        <span className="text-primary font-bold">₹{item.price}</span>
        <span className="ml-4 text-text-muted flex items-center gap-2">
          Qty:
          <button onClick={decrement} className="px-2 py-1 bg-accent text-white rounded-full font-bold">-</button>
          <span className="px-2">{item.qty}</span>
          <button onClick={increment} className="px-2 py-1 bg-accent text-white rounded-full font-bold">+</button>
        </span>
      </div>
      <button onClick={() => onRemove(item.id)} className="text-accent font-bold">Remove</button>
    </div>
  );
};

export default CartItem;
