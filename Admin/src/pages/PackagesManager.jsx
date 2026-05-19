import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiCurrencyDollar, HiCheck, HiPencil, HiX, HiPlus, HiTrash } from 'react-icons/hi';

const DEFAULT_PACKAGES = [
  { id: 'silver', name: 'Silver Package', price: '50,000', features: ['Pre-wedding shoot', 'Candid Photography', 'Traditional Photography', 'Digital Album'] },
  { id: 'gold', name: 'Gold Package', price: '85,000', features: ['Everything in Silver', 'Cinematic Video', 'Drone Coverage', 'Premium Photo Book', '2 Days Coverage'] },
  { id: 'platinum', name: 'Platinum Package', price: '150,000', features: ['Everything in Gold', 'Same Day Edit Video', 'Pre-wedding Destination', 'Luxury Album Set', '4 Days Coverage'] }
];

export default function PackagesManager() {
  const [packages, setPackages] = useState([]);
  const [editingPkg, setEditingPkg] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('shubham_packages');
    if (saved) {
      setPackages(JSON.parse(saved));
    } else {
      setPackages(DEFAULT_PACKAGES);
    }
  }, []);

  const handleSave = () => {
    const updated = packages.map(p => p.id === editingPkg.id ? editingPkg : p);
    setPackages(updated);
    localStorage.setItem('shubham_packages', JSON.stringify(updated));
    setEditingPkg(null);
  };

  const updateFeature = (idx, value) => {
    const newFeatures = [...editingPkg.features];
    newFeatures[idx] = value;
    setEditingPkg({ ...editingPkg, features: newFeatures });
  };

  const removeFeature = (idx) => {
    const newFeatures = editingPkg.features.filter((_, i) => i !== idx);
    setEditingPkg({ ...editingPkg, features: newFeatures });
  };

  const addFeature = () => {
    setEditingPkg({ ...editingPkg, features: [...editingPkg.features, 'New Feature'] });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold text-cream flex items-center gap-2">
          <HiCurrencyDollar className="text-gold" /> Pricing Packages
        </h1>
        <p className="text-sm text-gray-soft/60 mt-1">Manage photography service packages and pricing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, idx) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass rounded-2xl p-6 border ${pkg.id === 'gold' ? 'border-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'border-white/5'} flex flex-col relative overflow-hidden`}
          >
            {pkg.id === 'gold' && (
              <div className="absolute top-0 right-0 bg-gold text-[#111] text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                Popular
              </div>
            )}
            <h3 className="text-xl font-heading font-bold text-cream capitalize mb-2">{pkg.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-2xl font-bold text-gold">₹{pkg.price}</span>
            </div>
            
            <div className="space-y-3 mb-8 flex-1">
              {pkg.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-soft/80">
                  <HiCheck className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setEditingPkg({ ...pkg })}
              className="w-full py-2.5 bg-white/5 hover:bg-gold/10 text-cream hover:text-gold border border-white/10 rounded-xl transition-all flex items-center justify-center gap-2 font-medium text-sm"
            >
              <HiPencil /> Edit Package
            </button>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingPkg(null)} />
          <div className="relative z-60 w-[90%] max-w-lg bg-dark-300 glass p-8 rounded-3xl border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-cream">Edit {editingPkg.name}</h3>
              <button onClick={() => setEditingPkg(null)} className="text-gray-soft hover:text-white">
                <HiX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-soft mb-1 uppercase tracking-wider">Package Name</label>
                <input 
                  type="text" 
                  value={editingPkg.name} 
                  onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                  className="w-full bg-[#111]/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream focus:border-gold/50 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-soft mb-1 uppercase tracking-wider">Price (₹)</label>
                <input 
                  type="text" 
                  value={editingPkg.price} 
                  onChange={(e) => setEditingPkg({ ...editingPkg, price: e.target.value })}
                  className="w-full bg-[#111]/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream focus:border-gold/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-soft mb-2 uppercase tracking-wider">Features</label>
                <div className="space-y-2 mb-3">
                  {editingPkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input 
                        type="text" 
                        value={feature} 
                        onChange={(e) => updateFeature(idx, e.target.value)}
                        className="flex-1 bg-[#111]/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-cream focus:border-gold/50 focus:outline-none"
                      />
                      <button onClick={() => removeFeature(idx)} className="text-red-400 hover:bg-red-500/20 p-2 rounded-lg">
                        <HiTrash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={addFeature} className="text-sm flex items-center gap-1 text-gold hover:text-gold-light font-medium">
                  <HiPlus /> Add Feature
                </button>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => setEditingPkg(null)}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-cream rounded-xl transition-all font-semibold"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 py-3 bg-gradient-to-r from-gold-dark to-gold text-[#111] rounded-xl transition-all font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
