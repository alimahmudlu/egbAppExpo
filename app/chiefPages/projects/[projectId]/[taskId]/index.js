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
import SgSectionStatusInfo from "@/components/sections/StatusInfo/StatusInfo";
import SgSectionAddFile from "@/components/sections/AddFile/AddFile";
import COLORS from "@/constants/colors";

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

            <Text style={styles.headerTitle}>Task detail</Text>
        </View>
    );
};

export default function ProjectItemScreen() {
    const { projectId } = useLocalSearchParams();

    return (
        <SgTemplateScreenView
            head={<ProjectHeader projectId={projectId} />}
        >
            <View>
                <SgSectionUserInfo
                    rating={3.12}
                    name="Jane Doe"
                    role="Employee"
                    profileImage={Avatar}
                    color="dark"
                    size="md"
                    clickable={`chiefPages/users/${1}`}
                />
            </View>
            <SgSectionStatusInfo
                title="Progress"
                status="Check Progress"
                statusType="warning"
            />
            <SgCard
                contentTitle='Deadline date'
                contentDescription='12.04.2025 / 1:50 PM'
            />
            <SgCard
                contentTitle='Points to be earned'
                contentDescription='12'
            />

            <SgCard
                contentTitle='Task'
                contentDescription='There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form'
                padding={false}
                bgColor={null}
            />
            <SgCard
                contentTitle='Description'
                contentDescription='Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolorem laudantium, totam rem aperiam. All the rem ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.'
                padding={false}
                bgColor={null}
            />

            <SgCard>
                <Text style={styles.title}>Added Projects</Text>
            </SgCard>

            <SgSectionAddFile
                title="Unde Omnis iste natus error sit"
                type="xlsx"
                datetime="13.02.2025 / 4:21 PM"
                onPress={() => console.log('Eye icon pressed')}
            />
            <SgSectionAddFile
                title="Unde Omnis iste natus error sit"
                type="xlsx"
                datetime="13.02.2025 / 4:21 PM"
                onPress={() => console.log('Eye icon pressed')}
            />
            <SgSectionAddFile
                title="Unde Omnis iste natus error sit"
                type="xlsx"
                datetime="13.02.2025 / 4:21 PM"
                onPress={() => console.log('Eye icon pressed')}
            />

            <View style={{flexDirection: 'row', gap: 12, paddingTop: 12}}>
                <SgButton
                    bgColor={COLORS.error_50}
                    color={COLORS.error_600}
                >
                    Reject
                </SgButton>
                <SgButton
                    bgColor={COLORS.brand_600}
                    color={COLORS.white}
                >
                    Complete task
                </SgButton>
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
