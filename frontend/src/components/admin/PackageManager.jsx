import { useState, useEffect } from 'react';
import { adminAPI } from '../../utils/api';
import { HiPlus, HiTrash, HiPencil } from 'react-icons/hi';

export default function PackageManager() {
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', price: '', features: '', is_featured: false });
  const fetchData = () => adminAPI.getPackages().then(r => setPackages(r.data || [])).catch(console.error);
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, features: form.features.split('\n').filter(Boolean) };
    await adminAPI.createPackage(data); setShowForm(false); fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-cream font-heading text-xl">Packages ({packages.length})</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold border border-gold/20 text-sm cursor-pointer"><HiPlus /> Add</button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Package Name" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/40" />
            <input type="text" placeholder="Price (e.g. 55,000)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required className="bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/40" />
          </div>
          <textarea placeholder="Features (one per line)" value={form.features} onChange={e => setForm({...form, features: e.target.value})} rows={4} className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/40 resize-none" />
          <label className="flex items-center gap-2 text-cream text-sm"><input type="checkbox" checked={form.is_featured} onChange={e => setForm({...form, is_featured: e.target.checked})} /> Featured Package</label>
          <button type="submit" className="px-6 py-2 rounded-xl bg-gold text-primary text-sm font-semibold cursor-pointer">Save</button>
        </form>
      )}
      <div className="space-y-3">
        {packages.map(p => (
          <div key={p.id} className={`glass rounded-xl p-5 ${p.is_featured ? 'border-gold/30' : ''}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-cream font-heading font-semibold">{p.title} {p.is_featured && <span className="text-gold text-xs ml-2">★ Featured</span>}</h3>
              <div className="flex gap-2">
                <button onClick={() => { if(confirm('Delete?')) adminAPI.deletePackage(p.id).then(fetchData); }} className="p-2 text-red-400 cursor-pointer"><HiTrash /></button>
              </div>
            </div>
            <p className="text-gold font-heading text-xl mb-2">₹{p.price}</p>
            <div className="flex flex-wrap gap-1">{(p.features || []).map((f,i) => <span key={i} className="text-xs px-2 py-0.5 rounded bg-gold/5 text-gold/70">{f}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
