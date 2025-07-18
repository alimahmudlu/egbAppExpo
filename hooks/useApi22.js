import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useData} from "@/hooks/useData";
import {useAuth} from "@/hooks/useAuth";
import Constants from 'expo-constants';

const { API_URL, AUTH_TOKEN_KEY } = Constants.expoConfig.extra;

const ApiService = axios.create({
    baseURL: API_URL || 'https://mobile-api.entergreenbuildings.com/api',
});

export const useApi = () => {
    const { storeData, setStoreData, updateData } = useData();
    const { accessToken } = useAuth();

    const request = async ({ url, method = 'get', params = {}, data = {}, headers = {}, cache = false, transformRequest }) => {
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
                    [AUTH_TOKEN_KEY || 'authorization']: accessToken || '',
                    ...headers
                },
                transformRequest
            });

            const resData = response.data;

            try {
                updateData(storageKey, resData)
            } catch (e) {
                console.warn('Cache write failed:', e);
                updateData(storageKey, null)
            }

            return resData;
        } catch (err) {
                updateData(storageKey, null)

            console.error('API error:', err, API_URL, url, accessToken);
            throw err;
        }
    };

    return { request };
};
