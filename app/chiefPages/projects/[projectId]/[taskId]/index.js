import { View, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import { useLocalSearchParams, useRouter } from "expo-router";
import SgCard from "@/components/ui/Card/Card";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import SgButton from "@/components/ui/Button/Button";
import moment from "moment/moment";
import COLORS from "@/constants/colors";
import SgSectionStatusInfo from "@/components/sections/StatusInfo/StatusInfo";
import { useApi } from "@/hooks/useApi";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import { useData } from "@/hooks/useData";
import SgSectionAddFile from "@/components/sections/AddFile/AddFile";
import SgPopup from "@/components/ui/Modal/Modal";
import CompleteModalIcon from "@/assets/images/CheckModal.svg";
import CompletedModalIcon from "@/assets/images/CompletedIcon.svg";
import { useTranslation } from "react-i18next";
import SgTemplateUploadScreen from "@/components/templates/Upload/Upload";
import { useSocket } from "@/hooks/useSocket";
import { useAuth } from "@/hooks/useAuth";
import SgInput from "@/components/ui/Input/Input";

export default function TaskDetailsScreen() {
    // Hooks
    const { request } = useApi();
    const { getRating, user } = useAuth(); // 'user' obyektindən rolu müəyyən etmək üçün istifadə edirik
    const { storeData, updateData } = useData();
    const { socket } = useSocket();
    const router = useRouter();
    const { t } = useTranslation();
    const { projectId, taskId, refreshKey } = useLocalSearchParams();

    // Role detection (User obyektindən və ya başqa bir state-dən gəlir)
    const isChief = user?.role?.id === 3;
    const rolePath = isChief ? 'chief' : 'employee';

    // States
    const [taskDetails, setTaskDetails] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [actionModal, setActionModal] = useState({ visible: false, type: '', status: null });
    const [infoModal, setInfoModal] = useState({ visible: false, title: '', desc: '' });
    const [settings, setSettings] = useState({});
    const [statuses, setStatuses] = useState({
        1: {
            title: 'open',
            type: null,
            successModalTitle: 'startCompleteRequestSended',
            successModalTitle__description: 'startCompleteRequestSended__description',
        },
        2: {
            title: 'inProgress',
            type: 'warning',
            successModalTitle: 'startCompleteRequestSended',
            successModalTitle__description: 'startCompleteRequestSended__description',
        },
        3: {
            title: 'checkProgressRequested',
            type: 'warning',
            successModalTitle: 'taskCompleteRequestSended',
            successModalTitle__description: 'taskCompleteRequestSended__description',
        },
        4: {
            title: 'checkProgressRequestAccepted',
            type: 'warning',
            successModalTitle: 'taskChecked',
            successModalTitle__description: 'taskChecked__description',
        },
        5: {
            title: 'checkProgressRequestDenied',
            type: 'danger',
            successModalTitle: 'taskRejected',
            successModalTitle__description: 'taskRejected__description',
        },
        6: {
            title: 'completeRequested',
            type: 'warning',
            successModalTitle: 'taskCompleteRequestSended',
            successModalTitle__description: 'taskCompleteRequestSended__description',
        },
        7: {
            title: 'completeRequestAccepted',
            type: 'success',
            successModalTitle: 'taskCompleted',
            successModalTitle__description: 'taskCompleted__description',
        },
        8: {
            title: 'completeRequestDenied',
            type: 'danger',
            successModalTitle: 'taskRejected',
            successModalTitle__description: 'taskRejected__description',
        },
    })
    const [data, setData] = useState({});

    function handleChange(e) {
        setData({ ...data, [e?.name]: e?.value });
    }

    const cacheKey = `GET:/${rolePath}/project/item/${projectId}/tasks/item/${taskId}`;

    const fetchData = () => {
        request({ url: `/${rolePath}/project/item/${projectId}/tasks/item/${taskId}`, method: 'get' });
    };

    useEffect(() => {
        fetchData();
    }, [projectId, taskId, refreshKey]);

    useEffect(() => {
        const _data = storeData?.cache?.[cacheKey]?.data;
        setTaskDetails(_data);

        setSettings({
            isChief: isChief,
            isEmployee: !isChief,

            isSimpleChief: isChief ? _data?.assigned_employee?.id !== user?.id : false,
            isChiefAssigned: isChief ? (_data?.assigned_employee?.id === user?.id && _data?.reporter_employee?.id !== _data?.assigned_employee?.id) : false,
            isChiefReporterAssigned: isChief ? (_data?.assigned_employee?.id === user?.id && _data?.reporter_employee?.id === _data?.assigned_employee?.id) : false,
        })
    }, [storeData?.cache?.[cacheKey]]);

    // Socket listeners
    useEffect(() => {
        if (!socket) return;
        const removeTask = () => router.back();
        const taskStatus = (data) => {
            if (!isChief) getRating();
            updateData(cacheKey, data);
        };

        socket.on("remove_task", removeTask);
        socket.on(isChief ? "change_task__by_employee" : "change_task__by_chief", taskStatus);

        return () => {
            socket.off("remove_task", removeTask);
            socket.off(isChief ? "change_task__by_employee" : "change_task__by_chief", taskStatus);
        };
    }, [socket]);

    // Handlers
    const handleAction = (statusId) => {
        request({
            url: `/${rolePath}/project/item/${projectId}/tasks/item/${taskId}/status`,
            method: 'post',
            data: {
                date: moment().format(''),
                status: statusId,
                files: (selectedFiles || []).map(el => el?.id) || [],
                finalPoint: statusId === 7 ? data?.finalPoint || taskDetails?.points || 0 : null,
                comment: data?.comment || '',
            }
        }).then(() => {
            setActionModal({ visible: false, type: '', status: null });
            setSelectedFiles([]);
            setInfoModal({
                visible: true,
                title: t(statuses?.[statusId]?.successModalTitle || ''),
                desc: t(statuses?.[statusId]?.successModalTitle__description || '')
            });
            fetchData();
            setData({});
        });
    };

    const handleRemoveFile = (index) => {
        const _files = [...selectedFiles];
        _files.splice(index, 1);
        setSelectedFiles(_files);
    };

    return (
        <SgTemplateScreen head={<SgTemplatePageHeader data={{ header: t('taskDetail') }} />}>
            {settings?.isSimpleChief ?
                <SgSectionUserInfo
                    name={taskDetails?.reporter_employee?.full_name}
                    role={"Employee"}
                    position={taskDetails?.reporter_employee?.position}
                    clickable={isChief ? `/chiefPages/users/${taskDetails?.assigned_employee?.id}/` : null}
                    size="lg"
                    color="dark"
                />
                : null
            }
            {settings?.isChiefAssigned ?
                <SgCard
                    contentTitle={t('reporter')}
                >
                    <SgSectionUserInfo
                        name={taskDetails?.reporter_employee?.full_name}
                        role='Chief'
                        position={taskDetails?.reporter_employee?.position}
                        clickable={isChief ? `/chiefPages/users/${taskDetails?.assigned_employee?.id}/` : null}
                        color="dark"
                        size="md"
                    />
                </SgCard>
                : null
            }
            {settings?.isChiefReporterAssigned ?
                <SgCard
                    contentTitle={t('reporterAndAssigner')}
                >
                    <SgSectionUserInfo
                        name={taskDetails?.reporter_employee?.full_name}
                        role='Chief'
                        position={taskDetails?.reporter_employee?.position}
                        clickable={isChief ? `/chiefPages/users/${taskDetails?.assigned_employee?.id}/` : null}
                        color="dark"
                        size="md"
                    />
                </SgCard>
                : null
            }
            {settings?.isEmployee ?
                <SgCard
                    contentTitle={t('reporter')}
                >
                    <SgSectionUserInfo
                        name={taskDetails?.reporter_employee?.full_name}
                        role='Employee'
                        position={taskDetails?.reporter_employee?.position}
                        clickable={isChief ? `/chiefPages/users/${taskDetails?.assigned_employee?.id}/` : null}
                        color="dark"
                        size="md"
                    />
                </SgCard>
                : null
            }

            <SgSectionStatusInfo
                title={taskDetails?.status?.id === 7 ? t("completed") : t("progress")}
                status={t(statuses?.[taskDetails?.status?.id]?.title || '')}
                statusType={[2,3,4,5,6,8].includes(taskDetails?.status?.id) ? "warning" : "success"}
            />

            {/* Common Info Cards */}
            <SgCard contentTitle={t('deadlineDate')} contentDescription={taskDetails?.deadline ? moment(taskDetails?.deadline).format('DD.MM.YYYY / HH:mm') : ''} />
            <SgCard contentTitle={t('pointsToBeEarned')} contentDescription={taskDetails?.points} />
            <SgCard contentTitle={t('task')} contentDescription={taskDetails?.name} padding={false} bgColor={null} />
            <SgCard contentTitle={t('description')} contentDescription={taskDetails?.description} padding={false} bgColor={null} />

            {/* Files List */}
            {taskDetails?.files?.length > 0 && (
                <>
                    <SgCard><Text style={styles.title}>{t('addedFiles')}</Text></SgCard>
                    {taskDetails.files.map((el, index) => (
                        <SgSectionAddFile key={index} fileType={el.mimetype} title={el?.upload?.filename} url={el?.upload?.filepath} />
                    ))}
                </>
            )}

            {/* Files List */}
            {((taskDetails?.activities || []).filter((ac, ac_i) => ac.comment))?.length > 0 && (
                <>
                    <SgCard><Text style={styles.title}>{t('Comments')}</Text></SgCard>
                    {((taskDetails?.activities || []).filter((ac, ac_i) => ac.comment)).map((ac, ac_i) => (
                        <View key={ac_i} style={{borderBottomWidth: 1, paddingVertical: 8, borderBottomColor: COLORS.gray_200, gap: 4}}>
                            <Text style={{ fontWeight: 'bold'}}>{ac?.status?.name}</Text>
                            <Text style={{fontSize: 10, fontWeight: 700}}>{moment(ac.created_at).format('DD/MM/YYYY HH:mm')}</Text>
                            <Text style={{fontSize: 14, marginTop: 4 }}>{ac.comment}</Text>
                        </View>
                    ))}
                </>
            )}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                {(settings?.isSimpleChief) ?
                    (
                        <>
                            {taskDetails?.status?.id === 3 && (
                                <>
                                    <SgButton bgColor={COLORS.error_50} color={COLORS.error_700} onPress={() => setActionModal({visible: true, type: 'reject', status: 5})}>{t('rejected')}</SgButton>
                                    <SgButton bgColor={COLORS.primary} color={COLORS.white} onPress={() => setActionModal({visible: true, type: 'check', status: 4})}>{t('checked')}</SgButton>
                                </>
                            )}
                            {taskDetails?.status?.id === 6 && (
                                <>
                                    <SgButton bgColor={COLORS.error_50} color={COLORS.error_700} onPress={() => setActionModal({visible: true, type: 'reject', status: 8})}>{t('rejected')}</SgButton>
                                    <SgButton bgColor={COLORS.primary} color={COLORS.white} onPress={() => setActionModal({visible: true, type: 'complete', status: 7})}>{t('completedTask')}</SgButton>
                                </>
                            )}
                        </>
                    ) :
                    null
                }
                {((settings?.isChief && settings?.isChiefAssigned) || settings?.isEmployee) ?
                    (
                        <>
                            {taskDetails?.status?.id === 1 && (
                                <SgButton bgColor='#FEF0C7' color='#B54708' onPress={() => setActionModal({visible: true, type: 'startRequestTask', status: 2})}>{t('started')}</SgButton>
                            )}
                            {[2, 4, 5, 8].includes(taskDetails?.status?.id) && (
                                <>
                                    <SgButton bgColor='#FEF0C7' color='#B54708' onPress={() => setActionModal({visible: true, type: 'check', status: 3})}>{t('checkRequest')}</SgButton>
                                    <SgButton bgColor='#D2F5EC' color='#1A554E' onPress={() => setActionModal({visible: true, type: 'complete', status: 6})}>{t('completeTask')}</SgButton>
                                </>
                            )}
                        </>
                    ) :
                    null
                }
                {(settings?.isChief && settings?.isChiefReporterAssigned) ?
                    (
                        <>
                            {taskDetails?.status?.id === 1 && (
                                <SgButton bgColor='#FEF0C7' color='#B54708' onPress={() => setActionModal({visible: true, type: 'startRequestTask', status: 2})}>{t('started')}</SgButton>
                            )}
                            {[2, 4, 5, 8].includes(taskDetails?.status?.id) && (
                                <>
                                    <SgButton bgColor={COLORS.primary} color={COLORS.white} onPress={() => setActionModal({visible: true, type: 'complete', status: 7})}>{t('completedTask')}</SgButton>
                                </>
                            )}
                        </>
                    ) :
                    null
                }
            </View>

            {/* Dynamic Action Popup */}
            <SgPopup
                visible={actionModal.visible}
                onClose={() => setActionModal({ ...actionModal, visible: false })}
                title={t(`${actionModal.type}`)}
                description={t(`${actionModal.type}__description`)}
                icon={<CompleteModalIcon width={50} height={50} />}
                footerButton={
                    <SgButton bgColor={COLORS.brand_600} color={COLORS.white} onPress={() => handleAction(actionModal.status)}>
                        {t('yesCheck')}
                    </SgButton>
                }
            >
                <View style={{ gap: 16 }}>
                    <View>
                        <SgInput
                            placeholder={t('enterNote')}
                            label={t('note')}
                            value={data?.comment || ''}
                            name='comment'
                            onChangeText={(e) => handleChange(e)}
                            type='textarea'
                        />
                    </View>

                    {actionModal.status === 7 ?
                        <SgInput
                            label={t('finalPoint')}
                            placeholder={t('enterPoint')}
                            type="counter"
                            value={data?.point || taskDetails?.points || 0}
                            name='finalPoint'
                            onChangeText={handleChange}
                            max={taskDetails?.points || 0}
                            min={0}
                        />
                        : null
                    }

                    <View>
                        <SgTemplateUploadScreen setSelectedFiles={setSelectedFiles} selectedFiles={selectedFiles} />
                        {selectedFiles.map((el, index) => (
                            <SgSectionAddFile key={index} title={el?.name} remove={true} handleRemove={() => handleRemoveFile(index)} />
                        ))}
                    </View>
                </View>
            </SgPopup>

            {/* Success Info Popup */}
            <SgPopup
                visible={infoModal.visible}
                onClose={() => setInfoModal({ ...infoModal, visible: false })}
                fullScreen={true}
                title={infoModal.title}
                description={infoModal.desc}
                icon={<CompletedModalIcon width={202} height={168} />}
            />

        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
    buttonContainer: { flexDirection: 'row', gap: 12, marginTop: 20 },
    title: { fontWeight: '600', fontSize: 16 }
});