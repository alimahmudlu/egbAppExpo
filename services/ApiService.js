import axios from 'axios';
import {useAuth} from "@/hooks/useAuth";
import Constants from 'expo-constants';

const { API_URL, AUTH_TOKEN_KEY } = Constants.expoConfig.extra;

const ApiService = axios.create({
    baseURL: API_URL,
});
let originalConfig = {url: ''};

ApiService.interceptors.request.use(
    async (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

ApiService.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        originalConfig = error.config || {};

        if (error.response) {
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default ApiService;