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
    cache: {},
    loading: new Map()
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
      // saveData();
    }
  }, [storeData]);

  const insertLoading = async (key) => {
    setStoreData(prev => {
      const newMap = new Map(prev.loading);
      newMap.set(key, true);
      return {
        ...prev,
        loading: newMap
      };
    });
  };

  const removeLoading = async (key) => {
    setStoreData(prev => {
      const newMap = new Map(prev.loading);
      newMap.delete(key);
      return {
        ...prev,
        loading: newMap
      };
    });
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setStoreData({ user: null, token: null });
    } catch (e) {
      console.error('Error clearing data:', e);
    }
  };
  const insertData = async (key, data) => {
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
  const changeRowData = async (key, data, id, index, pagination = false) => {
    setStoreData(prev => {
      const oldData = pagination ? prev.cache?.[key]?.data?.data || [] : prev.cache?.[key]?.data;
      if (!oldData) return prev;

      const updatedData = oldData.map(item =>
          item.id === id ? data : item
      );

      return {
        ...prev,
        cache: {
          ...prev.cache,
          [key]: {
            ...prev.cache?.[key],
            data: pagination ?
                {
                    ...prev.cache?.[key]?.data,
                    data: updatedData
                }
                :
                updatedData
          }
        }
      };
    });
  };
  const changeAddRowData = async (key, data, id, index) => {
    setStoreData(prev => {
      const oldData = prev.cache?.[key]?.data;
      if (!oldData) return prev;

      const updatedData = oldData.map(item =>
          item.id === id ? ({...item, ...data}) : item
      );

      return {
        ...prev,
        cache: {
          ...prev.cache,
          [key]: {
            ...prev.cache?.[key],
            data: updatedData
          }
        }
      };
    });
  };
  const removeRowData = async (key, item, iterator = undefined) => {
    setStoreData(prev => {
      return ({
        ...prev,
        cache: {
          ...prev.cache,
          [key]: {
            ...prev.cache?.[key],
            data: prev.cache?.[key]?.data?.filter(e => iterator ? (e?.[iterator] !== item) : (e !== item))
          }
        }
      })
    });
  }

  return (
      <DataContext.Provider value={{ storeData, setStoreData, loading, clearData, insertData, changeRowData, updateData, removeRowData, changeAddRowData, insertLoading, removeLoading }}>
        {children}
      </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
