import Avatar from "@/assets/images/avatar.png";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import {useAuth} from "@/hooks/useAuth";
import {Platform, StyleSheet} from "react-native";
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

export default function EmployeeDashboardScreen() {
    const {user} = useAuth();
    const {request} = useApi();
    const [employeeActivities, setEmployeeActivities] = useState([]);
    const {storeData, insertData} = useData();
    const {socket} = useSocket()
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation()


    useFocusEffect(useCallback(() => {
        request({
            url: '/timekeeper/activity/list', method: 'get',
        }).then(res => {
        }).catch(err => {
            console.log(err, 'apiservice control err')
        });
        return () => {
            console.log('Home tab lost focus');
        };
    }, [refreshKey]));


    useEffect(() => {
        if (!socket) return;

        const handler = (data) => {
            insertData('GET:/timekeeper/activity/list', data?.data)
        };

        // socket.on('connect', () => {
            socket.on("new_activity", handler);
        // })

        return () => {
            socket.off("new_activity", handler);
        };
    }, [socket]);


    useEffect(() => {
        setEmployeeActivities(storeData?.cache?.['GET:/timekeeper/activity/list']?.data)
    }, [storeData?.cache?.['GET:/timekeeper/activity/list']])

    return (<SgTemplateScreen
        head={<SgTemplateHeader
            name={user?.full_name}
            role={user?.role?.name}
            position={user?.position}
            profileImage={''}
        />}
    >
        <SgCheckInOutGroup>
            <SgSectionInfoCard
                icon="log-in-outline"
                title={t('dailyCheckIn')}
                count={employeeActivities?.filter(el => el.type === 1)?.length}
                type="checkin"
            />
            <SgSectionInfoCard
                icon="log-out-outline"
                title={t('dailyCheckOut')}
                count={employeeActivities?.filter(el => el.type === 2)?.length}
                type="checkout"
            />
        </SgCheckInOutGroup>

        <SgFilterTab
            defaultTabId='checkIn'
            tabs={[{
                label: t('checkIn'),
                id: 'checkIn',
                count: employeeActivities?.filter(el => el.type === 1 && el.status === 1)?.length
            }, {
                label: t('checkOut'),
                id: 'checkOut',
                count: employeeActivities?.filter(el => el.type === 2 && el.status === 1)?.length
            }, {
                label: t('atWork'),
                id: 'atWork',
                count: employeeActivities?.filter(el => el.type === 1 && el.status === 2 && el.completed_status === 0)?.length
            },]}
            tabContent={[{
                element: (employeeActivities?.filter(el => el.type === 1 && el.status === 1).map((emp, index) => (
                    <SgSectionEmployeeCard
                        key={index}
                        fullData={emp}
                        title={emp?.employee?.full_name}
                        role={emp?.employee?.role?.name}
                        time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                        image={emp?.employee?.image}
                    />))), id: 'checkIn'
            }, {
                element: (employeeActivities?.filter(el => el.type === 2 && el.status === 1).map((emp, index) => (
                    <SgSectionEmployeeCard
                        key={index}
                        fullData={emp}
                        title={emp?.employee?.full_name}
                        role={emp?.employee?.role?.name}
                        time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                        image={emp?.employee?.image}
                    />))), id: 'checkOut'
            }, {
                element: (employeeActivities?.filter(el => el.type === 1 && el.status === 2 && el.completed_status === 0).map((emp, index) => (
                    <SgSectionEmployeeCard
                        key={index}
                        fullData={emp}
                        title={emp?.employee?.full_name}
                        role={emp?.employee?.role?.name}
                        time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                        image={emp?.employee?.image}
                        editable={false}
                    />))), id: 'atWork'
            },]}
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
