import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useData} from "@/hooks/useData";
import {useAuth} from "@/hooks/useAuth";

const API_URL = 'http://192.168.1.60:3000/api'; // Replace with your actual API URL
const ApiService = axios.create({
    baseURL: API_URL,
});

export const useApi = () => {
    const { storeData, setStoreData } = useData();
    const { accessToken } = useAuth();

    const request = async ({ url, method = 'get', params = {}, data = {}, headers = {}, cache = false }) => {
        const storageKey = `${method.toUpperCase()}:${url}${params.length > 0 ? `?${JSON.stringify(params)}` : ''}`;

        if (cache) {
            try {
                const cached = await AsyncStorage.getItem(storageKey);

                if (cached) {
                    return JSON.parse(cached);
                }
            } catch (e) {
                console.warn('Cache read failed:', e);
            }
        }

        try {
            // setStoreData(prev => ({
            //     ...prev,
            //     cache: {
            //         ...(prev.cache || {}),
            //         [storageKey]: {
            //             loading: true
            //         },
            //     }
            // }));

            const response = await ApiService({
                url,
                method,
                params,
                data,
                headers: {
                    'authorization': accessToken || '',
                    ...headers
                },
            });

            const resData = response.data;



            try {
                setStoreData(prev => ({
                    ...prev,
                    cache: {
                        ...(prev.cache || {}),
                        [storageKey]: {
                            ...resData,
                            loading: false
                        },
                    }
                }));
            } catch (e) {
                console.warn('Cache write failed:', e);
                setStoreData(prev => ({
                    ...prev,
                    cache: {
                        ...(prev.cache || {}),
                        [storageKey]: {
                            loading: false
                        },
                    }
                }));
            }

            return resData;
        } catch (err) {
            setStoreData(prev => ({
                ...prev,
                cache: {
                    ...(prev.cache || {}),
                    [storageKey]: {
                        loading: false
                    },
                }
            }));

            console.error('API error:', err);
            throw err;
        }
    };

    return { request };
};
