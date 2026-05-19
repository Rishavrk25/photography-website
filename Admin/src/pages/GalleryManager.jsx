import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiCloudUpload,
  HiPhotograph,
  HiFolder,
  HiDotsVertical,
  HiEye,
  HiCheck,
  HiX,
  HiExclamation,
} from "react-icons/hi";
import { adminAPI } from "../utils/api";
import api from "../utils/api";

export default function GalleryManager() {
  const [dragActive, setDragActive] = useState(false);
  const [galleries, setGalleries] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  const [filesModalOpen, setFilesModalOpen] = useState(false);
  const [currentGalleryId, setCurrentGalleryId] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
  const [previewType, setPreviewType] = useState("image");

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await adminAPI.getBookings();
      const bookingsArray = res.data.data.data || res.data.data || [];
      const mapped = bookingsArray.map((b) => ({
        id: b.id,
        title: b.package || `Booking #${b.id}`,
        client: b.names || b.email || "Client",
        date: b.event_date || b.created_at,
        files: b.files_count || 0,
        size: b.size || "0 MB",
        status: b.status || "pending",
      }));
      setGalleries(mapped);
    } catch (e) {
      console.error("Failed to load bookings", e);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleFileUpload = async (file) => {
    if (!selectedBookingId) {
      showToast("error", "Please select a client / booking first.");
      return;
    }
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();
    if (ext !== "zip") {
      showToast("error", "Only ZIP files are allowed.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("booking_id", selectedBookingId);
    formData.append("file", file);

    try {
      const token = localStorage.getItem("auth_token");
      await api.post("/admin/galleries/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(pct);
        },
      });
      showToast("success", `"${file.name}" uploaded and extracted successfully! Gallery is now live.`);
      setSelectedBookingId("");
      fetchGalleries();
    } catch (err) {
      const msg = err?.response?.data?.message || "Upload failed. Please try again.";
      showToast("error", msg);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
  };

  const toggleFile = (path) => {
    const s = new Set(selectedFiles);
    if (s.has(path)) s.delete(path);
    else s.add(path);
    setSelectedFiles(s);
  };

  const sendSelectedFiles = async () => {
    if (!currentGalleryId) return;
    const files = Array.from(selectedFiles);
    if (files.length === 0) {
      showToast("error", "Select at least one file to send.");
      return;
    }
    try {
      const gallery = galleries.find((g) => g.id === currentGalleryId) || {};
      await adminAPI.sendPackage({
        name: gallery.title || `Gallery ${currentGalleryId}`,
        client_email: gallery.client === "Client" ? null : gallery.client,
        booking_id: currentGalleryId,
        images: files,
      });
      setFilesModalOpen(false);
      showToast("success", "Package sent to client successfully!");
    } catch (err) {
      showToast("error", "Failed to send package.");
    }
  };

  return (
    <div className="space-y-8">

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-[100] max-w-md flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-md ${
              toast.type === "success"
                ? "bg-green-950/90 border-green-500/40 text-green-300"
                : "bg-red-950/90 border-red-500/40 text-red-300"
            }`}
          >
            <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
              toast.type === "success" ? "bg-green-500/20" : "bg-red-500/20"
            }`}>
              {toast.type === "success"
                ? <HiCheck className="text-green-400" size={14} />
                : <HiExclamation className="text-red-400" size={14} />}
            </div>
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button onClick={() => setToast(null)} className="text-current opacity-50 hover:opacity-100 mt-0.5">
              <HiX size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-cream flex items-center gap-2">
          <HiPhotograph className="text-gold" /> Gallery Management
        </h1>
        <p className="text-sm text-gray-soft/60 mt-1">
          Upload ZIP files for client galleries. Files are automatically extracted.
        </p>
      </div>

      {/* Files Modal */}
      {filesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setFilesModalOpen(false)} />
          <div className="relative z-60 w-[90%] max-w-3xl bg-dark-300 glass p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold mb-4 text-cream">Select files to send</h3>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-gray-soft/60">{galleryFiles.length} files</div>
              <div className="flex gap-2">
                <button onClick={() => setSelectedFiles(new Set(galleryFiles.map((f) => f.path)))} className="px-3 py-1 bg-white/5 rounded text-sm text-cream">Select All</button>
                <button onClick={() => setSelectedFiles(new Set())} className="px-3 py-1 bg-white/5 rounded text-sm text-cream">Clear</button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-72 overflow-auto mb-4">
              {galleryFiles.map((f) => {
                const ext = f.name.split(".").pop().toLowerCase();
                const isVideo = ["mp4", "webm", "mov", "m4v", "ogg"].includes(ext);
                const src = `http://127.0.0.1:8000/storage/${f.path}`;
                return (
                  <label key={f.path} className="glass p-2 rounded flex flex-col items-center text-xs cursor-pointer">
                    {isVideo ? (
                      <video src={src} className="w-full h-28 object-cover rounded mb-2 bg-black" muted playsInline loop
                        onClick={() => { setPreviewSrc(src); setPreviewType("video"); setPreviewOpen(true); }} />
                    ) : (
                      <img src={src} alt={f.name} className="w-full h-28 object-cover rounded mb-2"
                        onClick={() => { setPreviewSrc(src); setPreviewType("image"); setPreviewOpen(true); }}
                        onError={(e) => { e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23222' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' fill='%23fff' dominant-baseline='middle' text-anchor='middle' font-size='20'%3ENo preview%3C/text%3E%3C/svg%3E"; }} />
                    )}
                    <div className="w-full flex items-center justify-between gap-2 text-cream">
                      <div className="truncate mr-2">{f.name}</div>
                      <input type="checkbox" checked={selectedFiles.has(f.path)} onChange={() => toggleFile(f.path)} />
                    </div>
                  </label>
                );
              })}
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setFilesModalOpen(false)} className="px-4 py-2 rounded bg-white/5 text-cream">Cancel</button>
              <button onClick={sendSelectedFiles} className="px-4 py-2 rounded bg-gradient-to-r from-gold-dark to-gold text-[#111] font-bold">Send Selected</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Lightbox */}
      {previewOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80" onClick={() => setPreviewOpen(false)} />
          <div className="relative z-70 max-w-5xl w-[90%] p-4">
            <button onClick={() => setPreviewOpen(false)} className="absolute right-2 top-2 bg-white/10 px-3 py-1 rounded text-cream">Close</button>
            {previewType === "video"
              ? <video src={previewSrc} controls autoPlay className="w-full h-auto max-h-[80vh] object-contain rounded shadow-lg bg-black" />
              : <img src={previewSrc} alt="preview" className="w-full h-auto max-h-[80vh] object-contain rounded shadow-lg" />}
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`glass rounded-2xl border-2 border-dashed p-10 flex flex-col items-center justify-center text-center transition-all ${
          dragActive ? "border-gold bg-gold/5" : "border-white/10 hover:border-gold/30 hover:bg-white/[0.02]"
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gold mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <HiCloudUpload size={32} />
        </div>
        <h3 className="text-lg font-bold text-cream mb-2">Drag & Drop Gallery ZIP here</h3>
        <p className="text-sm text-gray-soft/60 mb-6 max-w-md">
          Upload a ZIP file containing the client's high-resolution photos. The system will automatically extract and optimize them for the client portal.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg">
          <select
            value={selectedBookingId}
            onChange={(e) => setSelectedBookingId(e.target.value)}
            className="flex-1 bg-[#111]/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream focus:border-gold/50 focus:outline-none"
          >
            <option value="" disabled>Select Client / Booking</option>
            {galleries.map((g) => (
              <option key={g.id} value={g.id}>{g.client} ({g.title})</option>
            ))}
          </select>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".zip"
            onChange={(e) => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0]); }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-gradient-to-r from-gold-dark to-gold text-[#111] font-semibold px-6 py-3 rounded-xl hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Browse Files"}
          </button>
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="w-full max-w-lg mt-5">
            <div className="flex justify-between text-xs text-gray-soft/60 mb-1.5">
              <span>{uploadProgress === 100 ? "Processing & extracting files on server..." : "Uploading & extracting..."}</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-2 bg-gradient-to-r from-gold-dark to-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Gallery List */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-cream mb-4">Recent Client Galleries</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <motion.div
              key={gallery.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-5 border border-white/5 hover:border-gold/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                  <HiFolder size={24} />
                </div>
                <button className="text-gray-soft/40 hover:text-cream p-1"><HiDotsVertical /></button>
              </div>
              <h4 className="font-bold text-cream mb-1 truncate">{gallery.title}</h4>
              <p className="text-xs text-gray-soft/50 mb-4">{gallery.client} • {gallery.date}</p>

              <div className="flex justify-between items-center text-xs font-medium border-t border-white/5 pt-4">
                <span className="text-gray-soft/70">{gallery.files} files ({gallery.size})</span>
                <span className={`px-2 py-1 rounded-md border capitalize ${
                  gallery.status === "Delivered"
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                }`}>
                  {gallery.status}
                </span>
              </div>

              <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex-1 bg-white/5 hover:bg-gold/10 hover:text-gold text-gray-soft text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors">
                  <HiEye /> View
                </button>
                <button
                  onClick={async () => {
                    try {
                      const filesRes = await adminAPI.getGalleryFiles(gallery.id);
                      const files = filesRes.data.data || [];
                      if (!files.length) {
                        showToast("error", "No files found for this gallery.");
                        return;
                      }
                      setGalleryFiles(files);
                      setSelectedFiles(new Set(files.map((f) => f.path)));
                      setCurrentGalleryId(gallery.id);
                      setFilesModalOpen(true);
                    } catch (err) {
                      showToast("error", "Failed to fetch gallery files.");
                    }
                  }}
                  className="bg-gradient-to-r from-gold-dark to-gold text-[#111] font-semibold px-4 py-2 rounded-xl hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all text-xs"
                >
                  Send to Client
                </button>
                <button
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to remove this gallery? This will delete all uploaded photos from the server and reset the booking status.")) {
                      try {
                        await adminAPI.deleteGallery(gallery.id);
                        showToast("success", "Gallery removed successfully.");
                        fetchGalleries();
                      } catch (err) {
                        showToast("error", "Failed to remove gallery.");
                      }
                    }
                  }}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-xl border border-red-500/20 transition-all flex items-center justify-center"
                  title="Remove Gallery"
                >
                  <HiX size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
