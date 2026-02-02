import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Platform } from 'react-native';
import COLORS from "@/constants/colors";
import { Ionicons } from '@expo/vector-icons';

const CollapsibleView = ({ title, children }) => {
    const [collapsed, setCollapsed] = useState(true);
    const [contentHeight, setContentHeight] = useState(0);

    const animation = useRef(new Animated.Value(0)).current;
    const rotateAnimation = useRef(new Animated.Value(0)).current;

    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, contentHeight],
    });

    const rotateInterpolate = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const onContentLayout = (event) => {
        if (contentHeight === 0) {
            setContentHeight(event.nativeEvent.layout.height);
        }
    };

    const toggleCollapse = () => {
        const toValue = collapsed ? 1 : 0;

        Animated.parallel([
            Animated.timing(animation, {
                toValue: toValue,
                duration: 250,
                useNativeDriver: false,
            }),
            Animated.timing(rotateAnimation, {
                toValue: toValue,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();

        setCollapsed(!collapsed);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={toggleCollapse}
                style={styles.header}
                activeOpacity={0.7}
            >
                <View style={styles.titleContainer}>
                    {title}
                </View>
                <Animated.View style={[styles.iconContainer, { transform: [{ rotate: rotateInterpolate }] }]}>
                    <Ionicons
                        name="chevron-down"
                        size={20}
                        color={COLORS.gray_500}
                    />
                </Animated.View>
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

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: COLORS.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.gray_100,
        shadowColor: COLORS.brand_950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    header: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        paddingRight: 12,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: COLORS.gray_50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    collapsibleContainer: {
        overflow: 'hidden',
    },
    content: {
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});

export default CollapsibleView;
