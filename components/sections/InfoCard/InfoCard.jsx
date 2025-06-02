import { Text, View } from "react-native";
import styles from "@/components/sections/InfoCard/InfoCard.styles";
import RightIcon from '@/assets/images/chevron-right.svg';
import CheckIn from "@/assets/images/check-in.svg";
import CheckOut from "@/assets/images/check-out.svg";

export default function SgSectionInfoCard({ customIcon, title, count, type }) {
  let bgColor;
  let textColor;
  let IconComponent;

  switch (type) {
    case 'checkin':
      bgColor = styles.checkinBg;
      textColor = styles.checkinText;
      IconComponent = CheckIn;
      break;
    case 'checkout':
      bgColor = styles.checkoutBg;
      textColor = styles.checkoutText;
      IconComponent = CheckOut;
      break;
    default:
      bgColor = styles.grayBg;
      textColor = styles.defaultText || { color: '#666' };
      IconComponent = customIcon || null;
      break;
  }

  return (
    <View style={[styles.infoCard, bgColor]}>
      <View style={styles.iconContainer}>
        {IconComponent && (
          <IconComponent width={20} height={20} style={{ color: textColor.color }} />
        )}
        <View style={styles.iconWrapper}>
          <RightIcon width={20} height={20} />
        </View>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={[styles.cardCount, textColor]}>{count}</Text>
    </View>
  );
}
