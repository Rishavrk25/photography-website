import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/layout/LoadingScreen';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import CustomCursor from './components/layout/CustomCursor';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import GalleryManager from './components/admin/GalleryManager';
import VideoManager from './components/admin/VideoManager';
import BookingManager from './components/admin/BookingManager';
import TestimonialManager from './components/admin/TestimonialManager';
import PackageManager from './components/admin/PackageManager';
import ContactInquiries from './components/admin/ContactInquiries';

function PublicLayout() {
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LoadingScreen />
      <CustomCursor />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="videos" element={<VideoManager />} />
          <Route path="bookings" element={<BookingManager />} />
          <Route path="testimonials" element={<TestimonialManager />} />
          <Route path="packages" element={<PackageManager />} />
          <Route path="contacts" element={<ContactInquiries />} />
        </Route>
        {/* Public Routes */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
}
