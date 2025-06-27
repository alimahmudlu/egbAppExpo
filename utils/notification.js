// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import { Platform } from 'react-native';
// import axios from 'axios';
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
//             token = (await Notifications.getExpoPushTokenAsync()).data;
//             console.log('Expo Push Token:', token);
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
