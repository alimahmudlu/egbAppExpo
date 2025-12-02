// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import { Platform } from 'react-native';
//
// export async function registerForPushNotificationsAsync(userId, request, userStatus) {
//     let token;
//
//     if (Platform.OS === 'android') {
//         Notifications.setNotificationChannelAsync('default', {
//             name: 'default',
//             importance: Notifications.AndroidImportance.MAX,
//             sound: 'default',
//             vibrationPattern: [0, 250, 250, 250],
//             lightColor: '#FF231F7C',
//         });
//     }
//
//     if (userStatus) {
//         if (Device.isDevice) {
//             const { status: existingStatus } = await Notifications.getPermissionsAsync();
//             let finalStatus = existingStatus;
//
//             if (existingStatus !== 'granted') {
//                 const { status } = await Notifications.requestPermissionsAsync();
//                 finalStatus = status;
//             }
//
//             if (finalStatus !== 'granted') {
//                 // alert('Push bildiriş icazəsi verilmədi');
//                 return;
//             }
//
//             token = await Notifications.getExpoPushTokenAsync();
//
//             await request({
//                 url: '/notification/token/create',
//                 method: 'post',
//                 data: {
//                     userId,
//                     token,
//                 }
//             });
//         } else {
//             // alert('Push bildirişlər yalnız fiziki cihazda işləyir');
//         }
//     }
//     else {
//         await request({
//             url: '/notification/token/delete',
//             method: 'post',
//             data: {
//                 userId,
//                 token,
//             }
//         });
//     }
//     return token;
// }


import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
    });
}

async function sendTokenToBackend(apiRequest, token, status) {
    if (!token) return;

    try {
        const endpoint = status === 1 ? '/notification/token/create' : '/notification/token/delete';

        await apiRequest({
            url: endpoint,
            method: 'post',
            data: {
                token: token,
                status: status,
            },
        });
        console.log(`[Bildiriş] Token ${token} backend-də ${status === 1 ? 'aktivləşdirildi' : 'deaktivləşdirildi'} (Status: ${status}).`);
    } catch (error) {
        console.error(`[Bildiriş Xətası] Tokeni backend-ə göndərmək mümkün olmadı:`, error);
    }
}

export async function registerForPushNotificationsAsync(userId, apiRequest, userStatus, oldToken = null) {
    // if (!userId) {
    //     console.warn("[Bildiriş] İstifadəçi ID-si yoxdur. Qeydiyyat mümkün deyil.");
    //     return null;
    // }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (!userStatus) {
        if (oldToken) {
            await sendTokenToBackend(apiRequest, oldToken, 0);
        }
        return null;
    }

    if (Device.isDevice) {
        let token = null;

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.log('[Bildiriş] Push bildiriş icazəsi verilmədi.');
            return null;
        }

        try {
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } catch (e) {
            console.error("[Bildiriş Xətası] Expo Push Tokeni almaq mümkün olmadı:", e);
            return null;
        }

        if (token) {
            await sendTokenToBackend(apiRequest, token, 1);
        }

        return token;

    } else {
        console.log('[Bildiriş] Push bildirişlər yalnız fiziki cihazda işləyir.');
        return null;
    }
}