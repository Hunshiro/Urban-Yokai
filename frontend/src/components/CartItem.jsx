import React from "react";

const CartItem = ({ item, onRemove }) => (
  <div className="flex items-center gap-4 p-4 bg-background rounded-2xl shadow-soft mb-4">
    <img src={item.images?.[0] || item.image} alt={item.title} className="h-16 w-auto rounded-xl" />
    <div className="flex-1">
      <h4 className="font-heading text-lg text-heading">{item.title}</h4>
      <span className="text-primary font-bold">₹{item.price}</span>
      <span className="ml-4 text-text-muted">Qty: {item.qty}</span>
    </div>
    <button onClick={() => onRemove(item.id)} className="text-accent font-bold">Remove</button>
  </div>
);

export default CartItem;
