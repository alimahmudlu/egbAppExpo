import Avatar from "@/assets/images/avatar.png";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgCard from "@/components/ui/Card/Card";
import Clock from "@/assets/images/clock.svg";
import SgCheckInOutCard from "@/components/ui/CheckInOutCard/CheckInOutCard";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import {useAuth} from "@/hooks/useAuth";
import {Alert, StyleSheet, Text, View} from "react-native";
import InfoCircleModalIcon from "@/assets/images/infoCircleModal.svg";
import SgPopup from "@/components/ui/Modal/Modal";
import {useCallback, useEffect, useState} from "react";
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
import SgButton from "@/components/ui/Button/Button";

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

    useFocusEffect(useCallback(() => {
        request({
            url: `/employee/activity/`, method: 'get',
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
            url: '/employee/project/list', method: 'get',
        }).then().catch(err => {
            console.log(err);
        })

        getRating()

        return () => {
            console.log('Home tab lost focus');
        };

    }, [refreshKey]));

    useEffect(() => {
        if (!socket) return;

        const handler = (data) => {
            if (data?.data?.type === 1) {
                console.log('update_activity', data?.data)
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
        setProjectsList(storeData?.cache?.[`GET:/employee/project/list`]?.data)
    }, [storeData?.cache?.[`GET:/employee/project/list`]])

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

            {storeData?.overTime?.status === 3 ? <SgNoticeCard
                icon={<LoginIcon width={20} height={20}/>}
                title={t('checkInRejected')}
                buttonText={t('rejectDetail')}
                onClick={() => toggleRejectInfoModal(storeData?.overTime?.reject_reason)}
                bgCard="danger"
                bgButton="danger"
            /> : null}
            {storeData?.overTimeOut?.status === 3 ? <SgNoticeCard
                icon={<LoginIcon width={20} height={20}/>}
                title={t('checkOutRejected')}
                buttonText={t('rejectDetail')}
                onClick={() => toggleRejectInfoModal(storeData?.overTimeOut?.reject_reason)}
                bgCard="danger"
                bgButton="danger"
            /> : null}

            {/*{(*/}
            {/*    // checkIn?.status === 2 &&*/}
            {/*    // (checkOut?.status && checkOut?.status !== 0) &&*/}
            {/*    // moment.duration(moment().diff(checkIn?.review_time)).asHours() < 24 &&*/}
            {/*    moment(moment(), "HH:mm").isBetween(moment("09:00", "HH:mm"), moment("11:59", "HH:mm"))*/}
            {/*) ?*/}
                <SgCheckInOutGroup>
                    <SgCheckInOutCard
                        type="overTime"
                        title={t('overTime')}
                        time={overTime?.status !== 3 ? (overTime?.review_time ? moment.tz(overTime?.review_time, overTime?.reviewer_timezone).format('HH:mm') : '') : ''}
                        buttonLabel={t('overTime')}
                        status={overTime?.status} // 0: not checked in, 1: waiting, 2: checked in
                        mapData={{
                            overTime: {
                                latitude: overTime?.latitude || 0, longitude: overTime?.longitude || 0,
                            },
                        }}
                        reviewer={overTime?.reviewer || {}}
                    />

                    <SgCheckInOutCard
                        type="overTimeOut"
                        title={t('overTimeOut')}
                        time={checkOut?.status !== 3 ? (overTimeOut?.review_time ? moment.tz(overTimeOut?.review_time, overTimeOut?.reviewer_timezone).format('HH:mm') : '') : ''}
                        buttonLabel={t('overTimeOut')}
                        status={overTimeOut?.status} // 0: not checked in, 1: waiting, 2: checked in
                        checkInStatus={overTime?.status === 2}
                        checkInId={overTime?.id}
                        mapData={{
                            overTimeOut: {
                                latitude: overTimeOut?.latitude || 0, longitude: overTimeOut?.longitude || 0,
                            },
                        }}
                        reviewer={overTimeOut?.reviewer || {}}
                    />
                </SgCheckInOutGroup>
            {/*    : null*/}
            {/*}*/}

            <SgCard
                title={t('workTime')}
                time={checkOut?.completed_status ? checkIn?.work_time : <SgUtilsTimeDifference
                    startTime={overTime?.review_time ? moment(overTime?.review_time).format('') : null}/>}
                icon={Clock}
            />

            {/*<SgCard>
                <Text style={styles.title}>{t('myTasks')}</Text>
            </SgCard>*/}

            {/*<View style={{gap: 12}}>
                {(projectsList || []).map((project, index) => {
                    return (<SgSectionProjectListItem
                            key={index}
                            title={project.name}
                            staffData={(project?.members || []).filter(el => el.status)}
                            id={project.id}
                            href={`/employeePages/projects/${project.id}`}
                        />)
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
