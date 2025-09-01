import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load from localStorage initially
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Ensure product has a unique id (handle MongoDB _id)
      const productId = product.id || product._id;
      if (!productId) return prevCart;
      const addQty = product.qty && product.qty > 0 ? product.qty : 1;
      let found = false;
      const updatedCart = prevCart.map((item) => {
        if (item.id === productId) {
          found = true;
          return { ...item, qty: item.qty + addQty };
        }
        return item;
      });
      if (!found) {
        return [...prevCart, { ...product, id: productId, qty: addQty }];
      }
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);