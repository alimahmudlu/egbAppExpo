import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import {useLocalSearchParams, router, Link} from "expo-router";
import LeftIcon from "@/assets/images/chevron-left.svg";
import SgCard from "@/components/ui/Card/Card";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import Avatar from "@/assets/images/avatar.png";
import SgButton from "@/components/ui/Button/Button";
import SgFileCard from "@/components/sections/FileCard/FileCard";

// Custom header component with back button and overview button
const ProjectHeader = ({ projectId }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => router.back()}
            >
                <LeftIcon width={20} height={20} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Docs archive</Text>
        </View>
    );
};

export default function ProjectItemScreen() {
    const { projectId } = useLocalSearchParams();

    return (
        <SgTemplateScreenView
            head={<ProjectHeader projectId={projectId} />}
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
