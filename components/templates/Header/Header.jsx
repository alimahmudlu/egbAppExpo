import React from 'react';
import { View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Vector from '@/assets/images/vector.svg';
import styles from './Header.styles';

export default function SgTemplateHeader({ name, role, rating, profileImage }) {
  return (
    <View style={styles.wrapper}>
      <Vector style={styles.vectorBackground} width={'100%'} resizeMode="stretch" />
      <View style={styles.container}>
        <View style={styles.profileSection}>
          <Image source={profileImage} style={styles.profileImage} resizeMode="cover" />
          <View style={styles.nameSection}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.roleRatingRow}>
              <Text style={styles.role}>{role}</Text>
              {rating && (
                <View style={styles.ratingSection}>
                  <FontAwesome name="star" size={16} style={styles.star} />
                  <Text style={styles.rating}>{rating}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
