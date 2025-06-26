import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/components/sections/LanguageSelect/LanguageSelect.styles';
import SgRadio from '@/components/ui/Radio/Radio';
import {useLanguage} from "@/hooks/useLanguage";

export default function SgSectionLanguageSelector() {
  const { languageList, selectedLanguage, handleChangeLanguage } = useLanguage()

  return (
    <View style={styles.container}>
      {languageList.map(lang => {
        const isSelected = selectedLanguage?.id === lang.id;
        return (
          <TouchableOpacity
            activeOpacity={1}
            key={lang.id}
            onPress={() => handleChangeLanguage(lang.id)}
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
