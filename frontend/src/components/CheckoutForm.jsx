import React, { useState } from "react";

const CheckoutForm = () => {
  const [form, setForm] = useState({ name: "", email: "", address: "", payment: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Integrate payment API here
    alert("Order placed!");
  };

  return (
    <form className="max-w-lg mx-auto bg-background rounded-2xl shadow-soft p-8" onSubmit={handleSubmit}>
      <h3 className="font-heading text-2xl text-heading mb-6">Checkout</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full mb-4 px-4 py-2 rounded-2xl border border-secondary bg-background text-text-base" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full mb-4 px-4 py-2 rounded-2xl border border-secondary bg-background text-text-base" required />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full mb-4 px-4 py-2 rounded-2xl border border-secondary bg-background text-text-base" required />
      <select name="payment" value={form.payment} onChange={handleChange} className="w-full mb-6 px-4 py-2 rounded-2xl border border-secondary bg-background text-text-base" required>
        <option value="">Select Payment</option>
        <option value="razorpay">Razorpay</option>
        <option value="stripe">Stripe</option>
      </select>
      <button type="submit" className="w-full px-6 py-3 bg-primary text-heading rounded-2xl font-bold hover:bg-accent transition">Pay & Place Order</button>
    </form>
  );
};

export default CheckoutForm;
