import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en', // varsayılan dil
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                logout: 'Logout en',
            },
        },
        ru: {
            translation: {
                logout: 'Logout ru',
            },
        },
        uz: {
            translation: {
                logout: 'Logout uz',
            },
        },
    },
});

export default i18n;