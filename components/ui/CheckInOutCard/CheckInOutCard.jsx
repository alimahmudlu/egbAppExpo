import { View, Text, Alert, Platform } from 'react-native';
import CheckIn from "@/assets/images/check-in.svg";
import CheckInModalIcon from "@/assets/images/checkInModal.svg";
import CheckOut from "@/assets/images/check-out.svg";
import CheckOutModalIcon from "@/assets/images/checkOutModal.svg";
import styles from './CheckInOutCard.styles';
import COLORS from '@/constants/colors';
import SgButton from '@/components/ui/Button/Button';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import SgPopup from "@/components/ui/Modal/Modal";
import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import {useAuth} from "@/hooks/useAuth";
import MapView, { Marker } from 'react-native-maps';

export default function SgCheckInOutCard(props) {
  const { accessToken } = useAuth();
  const {
    type = 'checkin',
    title,
    time,
    status = 0,
      mapData = {
        checkIn: {
          latitude: 40.633701,
          longitude: 48.645202
        },
        checkOut: {
          latitude: 40.38,
          longitude: 49.86
        }
      }
  } = props;

  if (type !== 'checkin' && type !== 'checkout') {
    return null;
  }

  const [checkInModal, setCheckInModal] = useState(false)
  const [checkInData, setCheckInData] = useState({})
  const [checkOutModal, setCheckOutModal] = useState(false)
  const [checkOutData, setCheckOutData] = useState({})

  const isCheckIn = type === 'checkin';
  const isCheckOut = type === 'checkout';
  const backgroundColor = isCheckIn ? COLORS.brand_50 : COLORS.error_100;
  const Icon = isCheckIn ? CheckIn : CheckOut;

  function toggleCheckInModal() {
    if (checkInModal) {
      setCheckInData({})
    }

    setCheckInModal(!checkInModal)
  }

  function handleSubmitCheckIn() {
    axios.post('http://192.168.0.108:3000/api/employee/activity/checkin', {
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        latitude: checkInData?.latitude,
        longitude: checkInData?.longitude
    }, {
      headers: {
        'authorization': accessToken || ''
      }
    }).then(res => {
      if (res.data.success) {
        console.log(res?.data?.data);
      } else {
        // Handle error response
        console.log(res.data.message);
      }
    }).catch(err => {
      console.log(err);
    })

    toggleCheckInModal()
  }

  function toggleCheckOutModal() {
    if (checkOutModal) {
      setCheckOutData({})
    }

    setCheckOutModal(!checkOutModal)
  }

  function handleSubmitCheckOut() {
    axios.post('http://192.168.0.108:3000/api/employee/activity/checkout', {
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      latitude: checkOutData?.latitude,
      longitude: checkOutData?.longitude
    }, {
      headers: {
        'authorization': accessToken || ''
      }
    }).then(res => {
      if (res.data.success) {
        console.log(res?.data?.data);
      } else {
        // Handle error response
        console.log(res.data.message);
      }
    }).catch(err => {
      console.log(err);
    })
    toggleCheckOutModal()
  }

  function openInMaps(latitude, longitude) {
    const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const url = Platform.OS === 'ios' 
      ? `${scheme}?q=${latitude},${longitude}` 
      : `${scheme}${latitude},${longitude}`;

    // For Google Maps specific URL
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    // Open the map based on platform
    if (Platform.OS === 'ios') {
      // On iOS, give option to choose between Apple Maps and Google Maps
      Linking.openURL(url)
    } else {
      // On Android, directly open Google Maps
      Linking.openURL(googleMapsUrl);
    }
  }

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
      toggleCheckInModal();
      setCheckInData({latitude, longitude})
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert(
        'Error',
        'Could not get your location. Please try again.',
        [{ text: 'OK' }]
      );
    }
  }

  async function handleCheckOutRequest() {
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
      toggleCheckOutModal();
      setCheckOutData({latitude, longitude})
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
      <View style={{flex: 1, height: 125, borderRadius: 16, overflow: 'hidden', filter: 'grayscale(1)'}}>
        {(isCheckIn && status === 2) && Platform.OS !== 'web' ?
          <MapView
            style={{flex: 1, height: 125}}
            initialRegion={{
              latitude: mapData?.checkIn?.latitude,
              longitude: mapData?.checkIn?.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
        >
          <Marker coordinate={{ latitude: mapData?.checkIn?.latitude, longitude: mapData?.checkIn?.longitude }} />
        </MapView>
            : null
        }
        {(isCheckOut && status === 2) && Platform.OS !== 'web' ?
          <MapView
            style={{flex: 1, height: 125}}
            initialRegion={{
              latitude: mapData?.checkOut?.latitude || 0,
              longitude: mapData?.checkOut?.longitude || 0,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
        >
          <Marker coordinate={{ latitude: mapData?.checkOut?.latitude || 0, longitude: mapData?.checkOut?.longitude || 0 }} />
        </MapView>
            : null
        }
      </View>
      <View style={{paddingHorizontal: 4, paddingVertical: 4,}}>
        {isCheckIn ?
            <>
              {status === 0 ?
                  <SgButton color={COLORS.brand_600} onPress={handleCheckInRequest}>
                    Check In
                  </SgButton>
                  : null
              }
              {status === 1 ?
                  <SgButton
                      style={{borderRadius: 12}}
                      color={COLORS.white}
                      bgColor={COLORS?.brand_600}
                  >
                    Waiting...
                  </SgButton>
                  : null
              }
              {status === 2 ?
                  <SgButton
                      color={COLORS.brand_600}
                      onPress={() => openInMaps(mapData?.checkIn.latitude, mapData?.checkIn.longitude)}
                  >
                    Open on map
                  </SgButton>
                  : null
              }
            </>
            : null
        }
        {isCheckOut ?
            <>
              {status === 0 ?
                  <SgButton color={COLORS.error_700} onPress={handleCheckOutRequest}>
                    Check Out
                  </SgButton>
                  : null
              }
              {status === 1 ?
                  <SgButton
                      style={{borderRadius: 12}}
                      color={COLORS.white}
                      bgColor={COLORS?.error_600}
                  >
                    Waiting...
                  </SgButton>
                  : null
              }
              {status === 2 ?
                  <SgButton
                      color={COLORS.error_700}
                      onPress={() => openInMaps(mapData?.checkOut.latitude, mapData?.checkOut.longitude)}
                  >
                    Open on map
                  </SgButton>
                  : null
              }
            </>
            : null
        }
      </View>

      <SgPopup
          visible={checkInModal}
          onClose={toggleCheckInModal}
          title="Check In"
          description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
          icon={<CheckInModalIcon width={56} height={56} />}
          footerButton={
            <SgButton
                loading={status === 1}
                onPress={handleSubmitCheckIn}
                bgColor={COLORS.primary}
                color={COLORS.white}
            >
              Check in
            </SgButton>
          }
      />

      <SgPopup
          visible={checkOutModal}
          onClose={toggleCheckOutModal}
          title="Check Out"
          description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
          icon={<CheckOutModalIcon width={56} height={56} />}
          footerButton={
            <SgButton
                loading={status === 1}
                onPress={handleSubmitCheckOut}
                bgColor={COLORS.error_600}
                color={COLORS.white}
            >
              Check Out
            </SgButton>
          }
      />
    </View>
  );
}
