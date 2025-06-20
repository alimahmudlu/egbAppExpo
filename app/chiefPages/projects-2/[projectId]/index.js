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
                href={`/employeePages/projects/${projectId}/overview`}
                style={styles.overviewButton}
            >
                <Text style={styles.overviewButtonText}>Overview</Text>
            </Link>
        </View>
    );
};

export default function ProjectItemScreen() {
    const { projectId } = useLocalSearchParams();
    const taskList = [
        {
            id: 1,
            projectId: 1,
            time: "12.04.2025 / 10:20 AM",
            duration: "2h. 42m.",
            title: "There are many variations of passages of Lorem Ipsum available but the",
            description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
            name: "Jane Doe",
            image: null,
            status: "Check",
            statusType: "warning",
            type: 'check'
        },
        {
            id: 2,
            projectId: 2,
            time: "12.04.2025 / 10:20 AM",
            duration: "2h. 42m.",
            title: "There are many variations of passages of Lorem Ipsum available but the",
            description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
            name: "Jane Doe",
            image: null,
            status: null,
            statusType: "success",
            type: null
        },
        {
            id: 3,
            projectId: 3,
            time: "12.04.2025 / 10:20 AM",
            duration: "2h. 42m.",
            title: "There are many variations of passages of Lorem Ipsum available but the",
            description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
            name: "Jane Doe",
            image: null,
            status: "Complete",
            statusType: "success",
            type: 'complete'
        },
        {
            id: 4,
            projectId: 4,
            time: "12.04.2025 / 10:20 AM",
            duration: "2h. 42m.",
            title: "There are many variations of passages of Lorem Ipsum available but the",
            description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
            name: "Jane Doe",
            image: null,
            status: null,
            statusType: "success",
            type: null
        },
        {
            id: 5,
            projectId: 5,
            time: "12.04.2025 / 10:20 AM",
            duration: "2h. 42m.",
            title: "There are many variations of passages of Lorem Ipsum available but the",
            description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
            name: "Jane Doe",
            image: null,
            status: "Complete",
            statusType: "success",
            type: 'complete'
        },
        {
            id: 6,
            projectId: 6,
            time: "12.04.2025 / 10:20 AM",
            duration: "2h. 42m.",
            title: "There are many variations of passages of Lorem Ipsum available but the",
            description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
            name: "Jane Doe",
            image: null,
            status: "Complete",
            statusType: "success",
            type: 'complete'
        },
        {
            id: 7,
            projectId: 7,
            time: "12.04.2025 / 10:20 AM",
            duration: "2h. 42m.",
            title: "There are many variations of passages of Lorem Ipsum available but the",
            description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
            name: "Jane Doe",
            image: null,
            status: null,
            statusType: "success",
            type: null
        },
        {
            id: 8,
            projectId: 8,
            time: "12.04.2025 / 10:20 AM",
            duration: "2h. 42m.",
            title: "There are many variations of passages of Lorem Ipsum available but the",
            description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
            name: "Jane Doe",
            image: null,
            status: "Complete",
            statusType: "success",
            type: 'complete'
        },
        {
            id: 9,
            projectId: 9,
            time: "12.04.2025 / 10:20 AM",
            duration: "2h. 42m.",
            title: "There are many variations of passages of Lorem Ipsum available but the",
            description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
            name: "Jane Doe",
            image: null,
            status: "Complete",
            statusType: "success",
            type: 'complete'
        }
    ]

    return (
        <SgTemplateScreenView
            head={<ProjectHeader projectId={projectId} />}
        >
            <SgSectionProjectNameCard
                title="Project name"
                description="There are many variations of passages of Lorem Ipsum available"
            />

            <SgCard>
                <Text style={styles.title}>Active tasks</Text>
            </SgCard>

            <View style={{gap: 16}}>
                {taskList.map((el, index) => (
                    <SgSectionTaskCard
                        key={index}
                        time={el?.time}
                        duration={el?.duration}
                        title={el?.title}
                        description={el?.description}
                        name={el?.name}
                        image={null}
                        status={el?.status}
                        statusType={el?.statusType}
                        href={`/chiefPages/projects/${el?.projectId}/${el?.id}`}
                    />
                ))}
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
