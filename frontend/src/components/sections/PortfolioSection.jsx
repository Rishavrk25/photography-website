import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animations';
import SectionHeading from '../ui/SectionHeading';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

const categories = ['All', 'Weddings', 'Pre-Wedding', 'Bridal', 'Couple Shoots', 'Traditional', 'Cinematic Reels'];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', category: 'Weddings', title: 'Royal Wedding Ceremony', aspect: 'tall' },
  { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', category: 'Pre-Wedding', title: 'Sunset Romance', aspect: 'wide' },
  { src: 'https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=800&q=80', category: 'Bridal', title: 'Bridal Elegance', aspect: 'tall' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', category: 'Weddings', title: 'Vow Exchange', aspect: 'square' },
  { src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80', category: 'Couple Shoots', title: 'Together Forever', aspect: 'wide' },
  { src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80', category: 'Traditional', title: 'Sacred Rituals', aspect: 'tall' },
  { src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80', category: 'Weddings', title: 'Grand Celebration', aspect: 'square' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', category: 'Pre-Wedding', title: 'Love in the City', aspect: 'wide' },
  { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', category: 'Couple Shoots', title: 'Golden Hour Magic', aspect: 'tall' },
  { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80', category: 'Bridal', title: 'The Beautiful Bride', aspect: 'square' },
  { src: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', category: 'Traditional', title: 'Mehndi Ceremony', aspect: 'wide' },
  { src: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800&q=80', category: 'Cinematic Reels', title: 'Cinematic Frame', aspect: 'tall' },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const onLightGalleryInit = useCallback((detail) => {
    // LightGallery instance ready
  }, []);

  return (
    <section id="portfolio" className="relative section-padding bg-dark-300 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/3 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          title="Our Portfolio"
          subtitle="A glimpse into the beautiful moments we've had the privilege to capture."
        />

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
          variants={fadeIn('up')}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-gold-dark to-gold text-primary shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'glass text-gray-soft/70 hover:text-cream hover:border-gold/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <LightGallery
          onInit={onLightGalleryInit}
          speed={500}
          plugins={[lgZoom, lgThumbnail]}
          elementClassNames="masonry-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.a
                key={`${img.src}-${activeCategory}`}
                href={img.src}
                data-src={img.src}
                data-sub-html={`<h4 class="font-heading">${img.title}</h4><p>${img.category}</p>`}
                className="masonry-item block relative group rounded-2xl overflow-hidden cursor-pointer"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
              >
                <div className={`relative ${
                  img.aspect === 'tall' ? 'aspect-[3/4]' : img.aspect === 'wide' ? 'aspect-[4/3]' : 'aspect-square'
                }`}>
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-400/90 via-dark-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <span className="text-gold text-xs uppercase tracking-[0.2em] mb-1">{img.category}</span>
                    <h4 className="font-heading text-xl font-semibold text-cream transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {img.title}
                    </h4>

                    {/* View icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-gold/60 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>

                  {/* Gold corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-gold/0 border-l-[40px] border-l-transparent group-hover:border-t-gold/20 transition-all duration-500" />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </LightGallery>
      </div>
    </section>
  );
}
