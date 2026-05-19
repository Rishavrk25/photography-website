import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HiHome, HiPhotograph, HiFilm, HiCalendar, HiStar, HiCurrencyDollar, HiMail, HiLogout, HiMenuAlt2, HiX } from 'react-icons/hi';
import { getUser, logout } from '../utils/api';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: <HiHome /> },
  { name: 'Gallery', path: '/admin/gallery', icon: <HiPhotograph /> },
  { name: 'Videos', path: '/admin/videos', icon: <HiFilm /> },
  { name: 'Bookings', path: '/admin/bookings', icon: <HiCalendar /> },
  { name: 'Testimonials', path: '/admin/testimonials', icon: <HiStar /> },
  { name: 'Packages', path: '/admin/packages', icon: <HiCurrencyDollar /> },
  { name: 'Inquiries', path: '/admin/contacts', icon: <HiMail /> },
];

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) { navigate('/admin/login'); return; }
    getUser().then(({ data }) => setUser(data)).catch(() => { localStorage.removeItem('auth_token'); navigate('/admin/login'); });
  }, [navigate]);

  const handleLogout = async () => {
    try { await logout(); } catch { }
    localStorage.removeItem('auth_token');
    navigate('/admin/login');
  };

  if (!user) return <div className="min-h-screen bg-dark-400 flex items-center justify-center"><div className="text-gold">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-dark-400 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-300 border-r border-gold/10 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gold/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-gold flex items-center justify-center"><div className="w-3 h-3 rounded-full bg-gold" /></div>
            <div>
              <p className="font-heading text-sm font-bold text-gradient-gold">Shubham</p>
              <p className="text-[0.5rem] uppercase tracking-[0.2em] text-gray-soft/40">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${location.pathname === item.path ? 'bg-gold/10 text-gold border border-gold/20' : 'text-gray-soft/60 hover:text-cream hover:bg-white/5'
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gold/10">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-deep/10 transition-all cursor-pointer">
            <HiLogout className="text-lg" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 min-h-screen">
        <header className="sticky top-0 z-30 bg-dark-400/90 backdrop-blur-xl border-b border-gold/10 px-4 lg:px-8 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-cream p-2"><HiMenuAlt2 size={22} /></button>
          <h2 className="font-heading text-lg font-semibold text-cream">{navItems.find(i => i.path === location.pathname)?.name || 'Admin'}</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-soft/60">{user.name}</span>
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">{user.name[0]}</div>
          </div>
        </header>
        <main className="p-4 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
