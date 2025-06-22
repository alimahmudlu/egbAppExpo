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
                href={`/chiefPages/projects/${projectId}/overview`}
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

    useEffect(() => {
        request({
            url: `/chief/project/item/${projectId}`,
            method: 'get',
        }).then(res => {
            if (res.data.success) {
                setProjectDetails(res?.data?.data);
            } else {
                // Handle error response
                console.log(res.data.message);
            }
        }).catch(err => {
            console.log(err);
        });

        request({
            url: `/chief/project/item/${projectId}/tasks`,
            method: 'get',
        }).then(res => {
            if (res.data.success) {
                setTasksList(res?.data?.data);
                console.log(res?.data?.data);
            } else {
                // Handle error response
                console.log(res.data.message);
            }
        }).catch(err => {
            console.log(err);
        })
    }, [projectId]);

    return (
        <SgTemplateScreenView
            head={<ProjectHeader projectId={projectId} />}
        >
            <SgSectionProjectNameCard
                title='Project name'
                description={projectDetails?.name}
            />

            <SgCard>
                <Text style={styles.title}>Active tasks</Text>
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
                        href={`/chiefPages/projects/${el?.project_id}/${el?.id}`}
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
