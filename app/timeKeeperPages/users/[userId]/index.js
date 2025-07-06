import { View, StyleSheet } from 'react-native';
import {useLocalSearchParams} from "expo-router";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import Avatar from "@/assets/images/avatar.png";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import SgCard from "@/components/ui/Card/Card";
import ClockHistory from "@/assets/images/clock-history.svg";
import SgSectionProgressBar from "@/components/sections/ProgressBar/ProgressBar";
import React, {useEffect, useState} from "react";
import {useApi} from "@/hooks/useApi";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useData} from "@/hooks/useData";

export default function TimeKeeperUserScreen() {
    const { userId } = useLocalSearchParams();
    const { request } = useApi();
    const {storeData} = useData();
    const data = [
        { label: '1-2', value: 14, percentage: 90 },
        { label: '3-4', value: 9, percentage: 70 },
        { label: '5-6', value: 7, percentage: 50 },
        { label: '7-8', value: 11, percentage: 80 },
        { label: '9-10', value: 2, percentage: 20 },
    ];

    const [employeeData, setEmployeeData] = useState({});

    useEffect(() => {
        request({
            url: `/timekeeper/employee/details/${userId}`,
            method: 'get',
        }).then().catch(err => {
            console.log(err)
        })
    }, [userId]);


    useEffect(() => {
        setEmployeeData(storeData?.cache?.[`GET:/timekeeper/employee/details/${userId}`]?.data)
    }, [storeData?.cache?.[`GET:/timekeeper/employee/details/${userId}`]])

    return (
        <SgTemplateScreenView
            head={<SgTemplatePageHeader data={{
                header: 'User detail'
            }} />}
        >
            <View>
                <SgSectionUserInfo
                    rating={3.12}
                    name={employeeData?.full_name || ''}
                    role={employeeData?.role?.name || ''}
                    profileImage={''}
                    color="dark"
                    size="md"
                />
            </View>
            <View>
                <SgCheckInOutGroup>
                    <SgSectionInfoCard
                        icon="log-in-outline"
                        title="Total check in"
                        count={employeeData?.check_in_count || 0}
                        type="checkin"
                        href={`/timeKeeperPages/users/${userId}/history/checkIn`}
                    />
                    <SgSectionInfoCard
                        icon="log-out-outline"
                        title="Total check out"
                        count={employeeData?.check_out_count || 0}
                        type="checkout"
                        href={`/timeKeeperPages/users/${userId}/history/checkOut`}
                    />
                </SgCheckInOutGroup>
            </View>
            {/*<View>*/}
            {/*    <SgSectionInfoCard*/}
            {/*        customIcon={ClockHistory}*/}
            {/*        title="Total Work Hours"*/}
            {/*        count='34562h. 12m.'*/}
            {/*        href={`/timeKeeperPages/users/${userId}`}*/}
            {/*    >*/}
            {/*        <View >*/}
            {/*            {data.map((item, index) => (*/}
            {/*                <SgSectionProgressBar*/}
            {/*                    key={index}*/}
            {/*                    label={item.label}*/}
            {/*                    value={item.value}*/}
            {/*                    percentage={item.percentage}*/}
            {/*                />*/}
            {/*            ))}*/}
            {/*        </View>*/}
            {/*    </SgSectionInfoCard>*/}
            {/*</View>*/}
            <View>
                <SgCard
                    title="Average Work Hours"
                    time={employeeData?.work_time_avg || '00:00'}
                />
            </View>
        </SgTemplateScreenView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    overviewButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    overviewButtonText: {
        color: '#000000',
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 16,
        // lineHeight: '24px',
    },
    container: {
        flex: 1,
    },
    contentText: {
        fontSize: 16,
    }
});