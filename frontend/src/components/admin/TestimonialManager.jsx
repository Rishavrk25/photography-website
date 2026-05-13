import { useState, useEffect } from 'react';
import { adminAPI } from '../../utils/api';
import { HiPlus, HiTrash } from 'react-icons/hi';

export default function TestimonialManager() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ client_name: '', review: '', rating: 5 });
  const fetchData = () => adminAPI.getTestimonials().then(r => setItems(r.data || [])).catch(console.error);
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(); Object.entries(form).forEach(([k,v]) => fd.append(k, v));
    await adminAPI.createTestimonial(fd); setShowForm(false); fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-cream font-heading text-xl">Testimonials ({items.length})</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold border border-gold/20 text-sm cursor-pointer"><HiPlus /> Add</button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
          <input type="text" placeholder="Client Name" value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} required className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/40" />
          <textarea placeholder="Review" value={form.review} onChange={e => setForm({...form, review: e.target.value})} required rows={3} className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/40 resize-none" />
          <button type="submit" className="px-6 py-2 rounded-xl bg-gold text-primary text-sm font-semibold cursor-pointer">Save</button>
        </form>
      )}
      <div className="space-y-3">
        {items.map(t => (
          <div key={t.id} className="glass rounded-xl p-4 flex justify-between">
            <div><p className="text-cream text-sm font-medium">{t.client_name}</p><p className="text-gray-soft/50 text-xs mt-1">{t.review.substring(0,100)}...</p></div>
            <button onClick={() => { if(confirm('Delete?')) adminAPI.deleteTestimonial(t.id).then(fetchData); }} className="p-2 text-red-400 shrink-0 cursor-pointer"><HiTrash /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
