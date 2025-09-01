import React, { useState } from "react";

const CategoryCreateForm = ({ onCategoryCreated }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to create category");

      const category = await res.json();
      setName("");
      if (onCategoryCreated) onCategoryCreated(category);
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
      <h3 className="font-heading text-2xl text-heading mb-6">Create New Category</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
        className="w-full mb-4 px-4 py-2 rounded-3xl border border-secondary bg-background text-text-base"
        required
      />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-primary text-heading rounded-3xl font-bold hover:bg-accent transition"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Category"}
      </button>
    </form>
  );
};

export default CategoryCreateForm;
