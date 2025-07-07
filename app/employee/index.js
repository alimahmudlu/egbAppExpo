import Avatar from "@/assets/images/avatar.png";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
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

export default function EmployeeDashboardScreen() {
    const {user} = useAuth();
    const {storeData} = useData();
    const [rejectInfoModal, setRejectInfoModal] = useState(false);
    const [rejectInfoData, setRejectInfoData] = useState("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum");
    const [projectsList, setProjectsList] = useState([]);
    const [checkIn, setCheckIn] = useState({});
    const [checkOut, setCheckOut] = useState({});
    const {request} = useApi();
    const {setStoreData} = useData();
    const {socket} = useSocket();

    useFocusEffect(useCallback(() => {
        request({
            url: `/employee/activity/`, method: 'get',
        }).then(res => {
            console.log('activity res')
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

        request({
            url: '/employee/project/list', method: 'get',
        }).then().catch(err => {
            console.log(err);
        })
        return () => {
            console.log('Home tab lost focus');
        };
    }, []));

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
        const connectHandler = () => {
            socket.on("update_activity", handler);
        };
        socket.on("connect", connectHandler);

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
        Alert.alert('checkIn change')
        setCheckIn(storeData?.checkIn)
        setCheckOut(storeData?.checkOut)
    }, [storeData?.checkIn, storeData?.checkOut])


    return (<SgTemplateScreenView
            head={<SgTemplateHeader
                name={user?.full_name}
                role={user?.role?.name}
                rating="3.12"
                profileImage={''}
            />}
        >

            {storeData?.checkIn?.status === 3 ? <SgNoticeCard
                icon={<LoginIcon width={20} height={20}/>}
                title="Check in rejected"
                buttonText="Reject detail"
                onClick={() => toggleRejectInfoModal(storeData?.checkIn?.reject_reason)}
                bgCard="danger"
                bgButton="danger"
            /> : null}
            {storeData?.checkOut?.status === 3 ? <SgNoticeCard
                icon={<LoginIcon width={20} height={20}/>}
                title="Check out rejected"
                buttonText="Reject detail"
                onClick={() => toggleRejectInfoModal(storeData?.checkOut?.reject_reason)}
                bgCard="danger"
                bgButton="danger"
            /> : null}
            <SgCheckInOutGroup>
                <SgCheckInOutCard
                    type="checkin"
                    title="Check In"
                    time={checkIn?.status !== 3 ? (checkIn?.review_time ? moment.tz(checkIn?.review_time, checkIn?.reviewer_timezone).format('hh:mm A') : '') : ''}
                    buttonLabel="Check in"
                    status={checkIn?.status} // 0: not checked in, 1: waiting, 2: checked in
                    mapData={{
                        checkIn: {
                            latitude: checkIn?.latitude || 0, longitude: checkIn?.longitude || 0,
                        },
                    }}
                    reviewer={checkIn?.reviewer || {}}
                />
                <SgCheckInOutCard
                    type="checkout"
                    title="Check Out"
                    time={checkOut?.status !== 3 ? (checkOut?.review_time ? moment.tz(checkOut?.review_time, checkOut?.reviewer_timezone).format('hh:mm A') : '') : ''}
                    buttonLabel="Check Out"
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
                title="Work Time"
                time={checkOut?.completed_status ? checkIn?.work_time : <SgUtilsTimeDifference
                    startTime={checkIn?.review_time ? moment(checkIn?.review_time).format('') : null}/>}
                icon={Clock}
            />

            <SgCard>
                <Text style={styles.title}>My tasks</Text>
            </SgCard>

            <View style={{gap: 12}}>
                {(projectsList || []).map((project, index) => {
                    return (<SgSectionProjectListItem
                            key={index}
                            title={project.name}
                            staffData={project?.members || []}
                            id={project.id}
                            href={`/employeePages/projects/${project.id}`}
                        />)
                })}
            </View>
            <SgPopup
                visible={rejectInfoModal}
                onClose={toggleRejectInfoModal}
                icon={<InfoCircleModalIcon width={56} height={56}/>}
            >
                <Text style={styles.rejectModal}>Reject detail</Text>
                <SgCard><Text style={styles.title}>{rejectInfoData}</Text></SgCard>
            </SgPopup>
        </SgTemplateScreenView>);
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
