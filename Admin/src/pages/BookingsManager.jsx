import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { adminAPI } from "../utils/api";
import {
  HiCalendar,
  HiTrash,
  HiPencil,
  HiCheck,
  HiX,
  HiArrowRight,
} from "react-icons/hi";

export default function BookingsManager() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, confirmed, cancelled

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getBookings();
      // Laravel paginate() returns the array inside response.data.data.data
      const bookingsData = response.data.data.data || response.data.data || [];
      setBookings(bookingsData);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setError(err.message || "Failed to load bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await adminAPI.updateBookingStatus(bookingId, newStatus);
      setBookings(
        bookings.map((b) =>
          b.id === bookingId ? { ...b, status: newStatus } : b,
        ),
      );
      setEditingId(null);
      setEditingStatus(null);
    } catch (err) {
      console.error("Failed to update booking status:", err);
      setError("Failed to update booking status");
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;
    try {
      await adminAPI.deleteBooking(bookingId);
      setBookings(bookings.filter((b) => b.id !== bookingId));
    } catch (err) {
      console.error("Failed to delete booking:", err);
      setError("Failed to delete booking");
    }
  };

  const filteredBookings =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold text-cream flex items-center gap-2">
          <HiCalendar className="text-gold" /> Bookings Management
        </h1>
        <p className="text-sm text-gray-soft/60 mt-1">
          Manage all upcoming photography and videography events.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {["all", "pending", "confirmed", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === status
                ? "bg-gold text-black"
                : "bg-white/5 text-cream hover:bg-white/10 border border-white/10"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {error && (
        <div className="glass rounded-2xl p-4 border border-red-500/30 bg-red-500/5">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center border border-white/5">
          <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-4" />
          <p className="text-gray-soft/60">Loading bookings...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center border border-white/5">
          <h3 className="text-xl font-bold text-cream mb-2">
            No {filter !== "all" ? filter : ""} bookings found
          </h3>
          <p className="text-gray-soft/60 max-w-md">
            {filter === "all"
              ? "There are no bookings yet. Clients can make bookings through the website."
              : `No ${filter} bookings at this time.`}
          </p>
        </div>
      ) : (
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/5 bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-soft/60 uppercase">
                    Client Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-soft/60 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-soft/60 uppercase">
                    Package
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-soft/60 uppercase">
                    Event Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-soft/60 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-soft/60 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-soft/60 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, idx) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-cream font-medium">{booking.names}</p>
                      <p className="text-xs text-gray-soft/40">
                        ID: {booking.id}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-soft text-sm">
                      {booking.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium uppercase">
                        {booking.package}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-soft text-sm">
                      {new Date(booking.event_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-cream font-semibold">
                      ₹{(booking.price / 1000).toFixed(0)}k
                    </td>
                    <td className="px-6 py-4">
                      {editingId === booking.id ? (
                        <select
                          value={editingStatus}
                          onChange={(e) => setEditingStatus(e.target.value)}
                          className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-cream focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${
                            booking.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : booking.status === "confirmed"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-gray-500/10 text-gray-400"
                          }`}
                        >
                          {booking.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === booking.id ? (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(booking.id, editingStatus)
                              }
                              className="text-green-400 hover:text-green-300 transition-colors p-2"
                              title="Save"
                            >
                              <HiCheck size={16} />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-red-400 hover:text-red-300 transition-colors p-2"
                              title="Cancel"
                            >
                              <HiX size={16} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditingId(booking.id);
                                setEditingStatus(booking.status);
                              }}
                              className="text-gold hover:text-gold-light transition-colors p-2"
                              title="Edit Status"
                            >
                              <HiPencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(booking.id)}
                              className="text-red-400 hover:text-red-300 transition-colors p-2"
                              title="Delete"
                            >
                              <HiTrash size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
