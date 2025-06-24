import React from 'react';
import { View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Vector from '@/assets/images/vector.svg';
import styles from './Header.styles';
import SgSectionUserInfo from '@/components/sections/UserInfo/UserInfo';
import {useSocket} from '@/hooks/useSocket'

export default function SgTemplateHeader({ name, role, rating, profileImage }) {
    const {socket} = useSocket();
  return (
    <View style={styles.wrapper}>
      <Vector style={styles.vectorBackground} width={'100%'} resizeMode="stretch" />
      <View style={styles.container}>
{/*           <Text>{socket?.id}</Text> */}
        <SgSectionUserInfo
            name={name}
            role={role}
            rating={rating}
            profileImage={profileImage}
            color="white"
            size="lg"
        />
      </View>
    </View>
  );
}
