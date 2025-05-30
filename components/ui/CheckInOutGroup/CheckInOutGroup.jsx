import { View } from 'react-native';
import SgCheckInOutCard from '@/components/ui/CheckInOutCard/CheckInOutCard';
import styles from '@/components/ui/CheckInOutGroup/CheckInOutGroup.styles';

export default function SgCheckInOutGroup(props) {
    const {children} = props;

  return (
    <View style={styles.container}>
        {children}
    </View>
  );
}
