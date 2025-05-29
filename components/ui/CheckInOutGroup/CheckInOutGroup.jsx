import { View } from 'react-native';
import SgCheckInOutCard from '../CheckInOutCard/CheckInOutCard';
import styles from './CheckInOutGroup.styles';

export default function SgCheckInOutGroup() {
  return (
    <View style={styles.container}>
      <SgCheckInOutCard
        type="checkin"
        title="Check In"
        time="18:30 AM"
        buttonLabel="Check in"
      />
      <SgCheckInOutCard
        type="checkout"
        title="Check Out"
      />
    </View>
  );
}
