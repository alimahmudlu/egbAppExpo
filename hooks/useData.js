import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'APP_DATA';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [storeData, setStoreData] = useState({
    checkInData: {
        checkIn: null,
        checkOut: null,
    },
    cache: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setStoreData(JSON.parse(storedData));
        }
      } catch (e) {
        console.error('Error loading data:', e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
      } catch (e) {
        console.error('Error saving data:', e);
      }
    };

    if (!loading) {
      saveData();
    }
  }, [storeData]);

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setStoreData({ user: null, token: null });
    } catch (e) {
      console.error('Error clearing data:', e);
    }
  };

  const insertData = (key, data) => {
    setStoreData(prev => ({
      ...prev,
      cache: {
        ...prev.cache,
        [key]: {
          ...prev.cache?.[key],
          data: [
              ...prev.cache?.[key]?.data,
              data
          ]
        }
      }
    }));
  }
  const updateData = async (key, data) => {
    setStoreData(prev => ({
      ...prev,
      cache: {
        ...prev.cache,
        [key]: data
      }
    }));
  }
  const removeRowData = async (key, item) => {
    setStoreData(prev => ({
      ...prev,
      cache: {
        ...prev.cache,
        [key]: {
                  ...prev.cache?.[key],
                  data: prev.cache?.[key]?.data?.filter(e => e !== item)
                }
      }
    }));
  }

  return (
      <DataContext.Provider value={{ storeData, setStoreData, loading, clearData, insertData, updateData, removeRowData }}>
        {children}
      </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
