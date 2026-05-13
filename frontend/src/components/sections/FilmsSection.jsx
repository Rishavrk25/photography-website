import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animations';
import SectionHeading from '../ui/SectionHeading';
import { HiPlay, HiX } from 'react-icons/hi';

const films = [
  {
    id: 1,
    title: 'Priya & Rahul — A Royal Wedding',
    category: 'Wedding Film',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '8:24',
  },
  {
    id: 2,
    title: 'Ananya & Vikram — Pre-Wedding Jamshedpur',
    category: 'Pre-Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '4:12',
  },
  {
    id: 3,
    title: 'Sneha & Amit — Cinematic Highlights',
    category: 'Wedding Highlight',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '5:30',
  },
  {
    id: 4,
    title: 'Ritu & Saurav — A Love Story',
    category: 'Cinematic Reel',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '3:45',
  },
];

export default function FilmsSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="films" className="relative section-padding bg-dark-400 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-red-deep/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          title="Every Love Story Deserves a Film"
          subtitle="Watch our cinematic wedding films that turn your special day into a timeless masterpiece."
        />

        {/* Films Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {films.map((film, i) => (
            <motion.div
              key={film.id}
              variants={fadeIn('up', i * 0.05)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden"
              onClick={() => setActiveVideo(film)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <img
                  src={film.thumbnail}
                  alt={film.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-400 via-dark-400/40 to-transparent group-hover:via-dark-400/60 transition-all duration-500" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-20 h-20 rounded-full border-2 border-gold/60 flex items-center justify-center bg-dark-400/30 backdrop-blur-sm group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HiPlay className="text-gold text-3xl ml-1" />
                  </motion.div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs text-gold font-medium">
                  {film.duration}
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-gold text-xs uppercase tracking-[0.2em]">{film.category}</span>
                  <h3 className="font-heading text-xl font-semibold text-cream mt-1 group-hover:text-gold transition-colors">
                    {film.title}
                  </h3>
                </div>

                {/* Cinematic bars */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-dark-400/80" />
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-dark-400/80" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-12"
          variants={fadeIn('up')}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <a
            href="https://youtube.com/@shubhamvideophotography"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/60 transition-all duration-300 text-sm"
          >
            Watch All Films on YouTube
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>

            {/* Close button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center text-cream hover:text-gold transition-colors cursor-pointer"
            >
              <HiX size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
