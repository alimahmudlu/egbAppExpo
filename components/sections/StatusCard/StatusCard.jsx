import MapView, {Marker} from "react-native-maps";

import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import styles from '@/components/sections/StatusCard/StatusCard.styles';
import * as Linking from "expo-linking";

export default function SgSectionStatusCard({ icon, title, time, mapData }) {
  const hasLocation = !!mapData?.longitude;

  const handleOpenMap = () => {
    const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const url = Platform.OS === 'ios'
        ? `${scheme}?q=${mapData?.latitude},${mapData?.longitude}`
        : `${scheme}${mapData?.latitude},${mapData?.longitude}`;

    // For Google Maps specific URL
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapData?.latitude},${mapData?.longitude}`;

    // Open the map based on platform
    if (Platform.OS === 'ios') {
      // On iOS, give option to choose between Apple Maps and Google Maps
      Linking.openURL(url)
    } else {
      // On Android, directly open Google Maps
      Linking.openURL(googleMapsUrl);
    }
  };
  //
  // function openInMaps(latitude, longitude) {
  //
  // }

  return (
      <View style={[styles.container, hasLocation && styles.containerNoPadding]}>
        {mapData?.longitude ? (
          <>
            <MapView
                style={{flex: 1, height: 125}}
                initialRegion={{
                  latitude: Number(mapData?.latitude) || 0,
                  longitude: Number(mapData?.longitude) || 0,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
            >
              <Marker coordinate={{ latitude: Number(mapData?.latitude) || 0, longitude: Number(mapData?.longitude) || 0 }} />
            </MapView>
            <TouchableOpacity style={styles.openMapContainer} onPress={handleOpenMap} activeOpacity={0.8}>
              <Text style={styles.openMap}>Open on map</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{title}</Text>
              {icon}
            </View>
            <Text style={styles.time}>{time}</Text>
          </>
        )}
      </View>
  );
}

