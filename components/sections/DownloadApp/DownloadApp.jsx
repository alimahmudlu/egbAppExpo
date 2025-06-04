import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/components/sections/DownloadApp/DownloadApp.styles';
import PlayStoreIcon from '@/assets/images/Google Play logo.svg';
import PlayStoreLabel from '@/assets/images/playlabel.svg';
import AppStoreIcon from '@/assets/images/Apple logo.svg';
import AppStoreLabel from '@/assets/images/Apple label.svg';

const platformData = {
  android: {
    Icon: PlayStoreIcon,
    IconLabel: PlayStoreLabel,
  },
  ios: {
    Icon: AppStoreIcon,
    IconLabel: AppStoreLabel,
  },
};

export default function SgSectionDownloadApp({ version, title, platforms }) {
  const renderButtons = () => {
  return platforms.map((platform) => {
    const data = platformData[platform];
    if (!data) return null;

    const { Icon, IconLabel } = data;
        return (
        <TouchableOpacity key={platform} style={styles.button}>
            <Icon style={styles.icon} />
            <IconLabel style={styles.icon} />
        </TouchableOpacity>
        );
    });
    };

  return (
    <View style={styles.container}>
      <View style={styles.versionContainer}>
        <Text style={styles.versionLabel}>App version</Text>
        <Text style={styles.version}>v{version}</Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>{renderButtons()}</View>
    </View>
  );
}
