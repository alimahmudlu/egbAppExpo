import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '@/components/sections/ProfileBanner/ProfileBanner.styles';
import Vector from '@/assets/images/vector2.svg';

export default function SgSectionProfileBanner ({ image, name, role, onLogout }) {
  return (
    <View style={styles.card}>
      <Vector width={'100%'} resizeMode="stretch" style={styles.vectorBackground}/>
      <View style={styles.topRow}>
        {image ? (
        <Image
          source={image}
          style={styles.avatar}
          resizeMode="cover"
        />
      ) : (
        <View
          style={styles.placeholderAvatar}
        >
          <Text
            style={styles.avatarText}
          >
            {name?.split(' ').map((n) => n[0]).join('')}
          </Text>
        </View>
      )}
        <View style={styles.rightColumn}>
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
    </View>
  );
};