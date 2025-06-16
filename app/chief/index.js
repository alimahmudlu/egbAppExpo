import Avatar from "@/assets/images/avatar.png";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import SgCard from "@/components/ui/Card/Card";
import Clock from "@/assets/images/clock.svg";
import SgCheckInOutCard from "@/components/ui/CheckInOutCard/CheckInOutCard";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import {useAuth} from "@/hooks/useAuth";
import {StyleSheet, Text, View} from "react-native";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import SgNoticeCard from "@/components/ui/NoticeCard/NoticeCard";
import React from "react";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";

export default function EmployeeDashboardScreen() {
    const {user} = useAuth();
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
            head={
                <SgTemplateHeader
                    name={user?.full_name}
                    role={user?.role?.name}
                    profileImage={Avatar}
                />
            }
        >
            <SgCheckInOutGroup>
                <SgSectionInfoCard
                    icon="log-in-outline"
                    title="Daily check in"
                    count={32}
                    type="checkin"
                />
                <SgSectionInfoCard
                    icon="log-out-outline"
                    title="Daily check out"
                    count={12}
                    type="checkout"
                />
            </SgCheckInOutGroup>

            <SgNoticeCard
                title="Active tasks"
                buttonText="Add task +"
                bgButton="success"
            />

            <SgFilterTab
                defaultTabId='all'
                tabs={[
                    {label: 'All tasks', id: 'all', count: taskList?.length},
                    {label: 'Check', id: 'check', count: taskList?.filter(el => el?.type === 'check')?.length},
                    {label: 'Complete', id: 'complete', count: taskList?.filter(el => el?.type === 'complete')?.length},
                ]}
                tabContent={[
                    {
                        element: (
                            <View style={{gap: 16}}>
                                {taskList?.map((el, index) => (
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
                        ),
                        id: 'all'
                    },
                    {
                        element: (
                            <View style={{gap: 16}}>
                                {taskList?.filter(el => el?.type === 'check')?.map((el, index) => (
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
                        ),
                        id: 'check'
                    },
                    {
                        element: (
                            <View style={{gap: 16}}>
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
                            </View>
                        ),
                        id: 'complete'
                    }
                ]}
            />
        </SgTemplateScreenView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontFamily: "Inter",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 20,
    },
});
