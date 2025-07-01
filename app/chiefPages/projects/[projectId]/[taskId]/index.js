import {View, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import {useLocalSearchParams} from "expo-router";
import SgCard from "@/components/ui/Card/Card";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import Avatar from "@/assets/images/avatar.png";
import SgButton from "@/components/ui/Button/Button";
import moment from "moment/moment";
import COLORS from "@/constants/colors";
import SgSectionStatusInfo from "@/components/sections/StatusInfo/StatusInfo";
import {useApi} from "@/hooks/useApi";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useData} from "@/hooks/useData";

export default function ProjectItemScreen() {
    const { request } = useApi();
    const {storeData} = useData();
    const { projectId, taskId } = useLocalSearchParams();
    const [taskDetails, setTaskDetails] = useState({});

    useEffect(() => {
        request({
            url: `/chief/project/item/${projectId}/tasks/item/${taskId}`,
            method: 'get',
        }).then().catch(err => {
            console.log(err);
        })
    }, [projectId]);

    useEffect(() => {
        setTaskDetails(storeData?.cache?.[`GET:/chief/project/item/${projectId}/tasks/item/${taskId}`]?.data)
    }, [storeData?.cache?.[`GET:/chief/project/item/${projectId}/tasks/item/${taskId}`]])


    return (
        <SgTemplateScreenView
            head={<SgTemplatePageHeader data={{
                header: 'Task detail',
            }} />}
        >
            <SgSectionUserInfo
                name={taskDetails?.assigned_employee?.full_name}
                role="Employee"
                profileImage={Avatar}
                color="dark"
                size="lg"
                clickable={`/chiefPages/users/${taskDetails?.assigned_employee?.id}/`}
            />
            {taskDetails?.status?.id === 3 ?
                <SgSectionStatusInfo
                    title="Progress"
                    status="Check Progress"
                    statusType="warning"
                />
                : null
            }
            {taskDetails?.status?.id === 4 ?
                <SgSectionStatusInfo
                    title="Progress"
                    status="Check complete"
                    statusType="success"
                />
                : null
            }
            <SgCard
                contentTitle='Deadline date'
                contentDescription={taskDetails?.deadline ? moment(taskDetails?.deadline).format('DD.MM.YYYY / hh:mm A') : ''}
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

            {taskDetails?.status?.id === 3 ?
                <View style={{
                    gap: 12,
                    flexDirection: 'row',
                }}>
                    <SgButton
                        bgColor = {COLORS.primary}
                        color= {COLORS.white}
                    >
                        Checked
                    </SgButton>
                </View>
                : null
            }

            {taskDetails?.status?.id === 4 ?
                <View style={{
                    gap: 12,
                    flexDirection: 'row',
                }}>
                    <SgButton
                        bgColor = {COLORS.error_50}
                        color= {COLORS.error_700}
                    >
                        Reject
                    </SgButton>
                    <SgButton
                        bgColor = {COLORS.primary}
                        color= {COLORS.white}
                    >
                        Complete task
                    </SgButton>
                </View>
                : null
            }


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
