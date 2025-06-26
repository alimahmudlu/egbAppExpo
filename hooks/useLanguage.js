import React, { createContext, useContext, useEffect, useState } from 'react';
import '@/utils/i18n'
import {useTranslation} from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GB from '@/assets/images/flags/GB.svg';
import RU from '@/assets/images/flags/RU.svg';
import UZ from '@/assets/images/flags/UZ.svg';
import {ActivityIndicator, View} from "react-native";

const LANGUAGE_KEY = 'selectedLanguage';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(undefined);
  const LANGUAGES = [
    { id: 'en', title: 'English', icon: <GB width={24} height={24} /> },
    { id: 'ru', title: 'Russian', icon: <RU width={24} height={24} /> },
    { id: 'uz', title: 'Uzbek', icon: <UZ width={24} height={24} /> },
  ];

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_KEY).then(lang => {
      if (lang) {
        setSelectedLanguage((LANGUAGES || []).find(l => l.id === (lang || 'en')) || {});
        i18n.changeLanguage(lang);
      }
    });
  }, []);

  useEffect(() => {
    console.log(selectedLanguage, 'selectedLanguage');
  }, [selectedLanguage]);

  const handleChangeLanguage = async (lang) => {
    setSelectedLanguage((LANGUAGES || []).find(l => l.id === (lang || 'en')) || {});
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  };

  return (
      <LanguageContext.Provider value={{ handleChangeLanguage, selectedLanguage, languageList: LANGUAGES }}>
        {selectedLanguage ? children : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>}
      </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
