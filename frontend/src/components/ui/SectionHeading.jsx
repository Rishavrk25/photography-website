import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';

export default function SectionHeading({ title, subtitle, light = false, className = '', align = 'center' }) {
  const alignClass = {
    center: 'text-center items-center',
    left: 'text-left items-start',
    right: 'text-right items-end',
  };

  return (
    <motion.div
      className={`flex flex-col gap-4 mb-16 ${alignClass[align]} ${className}`}
      variants={fadeIn('up')}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Decorative line */}
      <div className="flex items-center gap-3">
        <span className="block w-8 h-[2px] bg-gradient-to-r from-transparent to-gold" />
        <span className="block w-2 h-2 rounded-full bg-gold" />
        <span className="block w-8 h-[2px] bg-gradient-to-l from-transparent to-gold" />
      </div>

      <h2
        className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight ${
          light ? 'text-cream' : 'text-gradient-gold'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="text-gray-soft/80 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Bottom accent */}
      <div className="flex items-center gap-2 mt-2">
        <span className="block w-12 h-[1px] bg-gold/40" />
        <span className="block w-3 h-3 border border-gold/40 rotate-45" />
        <span className="block w-12 h-[1px] bg-gold/40" />
      </div>
    </motion.div>
  );
}
