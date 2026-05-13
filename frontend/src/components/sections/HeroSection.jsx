import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animations';
import GoldButton from '../ui/GoldButton';
import GlassCard from '../ui/GlassCard';
import { HiCamera, HiUsers, HiStar } from 'react-icons/hi';
import { useInView } from 'react-intersection-observer';

const stats = [
  { icon: <HiCamera className="text-2xl" />, value: '500+', label: 'Events Covered' },
  { icon: <HiUsers className="text-2xl" />, value: '2.7K+', label: 'Followers' },
  { icon: <HiStar className="text-2xl" />, value: '5+', label: 'Years Experience' },
];

export default function HeroSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-bride-and-groom-holding-hands-1581/1080p.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark-400/80 via-dark-400/50 to-dark-400/90" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-dark-400/60 via-transparent to-dark-400/60" />

      {/* Film Grain */}
      <div className="absolute inset-0 z-[2] film-grain pointer-events-none" />

      {/* Content */}
      <motion.div
        ref={ref}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
        variants={staggerContainer(0.15, 0.3)}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {/* Top Badge */}
        <motion.div
          variants={fadeIn('up', 0)}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-light">
            Premium Wedding Studio
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeIn('up', 0.1)}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.1] mb-6"
        >
          <span className="text-cream">Capturing Emotions,</span>
          <br />
          <span className="text-shimmer">Creating Timeless Memories</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeIn('up', 0.2)}
          className="text-gray-soft/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Premium Wedding Photography & Cinematic Videography in Ranchi
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeIn('up', 0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <GoldButton
            variant="filled"
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Your Shoot
          </GoldButton>
          <GoldButton
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('films')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ▶ Watch Our Films
          </GoldButton>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={fadeIn('up', 0.4)}
          className="flex flex-wrap justify-center gap-4 sm:gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="animate-float"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <GlassCard className="px-6 py-4 flex items-center gap-4 min-w-[180px]" hover={false}>
                <span className="text-gold">{stat.icon}</span>
                <div className="text-left">
                  <p className="font-heading text-xl font-bold text-gradient-gold">{stat.value}</p>
                  <p className="text-[0.7rem] text-gray-soft/60 uppercase tracking-wider">{stat.label}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gray-soft/40">Scroll</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-gold/30 flex justify-center pt-2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 rounded-full bg-gold"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Side decorative lines */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-3">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-gold/30" />
        <div className="w-2 h-2 rotate-45 border border-gold/30" />
        <div className="w-[1px] h-20 bg-gradient-to-b from-gold/30 to-transparent" />
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-3">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-gold/30" />
        <div className="w-2 h-2 rotate-45 border border-gold/30" />
        <div className="w-[1px] h-20 bg-gradient-to-b from-gold/30 to-transparent" />
      </div>
    </section>
  );
}
