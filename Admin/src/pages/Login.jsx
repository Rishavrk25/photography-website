import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Always clear existing session when landing on the login page to guarantee the form is shown
    localStorage.removeItem('auth_token');
    localStorage.removeItem('is_admin');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login({ email, password });
      
      // Enforce that only the admin user account from the database is allowed entry
      if (response.data.user.email !== 'admin@shubhamvideo.com') {
        setError('Unauthorized access. Only the designated administrator can log in.');
        setLoading(false);
        return;
      }

      localStorage.setItem('auth_token', response.data.access_token);
      localStorage.setItem('is_admin', 'true');
      navigate('/admin');
    } catch (err) {
      if (err.message === 'Network Error') {
        setError('Cannot connect to Laravel backend. Is php artisan serve running?');
      } else {
        setError('Invalid email or password.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-gold/5 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-md glass p-8 rounded-3xl relative z-10 border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gold-dark to-gold-light p-0.5 shadow-[0_0_25px_rgba(212,175,55,0.4)] mb-6">
            <div className="w-full h-full bg-[#111] rounded-[14px] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-gold" />
            </div>
          </div>
          <h1 className="text-2xl font-heading font-bold text-cream">Admin Portal</h1>
          <p className="text-sm text-gray-soft/50 mt-2">Sign in to manage your studio</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium">{error}</div>}
          <div>
            <label className="block text-xs font-medium text-gray-soft/70 uppercase tracking-widest mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111]/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream focus:border-gold/50 focus:outline-none focus:bg-[#1a1a1a]/80 transition-all"
              placeholder="admin@studio.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-soft/70 uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111]/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream focus:border-gold/50 focus:outline-none focus:bg-[#1a1a1a]/80 transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-gold-dark to-gold text-[#111] font-bold py-3.5 rounded-xl mt-4 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? <div className="w-5 h-5 border-2 border-[#111]/20 border-t-[#111] rounded-full animate-spin" /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
