import { useState, useEffect } from 'react';
import { adminAPI } from '../../utils/api';
import { HiPhotograph, HiFilm, HiCalendar, HiStar, HiMail, HiClock } from 'react-icons/hi';

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    adminAPI.getDashboard().then(({ data }) => setData(data)).catch(console.error);
  }, []);

  if (!data) return <div className="text-gray-soft/60">Loading dashboard...</div>;

  const statCards = [
    { label: 'Gallery Images', value: data.stats.total_galleries, icon: <HiPhotograph />, color: 'text-blue-400' },
    { label: 'Videos', value: data.stats.total_videos, icon: <HiFilm />, color: 'text-purple-400' },
    { label: 'Total Bookings', value: data.stats.total_bookings, icon: <HiCalendar />, color: 'text-green-400' },
    { label: 'Pending Bookings', value: data.stats.pending_bookings, icon: <HiClock />, color: 'text-yellow-400' },
    { label: 'Testimonials', value: data.stats.total_testimonials, icon: <HiStar />, color: 'text-gold' },
    { label: 'Inquiries', value: data.stats.total_inquiries, icon: <HiMail />, color: 'text-pink-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-6 flex items-center gap-4 hover:border-gold/20 transition-colors">
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-2xl font-heading font-bold text-cream">{stat.value}</p>
              <p className="text-xs text-gray-soft/50 uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="glass rounded-xl p-6">
          <h3 className="font-heading text-lg font-semibold text-cream mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {data.recent_bookings.length === 0 ? (
              <p className="text-gray-soft/40 text-sm">No bookings yet</p>
            ) : data.recent_bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b border-gold/5 last:border-0">
                <div>
                  <p className="text-cream text-sm">{b.client_name}</p>
                  <p className="text-gray-soft/40 text-xs">{b.event_type || 'N/A'} • {b.event_date || 'TBD'}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${b.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : b.status === 'confirmed' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="glass rounded-xl p-6">
          <h3 className="font-heading text-lg font-semibold text-cream mb-4">Recent Inquiries</h3>
          <div className="space-y-3">
            {data.recent_inquiries.length === 0 ? (
              <p className="text-gray-soft/40 text-sm">No inquiries yet</p>
            ) : data.recent_inquiries.map((c) => (
              <div key={c.id} className="py-2 border-b border-gold/5 last:border-0">
                <div className="flex items-center justify-between">
                  <p className="text-cream text-sm">{c.name}</p>
                  <p className="text-gray-soft/40 text-xs">{new Date(c.created_at).toLocaleDateString()}</p>
                </div>
                <p className="text-gray-soft/50 text-xs mt-1 truncate">{c.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
