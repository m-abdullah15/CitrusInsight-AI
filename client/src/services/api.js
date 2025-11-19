import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

// Helper function to check if error is retryable
const isRetryableError = (error) => {
  // Retry on network errors or 5xx server errors
  if (!error.response) {
    return true; // Network error
  }
  const status = error.response.status;
  return status >= 500 && status < 600;
};

// Helper function to delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Initialize retry count
    config.retryCount = config.retryCount || 0;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 responses by redirecting to login
    if (error.response && error.response.status === 401) {
      // Clear token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }
    
    // Implement retry mechanism for failed requests
    if (isRetryableError(error) && originalRequest.retryCount < MAX_RETRIES) {
      originalRequest.retryCount += 1;
      
      // Wait before retrying
      await delay(RETRY_DELAY * originalRequest.retryCount);
      
      // Retry the request
      return api(originalRequest);
    }
    
    // Enhance error object with user-friendly message
    if (!error.response) {
      error.userMessage = 'Network error. Please check your internet connection and try again.';
    } else if (error.response.status >= 500) {
      error.userMessage = 'Server error. Please try again later.';
    } else if (error.response.status === 404) {
      error.userMessage = 'Resource not found.';
    } else if (error.response.status === 403) {
      error.userMessage = 'You do not have permission to perform this action.';
    } else {
      error.userMessage = error.response.data?.message || 'An error occurred. Please try again.';
    }
    
    return Promise.reject(error);
  }
);

export default api;
