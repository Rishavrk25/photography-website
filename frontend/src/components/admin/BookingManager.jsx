import { useState, useEffect } from 'react';
import { adminAPI } from '../../utils/api';
import { HiTrash } from 'react-icons/hi';

export default function BookingManager() {
  const [bookings, setBookings] = useState([]);
  const fetchData = () => adminAPI.getBookings({ per_page: 50 }).then(r => setBookings(r.data.data || [])).catch(console.error);
  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id, status) => { await adminAPI.updateBooking(id, { status }); fetchData(); };

  return (
    <div className="space-y-6">
      <h2 className="text-cream font-heading text-xl">Bookings ({bookings.length})</h2>
      <div className="space-y-3">
        {bookings.map(b => (
          <div key={b.id} className="glass rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cream font-medium">{b.client_name}</p>
                <p className="text-gray-soft/50 text-xs">{b.email} • {b.phone}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${b.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : b.status === 'confirmed' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>{b.status}</span>
            </div>
            <p className="text-gray-soft/60 text-sm">{b.event_type || 'N/A'} • {b.event_date || 'TBD'} • {b.package || 'No package'}</p>
            {b.message && <p className="text-gray-soft/40 text-xs">{b.message}</p>}
            <div className="flex gap-2">
              <button onClick={() => updateStatus(b.id, 'confirmed')} className="text-xs px-3 py-1 rounded-lg bg-green-500/10 text-green-400 cursor-pointer">Confirm</button>
              <button onClick={() => updateStatus(b.id, 'completed')} className="text-xs px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 cursor-pointer">Complete</button>
              <button onClick={() => updateStatus(b.id, 'cancelled')} className="text-xs px-3 py-1 rounded-lg bg-red-500/10 text-red-400 cursor-pointer">Cancel</button>
              <button onClick={() => { if(confirm('Delete?')) adminAPI.deleteBooking(b.id).then(fetchData); }} className="ml-auto text-red-400 cursor-pointer"><HiTrash /></button>
            </div>
          </div>
        ))}
        {bookings.length === 0 && <p className="text-gray-soft/40 text-sm">No bookings yet</p>}
      </div>
    </div>
  );
}
