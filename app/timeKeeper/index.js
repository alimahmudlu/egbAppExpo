import Avatar from "@/assets/images/avatar.png";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import {useAuth} from "@/hooks/useAuth";
import {Platform, StyleSheet, Text, View} from "react-native";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import React, {useCallback, useEffect, useState} from "react";
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
import SgInput from "@/components/ui/Input/Input";
import SgSelect from "@/components/ui/Select/Select";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgNoticeCard from "@/components/ui/NoticeCard/NoticeCard";
import FilterIcon from "@/assets/images/filter.svg";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import ReloadArrow from "@/assets/images/reload-arrows.svg";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import SgPopup from "@/components/ui/Modal/Modal";

export default function EmployeeDashboardScreen() {
    const {user} = useAuth();
    const {request} = useApi();
    const [employeeActivitiesCheckIn, setEmployeeActivitiesCheckIn] = useState({});
    const [employeeActivitiesCheckOut, setEmployeeActivitiesCheckOut] = useState({});
    const [employeeActivitiesAtWork, setEmployeeActivitiesAtWork] = useState({});
    const [filters, setFilters] = useState({})
    const {storeData, insertDataWithPagination, insertData, changeAddRowData, setStoreData, updateData} = useData();
    const {socket} = useSocket()
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation()
    const [filterModal, setFilterModal] = useState(false)

    const [activeTab, setActiveTab] = useState('checkIn');
    const [projectsList, setProjectsList] = useState([]);
    const [checkIn, setCheckIn] = useState({});
    const [checkOut, setCheckOut] = useState({});
    const [countData, setCountData] = useState({});
    const [rejectInfoModal, setRejectInfoModal] = useState(false);
    const [rejectInfoData, setRejectInfoData] = useState("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum");

    const [pageAtWork, setPageAtWork] = useState(1);
    const [pageCheckIn, setPageCheckIn] = useState(1);
    const [pageCheckOut, setPageCheckOut] = useState(1);
    const [getDataStatus, setDataStatus] = useState(false)


    function getData(_filters = {}) {
        request({
            url: '/timekeeper/activity/list/checkin',
            method: 'get',
            params: {
                page: pageCheckIn,
                limit: 10,
                ..._filters,
            }
        }).then(res => {
        }).catch(err => {
            // console.log(err, 'apiservice control err')
        });
    }

    function getDataCheckOut(_filters = {}) {
        request({
            url: '/timekeeper/activity/list/checkout',
            method: 'get',
            params: {
                ..._filters,
                page: pageCheckOut,
                limit: 10
            }
        }).then(res => {
        }).catch(err => {
            // console.log(err, 'apiservice control err')
        });
    }

    function getDataAtWork(_filters = {}) {
        request({
            url: '/timekeeper/activity/list/atwork',
            method: 'get',
            params: {
                ..._filters,
                page: pageAtWork,
                limit: 10
            }
        }).then(res => {
        }).catch(err => {
            // console.log(err, 'apiservice control err')
        });
    }

    useEffect(() => {
        if (!socket) return;

        const handler = (data) => {
            if (data?.data?.type === 1) {
                insertDataWithPagination('GET:/timekeeper/activity/list/checkin', data?.data, 1)
                // setEmployeeActivitiesCheckIn((prevState) => ({
                //     ...prevState,
                //     total: prevState.total + 1,
                // }))
            }
            if (data?.data?.type === 2) {
                insertDataWithPagination('GET:/timekeeper/activity/list/checkout', data?.data, 1)
                setEmployeeActivitiesCheckOut((prevState) => ({
                    ...prevState,
                    total: Number(prevState.total || 0) + 1,
                }))
            }

        };
        const handler2 = (data) => {
            // removeRowData('GET:/timekeeper/activity/list', data?.data?.activity_id, 'id')
            // changeAddRowData('GET:/timekeeper/activity/list', {
            //     completed_status: 1
            // }, data?.data?.activity_id, 'id')
            // insertData('GET:/timekeeper/activity/list', {
            //     ...data?.data,
            //     // complete_status: 1,
            //     // confirm_time: moment(),
            //     // timezone: moment.tz.guess(),
            //     // confirm_employee_id: user?.id,
            //     // status: 2
            // })
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
        setEmployeeActivitiesCheckIn((prevState) => {
            if (pageCheckIn === 1) {
                return {
                    ...(storeData?.cache?.[`GET:/timekeeper/activity/list/checkin`]?.data || {})
                }
            } else {
                return {
                    ...(storeData?.cache?.[`GET:/timekeeper/activity/list/checkin`]?.data || {}),
                    data: [...prevState?.data || [], ...((storeData?.cache?.[`GET:/timekeeper/activity/list/checkin`]?.data || {})?.data || [])]
                }
            }
        })
    }, [storeData?.cache?.['GET:/timekeeper/activity/list/checkin']])

    useEffect(() => {
        setEmployeeActivitiesCheckOut((prevState) => {
            if (pageCheckOut === 1) {
                return {
                    ...(storeData?.cache?.[`GET:/timekeeper/activity/list/checkout`]?.data || {})
                }
            } else {
                return {
                    ...(storeData?.cache?.[`GET:/timekeeper/activity/list/checkout`]?.data || {}),
                    data: [...prevState?.data || [], ...((storeData?.cache?.[`GET:/timekeeper/activity/list/checkout`]?.data || {})?.data || [])]
                }
            }
        })
    }, [storeData?.cache?.['GET:/timekeeper/activity/list/checkout']])

    useEffect(() => {
        setEmployeeActivitiesAtWork((prevState) => {
            if (pageAtWork === 1) {
                return {
                    ...(storeData?.cache?.[`GET:/timekeeper/activity/list/atwork`]?.data || {})
                }
            } else {
                return {
                    ...(storeData?.cache?.[`GET:/timekeeper/activity/list/atwork`]?.data || {}),
                    data: [...prevState?.data || [], ...((storeData?.cache?.[`GET:/timekeeper/activity/list/atwork`]?.data || {})?.data || [])]
                }
            }
        })
    }, [storeData?.cache?.['GET:/timekeeper/activity/list/atwork']])

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

        request({
            url: `/timekeeper/options/projects`, method: 'get',
        }).then(res => {
            if (res.success) {
                setProjectsList(res?.data);
            } else {
                // Handle error response
                // console.log(res.message);
            }
        }).catch(err => {
        })

        request({
            url: `/timekeeper/activity/list/count`,
            method: 'get',
            params: {
                start_date: moment().startOf('day').format(),
                end_date: moment().endOf('day').format(),
                project: filters?.project?.id,
                full_name: filters?.full_name
            },
        }).then(res => {
            if (res.success) {
                setCountData(res?.data);
            } else {
                // Handle error response
                // console.log(res.message);
            }
        }).catch(err => {
        })

        getData({...filters, project: (filters?.project || []).map(el => el.id)})
        getDataCheckOut({...filters, project: (filters?.project || []).map(el => el.id)})
        getDataAtWork({...filters, project: (filters?.project || []).map(el => el.id)})

        return () => {
            setProjectsList([])
            setCheckIn({})
            setCheckOut({})

            setPageCheckIn(1)
            setPageCheckOut(1)
            setPageAtWork(1)
            setEmployeeActivitiesCheckIn({data: []})
            setEmployeeActivitiesCheckOut({data: []})
            setEmployeeActivitiesAtWork({data: []})
            updateData(`GET:/timekeeper/activity/list/checkin`, {data: []})
            updateData(`GET:/timekeeper/activity/list/checkout`, {data: []})
            updateData(`GET:/timekeeper/activity/list/atwork`, {data: []})
            setActiveTab('checkIn')
        };

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

    function handleChange(e) {
        setFilters({...filters, [e.name]: e.value});
    }

    function toggleFilterModal() {
        setFilterModal(!filterModal);
    }

    function resetFilters() {
        setFilters({});
    }

    function handleFilters() {
        setDataStatus(!getDataStatus)
        setPageCheckIn(1)
        setPageCheckOut(1)
        setPageAtWork(1)
    }

    useEffect(() => {
        if (pageCheckIn) {
            getData({...filters, project: (filters?.project || []).map(el => el.id)})
        }
    }, [pageCheckIn, getDataStatus])

    useEffect(() => {
        if (pageCheckOut) {
            getDataCheckOut({...filters, project: (filters?.project || []).map(el => el.id)})
        }
    }, [pageCheckOut, getDataStatus])

    useEffect(() => {
        if (pageAtWork) {
            getDataAtWork({...filters, project: (filters?.project || []).map(el => el.id)})
        }
    }, [pageAtWork, getDataStatus])

    useEffect(() => {
        // Alert.alert('checkIn change')
        setCheckIn(storeData?.checkIn)
        setCheckOut(storeData?.checkOut)
    }, [storeData?.checkIn, storeData?.checkOut])

    function handleMoreCheckIn() {
        setPageCheckIn(pageCheckIn + 1);
    }

    function handleMoreCheckOut() {
        setPageCheckOut(pageCheckOut + 1);
    }

    function handleMoreAtWork() {
        setPageAtWork(pageAtWork + 1);
    }

    function removeRowData(fullData, type) {
        setDataStatus(!getDataStatus)
        // setEmployeeActivitiesCheckIn((prevState) => {
        //     const _data = prevState.data;
        //
        //     return {
        //         ...prevState,
        //         data: _data.filter(item => item.employee?.id !== fullData?.employee?.id)
        //     }
        // })
    }

    return (
        <SgTemplateScreen
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
                time={checkOut?.completed_status ?
                    checkIn?.work_time :
                    <SgUtilsTimeDifference
                        startTime={checkIn?.review_time ? moment(checkIn?.review_time).format('') : null}
                    />
                }
                icon={Clock}
            />

            <SgNoticeCard
                title={t('requests')}
                buttonText={<FilterIcon width={20} height={20}/>}
                bgButton="lightSuccess"
                onClick={toggleFilterModal}
            />

            <SgCheckInOutGroup>
                <SgSectionInfoCard
                    icon="log-in-outline"
                    title={t('dailyCheckIn')}
                    // count={(employeeActivitiesCheckIn || {})?.total}
                    count={(countData || {})?.checkin_count || 0}
                    type="checkin"
                    href={`/timeKeeperPages/activity/checkIn`}
                />
                <SgSectionInfoCard
                    icon="log-out-outline"
                    title={t('dailyCheckOut')}
                    // count={(employeeActivitiesCheckOut || {})?.total}
                    count={(countData || {})?.checkout_count || 0}
                    type="checkout"
                    href={`/timeKeeperPages/activity/checkOut`}
                />
            </SgCheckInOutGroup>

            <SgFilterTab
                defaultTabId={activeTab || 'checkIn'}
                tabs={[
                    {
                        label: t('checkIn'),
                        id: 'checkIn',
                        count: (employeeActivitiesCheckIn || {})?.total,
                        onClick: setActiveTab
                    },
                    {
                        label: t('checkOut'),
                        id: 'checkOut',
                        count: (employeeActivitiesCheckOut || {})?.total,
                        onClick: setActiveTab
                    },
                    {
                        label: t('atWork'),
                        id: 'atWork',
                        count: (employeeActivitiesAtWork || {})?.total,
                        onClick: setActiveTab
                    }
                ]}
                tabContent={[
                    {
                        element:
                            <>
                                <View style={{gap: 8}}>
                                    {(((employeeActivitiesCheckIn || {})?.data || [])?.map((emp, index) => {
                                        return (
                                            <SgSectionEmployeeCard
                                                cardType={'checkIn'}
                                                removeRowData={removeRowData}
                                                key={index}
                                                fullData={emp}
                                                title={emp?.employee?.full_name}
                                                role={emp?.employee?.role?.name}
                                                project={emp?.project?.name}
                                                checkType={emp?.is_manual ? t('manual') : t('auto')}
                                                time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                            />
                                        )
                                    }))}
                                    {((employeeActivitiesCheckIn || {})?.total || 0) > pageCheckIn * 10 ?
                                        <View style={{marginTop: 16}}>
                                            <SgButton
                                                onPress={handleMoreCheckIn}
                                                bgColor={COLORS.primary}
                                                color={COLORS.white}
                                            >
                                                {t('loadMore')}
                                            </SgButton>
                                        </View>
                                        : null
                                    }
                                </View>
                            </>
                        , id: 'checkIn'
                    },
                    {
                        element:
                            <>
                                <View style={{gap: 8}}>
                                    {(((employeeActivitiesCheckOut || {})?.data || [])?.map((emp, index) => {
                                        return (
                                            <SgSectionEmployeeCard
                                                cardType={'checkOut'}
                                                removeRowData={removeRowData}
                                                key={index}
                                                fullData={emp}
                                                title={emp?.employee?.full_name}
                                                role={emp?.employee?.role?.name}
                                                project={emp?.project?.name}
                                                checkType={emp?.is_manual ? t('manual') : t('auto')}
                                                time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                            />
                                        )
                                    }))}

                                    {((employeeActivitiesCheckOut || {})?.total || 0) > pageCheckOut * 10 ?
                                        <View style={{marginTop: 16}}>
                                            <SgButton
                                                onPress={handleMoreCheckOut}
                                                bgColor={COLORS.primary}
                                                color={COLORS.white}
                                            >
                                                {t('loadMore')}
                                            </SgButton>
                                        </View>
                                        : null
                                    }
                                </View>
                            </>
                        , id: 'checkOut'
                    },
                    {
                        element:
                            <>
                                <View style={{gap: 8}}>
                                    {(((employeeActivitiesAtWork || {})?.data || [])?.map((emp, index) => {
                                        return (
                                            <SgSectionEmployeeCard
                                                cardType={'atWork'}
                                                removeRowData={removeRowData}
                                                key={index}
                                                fullData={emp}
                                                atWork={true}
                                                title={emp?.employee?.full_name}
                                                role={emp?.employee?.role?.name}
                                                project={emp?.project?.name}
                                                checkType={emp?.is_manual ? t('manual') : t('auto')}
                                                time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                                timeRaw={emp.request_time}
                                                editable={false}
                                            />
                                        )
                                    }))}

                                    {((employeeActivitiesAtWork || {})?.total || 0) > pageAtWork * 10 ?
                                        <View style={{marginTop: 16}}>
                                            <SgButton
                                                onPress={handleMoreAtWork}
                                                bgColor={COLORS.primary}
                                                color={COLORS.white}
                                            >
                                                {t('loadMore')}
                                            </SgButton>
                                        </View>
                                        : null
                                    }
                                </View>
                            </>,
                        id: 'atWork'
                    }
                ]}
            />

            <SgPopup
                visible={filterModal}
                onClose={toggleFilterModal}
                footerButton={
                    <SgButton
                        onPress={handleFilters}
                        bgColor={COLORS.primary}
                        color={COLORS.white}
                    >
                        {t('accept')}
                    </SgButton>
                }
            >
                <View style={{paddingBottom: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 20, fontWeight: 600, lineHeight: 30}}>{t('filters')}</Text>

                        <SgButton
                            onPress={resetFilters}
                            color={COLORS.brand_700}
                            style={{
                                flex: 0,
                                width: 'auto',
                                marginLeft: 'auto',
                                paddingVertical: 0,
                                paddingHorizontal: 0,
                                gap: 7
                            }}

                        >
                            {t('clearFilters')}
                            <ReloadArrow width={20} height={20} style={{marginLeft: 7}}/>
                        </SgButton>
                    </View>

                    <View style={{gap: 16}}>
                        <View style={{flex: 1}}>
                            <SgInput
                                label={t('employeeName')}
                                placeholder={t('employeeName_placeholder')}
                                value={filters?.full_name}
                                name='full_name'
                                onChangeText={handleChange}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <SgSelect
                                label={t("project")}
                                placeholder={t("enterProject")}
                                modalTitle={t("selectProject")}
                                value={filters?.project}
                                name='project'
                                multiple={true}
                                onChangeText={handleChange}
                                list={(projectsList || []).map((project, index) => ({
                                    id: project?.id, name: project?.name, render: <SgSectionProjectListItem
                                        key={index}
                                        title={project.name}
                                        staffData={(project?.members || []).filter(el => el.status)}
                                        id={project.id}
                                    />
                                }))}
                            />
                        </View>
                    </View>
                </View>
            </SgPopup>
        </SgTemplateScreen>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff",
    }, title: {
        fontFamily: "Inter", fontSize: 16, fontStyle: "normal", fontWeight: "600", lineHeight: 20,
    },
});
