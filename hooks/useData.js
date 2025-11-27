import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'APP_DATA';

const DataContext = createContext();

export const DataProvider = ({onBackPress, children}) => {
    const [storeData, setStoreData] = useState({
        checkInData: {
            checkIn: null,
            checkOut: null,
        },
        cache: {},
        loading: new Map()
    });
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //   const loadData = async () => {
    //     try {
    //       const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    //       if (storedData) {
    //         setStoreData(JSON.parse(storedData));
    //       }
    //     } catch (e) {
    //       console.error('Error loading data:', e);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    //
    //   loadData();
    // }, []);
    //
    // useEffect(() => {
    //   const saveData = async () => {
    //     try {
    //       await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
    //     } catch (e) {
    //       console.error('Error saving data:', e);
    //     }
    //   };
    //
    //   if (!loading) {
    //     // saveData();
    //   }
    // }, [storeData]);

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
            // await AsyncStorage.removeItem(STORAGE_KEY);
            setStoreData({user: null, token: null});
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
    const insertDataWithPagination = async (key, data, total) => {
        setStoreData(prev => {
            return ({
                ...prev,
                cache: {
                    ...prev.cache,
                    [key]: {
                        ...prev.cache?.[key],
                        data: {
                            ...prev.cache?.[key]?.data,
                            total: Number(prev.cache?.[key]?.data?.total || 0) + total,
                            data: [
                                ...prev.cache?.[key]?.data?.data,
                                data
                            ]
                        }
                    }
                }
            })
        });
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

    const removeRowFromPaginationData = async (key, item, identifierKey = 'id') => {
        setStoreData(prev => {

            // Mövcud data obyektini çıxarırıq
            const existingCache = prev.cache?.[key];

            // Əgər key, cache və ya data yoxdursa, heç nə etmirik
            if (!existingCache || !existingCache.data || !Array.isArray(existingCache.data.data)) {
                return prev;
            }

            const currentItems = existingCache.data.data;
            const currentTotal = parseInt(existingCache.data.total, 10) || 0;

            // Silinəcək elementin ID-si və ya dəyəri
            const itemIdentifier = item?.[identifierKey] !== undefined ? item[identifierKey] : item;

            // Massivdən elementləri filterləyərək silirik
            let isItemRemoved = false;

            const updatedItems = currentItems.filter(e => {
                const elementIdentifier = e?.[identifierKey] !== undefined ? e[identifierKey] : e;

                // Elementi saxlayırıqsa (silmürüksə) true, siliriksə false qaytarır
                const shouldKeep = elementIdentifier !== itemIdentifier;

                // Əgər silinən elementi tapmışıqsa (yalnız bir element silinəcəyi fərz edilir)
                if (!shouldKeep) {
                    isItemRemoved = true;
                }

                return shouldKeep;
            });

            // Əgər element həqiqətən silinibsə, 'total' dəyərini azaldırıq
            const updatedTotal = isItemRemoved && currentTotal > 0 ? (currentTotal - 1) : currentTotal;

            // Yenilənmiş state-i qaytarırıq
            return ({
                ...prev,
                cache: {
                    ...prev.cache,
                    [key]: {
                        ...existingCache, // success, message, və s. saxlayır
                        data: {
                            ...existingCache.data, // page və s. saxlayır
                            data: updatedItems, // Yenilənmiş element massivi
                            total: String(updatedTotal) // Total dəyərini string kimi qaytarırıq (API-də string idi)
                        }
                    }
                }
            });
        });
    }

    return (
        <DataContext.Provider value={{
            storeData,
            insertDataWithPagination,
            onBackPress,
            setStoreData,
            loading,
            removeRowFromPaginationData,
            clearData,
            updateDataWithPagination,
            insertData,
            changeRowData,
            updateData,
            removeRowData,
            changeAddRowData,
            insertLoading,
            removeLoading
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
