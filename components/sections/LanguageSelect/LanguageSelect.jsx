import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/components/sections/LanguageSelect/LanguageSelect.styles';
import GB from '@/assets/images/flags/GB.svg';
import RU from '@/assets/images/flags/RU.svg';
import UZ from '@/assets/images/flags/UZ.svg';
import SgRadio from '@/components/ui/Radio/Radio';

const LANGUAGES = [
  { id: 'en', title: 'English', icon: <GB width={24} height={24} /> },
  { id: 'ru', title: 'Russian', icon: <RU width={24} height={24} /> },
  { id: 'uz', title: 'Uzbek', icon: <UZ width={24} height={24} /> },
];

export default function SgSectionLanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <View style={styles.container}>
      {LANGUAGES.map(lang => {
        const isSelected = selectedLanguage === lang.id;
        return (
          <TouchableOpacity
            activeOpacity={1}
            key={lang.id}
            onPress={() => setSelectedLanguage(lang.id)}
            style={[
              styles.item,
              isSelected && styles.selectedItem
            ]}
          >
            <SgRadio selected={isSelected} />
            <View style={styles.content}>
              {lang.icon}
              <Text style={styles.title}>{lang.title}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
