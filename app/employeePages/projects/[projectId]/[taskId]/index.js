import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import {useLocalSearchParams, router, Link} from "expo-router";
import LeftIcon from "@/assets/images/chevron-left.svg";
import SgCard from "@/components/ui/Card/Card";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import Avatar from "@/assets/images/avatar.png";
import SgButton from "@/components/ui/Button/Button";
import axios from "axios";
import {useAuth} from "@/hooks/useAuth";
import moment from "moment/moment";
import ApiService from "@/services/ApiService";

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
    const { accessToken } = useAuth();
    const { projectId, taskId } = useLocalSearchParams();

    console.log(useLocalSearchParams());

    const [taskDetails, setTaskDetails] = useState({});

    useEffect(() => {
        ApiService.get(`/employee/project/item/${projectId}/tasks/item/${taskId}`, {
            headers: {
                'authorization': accessToken || ''
            }
        }).then(res => {
            if (res.data.success) {
                setTaskDetails(res?.data?.data);
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
            <SgCard
                contentTitle='Reporter'
            >
                <SgSectionUserInfo
                    name={taskDetails?.reporter_employee?.full_name}
                    role="Employee"
                    profileImage={Avatar}
                    color="dark"
                    size="md"
                />
            </SgCard>
            <SgCard
                contentTitle='Deadline date'
                contentDescription={moment(taskDetails?.time).format('DD.MM.YYYY / HH:mm') || taskDetails?.time}
            />
            <SgCard
                contentTitle='Points to be earned'
                contentDescription={taskDetails?.points}
            />

            <SgCard
                contentTitle='Task'
                contentDescription={taskDetails?.name}
                padding={false}
                bgColor={null}
            />
            <SgCard
                contentTitle='Description'
                contentDescription={taskDetails?.description}
                padding={false}
                bgColor={null}
            />

            <View style={{
                gap: 12,
                flexDirection: 'row',
            }}>
                <SgButton
                    bgColor='#FEF0C7'
                    color='#B54708'
                >
                    Check request
                </SgButton>
                <SgButton
                    bgColor='#D2F5EC'
                    color='#1A554E'
                >
                    Add file
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
