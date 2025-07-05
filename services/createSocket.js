// src/services/createSocket.js
import { io } from "socket.io-client";
import Constants from 'expo-constants';

const { SOCKET_URL } = Constants.expoConfig.extra;

export const createSocket = (token) => {
    return io(SOCKET_URL, {
        auth: { token },
        transports: ["websocket"],
        forceNew: true,
        timeout: 10000,
    });
};
