import React, { useState } from "react";

const ProductUploadForm = ({ onProductUploaded }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    tags: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setForm((prev) => ({
        ...prev,
        images: files,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "images") {
        for (let i = 0; i < value.length; i++) {
          data.append("images", value[i]);
        }
      } else if (key === "tags") {
        data.append("tags", value);
      } else {
        data.append(key, value);
      }
    });
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error("Upload failed");
      const product = await res.json();
  setForm({ title: "", description: "", price: "", category: "", stock: "", tags: "", images: [] });
      if (onProductUploaded) onProductUploaded(product);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bg-background bg-opacity-80 backdrop-blur-xl rounded-3xl shadow-glass p-8 mb-8 max-w-lg mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">
      <h3 className="font-heading text-2xl text-heading mb-6">Upload New Product</h3>
  <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full mb-4 px-4 py-2 rounded-3xl border border-secondary bg-background text-text-base" required />
  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full mb-4 px-4 py-2 rounded-3xl border border-secondary bg-background text-text-base" required />
  <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="w-full mb-4 px-4 py-2 rounded-3xl border border-secondary bg-background text-text-base" required />
  <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full mb-4 px-4 py-2 rounded-3xl border border-secondary bg-background text-text-base" required />
  <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" className="w-full mb-4 px-4 py-2 rounded-3xl border border-secondary bg-background text-text-base" required />
  <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full mb-4 px-4 py-2 rounded-3xl border border-accent bg-background text-text-base" />
  <input name="images" type="file" accept="image/*" multiple onChange={handleChange} className="w-full mb-6 px-4 py-2 rounded-3xl border border-secondary bg-background text-text-base" required />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button type="submit" className="w-full px-6 py-3 bg-primary text-heading rounded-3xl font-bold hover:bg-accent transition" disabled={loading}>{loading ? "Uploading..." : "Upload Product"}</button>
    </form>
  );
};

export default ProductUploadForm;
