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
    const _storeDataLoading = storeData?.loading
    _storeDataLoading?.set(key, true);
    setStoreData(prevState => ({
      ...prevState,
      loading: _storeDataLoading
    }))
  }
  const removeLoading = async (key) => {
    const _storeDataLoading = storeData?.loading
    storeData?.loading?.delete(key)
    setStoreData(prevState => ({
      ...prevState,
      loading: _storeDataLoading
    }))
  }

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
  const changeRowData = async (key, data, id, index) => {
    setStoreData(prev => {
      const _data = prev.cache?.[key]?.data
      const _index = _data.findIndex(item => item.id === id);
      _data[_index] = data;

      console.log('changeRowData', _data)

      return  ({
        ...prev,
        cache: {
          ...prev.cache,
          [key]: {
            ...prev.cache?.[key],
            data: _data
          }
        }
      })
    });
  }
  const removeRowData = async (key, item, iterator = undefined) => {
    setStoreData(prev => ({
      ...prev,
      cache: {
        ...prev.cache,
        [key]: {
                  ...prev.cache?.[key],
                  data: prev.cache?.[key]?.data?.filter(e => iterator ? (e?.[iterator] !== item) : (e !== item))
                }
      }
    }));
  }

  return (
      <DataContext.Provider value={{ storeData, setStoreData, loading, clearData, insertData, changeRowData, updateData, removeRowData, insertLoading, removeLoading }}>
        {children}
      </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
