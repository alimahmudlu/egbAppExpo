import {Text, View, StyleSheet} from "react-native";
import React from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgSectionDownloadApp from "@/components/sections/DownloadApp/DownloadApp";
import {Image} from "expo-image";
import AppInfoImage from "@/assets/images/appInfoImage.png";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useTranslation} from "react-i18next";
import Constants from 'expo-constants';
import COLORS from "@/constants/colors";

export default function ProjectItemScreen() {
    const {t} = useTranslation();

    function getAppVersion() {
        return Constants.manifest?.version || Constants.expoConfig?.version || 'unknown';
    }

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('appInfo') || 'App Info'
            }} />}
        >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={AppInfoImage}
                        style={styles.image}
                        contentFit="cover"
                    />
                </View>

                <SgSectionDownloadApp
                    version={getAppVersion()}
                    title={t('appInfo1')}
                    platforms={['android', 'ios']}
                />

                <View style={styles.textContainer}>
                    <Text style={styles.contentDescription}>
                        {t('appInfo2')}
                    </Text>
                    <Text style={styles.contentDescription}>
                        {t('appInfo3')}
                    </Text>
                </View>
            </View>
        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
    },
    imageContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: COLORS.gray_50,
        shadowColor: COLORS.brand_950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    image: {
        width: '100%',
        aspectRatio: 344 / 216,
    },
    textContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.gray_100,
        shadowColor: COLORS.brand_950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    contentDescription: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        color: COLORS.gray_700,
        marginBottom: 16,
    },
});
