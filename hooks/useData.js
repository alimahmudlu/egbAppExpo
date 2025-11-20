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

/*
    const updateDataWithPagination = async (key, response, identifierKey = 'id') => {
        setStoreData(prev => {

            // 1. Mövcud cache-i etibarlı şəkildə çıxarırıq.
            const existingCache = prev.cache[key] || {};

            // Mövcud item massivini daha dəqiq yoxlayırıq.
            const existingItems = Array.isArray(existingCache.data?.data)
                ? existingCache.data.data
                : [];

            console.log(existingCache, existingItems, 'existingCache')

            // 2. Yeni dataları çıxarırıq
            const incomingFullData = response.data || {};
            const incomingItems = incomingFullData.data || [];
            const incomingPage = parseInt(incomingFullData.page, 10) || 1;

            // 3. Birləşdirmə (Merge / Append) Məntiqi
            let updatedItems = [];

            if (incomingPage > 1 && existingItems.length > 0) {
                // --- LOAD MORE / APPEND MƏNTİQİ (Səhifə 1-dən böyükdürsə) ---

                // Unikal ID-si olan elementləri birləşdirmək üçün Map istifadə edirik.
                const combinedDataMap = new Map();
                const itemsWithoutId = []; // ID-si olmayanları ayrıca saxlayırıq.

                // A. Köhnə elementləri Map-ə əlavə et
                existingItems.forEach(item => {
                    if (item && item[identifierKey] !== undefined) {
                        combinedDataMap.set(item[identifierKey], item);
                    } else {
                        // Əgər köhnə datada ID yoxdursa, onu da saxlayırıq
                        itemsWithoutId.push(item);
                    }
                });

                // B. Yeni elementləri Map-ə və ya itemsWithoutId massivinə əlavə et
                incomingItems.forEach(item => {
                    if (item && item[identifierKey] !== undefined) {
                        // Eyni ID-li elementləri yeniləyir (Merge)
                        combinedDataMap.set(item[identifierKey], item);
                    } else {
                        // ID yoxdursa, sadəcə sona əlavə edirik (Append)
                        itemsWithoutId.push(item);
                    }
                });

                // Yenilənmiş massivi Map-dən (ID-li elementlər) və ID-si olmayanlardan yaradırıq.
                updatedItems = [...Array.from(combinedDataMap.values()), ...itemsWithoutId];

            } else {
                // --- İLK SƏHİFƏ (Page 1) MƏNTİQİ ---
                // Köhnəni tamamilə əvəz et.
                updatedItems = incomingItems;
            }

            // 4. Yenilənmiş Obyekti Store-a yazırıq
            const updatedCache = {
                ...response,
                data: {
                    ...incomingFullData,
                    data: updatedItems
                }
            };

            // updateDataWithFullResponse daxilində, 3-cü addımdan əvvəl
            console.log("Mövcud item sayı (Page 1 olmalıdır):", existingItems.length);
            console.log("Gələn yeni item sayı (Page 2 olmalıdır):", incomingItems.length);
            console.log("Gələn səhifə nömrəsi:", incomingPage);

            return {
                ...prev,
                cache: {
                    ...prev.cache,
                    [key]: updatedCache
                }
            };
        });
    };
*/

    const updateDataWithPagination = async (key, response, identifierKey = 'id') => {
        setStoreData(prev => {

            // 1. Mövcud item massivini birbaşa store-un dərinliklərindən etibarlı şəkildə çıxarırıq.
            const existingItems = Array.isArray(prev.cache?.[key]?.data?.data)
                ? prev.cache[key].data.data
                : [];

            console.log(prev, '---------------____________________------------------------prev_---------------_______________-----------------')
            console.log(existingItems, 'existingItems')

            // 2. Yeni dataları çıxarırıq
            const incomingFullData = response.data || {};
            const incomingItems = incomingFullData.data || [];
            const incomingPage = parseInt(incomingFullData.page, 10) || 1;

            // 3. Birləşdirmə (Merge / Append) Məntiqi (Sadece şərtin gücləndirilməsi)
            let updatedItems = incomingItems; // Default olaraq gələn data

            if (incomingPage > 1 && existingItems.length > 0) {
                // --- LOAD MORE / APPEND MƏNTİQİ ---
                // Əvvəlki kodunuzda olan eyni merge məntiqini tətbiq edin:
                const combinedDataMap = new Map();

                // A. Köhnə elementləri əlavə et (10 element)
                existingItems.forEach(item => {
                    if (item && item[identifierKey] !== undefined) {
                        combinedDataMap.set(item[identifierKey], item);
                    }
                });

                // B. Yeni elementləri əlavə et (1 element)
                incomingItems.forEach(item => {
                    if (item && item[identifierKey] !== undefined) {
                        combinedDataMap.set(item[identifierKey], item);
                    }
                });

                updatedItems = Array.from(combinedDataMap.values());

            }
            // ... (4-cü addım eyni qalır) ...

            // 4. Yenilənmiş Obyekti Store-a yazırıq
            const updatedCache = {
                ...response,
                data: {
                    ...incomingFullData,
                    data: updatedItems // Page 2-də burada 11 element olmalıdır
                }
            };

            return {
                ...prev,
                cache: {
                    ...prev.cache,
                    [key]: updatedCache
                }
            };
        });
    };

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
      <DataContext.Provider value={{ storeData, setStoreData, loading, clearData, updateDataWithPagination, insertData, changeRowData, updateData, removeRowData, changeAddRowData, insertLoading, removeLoading }}>
        {children}
      </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
