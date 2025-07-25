import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import styles from '@/components/sections/UserInfo/UserInfo.styles';
import COLORS from '@/constants/colors';
import {useRouter} from 'expo-router';

export default function SgSectionUserInfo({
                                              name,
                                              role,
                                              position,
                                              rating,
                                              profileImage,
                                              color,
                                              roleColor,
                                              size = 'md',
                                              clickable = null,
                                          }) {
    const router = useRouter();

    function handleClickUser() {
        if (!!clickable) {
            router.navigate(clickable)
        }
    }

    const getRoleColor = (colorKey) => {
        switch (colorKey) {
            case 'success':
                return COLORS.brand_600;
            case 'gray':
                return COLORS.gray_500;
            default:
                return COLORS.brand_600;
        }
    };

    const getTitleColor = (colorKey) => {
        switch (colorKey) {
            case 'white':
                return COLORS.white;
            case 'dark':
            default:
                return COLORS.gray_800;
        }
    };

    const getSizeStyles = (sizeKey) => {
        switch (sizeKey) {
            case 'lg':
                return {
                    image: {width: 50, height: 50, borderRadius: 25},
                    avatarText: {fontSize: 22, lineHeight: 34},
                    name: {fontSize: 20, lineHeight: 30},
                    role: {fontSize: 12, lineHeight: 18,},
                    rating: {fontSize: 12, lineHeight: 18},
                    starSize: 16,
                };
            case 'md':
            default:
                return {
                    image: {width: 40, height: 40, borderRadius: 100},
                    avatarText: {fontSize: 18, lineHeight: 28},
                    name: {fontSize: 16, lineHeight: 24},
                    role: {fontSize: 10, lineHeight: 14},
                    rating: {fontSize: 12, lineHeight: 18},
                    starSize: 16,
                };
        }
    };

    const appliedRoleColor = getRoleColor(roleColor);
    const appliedColor = getTitleColor(color);
    const appliedSize = getSizeStyles(size);

    return (
        <Pressable onPress={handleClickUser} style={styles.profileSection}>
            {profileImage ? (
                <Image
                    source={profileImage}
                    style={[
                        styles.profileImage,
                        {
                            width: appliedSize.image.width,
                            height: appliedSize.image.height,
                            borderRadius: appliedSize.image.borderRadius,
                        },
                    ]}
                    resizeMode="cover"
                />
            ) : (
                <View
                    style={[
                        styles.placeholderAvatar,
                        {
                            width: appliedSize.image.width,
                            height: appliedSize.image.height,
                            borderRadius: appliedSize.image.borderRadius,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.avatarText,
                            {
                                fontSize: appliedSize.avatarText.fontSize,
                                lineHeight: appliedSize.avatarText.lineHeight,
                            },
                        ]}
                    >
                        {name?.split(' ').splice(0, 2).map((n) => n[0]).join('')}
                    </Text>
                </View>
            )}
            <View style={styles.nameSection}>
                <Text
                    style={[
                        styles.name,
                        {
                            color: appliedColor,
                            fontSize: appliedSize.name.fontSize,
                            lineHeight: appliedSize.name.lineHeight,
                        },
                    ]}
                >
                    {name}
                </Text>
                <View style={styles.roleRatingRow}>
                    <View style={{
                        flexDirection: 'row',
                        gap: 8
                    }}>
                        <Text
                            style={[
                                styles.role,
                                {
                                    color: appliedRoleColor,
                                    fontSize: appliedSize.role.fontSize,
                                    lineHeight: appliedSize.role.lineHeight,
                                },
                            ]}
                        >
                            {role}
                        </Text>
                        {position?.name ?
                            <Text
                                style={[
                                    styles.role,
                                    {
                                        color: appliedRoleColor,
                                        fontSize: appliedSize.role.fontSize,
                                        lineHeight: appliedSize.role.lineHeight,
                                    },
                                ]}
                            >
                                /
                            </Text>
                            : null
                        }
                        <Pressable
                            onPress={() => {
                                router.navigate(`/pages/responsibilities/${position?.id || ''}`)
                            }}
                            style={[
                                styles.role,
                                {
                                    color: appliedRoleColor,
                                    fontSize: appliedSize.role.fontSize,
                                    lineHeight: appliedSize.role.lineHeight,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.role,
                                    {
                                        color: appliedRoleColor,
                                        fontSize: appliedSize.role.fontSize,
                                        lineHeight: appliedSize.role.lineHeight,
                                    },
                                ]}
                            >
                                {position?.name}
                            </Text>
                        </Pressable>
                    </View>
                    {rating && (
                        <View style={styles.ratingSection}>
                            <FontAwesome
                                name="star"
                                size={appliedSize.starSize}
                                style={styles.star}
                            />
                            <Text
                                style={[
                                    styles.rating,
                                    {
                                        color: appliedColor,
                                        fontSize: appliedSize.rating.fontSize,
                                        lineHeight: appliedSize.rating.lineHeight,
                                    },
                                ]}
                            >
                                {rating}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </Pressable>
    );
}
