import { io } from "socket.io-client";
import Constants from 'expo-constants';

const { SOCKET_URL } = Constants.expoConfig.extra;

let socket = null;

export const createSocket = (token) => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            auth: { token },
            transports: ["websocket"],
            timeout: 10000,
            secure: true,
            withCredentials: true
        });
    } else {
        // Əgər socket varsa, sadəcə token-i update et
        socket.auth = { token };
        if (!socket.connected) {
            socket.connect();
        }
    }
    return socket;
};