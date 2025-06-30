import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Link, router} from "expo-router";
import LeftIcon from "@/assets/images/chevron-left.svg";
import React from "react";

export default function SgTemplatePageHeader(props) {
    const {data: {header, data}} = props

    return (
        <>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        router.back()
                    }}
                >
                    <LeftIcon width={20} height={20} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>{header}</Text>

                {data?.href ?
                    <Link
                        href={data?.href}
                        style={styles.overviewButton}
                    >
                        <Text style={styles.overviewButtonText}>{data?.header}</Text>
                    </Link>
                    : null
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 'auto',
        marginLeft: 'auto',
        color: '#000000',
    },
    overviewButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    overviewButtonText: {
        color: '#000000',
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 16,
        // lineHeight: '24px',
    }
});