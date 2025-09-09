import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from '@/components/sections/FileHead/FileHead.styles';
import TrashIcon from '@/assets/images/trash.svg';
import FilterIcon from '@/assets/images/filter.svg';
import {Link, router} from 'expo-router';

export default function SgSectionFileHead ({ title, description, icon, iconText, href, onPress, filter }) {
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
        {icon ? <Pressable style={styles.iconWrapper} onPress={handleClick}>
          {renderIcon()}
        </Pressable> : ''}
          {iconText ? <Pressable style={styles.iconWrapper} onPress={handleClick}>
              <Text>{iconText}</Text>
          </Pressable> : ''}
          {filter ? filter : null}
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
