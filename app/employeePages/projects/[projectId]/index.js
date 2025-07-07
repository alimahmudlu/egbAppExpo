import {Text, View, StyleSheet, Alert} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import {useLocalSearchParams} from "expo-router";
import SgCard from "@/components/ui/Card/Card";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import SgSectionProjectNameCard from "@/components/sections/ProjectNameCard/ProjectNameCard";
import moment from "moment";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useSocket} from "@/hooks/useSocket";
import COLORS from "@/constants/colors";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";

export default function ProjectItemScreen() {
    const { request } = useApi();
    const { projectId } = useLocalSearchParams();
    const [projectDetails, setProjectDetails] = useState({});
    const [tasksList, setTasksList] = useState([]);
    const { insertData, storeData, removeRowData, changeRowData } = useData();
    const {socket} = useSocket();

    useEffect(() => {
        request({
            url: `/employee/project/item/${projectId}`,
            method: 'get',
        }).then().catch(err => {
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
        setProjectDetails(storeData?.cache?.[`GET:/employee/project/item/${projectId}`]?.data)
    }, [storeData?.cache?.[`GET:/employee/project/item/${projectId}`]])

    useEffect(() => {
        setTasksList(storeData?.cache?.[`GET:/employee/project/item/${projectId}/tasks`]?.data)
    }, [storeData?.cache?.[`GET:/employee/project/item/${projectId}/tasks`]])



    useEffect(() => {
        if (!socket) return;

        const addTask = (data) => {
            insertData(`GET:/employee/project/item/${projectId}/tasks`, data?.data)
        };

        const removeTask = (data) => {
            removeRowData(`GET:/employee/project/item/${projectId}/tasks`, data?.data?.id, 'id')
        };

        const taskStatus = (data) => {
            changeRowData(`GET:/employee/project/item/${projectId}/tasks`, data?.data, data?.data?.id)
        };

        socket.on('connect', () => {
            socket.on("add_task", addTask);
            socket.on("remove_task", removeTask);
            socket.on("change_task__by_employee", taskStatus);
        })

        return () => {
            socket.off("add_task", addTask);
            socket.off("remove_task", removeTask);
            socket.off("change_task__by_chief", taskStatus);
        };
    }, [socket]);

    return (
        <SgTemplateScreenView
            head={<SgTemplatePageHeader data={{
                header: 'Project details',
                data: {
                    header: 'Overview',
                    href: `/employeePages/projects/${projectId}/overview`
                }
            }} />}
        >
            <SgSectionProjectNameCard
                title='Project name'
                description={projectDetails?.name}
            />

            <SgCard>
                <Text style={styles.title}>Assigned tasks</Text>
            </SgCard>

            <View style={{gap: 16}}>
                {(tasksList || []).map((el, index) => (
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
},
    container: {
        flex: 1,
    },
    title: {
        fontFamily: "Inter",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 20,
        color: COLORS.black,
    },
    contentText: {
        fontSize: 16,
    }
});
