// const data = [
//   { label: '1-2', value: 14, percentage: 90 },
//   { label: '3-4', value: 9, percentage: 70 },
//   { label: '5-6', value: 7, percentage: 50 },
//   { label: '7-8', value: 11, percentage: 80 },
//   { label: '9-10', value: 2, percentage: 20 },
// ];

// {data.map((item, index) => (
//     <SgSectionProgressBar
//         key={index}
//         label={item.label}
//         value={item.value}
//         percentage={item.percentage}
//     />
// ))}


import React from 'react';
import { View, Text } from 'react-native';
import styles from '@/components/sections/ProgressBar/ProgressBar.styles';

export default function SgSectionProgressBar ({ label, value, percentage }) {
  const safePercentage = Math.min(percentage, 100);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label} hours</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${safePercentage}%` }]} />
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
