import Avatar from "@/assets/images/avatar.png";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import {useAuth} from "@/hooks/useAuth";
import {Platform, StyleSheet, Text} from "react-native";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import {useCallback, useEffect, useState} from "react";
import moment from "moment";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useSocket} from "@/hooks/useSocket";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import {useTranslation} from "react-i18next";
import SgCheckInOutCard from "@/components/ui/CheckInOutCard/CheckInOutCard";
import SgCard from "@/components/ui/Card/Card";
import SgUtilsTimeDifference from "@/utils/TimeDifference";
import Clock from "@/assets/images/clock.svg";

export default function EmployeeDashboardScreen() {
    const {user} = useAuth();
    const {request} = useApi();
    const [employeeActivities, setEmployeeActivities] = useState([]);
    const {storeData, insertData, removeRowData, changeAddRowData, setStoreData} = useData();
    const {socket} = useSocket()
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation()




    useFocusEffect(useCallback(() => {
        request({
            url: '/timekeeper/activity/list', method: 'get'
        }).then(res => {
        }).catch(err => {
            console.log(err, 'apiservice control err')
        });

        /*request({
            url: `/timekeeper/activity/checkin`,
            method: 'get',
            params: {start_date: moment().startOf('day').format(), end_date: moment().endOf('day').format()},
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });

        request({
            url: `/timekeeper/activity/checkout`,
            method: 'get',
            params: {start_date: moment().startOf('day').format(), end_date: moment().endOf('day').format()},
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });*/


        return () => {};
    }, [refreshKey]));


    useEffect(() => {
        if (!socket) return;

        const handler = (data) => {
            insertData('GET:/timekeeper/activity/list', data?.data)
        };
        const handler2 = (data) => {
            console.log('update_activity', data?.data)
            // removeRowData('GET:/timekeeper/activity/list', data?.data?.activity_id, 'id')
            changeAddRowData('GET:/timekeeper/activity/list', {
                completed_status: 1
            }, data?.data?.activity_id, 'id')
            insertData('GET:/timekeeper/activity/list', {
                ...data?.data,
                // complete_status: 1,
                // confirm_time: moment(),
                // timezone: moment.tz.guess(),
                // confirm_employee_id: user?.id,
                // status: 2
            })
        };

        // socket.on('connect', () => {
        socket.on("new_activity", handler);
        socket.on("update_activity", handler2);
        // })

        return () => {
            socket.off("new_activity", handler);
            socket.off("update_activity", handler2);
        };
    }, [socket]);


    useEffect(() => {
        setEmployeeActivities(storeData?.cache?.['GET:/timekeeper/activity/list']?.data)
    }, [storeData?.cache?.['GET:/timekeeper/activity/list']])


    const [checkIn, setCheckIn] = useState({});
    const [checkOut, setCheckOut] = useState({});
    const [rejectInfoModal, setRejectInfoModal] = useState(false);
    const [rejectInfoData, setRejectInfoData] = useState("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum");


    useFocusEffect(useCallback(() => {
        request({
            url: `/employee/activity/`, method: 'get',
        }).then(res => {
            setStoreData(prev => ({
                ...prev, checkOut: (res?.data || []).find(el => el.type === 2) || {
                    loading: true
                }, checkIn: (res?.data || []).find(el => el.type === 1) || {
                    loading: true
                },
            }));
        }).catch(err => {
            console.log('activity error')
            setStoreData(prev => ({
                ...prev, checkInData: {
                    checkIn: null, checkOut: null,
                }
            }));
        })

        return () => {};

    }, [refreshKey]));

    useEffect(() => {
        if (!socket) return;

        const handler = (data) => {
            if (data?.data?.type === 1) {
                setStoreData(prev => ({
                    ...prev, checkIn: data?.data?.status !== 3 ? data?.data : {
                        status: 2, type: 1, reject_reason: data?.data?.reject_reason
                    },
                }));
            } else {
                setStoreData(prev => ({
                    ...prev, checkIn: {
                        ...prev?.checkIn, completed_status: data?.data?.status !== 3 ? 1 : 0,
                    }, checkOut: data?.data?.status !== 3 ? data?.data : {
                        status: 3, type: 2, reject_reason: data?.data?.reject_reason
                    },
                }));
            }
        };

        // socket.on('connect', () => {
        socket.on("update_activity", handler);
        // })

        return () => {
            socket.off("update_activity", handler);
        };
    }, [socket]);

    function toggleRejectInfoModal(reject_reason) {
        setRejectInfoData(reject_reason || '')
        setRejectInfoModal(!rejectInfoModal);
    }

    useEffect(() => {
        // Alert.alert('checkIn change')
        setCheckIn(storeData?.checkIn)
        setCheckOut(storeData?.checkOut)
    }, [storeData?.checkIn, storeData?.checkOut])

    return (<SgTemplateScreen
        head={<SgTemplateHeader
            name={user?.full_name}
            role={user?.role?.name}
            position={user?.position}
            profileImage={''}
        />}
    >

        <SgCheckInOutGroup>
            <SgCheckInOutCard
                employeeType={'timekeeper'}
                type="checkin"
                title={t('checkIn')}
                time={checkIn?.status !== 3 ? (checkIn?.review_time ? moment.tz(checkIn?.review_time, checkIn?.reviewer_timezone).format('HH:mm') : '') : ''}
                buttonLabel={t('checkIn')}
                status={checkIn?.status} // 0: not checked in, 1: waiting, 2: checked in
                mapData={{
                    checkIn: {
                        latitude: checkIn?.latitude || 0, longitude: checkIn?.longitude || 0,
                    },
                }}
                reviewer={checkIn?.reviewer || {}}
            />
            <SgCheckInOutCard
                employeeType={'timekeeper'}
                type="checkout"
                title={t('checkOut')}
                time={checkOut?.status !== 3 ? (checkOut?.review_time ? moment.tz(checkOut?.review_time, checkOut?.reviewer_timezone).format('HH:mm') : '') : ''}
                buttonLabel={t('checkOut')}
                status={checkOut?.status} // 0: not checked in, 1: waiting, 2: checked in
                checkInStatus={checkIn?.status === 2}
                checkInId={checkIn?.id}
                mapData={{
                    checkOut: {
                        latitude: checkOut?.latitude || 0, longitude: checkOut?.longitude || 0,
                    },
                }}
                reviewer={checkOut?.reviewer || {}}
            />
        </SgCheckInOutGroup>

        <SgCard
            title={t('workTime')}
            time={checkOut?.completed_status ? checkIn?.work_time : <SgUtilsTimeDifference
                startTime={checkIn?.review_time ? moment(checkIn?.review_time).format('') : null}/>}
            icon={Clock}
        />

        <SgCard>
            <Text style={styles.title}>{t('requests')}</Text>
        </SgCard>

        <SgCheckInOutGroup>
            <SgSectionInfoCard
                icon="log-in-outline"
                title={t('dailyCheckIn')}
                count={employeeActivities?.filter(el => el.type === 1 && moment().startOf('day').isBefore(el.review_time))?.length}
                type="checkin"
                href={`/timeKeeperPages/activity/checkIn`}
            />
            <SgSectionInfoCard
                icon="log-out-outline"
                title={t('dailyCheckOut')}
                count={employeeActivities?.filter(el => el.type === 2 && moment().startOf('day').isBefore(el.review_time))?.length}
                type="checkout"
                href={`/timeKeeperPages/activity/checkOut`}
            />
        </SgCheckInOutGroup>

        <SgFilterTab
            defaultTabId='checkIn'
            tabs={[
                {
                    label: t('checkIn'),
                    id: 'checkIn',
                    count: employeeActivities?.filter(el => el.type === 1 && el.status === 1)?.length
                },
                {
                    label: t('checkOut'),
                    id: 'checkOut',
                    count: employeeActivities?.filter(el => el.type === 2 && el.status === 1 && el.completed_status === 0)?.length
                },
                {
                    label: t('atWork'),
                    id: 'atWork',
                    count: employeeActivities?.filter(el => (el.type === 1 && el.status === 2 && el.completed_status === 0) && !employeeActivities.find(el2 => el.employee?.full_name === el2?.employee?.full_name && el2.type === 2 && el2.status === 1))?.length
                }
            ]}
            tabContent={[
                {
                    element: (employeeActivities?.filter(el => el.type === 1 && el.status === 1).map((emp, index) => (
                        <SgSectionEmployeeCard
                            key={index}
                            fullData={emp}
                            title={emp?.employee?.full_name}
                            role={emp?.employee?.role?.name}
                            project={emp?.project?.name}
                            checkType={emp?.employee?.manual ? t('manual') : t('auto')}
                            time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                            image={emp?.employee?.image}
                        />))), id: 'checkIn'
                },
                {
                    element: (employeeActivities?.filter(el => el.type === 2 && el.status === 1 && el.completed_status === 0).map((emp, index) => (
                        <SgSectionEmployeeCard
                            key={index}
                            fullData={emp}
                            title={emp?.employee?.full_name}
                            role={emp?.employee?.role?.name}
                            project={emp?.project?.name}
                            checkType={emp?.employee?.manual ? t('manual') : t('auto')}
                            time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                            image={emp?.employee?.image}
                        />))), id: 'checkOut'
                },
                {
                    element:
                        (employeeActivities?.filter(el => (el.type === 1 && el.status === 2 && el.completed_status === 0) && !employeeActivities.find(el2 => el.employee?.full_name === el2?.employee?.full_name && el2.type === 2 && el2.status === 1)).map((emp, index) => (
                        <SgSectionEmployeeCard
                            key={index}
                            fullData={emp}
                            atWork={emp.type === 1 && emp.status === 2 && emp.completed_status === 0}
                            title={emp?.employee?.full_name}
                            role={emp?.employee?.role?.name}
                            project={emp?.project?.name}
                            checkType={emp?.employee?.manual ? t('manual') : t('auto')}
                            time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                            timeRaw={emp.request_time}
                            image={emp?.employee?.image}
                            editable={false}
                        />))), id: 'atWork'
                }
            ]}
        />
    </SgTemplateScreen>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff",
    }, title: {
        fontFamily: "Inter", fontSize: 16, fontStyle: "normal", fontWeight: "600", lineHeight: 20,
    },
});
