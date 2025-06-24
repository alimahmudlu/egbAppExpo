import axios from 'axios';
import {useAuth} from "@/hooks/useAuth";

const API_URL = 'http://192.168.0.108:3000/api'; // Replace with your actual API URL
const AUTH_TOKEN_KEY = 'Authorization';

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