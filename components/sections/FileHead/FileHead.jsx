import React from 'react';
import { View, Text } from 'react-native';
import styles from '@/components/sections/FileHead/FileHead.styles';
import TrashIcon from '@/assets/images/trash.svg';
import FilterIcon from '@/assets/images/filter.svg';
import { Link } from 'expo-router';

export default function SgSectionFileHead ({ title, description, icon }) {
  const renderIcon = () => {
    switch (icon) {
      case 'trash':
        return <TrashIcon width={20} height={20} />;
      case 'filter':
        return <FilterIcon width={20} height={20} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Link href={`/employee/docs/archive`} style={styles.iconWrapper}>
          {renderIcon()}
        </Link>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
