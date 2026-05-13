import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor — attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Public API
export const getGalleries = (category) =>
  api.get('/galleries', { params: category ? { category } : {} });

export const getVideos = () => api.get('/videos');

export const getTestimonials = () => api.get('/testimonials');

export const getPackages = () => api.get('/packages');

export const createBooking = (data) => api.post('/bookings', data);

export const createContact = (data) => api.post('/contacts', data);

// Auth API
export const login = (credentials) => api.post('/login', credentials);

export const logout = () => api.post('/logout');

export const getUser = () => api.get('/user');

// Admin API
export const adminAPI = {
  // Dashboard
  getDashboard: () => api.get('/admin/dashboard'),

  // Galleries
  getGalleries: (params) => api.get('/admin/galleries', { params }),
  createGallery: (data) => api.post('/admin/galleries', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateGallery: (id, data) => api.put(`/admin/galleries/${id}`, data),
  deleteGallery: (id) => api.delete(`/admin/galleries/${id}`),

  // Videos
  getVideos: (params) => api.get('/admin/videos', { params }),
  createVideo: (data) => api.post('/admin/videos', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateVideo: (id, data) => api.put(`/admin/videos/${id}`, data),
  deleteVideo: (id) => api.delete(`/admin/videos/${id}`),

  // Bookings
  getBookings: (params) => api.get('/admin/bookings', { params }),
  updateBooking: (id, data) => api.put(`/admin/bookings/${id}`, data),
  deleteBooking: (id) => api.delete(`/admin/bookings/${id}`),

  // Testimonials
  getTestimonials: (params) => api.get('/admin/testimonials', { params }),
  createTestimonial: (data) => api.post('/admin/testimonials', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateTestimonial: (id, data) => api.put(`/admin/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`),

  // Packages
  getPackages: (params) => api.get('/admin/packages', { params }),
  createPackage: (data) => api.post('/admin/packages', data),
  updatePackage: (id, data) => api.put(`/admin/packages/${id}`, data),
  deletePackage: (id) => api.delete(`/admin/packages/${id}`),

  // Contacts
  getContacts: (params) => api.get('/admin/contacts', { params }),
  deleteContact: (id) => api.delete(`/admin/contacts/${id}`),
};

export default api;
