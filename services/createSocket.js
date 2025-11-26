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
        socket.auth = { token };
        if (!socket.connected) {
            socket.connect();
        }
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
        // console.log("🔌 Socket bağlantısı kəsildi (logout)");
    }
};