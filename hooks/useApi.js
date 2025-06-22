import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useData} from "@/hooks/useData";
import {useAuth} from "@/hooks/useAuth";

const API_URL = 'http://192.168.0.108:3000/api'; // Replace with your actual API URL
const ApiService = axios.create({
    baseURL: API_URL,
});

export const useApi = () => {
    const { storeData, setStoreData } = useData();
    const { accessToken } = useAuth();

    const request = async ({ url, method = 'get', params = {}, data = {}, headers = {}, cache }) => {
        const storageKey = `${method.toUpperCase()}:${url}?${JSON.stringify(params)}`;

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
            // FIXME: BURA BAXMAQ LAZIMDIR, XETA VERE BILER.
            await AsyncStorage.setItem(storageKey, JSON.stringify({
                loading: true
            }));

            setStoreData(prev => ({
                ...prev,
                cache: {
                    ...(prev.cache || {}),
                    [storageKey]: {
                        loading: true
                    },
                }
            }));

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
                await AsyncStorage.setItem(storageKey, JSON.stringify({
                    ...resData,
                    loading: false
                }));

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
            }

            return resData;
        } catch (err) {
            console.error('API error:', err);
            throw err;
        }
    };

    return { request };
};
