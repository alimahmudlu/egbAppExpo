import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgCard from "@/components/ui/Card/Card";
import Clock from "@/assets/images/clock.svg";
import SgCheckInOutCard from "@/components/ui/CheckInOutCard/CheckInOutCard";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import {useAuth} from "@/hooks/useAuth";
import {StyleSheet, Text, View} from "react-native";
import InfoCircleModalIcon from "@/assets/images/infoCircleModal.svg";
import SgPopup from "@/components/ui/Modal/Modal";
import React, {useCallback, useEffect, useState} from "react";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import SgUtilsTimeDifference from "@/utils/TimeDifference";
import {useSocket} from "@/hooks/useSocket";
import moment from "moment-timezone";
import SgNoticeCard from "@/components/ui/NoticeCard/NoticeCard";
import LoginIcon from "@/assets/images/login.svg";
import COLORS from "@/constants/colors";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import {useTranslation} from "react-i18next";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import SgButton from "@/components/ui/Button/Button";
import ReloadArrow from "@/assets/images/reload-arrows.svg";
import SgInput from "@/components/ui/Input/Input";
import SgSelect from "@/components/ui/Select/Select";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";

export default function EmployeeDashboardScreen() {
    const {user, getRating} = useAuth();
    const {storeData} = useData();
    const [rejectInfoModal, setRejectInfoModal] = useState(false);
    const [rejectInfoData, setRejectInfoData] = useState("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum");
    const [projectsList, setProjectsList] = useState([]);
    const [checkIn, setCheckIn] = useState({});
    const [checkOut, setCheckOut] = useState({});
    const [overTime, setOverTime] = useState({});
    const [overTimeOut, setOverTimeOut] = useState({});
    const {request} = useApi();
    const {setStoreData} = useData();
    const {socket} = useSocket();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation()
    const [filters, setFilters] = useState({})
    const [filterModal, setFilterModal] = useState(false)
    const [getDataStatus, setDataStatus] = useState(false)
    const [taskList, setTaskList] = useState([]);


    function toggleFilterModal() {
        setFilterModal(!filterModal);
    }

    function handleChange(e) {
        setFilters({...filters, [e.name]: e.value});
    }

    function resetFilters() {
        setFilters({});
    }

    function handleFilters() {
        setDataStatus(!getDataStatus)
    }

    useFocusEffect(useCallback(() => {
        request({
            url: `/admin/activity/`, method: 'get',
        }).then(res => {
            setStoreData(prev => ({
                ...prev,
                checkOut: (res?.data || []).find(el => el.type === 2) || {
                    loading: true
                },
                checkIn: (res?.data || []).find(el => el.type === 1) || {
                    loading: true
                },
                overTime: (res?.data || []).find(el => el.type === 3) || {
                    loading: true
                },
                overTimeOut: (res?.data || []).find(el => el.type === 4) || {
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

        request({
            url: '/employee/project/tasks', method: 'get',
        }).then().catch(err => {
            // console.log(err);
        })

        getRating()

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
            }
            else if (data?.data?.type === 2) {
                setStoreData(prev => ({
                    ...prev,
                    checkIn: {
                        ...prev?.checkIn, completed_status: data?.data?.status !== 3 ? 1 : 0,
                    },
                    checkOut: data?.data?.status !== 3 ? data?.data : {
                        status: 3, type: 2, reject_reason: data?.data?.reject_reason
                    },
                }));
            }
            else if (data?.data?.type === 3) {
                setStoreData(prev => ({
                    ...prev,
                    overTime: data?.data?.status !== 3 ? data?.data : {
                        status: 3, type: 1, reject_reason: data?.data?.reject_reason
                    },
                }));
            }
            else if (data?.data?.type === 4) {
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
        setTaskList(storeData?.cache?.[`GET:/employee/project/tasks`]?.data)
    }, [storeData?.cache?.[`GET:/employee/project/tasks`]])

    useEffect(() => {
        // Alert.alert('checkIn change')
        setCheckIn(storeData?.checkIn)
        setCheckOut(storeData?.checkOut)
        setOverTime(storeData?.overTime)
        setOverTimeOut(storeData?.overTimeOut)
    }, [storeData?.checkIn, storeData?.checkOut, storeData?.overTime, storeData?.overTimeOut])


    return (<SgTemplateScreen
        head={<SgTemplateHeader
            name={user?.full_name}
            role={user?.role?.name}
            position={user?.position}
            rating={user?.rating}
            profileImage={''}
        />}
    >

        {storeData?.checkIn?.status === 3 ? <SgNoticeCard
            icon={<LoginIcon width={20} height={20}/>}
            title={t('checkInRejected')}
            buttonText={t('rejectDetail')}
            onClick={() => toggleRejectInfoModal(storeData?.checkIn?.reject_reason)}
            bgCard="danger"
            bgButton="danger"
        /> : null}
        {storeData?.checkOut?.status === 3 ? <SgNoticeCard
            icon={<LoginIcon width={20} height={20}/>}
            title={t('checkOutRejected')}
            buttonText={t('rejectDetail')}
            onClick={() => toggleRejectInfoModal(storeData?.checkOut?.reject_reason)}
            bgCard="danger"
            bgButton="danger"
        /> : null}
        <SgCheckInOutGroup>
            <SgCheckInOutCard
                employeeType={'admin'}
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
                employeeType={'admin'}
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

        {/*<SgCard>
            <Text style={styles.title}>{t('myTasks')}</Text>
        </SgCard>*/}
        {/*<SgNoticeCard
            title={<Text style={styles.title}>{t('myTasks')}</Text>}
            buttonText={<FilterIcon width={20} height={20}/>}
            bgButton="lightSuccess"
            onClick={toggleFilterModal}
        />*/}

        {/*<View style={{gap: 12}}>
            {(taskList || []).map((el, index) => {
                return (
                    <SgSectionTaskCard
                        id={el?.id}
                        projectId={el?.project_id}
                        key={index}
                        time={el?.deadline ? moment(el?.deadline).format('') : ''}
                        duration={el?.points}
                        title={el?.name}
                        description={el?.description}
                        name={el?.reporter_employee?.full_name}
                        image={null}
                        status={el?.status}
                        href={`/employeePages/projects/${el?.project_id}/${el?.id}`}
                    />
                )
            })}
        </View>*/}

        <SgPopup
            visible={rejectInfoModal}
            onClose={toggleRejectInfoModal}
            icon={<InfoCircleModalIcon width={50} height={50}/>}
        >
            <Text style={styles.rejectModal}>{t('rejectDetail')}</Text>
            <SgCard><Text style={styles.title}>{rejectInfoData}</Text></SgCard>
        </SgPopup>

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

        <SgPopup
            visible={rejectInfoModal}
            onClose={toggleRejectInfoModal}
            icon={<InfoCircleModalIcon width={50} height={50}/>}
        >
            <Text style={styles.rejectModal}>{t('rejectDetail')}</Text>
            <SgCard><Text style={styles.title}>{rejectInfoData}</Text></SgCard>
        </SgPopup>
    </SgTemplateScreen>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff",
    }, title: {
        fontFamily: "Inter", fontSize: 16, fontStyle: "normal", fontWeight: "600", lineHeight: 20, color: COLORS.black,
    }, rejectModal: {
        fontFamily: "Inter",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 30,
        marginBottom: 32,
        textAlign: "center",
    },
});
