import { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import Constants from 'expo-constants';

const { API_URL } = Constants.expoConfig.extra;

// API configuration
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
  const [accessToken, setAccessToken] = useState(null);
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
          setAccessToken(storedToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

          // Parse and set user data
          const userData = JSON.parse(JSON.parse(storedUserData));
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to load authentication data:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500)
      }
    };

    loadStoredAuth();
  }, []);

/*  // Set up axios interceptor for token refresh
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
            setAccessToken(newToken);
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
  }, [token]);*/


  // Store authentication data
  const storeAuthData = async (token, userData) => {
    try {
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(JSON.stringify(userData)));

      // Set token in axios headers for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setAccessToken(token);
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
      const response = await api.post('/auth', {
        id,
        password,
      });

      console.log(response, `API ERROR: ${API_URL}, TRYY`);


      const userData = JSON.parse(response?.data);

      if (!userData?.user?.id) {
        throw new Error('User not found! Please check your ID and password and try again.');
      }

      await storeAuthData(userData?.token?.accessToken, userData?.user);

      setTimeout(() => {
        setLoading(false);
      }, 1500)

      // Navigate based on role
      if (userData?.user?.role?.id === 1) {
        router.replace('/employee/');
      } else if (userData?.user?.role?.id === 2) {
        router.replace('/timeKeeper/');
      } else {
        router.replace('/chief/');
      }
      //
      return { success: true, user: userData?.user };
    } catch (error) {
      console.log(error, `API ERROR 2: ${API_URL}, catch`);

      setTimeout(() => {
        setLoading(false);
      }, 1500)
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
      if (accessToken) {
        await api.post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear token and user data regardless of API call success
      setAccessToken(null);
      setUser(null);

      // Remove auth header
      delete api.defaults.headers.common['Authorization'];

      // Clear stored data
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_DATA_KEY);

      // Navigate to auth screen
      router.replace('/auth/');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
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