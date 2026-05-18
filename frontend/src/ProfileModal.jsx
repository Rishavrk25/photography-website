import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Mail, Phone } from "lucide-react";
import { useAuth } from "./AuthContext";

export default function ProfileModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  // Generate initials from user name
  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  if (!user) return null;

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative"
    >
      {/* Profile Button */}
      <button className="bg-transparent border border-[#D4AF37] text-[#D4AF37] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-zinc-950 transition-all duration-300 flex items-center gap-2">
        <User size={16} />
        Profile
      </button>

      {/* Modal Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute top-full right-0 mt-3 w-96 bg-zinc-900 border border-[#D4AF37]/30 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md"
          >
            {/* Premium Header with Avatar */}
            <div className="relative bg-gradient-to-r from-[#D4AF37]/15 via-[#D4AF37]/10 to-transparent p-8 border-b border-[#D4AF37]/20">
              <div className="flex items-center gap-4">
                {/* Avatar Circle */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full flex items-center justify-center shadow-lg ring-2 ring-[#D4AF37]/30">
                    <span className="text-2xl font-bold text-zinc-950">
                      {getInitials(user.name)}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-zinc-900" />
                </motion.div>

                {/* User Name & Status */}
                <div className="flex-1">
                  <h3 className="font-playfair text-xl font-semibold text-white leading-tight">
                    {user.name || "User"}
                  </h3>
                  <p className="text-xs text-[#D4AF37] uppercase tracking-widest mt-1">
                    Active Member
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
              {/* Info Grid */}
              <div className="space-y-3">
                {/* Email */}
                {user.email && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800/80 transition-colors"
                  >
                    <Mail
                      size={16}
                      className="text-[#D4AF37] mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-widest text-zinc-500 mb-0.5">
                        Email
                      </p>
                      <p className="text-sm text-white break-words">
                        {user.email}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Phone */}
                {user.phone && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800/80 transition-colors"
                  >
                    <Phone
                      size={16}
                      className="text-[#D4AF37] mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-widest text-zinc-500 mb-0.5">
                        Phone
                      </p>
                      <p className="text-sm text-white">{user.phone}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4" />

              {/* Action Buttons */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full bg-red-950/30 hover:bg-red-900/40 border border-red-600/50 text-red-400 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider"
              >
                <LogOut size={14} />
                Logout
              </motion.button>
            </div>

            {/* Footer Accent */}
            <div className="h-1 bg-gradient-to-r from-[#D4AF37]/50 via-[#D4AF37]/20 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
