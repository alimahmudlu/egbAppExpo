import 'dotenv/config';

export default {
  "expo": {
    "name": "EGB",
    "slug": "egb-expo-app",
    "version": "0.0.3",
    "orientation": "default",
    "icon": "./assets/images/icon-color.png",
    "scheme": "egbappexpo",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": false,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.egb.egb",
      "infoPlist": {
        "ITSAppUsesNonExemptEncryption": false
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/icon-white.png",
        "backgroundColor": "#0B322F"
      },
      "edgeToEdgeEnabled": true,
      "package": "com.alimahmudlu.egbexpoapp",
      "usesCleartextTraffic": true,
      "permissions": []
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
      // "expo-secure-store"
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
