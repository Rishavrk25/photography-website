import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export const login = (credentials) => api.post("/login", credentials);
export const getUser = () => api.get("/user");
export const logout = () => api.post("/logout");

export const adminAPI = {
  // Dashboard endpoints
  getDashboard: () => api.get("/admin/dashboard"),
  getUsers: () => api.get("/admin/users"),

  // Booking endpoints
  getBookings: () => api.get("/bookings"),
  getBooking: (id) => api.get(`/bookings/${id}`),
  updateBookingStatus: (id, status) =>
    api.patch(`/bookings/${id}/status`, { status }),
  deleteBooking: (id) => api.delete(`/bookings/${id}`),

  // Inquiry endpoints
  getInquiries: () => api.get("/inquiries"),
  getInquiry: (id) => api.get(`/inquiries/${id}`),
  updateInquiryStatus: (id, status) =>
    api.patch(`/inquiries/${id}/status`, { status }),
  deleteInquiry: (id) => api.delete(`/inquiries/${id}`),
  // Package endpoints
  sendPackage: (payload) => api.post("/admin/packages/send", payload),
  getPackages: () => api.get("/admin/packages"),
  downloadPackage: (id) =>
    api.get(`/admin/packages/${id}/download`, { responseType: "blob" }),
  getGalleryFiles: (id) => api.get(`/admin/galleries/${id}/files`),
  deleteGallery: (id) => api.delete(`/admin/galleries/${id}`),

  // Testimonials endpoints
  getTestimonials: () => api.get("/testimonials"),
  updateTestimonialStatus: (id, status) => api.patch(`/testimonials/${id}/status`, { status }),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`),
};

export default api;
