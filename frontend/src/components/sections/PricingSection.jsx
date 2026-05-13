import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animations';
import SectionHeading from '../ui/SectionHeading';
import GoldButton from '../ui/GoldButton';
import { HiCheck, HiStar } from 'react-icons/hi';

const packages = [
  {
    name: 'Silver', price: '25,000', period: 'per event', featured: false,
    features: ['1 Photographer', '200+ Edited Photos', 'Traditional Photography', 'Same Day Highlights', 'Online Gallery', 'Basic Retouching'],
    unavailable: ['Cinematic Video', 'Drone Coverage', 'Pre-Wedding'],
  },
  {
    name: 'Gold', price: '55,000', period: 'per event', featured: true, badge: 'Most Popular',
    features: ['2 Photographers', '500+ Edited Photos', 'Candid + Traditional', 'Cinematic Highlight Film', 'Online Gallery + USB', 'Premium Retouching', 'Pre-Wedding Shoot', 'Drone Coverage'],
    unavailable: [],
  },
  {
    name: 'Platinum', price: '1,00,000', period: 'per event', featured: false,
    features: ['3+ Photographers', '1000+ Edited Photos', 'Full Cinematic Film', 'All Events Coverage', 'Drone Aerial Shots', 'Pre-Wedding Shoot', 'Premium Photo Album', 'Same Day Edit', 'Online Gallery + USB', 'Dedicated Editor'],
    unavailable: [],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative section-padding bg-dark-400 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/3 rounded-full blur-[150px]" />
      </div>
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading title="Investment in Memories" subtitle="Choose the perfect package for your special day." />
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start" variants={staggerContainer(0.15)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          {packages.map((pkg, i) => (
            <motion.div key={pkg.name} variants={fadeIn('up', i * 0.1)} className={`relative rounded-3xl overflow-hidden ${pkg.featured ? 'md:-mt-4' : ''}`}>
              {pkg.badge && (
                <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-primary text-xs font-bold text-center py-2 uppercase tracking-[0.2em]">
                  <HiStar className="inline mr-1" />{pkg.badge}
                </div>
              )}
              <div className={`p-8 h-full flex flex-col ${pkg.featured ? 'glass-gold border-gold/30 shadow-[0_0_60px_rgba(212,175,55,0.15)]' : 'glass'}`} style={{ paddingTop: pkg.badge ? '3.5rem' : '2rem' }}>
                <div className="mb-6">
                  <h3 className={`font-heading text-2xl font-bold ${pkg.featured ? 'text-gradient-gold' : 'text-cream'}`}>{pkg.name}</h3>
                  <p className="text-gray-soft/40 text-xs uppercase tracking-wider mt-1">Package</p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-gold/60 text-lg">₹</span>
                    <span className={`font-heading text-4xl md:text-5xl font-bold ${pkg.featured ? 'text-gradient-gold' : 'text-cream'}`}>{pkg.price}</span>
                  </div>
                  <p className="text-gray-soft/50 text-sm mt-1">{pkg.period}</p>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-8" />
                <div className="flex-1 space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${pkg.featured ? 'bg-gold/20 text-gold' : 'bg-gold/10 text-gold/70'}`}><HiCheck className="text-xs" /></div>
                      <span className="text-gray-soft/70 text-sm">{f}</span>
                    </div>
                  ))}
                  {pkg.unavailable?.map((f) => (
                    <div key={f} className="flex items-center gap-3 opacity-40">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-white/5"><span className="text-xs text-gray-soft/30">✕</span></div>
                      <span className="text-gray-soft/40 text-sm line-through">{f}</span>
                    </div>
                  ))}
                </div>
                <GoldButton variant={pkg.featured ? 'filled' : 'outline'} className="w-full" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Choose {pkg.name}
                </GoldButton>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.p className="text-center text-gray-soft/40 text-sm mt-10" variants={fadeIn('up')} initial="hidden" whileInView="show" viewport={{ once: true }}>
          * All packages are customizable. Contact us for a personalized quote.
        </motion.p>
      </div>
    </section>
  );
}
