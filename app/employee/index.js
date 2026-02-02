import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import Clock from "@/assets/images/clock.svg";
import SgCheckInOutCard from "@/components/ui/CheckInOutCard/CheckInOutCard";
import { useAuth } from "@/hooks/useAuth";
import { StyleSheet, Text, View } from "react-native";
import InfoCircleModalIcon from "@/assets/images/infoCircleModal.svg";
import SgPopup from "@/components/ui/Modal/Modal";
import React, { useCallback, useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useData } from "@/hooks/useData";
import SgUtilsTimeDifference from "@/utils/TimeDifference";
import { useSocket } from "@/hooks/useSocket";
import moment from "moment-timezone";
import LoginIcon from "@/assets/images/login.svg";
import COLORS from "@/constants/colors";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import SgCard from "@/components/ui/Card/Card";

export default function EmployeeDashboardScreen() {
    const { user, getRating } = useAuth();
    const { storeData } = useData();
    const [rejectInfoModal, setRejectInfoModal] = useState(false);
    const [rejectInfoData, setRejectInfoData] = useState("");
    const [checkIn, setCheckIn] = useState({});
    const [checkOut, setCheckOut] = useState({});
    const { request } = useApi();
    const { setStoreData } = useData();
    const { socket } = useSocket();
    const { refreshKey } = useLocalSearchParams();
    const { t } = useTranslation();

    useFocusEffect(useCallback(() => {
        request({
            url: `/employee/activity/`, method: 'get',
        }).then(res => {
            setStoreData(prev => ({
                ...prev,
                checkOut: (res?.data || []).find(el => el.type === 2) || { loading: true },
                checkIn: (res?.data || []).find(el => el.type === 1) || { loading: true },
                overTime: (res?.data || []).find(el => el.type === 3) || { loading: true },
                overTimeOut: (res?.data || []).find(el => el.type === 4) || { loading: true },
            }));
        }).catch(err => {
            setStoreData(prev => ({
                ...prev, checkInData: { checkIn: null, checkOut: null }
            }));
        });

        request({
            url: '/employee/project/tasks', method: 'get',
        }).then().catch(err => {});

        getRating();
        return () => {};
    }, [refreshKey]));

    useEffect(() => {
        if (!socket) return;

        const handler = (data) => {
            if (data?.data?.type === 1) {
                setStoreData(prev => ({
                    ...prev,
                    checkIn: data?.data?.status !== 3 ? data?.data : {
                        status: 3, type: 1, reject_reason: data?.data?.reject_reason
                    },
                }));
            } else if (data?.data?.type === 2) {
                setStoreData(prev => ({
                    ...prev,
                    checkIn: data?.data?.status !== 3 ? {} : {
                        ...prev?.checkIn, completed_status: data?.data?.status !== 3 ? 1 : 0,
                    },
                    checkOut: data?.data?.status !== 3 ? {} : {
                        status: 3, type: 2, reject_reason: data?.data?.reject_reason
                    },
                }));
            } else if (data?.data?.type === 3) {
                setStoreData(prev => ({
                    ...prev,
                    overTime: data?.data?.status !== 3 ? data?.data : {
                        status: 3, type: 1, reject_reason: data?.data?.reject_reason
                    },
                }));
            } else if (data?.data?.type === 4) {
                setStoreData(prev => ({
                    ...prev,
                    overTime: {
                        ...prev?.overTime, completed_status: data?.data?.status !== 3 ? 1 : 0,
                    },
                    overTimeOut: data?.data?.status !== 3 ? data?.data : {
                        status: 3, type: 2, reject_reason: data?.data?.reject_reason
                    },
                }));
            }
        };

        socket.on("update_activity", handler);
        return () => {
            socket.off("update_activity", handler);
        };
    }, [socket]);

    function toggleRejectInfoModal(reject_reason) {
        setRejectInfoData(reject_reason || '');
        setRejectInfoModal(!rejectInfoModal);
    }

    useEffect(() => {
        setCheckIn(storeData?.checkIn);
        setCheckOut(storeData?.checkOut);
    }, [storeData?.checkIn, storeData?.checkOut]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return t('goodMorning') || 'Good morning';
        if (hour < 18) return t('goodAfternoon') || 'Good afternoon';
        return t('goodEvening') || 'Good evening';
    };

    const getWorkStatus = () => {
        if (checkIn?.status === 2 && !checkOut?.status) return 'working';
        if (checkOut?.status === 2) return 'completed';
        if (checkIn?.status === 1) return 'pending';
        return 'idle';
    };

    const workStatus = getWorkStatus();

    return (
        <SgTemplateScreen
            head={
                <SgTemplateHeader
                    name={user?.full_name}
                    role={user?.role?.name}
                    position={user?.position}
                    rating={user?.rating}
                    profileImage={''}
                />
            }
        >
            {/* Rejection Alerts */}
            {storeData?.checkIn?.status === 3 && (
                <View style={styles.alertCard}>
                    <View style={styles.alertContent}>
                        <View style={styles.alertIconContainer}>
                            <LoginIcon width={18} height={18} color={COLORS.error_600} />
                        </View>
                        <Text style={styles.alertText}>{t('checkInRejected')}</Text>
                    </View>
                    <Text
                        style={styles.alertButton}
                        onPress={() => toggleRejectInfoModal(storeData?.checkIn?.reject_reason)}
                    >
                        {t('rejectDetail')}
                    </Text>
                </View>
            )}

            {storeData?.checkOut?.status === 3 && (
                <View style={styles.alertCard}>
                    <View style={styles.alertContent}>
                        <View style={styles.alertIconContainer}>
                            <LoginIcon width={18} height={18} color={COLORS.error_600} />
                        </View>
                        <Text style={styles.alertText}>{t('checkOutRejected')}</Text>
                    </View>
                    <Text
                        style={styles.alertButton}
                        onPress={() => toggleRejectInfoModal(storeData?.checkOut?.reject_reason)}
                    >
                        {t('rejectDetail')}
                    </Text>
                </View>
            )}

            {/* Work Time Hero Card */}
            <View style={styles.heroCard}>
                <View style={styles.heroHeader}>
                    <View style={styles.heroIconContainer}>
                        <Clock width={22} height={22} fill={COLORS.white} color={COLORS.white} />
                    </View>
                    <Text style={styles.heroLabel}>{t('workTime')}</Text>
                </View>
                <Text style={styles.heroTime}>
                    {checkOut?.completed_status
                        ? checkIn?.work_time
                        : <SgUtilsTimeDifference startTime={checkIn?.review_time ? checkIn?.review_time : null} />
                    }
                </Text>
                <View style={styles.heroStatus}>
                    <View style={[
                        styles.statusDot,
                        workStatus === 'working' && styles.statusDotActive,
                        workStatus === 'completed' && styles.statusDotCompleted,
                        workStatus === 'pending' && styles.statusDotPending,
                    ]} />
                    <Text style={styles.statusText}>
                        {workStatus === 'working' && (t('currentlyWorking') || 'Currently working')}
                        {workStatus === 'completed' && (t('dayCompleted') || 'Day completed')}
                        {workStatus === 'pending' && (t('waitingApproval') || 'Waiting for approval')}
                        {workStatus === 'idle' && (t('notCheckedIn') || 'Not checked in')}
                    </Text>
                </View>
            </View>

            {/* Check In/Out Cards */}
            <View style={styles.actionsContainer}>
                <SgCheckInOutCard
                    type="checkin"
                    title={t('checkIn')}
                    time={checkIn?.status !== 3 ? (checkIn?.review_time ? moment.tz(checkIn?.review_time, checkIn?.reviewer_timezone).format('HH:mm') : '') : ''}
                    buttonLabel={t('checkIn')}
                    status={checkIn?.status}
                    mapData={{
                        checkIn: {
                            latitude: checkIn?.latitude || 0,
                            longitude: checkIn?.longitude || 0,
                        },
                    }}
                    reviewer={checkIn?.reviewer || {}}
                />
                <SgCheckInOutCard
                    type="checkout"
                    title={t('checkOut')}
                    time={checkOut?.status !== 3 ? (checkOut?.review_time ? moment.tz(checkOut?.review_time, checkOut?.reviewer_timezone).format('HH:mm') : '') : ''}
                    buttonLabel={t('checkOut')}
                    status={checkOut?.status}
                    checkInStatus={checkIn?.status === 2}
                    checkInId={checkIn?.id}
                    mapData={{
                        checkOut: {
                            latitude: checkOut?.latitude || 0,
                            longitude: checkOut?.longitude || 0,
                        },
                    }}
                    reviewer={checkOut?.reviewer || {}}
                />
            </View>

            {/* Reject Info Modal */}
            <SgPopup
                visible={rejectInfoModal}
                onClose={toggleRejectInfoModal}
                icon={<InfoCircleModalIcon width={50} height={50} />}
            >
                <Text style={styles.modalTitle}>{t('rejectDetail')}</Text>
                <SgCard>
                    <Text style={styles.modalContent}>{rejectInfoData}</Text>
                </SgCard>
            </SgPopup>
        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
    // Alert Card
    alertCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.error_50,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.error_100,
    },
    alertContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },
    alertIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: COLORS.error_100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.error_700,
        flex: 1,
    },
    alertButton: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.error_600,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: COLORS.error_100,
        borderRadius: 8,
        overflow: 'hidden',
    },

    // Hero Card
    heroCard: {
        backgroundColor: COLORS.brand_950,
        borderRadius: 24,
        padding: 24,
        shadowColor: COLORS.brand_950,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    heroHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    heroIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: COLORS.brand_800,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroLabel: {
        fontFamily: 'Inter_500Medium',
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.white,
    },
    heroTime: {
        fontFamily: 'Inter_700Bold',
        fontSize: 48,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: -2,
        marginBottom: 16,
    },
    heroStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: COLORS.brand_800,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    statusDotActive: {
        backgroundColor: '#4ADE80',
    },
    statusDotCompleted: {
        backgroundColor: COLORS.brand_300,
    },
    statusDotPending: {
        backgroundColor: '#FBBF24',
    },
    statusText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.white,
    },

    // Actions Container
    actionsContainer: {
        flexDirection: 'row',
        gap: 12,
    },

    // Modal
    modalTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.gray_900,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalContent: {
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        fontWeight: '400',
        color: COLORS.gray_700,
        lineHeight: 22,
    },
});
