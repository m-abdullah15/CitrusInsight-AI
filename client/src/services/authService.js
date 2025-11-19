import api from './api';

// Token storage key
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

// Signup function
export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    
    // Store JWT token in localStorage
    if (response.data.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.data.user));
    }
    
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Login function
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    // Store JWT token in localStorage
    if (response.data.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.data.user));
    }
    
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout API error:', error);
  } finally {
    // Clear tokens from localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

// Get current user function
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data.data.user;
  } catch (error) {
    throw error;
  }
};