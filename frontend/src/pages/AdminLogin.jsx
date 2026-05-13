import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await login(form);
      localStorage.setItem('auth_token', data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-400 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-gold flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-gold" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-gradient-gold">Admin Login</h1>
          <p className="text-gray-soft/50 text-sm mt-2">Shubham Video Photography</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
          {error && (
            <div className="bg-red-deep/20 border border-red-deep/40 rounded-xl p-3 text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-gold/70 mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/40 transition-all"
              placeholder="admin@shubhamvideo.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gold/70 mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/40 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-primary font-semibold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
