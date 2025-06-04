import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import {useLocalSearchParams, router, Link} from "expo-router";
import LeftIcon from "@/assets/images/chevron-left.svg";
import SgCard from "@/components/ui/Card/Card";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import SgSectionProjectNameCard from "@/components/sections/ProjectNameCard/ProjectNameCard";

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

            <Text style={styles.headerTitle}>Project details</Text>

            <Link
                href={`/projects/${projectId}/overview`}
                style={styles.overviewButton}
            >
                <Text style={styles.overviewButtonText}>Overview</Text>
            </Link>
        </View>
    );
};

export default function ProjectItemScreen() {
    const { projectId } = useLocalSearchParams();

    return (
        <SgTemplateScreenView
            head={<ProjectHeader projectId={projectId} />}
        >
            <SgSectionProjectNameCard
                title="Project name"
                description="There are many variations of passages of Lorem Ipsum available"
            />

            <SgCard>
                <Text style={styles.title}>Assigned tasks</Text>
            </SgCard>

            <View style={{gap: 16}}>
                <SgSectionTaskCard
                    time="12.04.2025 / 10:20 AM"
                    duration="2h. 42m."
                    title="There are many variations of passages of Lorem Ipsum available but the"
                    description="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages"
                    name="Jane Doe"
                    image={null}
                    status="Complete"
                    statusType="success"
                />
                <SgSectionTaskCard
                    time="12.04.2025 / 10:20 AM"
                    duration="2h. 42m."
                    title="There are many variations of passages of Lorem Ipsum available but the"
                    description="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages"
                    name="Jane Doe"
                    image={null}
                    status="Complete"
                    statusType="success"
                />
                <SgSectionTaskCard
                    time="12.04.2025 / 10:20 AM"
                    duration="2h. 42m."
                    title="There are many variations of passages of Lorem Ipsum available but the"
                    description="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages"
                    name="Jane Doe"
                    image={null}
                    status="Complete"
                    statusType="success"
                />
                <SgSectionTaskCard
                    time="12.04.2025 / 10:20 AM"
                    duration="2h. 42m."
                    title="There are many variations of passages of Lorem Ipsum available but the"
                    description="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages"
                    name="Jane Doe"
                    image={null}
                    status="Complete"
                    statusType="success"
                />
                <SgSectionTaskCard
                    time="12.04.2025 / 10:20 AM"
                    duration="2h. 42m."
                    title="There are many variations of passages of Lorem Ipsum available but the"
                    description="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages"
                    name="Jane Doe"
                    image={null}
                    status="Complete"
                    statusType="success"
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
