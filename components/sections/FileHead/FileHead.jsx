import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '@/components/sections/FileHead/FileHead.styles';
import TrashIcon from '@/assets/images/trash.svg';
import FilterIcon from '@/assets/images/filter.svg';
import {router} from 'expo-router';
import COLORS from '@/constants/colors';

export default function SgSectionFileHead ({ title, description, icon, iconText, href, onPress, filter }) {
  const renderIcon = () => {
    switch (icon) {
      case 'trash':
        return <TrashIcon width={20} height={20} color={COLORS.brand_950} fill={COLORS.brand_950} />;
      case 'filter':
        return <FilterIcon width={20} height={20} color={COLORS.brand_950} fill={COLORS.brand_950} />;
      default:
        return null;
    }
  };

  function handleClick() {
    if (href) {
      router.push(href);
    }
    else (
        onPress?.()
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        {icon ? (
          <TouchableOpacity style={styles.iconWrapper} onPress={handleClick} activeOpacity={0.7}>
            {renderIcon()}
          </TouchableOpacity>
        ) : null}
        {iconText ? (
          <TouchableOpacity style={styles.iconWrapper} onPress={handleClick} activeOpacity={0.7}>
            <Text style={styles.iconText}>{iconText}</Text>
          </TouchableOpacity>
        ) : null}
        {filter ? filter : null}
      </View>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}
