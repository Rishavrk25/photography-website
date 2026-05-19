import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HiCloudUpload,
  HiPhotograph,
  HiFolder,
  HiDotsVertical,
  HiTrash,
  HiEye,
} from "react-icons/hi";
import { adminAPI } from "../utils/api";

export default function GalleryManager() {
  const [dragActive, setDragActive] = useState(false);

  const [galleries, setGalleries] = useState([]);
  const [filesModalOpen, setFilesModalOpen] = useState(false);
  const [currentGalleryId, setCurrentGalleryId] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
  const [previewType, setPreviewType] = useState('image');

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const res = await adminAPI.getBookings();
        const bookingsArray = res.data.data.data || res.data.data || [];
        // Map bookings to gallery-like items
        const mapped = bookingsArray.map((b) => ({
          id: b.id,
          title: b.package || `Booking #${b.id}`,
          client: b.names || b.email || "Client",
          date: b.event_date || b.created_at,
          files: b.files_count || 0,
          size: b.size || "0 MB",
          status: b.status || "Processing",
        }));
        if (mounted) setGalleries(mapped);
      } catch (e) {
        console.error("Failed to load bookings", e);
      }
    };
    fetch();
    return () => {
      mounted = false;
    };
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      alert(
        `File selected: ${e.dataTransfer.files[0].name}. (Backend upload coming next!)`,
      );
    }
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
      alert("Select at least one file");
      return;
    }
    try {
      const gallery = galleries.find((g) => g.id === currentGalleryId) || {};
      const payload = {
        name: gallery.title || `Gallery ${currentGalleryId}`,
        client_email: gallery.client === "Client" ? null : gallery.client,
        booking_id: currentGalleryId,
        images: files,
      };
      const res = await adminAPI.sendPackage(payload);
      alert("Package sent: " + res.data.message);
      setFilesModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to send package");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-cream flex items-center gap-2">
          <HiPhotograph className="text-gold" /> Gallery Management
        </h1>
        <p className="text-sm text-gray-soft/60 mt-1">
          Upload ZIP files or drag-and-drop photos for client galleries.
        </p>
      </div>

      {/* Files selection modal */}
      {filesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setFilesModalOpen(false)}
          />
          <div className="relative z-60 w-[90%] max-w-3xl bg-dark-300 glass p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold mb-4">Select files to send</h3>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-gray-soft/60">
                {galleryFiles.length} files
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedFiles(new Set(galleryFiles.map((f) => f.path)));
                  }}
                  className="px-3 py-1 bg-white/5 rounded"
                >
                  Select All
                </button>
                <button
                  onClick={() => {
                    setSelectedFiles(new Set());
                  }}
                  className="px-3 py-1 bg-white/5 rounded"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-72 overflow-auto mb-4">
              {galleryFiles.map((f) => (
                <label
                  key={f.path}
                  className="glass p-2 rounded flex flex-col items-center text-xs"
                >
                  {(() => {
                    const ext = f.name.split('.').pop().toLowerCase();
                    const isVideo = ['mp4', 'webm', 'mov', 'm4v', 'ogg'].includes(ext);
                    const src = `http://127.0.0.1:8000/storage/${f.path}`;
                    if (isVideo) {
                      return (
                        <video
                          src={src}
                          className="w-full h-28 object-cover rounded mb-2 cursor-pointer bg-black"
                          muted
                          playsInline
                          loop
                          onClick={() => { setPreviewSrc(src); setPreviewType('video'); setPreviewOpen(true); }}
                        />
                      );
                    }
                    return (
                      <img
                        src={src}
                        alt={f.name}
                        className="w-full h-28 object-cover rounded mb-2 cursor-pointer"
                        onClick={() => { setPreviewSrc(src); setPreviewType('image'); setPreviewOpen(true); }}
                        onError={(e) => { e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23222' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' fill='%23fff' dominant-baseline='middle' text-anchor='middle' font-size='20'%3ENo preview%3C/text%3E%3C/svg%3E" }}
                      />
                    );
                  })()}
                  <div className="w-full flex items-center justify-between gap-2">
                    <div className="truncate mr-2">{f.name}</div>
                    <input
                      type="checkbox"
                      checked={selectedFiles.has(f.path)}
                      onChange={() => toggleFile(f.path)}
                    />
                  </div>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setFilesModalOpen(false)}
                className="px-4 py-2 rounded bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={sendSelectedFiles}
                className="px-4 py-2 rounded bg-gradient-to-r from-gold-dark to-gold text-[#111]"
              >
                Send Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview lightbox */}
      {previewOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setPreviewOpen(false)}
          />
          <div className="relative z-70 max-w-5xl w-[90%] p-4">
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute right-2 top-2 z-80 bg-white/10 px-3 py-1 rounded"
            >
              Close
            </button>
            {previewType === 'video' ? (
              <video src={previewSrc} controls autoPlay className="w-full h-auto max-h-[80vh] object-contain rounded shadow-lg bg-black" />
            ) : (
              <img
                src={previewSrc}
                alt="preview"
                className="w-full h-auto max-h-[80vh] object-contain rounded shadow-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23222' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' fill='%23fff' dominant-baseline='middle' text-anchor='middle' font-size='24'%3ENo preview%3C/text%3E%3C/svg%3E";
                }}
              />
            )}
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
          dragActive
            ? "border-gold bg-gold/5"
            : "border-white/10 hover:border-gold/30 hover:bg-white/[0.02]"
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gold mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <HiCloudUpload size={32} />
        </div>
        <h3 className="text-lg font-bold text-cream mb-2">
          Drag & Drop Gallery ZIP here
        </h3>
        <p className="text-sm text-gray-soft/60 mb-6 max-w-md">
          Upload a ZIP file containing the client's high-resolution photos. The
          system will automatically extract and optimize them for the client
          portal.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
          <select 
            className="flex-1 bg-[#111]/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream focus:border-gold/50 focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>Select Client / Booking</option>
            {galleries.map(g => (
              <option key={g.id} value={g.id}>{g.client} ({g.title})</option>
            ))}
          </select>
          <button className="bg-gradient-to-r from-gold-dark to-gold text-[#111] font-semibold px-6 py-3 rounded-xl hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all whitespace-nowrap">
            Browse Files
          </button>
        </div>
      </div>

      {/* Gallery List */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-cream mb-4">
          Recent Client Galleries
        </h3>
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
                <button className="text-gray-soft/40 hover:text-cream p-1">
                  <HiDotsVertical />
                </button>
              </div>
              <h4 className="font-bold text-cream mb-1 truncate">
                {gallery.title}
              </h4>
              <p className="text-xs text-gray-soft/50 mb-4">
                {gallery.client} • {gallery.date}
              </p>

              <div className="flex justify-between items-center text-xs font-medium border-t border-white/5 pt-4">
                <span className="text-gray-soft/70">
                  {gallery.files} files ({gallery.size})
                </span>
                <span
                  className={`px-2 py-1 rounded-md border ${
                    gallery.status === "Delivered"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                  }`}
                >
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
                      const filesRes = await adminAPI.getGalleryFiles(
                        gallery.id,
                      );
                      const files = filesRes.data.data || [];
                      if (!files || files.length === 0) {
                        alert("No files found for this gallery.");
                        return;
                      }
                      setGalleryFiles(files);
                      setSelectedFiles(new Set(files.map((f) => f.path)));
                      setCurrentGalleryId(gallery.id);
                      setFilesModalOpen(true);
                    } catch (err) {
                      console.error(err);
                      alert("Failed to fetch gallery files");
                    }
                  }}
                  className="bg-gradient-to-r from-gold-dark to-gold text-[#111] font-semibold px-4 py-2.5 rounded-xl hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all"
                >
                  Send to Client
                </button>
                {gallery.status === "Delivered" && (
                  <button className="px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold py-2 rounded-lg transition-colors">
                    <HiTrash />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
