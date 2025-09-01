import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          navigate("/");
        } else {
          setError(data.error || "Login failed");
        }
      } catch {
        setError("Login failed");
      }
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-accent to-secondary">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-8 border border-accent/30">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <span className="material-icons text-primary text-5xl">login</span>
          <h2 className="font-heading text-3xl text-primary">Welcome Back</h2>
          <p className="text-text-muted text-center">
            Login with Email/Password or Mobile/OTP
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          {error && (
            <div className="text-red-500 text-center font-bold">{error}</div>
          )}
          <div className="flex items-center gap-3 bg-accent/10 px-4 py-3 rounded-xl border border-accent/30">
            <span className="material-icons text-accent">email</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-heading text-lg"
              required
            />
          </div>
          <div className="flex items-center gap-3 bg-accent/10 px-4 py-3 rounded-xl border border-accent/30">
            <span className="material-icons text-accent">lock</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-heading text-lg"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-xl font-bold text-lg shadow-neonPink hover:bg-accent transition flex items-center justify-center gap-2">
            <span className="material-icons">login</span> Login
          </button>
        </form>

        {/* Google Login */}
        <div className="flex items-center gap-4 my-4">
          <hr className="flex-1 border-accent/30" />
          <span className="text-text-muted">or</span>
          <hr className="flex-1 border-accent/30" />
        </div>
        <a
          href="/api/auth/google"
          className="w-full py-3 bg-blue-500 text-white rounded-xl font-bold text-lg shadow hover:bg-blue-600 transition flex items-center justify-center gap-2"
        >
          <span className="material-icons">account_circle</span> Login with Google
        </a>

        {/* Footer */}
        <div className="text-center text-text-muted mt-2">
          Don’t have an account?{" "}
          <a href="/signup" className="text-primary font-bold">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
