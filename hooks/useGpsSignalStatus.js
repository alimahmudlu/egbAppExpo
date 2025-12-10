import React, { useState, useEffect, useRef } from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native'; // <--- AppState-i import edin!
import * as Location from 'expo-location';
import COLORS from "@/constants/colors";

const MAX_WEAK_SIGNAL_ACCURACY = 30;


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

export const useGpsSignalStatus = () => {
    const [isGpsWeak, setIsGpsWeak] = useState(false);
    const [isLocationEnabled, setIsLocationEnabled] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);

    // Lokasiya izləyicisi (subscription) üçün ref
    const locationSubscriptionRef = useRef(null);
    // AppState üçün ref
    const appState = useRef(AppState.currentState);

    // *** Bütün yoxlamaları edən əsas funksiya ***
    const runAllChecks = async () => {
        // 1. İcazələri yoxla
        const { status } = await Location.getForegroundPermissionsAsync(); // Yalnız statusu al, təkrar tələb etmə
        const permissionGranted = status === 'granted';
        setHasPermission(permissionGranted);

        if (!permissionGranted) {
            // Əgər icazə yoxdursa, başqa yoxlamalara ehtiyac yoxdur.
            if (locationSubscriptionRef.current) {
                locationSubscriptionRef.current.remove();
                locationSubscriptionRef.current = null;
            }
            setIsGpsWeak(false);
            setIsLocationEnabled(false);
            return;
        }

        // 2. Lokasiya Xidmətlərinin Qoşulu olub olmadığını yoxla (Real-Time olaraq yenilənəcək!)
        const enabled = await Location.isBackgroundLocationAvailableAsync();
        setIsLocationEnabled(enabled);

        if (!enabled) {
            // Əgər GPS sönübsə, siqnal dəqiqliyi yoxlamasını dayandır
            if (locationSubscriptionRef.current) {
                locationSubscriptionRef.current.remove();
                locationSubscriptionRef.current = null;
            }
            setIsGpsWeak(false);
            return;
        }

        // 3. Lokasiya izləməsini başla (və ya davam etdir)
        if (!locationSubscriptionRef.current) {
            const subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.Highest,
                    timeInterval: 5000,
                },
                (location) => {
                    const currentAccuracy = location.coords.accuracy || location.coords.horizontalAccuracy;
                    setIsGpsWeak(currentAccuracy > MAX_WEAK_SIGNAL_ACCURACY);
                }
            );
            locationSubscriptionRef.current = subscription;
        }
    };

    useEffect(() => {
        // Tətbiqin ilk yüklənməsi vəziyyəti
        runAllChecks();

        // *** AppState Listener (Real-Time Həlli) ***
        const handleAppStateChange = (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                // Tətbiq arxa fondan ön plana qayıtdı (istifadəçi GPS-i yandırıb/söndürə bilər)
                runAllChecks();
            }
            appState.current = nextAppState;
        };

        const stateSubscription = AppState.addEventListener('change', handleAppStateChange);

        // Təmizləmə funksiyası
        return () => {
            // 1. Lokasiya İzləməsini dayandır
            if (locationSubscriptionRef.current) {
                locationSubscriptionRef.current.remove();
            }
            // 2. AppState Listener-i dayandır
            stateSubscription.remove();
        };
    }, []);

    const renderSystemAlertBanner = () => {
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
                <View style={[styles.banner, isGpsWeak ? styles.warning : null, isLocationEnabled ? null : styles.error]}>
                    <Text style={styles.text}>{statusText}</Text>
                </View>
            </View>
        );
    };

    return { isGpsWeak, isLocationEnabled, hasPermission, renderSystemAlertBanner };
};