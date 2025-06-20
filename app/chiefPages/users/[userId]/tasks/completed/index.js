import {View, Text, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {useLocalSearchParams, router} from "expo-router";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import LeftIcon from "@/assets/images/chevron-left.svg";
import SgListUserItem from "@/components/ui/ListUserItem";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import CheckIcon from "@/assets/images/check.svg";
import InfoCircleModalIcon from "@/assets/images/infoCircleModal.svg";
import SgCard from "@/components/ui/Card/Card";
import SgPopup from "@/components/ui/Modal/Modal";
import React, {useState} from "react";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";


// Custom header component with back button and overview button
const ScreenHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <LeftIcon width={20} height={20} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Completed tasks</Text>
        </View>
    );
};

export default function TimeKeeperUserScreen() {
    const { userId } = useLocalSearchParams();
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
            head={<ScreenHeader />}
        >
            {taskList?.filter(el => el?.type === 'complete')?.map((el, index) => (
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
        </SgTemplateScreenView>
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
    },
    acceptButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: COLORS.brand_50,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    acceptButtonText: {
        fontFamily: 'Inter',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 14,
        color: COLORS.brand_600,
    },
    rejectButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: COLORS.error_100,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    rejectButtonText: {
        fontFamily: 'Inter',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 14,
        color: COLORS.error_600,
    },
    rejectModal: {
        fontFamily: "Inter",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 30,
        marginBottom: 32,
        textAlign: "center",
    },
});