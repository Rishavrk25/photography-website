import { useState, useEffect } from 'react';
import { adminAPI } from '../../utils/api';
import { HiTrash } from 'react-icons/hi';

export default function ContactInquiries() {
  const [contacts, setContacts] = useState([]);
  const fetchData = () => adminAPI.getContacts({ per_page: 50 }).then(r => setContacts(r.data.data || [])).catch(console.error);
  useEffect(() => { fetchData(); }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-cream font-heading text-xl">Contact Inquiries ({contacts.length})</h2>
      <div className="space-y-3">
        {contacts.map(c => (
          <div key={c.id} className="glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-cream font-medium">{c.name}</p>
                <p className="text-gray-soft/50 text-xs">{c.email} {c.phone && `• ${c.phone}`}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-soft/30 text-xs">{new Date(c.created_at).toLocaleDateString()}</span>
                <button onClick={() => { if(confirm('Delete?')) adminAPI.deleteContact(c.id).then(fetchData); }} className="p-2 text-red-400 cursor-pointer"><HiTrash /></button>
              </div>
            </div>
            <p className="text-gray-soft/60 text-sm">{c.message}</p>
          </div>
        ))}
        {contacts.length === 0 && <p className="text-gray-soft/40 text-sm">No inquiries yet</p>}
      </div>
    </div>
  );
}
