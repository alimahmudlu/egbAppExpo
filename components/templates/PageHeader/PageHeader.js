import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Link, router} from "expo-router";
import LeftIcon from "@/assets/images/chevron-left.svg";
import React from "react";
import {useData} from "@/hooks/useData";
import COLORS from "@/constants/colors";

export default function SgTemplatePageHeader(props) {
    const {data: {header, data}, filter} = props;
    const {onBackPress} = useData()

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    onBackPress()
                }}
                activeOpacity={0.7}
            >
                <LeftIcon width={20} height={20} color={COLORS.gray_700} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{header}</Text>

            <View style={styles.rightSection}>
                {data?.href ? (
                    <Link href={data?.href} style={styles.overviewButton}>
                        <Text style={styles.overviewButtonText}>{data?.header}</Text>
                    </Link>
                ) : null}
                {filter ? filter : <View style={styles.placeholder} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray_100,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.gray_50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.gray_900,
        letterSpacing: -0.3,
        flex: 1,
        textAlign: 'center',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    placeholder: {
        width: 40,
        height: 40,
    },
    overviewButton: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: COLORS.brand_50,
    },
    overviewButtonText: {
        fontFamily: 'Inter_600SemiBold',
        fontWeight: '600',
        fontSize: 14,
        color: COLORS.brand_700,
    }
});