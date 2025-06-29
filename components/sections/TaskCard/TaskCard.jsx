import React, {useState} from 'react';
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

export default function SgSectionTaskCard({time, title, description, name, image, status, duration, id, projectId, href}) {
    const { user, accessToken } = useAuth();
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [removeTaskModal, setRemoveTaskModal] = useState(false);
    const [removeTaskInfoModal, setRemoveTaskInfoModal] = useState(false);

    const [completeTaskModal, setCompleteTaskModal] = useState(false);
    const [completeTaskInfoModal, setCompleteTaskInfoModal] = useState(false);

    const [checkedTaskModal, setCheckedTaskModal] = useState(false);
    const [checkedTaskInfoModal, setCheckedTaskInfoModal] = useState(false);

    const toggleRemoveTaskModal = () => {
        setRemoveTaskModal(!removeTaskModal);
    };
    const toggleRemoveTaskInfoModal = () => {
        setRemoveTaskInfoModal(!removeTaskInfoModal);
        setModalVisible(false)
    };
    const handleDeleteTask = () => {
        ApiService.delete(`/chief/task/${id}`, {
            headers: {
                'authorization': accessToken || ''
            }
        } ).then(res => {
            toggleRemoveTaskInfoModal();

        }).catch(err => {
            console.log(err);
        });
    };

    const toggleCheckedTaskModal = () => {
        setCheckedTaskModal(!checkedTaskModal);
    };
    const toggleCheckedTaskInfoModal = () => {
        setCheckedTaskInfoModal(!checkedTaskInfoModal);
        setModalVisible(false)
    };
    const handleCheckedTask = () => {
        console.log('Checked item with task ID:', id, 'and project ID:', projectId);
        toggleCheckedTaskInfoModal();
    };

    const toggleCompleteTaskModal = () => {
        setCompleteTaskModal(!completeTaskModal);
    };
    const toggleCompleteTaskInfoModal = () => {
        setCompleteTaskInfoModal(!completeTaskInfoModal);
        setModalVisible(false)
    };
    const handleCompleteTask = () => {
        console.log('Complete item with task ID:', id, 'and project ID:', projectId);
        toggleCompleteTaskInfoModal();
    };

    const getStatusStyles = () => {
        switch (status?.id) {
            case 5:
                return {backgroundColor: COLORS.success_100, color: COLORS.success_700};
            case 4:
                return {backgroundColor: COLORS.success_100, color: COLORS.success_700};
            case 3:
                return {backgroundColor: COLORS.warning_100, color: COLORS.warning_700};
            default:
                return {backgroundColor: COLORS.white, color: COLORS.black};
        }
    };
    return (
        <View>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.time}>{time}</Text>
                    <View style={styles.rightHeader}>
                        {(status?.id && [3, 4, 5].includes(status?.id)) && (
                            <View
                                style={[
                                    styles.statusBadge,
                                    {backgroundColor: getStatusStyles(status?.id).backgroundColor},
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        {color: getStatusStyles(status?.id).color},
                                    ]}
                                >
                                    {status?.name}
                                </Text>
                            </View>
                        )}
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <DotsIcon width={20} height={20} style={styles.dotsIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <Pressable onPress={() => {router.push(href)}} style={styles.content}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <Text style={styles.description} numberOfLines={2}>{description}</Text>
                </Pressable>

                <View style={styles.footer}>
                    <Text style={styles.duration}>{duration}</Text>
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>{name}</Text>
                        {image ? (
                            <Image source={{uri: image}} style={styles.avatar}/>
                        ) : (
                            <View style={styles.placeholderAvatar}>
                                <Text style={styles.avatarText}>
                                    {name?.split(' ').map(n => n[0]).join('')}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            <SgPopup
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Actions"
                description=" "
            >
                {user?.role?.id === 3 ?
                    <View style={styles.modalList}>
                        {status === 3 ?
                            <TouchableOpacity onPress={toggleCheckedTaskModal}>
                                <View style={styles.modalItem}>
                                    <ClipboardIcon width={20} height={20} style={styles.modalIcon}/>
                                    <Text style={styles.modalText}>Checked task</Text>
                                </View>
                            </TouchableOpacity>
                            : null
                        }
                        {status === 4 ?
                            <TouchableOpacity onPress={toggleCompleteTaskModal}>
                                <View style={styles.modalItem}>
                                    <ClipboardIcon width={20} height={20} style={styles.modalIcon}/>
                                    <Text style={styles.modalText}>Complete task</Text>
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
                                <TouchableOpacity onPress={toggleRemoveTaskModal}>
                                    <View style={styles.modalItem}>
                                        <TrashIcon width={20} height={20} style={styles.modalIcon}/>
                                        <Text style={styles.modalText}>Remove task</Text>
                                    </View>
                                </TouchableOpacity>
                    </View>
                    : null
                }
                {user?.role?.id === 1 ?
                    <View style={styles.modalList}>
                        <TouchableOpacity onPress={toggleCompleteTaskModal}>
                            <View style={styles.modalItem}>
                                <ClipboardIcon width={20} height={20} style={styles.modalIcon}/>
                                <Text style={styles.modalText}>Complete request</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleCompleteTaskModal}>
                            <View style={styles.modalItem}>
                                <ClipboardIcon width={20} height={20} style={styles.modalIcon}/>
                                <Text style={styles.modalText}>Check request</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : null
                }

            </SgPopup>

            <SgPopup
                visible={removeTaskModal}
                onClose={toggleRemoveTaskModal}
                title="Remove Task"
                description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
                icon={<LogOutModalIcon width={56} height={56} />}
                footerButton={
                    <SgButton
                        bgColor={COLORS.error_600}
                        color={COLORS.white}
                        onPress={handleDeleteTask}
                    >
                        Yes, Remove
                    </SgButton>
                }
            />

            <SgPopup
                visible={removeTaskInfoModal}
                onClose={toggleRemoveTaskInfoModal}
                fullScreen={true}
                title="Task removed"
                description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
                icon={<TaskRemovedIcon width={202} height={168} />}
            />

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
                    >
                        Yes, Complete
                    </SgButton>
                }
            />
            <SgPopup
                visible={completeTaskInfoModal}
                onClose={toggleCompleteTaskInfoModal}
                fullScreen={true}
                title="Task completed"
                description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
                icon={<CompletedModalIcon width={202} height={168} />}
            />

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
        </View>
    );
};
