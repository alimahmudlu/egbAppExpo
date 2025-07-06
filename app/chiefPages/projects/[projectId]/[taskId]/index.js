import {View, StyleSheet, Text} from "react-native";
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
import SgSectionAddFile from "@/components/sections/AddFile/AddFile";
import SgPopup from "@/components/ui/Modal/Modal";
import CompleteModalIcon from "@/assets/images/CheckModal.svg";
import CompletedModalIcon from "@/assets/images/CompletedIcon.svg";

export default function ProjectItemScreen() {
    const { request } = useApi();
    const {storeData} = useData();
    const { projectId, taskId } = useLocalSearchParams();
    const [taskDetails, setTaskDetails] = useState({});

    const [checkedTaskModal, setCheckedTaskModal] = useState(false);
    const [checkedTaskInfoModal, setCheckedTaskInfoModal] = useState(false);

    const [completedTaskModal, setCompletedTaskModal] = useState(false);
    const [completedTaskInfoModal, setCompletedTaskInfoModal] = useState(false);

    const toggleCompletedTaskModal = () => {
        setCompletedTaskModal(!completedTaskModal);
    };
    const toggleCompletedTaskInfoModal = () => {
        setCompletedTaskInfoModal(!completedTaskInfoModal);
    };
    const handleCompletedTask = () => {
        request({
            url: `/chief/project/item/${projectId}/tasks/item/${taskId}/status`,
            method: 'post',
            data: {
                date: moment().format(''),
                status: 5,
            }
        }).then(res => {
            setTaskDetails({
                ...taskDetails,
                status: {
                    id: 5,
                    name: 'Completed'
                },
                files: []
            })
            toggleCompletedTaskInfoModal();
        }).catch(err => {
            console.log(err)
        })
    };

    const toggleCheckedTaskModal = () => {
        setCheckedTaskModal(!checkedTaskModal);
    };
    const toggleCheckedTaskInfoModal = () => {
        setCheckedTaskInfoModal(!checkedTaskInfoModal);
    };
    const handleCheckedTask = () => {
        request({
            url: `/chief/project/item/${projectId}/tasks/item/${taskId}/status`,
            method: 'post',
            data: {
                date: moment().format(''),
                status: 2
            }
        }).then(res => {
            setTaskDetails({...taskDetails, status: {
                    id: 2,
                    name: 'In progress'
                }})
            toggleCheckedTaskInfoModal();
        }).catch(err => {
            console.log(err)
        })
    };

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

        console.log(storeData?.cache?.[`GET:/chief/project/item/${projectId}/tasks/item/${taskId}`]?.data)
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
                profileImage={''}
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

            {(taskDetails?.files || []).length > 0 ?
                <>
                    <SgCard>
                        <Text style={styles.title}>Added Files</Text>
                    </SgCard>
                    {(taskDetails?.files || []).map((el, index) => (
                        <SgSectionAddFile
                            key={index}
                            title={el?.upload?.filename}
                            type={el?.type}
                            datetime={el?.created_at ? moment(el?.created_at).format('DD.MM.YYYY / hh:mm A') : null}
                            url={el?.upload?.filepath}
                            onPress={() => console.log('file.filename')}
                        />
                    ))}
                </>
                : null
            }


            {taskDetails?.status?.id === 3 ?
                <View style={{
                    gap: 12,
                    flexDirection: 'row',
                }}>
                    <SgButton
                        bgColor = {COLORS.primary}
                        color= {COLORS.white}
                        onPress={toggleCheckedTaskModal}
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

            <SgPopup
                visible={checkedTaskModal}
                onClose={toggleCheckedTaskModal}
                title="Checked task"
                description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
                icon={<CompleteModalIcon width={56} height={56} />}
                footerButton={
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleCheckedTask}
                    >
                        Yes, Checked
                    </SgButton>
                }
            />
            <SgPopup
                visible={checkedTaskInfoModal}
                onClose={toggleCheckedTaskInfoModal}
                fullScreen={true}
                title="Task checked"
                description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
                icon={<CompletedModalIcon width={202} height={168} />}
            />

            <SgPopup
                visible={completedTaskModal}
                onClose={toggleCompletedTaskModal}
                title="Completed task"
                description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
                icon={<CompleteModalIcon width={56} height={56} />}
                footerButton={
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleCompletedTask}
                    >
                        Yes, Completed
                    </SgButton>
                }
            />
            <SgPopup
                visible={completedTaskInfoModal}
                onClose={toggleCompletedTaskInfoModal}
                fullScreen={true}
                title="Task Completed"
                description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
                icon={<CompletedModalIcon width={202} height={168} />}
            />


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
