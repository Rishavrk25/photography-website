import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, gold = false, ...props }) {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        ${gold ? 'glass-gold' : 'glass'}
        ${hover ? 'transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:border-gold/30' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -5, transition: { duration: 0.3 } } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}
