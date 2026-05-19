import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import ProfileModal from "./ProfileModal";
import {
  Camera,
  Film,
  Image as ImageIcon,
  Video,
  Heart,
  MapPin,
  Phone,
  Mail,
  Play,
  Star,
  CheckCircle2,
  Menu,
  X,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Send,
  Bot,
  User,
  Loader2,
  ChevronRight,
} from "lucide-react";
const Instagram = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

// Production-ready global styles focusing on clean typography and smooth scrolling
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Poppins:wght@300;400;500;600&display=swap');

  :root {
    --color-bg: #09090b; /* zinc-950 */
    --color-surface: #18181b; /* zinc-900 */
    --color-gold: #D4AF37;
    --color-gold-muted: rgba(212, 175, 55, 0.2);
    --color-white: #fafafa;
    --color-muted: #a1a1aa; /* zinc-400 */
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-white);
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6, .font-playfair {
    font-family: 'Playfair Display', serif;
  }

  /* Elegant Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-bg);
  }
  ::-webkit-scrollbar-thumb {
    background: #3f3f46;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-gold);
  }

  /* CSS Column Masonry */
  .masonry-grid {
    column-count: 1;
    column-gap: 1rem;
  }
  @media (min-width: 640px) { .masonry-grid { column-count: 2; } }
  @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
  
  .masonry-item {
    break-inside: avoid;
    margin-bottom: 1rem;
    display: block;
  }

  /* Utilities */
  .text-balance {
    text-wrap: balance;
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const PORTFOLIO_IMAGES = [
  {
    id: 1,
    category: "wedding",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    category: "bridal",
    url: "https://images.unsplash.com/photo-1532712938736-59b10ce0944b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    category: "pre-wedding",
    url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    category: "traditional",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    category: "wedding",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    category: "couple",
    url: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    category: "bridal",
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
  },
];

const SERVICES = [
  {
    icon: <Camera size={28} strokeWidth={1.5} />,
    title: "Wedding Photography",
    desc: "Timeless moments captured with artistic precision and emotional depth.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: <Video size={28} strokeWidth={1.5} />,
    title: "Cinematic Videography",
    desc: "Story-driven cinematic films that let you relive your special day.",
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: <Heart size={28} strokeWidth={1.5} />,
    title: "Pre-Wedding Shoots",
    desc: "Romantic and creative sessions tailored to your unique love story.",
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: <ImageIcon size={28} strokeWidth={1.5} />,
    title: "Bridal Portraits",
    desc: "Elegant and glamorous portraits highlighting the bride's true essence.",
    img: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=800",
  },
];

const REVIEWS = [
  {
    name: "Aarti & Rahul",
    text: "Shubham and his team made our wedding look like a movie. The attention to detail and emotions captured are priceless!",
    rating: 5,
    date: "Oct 2023",
  },
  {
    name: "Priya & Vikram",
    text: "Absolutely stunned by our pre-wedding photos. Professional, creative, and extremely easy to work with.",
    rating: 5,
    date: "Jan 2024",
  },
  {
    name: "Neha & Siddharth",
    text: "The cinematic video brought tears to our eyes. They truly know how to tell a love story.",
    rating: 5,
    date: "Mar 2024",
  },
];

// Section Header for consistent typography across sections
const SectionHeader = ({ subtitle, title, centered = false }) => (
  <div className={`mb-16 md:mb-24 ${centered ? "text-center" : ""}`}>
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="inline-block text-[#D4AF37] uppercase tracking-[0.25em] text-xs font-medium mb-4"
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: 0.1 }}
      className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight text-balance"
    >
      {title}
    </motion.h2>
  </div>
);

// Minimalist loading screen instead of heavy animations
const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950"
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="font-playfair text-3xl md:text-4xl text-white tracking-widest font-medium">
            SHUBHAM
          </h1>
          <div
            className="h-[1px] w-0 bg-[#D4AF37] mx-auto mt-4"
            style={{ animation: "expandLine 1.5s ease-out forwards" }}
          />
          <style>{`@keyframes expandLine { to { width: 100%; } }`}</style>
          <p className="text-[#D4AF37] tracking-[0.3em] text-[10px] mt-4 uppercase">
            Photography
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    "Home",
    "About",
    "Services",
    "Portfolio",
    "Films",
    "Pricing",
  ];

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? "bg-zinc-950/90 backdrop-blur-md py-4 border-b border-white/5 shadow-sm" : "bg-gradient-to-b from-black/60 to-transparent py-6 md:py-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Brand */}
          <div
            className="cursor-pointer group flex flex-col items-center"
            onClick={() => scrollToSection("home")}
          >
            <h1 className="font-playfair text-xl md:text-2xl font-semibold tracking-widest text-white group-hover:text-[#D4AF37] transition-colors">
              SHUBHAM
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-300 hover:text-white transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-transparent border border-[#D4AF37] text-[#D4AF37] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-zinc-950 transition-all duration-300"
            >
              Inquire
            </button>
            {isAuthenticated ? (
              <ProfileModal />
            ) : (
              <Link
                to="/login"
                className="bg-transparent border border-[#D4AF37] text-[#D4AF37] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-zinc-950 transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2 -mr-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col"
          >
            <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5">
              <h1 className="font-playfair text-xl font-semibold tracking-widest text-white">
                SHUBHAM
              </h1>
              <button
                className="text-white p-2 -mr-2 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-8 px-6">
              {navLinks.map((link, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className="font-playfair text-3xl text-zinc-300 hover:text-[#D4AF37] transition-colors"
                >
                  {link}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => scrollToSection("contact")}
                className="mt-8 border border-[#D4AF37] text-[#D4AF37] w-full max-w-xs py-4 text-xs font-medium uppercase tracking-[0.2em]"
              >
                Book Consultation
              </motion.button>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                {isAuthenticated ? (
                  <div className="mt-4">
                    <ProfileModal />
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="font-playfair text-xl text-zinc-300 hover:text-[#D4AF37] transition-colors mt-4 block"
                  >
                    Login / Signup
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section
      id="home"
      className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* Optimized Background Image with gentle scale */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 origin-center"
      >
        <motion.div
          animate={{ scale: [1, 1.05] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2400"
            alt="Cinematic Wedding"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
        {/* Gradients for text legibility */}
        <div className="absolute inset-0 bg-zinc-950/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
      </motion.div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center mt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] md:text-xs font-medium flex items-center justify-center gap-6 mb-8"
        >
          <span className="w-8 h-[1px] bg-[#D4AF37]/50" />
          Premium Wedding Photography
          <span className="w-8 h-[1px] bg-[#D4AF37]/50" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-playfair text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 text-white tracking-tight"
        >
          Capturing Emotions, <br className="hidden md:block" />
          <span className="italic font-light text-zinc-300">Timeless</span>{" "}
          Memories
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto bg-white text-zinc-950 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors"
          >
            Book Your Shoot
          </a>
          <a
            href="#films"
            className="w-full sm:w-auto border border-white/30 text-white px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-zinc-950 transition-colors flex items-center justify-center"
          >
            <Play size={14} className="mr-2" /> Watch Films
          </a>
        </motion.div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-zinc-400 text-[9px] uppercase tracking-[0.3em] mb-2">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Editorial Image Composition */}
        <div className="lg:w-1/2 relative w-full aspect-square md:aspect-auto md:h-[600px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 w-3/4 h-3/4 z-10"
          >
            <img
              src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800"
              alt="Photographer at work"
              className="w-full h-full object-cover shadow-2xl"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-0 right-0 w-2/3 h-2/3 z-0"
          >
            <img
              src="https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=600"
              alt="Couple portrait"
              className="w-full h-full object-cover border-8 border-zinc-950 grayscale hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Minimalist Text Content */}
        <div className="lg:w-1/2">
          <SectionHeader
            subtitle="Our Philosophy"
            title="Visual Poetry for the Modern Romantic"
          />

          <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-sm md:text-base">
            <p>
              Based in Ranchi, Shubham Photography was born out of a profound
              passion for preserving life's most fleeting, beautiful moments. We
              believe that your wedding day is a tapestry of unscripted
              emotions, stolen glances, and joyous celebrations.
            </p>
            <p>
              Our approach blends unobtrusive photojournalism with fine-art
              portraiture. We don't orchestrate your day; we observe it,
              crafting a cinematic collection of memories that will transport
              you back to the exact feeling of those moments, decades from now.
            </p>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8 flex items-center justify-between">
            <div>
              <p className="font-playfair text-2xl text-white">Saraj Kamat</p>
              <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] mt-1">
                Founder & Lead Photographer
              </p>
            </div>
            <div className="font-playfair italic text-3xl text-white opacity-60 tracking-wider">
              Saraj.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-zinc-900 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader
          subtitle="Expertise"
          title="Our Premium Offerings"
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative h-[420px] overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-xl border border-zinc-800/50 hover:border-[#D4AF37]/50 transition-all duration-500 flex flex-col justify-between p-8 shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/10"
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full z-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors duration-300 border border-[#D4AF37]/20"
                >
                  <div className="text-[#D4AF37]">{service.icon}</div>
                </motion.div>

                {/* Title */}
                <h3 className="font-playfair text-2xl font-semibold text-white mb-4 leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-sm font-light leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {service.desc}
                </p>
              </div>

              {/* CTA Footer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="relative z-10 mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between"
              >
                <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-medium">
                  Learn More
                </span>
                <ArrowRight
                  size={16}
                  className="text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.div>

              {/* Decorative Border Animation */}
              <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#D4AF37]/50 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#D4AF37]/50 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#D4AF37]/50 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#D4AF37]/50 rounded-br-lg" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
            Each service is customized to capture the essence of your unique
            story. Let's discuss your vision and create something extraordinary
            together.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-white text-zinc-950 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all duration-300 rounded-lg group"
          >
            Explore Packages
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const PortfolioSection = () => {
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImage]);

  const categories = ["all", "wedding", "pre-wedding", "bridal", "couple"];
  const filteredImages =
    filter === "all"
      ? PORTFOLIO_IMAGES
      : PORTFOLIO_IMAGES.filter((img) => img.category === filter);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <SectionHeader subtitle="Selected Works" title="The Gallery" />

          {/* Elegant Pill Filters */}
          <div className="flex flex-wrap gap-2 pb-4 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] px-5 py-2 rounded-full transition-all duration-300 border ${
                  filter === cat
                    ? "bg-white text-zinc-950 border-white font-medium"
                    : "border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
                }`}
              >
                {cat.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Clean CSS Masonry */}
        <motion.div layout className="masonry-grid">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={img.id}
                className="masonry-item relative group cursor-pointer overflow-hidden bg-zinc-900"
                onClick={() => setSelectedImage(img.url)}
              >
                <img
                  src={img.url}
                  alt={img.category}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Minimal Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] mb-1">
                    {img.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Refined Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 md:top-8 md:right-8 text-zinc-400 hover:text-white transition-colors focus:outline-none"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} strokeWidth={1.5} />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Fullscreen"
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const FilmsSection = () => {
  return (
    <section
      id="films"
      className="py-24 md:py-32 bg-zinc-900 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          subtitle="Cinematography"
          title="Stories in Motion"
          centered={true}
        />

        {/* Main Featured Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full max-w-5xl mx-auto aspect-video group cursor-pointer overflow-hidden bg-zinc-950 shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1600"
            alt="Film Thumbnail"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/40 transition-colors duration-500 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center pl-1 group-hover:scale-110 group-hover:bg-white transition-all duration-300 border border-white/20">
              <Play
                className="text-white group-hover:text-zinc-950"
                size={28}
                strokeWidth={1.5}
              />
            </div>
          </div>
          <div className="absolute bottom-8 left-8">
            <p className="text-white font-playfair text-3xl mb-1">
              Aarti & Rahul
            </p>
            <p className="text-zinc-300 text-[10px] uppercase tracking-[0.2em]">
              The Royal Wedding Highlights
            </p>
          </div>
        </motion.div>

        {/* Small Reels Row */}
        <div className="mt-8 flex justify-center gap-4 md:gap-6 overflow-x-auto pb-6 hide-scrollbar max-w-5xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="min-w-[200px] md:min-w-[280px] aspect-video relative group cursor-pointer flex-shrink-0 bg-zinc-800 overflow-hidden"
            >
              <img
                src={`https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600&sig=${item}`}
                alt="Reel Thumbnail"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play
                  className="text-white drop-shadow-lg"
                  size={24}
                  strokeWidth={1.5}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  const { isAuthenticated, authToken } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingData, setBookingData] = useState({
    names: "",
    email: "",
    phone: "",
    event_date: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [focusedFields, setFocusedFields] = useState({});

  const handleFieldFocus = (fieldName) => {
    setFocusedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleFieldBlur = (fieldName) => {
    setFocusedFields((prev) => ({ ...prev, [fieldName]: false }));
  };

  const packageInfo = {
    silver: { label: "Silver", price: 50000 },
    gold: { label: "Gold", price: 85000 },
    platinum: { label: "Platinum", price: 150000 },
  };

  const handleBookingChange = (e) => {
    const { id, value } = e.target;
    setBookingData((prev) => ({ ...prev, [id]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isAuthenticated) {
      setError("Please login to book a package.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          package: selectedPackage,
          names: bookingData.names,
          email: bookingData.email,
          phone: bookingData.phone,
          event_date: bookingData.event_date,
          notes: bookingData.notes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setBookingData({
          names: "",
          email: "",
          phone: "",
          event_date: "",
          notes: "",
        });

        setTimeout(() => {
          setSuccess(false);
          setSelectedPackage(null);
        }, 3000);
      } else {
        setError(data.message || "Failed to submit booking. Please try again.");
      }
    } catch (err) {
      setError("Connection failed. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="py-24 md:py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          subtitle="Investment"
          title="Curated Collections"
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {/* Silver */}
          <div className="p-8 md:p-10 border border-white/10 bg-zinc-900/50">
            <h3 className="font-playfair text-2xl text-white mb-2">Silver</h3>
            <p className="text-3xl font-light text-[#D4AF37] mb-8">
              ₹50k<span className="text-xs text-zinc-500">/day</span>
            </p>
            <ul className="space-y-4 mb-10 text-sm text-zinc-400 font-light">
              <li className="flex items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37] mr-3" />{" "}
                Traditional Photography
              </li>
              <li className="flex items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37] mr-3" />{" "}
                Candid Coverage
              </li>
              <li className="flex items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37] mr-3" />{" "}
                Standard Videography
              </li>
              <li className="flex items-center opacity-40">
                <X size={16} className="mr-3" /> Cinematic Teaser
              </li>
              <li className="flex items-center opacity-40">
                <X size={16} className="mr-3" /> Drone Shoot
              </li>
            </ul>
            <button
              onClick={() => setSelectedPackage("silver")}
              className="w-full border border-white/20 py-4 text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-zinc-950 transition-colors"
            >
              Book Silver
            </button>
          </div>

          {/* Gold (Highlighted) */}
          <div className="relative p-8 md:p-10 border border-[#D4AF37] bg-zinc-900 shadow-2xl shadow-[#D4AF37]/5 md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] text-zinc-950 text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5">
              Most Popular
            </div>
            <h3 className="font-playfair text-3xl text-white mb-2">Gold</h3>
            <p className="text-4xl font-light text-[#D4AF37] mb-8">
              ₹85k<span className="text-xs text-zinc-500">/day</span>
            </p>
            <ul className="space-y-4 mb-10 text-sm text-zinc-300 font-light">
              <li className="flex items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37] mr-3" />{" "}
                Everything in Silver
              </li>
              <li className="flex items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37] mr-3" />{" "}
                Cinematic Videography
              </li>
              <li className="flex items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37] mr-3" /> 3-5
                Min Teaser Film
              </li>
              <li className="flex items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37] mr-3" /> Drone
                Shoot (Outdoor)
              </li>
              <li className="flex items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37] mr-3" />{" "}
                Premium Photobook
              </li>
            </ul>
            <button
              onClick={() => setSelectedPackage("gold")}
              className="w-full bg-[#D4AF37] text-zinc-950 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
            >
              Book Gold
            </button>
          </div>

          {/* Platinum */}
          <div className="p-8 md:p-10 border border-white/10 bg-zinc-900/50">
            <h3 className="font-playfair text-2xl text-white mb-2">Platinum</h3>
            <p className="text-3xl font-light text-[#D4AF37] mb-8">
              ₹1.5L<span className="text-xs text-zinc-500">/day</span>
            </p>
            <ul className="space-y-4 mb-10 text-sm text-zinc-400 font-light">
              <li className="flex items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37] mr-3" />{" "}
                Everything in Gold
              </li>
              <li className="flex items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37] mr-3" />{" "}
                Pre-Wedding Shoot
              </li>
              <li className="flex items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37] mr-3" /> Same
                Day Edit Trailer
              </li>
              <li className="flex items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37] mr-3" />{" "}
                Luxury Album Suite
              </li>
              <li className="flex items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37] mr-3" /> Lead
                By Shubham
              </li>
            </ul>
            <button
              onClick={() => setSelectedPackage("platinum")}
              className="w-full border border-white/20 py-4 text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-zinc-950 transition-colors"
            >
              Book Platinum
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPackage(null)}
              className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[111] flex items-center justify-center p-4 md:p-12"
            >
              <div className="w-full max-w-2xl bg-zinc-900 border border-[#D4AF37]/30 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-[#D4AF37]/15 to-transparent p-6 md:p-8 border-b border-[#D4AF37]/20 flex justify-between items-center">
                  <div>
                    <h2 className="font-playfair text-2xl text-white">
                      Book {packageInfo[selectedPackage]?.label}
                    </h2>
                    <p className="text-[#D4AF37] text-sm mt-1">
                      ₹{packageInfo[selectedPackage]?.price?.toLocaleString()} /
                      day
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedPackage(null)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleBookingSubmit}
                  className="p-6 md:p-8 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative pt-2">
                      <label
                        htmlFor="names"
                        className={`absolute text-xs uppercase tracking-[0.1em] duration-300 transform origin-left transition-all ${
                          focusedFields.names || bookingData.names
                            ? "text-[#D4AF37] -translate-y-5 scale-75 top-0"
                            : "text-zinc-500 translate-y-2 scale-100 top-3"
                        }`}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="names"
                        value={bookingData.names}
                        onChange={handleBookingChange}
                        onFocus={() => handleFieldFocus("names")}
                        onBlur={() => handleFieldBlur("names")}
                        required
                        className="block w-full px-0 py-2 text-sm text-white bg-transparent border-0 border-b border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                    <div className="relative pt-2">
                      <label
                        htmlFor="email"
                        className={`absolute text-xs uppercase tracking-[0.1em] duration-300 transform origin-left transition-all ${
                          focusedFields.email || bookingData.email
                            ? "text-[#D4AF37] -translate-y-5 scale-75 top-0"
                            : "text-zinc-500 translate-y-2 scale-100 top-3"
                        }`}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={bookingData.email}
                        onChange={handleBookingChange}
                        onFocus={() => handleFieldFocus("email")}
                        onBlur={() => handleFieldBlur("email")}
                        required
                        className="block w-full px-0 py-2 text-sm text-white bg-transparent border-0 border-b border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative pt-2">
                      <label
                        htmlFor="phone"
                        className={`absolute text-xs uppercase tracking-[0.1em] duration-300 transform origin-left transition-all ${
                          focusedFields.phone || bookingData.phone
                            ? "text-[#D4AF37] -translate-y-5 scale-75 top-0"
                            : "text-zinc-500 translate-y-2 scale-100 top-3"
                        }`}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={bookingData.phone}
                        onChange={handleBookingChange}
                        onFocus={() => handleFieldFocus("phone")}
                        onBlur={() => handleFieldBlur("phone")}
                        className="block w-full px-0 py-2 text-sm text-white bg-transparent border-0 border-b border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                    <div className="relative pt-2">
                      <label
                        htmlFor="event_date"
                        className={`absolute text-xs uppercase tracking-[0.1em] duration-300 transform origin-left transition-all ${
                          focusedFields.event_date || bookingData.event_date
                            ? "text-[#D4AF37] -translate-y-5 scale-75 top-0"
                            : "text-zinc-500 translate-y-2 scale-100 top-3"
                        }`}
                      >
                        Event Date
                      </label>
                      <input
                        type="date"
                        id="event_date"
                        value={bookingData.event_date}
                        onChange={handleBookingChange}
                        onFocus={() => handleFieldFocus("event_date")}
                        onBlur={() => handleFieldBlur("event_date")}
                        className="block w-full px-0 py-2 text-sm text-white bg-transparent border-0 border-b border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] transition-colors cursor-pointer"
                        style={{
                          colorScheme: "dark",
                          color: bookingData.event_date
                            ? "white"
                            : "transparent",
                        }}
                      />
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <label
                      htmlFor="notes"
                      className={`absolute text-xs uppercase tracking-[0.1em] duration-300 transform origin-left transition-all ${
                        focusedFields.notes || bookingData.notes
                          ? "text-[#D4AF37] -translate-y-5 scale-75 top-0"
                          : "text-zinc-500 translate-y-2 scale-100 top-3"
                      }`}
                    >
                      Additional Notes
                    </label>
                    <textarea
                      id="notes"
                      value={bookingData.notes}
                      onChange={handleBookingChange}
                      onFocus={() => handleFieldFocus("notes")}
                      onBlur={() => handleFieldBlur("notes")}
                      rows="3"
                      className="block w-full px-0 py-2 text-sm text-white bg-transparent border-0 border-b border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] resize-none transition-colors"
                    ></textarea>
                  </div>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-red-950/20 border border-red-600/30 rounded-lg text-red-400 text-sm"
                      >
                        {error}
                      </motion.div>
                    )}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-green-950/20 border border-green-600/30 rounded-lg text-green-400 text-sm"
                      >
                        ✓ Booking submitted successfully! We'll contact you
                        within 24 hours.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="flex-1 bg-[#D4AF37] text-zinc-950 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={14} className="mr-2 animate-spin" />
                          Booking...
                        </>
                      ) : (
                        <>
                          Confirm Booking
                          <ArrowRight size={14} className="ml-2" />
                        </>
                      )}
                    </motion.button>
                    <button
                      type="button"
                      onClick={() => setSelectedPackage(null)}
                      className="flex-1 border border-zinc-600 text-zinc-400 py-3 rounded-lg hover:bg-zinc-800/50 transition-colors text-[11px] font-medium uppercase tracking-[0.2em]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

const TestimonialsSection = () => {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setReviewName(user.name || "");
    }
  }, [user]);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/testimonials");
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        // Map backend format to frontend format
        const mapped = data.data.map(t => ({
          name: t.client_name,
          text: t.content,
          rating: t.rating,
          date: new Date(t.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        }));
        setTestimonials(mapped.slice(0, 5));
      } else {
        setTestimonials(REVIEWS);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      setTestimonials(REVIEWS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewContent.trim()) {
      setError("Please fill out all fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          client_name: reviewName,
          rating: reviewRating,
          content: reviewContent
        })
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setReviewContent("");
        setReviewRating(5);
        fetchTestimonials();
        setTimeout(() => {
          setSubmitSuccess(false);
          setShowReviewForm(false);
        }, 4000);
      } else {
        const errData = await res.json();
        setError(errData.message || "Failed to submit review.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  const displayReviews = testimonials.length > 0 ? testimonials : REVIEWS;

  return (
    <section className="py-24 md:py-32 bg-zinc-900 border-y border-white/5 overflow-hidden">
      <SectionHeader
        subtitle="Love Letters"
        title="Client Experiences"
        centered={true}
      />

      {/* Smooth Infinite Marquee */}
      {!loading && (
        <div className="relative w-full flex overflow-x-hidden pt-8 pb-12">
          <motion.div
            className="flex whitespace-nowrap gap-6 md:gap-8 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {/* Double the array for seamless loop */}
            {[...displayReviews, ...displayReviews].map((review, i) => (
              <div
                key={i}
                className="w-[300px] md:w-[450px] inline-flex flex-col whitespace-normal bg-zinc-950 p-8 md:p-10 border border-white/5"
              >
                <div className="flex text-[#D4AF37] mb-6">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      fill="currentColor"
                      className="mr-1"
                    />
                  ))}
                </div>
                <p className="text-zinc-300 font-playfair italic mb-8 leading-relaxed text-lg md:text-xl flex-1">
                  "{review.text}"
                </p>
                <div className="flex justify-between items-end border-t border-white/10 pt-6 mt-auto">
                  <div>
                    <h4 className="font-medium text-white tracking-wide text-sm">
                      {review.name}
                    </h4>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">
                      Happily Married
                    </p>
                  </div>
                  <span className="text-zinc-600 text-xs">{review.date}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Elegant Fade Edges */}
          <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-zinc-900 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-zinc-900 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Share Experience Button */}
      <div className="flex flex-col items-center justify-center mt-8 px-6">
        {!showReviewForm ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowReviewForm(true)}
            className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-zinc-950 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]"
          >
            Share Your Experience
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl bg-zinc-950 border border-[#D4AF37]/20 p-8 md:p-10 rounded-3xl relative z-10 shadow-2xl"
          >
            <div className="text-center mb-8">
              <h3 className="font-playfair text-2xl text-white font-medium">Write a Review</h3>
              <p className="text-xs text-zinc-400 mt-2">Your feedback keeps our camera rolling</p>
            </div>

            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto text-[#D4AF37]">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="font-playfair text-xl text-white">Review Submitted!</h4>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your testimonial has been received and will appear on the site once approved by the admin.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center font-medium">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-medium text-zinc-400 uppercase tracking-widest mb-2.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#D4AF37]/50 focus:outline-none focus:bg-zinc-800/40 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-zinc-400 uppercase tracking-widest mb-2.5">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="text-2xl transition-all duration-200"
                      >
                        <Star
                          size={24}
                          fill={star <= reviewRating ? "#D4AF37" : "transparent"}
                          stroke={star <= reviewRating ? "#D4AF37" : "#555"}
                          className="hover:scale-110 transition-transform"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-zinc-400 uppercase tracking-widest mb-2.5">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="Share details of your wedding/shoot experience with us..."
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#D4AF37]/50 focus:outline-none focus:bg-zinc-800/40 transition-all duration-300 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 border border-white/10 hover:border-white/20 text-white font-medium py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-zinc-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "Submit Review"
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    names: "",
    email: "",
    phone: "",
    date: "",
    eventType: "wedding",
    services: [],
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const serviceOptions = [
    { id: "photography", label: "Photography" },
    { id: "videography", label: "Videography" },
    { id: "cinematic", label: "Cinematic Video" },
    { id: "preWedding", label: "Pre-Wedding Shoot" },
  ];

  const eventTypes = [
    { value: "wedding", label: "Wedding" },
    { value: "engagement", label: "Engagement" },
    { value: "prewedding", label: "Pre-Wedding" },
    { value: "other", label: "Other Event" },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.services.length) {
        setError("Please select at least one service");
        setLoading(false);
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          names: formData.names,
          email: formData.email,
          phone: formData.phone,
          event_date: formData.date,
          event_type: formData.eventType,
          services: formData.services,
          details: formData.details,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          names: "",
          email: "",
          phone: "",
          date: "",
          eventType: "wedding",
          services: [],
          details: "",
        });

        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(data.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      setError("Connection failed. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Contact Info */}
        <div className="lg:w-5/12">
          <SectionHeader subtitle="Get In Touch" title="Reserve Your Date" />
          <p className="text-zinc-400 font-light mb-12 text-sm leading-relaxed">
            We take on a limited number of commissions each year to ensure the
            highest quality experience for our couples. Please share details
            about your celebration.
          </p>

          <div className="space-y-8">
            <div className="flex items-start group cursor-pointer">
              <MapPin
                className="text-zinc-500 group-hover:text-[#D4AF37] transition-colors mt-1 mr-4"
                size={20}
                strokeWidth={1.5}
              />
              <div>
                <h5 className="font-medium text-white text-sm">Studio</h5>
                <p className="text-zinc-400 font-light text-sm mt-1">
                  Main Road, Ranchi
                  <br />
                  Jharkhand 834001, India
                </p>
              </div>
            </div>
            <div className="flex items-start group cursor-pointer">
              <Phone
                className="text-zinc-500 group-hover:text-[#D4AF37] transition-colors mt-1 mr-4"
                size={20}
                strokeWidth={1.5}
              />
              <div>
                <h5 className="font-medium text-white text-sm">Direct Line</h5>
                <p className="text-zinc-400 font-light text-sm mt-1">
                  +91 98765 43210
                </p>
              </div>
            </div>
            <div className="flex items-start group cursor-pointer">
              <Mail
                className="text-zinc-500 group-hover:text-[#D4AF37] transition-colors mt-1 mr-4"
                size={20}
                strokeWidth={1.5}
              />
              <div>
                <h5 className="font-medium text-white text-sm">
                  Email Inquiry
                </h5>
                <p className="text-zinc-400 font-light text-sm mt-1">
                  hello@shubhamphotography.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Form */}
        <div className="lg:w-7/12">
          <motion.form
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            onSubmit={handleSubmit}
          >
            {/* Personal Info */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">
                Your Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    type="text"
                    id="names"
                    value={formData.names}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-0 py-3 text-sm text-white bg-transparent border-0 border-b border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer transition-colors"
                    placeholder="Name"
                  />
                  <label
                    htmlFor="names"
                    className="absolute text-xs text-zinc-500 uppercase tracking-[0.1em] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#D4AF37] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Couple's Names *
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-0 py-3 text-sm text-white bg-transparent border-0 border-b border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer transition-colors"
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-xs text-zinc-500 uppercase tracking-[0.1em] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#D4AF37] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email Address *
                  </label>
                </div>
              </div>
            </div>

            {/* Contact & Event Info */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">
                Event Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full px-0 py-3 text-sm text-white bg-transparent border-0 border-b border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer transition-colors"
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone"
                    className="absolute text-xs text-zinc-500 uppercase tracking-[0.1em] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#D4AF37] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-0 py-3 text-sm text-white bg-transparent border-0 border-b border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer transition-colors"
                    style={{ colorScheme: "dark" }}
                  />
                  <label
                    htmlFor="date"
                    className="absolute text-[10px] text-zinc-500 uppercase tracking-[0.1em] -top-3 left-0"
                  >
                    Event Date *
                  </label>
                </div>
              </div>
            </div>

            {/* Event Type */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                Event Type
              </h3>
              <select
                id="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
              >
                {eventTypes.map((type) => (
                  <option
                    key={type.value}
                    value={type.value}
                    className="bg-zinc-950 text-white"
                  >
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Services Selection */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                Services Interested In
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceOptions.map((service) => (
                  <motion.label
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-4 border border-zinc-700 rounded-lg bg-zinc-900/30 hover:bg-zinc-900/60 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service.id)}
                      onChange={() => handleServiceToggle(service.id)}
                      className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                    />
                    <span className="ml-3 text-sm text-white font-medium">
                      {service.label}
                    </span>
                  </motion.label>
                ))}
              </div>
              {error && error.includes("service") && (
                <p className="text-red-400 text-xs mt-2">{error}</p>
              )}
            </div>

            {/* Details */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                Additional Details
              </h3>
              <div className="relative">
                <textarea
                  id="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  rows="4"
                  className="block w-full px-0 py-3 text-sm text-white bg-transparent border-0 border-b border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer resize-none transition-colors"
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="details"
                  className="absolute text-xs text-zinc-500 uppercase tracking-[0.1em] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#D4AF37] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Event Details & Venue
                </label>
              </div>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {error && !error.includes("service") && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-950/20 border border-red-600/30 rounded-lg text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-green-950/20 border border-green-600/30 rounded-lg text-green-400 text-sm"
                >
                  ✓ Inquiry submitted successfully! We'll be in touch within 24
                  hours.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="group bg-white text-zinc-950 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all duration-300 w-full md:w-auto flex items-center justify-center rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="mr-3 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Inquiry
                  <ArrowRight
                    size={14}
                    className="ml-3 transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-950 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-5">
          <h1 className="font-playfair text-2xl font-semibold tracking-widest text-white mb-2">
            SHUBHAM
          </h1>
          <p className="text-zinc-500 text-[10px] tracking-[0.2em] uppercase mb-6">
            Photography
          </p>
          <p className="text-zinc-400 font-light text-sm max-w-sm leading-relaxed mb-8">
            Premium cinematic wedding photography and videography services based
            in Ranchi. Creating timeless masterpieces of your special day.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Facebook size={20} strokeWidth={1.5} />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Youtube size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <h4 className="text-white text-xs uppercase tracking-[0.1em] mb-6 font-medium">
            Explore
          </h4>
          <ul className="space-y-4 text-sm text-zinc-400 font-light">
            <li>
              <a
                href="#home"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Philosophy
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Investment
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-white text-xs uppercase tracking-[0.1em] mb-6 font-medium">
            Legal
          </h4>
          <ul className="space-y-4 text-sm text-zinc-400 font-light">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Client Portal
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 text-zinc-600 text-[10px] tracking-widest uppercase">
        <p>&copy; {new Date().getFullYear()} Shubham Photography.</p>
        <p className="mt-2 md:mt-0">Crafted with precision.</p>
      </div>
    </footer>
  );
};

// Sleek Floating Action Buttons
const FloatingActions = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* WhatsApp Button
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        aria-label="Contact on WhatsApp"
        className="w-12 h-12 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
      >
        <MessageCircle size={22} strokeWidth={2} />
      </a> */}

      {/* Concierge Chatbot Button */}
      {/* <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label="Open Studio Concierge"
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${isChatOpen ? "bg-zinc-800 text-white" : "bg-[#D4AF37] text-zinc-950 hover:-translate-y-1"}`}
      >
        {isChatOpen ? <X size={22} /> : <Sparkles size={22} />}
      </button> */}

      {/* Refined AI Assistant Panel */}
      <AnimatePresence>
        {isChatOpen && <ConciergeChat onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

const ConciergeChat = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Welcome. I am the virtual concierge for Shubham Photography. How may I assist you with your wedding plans today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const systemPrompt =
        "You are the highly professional, elegant virtual concierge for 'Shubham Photography', a luxury wedding photography studio in Ranchi. Provide concise, sophisticated responses. Packages: Silver ₹50k, Gold ₹85k, Platinum ₹1.5L. Always maintain a high-end editorial brand voice.";

      const chatHistory = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));
      chatHistory.push({ role: "user", parts: [{ text: userText }] });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: chatHistory,
          systemInstruction: { parts: [{ text: systemPrompt }] },
        }),
      });

      const data = await response.json();
      const replyText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I apologize, but I am currently unavailable. Please reach out via our contact form.";
      setMessages((prev) => [...prev, { role: "model", text: replyText }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Connection error. Please try again later or use WhatsApp.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.98,
        transformOrigin: "bottom right",
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-16 right-0 w-[320px] sm:w-[380px] h-[450px] bg-zinc-950 border border-zinc-800 shadow-2xl flex flex-col"
    >
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
        <div>
          <h3 className="text-white font-playfair text-sm">Studio Concierge</h3>
          <p className="text-zinc-500 text-[9px] uppercase tracking-widest mt-1">
            Virtual Assistant
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 text-xs leading-relaxed max-w-[85%] ${msg.role === "user" ? "bg-white text-zinc-950" : "bg-zinc-900 text-zinc-300 border border-zinc-800"}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-3 bg-zinc-900 border border-zinc-800 flex space-x-1 items-center h-10">
              <div className="w-1 h-1 bg-[#D4AF37] rounded-full animate-bounce" />
              <div
                className="w-1 h-1 bg-[#D4AF37] rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-1 h-1 bg-[#D4AF37] rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-zinc-800 bg-zinc-900/50 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask a question..."
          className="flex-1 bg-transparent border-0 text-white text-xs focus:ring-0 focus:outline-none px-2"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="text-zinc-500 hover:text-[#D4AF37] p-2 disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <style>{globalStyles}</style>

      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative bg-zinc-950 selection:bg-[#D4AF37] selection:text-black"
        >
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <PortfolioSection />
          <FilmsSection />
          <TestimonialsSection />
          <PricingSection />
          <ContactSection />
          <Footer />
          <FloatingActions />
        </motion.div>
      )}
    </>
  );
}
