import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import {useAuth} from "@/hooks/useAuth";
import {StyleSheet, View} from "react-native";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import SgNoticeCard from "@/components/ui/NoticeCard/NoticeCard";
import React, {useCallback, useEffect, useState} from "react";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import moment from "moment";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import {useTranslation} from "react-i18next";
import SgCheckInOutCard from "@/components/ui/CheckInOutCard/CheckInOutCard";
import SgCard from "@/components/ui/Card/Card";
import SgUtilsTimeDifference from "@/utils/TimeDifference";
import Clock from "@/assets/images/clock.svg";
import {useSocket} from "@/hooks/useSocket";

export default function EmployeeDashboardScreen() {
    const {user} = useAuth();
    const {storeData, setStoreData} = useData();
    const {request} = useApi();
    const [taskList, setTaskList] = useState([]);
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();
    const {socket} = useSocket()

    useFocusEffect(useCallback(() => {
        request({
            url: `/chief/task/list`, method: 'get'
        }).then().catch(err => {
            // console.log(err);
        })
        return () => {};
    }, [refreshKey]));

    useEffect(() => {
        setTaskList(storeData?.cache?.[`GET:/chief/task/list`]?.data)
    }, [storeData?.cache?.[`GET:/chief/task/list`]])


    const [checkIn, setCheckIn] = useState({});
    const [checkOut, setCheckOut] = useState({});
    const [rejectInfoModal, setRejectInfoModal] = useState(false);
    const [rejectInfoData, setRejectInfoData] = useState("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum");


    useFocusEffect(useCallback(() => {
        request({
            url: `/chief/activity/check`, method: 'get',
        }).then(res => {
            setStoreData(prev => ({
                ...prev, checkOut: (res?.data || []).find(el => el.type === 2) || {
                    loading: true
                }, checkIn: (res?.data || []).find(el => el.type === 1) || {
                    loading: true
                },
            }));
        }).catch(err => {
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

        console.log('socket', socket, 'socket-chief')

        const handler = (data) => {
            console.log(data, 'data-socket')
            if (data?.data?.type === 1) {
                setStoreData(prev => ({
                    ...prev, checkIn: data?.data?.status !== 3 ? data?.data : {
                        status: 2, type: 1, reject_reason: data?.data?.reject_reason
                    },
                }));
            }

            else if (data?.data?.type === 2) {
                setStoreData(prev => ({
                    ...prev,
                    checkIn: data?.data?.status !== 3 ? {} : {
                        ...prev?.checkIn, completed_status: data?.data?.status !== 3 ? 1 : 0,
                    },
                    checkOut: data?.data?.status !== 3 ? {} : {
                        status: 3, type: 2, reject_reason: data?.data?.reject_reason
                    },
                }));
            }
            // else {
            //     setStoreData(prev => ({
            //         ...prev, checkIn: {
            //             ...prev?.checkIn, completed_status: data?.data?.status !== 3 ? 1 : 0,
            //         }, checkOut: data?.data?.status !== 3 ? data?.data : {
            //             status: 3, type: 2, reject_reason: data?.data?.reject_reason
            //         },
            //     }));
            // }
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
            // console.log('activity error')
            setStoreData(prev => ({
                ...prev, checkInData: {
                    checkIn: null, checkOut: null,
                }
            }));
        })

        return () => {
            setCheckIn({})
            setCheckOut({})
        };

    }, [refreshKey]));


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
                    employeeType={'chief'}
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
                    employeeType={'chief'}
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

            <SgCheckInOutGroup>
                <SgSectionInfoCard
                    icon="log-in-outline"
                    title={t('activeTasks')}
                    count={taskList?.length - taskList?.filter(el => el?.status?.id === 5)?.length}
                    type="activeTasks"
                    href={`/chiefPages/tasks/active`}
                />
                <SgSectionInfoCard
                    icon="log-out-outline"
                    title={t('completedTasks')}
                    count={taskList?.filter(el => el?.status?.id === 5)?.length}
                    type="completedTasks"
                    href={`/chiefPages/tasks/completed`}
                />
            </SgCheckInOutGroup>

            <SgNoticeCard
                title={t('check')}
                buttonText={t('addTask')}
                bgButton="success"
                href="/chiefPages/create-task"
            />

        <View style={{gap: 16}}>
            {taskList?.filter(el => [3, 4].includes(el?.status?.id))?.map((el, index) => (
                <SgSectionTaskCard
                    id={el?.id}
                    projectId={el?.project_id}
                    key={index}
                    time={moment(el?.deadline).format('DD.MM.YYYY / h:mm A') || ''}
                    duration={el?.points}
                    title={el?.name}
                    description={el?.description}
                    name={el?.assigned_employee?.full_name}
                    image={null}
                    status={el?.status}
                    href={`/chiefPages/projects/${el?.project_id}/${el?.id}`}
                />))}
        </View>
            {/*<SgFilterTab
                defaultTabId='all'
                tabs={[
                    {label: t('allTasks'), id: 'all', count: taskList?.length},
                    {label: t('check'), id: 'check', count: taskList?.filter(el => [3, 4].includes(el?.status?.id))?.length},
                    // {label: t('complete'), id: 'complete', count: taskList?.filter(el => el?.status?.id === 5)?.length}
                ]}
                tabContent={[
                    {
                        element: (<View style={{gap: 16}}>
                            {taskList?.map((el, index) => (<SgSectionTaskCard
                                    id={el?.id}
                                    projectId={el?.project_id}
                                    key={index}
                                    time={moment(el?.deadline).format('DD.MM.YYYY / h:mm A') || ''}
                                    duration={el?.points}
                                    title={el?.name}
                                    description={el?.description}
                                    name={el?.assigned_employee?.full_name}
                                    image={null}
                                    status={el?.status}
                                    href={`/chiefPages/projects/${el?.project_id}/${el?.id}`}
                                />))}
                        </View>),
                        id: 'all'
                    },
                    {
                        element: (<View style={{gap: 16}}>
                            {taskList?.filter(el => [3, 4].includes(el?.status?.id))?.map((el, index) => (
                                <SgSectionTaskCard
                                    id={el?.id}
                                    projectId={el?.project_id}
                                    key={index}
                                    time={moment(el?.deadline).format('DD.MM.YYYY / h:mm A') || ''}
                                    duration={el?.points}
                                    title={el?.name}
                                    description={el?.description}
                                    name={el?.assigned_employee?.full_name}
                                    image={null}
                                    status={el?.status}
                                    href={`/chiefPages/projects/${el?.project_id}/${el?.id}`}
                                />))}
                        </View>),
                        id: 'check'
                    },
                    // {
                    //     element: (<View style={{gap: 16}}>
                    //         {taskList?.filter(el => el?.status?.id === 5)?.map((el, index) => (<SgSectionTaskCard
                    //                 id={el?.id}
                    //                 projectId={el?.project_id}
                    //                 key={index}
                    //                 time={moment(el?.deadline).format('DD.MM.YYYY / h:mm A') || ''}
                    //                 duration={el?.points}
                    //                 title={el?.name}
                    //                 description={el?.description}
                    //                 name={el?.assigned_employee?.full_name}
                    //                 image={null}
                    //                 status={el?.status}
                    //                 href={`/chiefPages/projects/${el?.project_id}/${el?.id}`}
                    //             />))}
                    //     </View>),
                    //     id: 'complete'
                    // }
                ]}
            />*/}
        </SgTemplateScreen>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff",
    }, title: {
        fontFamily: "Inter", fontSize: 16, fontStyle: "normal", fontWeight: "600", lineHeight: 20,
    },
});
