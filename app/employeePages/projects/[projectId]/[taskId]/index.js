import {Text, View, TouchableOpacity, StyleSheet, Pressable} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {router, useLocalSearchParams, useRouter} from "expo-router";
import SgCard from "@/components/ui/Card/Card";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import SgButton from "@/components/ui/Button/Button";
import moment from "moment/moment";
import {useApi} from "@/hooks/useApi";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import COLORS from "@/constants/colors";
import SgPopup from "@/components/ui/Modal/Modal";
import SgSectionAddFile from "@/components/sections/AddFile/AddFile";
import SgTemplateUploadScreen from "@/components/templates/Upload/Upload";
import {useData} from "@/hooks/useData";
import CompleteModalIcon from "@/assets/images/CheckModal.svg";
import CompletedModalIcon from "@/assets/images/CompletedIcon.svg";
import {useSocket} from "@/hooks/useSocket";
import {useTranslation} from "react-i18next";
import SgSectionStatusInfo from "@/components/sections/StatusInfo/StatusInfo";
import {useAuth} from "@/hooks/useAuth";

export default function ProjectItemScreen() {
    const { request } = useApi();
    const {getRating} = useAuth();
    const { storeData, updateData } = useData();
    const {socket} = useSocket();
    const router = useRouter();
    const { t } = useTranslation();
    const {refreshKey} = useLocalSearchParams();
    const { projectId, taskId } = useLocalSearchParams();
    const [taskDetails, setTaskDetails] = useState({});

    const [checkTaskModal, setCheckTaskModal] = useState(false);
    const [checkTaskInfoModal, setCheckTaskInfoModal] = useState(false);

    const [startTaskModal, setStartTaskModal] = useState(false);
    const [startTaskInfoModal, setStartTaskInfoModal] = useState(false);

    const [completeTaskModal, setCompleteTaskModal] = useState(false);
    const [completeTaskInfoModal, setCompleteTaskInfoModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([])

    const toggleCompleteTaskModal = () => {
        setCompleteTaskModal(!completeTaskModal);
    };
    const toggleCompleteTaskInfoModal = () => {
        setCompleteTaskInfoModal(!completeTaskInfoModal);
    };
    const handleCompleteTask = () => {
        request({
            url: `/employee/project/item/${projectId}/tasks/item/${taskId}/status`,
            method: 'post',
            data: {
                date: moment().format(''),
                status: 4,
                files: (selectedFiles || []).map(el => el?.id) || [],
            }
        }).then(res => {
            setSelectedFiles([])
            setTaskDetails({
                ...taskDetails,
                status: {
                    id: 4,
                    name: t('checkComplete')
                },
                files: []
            })
            toggleCompleteTaskInfoModal();
        }).catch(err => {
            console.log(err)
        })
    };

    const toggleCheckTaskModal = () => {
        setCheckTaskModal(!checkTaskModal);
    };
    const toggleCheckTaskInfoModal = () => {
        setCheckTaskInfoModal(!checkTaskInfoModal);
    };
    const handleCheckTask = () => {
        request({
            url: `/employee/project/item/${projectId}/tasks/item/${taskId}/status`,
            method: 'post',
            data: {
                date: moment().format(''),
                status: 3
            }
        }).then(res => {
            setTaskDetails({...taskDetails, status: {
                                id: 3,
                                name: t('checkProgress')
                                }})
            toggleCheckTaskInfoModal();
        }).catch(err => {
            console.log(err)
        })
    };

    const toggleStartTaskModal = () => {
        setStartTaskModal(!startTaskModal);
    };
    const toggleStartTaskInfoModal = () => {
        setStartTaskInfoModal(!startTaskInfoModal);
    };
    const handleStartTask = () => {
        request({
            url: `/employee/project/item/${projectId}/tasks/item/${taskId}/status`,
            method: 'post',
            data: {
                date: moment().format(''),
                status: 2
            }
        }).then(res => {
            setTaskDetails({...taskDetails, status: {
                                id: 2,
                                name: t('inProgress')
                                }})
            toggleStartTaskInfoModal();
        }).catch(err => {
            console.log(err)
        })
    };

    useEffect(() => {
        request({
            url: `/employee/project/item/${projectId}/tasks/item/${taskId}`,
            method: 'get',
        }).then().catch(err => {
            console.log(err);
        })
    }, [projectId, refreshKey]);


    useEffect(() => {
        setTaskDetails(storeData?.cache?.[`GET:/employee/project/item/${projectId}/tasks/item/${taskId}`]?.data)
    }, [storeData?.cache?.[`GET:/employee/project/item/${projectId}/tasks/item/${taskId}`]])

    useEffect(() => {
        if (!socket) return;

        const removeTask = (data) => {
            router.back();
        };

        const taskStatus = (data) => {
            getRating()
            updateData(`GET:/employee/project/item/${projectId}/tasks/item/${taskId}`, data)
        };

        // socket.on('connect', () => {
            socket.on("remove_task", removeTask);
            socket.on("change_task__by_employee", taskStatus);
        // })

        return () => {
            socket.off("remove_task", removeTask);
            socket.off("change_task__by_chief", taskStatus);
        };
    }, [socket]);

    function handleRemoveFile(index) {
        const _selectedFiles = [...selectedFiles];
        _selectedFiles.splice(index, 1)
        setSelectedFiles(_selectedFiles)
    }

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('taskDetails'),
            }}/>}
        >
            {taskDetails?.status?.id === 1 ?
                <SgSectionStatusInfo
                    title={t("open")}
                    status={t("open")}
                    statusType=""
                />
                : null
            }
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
                contentTitle={t('reporter')}
            >
                <SgSectionUserInfo
                    name={taskDetails?.reporter_employee?.full_name}
                    position={taskDetails?.reporter_employee?.position}
                    role='Chief'
                    color="dark"
                    size="md"
                />
            </SgCard>
            <SgCard
                contentTitle={t('deadlineDate')}
                contentDescription={taskDetails?.deadline ? moment(taskDetails?.deadline).format('DD.MM.YYYY / HH:mm') : null}
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
                        <Text style={styles.title}>Added Files</Text>
                    </SgCard>
                    {(taskDetails?.files || []).map((el, index) => (
                        <SgSectionAddFile
                            handleRemove={() => handleRemoveFile(index)}
                            key={index}
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

            {([1].includes(taskDetails?.status?.id)) ?
                <View style={{
                    gap: 12,
                    flexDirection: 'row',
                }}>
                    <SgButton
                        bgColor='#FEF0C7'
                        color='#B54708'
                        onPress={toggleStartTaskModal}
                    >
                        {t('started')}
                    </SgButton>
                </View>
                : null
            }

            {([2].includes(taskDetails?.status?.id)) ?
                <View style={{
                    gap: 12,
                    flexDirection: 'row',
                }}>
                    <SgButton
                        bgColor='#FEF0C7'
                        color='#B54708'
                        onPress={toggleCheckTaskModal}
                    >
                        {t('checkRequest')}
                    </SgButton>
                    <SgButton
                        bgColor='#D2F5EC'
                        color='#1A554E'
                        onPress={toggleCompleteTaskModal}
                    >
                        {t('completeTask')}
                    </SgButton>
                </View>
                : null
            }

            <SgPopup
                visible={completeTaskModal}
                onClose={toggleCompleteTaskModal}
                title={t('completeTask')}
                description={t('completeTask__description')}
                icon={<CompleteModalIcon width={56} height={56} />}
                footerButton={
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleCompleteTask}
                        disabled={selectedFiles.length === 0}
                    >
                        {t('yesComplete')}
                    </SgButton>
                }
            >
                <SgTemplateUploadScreen
                    setSelectedFiles={setSelectedFiles}
                    selectedFiles={selectedFiles}
                />

                {(selectedFiles || []).map((el, index) => (
                    <SgSectionAddFile
                        handleRemove={() => handleRemoveFile(index)}
                        key={index}
                        title={el?.name}
                        type={el?.type}
                        datetime={el?.date ? moment(el?.date).format('DD.MM.YYYY / HH:mm') : null}
                        url={el?.filepath}
                        onPress={() => console.log('file.filename')}
                    />
                ))}
            </SgPopup>
            <SgPopup
                visible={completeTaskInfoModal}
                onClose={toggleCompleteTaskInfoModal}
                fullScreen={true}
                title={t('taskCompleteRequestSended')}
                description={t('taskCompleteRequestSended__description')}
                icon={<CompletedModalIcon width={202} height={168} />}
            />

            {/* EMPLOYEE CHECK REQUEST */}
            <SgPopup
                visible={checkTaskModal}
                onClose={toggleCheckTaskModal}
                title={t("checkRequestTask")}
                description={t("checkRequestTask__description")}
                icon={<CompleteModalIcon width={56} height={56} />}
                footerButton={
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleCheckTask}
                    >
                        {t('yesCheck')}
                    </SgButton>
                }
            />
            <SgPopup
                visible={checkTaskInfoModal}
                onClose={toggleCheckTaskInfoModal}
                fullScreen={true}
                title={t('taskCompleteRequestSended')}
                description={t('taskCompleteRequestSended__description')}
                icon={<CompletedModalIcon width={202} height={168} />}
            />

            {/* EMPLOYEE START REQUEST */}
            <SgPopup
                visible={startTaskModal}
                onClose={toggleStartTaskModal}
                title={t("startRequestTask")}
                description={t("startRequestTask__description")}
                icon={<CompleteModalIcon width={56} height={56} />}
                footerButton={
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleStartTask}
                    >
                        {t('yesCheck')}
                    </SgButton>
                }
            />
            <SgPopup
                visible={startTaskInfoModal}
                onClose={toggleStartTaskInfoModal}
                fullScreen={true}
                title={t('startCompleteRequestSended')}
                description={t('startCompleteRequestSended__description')}
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
