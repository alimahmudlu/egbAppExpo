import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import {useLocalSearchParams, usePathname, useRouter} from "expo-router";
import {registerForPushNotificationsAsync} from "@/utils/notification"; // notification.js faylı
import {useAuth} from "@/hooks/useAuth";
import {useApi} from "@/hooks/useApi";
import {Platform} from "react-native";

const NOTIFICATION_PERMISSION_KEY = 'notification_state';

// Kontekst
const NotificationContext = createContext({
    handleChangeNotificationPermission: (status) => {},
    notificationPermission: { token: '', permission: false },
    loadNotification: () => {}
});

export const NotificationProvider = ({children}) => {
    // Hooks istifadəsi (Real layihədə mock-ları silin!)
    const {user, loading, accessToken} = useAuth();
    const router = useRouter();
    const {request} = useApi();
    const pathname = usePathname();
    const {refreshKey, refreshing} = useLocalSearchParams();

    const [notificationPermission, setNotificationPermission] = useState({
        token: '',
        permission: false
    });
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        if (loading || !user?.id) return;

        const checkAndRegister = async () => {
            const storedState = await AsyncStorage.getItem(NOTIFICATION_PERMISSION_KEY);
            const initialState = storedState ? JSON.parse(storedState) : { token: '', permission: false };

            // Cihazın real icazə statusunu yoxla
            const currentStatus = await Notifications.getPermissionsAsync();
            const isGranted = currentStatus.status === 'granted';

            let finalToken = initialState.token;

            if (isGranted) {
                // İcazə var VƏ token yoxdur (Əl ilə Settings-də açıldı)
                if (!initialState.token) {
                    finalToken = await registerForPushNotificationsAsync(user.id, request, true);
                }
            } else {
                // İcazə yoxdur VƏ bizdə token var (Əl ilə Settings-də bağlandı)
                if (initialState.token) {
                    await registerForPushNotificationsAsync(user.id, request, false, initialState.token);
                    finalToken = '';
                }
            }

            const newState = { token: finalToken || '', permission: isGranted };
            await AsyncStorage.setItem(NOTIFICATION_PERMISSION_KEY, JSON.stringify(newState));
            setNotificationPermission(newState);
        };

        checkAndRegister();
    }, [user?.id, loading]);


    const handleChangeNotificationPermission = useCallback(async (newPermissionStatus) => {
        if (loading || !user?.id) return;

        const storedState = await AsyncStorage.getItem(NOTIFICATION_PERMISSION_KEY);
        const { token: oldToken } = storedState ? JSON.parse(storedState) : { token: '' };

        let newToken = '';

        if (newPermissionStatus === true) {
            newToken = await registerForPushNotificationsAsync(user.id, request, true);
        } else {
            if (oldToken) {
                await registerForPushNotificationsAsync(user.id, request, false, oldToken);
            }
        }

        // Əməliyyatdan sonra son icazə statusunu yenidən yoxla
        const currentStatus = await Notifications.getPermissionsAsync();
        const isGranted = currentStatus.status === 'granted';

        const obj = {
            token: isGranted ? (newToken || oldToken) : '',
            permission: newPermissionStatus
        };

        await AsyncStorage.setItem(NOTIFICATION_PERMISSION_KEY, JSON.stringify(obj));
        setNotificationPermission(obj);

    }, [user?.id, loading, request]);

    function loadNotification() {
        request({
            url: `/notifications/count`,
            method: 'get',
        }).then().catch(err => {
            console.error('[Bildiriş Xətası] Bildiriş sayını yükləmək mümkün olmadı:', err)
        });
    }

    useEffect(() => {
        if (!loading && accessToken) {
            loadNotification()
        }
    }, [refreshKey, pathname, refreshing, loading]);

    useEffect(() => {
        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
        }

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            const { data } = response.notification.request.content;

            if (data && data.url) {
                router.push(data.url);
            }
        });

        return () => {
            responseListener.remove();
        };
    }, []);


    return (
        <NotificationContext.Provider value={{handleChangeNotificationPermission, notificationPermission, loadNotification}}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);