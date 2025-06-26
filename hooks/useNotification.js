import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ActivityIndicator, View} from "react-native";
import {registerForPushNotificationsAsync} from "@/utils/notification";
import {useAuth} from "@/hooks/useAuth";
import {useApi} from "@/hooks/useApi";

const NOTIFICATION_PERMISSION_KEY = 'notificationPermission'

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user, loading } = useAuth();
  const {request} = useApi();
  const [notificationPermission, setNotificationPermission] = useState({
    token: '',
    permission: true
  });

  useEffect(() => {
    AsyncStorage.getItem(NOTIFICATION_PERMISSION_KEY).then(res => {
      alert(JSON.stringify(res))
      if (res) {
        setNotificationPermission(JSON.parse(res));
      }
    });
  }, []);

  useEffect(() => {
    console.log(notificationPermission, 'notificationPermission');
  }, [notificationPermission]);

  const handleChangeNotificationPermission = async (res) => {
    let token;
    if (user?.id) {
      token = await registerForPushNotificationsAsync(user?.id, request, res)
    }


    const obj = {
      token: token || '',
      permission: res
    }

    await AsyncStorage.setItem(NOTIFICATION_PERMISSION_KEY, JSON.stringify(obj));
    setNotificationPermission(obj);
    alert(JSON.stringify(obj))
  };

  return (
      <NotificationContext.Provider value={{ handleChangeNotificationPermission, notificationPermission }}>
        {children}
      </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
