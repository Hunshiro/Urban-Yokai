import React from "react";
import StatCard from "../components/StatCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductUploadForm from "../components/ProductUploadForm";
import ProductGrid from "../components/ProductGrid";
import CategoryCreateForm from "../components/CategoryCreateForm";
import SubcategoryCreateForm from "../components/SubcategoryCreateForm";

const stats = [
  { title: "Total Users", value: 1200, accent: "border-primary" },
  { title: "Orders Today", value: 56, accent: "border-accent" },
  { title: "Revenue", value: "₹1,25,000", accent: "border-secondary" },
  { title: "Products", value: 245, accent: "border-primary" },
  { title: "Pending Orders", value: 12, accent: "border-accent" },
  { title: "Monthly Growth", value: "+23%", accent: "border-secondary" },
];

const AdminPage = () => {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState("overview");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState("all");
  const [editingProduct, setEditingProduct] = React.useState(null);
  // Authentication removed; anyone can access admin page

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  };

  const fetchCategories = () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  };

  React.useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
        isActive
          ? "bg-primary text-white shadow-neonPink"
          : "bg-background text-text hover:bg-accent/20 hover:text-heading"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-4xl text-heading mb-2">
              Admin Dashboard
            </h1>
            <p className="text-text text-lg">
              Manage your store, products, and analytics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-xl">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-heading font-medium">System Online</span>
            </div>
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-neonPink hover:shadow-lg transition-all duration-300">
              Export Data
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 bg-accent/10 p-2 rounded-2xl w-fit">
          <TabButton
            id="overview"
            label="Overview"
            isActive={activeTab === "overview"}
            onClick={setActiveTab}
          />
          <TabButton
            id="categories"
            label="Categories"
            isActive={activeTab === "categories"}
            onClick={setActiveTab}
          />
          <TabButton
            id="subcategories"
            label="Subcategories"
            isActive={activeTab === "subcategories"}
            onClick={setActiveTab}
          />
          <TabButton
            id="products"
            label="Products"
            isActive={activeTab === "products"}
            onClick={setActiveTab}
          />
          <TabButton
            id="orders"
            label="Orders"
            isActive={activeTab === "orders"}
            onClick={setActiveTab}
          />
          <TabButton
            id="analytics"
            label="Analytics"
            isActive={activeTab === "analytics"}
            onClick={setActiveTab}
          />
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div>
              <h3 className="font-heading text-2xl text-heading mb-6">Key Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <StatCard key={stat.title} {...stat} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="font-heading text-2xl text-heading mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  onClick={() => setActiveTab("products")}
                  className="bg-gradient-to-br from-primary to-primary/80 text-white p-6 rounded-2xl shadow-neonPink hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📦</div>
                  <div className="font-heading text-lg">Add Product</div>
                  <div className="text-sm opacity-80">Upload new inventory</div>
                </button>
                
                <button 
                  onClick={() => setActiveTab("orders")}
                  className="bg-gradient-to-br from-accent to-accent/80 text-white p-6 rounded-2xl shadow-neonBlue hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📋</div>
                  <div className="font-heading text-lg">View Orders</div>
                  <div className="text-sm opacity-80">Manage customer orders</div>
                </button>
                
                <button className="bg-gradient-to-br from-secondary to-secondary/80 text-white p-6 rounded-2xl shadow-neonGreen hover:shadow-lg transition-all duration-300 group">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">👥</div>
                  <div className="font-heading text-lg">User Management</div>
                  <div className="text-sm opacity-80">Manage customers</div>
                </button>
                
                <button className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">⚙️</div>
                  <div className="font-heading text-lg">Settings</div>
                  <div className="text-sm opacity-80">Configure store</div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="font-heading text-2xl text-heading mb-6">Recent Activity</h3>
              <div className="bg-accent/10 rounded-2xl p-6 border border-accent/30">
                <div className="space-y-4">
                  {[
                    { action: "New order placed", user: "John Doe", time: "2 mins ago", type: "order" },
                    { action: "Product updated", user: "Admin", time: "15 mins ago", type: "product" },
                    { action: "User registered", user: "Jane Smith", time: "1 hour ago", type: "user" },
                    { action: "Payment received", user: "Mike Johnson", time: "2 hours ago", type: "payment" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-background rounded-xl border border-accent/20">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'order' ? 'bg-primary/20 text-primary' :
                          activity.type === 'product' ? 'bg-accent/20 text-accent' :
                          activity.type === 'user' ? 'bg-secondary/20 text-secondary' :
                          'bg-green-500/20 text-green-500'
                        }`}>
                          {activity.type === 'order' ? '📦' :
                           activity.type === 'product' ? '✏️' :
                           activity.type === 'user' ? '👤' : '💰'}
                        </div>
                        <div>
                          <div className="font-medium text-heading">{activity.action}</div>
                          <div className="text-sm text-text">by {activity.user}</div>
                        </div>
                      </div>
                      <div className="text-sm text-text">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl text-heading">Category Management</h3>
              <button className="bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-neonPink hover:shadow-lg transition-all">
                Add New Category
              </button>
            </div>

            <div className="bg-accent/10 rounded-2xl p-6 border border-accent/30">
              <CategoryCreateForm onCategoryCreated={fetchCategories} />
            </div>

            <div className="bg-accent/10 rounded-2xl p-6 border border-accent/30">
              <h4 className="font-heading text-xl text-heading mb-4">Existing Categories</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(category => (
                  <div key={category._id} className="bg-background rounded-xl p-4 border border-accent/20">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-heading">{category.name}</h5>
                      <div className="flex gap-2">
                        <button className="text-accent hover:text-accent/80 text-sm">Edit</button>
                        <button className="text-red-500 hover:text-red-400 text-sm">Delete</button>
                      </div>
                    </div>
                    <p className="text-sm text-text">{category.description}</p>
                    <div className="mt-4">
                      <h6 className="font-semibold text-heading mb-2">Subcategories:</h6>
                      <ul className="list-disc list-inside text-sm text-text">
                        {category.subcategories?.map(subcat => (
                          <li key={subcat._id}>{subcat.name}</li>
                        )) || <li>No subcategories</li>}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Subcategories Tab */}
        {activeTab === "subcategories" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl text-heading">Subcategory Management</h3>
              <button className="bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-neonPink hover:shadow-lg transition-all">
                Add New Subcategory
              </button>
            </div>

            <div className="bg-accent/10 rounded-2xl p-6 border border-accent/30">
              <SubcategoryCreateForm onSubcategoryCreated={fetchCategories} />
            </div>

            <div className="bg-accent/10 rounded-2xl p-6 border border-accent/30">
              <h4 className="font-heading text-xl text-heading mb-4">Existing Subcategories</h4>
              <div className="space-y-4">
                {categories.map(category => (
                  <div key={category._id} className="bg-background rounded-xl p-4 border border-accent/20">
                    <h5 className="font-medium text-heading mb-3">{category.name}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {category.subcategories?.map(subcategory => (
                        <div key={subcategory._id} className="bg-accent/10 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-heading">{subcategory.name}</span>
                            <div className="flex gap-2">
                              <button className="text-accent hover:text-accent/80 text-xs">Edit</button>
                              <button className="text-red-500 hover:text-red-400 text-xs">Delete</button>
                            </div>
                          </div>
                          <p className="text-xs text-text mt-1">{subcategory.description}</p>
                        </div>
                      )) || <p className="text-sm text-text">No subcategories yet</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-8">
            {/* Product Upload Section */}
            <div>
              <h3 className="font-heading text-2xl text-heading mb-6">Add New Product</h3>
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-background via-accent/30 to-secondary/20 rounded-3xl shadow-neonBlue border border-accent p-1 animate-fade-in-up">
                  <div className="bg-background bg-opacity-90 rounded-3xl p-8">
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center gap-6 mb-8">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold shadow-neonPink">1</span>
                        <span className="font-heading text-lg text-heading">Product Details</span>
                      </div>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-accent text-white font-bold shadow-neonBlue">2</span>
                        <span className="font-heading text-lg text-heading">Upload Images</span>
                      </div>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-secondary"></div>
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-white font-bold shadow-neonGreen">3</span>
                        <span className="font-heading text-lg text-heading">Final Review</span>
                      </div>
                    </div>
                    <ProductUploadForm onProductUploaded={fetchProducts} />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Management Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-2xl text-heading">Manage Products</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-accent/10 border border-accent/30 rounded-xl px-4 py-2 pl-10 text-heading placeholder-text focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text">🔍</div>
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-accent/10 border border-accent/30 rounded-xl px-4 py-2 text-heading focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="bg-accent/10 rounded-2xl p-6 border border-accent/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-heading font-medium">
                    {filteredProducts.length} Products {searchTerm && `matching "${searchTerm}"`}
                  </span>
                  <div className="flex gap-2">
                    <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium shadow-neonPink hover:shadow-lg transition-all">
                      Bulk Edit
                    </button>
                    <button className="bg-accent text-white px-4 py-2 rounded-xl text-sm font-medium shadow-neonBlue hover:shadow-lg transition-all">
                      Export CSV
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {filteredProducts.map(product => (
                    <div key={product._id || product.id} className="bg-white rounded-2xl shadow-md border border-[#e5e7eb] p-6 flex flex-col relative">
                      <img src={product.images?.[0] || product.image} alt={product.title} className="h-32 w-full object-contain rounded-xl mb-4 bg-[#f9fafb]" />
                      <h3 className="font-sans text-lg font-semibold text-[#111827] mb-1">{product.title}</h3>
                      <p className="text-[#4b5563] mb-1">{product.category?.name || product.category}</p>
                      <span className="text-[#2563eb] font-bold text-base mb-2">₹{product.price}</span>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {(product.tags || []).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-[#e5e7eb] text-[#4b5563] rounded-full text-xs font-medium">{tag}</span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <button
                          className="px-4 py-2 bg-[#2563eb] text-white rounded-xl text-sm font-medium hover:bg-[#1d4ed8] transition"
                          onClick={() => setEditingProduct(product)}
                        >Edit</button>
                        <button
                          className="px-4 py-2 bg-[#dc2626] text-white rounded-xl text-sm font-medium hover:bg-[#b91c1c] transition"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this product?")) {
                              fetch(`/api/products/${product._id || product.id}`, { method: "DELETE" })
                                .then(res => {
                                  if (!res.ok) throw new Error("Delete failed");
                                  fetchProducts();
                                })
                                .catch(err => alert("Error deleting product: " + err.message));
                            }
                          }}
                        >Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl text-heading">Order Management</h3>
              <div className="flex gap-3">
                <button className="bg-primary text-white px-4 py-2 rounded-xl font-medium shadow-neonPink hover:shadow-lg transition-all">
                  Export Orders
                </button>
                <button className="bg-accent text-white px-4 py-2 rounded-xl font-medium shadow-neonBlue hover:shadow-lg transition-all">
                  Print Labels
                </button>
              </div>
            </div>

            {/* Order Filters */}
            <div className="flex gap-4 bg-accent/10 p-4 rounded-2xl border border-accent/30">
              {["all", "pending", "processing", "shipped", "delivered"].map(status => (
                <button
                  key={status}
                  className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${
                    status === "all" ? "bg-primary text-white shadow-neonPink" : "text-text hover:bg-background"
                  }`}
                >
                  {status} Orders
                </button>
              ))}
            </div>

            {/* Orders Table */}
            <div className="bg-background rounded-2xl shadow-lg border border-accent/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-accent/20">
                    <tr>
                      <th className="text-left p-4 font-heading text-heading">Order ID</th>
                      <th className="text-left p-4 font-heading text-heading">Customer</th>
                      <th className="text-left p-4 font-heading text-heading">Status</th>
                      <th className="text-left p-4 font-heading text-heading">Total</th>
                      <th className="text-left p-4 font-heading text-heading">Date</th>
                      <th className="text-left p-4 font-heading text-heading">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "#ORD-001", customer: "John Doe", status: "pending", total: "₹2,500", date: "Today" },
                      { id: "#ORD-002", customer: "Jane Smith", status: "processing", total: "₹1,800", date: "Yesterday" },
                      { id: "#ORD-003", customer: "Mike Johnson", status: "shipped", total: "₹3,200", date: "2 days ago" },
                      { id: "#ORD-004", customer: "Sarah Wilson", status: "delivered", total: "₹950", date: "3 days ago" },
                    ].map((order, index) => (
                      <tr key={index} className="border-b border-accent/20 hover:bg-accent/5 transition-colors">
                        <td className="p-4 font-mono text-primary font-medium">{order.id}</td>
                        <td className="p-4 text-heading">{order.customer}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-heading">{order.total}</td>
                        <td className="p-4 text-text">{order.date}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button className="bg-accent/20 hover:bg-accent text-accent hover:text-white px-3 py-1 rounded-lg text-sm transition-all">
                              View
                            </button>
                            <button className="bg-primary/20 hover:bg-primary text-primary hover:text-white px-3 py-1 rounded-lg text-sm transition-all">
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            <h3 className="font-heading text-2xl text-heading">Analytics Dashboard</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sales Chart Placeholder */}
              <div className="bg-accent/10 rounded-2xl p-6 border border-accent/30">
                <h4 className="font-heading text-xl text-heading mb-4">Sales Overview</h4>
                <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">📊</div>
                    <div className="text-heading font-medium">Sales Chart</div>
                    <div className="text-text text-sm">Chart component would go here</div>
                  </div>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-accent/10 rounded-2xl p-6 border border-accent/30">
                <h4 className="font-heading text-xl text-heading mb-4">Top Selling Products</h4>
                <div className="space-y-3">
                  {[
                    { name: "Wireless Headphones", sales: 156, revenue: "₹45,600" },
                    { name: "Smart Watch", sales: 89, revenue: "₹32,100" },
                    { name: "Phone Case", sales: 234, revenue: "₹23,400" },
                    { name: "Laptop Stand", sales: 67, revenue: "₹20,100" },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-xl">
                      <div>
                        <div className="font-medium text-heading">{product.name}</div>
                        <div className="text-sm text-text">{product.sales} units sold</div>
                      </div>
                      <div className="font-medium text-primary">{product.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary/10 rounded-2xl p-6 border border-primary/30">
                <h4 className="font-heading text-lg text-heading mb-3">Conversion Rate</h4>
                <div className="text-3xl font-bold text-primary mb-2">3.2%</div>
                <div className="text-sm text-green-600">↗ +0.5% from last month</div>
              </div>
              
              <div className="bg-accent/10 rounded-2xl p-6 border border-accent/30">
                <h4 className="font-heading text-lg text-heading mb-3">Avg. Order Value</h4>
                <div className="text-3xl font-bold text-accent mb-2">₹2,150</div>
                <div className="text-sm text-green-600">↗ +₹200 from last month</div>
              </div>
              
              <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/30">
                <h4 className="font-heading text-lg text-heading mb-3">Customer Satisfaction</h4>
                <div className="text-3xl font-bold text-secondary mb-2">4.8★</div>
                <div className="text-sm text-green-600">↗ +0.2 from last month</div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;