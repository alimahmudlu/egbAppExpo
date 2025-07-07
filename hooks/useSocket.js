// context/SocketProvider.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { createSocket, disconnectSocket } from "@/services/createSocket";
import { useAuth } from "@/hooks/useAuth";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { accessToken } = useAuth();

    useEffect(() => {
        if (accessToken) {
            const s = createSocket(accessToken);
            setSocket(s);

            s.on("connect", () => {
                console.log("✅ Socket bağlandı:", s.id);
            });

            s.on("disconnect", () => {
                console.log("❌ Socket kəsildi");
            });
        } else {
            disconnectSocket();
            setSocket(null);
        }

        return () => {
            disconnectSocket();
            setSocket(null);
        };
    }, [accessToken]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export function useSocket() {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
}
