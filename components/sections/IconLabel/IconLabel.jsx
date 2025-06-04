{/* <SgSectionIconLabel
    icon={<ClockCheck width={20} height={20} />}
    title="View activities"
/>  */}


import React from 'react';
import { View, Text } from 'react-native';
import styles from '@/components/sections/IconLabel/IconLabel.styles';
import ChevronRight from '@/assets/images/chevron-right.svg';

export default function SgSectionIconLabel ({ icon, title }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        {icon && icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <ChevronRight width={20} height={20} />
      </View>
    </View>
  );
};
