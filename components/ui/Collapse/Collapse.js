import React, { useState, useRef } from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet, LayoutChangeEvent, Platform} from 'react-native';
import COLORS from "@/constants/colors";

const CollapsibleView = ({ title, children }) => {
    const [collapsed, setCollapsed] = useState(true);
    const [contentHeight, setContentHeight] = useState(0); // Məzmunun real hündürlüyü

    // Animasiya üçün dəyər: 0 (yığılmış) və 1 (açılmış) arasında olacaq
    const animation = useRef(new Animated.Value(0)).current;

    // Hündürlüyün 0-dan real hündürlüyə interpolasiyası
    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, contentHeight], // contentHeight burada kritikdir!
    });

    // Məzmunun hündürlüyünü ölçmək üçün funksiya
    const onContentLayout = (event) => {
        // Hündürlük yalnız bir dəfə ölçülür (əgər 0-dırsa)
        if (contentHeight === 0) {
            setContentHeight(event.nativeEvent.layout.height);
        }
    };

    const toggleCollapse = () => {
        const toValue = collapsed ? 1 : 0; // 1-ə (aç) və ya 0-a (yığ)

        Animated.timing(animation, {
            toValue: toValue,
            duration: 300, // Animasiya müddəti
            useNativeDriver: false, // Hündürlüyü animasiya edərkən 'false' olmalıdır
        }).start();

        setCollapsed(!collapsed);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleCollapse} style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text>{collapsed ? '+' : '-'}</Text>
            </TouchableOpacity>

            <Animated.View style={[styles.collapsibleContainer, { height: heightInterpolate }]}>
                <View
                    style={styles.content}
                    onLayout={onContentLayout}
                >
                    {children}
                </View>
            </Animated.View>
        </View>
    );
};

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: '#ccc',
        // borderRadius: 5,
        overflow: 'hidden',


        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        // padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        // Modern Kölgə Effekti (Minimalist qalır)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
        borderWidth: isAndroid ? 0 : 0.5,
        borderColor: isAndroid ? 'transparent' : COLORS.gray_200,
    },
    header: {
        padding: 15,
        // backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333333',
    },
    collapsibleContainer: {
        overflow: 'hidden',
    },
    content: {
        position: 'absolute',
        width: '100%',
        padding: 15,
        paddingTop: 0,
    },
});

export default CollapsibleView;