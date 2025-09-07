import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      const result = await login(email, password);
      if (result.success) {
        navigate("/admin");
      } else {
        setError(result.error || "Login failed");
      }
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl w-full max-w-lg p-10 flex flex-col gap-8 transform transition-all hover:scale-105">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl opacity-50 -z-10"></div>

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-white/90 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2m4 0c0-1.104-.896-2-2-2s-2 .896-2 2m4 0c0 1.104.896 2 2 2s2-.896 2-2m-4 0c0 1.104.896 2 2 2s2-.896 2-2m-4 4v4m-8-4h16m-5-12h-6a2 2 0 00-2 2v2h10V5a2 2 0 00-2-2z"></path>
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Admin Portal</h2>
          <p className="text-white/60 mt-2 text-lg">Secure access to your dashboard</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl p-3 text-center text-sm font-medium animate-pulse">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-5 h-5 text-white/60 group-focus-within:text-purple-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12l-4-4m0 0l-4 4m4-4v12"></path>
              </svg>
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-5 h-5 text-white/60 group-focus-within:text-purple-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2m4 0c0-1.104-.896-2-2-2s-2 .896-2 2m4 0c0 1.104.896 2 2 2s2-.896 2-2m-4 0c0 1.104.896 2 2 2s2-.896 2-2m-4 4v4"></path>
              </svg>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <a href="/" className="text-white/60 hover:text-white font-medium transition-all duration-300 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Store
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;