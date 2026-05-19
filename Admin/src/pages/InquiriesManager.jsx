import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { adminAPI } from "../utils/api";
import {
  HiMail,
  HiTrash,
  HiPencil,
  HiCheck,
  HiX,
  HiEye,
} from "react-icons/hi";

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, contacted, completed

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getInquiries();
      // Laravel paginate() returns the array inside response.data.data.data
      const inquiriesData = response.data.data.data || response.data.data || [];
      setInquiries(inquiriesData);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
      setError(err.message || "Failed to load inquiries");
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (inquiryId, newStatus) => {
    try {
      await adminAPI.updateInquiryStatus(inquiryId, newStatus);
      setInquiries(
        inquiries.map((i) =>
          i.id === inquiryId ? { ...i, status: newStatus } : i,
        ),
      );
      setEditingId(null);
      setEditingStatus(null);
    } catch (err) {
      console.error("Failed to update inquiry status:", err);
      setError("Failed to update inquiry status");
    }
  };

  const handleDelete = async (inquiryId) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?"))
      return;
    try {
      await adminAPI.deleteInquiry(inquiryId);
      setInquiries(inquiries.filter((i) => i.id !== inquiryId));
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
      setError("Failed to delete inquiry");
    }
  };

  const filteredInquiries =
    filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold text-cream flex items-center gap-2">
          <HiMail className="text-gold" /> Inquiries Management
        </h1>
        <p className="text-sm text-gray-soft/60 mt-1">
          Manage all client inquiries and follow up on potential bookings.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {["all", "pending", "contacted", "completed"].map((status) => (
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
          <p className="text-gray-soft/60">Loading inquiries...</p>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center border border-white/5">
          <h3 className="text-xl font-bold text-cream mb-2">
            No {filter !== "all" ? filter : ""} inquiries found
          </h3>
          <p className="text-gray-soft/60 max-w-md">
            {filter === "all"
              ? "There are no inquiries yet. Clients can submit inquiries through the website contact form."
              : `No ${filter} inquiries at this time.`}
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
                    Event Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-soft/60 uppercase">
                    Event Date
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
                {filteredInquiries.map((inquiry, idx) => (
                  <motion.tr
                    key={inquiry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-cream font-medium">{inquiry.names}</p>
                      <p className="text-xs text-gray-soft/40">
                        ID: {inquiry.id}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-soft text-sm">
                      {inquiry.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium uppercase">
                        {inquiry.event_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-soft text-sm">
                      {new Date(inquiry.event_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === inquiry.id ? (
                        <select
                          value={editingStatus}
                          onChange={(e) => setEditingStatus(e.target.value)}
                          className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-cream focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="completed">Completed</option>
                        </select>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${
                            inquiry.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : inquiry.status === "contacted"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-green-500/10 text-green-500"
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === inquiry.id ? (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(inquiry.id, editingStatus)
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
                              onClick={() => setSelectedInquiry(inquiry)}
                              className="text-blue-400 hover:text-blue-300 transition-colors p-2"
                              title="View Details"
                            >
                              <HiEye size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(inquiry.id);
                                setEditingStatus(inquiry.status);
                              }}
                              className="text-gold hover:text-gold-light transition-colors p-2"
                              title="Edit Status"
                            >
                              <HiPencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(inquiry.id)}
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

      {/* Detail Modal */}
      {selectedInquiry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedInquiry(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="glass rounded-2xl p-8 max-w-md w-full border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-heading font-bold text-cream mb-6">
              Inquiry Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-soft/60 text-xs uppercase">Name</p>
                <p className="text-cream font-medium">
                  {selectedInquiry.names}
                </p>
              </div>
              <div>
                <p className="text-gray-soft/60 text-xs uppercase">Email</p>
                <p className="text-cream font-medium">
                  {selectedInquiry.email}
                </p>
              </div>
              {selectedInquiry.phone && (
                <div>
                  <p className="text-gray-soft/60 text-xs uppercase">Phone</p>
                  <p className="text-cream font-medium">
                    {selectedInquiry.phone}
                  </p>
                </div>
              )}
              <div>
                <p className="text-gray-soft/60 text-xs uppercase">
                  Event Type
                </p>
                <p className="text-cream font-medium capitalize">
                  {selectedInquiry.event_type}
                </p>
              </div>
              <div>
                <p className="text-gray-soft/60 text-xs uppercase">
                  Event Date
                </p>
                <p className="text-cream font-medium">
                  {new Date(selectedInquiry.event_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-soft/60 text-xs uppercase">Services</p>
                <p className="text-cream font-medium">
                  {Array.isArray(selectedInquiry.services)
                    ? selectedInquiry.services.join(", ")
                    : selectedInquiry.services}
                </p>
              </div>
              {selectedInquiry.details && (
                <div>
                  <p className="text-gray-soft/60 text-xs uppercase">Details</p>
                  <p className="text-gray-soft text-sm">
                    {selectedInquiry.details}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedInquiry(null)}
              className="mt-6 w-full px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
