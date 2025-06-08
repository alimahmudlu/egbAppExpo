import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import DotsIcon from "../../../assets/images/dots-icon.svg";
import styles from './TaskCard.styles';
import COLORS from '@/constants/colors';
import SgPopup from '@/components/ui/Modal/Modal';
import ClipboardIcon from "@/assets/images/clipboard-check.svg"
import PencilIcon from "@/assets/images/pencil.svg"
import TrashIcon from "@/assets/images/trash2.svg"
import SgButton from '@/components/ui/Button/Button';
import {Link} from "expo-router";
import LogOutModalIcon from "@/assets/images/logout.svg";
import TaskRemovedIcon from "@/assets/images/taskRemove.svg";
import CompleteModalIcon from "@/assets/images/CheckModal.svg";
import CompletedModalIcon from "@/assets/images/CompletedIcon.svg";

export default function SgSectionTaskCard({time, title, description, name, image, status, statusType, duration, id, projectId, href}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [removeTaskModal, setRemoveTaskModal] = useState(false);
    const [removeTaskInfoModal, setRemoveTaskInfoModal] = useState(false);

    const [completeTaskModal, setCompleteTaskModal] = useState(false);
    const [completeTaskInfoModal, setCompleteTaskInfoModal] = useState(false);

    const toggleRemoveTaskModal = () => {
        setRemoveTaskModal(!removeTaskModal);
    };
    const toggleRemoveTaskInfoModal = () => {
        setRemoveTaskInfoModal(!removeTaskInfoModal);
        setModalVisible(false)
    };
    const handleDeleteTask = () => {
        console.log('Delete item with task ID:', id, 'and project ID:', projectId);
        toggleRemoveTaskInfoModal();
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

    const getStatusStyles = (statusType) => {
        switch (statusType) {
            case 'success':
                return {backgroundColor: COLORS.success_100, color: COLORS.success_700};
            case 'warning':
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
                        {status && (
                            <View
                                style={[
                                    styles.statusBadge,
                                    {backgroundColor: getStatusStyles(statusType).backgroundColor},
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        {color: getStatusStyles(statusType).color},
                                    ]}
                                >
                                    {status}
                                </Text>
                            </View>
                        )}
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <DotsIcon width={20} height={20} style={styles.dotsIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <Link href={href || '#'} style={styles.content}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <Text style={styles.description} numberOfLines={2}>{description}</Text>
                </Link>

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
                <View style={styles.modalList}>
                    <TouchableOpacity onPress={toggleCompleteTaskModal}>
                        <View style={styles.modalItem}>
                            <ClipboardIcon width={20} height={20} style={styles.modalIcon}/>
                            <Text style={styles.modalText}>Complete task</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.modalItem}>
                            <PencilIcon width={20} height={20} style={styles.modalIcon}/>
                            <Text style={styles.modalText}>Edit task</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleRemoveTaskModal}>
                        <View style={styles.modalItem}>
                            <TrashIcon width={20} height={20} style={styles.modalIcon}/>
                            <Text style={styles.modalText}>Remove task</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        </View>
    );
};
