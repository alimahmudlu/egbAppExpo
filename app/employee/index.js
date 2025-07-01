import Avatar from "@/assets/images/avatar.png";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import SgCard from "@/components/ui/Card/Card";
import Clock from "@/assets/images/clock.svg";
import SgCheckInOutCard from "@/components/ui/CheckInOutCard/CheckInOutCard";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import {useAuth} from "@/hooks/useAuth";
import {StyleSheet, Text, View} from "react-native";
import InfoCircleModalIcon from "@/assets/images/infoCircleModal.svg";
import SgPopup from "@/components/ui/Modal/Modal";
import {useEffect, useState} from "react";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import SgUtilsTimeDifference from "@/utils/TimeDifference";
import {useSocket} from "@/hooks/useSocket";
import moment from "moment-timezone";
import SgNoticeCard from "@/components/ui/NoticeCard/NoticeCard";
import LoginIcon from "@/assets/images/login.svg";
import COLORS from "@/constants/colors";

export default function EmployeeDashboardScreen() {
    const {user} = useAuth();
    const {storeData} = useData();
    const [rejectInfoModal, setRejectInfoModal] = useState(false);
    const [rejectInfoData, setRejectInfoData] = useState("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum");
    const [projectsList, setProjectsList] = useState([]);
    const {request} = useApi();

    function toggleRejectInfoModal(reject_reason) {
        setRejectInfoData(reject_reason || '')
        setRejectInfoModal(!rejectInfoModal);
    }

    useEffect(() => {
        request({
            url: '/employee/project/list',
            method: 'get',
        }).then().catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        setProjectsList(storeData?.cache?.[`GET:/employee/project/list`]?.data)
    }, [storeData?.cache?.[`GET:/employee/project/list`]])


    return (
        <SgTemplateScreenView
            head={
                <SgTemplateHeader
                    name={user?.full_name}
                    role={user?.role?.name}
                    rating="3.12"
                    profileImage={Avatar}
                />
            }
        >

            {storeData?.checkIn?.status === 3 ?
                <SgNoticeCard
                    icon={<LoginIcon width={20} height={20} />}
                    title="Check in rejected"
                    buttonText="Reject detail"
                    onClick={() => toggleRejectInfoModal(storeData?.checkIn?.reject_reason)}
                    bgCard="danger"
                    bgButton="danger"
                />
                : null
            }
            {storeData?.checkOut?.status === 3 ?
                <SgNoticeCard
                    icon={<LoginIcon width={20} height={20} />}
                    title="Check out rejected"
                    buttonText="Reject detail"
                    onClick={() => toggleRejectInfoModal(storeData?.checkOut?.reject_reason)}
                    bgCard="danger"
                    bgButton="danger"
                />
                : null
            }
            <SgCheckInOutGroup>
                <SgCheckInOutCard
                    type="checkin"
                    title="Check In"
                    time={storeData?.checkIn?.status !== 3 ? (storeData?.checkIn?.review_time ? moment.tz(storeData?.checkIn?.review_time, storeData?.checkIn?.reviewer_timezone).format('hh:mm A') : '') : ''}
                    buttonLabel="Check in"
                    status={storeData?.checkIn?.status} // 0: not checked in, 1: waiting, 2: checked in
                    mapData={{
                        checkIn: {
                            latitude: storeData?.checkIn?.latitude || 0,
                            longitude: storeData?.checkIn?.longitude || 0,
                        },
                    }}
                />
                <SgCheckInOutCard
                    type="checkout"
                    title="Check Out"
                    time={storeData?.checkOut?.status !== 3 ? (storeData?.checkOut?.review_time ? moment.tz(storeData?.checkOut?.review_time, storeData?.checkOut?.reviewer_timezone).format('hh:mm A') : '') : ''}
                    buttonLabel="Check Out"
                    status={storeData?.checkOut?.status} // 0: not checked in, 1: waiting, 2: checked in
                    checkInStatus={storeData?.checkIn?.status === 2 }
                    checkInId={storeData?.checkIn?.id}
                    mapData={{
                        checkOut: {
                            latitude: storeData?.checkOut?.latitude || 0,
                            longitude: storeData?.checkOut?.longitude || 0,
                        },
                    }}
                />
            </SgCheckInOutGroup>

            <SgCard
                title="Work Time"
                time={storeData?.checkOut?.completed_status ? storeData?.checkIn?.work_time : <SgUtilsTimeDifference
                    startTime={storeData?.checkIn?.review_time ? moment(storeData?.checkIn?.review_time).format('') : null}/>}
                icon={Clock}
            />

            <SgCard>
                <Text style={styles.title}>Added Projects</Text>
            </SgCard>

            <View style={{gap: 12}}>
                {(projectsList || []).map((project, index) => (
                    <SgSectionProjectListItem
                        key={index}
                        title={project.name}
                        staffImages={project?.members?.map(() => "https://randomuser.me/api/portraits/men/1.jpg")}
                        id={project.id}
                        href={`/employeePages/projects/${project.id}`}
                    />
                ))}
            </View>
            <SgPopup
                visible={rejectInfoModal}
                onClose={toggleRejectInfoModal}
                icon={<InfoCircleModalIcon width={56} height={56}/>}
            >
                <Text style={styles.rejectModal}>Reject detail</Text>
                <SgCard><Text style={styles.title}>{rejectInfoData}</Text></SgCard>
            </SgPopup>
        </SgTemplateScreenView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontFamily: "Inter",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 20,
        color: COLORS.black,
    },
    rejectModal: {
        fontFamily: "Inter",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 30,
        marginBottom: 32,
        textAlign: "center",
    },
});
