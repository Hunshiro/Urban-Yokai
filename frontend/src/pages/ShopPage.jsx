
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductModal from "../components/ProductModal";

const ShopPage = ({ showToast }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories")
        ]);
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory ||
        (product.category?._id === selectedCategory || product.category === selectedCategory);
      const matchesSubcategory = !selectedSubcategory ||
        (product.subcategory?._id === selectedSubcategory || product.subcategory === selectedSubcategory);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.title.localeCompare(b.title);
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchTerm("");
    setPriceRange([0, 10000]);
    setSortBy("name");
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategory) return "All Products";
    const category = categories.find(c => c._id === selectedCategory);
    return category?.name || "Category";
  };

  const getSelectedSubcategoryName = () => {
    if (!selectedCategory || !selectedSubcategory) return "";
    const category = categories.find(c => c._id === selectedCategory);
    const subcategory = category?.subcategories?.find(s => s._id === selectedSubcategory);
    return subcategory?.name || "";
  };

  const ProductCard = ({ product }) => (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-100"
      onClick={() => setSelectedProduct(product)}
    >
      {/* Image Container */}
      <div className="relative h-64 bg-gray-50 overflow-hidden">
        <img
          src={product.images?.[0] || product.image || "/placeholder.jpg"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <button
            className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ ...product, qty: 1 });
              showToast && showToast(`${product.title} added to cart!`);
            }}
          >
            <span className="text-lg">🛒</span>
          </button>
        </div>
        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {product.tags.slice(0, 2).map((tag, idx) => {
              const colors = [
                'bg-gradient-to-r from-blue-600 to-purple-600',
                'bg-gradient-to-r from-purple-600 to-pink-600',
                'bg-gradient-to-r from-pink-600 to-red-600',
                'bg-gradient-to-r from-green-600 to-blue-600',
                'bg-gradient-to-r from-yellow-600 to-orange-600'
              ];
              return (
                <span
                  key={idx}
                  className={`px-3 py-1 ${colors[idx % colors.length]} text-white text-xs rounded-full font-semibold shadow-lg border border-white/30 backdrop-blur-sm`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category?.name || product.category}
          </span>
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {"★".repeat(4)}
              <span className="text-gray-300">★</span>
            </div>
            <span className="text-sm text-gray-600">(4.2)</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 text-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-purple-900 via-pink-700 to-indigo-800 bg-clip-text text-transparent">
              Discover Amazing Products
            </h1>
            <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-700 leading-relaxed">
              Shop from our curated collection of premium products with unbeatable quality and style
            </p>
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-purple-400 text-xl">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search for amazing products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-purple-200 bg-white/95 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-300/50 text-lg shadow-xl transition-all duration-300"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
            <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-600">
              <span>🎌 Premium Quality</span>
              <span>🚀 Fast Shipping</span>
              <span>🛡️ Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition ${
                  !selectedCategory ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <div key={category._id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(category._id);
                      setSelectedSubcategory(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedCategory === category._id ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                  {selectedCategory === category._id && category.subcategories?.length > 0 && (
                    <div className="ml-4 mt-2 space-y-1">
                      {category.subcategories.map((sub) => (
                        <button
                          key={sub._id}
                          onClick={() => setSelectedSubcategory(sub._id)}
                          className={`w-full text-left px-3 py-1 text-sm rounded transition ${
                            selectedSubcategory === sub._id ? 'bg-accent text-white' : 'hover:bg-gray-100 text-gray-600'
                          }`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Price Filter */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-semibold mb-4 text-gray-900">Price Range</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Min: ₹{priceRange[0]}</label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Max: ₹{priceRange[1]}</label>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                }}
                className="hover:text-primary transition"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-gray-900 font-medium">{getSelectedCategoryName()}</span>
              {getSelectedSubcategoryName() && (
                <>
                  <span>/</span>
                  <span className="text-gray-900 font-medium">{getSelectedSubcategoryName()}</span>
                </>
              )}
            </nav>
          </div>

          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow border"
            >
              <span>Filters</span>
              <span className={`transform transition ${showFilters ? 'rotate-180' : ''}`}>▼</span>
            </button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => {
                      setSelectedCategory(category._id);
                      setSelectedSubcategory(null);
                      setShowFilters(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm transition ${
                      selectedCategory === category._id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {getSelectedCategoryName()}
                {getSelectedSubcategoryName() && ` - ${getSelectedSubcategoryName()}`}
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>

              {(selectedCategory || selectedSubcategory || searchTerm || priceRange[0] > 0 || priceRange[1] < 10000) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        addToCart={addToCart}
        showToast={showToast}
      />

      <Footer />
    </div>
  );
};

export default ShopPage;
