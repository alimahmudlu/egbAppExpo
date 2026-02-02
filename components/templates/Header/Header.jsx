import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Header.styles';
import BellIcon from '@/assets/images/bell.svg';
import { useRouter } from "expo-router";
import { useData } from "@/hooks/useData";
import { useTranslation } from "react-i18next";
import { FontAwesome } from '@expo/vector-icons';
import COLORS from '@/constants/colors';

export default function SgTemplateHeader({ name, role, position, rating, profileImage }) {
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);
    const { storeData } = useData();
    const { t } = useTranslation();

    useEffect(() => {
        setNotifications(storeData?.cache?.[`GET:/notifications/count`]?.data);
    }, [storeData?.cache?.[`GET:/notifications/count`]]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return t('goodMorning') || 'Good morning';
        if (hour < 18) return t('goodAfternoon') || 'Good afternoon';
        return t('goodEvening') || 'Good evening';
    };

    const getInitials = (fullName) => {
        if (!fullName) return '';
        return fullName.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {/* Left Section - Avatar & Info */}
                <View style={styles.leftSection}>
                    <View style={styles.avatarContainer}>
                        {profileImage ? (
                            <Image
                                source={profileImage}
                                style={styles.avatar}
                                resizeMode="cover"
                            />
                        ) : (
                            <Text style={styles.avatarText}>{getInitials(name)}</Text>
                        )}
                    </View>
                    <View style={styles.infoSection}>
                        <Text style={styles.greeting}>{getGreeting()}</Text>
                        <Text style={styles.name} numberOfLines={1}>{name}</Text>
                        <View style={styles.metaRow}>
                            {role && (
                                <View style={styles.roleBadge}>
                                    <Text style={styles.roleText}>{role}</Text>
                                </View>
                            )}
                            {rating && (
                                <View style={styles.ratingBadge}>
                                    <FontAwesome name="star" size={12} color="#FBBF24" />
                                    <Text style={styles.ratingText}>{rating}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* Right Section - Notification */}
                <TouchableOpacity
                    style={styles.notificationButton}
                    onPress={() => router.push('/pages/notifications')}
                    activeOpacity={0.7}
                >
                    <BellIcon width={20} height={20} fill={COLORS.white} color={COLORS.white} />
                    {notifications?.unread_notifications_count > 0 && (
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationBadgeText}>
                                {notifications.unread_notifications_count > 9 ? '9+' : notifications.unread_notifications_count}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
