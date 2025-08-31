
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { CartProvider } from "./context/CartContext";
import { Navigate, useLocation } from "react-router-dom";
import React, { useState } from "react";

// function RequireAuth({ children }) {
//   const location = useLocation();
//   const isUser = localStorage.getItem("isUser");
//   if (!isUser) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//   return children;
// }

function App() {
  const [toast, setToast] = React.useState("");
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast("") , 2000);
  };
  return (
    <CartProvider>
      <Router>
        {toast && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg z-[9999] font-bold text-lg animate-fade-in-up">
            {toast}
          </div>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage showToast={showToast} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
