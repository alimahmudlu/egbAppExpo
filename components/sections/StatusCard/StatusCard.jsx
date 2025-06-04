{/* <SgSectionStatusCard
    title="Check In"
    time="7:12 AM"
    icon={<LogIn width={20} height={20} />}
/>

<SgSectionStatusCard
    location="https://arubaunleashed.com/wp-content/uploads/2023/12/Location-of-Aruba-1024x768.jpg"
    title="Check In"
    time="7:12 AM"
    icon={<LogIn width={20} height={20} />}
/> */}


import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import styles from '@/components/sections/StatusCard/StatusCard.styles';

export default function SgSectionStatusCard({ icon, title, time, location }) {
  const hasLocation = !!location;

  const handleOpenMap = () => {
    console.log('Open map pressed');
  };

  return (
      <View style={[styles.container, hasLocation && styles.containerNoPadding]}>
        {hasLocation ? (
          <>
            <Image source={{ uri: location }} style={styles.mapImage} />
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

