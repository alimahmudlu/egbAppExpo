import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import DotsIcon from "../../../assets/images/dots-icon.svg";
import styles from './TaskCard.styles';
import COLORS from '@/constants/colors';
import SgPopup from '@/components/ui/Modal/Modal';
import ClipboardIcon from "@/assets/images/clipboard-check.svg"
import PencilIcon from "@/assets/images/pencil.svg"
import TrashIcon from "@/assets/images/trash2.svg"
import SgButton from '@/components/ui/Button/Button';
import LogOutModalIcon from "@/assets/images/logout.svg";
import TaskRemovedIcon from "@/assets/images/taskRemove.svg";
import CompleteModalIcon from "@/assets/images/CheckModal.svg";
import CompletedModalIcon from "@/assets/images/CompletedIcon.svg";
import {useRouter} from "expo-router";
import ApiService from "@/services/ApiService";
import {useAuth} from "@/hooks/useAuth";
import SgTemplateUploadScreen from "@/components/templates/Upload/Upload";
import SgSectionAddFile from "@/components/sections/AddFile/AddFile";
import moment from "moment";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";

export default function SgSectionTaskCard(props) {
    const { user, accessToken } = useAuth();
    const { request } = useApi();
    const {changeRowData, removeRowData} = useData();
    const router = useRouter();
    const [data, setData] = useState({});
    const {t} = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [removeTaskModal, setRemoveTaskModal] = useState(false);
    const [removeTaskInfoModal, setRemoveTaskInfoModal] = useState(false);

    const [checkTaskModal, setCheckTaskModal] = useState(false);
    const [checkTaskInfoModal, setCheckTaskInfoModal] = useState(false);

    const [completeTaskModal, setCompleteTaskModal] = useState(false);
    const [completeTaskInfoModal, setCompleteTaskInfoModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([])

    const [checkedTaskModal, setCheckedTaskModal] = useState(false);
    const [checkedTaskInfoModal, setCheckedTaskInfoModal] = useState(false);
    const [completedTaskModal, setCompletedTaskModal] = useState(false);
    const [completedTaskInfoModal, setCompletedTaskInfoModal] = useState(false);

    const toggleRemoveTaskModal = () => {
        setModalVisible(false)
        setRemoveTaskModal(!removeTaskModal);
    };
    const toggleRemoveTaskInfoModal = () => {
        setRemoveTaskInfoModal(!removeTaskInfoModal);
        setModalVisible(false)
    };
    const handleDeleteTask = () => {
        ApiService.delete(`/chief/task/${data?.id}`, {
            headers: {
                'authorization': accessToken || ''
            }
        } ).then(res => {
            toggleRemoveTaskInfoModal();
            removeRowData(`GET:/chief/task/list`, data?.id, 'id');
            removeRowData(`GET:/chief/project/item/${data?.projectId}/tasks`, data?.id, 'id');
        }).catch(err => {
            console.log(err);
        });
    };

    const toggleCheckedTaskModal = () => {
        setModalVisible(false)
        setCheckedTaskModal(!checkedTaskModal);
    };
    const toggleCheckedTaskInfoModal = () => {
        setCheckedTaskInfoModal(!checkedTaskInfoModal);
        setModalVisible(false)
    };
    const handleCheckedTask = () => {
        request({
            url: `/chief/project/item/${data?.projectId}/tasks/item/${data?.id}/status`,
            method: 'post',
            data: {
                date: moment().format(''),
                status: 2,
            }
        }).then(res => {
            changeRowData(`GET:/chief/project/item/${data?.projectId}/tasks`, res?.data, res?.data?.id)
            changeRowData(`GET:/chief/task/list`, res?.data, res?.data?.id)
            toggleCheckedTaskInfoModal();
        }).catch(err => {
            console.log(err)
        })
    };

    const toggleCompletedTaskModal = () => {
        setCompletedTaskModal(!completedTaskModal);
        setModalVisible(false)
    };
    const toggleCompletedTaskInfoModal = () => {
        setCompletedTaskInfoModal(!completedTaskInfoModal);
        setModalVisible(false)
    };
    const handleCompletedTask = () => {
        request({
            url: `/chief/project/item/${data?.projectId}/tasks/item/${data?.id}/status`,
            method: 'post',
            data: {
                date: moment().format(''),
                status: 5,
            }
        }).then(res => {
            changeRowData(`GET:/chief/project/item/${data?.projectId}/tasks`, res?.data, res?.data?.id)
            changeRowData(`GET:/chief/task/list`, res?.data, res?.data?.id)
            toggleCompletedTaskInfoModal();
        }).catch(err => {
            console.log(err)
        })
    };

    const toggleCompleteTaskModal = () => {
        setModalVisible(false)
        setCompleteTaskModal(!completeTaskModal);
    };
    const toggleCompleteTaskInfoModal = () => {
        setCompleteTaskInfoModal(!completeTaskInfoModal);
        setModalVisible(false)
    };
    const handleCompleteTask = () => {
        request({
            url: `/employee/project/item/${data?.projectId}/tasks/item/${data?.id}/status`,
            method: 'post',
            data: {
                date: moment().format(''),
                status: 4,
                files: (selectedFiles || []).map(el => el?.id) || [],
            }
        }).then(res => {
            changeRowData(`GET:/employee/project/item/${data?.projectId}/tasks`, res?.data, res?.data?.id)
            setSelectedFiles([])
            toggleCompleteTaskInfoModal();
        }).catch(err => {
            console.log(err)
        })
    };

    const toggleCheckTaskModal = () => {
        setModalVisible(false)
        setCheckTaskModal(!checkTaskModal);
    };
    const toggleCheckTaskInfoModal = () => {
        setCheckTaskInfoModal(!checkTaskInfoModal);
        setModalVisible(false)
    };
    const handleCheckTask = () => {
        request({
            url: `/employee/project/item/${data?.projectId}/tasks/item/${data?.id}/status`,
            method: 'post',
            data: {
                date: moment().format(''),
                status: 3
            }
        }).then(res => {
            changeRowData(`GET:/employee/project/item/${data?.projectId}/tasks`, res?.data, res?.data?.id)
            toggleCheckTaskInfoModal();
        }).catch(err => {
            console.log(err)
        })
    };

    const getStatusStyles = () => {
        switch (data?.status?.id) {
            case 5:
                return {backgroundColor: COLORS.success_100, color: COLORS.success_700};
            case 4:
                return {backgroundColor: COLORS.success_100, color: COLORS.success_700};
            case 3:
                return {backgroundColor: COLORS.warning_100, color: COLORS.warning_700};
            case 2:
                return {backgroundColor: COLORS.warning_100, color: COLORS.warning_700};
            case 1:
                return {backgroundColor: COLORS.white, color: COLORS.black};
            default:
                return {backgroundColor: COLORS.white, color: COLORS.black};
        }
    };

    useEffect(() => {
        setData(props || {})
    }, [props]);
    return (
        <View>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.time}>{data?.time}</Text>
                    <View style={styles.rightHeader}>
                        {(data?.status?.id && [1, 2, 3, 4, 5].includes(data?.status?.id)) && (
                            <View
                                style={[
                                    styles.statusBadge,
                                    {backgroundColor: getStatusStyles(data?.status?.id).backgroundColor},
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        {color: getStatusStyles(data?.status?.id).color},
                                    ]}
                                >
                                    {data?.status?.id === 1 && t("open")}
                                    {data?.status?.id === 2 && t("inProgress")}
                                    {data?.status?.id === 3 && t("checkProgress")}
                                    {data?.status?.id === 4 && t("checkComplete")}
                                    {data?.status?.id === 5 && t("completed")}
                                </Text>
                            </View>
                        )}
                        {data.status?.id !== 5 ?
                            <TouchableOpacity style={styles.dots} onPress={() => setModalVisible(true)}>
                                <DotsIcon width={20} height={20} style={styles.dotsIcon}/>
                            </TouchableOpacity>
                            : null
                        }
                    </View>
                </View>

                <Pressable onPress={() => {router.push(data?.href)}} style={styles.content}>
                    <Text style={styles.title} numberOfLines={1}>{data?.title}</Text>
                    <Text style={styles.description} numberOfLines={2}>{data?.description}</Text>
                </Pressable>

                <View style={styles.footer}>
                    <Text style={styles.duration}>{data?.duration}</Text>
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>{data?.name}</Text>
                        {data?.image ? (
                            <Image source={{uri: data?.image}} style={styles.avatar}/>
                        ) : (
                            <View style={styles.placeholderAvatar}>
                                <Text style={styles.avatarText}>
                                    {data?.name?.split(' ').map(n => n[0]).join('')}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            <SgPopup
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title={t('actions')}
                description=" "
            >
                {user?.role?.id === 3 ?
                    <View style={styles.modalList}>
                        {data?.status?.id === 3 ?
                            <TouchableOpacity onPress={toggleCheckedTaskModal}>
                                <View style={styles.modalItem}>
                                    <ClipboardIcon width={20} height={20} style={styles.modalIcon}/>
                                    <Text style={styles.modalText}>{t('checkedTask')}</Text>
                                </View>
                            </TouchableOpacity>
                            : null
                        }
                        {data?.status?.id === 4 ?
                            <TouchableOpacity onPress={toggleCompletedTaskModal}>
                                <View style={styles.modalItem}>
                                    <ClipboardIcon width={20} height={20} style={styles.modalIcon}/>
                                    <Text style={styles.modalText}>{t('completedTask')}</Text>
                                </View>
                            </TouchableOpacity>
                            : null
                        }
                                {/*<TouchableOpacity>*/}
                                {/*    <View style={styles.modalItem}>*/}
                                {/*        <PencilIcon width={20} height={20} style={styles.modalIcon}/>*/}
                                {/*        <Text style={styles.modalText}>Edit task</Text>*/}
                                {/*    </View>*/}
                                {/*</TouchableOpacity>*/}
                        {data?.status?.id === 1 ?
                            <TouchableOpacity onPress={toggleRemoveTaskModal}>
                                <View style={styles.modalItem}>
                                    <TrashIcon width={20} height={20} style={styles.modalIcon}/>
                                    <Text style={styles.modalText}>{t('removeTask')}</Text>
                                </View>
                            </TouchableOpacity>
                            : null
                        }
                    </View>
                    : null
                }
                {user?.role?.id === 1 ?
                    <View style={styles.modalList}>
                        <TouchableOpacity onPress={toggleCompleteTaskModal}>
                            <View style={styles.modalItem}>
                                <ClipboardIcon width={20} height={20} style={styles.modalIcon}/>
                                <Text style={styles.modalText}>{t('completeRequest')}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleCheckTaskModal}>
                            <View style={styles.modalItem}>
                                <ClipboardIcon width={20} height={20} style={styles.modalIcon}/>
                                <Text style={styles.modalText}>{t('checkRequest')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : null
                }

            </SgPopup>

            <SgPopup
                visible={removeTaskModal}
                onClose={toggleRemoveTaskModal}
                title={t('removeTask')}
                description={t('removeTask__description')}
                icon={<LogOutModalIcon width={56} height={56} />}
                footerButton={
                    <SgButton
                        bgColor={COLORS.error_600}
                        color={COLORS.white}
                        onPress={handleDeleteTask}
                    >
                        {t('yesRemove')}
                    </SgButton>
                }
            />

            <SgPopup
                visible={removeTaskInfoModal}
                onClose={toggleRemoveTaskInfoModal}
                fullScreen={true}
                title={t('taskRemoved')}
                description={t('taskRemoved__description')}
                icon={<TaskRemovedIcon width={202} height={168} />}
            />


            {/* EMPLOYEE COMPLETE REQUEST */}
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
                title={t('taskCompleteRequestSended')}
                description={t('taskCompleteRequestSended__description')}
                icon={<CompletedModalIcon width={202} height={168} />}
            />


            {/* EMPLOYEE CHECK REQUEST */}
            <SgPopup
                visible={checkTaskModal}
                onClose={toggleCheckTaskModal}
                title={t('checkRequestTask')}
                description={t('checkRequestTask__description')}
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
                title={t('taskCheck')}
                description={t('taskCheck__description')}
                icon={<CompletedModalIcon width={202} height={168} />}
            />

            <SgPopup
                visible={checkedTaskModal}
                onClose={toggleCheckedTaskModal}
                title={t('taskChecked')}
                description={t('taskChecked__description')}
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


        </View>
    );
};
