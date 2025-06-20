import { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';

// Create the authentication context
const AuthContext = createContext(null);

// Authentication provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for existing session on app load
  useEffect(() => {
    // In a real app, you would check for a stored token or session
    // For this example, we'll just set loading to false after a short delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Login function
  const login = async (id, password) => {
    try {
      // In a real app, you would make an API call to authenticate
      // For this example, we'll just simulate a successful login
      setLoading(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

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
          image: 'https://randomuser.me/api/portraits/men/1.jpg'
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
          image: 'https://randomuser.me/api/portraits/men/3.jpg'
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
          image: 'https://randomuser.me/api/portraits/men/5.jpg'
        },
      ]

      const userData = users?.find(el => el.id === id && el.password === password);

     if (!userData?.id) {
       throw new Error('User not found');
     }

      // Set the user with the provided role
      setUser(userData);
      setLoading(false);

      // Navigate based on role
      if (userData?.role?.id === 1) {
        router.replace('/employee/');
      } else if (userData?.role?.id === 2) {
        router.replace('/timeKeeper/');
      } else {
        router.replace('/chief/');
      }

      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    router.replace('/auth');
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