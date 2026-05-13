import { useState, useEffect } from 'react';
import { adminAPI } from '../../utils/api';
import { HiPlus, HiTrash, HiUpload } from 'react-icons/hi';

const categories = ['Weddings', 'Pre-Wedding', 'Bridal', 'Couple Shoots', 'Traditional', 'Cinematic Reels'];

export default function GalleryManager() {
  const [galleries, setGalleries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Weddings', description: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGalleries = () => adminAPI.getGalleries({ per_page: 50 }).then(({ data }) => setGalleries(data.data || [])).catch(console.error);

  useEffect(() => { fetchGalleries(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('image', file);
    try {
      await adminAPI.createGallery(formData);
      setShowForm(false); setForm({ title: '', category: 'Weddings', description: '' }); setFile(null);
      fetchGalleries();
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    await adminAPI.deleteGallery(id);
    fetchGalleries();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-cream font-heading text-xl">Gallery ({galleries.length})</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold border border-gold/20 text-sm hover:bg-gold/20 transition-all cursor-pointer">
          <HiPlus /> Add Image
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/40" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/40">
              {categories.map(c => <option key={c} value={c} className="bg-dark-300">{c}</option>)}
            </select>
          </div>
          <textarea placeholder="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/40 resize-none" />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-gold/20 text-gold/60 text-sm cursor-pointer hover:border-gold/40">
              <HiUpload /> {file ? file.name : 'Choose Image'}
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
            </label>
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-xl bg-gold text-primary text-sm font-semibold disabled:opacity-50 cursor-pointer">
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleries.map((img) => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square">
            <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-dark-400/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <p className="text-cream text-sm font-medium">{img.title}</p>
              <p className="text-gold/60 text-xs">{img.category}</p>
              <button onClick={() => handleDelete(img.id)} className="mt-2 p-2 rounded-full bg-red-deep/30 text-red-300 hover:bg-red-deep/50 cursor-pointer"><HiTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
