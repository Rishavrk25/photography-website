import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animations';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import FilmsSection from '../components/sections/FilmsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import PricingSection from '../components/sections/PricingSection';
import ContactSection from '../components/sections/ContactSection';

export default function HomePage() {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <FilmsSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
    </motion.main>
  );
}
