import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter an email");
      return;
    }
    setError("");
    setShowOtp(true);
    // TODO: call backend to send OTP
  };

  // Step 2: Verify OTP & create account
  const verifyOtpAndSignup = async (e) => {
    e.preventDefault();
    if (!otp || !password) {
      setError("Please enter OTP and password");
      return;
    }
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch {
      setError("Signup failed, try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-accent to-secondary">
      <motion.div
        className="bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-8 border border-white/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <span className="material-icons text-yellow-300 text-5xl">
            person_add
          </span>
          <h2 className="font-heading text-3xl text-white">Create Account</h2>
          <p className="text-white/70 text-center text-sm">
            Sign up to start shopping and managing your orders
          </p>
        </div>

        {/* Animate between forms */}
        <AnimatePresence mode="wait">
          {!showOtp ? (
            <motion.form
              key="signup-form"
              className="flex flex-col gap-6"
              onSubmit={handleSignup}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              {error && (
                <div className="bg-red-500/20 text-red-700 text-center font-bold py-2 px-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="flex items-center gap-3 bg-white/20 px-4 py-3 rounded-xl border border-white/30 focus-within:border-yellow-300 transition">
                <span className="material-icons text-white">email</span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white placeholder-white/60 text-lg"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-400 via-accent to-secondary text-white rounded-xl font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2"
              >
                <span className="material-icons">arrow_forward</span> Send OTP
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="otp-form"
              className="flex flex-col gap-6"
              onSubmit={verifyOtpAndSignup}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {error && (
                <div className="bg-red-500/20 text-red-700 text-center font-bold py-2 px-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* OTP */}
              <div className="flex items-center gap-3 bg-white/20 px-4 py-3 rounded-xl border border-white/30 focus-within:border-yellow-300 transition">
                <span className="material-icons text-white">sms</span>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white placeholder-white/60 text-lg"
                  maxLength={6}
                  required
                />
              </div>

              {/* Password */}
              <div className="flex items-center gap-3 bg-white/20 px-4 py-3 rounded-xl border border-white/30 focus-within:border-yellow-300 transition">
                <span className="material-icons text-white">lock</span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white placeholder-white/60 text-lg"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-400 via-accent to-secondary text-white rounded-xl font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2"
              >
                <span className="material-icons">sms</span> Verify OTP & Sign Up
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="text-center text-white/80 mt-6 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-yellow-300 font-bold hover:underline transition"
          >
            Login
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;











