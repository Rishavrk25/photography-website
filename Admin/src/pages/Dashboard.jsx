import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { adminAPI } from "../utils/api";
import {
  HiPhotograph,
  HiFilm,
  HiCalendar,
  HiStar,
  HiMail,
  HiClock,
  HiUserGroup,
  HiCurrencyDollar,
  HiTrendingUp,
  HiArrowRight,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAPI.getDashboard();
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError(err.message);
      // Fallback mock data
      setData({
        stats: {
          total_clients: 0,
          total_bookings: 0,
          pending_bookings: 0,
          confirmed_bookings: 0,
          total_inquiries: 0,
          pending_inquiries: 0,
          total_revenue: 0,
        },
        recent_bookings: [],
        recent_inquiries: [],
      });
    }
  };

  if (!data)
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );

  const mainStats = [
    {
      label: "Total Clients",
      value: data.stats.total_clients.toLocaleString(),
      growth: "+12%",
      icon: <HiUserGroup />,
      path: "/admin/clients",
    },
    {
      label: "Monthly Revenue",
      value: `₹${(data.stats.total_revenue / 100000).toFixed(1)}L`,
      growth: "+8%",
      icon: <HiCurrencyDollar />,
      path: "/admin/bookings",
    },
    {
      label: "Pending Events",
      value: data.stats.pending_bookings.toLocaleString(),
      growth: `+${Math.max(0, data.stats.pending_bookings - 3)}`,
      icon: <HiCalendar />,
      path: "/admin/bookings",
    },
    {
      label: "Total Bookings",
      value: data.stats.total_bookings.toLocaleString(),
      growth: "+24",
      icon: <HiPhotograph />,
      path: "/admin/gallery",
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-cream">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-soft/50 mt-1">
          Welcome back. Here is what's happening with your studio today.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {mainStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <Link
              to={stat.path}
              className="block glass rounded-2xl p-6 border border-white/5 hover:border-gold/30 transition-all hover:shadow-[0_8px_30px_rgba(212,175,55,0.05)] cursor-pointer h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gold group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                  <HiTrendingUp /> {stat.growth}
                </div>
              </div>
              <h3 className="text-3xl font-heading font-bold text-cream mb-1">
                {stat.value}
              </h3>
              <p className="text-xs font-medium text-gray-soft/50 uppercase tracking-wider">
                {stat.label}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Analytics Chart Placeholder & Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Chart Placeholder */}
          <div className="glass rounded-2xl border border-white/5 p-6 h-[340px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-heading text-lg font-semibold text-cream">
                  Revenue Analytics
                </h3>
                <p className="text-xs text-gray-soft/40">
                  Monthly performance overview
                </p>
              </div>
              <select className="bg-white/5 border border-white/10 rounded-lg text-xs px-3 py-1.5 text-gray-soft focus:outline-none focus:border-gold/30">
                <option>This Year</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="flex-1 flex items-end gap-2 sm:gap-4 pb-4">
              {/* Mock Bar Chart */}
              {[40, 60, 30, 80, 50, 90, 70, 85, 45, 65, 75, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col justify-end group h-full"
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="w-full bg-white/5 rounded-t-sm group-hover:bg-gold/40 relative transition-colors"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[10px] text-cream px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      ${h}k
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-gray-soft/40 uppercase tracking-widest font-medium border-t border-white/5 pt-3">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="glass rounded-2xl border border-white/5 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-lg font-semibold text-cream mb-4">
                Recent Bookings
              </h3>
              <Link
                to="/admin/bookings"
                className="text-xs text-gold hover:text-gold-light flex items-center gap-1 transition-colors"
              >
                View All <HiArrowRight />
              </Link>
            </div>
            <div className="space-y-4">
              {data.recent_bookings.length === 0 ? (
                <p className="text-gray-soft/40 text-sm italic">
                  No recent bookings found.
                </p>
              ) : (
                data.recent_bookings.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-soft/50 text-sm font-bold border border-white/10">
                        {b.client_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-cream text-sm font-medium">
                          {b.client_name}
                        </p>
                        <p className="text-gray-soft/40 text-xs flex items-center gap-2">
                          <span>
                            {b.package
                              ? b.package.toUpperCase()
                              : "Photography"}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span>
                            {new Date(b.event_date).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border ${
                        b.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          : b.status === "confirmed"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Events & Activity */}
        <div className="space-y-6">
          {/* Upcoming Events Timeline */}
          <div className="glass rounded-2xl border border-white/5 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[40px] rounded-full pointer-events-none" />
            <h3 className="font-heading text-lg font-semibold text-cream mb-6">
              Upcoming Events
            </h3>
            <div className="relative pl-4 space-y-6 before:absolute before:inset-y-2 before:left-[7px] before:w-px before:bg-gradient-to-b before:from-gold/30 before:to-transparent">
              {data.recent_bookings
                .filter((b) => new Date(b.event_date) > new Date())
                .slice(0, 3).length === 0 ? (
                <p className="text-gray-soft/40 text-xs italic">
                  No upcoming events scheduled.
                </p>
              ) : (
                data.recent_bookings
                  .filter((b) => new Date(b.event_date) > new Date())
                  .slice(0, 3)
                  .map((event, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[20px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                      <p className="text-sm font-medium text-cream">
                        {event.client_name} - {event.package.toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-soft/40 mt-1 flex items-center gap-1">
                        <HiClock />{" "}
                        {new Date(event.event_date).toLocaleDateString()}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="glass rounded-2xl border border-white/5 p-6">
            <h3 className="font-heading text-lg font-semibold text-cream mb-4">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="text-blue-400/80 bg-blue-400/10 p-2 rounded-lg">
                    <HiCalendar />
                  </div>
                  <span className="text-sm text-gray-soft/80">
                    Confirmed Bookings
                  </span>
                </div>
                <span className="text-cream font-bold">
                  {data.stats.confirmed_bookings}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="text-pink-400/80 bg-pink-400/10 p-2 rounded-lg">
                    <HiMail />
                  </div>
                  <span className="text-sm text-gray-soft/80">
                    New Inquiries
                  </span>
                </div>
                <span className="text-cream font-bold">
                  {data.stats.pending_inquiries}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
