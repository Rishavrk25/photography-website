import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { adminAPI } from "../utils/api";
import {
  HiStar,
  HiTrash,
  HiCheck,
  HiX,
} from "react-icons/hi";

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getTestimonials();
      const data = response.data.data.data || response.data.data || [];
      setTestimonials(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      setError(err.message || "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await adminAPI.updateTestimonialStatus(id, status);
      setTestimonials(testimonials.map(t => t.id === id ? { ...t, status } : t));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await adminAPI.deleteTestimonial(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (err) {
      alert("Failed to delete testimonial");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold text-cream flex items-center gap-2">
          <HiStar className="text-gold" /> Testimonials Management
        </h1>
        <p className="text-sm text-gray-soft/60 mt-1">Manage client reviews and testimonials.</p>
      </div>

      {error && (
        <div className="glass rounded-2xl p-4 border border-red-500/30 bg-red-500/5">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center border border-white/5">
          <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-4" />
          <p className="text-gray-soft/60">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center border border-white/5">
          <h3 className="text-xl font-bold text-cream mb-2">No testimonials found</h3>
          <p className="text-gray-soft/60 max-w-md">There are no client testimonials yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-gold/30 transition-all flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-cream text-lg">{testimonial.client_name}</h4>
                  <div className="flex text-gold mt-1">
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} className={i < testimonial.rating ? "text-gold" : "text-gray-500/30"} size={14} />
                    ))}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                  testimonial.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                  testimonial.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                  'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {testimonial.status}
                </span>
              </div>
              <p className="text-sm text-gray-soft/80 italic mb-6 flex-1">"{testimonial.content}"</p>
              
              <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                {testimonial.status !== 'approved' && (
                  <button 
                    onClick={() => handleStatusUpdate(testimonial.id, 'approved')}
                    className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
                  >
                    <HiCheck /> Approve
                  </button>
                )}
                {testimonial.status !== 'rejected' && (
                  <button 
                    onClick={() => handleStatusUpdate(testimonial.id, 'rejected')}
                    className="flex-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
                  >
                    <HiX /> Reject
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(testimonial.id)}
                  className="px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold py-2 rounded-lg transition-colors"
                >
                  <HiTrash size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
