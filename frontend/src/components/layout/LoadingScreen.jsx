import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-dark-400 flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Camera Shutter Animation */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Shutter blades */}
            <div className="relative w-28 h-28">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                    transformOrigin: 'center center',
                  }}
                >
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-12 bg-gradient-to-b from-gold to-transparent rounded-full"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{
                      scaleY: [0, 1, 1, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      times: [0, 0.3, 0.7, 1],
                      delay: i * 0.05,
                      repeat: Infinity,
                    }}
                    style={{ transformOrigin: 'bottom center' }}
                  />
                </motion.div>
              ))}

              {/* Center lens */}
              <motion.div
                className="absolute inset-0 m-auto w-12 h-12 rounded-full border-2 border-gold"
                animate={{
                  scale: [1, 1.2, 1],
                  borderColor: ['#D4AF37', '#E8C84A', '#D4AF37'],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.div
                  className="absolute inset-0 m-auto w-5 h-5 rounded-full bg-gold"
                  animate={{
                    scale: [0.8, 1, 0.8],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </div>

            {/* Brand Text */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h1 className="font-heading text-2xl font-bold text-gradient-gold">
                Shubham
              </h1>
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gray-soft/50 mt-1">
                Video Photography
              </p>
            </motion.div>

            {/* Loading bar */}
            <div className="w-48 h-[2px] bg-dark-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
