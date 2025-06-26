import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import {useLocalSearchParams, router, Link} from "expo-router";
import LeftIcon from "@/assets/images/chevron-left.svg";
import SgCard from "@/components/ui/Card/Card";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import SgSectionProjectNameCard from "@/components/sections/ProjectNameCard/ProjectNameCard";
import moment from "moment";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useSocket} from "@/hooks/useSocket";

export const screenOptions = {
    tabBarStyle: { display: 'none' },
};

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
    const { request } = useApi();
    const { projectId } = useLocalSearchParams();
    const [projectDetails, setProjectDetails] = useState({});
    const [tasksList, setTasksList] = useState([]);
    const { insertData, storeData, removeRowData } = useData();
    const {socket} = useSocket();

    useEffect(() => {
        request({
            url: `/employee/project/item/${projectId}`,
            method: 'get',
        }).then(res => {
            if (res.success) {
                setProjectDetails(res?.data);
            } else {
                // Handle error response
                console.log(res.message);
            }
        }).catch(err => {
            console.log(err);
        })

        request({
            url: `/employee/project/item/${projectId}/tasks`,
            method: 'get',
        }).then().catch(err => {
            console.log(err);
        })
    }, [projectId]);

    useEffect(() => {
        setTasksList(storeData?.cache?.[`GET:/employee/project/item/${projectId}/tasks`]?.data)
    }, [storeData?.cache?.[`GET:/employee/project/item/${projectId}/tasks`]])



    useEffect(() => {
        if (!socket || !socket.connected) return;

        const addTask = (data) => {
            insertData(`GET:/employee/project/item/${projectId}/tasks`, data?.data)
        };

        const removeTask = (data) => {
            removeRowData(`GET:/employee/project/item/${projectId}/tasks`, data?.data?.id, 'id')
        };

        socket.on("add_task", addTask);
        socket.on("remove_task", removeTask);

        return () => {
            socket.off("add_task", addTask);
            socket.off("remove_task", removeTask);
        };
    }, [socket]);

    return (
        <SgTemplateScreenView
            head={<ProjectHeader projectId={projectId} />}
        >
            <SgSectionProjectNameCard
                title='Project name'
                description={projectDetails?.name}
            />

            <SgCard>
                <Text style={styles.title}>Assigned tasks</Text>
            </SgCard>

            <View style={{gap: 16}}>
                {tasksList.map((el, index) => (
                    <SgSectionTaskCard
                        id={el?.id}
                        projectId={el?.project_id}
                        key={index}
                        time={moment(el?.deadline).format('DD.MM.YYYY / h:mm A') || ''}
                        duration={el?.duration}
                        title={el?.name}
                        description={el?.description}
                        name={el?.assigned_employee?.full_name}
                        image={null}
                        status={el?.status}
                        href={`/employeePages/projects/${el?.project_id}/${el?.id}`}
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
