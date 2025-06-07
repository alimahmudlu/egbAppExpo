import { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

// API configuration
const API_URL = 'https://api.example.com'; // Replace with your actual API URL
const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create the authentication context
const AuthContext = createContext(null);

// Authentication provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        // Load token and user data from secure storage
        const storedToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
        const storedUserData = await SecureStore.getItemAsync(USER_DATA_KEY);

        if (storedToken && storedUserData) {
          // Set token in state and axios headers
          setToken(storedToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

          // Parse and set user data
          const userData = JSON.parse(storedUserData);
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to load authentication data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  // Set up axios interceptor for token refresh
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        // If error is 401 Unauthorized, try to refresh token
        if (error.response && error.response.status === 401 && token) {
          try {
            // Call token refresh endpoint
            const response = await axios.post(`${API_URL}/auth/refresh`, {
              token: token
            });

            // Update token in state, storage and headers
            const newToken = response.data.token;
            setToken(newToken);
            await SecureStore.setItemAsync(AUTH_TOKEN_KEY, newToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            // Retry the original request
            const originalRequest = error.config;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            // If refresh fails, log out the user
            await logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptor on unmount
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [token]);

  // Store authentication data
  const storeAuthData = async (token, userData) => {
    try {
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));

      // Set token in axios headers for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setToken(token);
      setUser(userData);
    } catch (error) {
      console.error('Failed to store authentication data:', error);
      throw error;
    }
  };

  // Login function
  const login = async (id, password) => {
    try {
      setLoading(true);

      // Make API call to authenticate
      // const response = await api.post('/auth/login', {
      //   email,
      //   password,
      //   role
      // });

      const users = [
        {
          id: 123,
          password: 'password123',
          email: 'employee@egb.app',
          name: 'Jane',
          surname: 'Doe',
          role: {
            id: 1,
            name: 'employee',
          },
          image: 'https://randomuser.me/api/portraits/men/1.jpg',
          tokens: {
            accessToken: 'accessToken'
          }
        },
        {
          id: 456,
          password: 'password456',
          email: 'timekeeper@egb.app',
          name: 'Jane',
          surname: 'Doe Timekeeper',
          role: {
            id: 2,
            name: 'timeKeeper',
          },
          image: 'https://randomuser.me/api/portraits/men/3.jpg',
          tokens: {
            accessToken: 'accessToken'
          }
        },
        {
          id: 789,
          password: 'password789',
          email: 'chief@egb.app',
          name: 'Jane',
          surname: 'Doe Chief',
          role: {
            id: 3,
            name: 'chief',
          },
          image: 'https://randomuser.me/api/portraits/men/5.jpg',
          tokens: {
            accessToken: 'accessToken'
          }
        },
      ]

      const userData = users?.find(el => el.id === Number(id) && el.password === password);

      if (!userData?.id) {
        throw new Error('User not found! Plase check your ID and password and try again.');
      }

      // Store token and user data
      await storeAuthData(userData?.tokens?.accessToken, userData);

      setLoading(false);

      // Navigate based on role
      if (userData?.role?.id === 1) {
        router.replace('/employee/');
      } else if (userData?.role?.id === 2) {
        router.replace('/timeKeeper/');
      } else {
        router.replace('/chief/');
      }

      return { success: true, user: userData };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Login failed'
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout endpoint if needed
      if (token) {
        await api.post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear token and user data regardless of API call success
      setToken(null);
      setUser(null);

      // Remove auth header
      delete api.defaults.headers.common['Authorization'];

      // Clear stored data
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_DATA_KEY);

      // Navigate to auth screen
      router.replace('/(auth)/');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}