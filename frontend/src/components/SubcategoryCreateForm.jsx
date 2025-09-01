import React, { useState, useEffect } from "react";

const SubcategoryCreateForm = ({ onSubcategoryCreated }) => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/categories/${categoryId}/subcategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to create subcategory");

      const subcategory = await res.json();
      setName("");
      setCategoryId("");
      if (onSubcategoryCreated) onSubcategoryCreated(subcategory);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-background bg-opacity-80 backdrop-blur-xl rounded-3xl shadow-glass p-8 mb-8 max-w-lg mx-auto"
      onSubmit={handleSubmit}
    >
      <h3 className="font-heading text-2xl text-heading mb-6">Create New Subcategory</h3>
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded-3xl border border-secondary bg-background text-text-base"
        required
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Subcategory Name"
        className="w-full mb-4 px-4 py-2 rounded-3xl border border-secondary bg-background text-text-base"
        required
      />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-primary text-heading rounded-3xl font-bold hover:bg-accent transition"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Subcategory"}
      </button>
    </form>
  );
};

export default SubcategoryCreateForm;
