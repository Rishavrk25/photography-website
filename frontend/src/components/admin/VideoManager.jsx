import { useState, useEffect } from 'react';
import { adminAPI } from '../../utils/api';
import { HiPlus, HiTrash } from 'react-icons/hi';

export default function VideoManager() {
  const [videos, setVideos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', video_url: '', category: 'wedding' });
  const [loading, setLoading] = useState(false);

  const fetchData = () => adminAPI.getVideos({ per_page: 50 }).then(r => setVideos(r.data.data || [])).catch(console.error);
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await adminAPI.createVideo(form); setShowForm(false); fetchData(); } catch {}
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-cream font-heading text-xl">Videos ({videos.length})</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold border border-gold/20 text-sm cursor-pointer"><HiPlus /> Add</button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
          <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/40" />
          <input type="url" placeholder="YouTube URL" value={form.video_url} onChange={e => setForm({...form, video_url: e.target.value})} required className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/40" />
          <button type="submit" disabled={loading} className="px-6 py-2 rounded-xl bg-gold text-primary text-sm font-semibold disabled:opacity-50 cursor-pointer">{loading ? 'Saving...' : 'Save'}</button>
        </form>
      )}
      <div className="space-y-3">
        {videos.map(v => (
          <div key={v.id} className="glass rounded-xl p-4 flex items-center justify-between">
            <div><p className="text-cream text-sm">{v.title}</p><p className="text-gold/50 text-xs">{v.category}</p></div>
            <button onClick={() => { if(confirm('Delete?')) adminAPI.deleteVideo(v.id).then(fetchData); }} className="p-2 text-red-400 cursor-pointer"><HiTrash /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
