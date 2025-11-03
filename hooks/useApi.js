import {createContext, useContext} from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import {useData} from "@/hooks/useData";
import {useAuth} from "@/hooks/useAuth";
import {ActivityIndicator, Alert, View} from "react-native";
import COLORS from "@/constants/colors";
import {useTranslation} from "react-i18next";

const { API_URL } = Constants.expoConfig.extra;

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
    const {t} = useTranslation();

    const request = async (props) => {
        const { url, method = 'get', params = {}, headers = {}, updateStatus = true } = props
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
                ...props
            });

            const resData = response.data;

            if (updateStatus) {
                try {
                    updateData(storageKey, resData)
                } catch (e) {
                    console.warn('Cache write failed:', e);
                    updateData(storageKey, null)
                }
            }

            return resData;
        } catch (err) {
            if (err.response && err.response.status === 403) {
                Alert.alert(t('permissionErrorTitle'), t('permissionErrorDescription'));

                updateData(storageKey, null);
                throw new Error(`${err.response.status}: ${err.response.data}`);
            }


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
                {storeData?.loading?.size > 0 ?
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