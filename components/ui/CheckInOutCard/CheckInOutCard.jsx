import { View, Text, TouchableOpacity } from 'react-native';
import CheckIn from "../../../assets/images/check-in.svg";
import CheckOut from "../../../assets/images/check-out.svg";
import styles from './CheckInOutCard.styles';
import COLORS from '../../../constants/colors';
import SgButton from '../Button/Button';

export default function CheckInOutCard({
  type = 'checkin',
  title,
  time,
  buttonLabel,
  children = null,
}) {
  if (type !== 'checkin' && type !== 'checkout') {
    // Nə səhv verir, nə də göstərir — sadəcə heç nə render olunmur.
    return null;
  }

  const isCheckIn = type === 'checkin';
  const backgroundColor = isCheckIn ? COLORS.brand_50 : COLORS.error_100;
  const Icon = isCheckIn ? CheckIn : CheckOut;

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Icon width={20} height={20} />
      </View>
        <Text style={[styles.time, { color: isCheckIn ? COLORS.brand_600 : COLORS.error_600 }]}
        >
            {time ? time : '--:--:--'}
        </Text>
      </View>
      
      {children && <View style={styles.children}>{children}</View>}
      {buttonLabel && (
        <SgButton color={isCheckIn ? COLORS.brand_600 : COLORS.error_600}>
            {buttonLabel}
        </SgButton>
       )}
    </View>
  );
}
