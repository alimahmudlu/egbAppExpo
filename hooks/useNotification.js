import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {registerForPushNotificationsAsync} from "@/utils/notification";
import {useAuth} from "@/hooks/useAuth";
import {useApi} from "@/hooks/useApi";
import {useFocusEffect, useLocalSearchParams, usePathname} from "expo-router";

const NOTIFICATION_PERMISSION_KEY = 'notificationPermission'

const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
    const {user, loading} = useAuth();
    const {request} = useApi();
    const pathname = usePathname();
    const {refreshKey, refreshing} = useLocalSearchParams();
    const [notificationPermission, setNotificationPermission] = useState({
        token: '',
        permission: true
    });

    useEffect(() => {
        AsyncStorage.getItem(NOTIFICATION_PERMISSION_KEY).then(async res => {
            if (res) {
                setNotificationPermission(JSON.parse(res));
            } else {
                let token;
                if (user?.id) {
                    token = await registerForPushNotificationsAsync(user?.id, request, res)
                }

                const obj = {
                    token: token || '',
                    permission: !!token
                }

                await AsyncStorage.setItem(NOTIFICATION_PERMISSION_KEY, JSON.stringify(obj));
                setNotificationPermission(obj);
            }
        });
    }, []);

    function loadNotification() {
        request({
            url: `/notifications`,
            method: 'get',
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });
    }

    useEffect(() => {
        loadNotification()
    }, [refreshKey, pathname, refreshing]);

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
        // alert(JSON.stringify(obj))
    };

    return (
        <NotificationContext.Provider value={{handleChangeNotificationPermission, notificationPermission, loadNotification}}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
