import {createContext, useContext, useState} from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useData} from "@/hooks/useData";
import {useAuth} from "@/hooks/useAuth";
import {ActivityIndicator, Text, View} from "react-native";
import COLORS from "@/constants/colors";

const { API_URL, AUTH_TOKEN_KEY } = Constants.expoConfig.extra;

// Create axios instance with base URL
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const ApiContext = createContext(null);

export function ApiProvider({children}) {
    const { storeData, updateData, insertLoading, removeLoading, } = useData();
    const { accessToken } = useAuth();

    const request = async ({ url, method = 'get', params = {}, data = {}, headers = {}, cache = false, transformRequest }) => {
        // const storageKey = `${method.toUpperCase()}:${url}${Object.keys(params).length > 0 ? `?${JSON.stringify(params)}` : ''}`;
        const storageKey = `${method.toUpperCase()}:${url}`;

        // if (cache) {
        //     try {
        //         const cached = await AsyncStorage.getItem(storageKey);
        //
        //         if (cached) {
        //             return JSON.parse(cached);
        //         }
        //     } catch (e) {
        //         console.warn('Cache read failed:', e);
        //     }
        // }

        try {
            insertLoading(storageKey)


            // Make API call to authenticate
            const response = await api({
                url,
                method: method || 'GET',
                headers: {
                    'authorization': accessToken || "NO_TOKEN",
                    ...headers
                },
                params,
                data,
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
            throw err;
        } finally {
            removeLoading(storageKey)
        }
    };

    return (
        <ApiContext.Provider
            value={{
                request
            }}>
            <>
                {storeData?.loading.size > 0 ?
                    <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, opacity: 0.5, flex: 1, width: '100%', height: '100%', backgroundColor: COLORS.gray_blue_200, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#007BFF" />
                    </View>
                    : null
                }
                {children}
            </>
        </ApiContext.Provider>
    );
}

// Custom hook to use the auth context
export function useApi() {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}