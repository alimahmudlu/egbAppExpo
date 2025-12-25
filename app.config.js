import 'dotenv/config';

export default {
    "expo": {
        "name": "EGB",
        "slug": "egb-expo-app",
        "version": "0.2.35",
        "orientation": "default",
        "icon": "./assets/images/icon-color.png",
        "scheme": "egbappexpo",
        "userInterfaceStyle": "automatic",
        "newArchEnabled": true,
        ios: {
            bundleIdentifier: "com.egb.egb",
            supportsTablet: true,
            config: {
                googleMapsApiKey: "AIzaSyCbSIJJg22-oDVQ8cR-nvQiPPDrG9CZgcE"
            },
            "infoPlist": {
                "NSAppTransportSecurity": {
                    "NSAllowsArbitraryLoads": true
                },
                NSLocationWhenInUseUsageDescription: "Location is required.",
                NSLocationAlwaysAndWhenInUseUsageDescription: "Location maybe work on app background",
                "ITSAppUsesNonExemptEncryption": false,
                NSPhotoLibraryAddUsageDescription: "Bu tətbiq şəkil və videoları yaddaşa yazmaq üçün giriş istəyir.",
                NSPhotoLibraryUsageDescription: "Bu tətbiq şəkil və videolara baxmaq və yazmaq üçün icazə istəyir.",
                NSCameraUsageDescription: "Bu tətbiq kameraya giriş üçün icazə istəyir.",
                NSDocumentsFolderUsageDescription: "Bu tətbiq sənədləri saxlamaq üçün cihazın fayl sisteminə giriş tələb edir."
            },
        },
        android: {
            package: "com.egb.egb",
            edgeToEdgeEnabled: true,
            usesCleartextTraffic: true,
            versionCode: 35,
            "softwareKeyboardLayoutMode": "resize",
            adaptiveIcon: {
                foregroundImage: "./assets/images/icon-white.png",
                backgroundColor: "#0B322F"
            },
            config: {
                googleMaps: {
                    apiKey: "AIzaSyCbSIJJg22-oDVQ8cR-nvQiPPDrG9CZgcE"
                }
            },
            "googleServicesFile": "./google-services.json"
        },
        "web": {
            "bundler": "metro",
            "output": "static",
            "favicon": "./assets/images/icon-color.png",
            config: {
                googleMaps: {
                    apiKey: "AIzaSyCbSIJJg22-oDVQ8cR-nvQiPPDrG9CZgcE"
                },
                "react-native-maps": {
                    apiKey: "AIzaSyCbSIJJg22-oDVQ8cR-nvQiPPDrG9CZgcE"
                }
            },
        },
        "plugins": [
            "expo-web-browser",
            "expo-router",
            [
                "expo-splash-screen",
                {
                    "image": "./assets/images/icon-white.png",
                    "imageWidth": 200,
                    "resizeMode": "contain",
                    "backgroundColor": "#0B322F"
                }
            ],
            [
                "expo-notifications",
                {
                    "icon": "./assets/images/icon-white.png",
                    "color": "#ffffff",
                    "defaultChannel": "default",
                    "sounds": [
                        "./assets/sound/notification_sound.wav",
                        "./assets/sound/notification_sound_other.wav"
                    ],
                    "enableBackgroundRemoteNotifications": true,

                    "ios": {
                        "enableBackgroundRemoteNotifications": true
                    }
                }
            ],
            // "expo-font",
            "expo-secure-store"
        ],
        "experiments": {
            "typedRoutes": true
        },
        "extra": {
            API_URL: process.env.API_URL || 'https://mobile-api.entergreenbuildings.com/api',
            AUTH_TOKEN_KEY: process.env.AUTH_TOKEN_KEY || 'authorization',
            SOCKET_URL: process.env.SOCKET_URL || 'wss://mobile-api.entergreenbuildings.com',
            "router": {},
            "eas": {
                "projectId": "d461924c-79d5-4a37-8efa-85691df04b88"
            }
        }
    }
}
