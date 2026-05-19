import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import ClientManager from "./pages/ClientManager";
import GalleryManager from "./pages/GalleryManager";
import BookingsManager from "./pages/BookingsManager";
import InquiriesManager from "./pages/InquiriesManager";
import Login from "./pages/Login";

import TestimonialsManager from "./pages/TestimonialsManager";
import PackagesManager from "./pages/PackagesManager";
import VideosManager from "./pages/VideosManager";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<ClientManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="bookings" element={<BookingsManager />} />
          <Route path="contacts" element={<InquiriesManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="packages" element={<PackagesManager />} />
          <Route path="videos" element={<VideosManager />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
}
