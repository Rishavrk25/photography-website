import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animations';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { HiCamera, HiFilm, HiHeart, HiSparkles, HiStar, HiGlobe } from 'react-icons/hi';

const services = [
  {
    icon: <HiCamera className="text-3xl" />,
    title: 'Wedding Photography',
    desc: 'Every emotion, every ritual, every smile — captured in stunning detail with our artistic eye and premium equipment.',
    features: ['Candid & Traditional', '4K Resolution', 'Same-Day Preview'],
  },
  {
    icon: <HiFilm className="text-3xl" />,
    title: 'Cinematic Videography',
    desc: 'Hollywood-grade cinematic films that transform your wedding into a blockbuster love story.',
    features: ['4K Cinematic', 'Drone Shots', 'Professional Audio'],
  },
  {
    icon: <HiHeart className="text-3xl" />,
    title: 'Pre-Wedding Shoots',
    desc: 'Romantic, creative, and fun pre-wedding sessions at stunning locations across Jharkhand and beyond.',
    features: ['Outdoor & Indoor', 'Creative Concepts', 'Wardrobe Guidance'],
  },
  {
    icon: <HiSparkles className="text-3xl" />,
    title: 'Bridal Portraits',
    desc: 'Elegant and timeless bridal portraits that celebrate the beauty and grace of every bride.',
    features: ['Studio & Location', 'Makeup Artist Team', 'Premium Retouching'],
  },
  {
    icon: <HiStar className="text-3xl" />,
    title: 'Event Coverage',
    desc: 'Comprehensive coverage of all wedding events from Haldi & Mehndi to Reception & Vidaai.',
    features: ['Multi-Event', 'Full Day Coverage', 'Highlight Reels'],
  },
  {
    icon: <HiGlobe className="text-3xl" />,
    title: 'Drone Shoots',
    desc: 'Breathtaking aerial perspectives that add a cinematic grandeur to your wedding film and photos.',
    features: ['4K Aerial', 'Licensed Pilots', 'Bird\'s Eye Views'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative section-padding bg-dark-400 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          title="Our Services"
          subtitle="Premium wedding photography and cinematography services tailored for your perfect day."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, i) => (
            <motion.div key={service.title} variants={fadeIn('up', i * 0.05)}>
              <GlassCard className="p-8 h-full group cursor-pointer relative overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:via-transparent group-hover:to-gold/3 transition-all duration-700" />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl glass-gold flex items-center justify-center text-gold group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-500">
                    {service.icon}
                  </div>
                  {/* Decorative circle */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full border border-gold/20 group-hover:border-gold/40 transition-colors" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-semibold text-cream mb-3 group-hover:text-gold transition-colors duration-300 relative">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-soft/60 text-sm leading-relaxed mb-6 relative">
                  {service.desc}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 relative">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1 rounded-full bg-gold/5 border border-gold/10 text-gold/80 group-hover:border-gold/25 transition-colors"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/50 transition-all duration-500" />
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
