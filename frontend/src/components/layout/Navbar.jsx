import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Films', href: '#films' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark-400/90 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.5)] border-b border-gold/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center group-hover:border-gold-light transition-colors">
                  <div className="w-4 h-4 rounded-full bg-gold group-hover:bg-gold-light transition-colors" />
                </div>
                <div className="absolute -inset-1 rounded-full border border-gold/20 group-hover:border-gold/40 transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold text-gradient-gold leading-none">
                  Shubham
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gray-soft/60 font-light">
                  Video Photography
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-4 py-2 text-sm tracking-wide transition-all duration-300 rounded-full ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-gold'
                      : 'text-cream/70 hover:text-cream'
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.replace('#', '') && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full bg-gold/10 border border-gold/20"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="hidden sm:inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-primary text-sm font-semibold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300"
              >
                Book Now
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-cream hover:text-gold transition-colors p-2"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-dark-400/95 backdrop-blur-xl border-l border-gold/10 p-8 pt-24 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`px-4 py-3 rounded-xl text-lg transition-all ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-gold bg-gold/10 border border-gold/20'
                        : 'text-cream/70 hover:text-cream hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-gold/10">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-primary font-semibold"
                >
                  Book Your Shoot
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
