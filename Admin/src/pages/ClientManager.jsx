import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiUserGroup, HiPlus, HiSearch, HiDotsVertical, HiOutlineMail, HiOutlineCalendar } from 'react-icons/hi';
import { adminAPI } from '../utils/api';

export default function ClientManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getUsers();
      const data = response.data.data || [];
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-cream flex items-center gap-2">
            <HiUserGroup className="text-gold" /> Registered Users
          </h1>
          <p className="text-sm text-gray-soft/60 mt-1">View all registered users and their details.</p>
        </div>
      </div>

      <div className="glass p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between border border-white/5">
        <div className="relative w-full sm:w-96">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-soft/40 text-lg" />
          <input
            type="text"
            placeholder="Search users..."
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
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-gray-soft/50 font-medium">User ID</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-gray-soft/50 font-medium">Name</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-gray-soft/50 font-medium">Email</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-gray-soft/50 font-medium">Registered At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-soft/60">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-6 h-6 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-3" />
                      Loading users...
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-soft/60">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-gray-soft font-mono">#{user.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold border border-gold/30">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <p className="font-semibold text-cream text-sm">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-soft flex items-center gap-1.5"><HiOutlineMail className="text-gold/70" /> {user.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-soft flex items-center gap-1.5"><HiOutlineCalendar className="text-gold/70" /> {new Date(user.created_at).toLocaleDateString()}</p>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
