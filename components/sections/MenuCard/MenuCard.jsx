import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Linking } from 'react-native';

import Lang from '@/assets/images/language.svg';
import Notify from '@/assets/images/notification.svg';
import AppInfo from '@/assets/images/appInfo.svg';
import DocsIcon from "@/assets/images/docs-active-f.svg";
import Terms from '@/assets/images/Terms.svg';
import Privacy from '@/assets/images/privacy.svg';
import RightIcon from '@/assets/images/chevron-right.svg';

import COLORS from '@/constants/colors';
import styles from '@/components/sections/MenuCard/MenuCard.styles';

import SgPopup from '@/components/ui/Modal/Modal';
import SgSectionLanguageSelector from '../LanguageSelect/LanguageSelect';

import { useRouter } from "expo-router";
import { useLanguage } from "@/hooks/useLanguage";
import { useNotification } from "@/hooks/useNotification";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

const Divider = () => <View style={styles.divider} />;

const MenuItem = ({ icon: Icon, title, onPress, rightElement, showChevron = true }) => (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.6}>
        <View style={styles.left}>
            <View style={styles.iconContainer}>
                <Icon width={20} height={20} />
            </View>
            <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.right}>
            {rightElement}
            {showChevron && <RightIcon width={18} height={18} color={COLORS.gray_400} />}
        </View>
    </TouchableOpacity>
);

export default function SgSectionMenuCard({ extraItems = [] }) {
    const [modalVisible, setModalVisible] = useState(false);

    const router = useRouter();
    const { selectedLanguage } = useLanguage();
    const { handleChangeNotificationPermission, notificationPermission } = useNotification();
    const { user } = useAuth();
    const { t } = useTranslation();

    const rolePath =
        user?.role?.id === 1
            ? "employee"
            : user?.role?.id === 2
                ? "timeKeeper"
                : "chief";

    const openLink = async (url) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                Linking.openURL(url);
            } else {
                console.warn("URL not supported:", url);
            }
        } catch (err) {
            console.error("Error opening URL:", err);
        }
    };

    return (
        <View style={styles.container}>
            {/* General Section */}
            <View style={styles.menuWrapper}>
                <Text style={styles.titleText}>{t('general') || 'General'}</Text>
                <View style={styles.content}>
                    <MenuItem
                        icon={DocsIcon}
                        title={t('tabBar__myDocs')}
                        onPress={() => router.push(`/${rolePath}/docs`)}
                    />
                    <Divider />
                    <MenuItem
                        icon={DocsIcon}
                        title={t('tabBar__myTeams')}
                        onPress={() => router.push(`/pages/teams`)}
                    />
                    <Divider />
                    <MenuItem
                        icon={AppInfo}
                        title={t('duties')}
                        onPress={() => router.push(`/pages/responsibilities/${user?.position?.id}`)}
                    />
                    <Divider />
                    <MenuItem
                        icon={AppInfo}
                        title={t('activities')}
                        onPress={() => router.push('/pages/activities')}
                    />
                </View>
            </View>

            {/* Preferences Section */}
            <View style={styles.menuWrapper}>
                <Text style={styles.titleText}>{t('preferences') || 'Preferences'}</Text>
                <View style={styles.content}>
                    <MenuItem
                        icon={Lang}
                        title={t('languages')}
                        onPress={() => setModalVisible(true)}
                        rightElement={selectedLanguage?.icon || null}
                    />
                    <Divider />
                    <View style={styles.item}>
                        <View style={styles.left}>
                            <View style={styles.iconContainer}>
                                <Notify width={20} height={20} />
                            </View>
                            <Text style={styles.title}>{t('notifications')}</Text>
                        </View>
                        <Switch
                            value={!!notificationPermission?.permission}
                            onValueChange={handleChangeNotificationPermission}
                            trackColor={{ false: COLORS.gray_200, true: COLORS.brand_950 }}
                            thumbColor={COLORS.white}
                            ios_backgroundColor={COLORS.gray_200}
                            style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
                        />
                    </View>
                </View>
            </View>

            {/* About Section */}
            <View style={styles.menuWrapper}>
                <Text style={styles.titleText}>{t('about') || 'About'}</Text>
                <View style={styles.content}>
                    <MenuItem
                        icon={AppInfo}
                        title={t('appInfo')}
                        onPress={() => router.push('/pages/info')}
                    />
                    <Divider />
                    <MenuItem
                        icon={Terms}
                        title={t('termsConditions')}
                        onPress={() => openLink('https://entergreenbuildings.com/terms')}
                    />
                    <Divider />
                    <MenuItem
                        icon={Privacy}
                        title={t('privacyPolicy')}
                        onPress={() => openLink('https://entergreenbuildings.com/privacy-policy')}
                    />
                </View>
            </View>

            {/* Extra Items */}
            {extraItems?.length > 0 && (
                <View style={styles.menuWrapper}>
                    <Text style={styles.titleText}>{t('more') || 'More'}</Text>
                    <View style={styles.content}>
                        {extraItems?.map((item, index) => (
                            <React.Fragment key={item.id || index}>
                                {index > 0 && <Divider />}
                                <MenuItem
                                    icon={item.icon}
                                    title={item.title}
                                    onPress={item.onPress}
                                />
                            </React.Fragment>
                        ))}
                    </View>
                </View>
            )}

            <SgPopup
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title={t('languages')}
            >
                <SgSectionLanguageSelector />
            </SgPopup>
        </View>
    );
}
