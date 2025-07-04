import 'dotenv/config';

export default {
  "expo": {
    "name": "EGB",
    "slug": "egb-expo-app",
    "version": "0.0.6",
    "orientation": "default",
    "icon": "./assets/images/icon-color.png",
    "scheme": "egbappexpo",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    ios: {
      bundleIdentifier: "com.egb.egb",
      supportsTablet: true,
      config: {
        googleMapsApiKey: "AIzaSyA_js-21GPeRyjEUFZGfjSBm8z2L8FQ7eg"
      },
      "infoPlist": {
        "NSAppTransportSecurity": {
          "NSAllowsArbitraryLoads": true
        },
        NSLocationWhenInUseUsageDescription: "Location is required.",
        NSLocationAlwaysAndWhenInUseUsageDescription: "Location maybe work on app background",
        "ITSAppUsesNonExemptEncryption": false
      }
    },
    android: {
      package: "com.alimahmudlu.egbexpoapp",
      edgeToEdgeEnabled: true,
      usesCleartextTraffic: true,
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon-white.png",
        backgroundColor: "#0B322F"
      },
      config: {
        googleMaps: {
          apiKey: "AIzaSyA_js-21GPeRyjEUFZGfjSBm8z2L8FQ7eg"
        }
      },
      "googleServicesFile": "./google-services.json"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/icon-color.png"
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
          "enableBackgroundRemoteNotifications": false
        }
      ]
      // "expo-font",
      // "expo-secure-store",

    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      API_URL: process.env.API_URL || 'https://alimahmudlu-egb.duckdns.org/api',
      AUTH_TOKEN_KEY: process.env.AUTH_TOKEN_KEY || 'authorization',
      SOCKET_URL: process.env.SOCKET_URL || 'https://alimahmudlu-egb.duckdns.org',
      "router": {},
      "eas": {
        "projectId": "d461924c-79d5-4a37-8efa-85691df04b88"
      }
    }
  }
}
