import {View, StyleSheet, Text} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useLocalSearchParams} from "expo-router";
import SgCard from "@/components/ui/Card/Card";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
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
import {useTranslation} from "react-i18next";

export default function ProjectItemScreen() {
    const { request } = useApi();
    const {storeData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const { projectId, taskId } = useLocalSearchParams();
    const { t } = useTranslation();
    const [taskDetails, setTaskDetails] = useState({});

    const [checkedTaskModal, setCheckedTaskModal] = useState(false);
    const [checkedTaskInfoModal, setCheckedTaskInfoModal] = useState(false);

    const [completedTaskModal, setCompletedTaskModal] = useState(false);
    const [completedTaskInfoModal, setCompletedTaskInfoModal] = useState(false);

    const [rejectedTaskModal, setRejectedTaskModal] = useState(false);
    const [rejectedTaskInfoModal, setRejectedTaskInfoModal] = useState(false);

    const toggleRejectedTaskModal = () => {
        setRejectedTaskModal(!rejectedTaskModal);
    };
    const toggleRejectedTaskInfoModal = () => {
        setRejectedTaskInfoModal(!rejectedTaskInfoModal);
    };
    const handleRejectedTask = () => {
        request({
            url: `/chief/project/item/${projectId}/tasks/item/${taskId}/status`,
            method: 'post',
            data: {
                date: moment().format(''),
                status: 2,
            }
        }).then(res => {
            setTaskDetails({
                ...taskDetails,
                status: {
                    id: 2,
                    name: 'In Progress'
                },
                files: []
            })
            toggleRejectedTaskInfoModal();
        }).catch(err => {
            console.log(err)
        })
    };

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
    }, [projectId, refreshKey, taskId]);

    useEffect(() => {
        setTaskDetails(storeData?.cache?.[`GET:/chief/project/item/${projectId}/tasks/item/${taskId}`]?.data)
    }, [storeData?.cache?.[`GET:/chief/project/item/${projectId}/tasks/item/${taskId}`]]);

    function handleRemoveFile(index) {
        const _selectedFiles = [...taskDetails?.files];
        _selectedFiles.splice(index, 1)
        setTaskDetails({...taskDetails, files: _selectedFiles})
    }


    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('taskDetail'),
            }} />}
        >
            <SgSectionUserInfo
                name={taskDetails?.assigned_employee?.full_name}
                role="Employee"
                position={taskDetails?.assigned_employee?.position}
                profileImage={''}
                color="dark"
                size="lg"
                clickable={`/chiefPages/users/${taskDetails?.assigned_employee?.id}/`}
            />
            {/*{taskDetails?.status?.id === 1 ?*/}
                <SgSectionStatusInfo
                    title={t("status")}
                    status={t("open")}
                    statusType=""
                />
                {/*: null*/}
            {/*}*/}
            {taskDetails?.status?.id === 2 ?
                <SgSectionStatusInfo
                    title={t("progress")}
                    status={t("inProgress")}
                    statusType="warning"
                />
                : null
            }
            {taskDetails?.status?.id === 3 ?
                <SgSectionStatusInfo
                    title={t("progress")}
                    status={t("checkProgress")}
                    statusType="warning"
                />
                : null
            }
            {taskDetails?.status?.id === 4 ?
                <SgSectionStatusInfo
                    title={t("progress")}
                    status={t("checkComplete")}
                    statusType="success"
                />
                : null
            }
            {taskDetails?.status?.id === 5 ?
                <SgSectionStatusInfo
                    title={t("completed")}
                    status={t("completed")}
                    statusType="success"
                />
                : null
            }
            <SgCard
                contentTitle={t('deadlineDate')}
                contentDescription={taskDetails?.deadline ? moment(taskDetails?.deadline).format('DD.MM.YYYY / HH:mm') : ''}
            />
            <SgCard
                contentTitle={t('pointsToBeEarned')}
                contentDescription={taskDetails?.points}
            />

            <SgCard
                contentTitle={t('task')}
                contentDescription={taskDetails?.name}
                padding={false}
                bgColor={null}
            />
            <SgCard
                contentTitle={t('description')}
                contentDescription={taskDetails?.description}
                padding={false}
                bgColor={null}
            />

            {(taskDetails?.files || []).length > 0 ?
                <>
                    <SgCard>
                        <Text style={styles.title}>{t('addedFiles')}</Text>
                    </SgCard>
                    {(taskDetails?.files || []).map((el, index) => (
                        <SgSectionAddFile
                            handleRemove={() => handleRemoveFile(index)}
                            key={index}
                            fileType={el.mimetype}
                            title={el?.upload?.filename}
                            type={el?.type}
                            datetime={el?.created_at ? moment(el?.created_at).format('DD.MM.YYYY / HH:mm') : null}
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
                        {t('checked')}
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
                        onPress={handleRejectedTask}
                    >
                        {t('rejected')}
                    </SgButton>
                    <SgButton
                        bgColor = {COLORS.primary}
                        color= {COLORS.white}
                        onPress={toggleCompletedTaskModal}
                    >
                        {t('completedTask')}
                    </SgButton>
                </View>
                : null
            }

            <SgPopup
                visible={checkedTaskModal}
                onClose={toggleCheckedTaskModal}
                title={t('checkedTask')}
                description={t('checkedTask__description')}
                icon={<CompleteModalIcon width={56} height={56} />}
                footerButton={
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleCheckedTask}
                    >
                        {t('yesChecked')}
                    </SgButton>
                }
            />
            <SgPopup
                visible={checkedTaskInfoModal}
                onClose={toggleCheckedTaskInfoModal}
                fullScreen={true}
                title={t('taskChecked')}
                description={t('taskChecked__description')}
                icon={<CompletedModalIcon width={202} height={168} />}
            />

            <SgPopup
                visible={completedTaskModal}
                onClose={toggleCompletedTaskModal}
                title={t('completedTask')}
                description={t('completedTask__description')}
                icon={<CompleteModalIcon width={56} height={56} />}
                footerButton={
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleCompletedTask}
                    >
                        {t('yesCompleted')}
                    </SgButton>
                }
            />
            <SgPopup
                visible={completedTaskInfoModal}
                onClose={toggleCompletedTaskInfoModal}
                fullScreen={true}
                title={t('taskCompleted')}
                description={t('taskCompleted__description')}
                icon={<CompletedModalIcon width={202} height={168} />}
            />

            <SgPopup
                visible={rejectedTaskModal}
                onClose={toggleRejectedTaskModal}
                title={t('rejectedTask')}
                description={t('rejectedTask__description')}
                footerButton={
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleRejectedTask}
                    >
                        {t('yesCompleted')}
                    </SgButton>
                }
            />
            <SgPopup
                visible={rejectedTaskInfoModal}
                onClose={toggleRejectedTaskInfoModal}
                fullScreen={true}
                title={t('taskRejected')}
                description={t('taskRejected__description')}
                icon={<CompletedModalIcon width={202} height={168} />}
            />


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
