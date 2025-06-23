import React, {createContext, useState, useEffect, useContext} from "react";
import { createSocket } from "@/services/createSocket";
import {useAuth} from "@/hooks/useAuth";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const {accessToken, loading} = useAuth();

    useEffect(() => {
        const initSocket = async () => {
            if (accessToken) {
                const s = createSocket(accessToken);
                setSocket(s);

                s.on("connect", () => {
                    console.log("Socket bağlandı:", s.id);
                });

                s.on("disconnect", () => {
                    console.log("Socket kəsildi");
                });
            }
        };

        initSocket();
    }, [accessToken]);

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
};
// Custom hook to use the auth context
export function useSocket() {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within an SocketProvider');
    }
    return context;
}
