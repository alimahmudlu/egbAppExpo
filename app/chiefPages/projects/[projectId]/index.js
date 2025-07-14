import {Text, View, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useLocalSearchParams} from "expo-router";
import SgCard from "@/components/ui/Card/Card";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import SgSectionProjectNameCard from "@/components/sections/ProjectNameCard/ProjectNameCard";
import moment from "moment";
import {useApi} from "@/hooks/useApi";
import COLORS from "@/constants/colors";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useData} from "@/hooks/useData";

export default function ProjectItemScreen() {
    const { request } = useApi();
    const {storeData} = useData();
    const { projectId } = useLocalSearchParams();
    const [projectDetails, setProjectDetails] = useState({});
    const [tasksList, setTasksList] = useState([]);
    const {refreshKey} = useLocalSearchParams();

    useEffect(() => {
        request({
            url: `/chief/project/item/${projectId}`,
            method: 'get',
        }).then().catch(err => {
            console.log(err);
        });

        request({
            url: `/chief/project/item/${projectId}/tasks`,
            method: 'get',
        }).then().catch(err => {
            console.log(err);
        })
    }, [projectId, refreshKey]);

    useEffect(() => {
        setProjectDetails(storeData?.cache?.[`GET:/chief/project/item/${projectId}`]?.data)
    }, [storeData?.cache?.[`GET:/chief/project/item/${projectId}`]])

    useEffect(() => {
        setTasksList(storeData?.cache?.[`GET:/chief/project/item/${projectId}/tasks`]?.data)
    }, [storeData?.cache?.[`GET:/chief/project/item/${projectId}/tasks`]])


    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: 'Project details',
                data: {
                    header: 'Overview',
                    href: `/chiefPages/projects/${projectId}/overview`
                }
            }} />}
        >
            <SgSectionProjectNameCard
                title='Project name'
                description={projectDetails?.name}
            />

            <SgCard>
                <Text style={styles.title}>Active tasks</Text>
            </SgCard>

            <View style={{gap: 16}}>
                {(tasksList || [])?.map((el, index) => (
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
                        href={`/chiefPages/projects/${el?.project_id}/${el?.id}`}
                    />
                ))}
            </View>

        </SgTemplateScreen>
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
