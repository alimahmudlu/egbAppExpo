import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import {Text, View, StyleSheet} from "react-native";
import COLORS from "@/constants/colors";

const MIN_ACCEPTABLE_ACCURACY = 30;

const styles = StyleSheet.create({
    content: {
        backgroundColor: COLORS.error_700,
        padding: 8,
        alignItems: 'center',
        zIndex: 100021,
    },
    banner: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    warning: {
        backgroundColor: '#ffcc00',
    },
    error: {
        backgroundColor: '#ff4d4d',
    },
    text: {
        color: COLORS.white,
        fontWeight: '700',
        fontSize: 14,
        textAlign: 'center',
    },
});

const GpsSignalStatusIndicator = () => {
    const [isGpsWeak, setIsGpsWeak] = useState(false);
    const [isLocationEnabled, setIsLocationEnabled] = useState(true);
    const [hasPermission, setHasPermission] = useState(true);

    useEffect(() => {
        let subscription = null;

        const startLocationMonitoring = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            setHasPermission(status === 'granted');

            setInterval(async () => {
                const enabled = await Location.isBackgroundLocationAvailableAsync();
                setIsLocationEnabled(enabled);
            }, 5000)

            subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.Highest,
                    timeInterval: 5000,
                },
                (location) => {
                    const currentAccuracy = location.coords.accuracy || location.coords.horizontalAccuracy;

                    if (currentAccuracy > MIN_ACCEPTABLE_ACCURACY) {
                        setIsGpsWeak(true);
                    } else {
                        setIsGpsWeak(false);
                    }
                }
            );
        };

        startLocationMonitoring();

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, []);


    let statusText = null;

    if (!hasPermission) {
        statusText = "Location Access Required: Permission to access the device`s location has been denied. Please enable it in the device settings.";
    }
    else if (!isLocationEnabled) {
        statusText = "Location Services Disabled: The device`s GPS services are currently turned off. Accurate positioning requires these services to be enabled.";
    }
    else if (isGpsWeak) {
        statusText = "Weak GPS Signal Detected. The current location data accuracy is insufficient. Positioning may be unreliable.";
    }


    if (!statusText) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={[styles.banner, isGpsWeak ? styles.warning : null, isLocationEnabled ? null : styles.error, hasPermission ? null : styles.error]}>
                <Text style={styles.text}>{statusText}</Text>
            </View>
        </View>
    );
};

export default GpsSignalStatusIndicator;