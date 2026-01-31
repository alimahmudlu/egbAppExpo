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
                : user?.role?.id === 3
                    ? "chief"
                    : "admin";

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
            <View style={styles.menuWrapper}>
                <Text style={styles.titleText}>Menus</Text>
                <View style={styles.content}>

                    <TouchableOpacity
                        onPress={() => router.push(`/${rolePath}/docs`)}
                        style={styles.item}
                    >
                        <View style={styles.left}>
                            <View style={styles.iconContainer}>
                                <DocsIcon width={20} height={20} />
                            </View>
                            <Text style={styles.title}>{t('tabBar__myDocs')}-{`/${rolePath}/docs`}</Text>
                        </View>
                        <RightIcon width={20} height={20} />
                    </TouchableOpacity>

                    <Divider />

                    <TouchableOpacity
                        onPress={() => router.push(`/pages/teams`)}
                        style={styles.item}
                    >
                        <View style={styles.left}>
                            <View style={styles.iconContainer}>
                                <DocsIcon width={20} height={20} />
                            </View>
                            <Text style={styles.title}>{t('tabBar__myTeams')}</Text>
                        </View>
                        <RightIcon width={20} height={20} />
                    </TouchableOpacity>

                    <Divider />

                    <TouchableOpacity style={styles.item} onPress={() => setModalVisible(true)}>
                        <View style={styles.left}>
                            <View style={styles.iconContainer}>
                                <Lang width={20} height={20} />
                            </View>
                            <Text style={styles.title}>{t('languages')}</Text>
                        </View>
                        <View style={styles.right}>
                            {selectedLanguage?.icon || null}
                            <RightIcon width={20} height={20} />
                        </View>
                    </TouchableOpacity>

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
                            trackColor={{ false: COLORS.gray_200, true: COLORS.brand_600 }}
                            thumbColor={COLORS.white}
                            ios_backgroundColor={COLORS.gray_200}
                            style={{ transform: [{ scaleX: 0.77 }, { scaleY: 0.77 }] }}
                        />
                    </View>

                    <Divider />

                    <TouchableOpacity
                        onPress={() => router.push(`/pages/responsibilities/${user?.position?.id}`)}
                        style={styles.item}
                    >
                        <View style={styles.left}>
                            <View style={styles.iconContainer}>
                                <AppInfo width={20} height={20} />
                            </View>
                            <Text style={styles.title}>{t('duties')}</Text>
                        </View>
                        <RightIcon width={20} height={20} />
                    </TouchableOpacity>

                    <Divider />
                    <TouchableOpacity
                        onPress={() => router.push('/pages/activities')}
                        style={styles.item}
                    >
                        <View style={styles.left}>
                            <View style={styles.iconContainer}>
                                <AppInfo width={20} height={20} />
                            </View>
                            <Text style={styles.title}>{t('activities')}</Text>
                        </View>
                        <RightIcon width={20} height={20} />
                    </TouchableOpacity>

                    <Divider />

                    <TouchableOpacity onPress={() => router.push('/pages/info')} style={styles.item}>
                        <View style={styles.left}>
                            <View style={styles.iconContainer}>
                                <AppInfo width={20} height={20} />
                            </View>
                            <Text style={styles.title}>{t('appInfo')}</Text>
                        </View>
                        <RightIcon width={20} height={20} />
                    </TouchableOpacity>

                    <Divider />

                    <TouchableOpacity onPress={() => openLink('https://entergreenbuildings.com/terms')} style={styles.item}>
                        <View style={styles.left}>
                            <View style={styles.iconContainer}>
                                <Terms width={20} height={20} />
                            </View>
                            <Text style={styles.title}>{t('termsConditions')}</Text>
                        </View>
                        <RightIcon width={20} height={20} />
                    </TouchableOpacity>

                    <Divider />

                    <TouchableOpacity onPress={() => openLink('https://entergreenbuildings.com/privacy-policy')} style={styles.item}>
                        <View style={styles.left}>
                            <View style={styles.iconContainer}>
                                <Privacy width={20} height={20} />
                            </View>
                            <Text style={styles.title}>{t('privacyPolicy')}</Text>
                        </View>
                        <RightIcon width={20} height={20} />
                    </TouchableOpacity>

                    {/* Extra Items */}
                    {extraItems?.map((item, index) => (
                        <React.Fragment key={item.id || index}>
                            <Divider />
                            <TouchableOpacity style={styles.item} onPress={item.onPress}>
                                <View style={styles.left}>
                                    <View style={styles.iconContainer}>
                                        {item.icon && <item.icon width={20} height={20} />}
                                    </View>
                                    <Text style={styles.title}>{item.title}</Text>
                                </View>
                                <RightIcon width={20} height={20} />
                            </TouchableOpacity>
                        </React.Fragment>
                    ))}

                </View>
            </View>

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
