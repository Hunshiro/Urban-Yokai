import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import { useCart } from "../context/CartContext";   // ✅ import

const ShopPage = ({ showToast }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();  // ✅ get addToCart from context

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-8">
        <h2 className="font-heading text-3xl text-heading mb-6">All Products</h2>
        <ProductGrid products={products} onProductClick={setSelectedProduct} />
        
        {/* ✅ Pass addToCart + showToast into modal */}
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          addToCart={addToCart} 
          showToast={showToast} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
