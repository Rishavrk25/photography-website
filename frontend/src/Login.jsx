import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Poppins:wght@300;400;500;600&display=swap');
  
  :root {
    --color-bg: #09090b;
    --color-surface: #18181b;
    --color-gold: #D4AF37;
    --color-white: #fafafa;
  }
  
  body {
    background-color: var(--color-bg);
    color: var(--color-white);
    font-family: 'Poppins', sans-serif;
  }

  .font-playfair {
    font-family: 'Playfair Display', serif;
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.access_token, data.user);
        navigate("/"); // Redirect to home on success
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Connection to server failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row">
        {/* Left Side: Editorial Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200"
            alt="Wedding Editorial"
            className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/20 to-zinc-950" />
          <Link
            to="/"
            className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors flex items-center group"
          >
            <ArrowLeft
              size={16}
              className="mr-2 transform group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-xs uppercase tracking-[0.2em]">
              Back to Home
            </span>
          </Link>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md relative z-10"
          >
            <div className="mb-12">
              <h1 className="font-playfair text-4xl mb-4">Welcome Back</h1>
              <p className="text-zinc-400 font-light text-sm">
                Sign in to access your private galleries and studio concierge.
              </p>
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full px-0 py-3 text-sm text-white bg-transparent border-0 border-b border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer transition-colors"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-xs text-zinc-500 uppercase tracking-[0.1em] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#D4AF37] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email Address
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full px-0 py-3 text-sm text-white bg-transparent border-0 border-b border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer transition-colors"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-xs text-zinc-500 uppercase tracking-[0.1em] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#D4AF37] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-xs text-zinc-400 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mr-2 appearance-none w-3 h-3 border border-zinc-600 checked:bg-[#D4AF37] checked:border-[#D4AF37] transition-colors"
                  />
                  <span className="group-hover:text-white transition-colors">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-xs text-[#D4AF37] hover:text-white transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="group bg-white text-zinc-950 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors w-full flex items-center justify-center mt-8 disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}{" "}
                <ArrowRight
                  size={14}
                  className="ml-3 transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            <div className="mt-12 text-center border-t border-zinc-800 pt-8">
              <p className="text-xs text-zinc-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-white hover:text-[#D4AF37] transition-colors ml-2 uppercase tracking-[0.1em]"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile Back Button */}
        <div className="md:hidden absolute top-6 left-6 z-20">
          <Link
            to="/"
            className="text-white/50 hover:text-white transition-colors p-2 bg-zinc-900/50 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft size={20} />
          </Link>
        </div>
      </div>
    </>
  );
}
