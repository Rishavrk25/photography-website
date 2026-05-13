import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaFacebookF, FaPinterestP, FaHeart } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Films', href: '#films' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

const services = [
  'Wedding Photography',
  'Cinematic Videography',
  'Pre-Wedding Shoots',
  'Bridal Portraits',
  'Event Coverage',
  'Drone Shoots',
];

const socials = [
  { icon: <FaInstagram />, href: 'https://instagram.com/shubhamvideophotography', label: 'Instagram' },
  { icon: <FaYoutube />, href: 'https://youtube.com/@shubhamvideophotography', label: 'YouTube' },
  { icon: <FaFacebookF />, href: 'https://facebook.com/shubhamvideophotography', label: 'Facebook' },
  { icon: <FaPinterestP />, href: 'https://pinterest.com/shubhamvideophotography', label: 'Pinterest' },
];

export default function Footer() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-dark-400 border-t border-gold/10">
      {/* Decorative top gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gold" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-gradient-gold">Shubham</h3>
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gray-soft/50">Video Photography</p>
              </div>
            </div>
            <p className="text-gray-soft/60 text-sm leading-relaxed mb-6">
              Capturing life's most precious moments with artistry and passion. 
              Every frame tells a story, every story deserves to be told beautifully.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-soft/60 hover:text-gold hover:border-gold/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-cream mb-6 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-gold" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="text-gray-soft/60 hover:text-gold transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-gold transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-cream mb-6 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-gold" />
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-soft/60 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-cream mb-6 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-gold" />
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+919876543210" className="flex items-start gap-3 text-gray-soft/60 hover:text-gold transition-colors group">
                  <HiPhone className="text-gold mt-0.5 text-lg shrink-0" />
                  <span className="text-sm">+91 98765 43210</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@shubhamvideo.com" className="flex items-start gap-3 text-gray-soft/60 hover:text-gold transition-colors group">
                  <HiMail className="text-gold mt-0.5 text-lg shrink-0" />
                  <span className="text-sm">hello@shubhamvideo.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-soft/60">
                  <HiLocationMarker className="text-gold mt-0.5 text-lg shrink-0" />
                  <span className="text-sm">Main Road, Ranchi,<br />Jharkhand 834001</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-soft/40 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Shubham Video Photography. All rights reserved.
          </p>
          <p className="text-gray-soft/40 text-xs flex items-center gap-1">
            Crafted with <FaHeart className="text-red-deep text-[10px]" /> in Ranchi
          </p>
        </div>
      </div>
    </footer>
  );
}
