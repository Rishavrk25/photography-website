import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animations';
import SectionHeading from '../ui/SectionHeading';
import AnimatedCounter from '../ui/AnimatedCounter';
import { HiCamera, HiHeart, HiStar, HiFilm } from 'react-icons/hi';

const timeline = [
  { year: '2019', title: 'The Beginning', desc: 'Started with a passion for capturing love stories in Ranchi.' },
  { year: '2020', title: 'Going Cinematic', desc: 'Invested in cinema-grade equipment and filmmaking techniques.' },
  { year: '2021', title: 'First 100 Weddings', desc: 'Reached a milestone of 100+ weddings across Jharkhand.' },
  { year: '2023', title: 'Premium Studio', desc: 'Opened our professional studio with state-of-the-art equipment.' },
  { year: '2025', title: 'Industry Leaders', desc: '500+ events covered, known as the top wedding studio in Ranchi.' },
];

const counters = [
  { end: 500, suffix: '+', label: 'Events Covered', icon: <HiCamera /> },
  { end: 50, suffix: '+', label: 'Happy Couples', icon: <HiHeart /> },
  { end: 5, suffix: '+', label: 'Years Experience', icon: <HiStar /> },
  { end: 15, suffix: '+', label: 'Team Members', icon: <HiFilm /> },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative section-padding bg-dark-300 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-deep/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Our Story"
          subtitle="We don't just capture photos — we capture stories."
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image Side */}
          <motion.div
            className="relative"
            variants={fadeIn('right')}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80"
                  alt="Shubham - Founder & Lead Photographer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-400/60 via-transparent to-transparent" />
              </div>

              {/* Floating accent card */}
              <motion.div
                className="absolute -bottom-6 -right-6 glass-gold rounded-2xl p-6 max-w-[200px]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="font-heading text-3xl font-bold text-gradient-gold">5+</p>
                <p className="text-xs text-gray-soft/70 uppercase tracking-wider mt-1">Years of Excellence</p>
              </motion.div>

              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/30 rounded-tl-2xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold/30 rounded-br-2xl" />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            className="space-y-6"
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeIn('left')}>
              <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">About Us</span>
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-cream mt-3 leading-tight">
                Where Every Frame Tells
                <span className="text-gradient-gold"> Your Love Story</span>
              </h3>
            </motion.div>

            <motion.p variants={fadeIn('left', 0.1)} className="text-gray-soft/70 leading-relaxed">
              At Shubham Video Photography, we believe that your wedding day is the most 
              beautiful chapter of your life. Our team of passionate photographers and 
              cinematographers are dedicated to preserving every emotion, every smile, 
              and every tear of joy.
            </motion.p>

            <motion.p variants={fadeIn('left', 0.2)} className="text-gray-soft/70 leading-relaxed">
              With over 5 years of experience in the wedding industry, we've mastered 
              the art of blending traditional photography with modern cinematic techniques. 
              From intimate ceremonies to grand celebrations, we craft visual narratives 
              that you'll cherish for generations.
            </motion.p>

            <motion.p variants={fadeIn('left', 0.3)} className="text-gray-soft/70 leading-relaxed italic border-l-2 border-gold/40 pl-4">
              "We don't just take photographs — we capture the essence of your love, 
              the warmth of your family, and the magic of your moments."
            </motion.p>

            {/* Signature */}
            <motion.div variants={fadeIn('left', 0.4)} className="flex items-center gap-4 pt-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-primary font-heading font-bold text-lg">
                S
              </div>
              <div>
                <p className="font-heading text-cream font-semibold">Shubham</p>
                <p className="text-xs text-gold/70">Founder & Lead Photographer</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Counters */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-gold/10"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {counters.map((counter) => (
            <motion.div key={counter.label} variants={fadeIn('up')}>
              <AnimatedCounter {...counter} />
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mt-20"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h3 className="font-heading text-2xl font-bold text-center text-cream mb-12">
            Our <span className="text-gradient-gold">Journey</span>
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold/40 via-gold/20 to-transparent md:-translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  variants={fadeIn(i % 2 === 0 ? 'right' : 'left')}
                  className={`relative flex items-center gap-8 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gold border-4 border-dark-300 -translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <span className="text-gold font-heading text-xl font-bold">{item.year}</span>
                    <h4 className="font-heading text-lg font-semibold text-cream mt-1">{item.title}</h4>
                    <p className="text-gray-soft/60 text-sm mt-1">{item.desc}</p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
