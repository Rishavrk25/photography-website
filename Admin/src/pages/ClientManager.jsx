import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiUserGroup, HiPlus, HiSearch, HiDotsVertical, HiOutlineMail, HiOutlineCalendar } from 'react-icons/hi';

const MOCK_CLIENTS = [
  { id: 1, name: 'Shreya & Rahul', event: 'Wedding', date: '2026-06-15', status: 'Active', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=100&q=80' },
  { id: 2, name: 'Priya & Ankit', event: 'Pre-Wedding', date: '2026-07-22', status: 'Pending', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=100&q=80' },
  { id: 3, name: 'Neha Sharma', event: 'Maternity', date: '2026-05-30', status: 'Delivered', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=100&q=80' },
];

export default function ClientManager() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-cream flex items-center gap-2">
            <HiUserGroup className="text-gold" /> Client Management
          </h1>
          <p className="text-sm text-gray-soft/60 mt-1">Manage photography clients, access, and galleries.</p>
        </div>
        <button className="bg-gradient-to-r from-gold-dark to-gold text-[#111] font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all">
          <HiPlus /> Add New Client
        </button>
      </div>

      <div className="glass p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between border border-white/5">
        <div className="relative w-full sm:w-96">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-soft/40 text-lg" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-cream focus:border-gold/50 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-gray-soft/50 font-medium">Client</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-gray-soft/50 font-medium">Event Details</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-gray-soft/50 font-medium">Gallery Status</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-gray-soft/50 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_CLIENTS.map((client) => (
                <motion.tr key={client.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={client.image} alt={client.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                      <div>
                        <p className="font-semibold text-cream text-sm">{client.name}</p>
                        <p className="text-xs text-gray-soft/40 flex items-center gap-1 mt-0.5"><HiOutlineMail /> client@email.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-cream text-sm">{client.event}</p>
                    <p className="text-xs text-gray-soft/40 flex items-center gap-1 mt-0.5"><HiOutlineCalendar /> {client.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      client.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      client.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-gold/10 text-gold border-gold/20'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-soft/40 hover:text-gold transition-colors p-2 rounded-lg hover:bg-gold/10">
                      <HiDotsVertical />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
