// src/services/createSocket.js
import { io } from "socket.io-client";

export const createSocket = (token) => {
    return io("http://192.168.1.60:3000", {
        auth: { token },
        transports: ["websocket"],
        forceNew: true,
    });
};
