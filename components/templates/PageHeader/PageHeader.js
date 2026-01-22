import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Link, router} from "expo-router";
import LeftIcon from "@/assets/images/chevron-left.svg";
import React from "react";
import {useData} from "@/hooks/useData";

export default function SgTemplatePageHeader(props) {
    const {data: {header, data}, filter} = props;
    const {onBackPress} = useData()

    return (
        <>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        onBackPress()
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
                {filter ? filter : null}
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
        paddingVertical: 14,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 10,
        marginLeft: -4,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        marginRight: 'auto',
        marginLeft: 'auto',
        color: '#000000',
        letterSpacing: -0.3,
    },
    overviewButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    overviewButtonText: {
        color: '#000000',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
        fontSize: 15,
    }
});