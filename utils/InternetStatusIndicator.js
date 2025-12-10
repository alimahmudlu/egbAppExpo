import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import SafeScreen from "@/components/SafeScreen";
import COLORS from "@/constants/colors";

const InternetStatusIndicator = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [isInternetReachable, setIsInternetReachable] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            setIsInternetReachable(state.isInternetReachable);
        });

        return () => unsubscribe();
    }, []);

    let statusText = null;

    if (!isConnected) {
        statusText = "Device Offline: Network Interface Unavailable";
    } else if (isConnected && !isInternetReachable) {
        statusText = "No internet connection";
    }


    if (!statusText) {
        return null;
    }

    return (
            <View style={styles.container}>
                {/*<View style={styles.containerAbs}>*/}
                    <Text style={styles.text}>{statusText}</Text>
                {/*</View>*/}
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        backgroundColor: COLORS.error_700,
        padding: 8,
        // paddingBottom: 22,
        alignItems: 'center',
        zIndex: 100020,
        // height: 32
    },
    text: {
        color: COLORS.white,
        fontWeight: '700',
        fontSize: 14,
    },
});

export default InternetStatusIndicator;