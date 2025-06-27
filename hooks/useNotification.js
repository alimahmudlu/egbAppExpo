import React, { createContext, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  return (
      <NotificationContext.Provider value={{  }}>
        {children}
      </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
