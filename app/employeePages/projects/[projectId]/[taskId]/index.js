import {Text, View, TouchableOpacity, StyleSheet, Pressable} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
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

export default function ProjectItemScreen() {
    const { request } = useApi();
    const { insertData, storeData, removeRowData, changeRowData, updateData } = useData();
    const {socket} = useSocket();
    const router = useRouter();
    const { projectId, taskId } = useLocalSearchParams();
    const [taskDetails, setTaskDetails] = useState({});

    const [checkTaskModal, setCheckTaskModal] = useState(false);
    const [checkTaskInfoModal, setCheckTaskInfoModal] = useState(false);

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
                    name: 'check complete'
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
                                name: 'Check progress'
                                }})
            toggleCheckTaskInfoModal();
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
    }, [projectId]);


    useEffect(() => {
        setTaskDetails(storeData?.cache?.[`GET:/employee/project/item/${projectId}/tasks/item/${taskId}`]?.data)
    }, [storeData?.cache?.[`GET:/employee/project/item/${projectId}/tasks/item/${taskId}`]])

    useEffect(() => {
        if (!socket) return;

        const removeTask = (data) => {
            router.back();
        };

        const taskStatus = (data) => {
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

    return (
        <SgTemplateScreenView
            head={<SgTemplatePageHeader data={{
                header: 'Task detail'
            }}/>}
        >
            <SgCard
                contentTitle='Reporter'
            >
                <SgSectionUserInfo
                    name={taskDetails?.reporter_employee?.full_name}
                    role='Chief'
                    color="dark"
                    size="md"
                />
            </SgCard>
            <SgCard
                contentTitle='Deadline date'
                contentDescription={taskDetails?.deadline ? moment(taskDetails?.deadline).format('DD.MM.YYYY / HH:mm') : null}
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

            {([1, 2].includes(taskDetails?.status?.id)) ?
                <View style={{
                    gap: 12,
                    flexDirection: 'row',
                }}>
                    <SgButton
                        bgColor='#FEF0C7'
                        color='#B54708'
                        onPress={toggleCheckTaskModal}
                    >
                        Check request
                    </SgButton>
                    <SgButton
                        bgColor='#D2F5EC'
                        color='#1A554E'
                        onPress={toggleCompleteTaskModal}
                    >
                        Complete task
                    </SgButton>
                </View>
                : null
            }

            <SgPopup
                visible={completeTaskModal}
                onClose={toggleCompleteTaskModal}
                title="Complete task"
                description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
                icon={<CompleteModalIcon width={56} height={56} />}
                footerButton={
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleCompleteTask}
                        disabled={selectedFiles.length === 0}
                    >
                        Yes, Complete
                    </SgButton>
                }
            >
                <SgTemplateUploadScreen
                    setSelectedFiles={setSelectedFiles}
                    selectedFiles={selectedFiles}
                />

                {(selectedFiles || []).map((el, index) => (
                    <SgSectionAddFile
                        key={index}
                        title={el?.name}
                        type={el?.type}
                        datetime={el?.date ? moment(el?.date).format('DD.MM.YYYY / hh:mm A') : null}
                        url={el?.filepath}
                        onPress={() => console.log('file.filename')}
                    />
                ))}
            </SgPopup>
            <SgPopup
                visible={completeTaskInfoModal}
                onClose={toggleCompleteTaskInfoModal}
                fullScreen={true}
                title="Task complete request sended"
                description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
                icon={<CompletedModalIcon width={202} height={168} />}
            />

            {/* EMPLOYEE CHECK REQUEST */}
            <SgPopup
                visible={checkTaskModal}
                onClose={toggleCheckTaskModal}
                title="Check request task"
                description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
                icon={<CompleteModalIcon width={56} height={56} />}
                footerButton={
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleCheckTask}
                    >
                        Yes, Check
                    </SgButton>
                }
            />
            <SgPopup
                visible={checkTaskInfoModal}
                onClose={toggleCheckTaskInfoModal}
                fullScreen={true}
                title="Task complete request sended"
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
