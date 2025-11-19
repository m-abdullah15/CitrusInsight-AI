import { createContext, useContext, useState, useEffect } from 'react';
import { signup as signupService, login as loginService, logout as logoutService, getCurrentUser as getCurrentUserService } from '../services/authService';

// Create AuthContext
const AuthContext = createContext(null);

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Get current user from backend
          const userData = await getCurrentUserService();
          setUser(userData);
        } catch (err) {
          console.error('Failed to get current user:', err);
          // Clear invalid token
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function that stores JWT token
  const login = async (credentials) => {
    try {
      setError(null);
      const data = await loginService(credentials);
      setUser(data.user);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw err;
    }
  };

  // Logout function that clears token
  const logout = async () => {
    try {
      await logoutService();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear user state and tokens regardless of API call result
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      setError(null);
      const data = await signupService(userData);
      setUser(data.user);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed';
      setError(errorMessage);
      throw err;
    }
  };

  // Get current user function
  const getCurrentUser = async () => {
    try {
      const userData = await getCurrentUserService();
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Failed to get current user:', err);
      setUser(null);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    signup,
    getCurrentUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
