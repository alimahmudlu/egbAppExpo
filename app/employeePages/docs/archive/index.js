import {View, StyleSheet} from "react-native";
import React from "react";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import {useLocalSearchParams} from "expo-router";
import SgFileCard from "@/components/sections/FileCard/FileCard";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";

export default function ProjectItemScreen() {
    return (
        <SgTemplateScreenView
            head={<SgTemplatePageHeader data={{
                header: 'Docs archive'
            }} />}
        >
            <View style={{gap: 12}}>
                <SgFileCard
                    fileType="xlsx"
                    title="Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
                    description=""
                    date="10.05.2025"
                    migrationId="Migration id"
                    statusText="Expired"
                    statusType="danger"
                />
                <SgFileCard
                    fileType="xlsx"
                    title="Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
                    description=""
                    date="10.05.2025"
                    migrationId="Migration id"
                    statusText="Expired"
                    statusType="danger"
                />
                <SgFileCard
                    fileType="xlsx"
                    title="Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
                    description=""
                    date="10.05.2025"
                    migrationId="Migration id"
                    statusText="Expired"
                    statusType="danger"
                />
                <SgFileCard
                    fileType="xlsx"
                    title="Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
                    description=""
                    date="10.05.2025"
                    migrationId="Migration id"
                    statusText="Expired"
                    statusType="danger"
                />
                <SgFileCard
                    fileType="xlsx"
                    title="Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
                    description=""
                    date="10.05.2025"
                    migrationId="Migration id"
                    statusText="Expired"
                    statusType="danger"
                />
            </View>
        </SgTemplateScreenView>
    );
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
},
    container: {
        flex: 1,
    },
    contentText: {
        fontSize: 16,
    }
});
