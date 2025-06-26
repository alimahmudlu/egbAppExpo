import React, { createContext, useContext, useState } from 'react';

const InitialRedirectContext = createContext({
    initialRedirect: false,
    setInitialRedirect: () => {},
});

export function InitialRedirectProvider({ children }) {
    const [initialRedirect, setInitialRedirect] = useState(false);
    return (
        <InitialRedirectContext.Provider value={{ initialRedirect, setInitialRedirect }}>
            {children}
        </InitialRedirectContext.Provider>
    );
}

export function useInitialRedirect() {
    return useContext(InitialRedirectContext);
}