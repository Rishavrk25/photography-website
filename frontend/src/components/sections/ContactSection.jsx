import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animations';
import SectionHeading from '../ui/SectionHeading';
import GoldButton from '../ui/GoldButton';
import { HiPhone, HiMail, HiLocationMarker, HiClock } from 'react-icons/hi';
import { FaWhatsapp, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';

const contactInfo = [
  { icon: <HiPhone />, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: <HiMail />, label: 'Email', value: 'hello@shubhamvideo.com', href: 'mailto:hello@shubhamvideo.com' },
  { icon: <HiLocationMarker />, label: 'Studio', value: 'Main Road, Ranchi, Jharkhand 834001' },
  { icon: <HiClock />, label: 'Hours', value: 'Mon-Sat: 10AM - 8PM' },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', event_type: '', event_date: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section id="contact" className="relative section-padding bg-dark-300 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading title="Let's Create Magic Together" subtitle="Ready to capture your special moments? Get in touch with us." />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div className="lg:col-span-3" variants={fadeIn('right')} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {submitted ? (
              <div className="glass-gold rounded-2xl p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center"><span className="text-4xl">✓</span></div>
                <h3 className="font-heading text-2xl font-bold text-gradient-gold mb-3">Thank You!</h3>
                <p className="text-gray-soft/70">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold/70 mb-2">Your Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Enter your name"
                      className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-3 text-cream text-sm placeholder:text-gray-soft/30 focus:outline-none focus:border-gold/40 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold/70 mb-2">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                      className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-3 text-cream text-sm placeholder:text-gray-soft/30 focus:outline-none focus:border-gold/40 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold/70 mb-2">Phone *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 98765 43210"
                      className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-3 text-cream text-sm placeholder:text-gray-soft/30 focus:outline-none focus:border-gold/40 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold/70 mb-2">Event Type</label>
                    <select name="event_type" value={form.event_type} onChange={handleChange}
                      className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/40 transition-all appearance-none cursor-pointer">
                      <option value="" className="bg-dark-300">Select event type</option>
                      <option value="wedding" className="bg-dark-300">Wedding</option>
                      <option value="pre-wedding" className="bg-dark-300">Pre-Wedding</option>
                      <option value="engagement" className="bg-dark-300">Engagement</option>
                      <option value="reception" className="bg-dark-300">Reception</option>
                      <option value="other" className="bg-dark-300">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold/70 mb-2">Event Date</label>
                  <input type="date" name="event_date" value={form.event_date} onChange={handleChange}
                    className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/40 transition-all" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold/70 mb-2">Your Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us about your event..."
                    className="w-full bg-dark-200/50 border border-gold/10 rounded-xl px-4 py-3 text-cream text-sm placeholder:text-gray-soft/30 focus:outline-none focus:border-gold/40 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all resize-none" />
                </div>
                <GoldButton type="submit" variant="filled" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Inquiry'}
                </GoldButton>
              </form>
            )}
          </motion.div>

          {/* Info Side */}
          <motion.div className="lg:col-span-2 space-y-6" variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {contactInfo.map((info) => (
              <motion.div key={info.label} variants={fadeIn('left')} className="glass rounded-xl p-5 flex items-start gap-4 group hover:border-gold/30 transition-colors">
                <div className="w-12 h-12 rounded-xl glass-gold flex items-center justify-center text-gold text-xl shrink-0 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all">{info.icon}</div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gold/60 mb-1">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="text-cream text-sm hover:text-gold transition-colors">{info.value}</a>
                  ) : (
                    <p className="text-cream text-sm">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.a variants={fadeIn('left')} href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/40 transition-all group">
              <FaWhatsapp className="text-[#25D366] text-2xl" />
              <div>
                <p className="text-cream text-sm font-medium">Chat on WhatsApp</p>
                <p className="text-gray-soft/50 text-xs">Quick response guaranteed</p>
              </div>
            </motion.a>

            {/* Social Links */}
            <motion.div variants={fadeIn('left')} className="flex gap-3">
              {[
                { icon: <FaInstagram />, href: 'https://instagram.com/shubhamvideophotography', color: 'hover:text-pink-400' },
                { icon: <FaYoutube />, href: 'https://youtube.com/@shubhamvideophotography', color: 'hover:text-red-500' },
                { icon: <FaFacebookF />, href: 'https://facebook.com/shubhamvideophotography', color: 'hover:text-blue-400' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-soft/60 ${s.color} transition-all`}>{s.icon}</a>
              ))}
            </motion.div>

            {/* Map */}
            <motion.div variants={fadeIn('left')} className="rounded-2xl overflow-hidden border border-gold/10 h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117223.63498399498!2d85.2433!3d23.3441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e104e1c7c54d%3A0xbeccd88e95263f45!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Studio Location"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
