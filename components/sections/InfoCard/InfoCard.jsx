import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "@/components/sections/InfoCard/InfoCard.styles";
import RightIcon from '@/assets/images/chevron-right.svg';

export default function SgSectionInfoCard ({ icon, title, count, type, backgroundColor }) {
  const bgColor = backgroundColor ? styles.grayBg : type === 'checkin' ? styles.checkinBg : styles.checkoutBg;
  const textColor = type === 'checkin' ? styles.checkinText : styles.checkoutText;

  return (
    <View style={[styles.infoCard, bgColor]}>
        <View style={styles.iconContainer}>
            <Ionicons name={icon} size={20} color={textColor.color} />
            <View style={styles.iconWrapper}>
                <RightIcon width={20} height={20} />
            </View>
        </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={[styles.cardCount, textColor]}>{count}</Text>
    </View>
  );
};