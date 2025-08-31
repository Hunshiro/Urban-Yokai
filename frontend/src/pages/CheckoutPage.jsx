import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutForm from "../components/CheckoutForm";

const CheckoutPage = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-8">
        <h2 className="font-heading text-3xl text-heading mb-6">Checkout</h2>
        <CheckoutForm />
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
