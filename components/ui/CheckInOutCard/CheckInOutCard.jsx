import { View, Text, TouchableOpacity, Alert } from 'react-native';
import CheckIn from "@/assets/images/check-in.svg";
import CheckOut from "@/assets/images/check-out.svg";
import styles from './CheckInOutCard.styles';
import COLORS from '@/constants/colors';
import SgButton from '@/components/ui/Button/Button';
import * as Location from 'expo-location';

export default function SgCheckInOutCard(props) {
  const {
    type = 'checkin',
    title,
    time,
    buttonLabel,
    children = null,
    status = 0, 
  } = props;
  if (type !== 'checkin' && type !== 'checkout') {
    return null;
  }

  const isCheckIn = type === 'checkin';
  const backgroundColor = isCheckIn ? COLORS.brand_50 : COLORS.error_100;
  const Icon = isCheckIn ? CheckIn : CheckOut;

  async function handleCheckInRequest() {
    try {
      // Request permission to access locations
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Please allow location access to check in.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Get the current position
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
        // Log the location data
      if (props.onLocationReceived) {
        props.onLocationReceived({ latitude, longitude });
      }

      // onSuccess callback
      // FIXME: This is where you would handle the successful check-in logic, sending the location and now time to your backend.
      Alert.alert('Success', `Location captured successfully! ${latitude}, ${longitude}`);

    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert(
        'Error',
        'Could not get your location. Please try again.',
        [{ text: 'OK' }]
      );
    }
  }

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
      {isCheckIn ?
          <>
            {status === 0 ?
                <SgButton color={COLORS.brand_600} onPress={handleCheckInRequest}>
                  Check In
                </SgButton>
                : null
            }
            {status === 1 ?
                <SgButton color={COLORS.brand_600}>
                  Waiting...
                </SgButton>
                : null
            }
            {status === 2 ?
                <SgButton color={COLORS.brand_600}>
                  Open on map
                </SgButton>
                : null
            }
          </>
        : null
      }
    </View>
  );
}
