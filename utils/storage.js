import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Web üçün Local Storage istifadə edən əvəzedici obyekt yaradırıq
const WebSecureStore = {
    async setItemAsync( key, value) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, value);
        }
    },
    async getItemAsync(key) {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(key);
        }
        return null;
    },
    async deleteItemAsync(key) {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(key);
        }
    },
};

// Platforma əsasında düzgün storage modulunu ixrac edirik
const storage = Platform.select({
    web: WebSecureStore,
    default: SecureStore,
});

export default storage;