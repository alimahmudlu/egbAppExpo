import { View, StyleSheet } from 'react-native';
import {useLocalSearchParams} from "expo-router";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import Avatar from "@/assets/images/avatar.png";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import SgCard from "@/components/ui/Card/Card";
import ClockHistory from "@/assets/images/coins-stacked.svg";
import SgSectionProgressBar from "@/components/sections/ProgressBar/ProgressBar";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import React, {useEffect, useState} from "react";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";

export default function TimeKeeperUserScreen() {
    const { userId } = useLocalSearchParams();
    const { request } = useApi();
    const {storeData} = useData();
    const {t} = useTranslation();
    const data = [
        { label: '1-2', value: 14, percentage: 90 },
        { label: '3-4', value: 9, percentage: 70 },
        { label: '5-6', value: 7, percentage: 50 },
        { label: '7-8', value: 11, percentage: 80 },
        { label: '9-10', value: 2, percentage: 20 },
    ];
    const [employeeData, setEmployeeData] = useState({});
    const {refreshKey} = useLocalSearchParams();

    useEffect(() => {
        request({
            url: `/chief/employee/details/${userId}`,
            method: 'get',
        }).then(res => {
            console.log(res?.data, 'ree')
        }).catch(err => {
            console.log(err, 'err')
        })
    }, [userId, refreshKey]);


    useEffect(() => {
        setEmployeeData(storeData?.cache?.[`GET:/chief/employee/details/${userId}`]?.data)
    }, [storeData?.cache?.[`GET:/chief/employee/details/${userId}`]])

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('userProfile'),
            }} />}
        >
            <View>
                <SgSectionUserInfo
                    rating={3.12}
                    name={employeeData?.full_name || ''}
                    role={employeeData?.role?.name || ''}
                    position={employeeData?.position || ''}
                    color="dark"
                    size="md"
                />
            </View>
            <View style={{gap: 12}}>
                <SgCheckInOutGroup>
                    <SgSectionInfoCard
                        title={t("activeTasks")}
                        count={employeeData?.active_task_count}
                        type="activeTasks"
                        href={`/chiefPages/users/${userId}/tasks/active`}
                    />
                    <SgSectionInfoCard
                        title={t("completedTasks")}
                        count={employeeData?.completed_task_count}
                        type="completedTasks"
                        href={`/chiefPages/users/${userId}/tasks/completed`}
                    />
                </SgCheckInOutGroup>
                <SgCheckInOutGroup>
                    <SgSectionInfoCard
                        title={t("allEarnedPoints")}
                        count={employeeData?.points_sum}
                        type="earnedPoints"
                        href={null}
                    />
                    <SgSectionInfoCard
                        title={t("averageEarnedPoints")}
                        count={employeeData?.points_avg ? Number(employeeData?.points_avg).toFixed(2) : 0}
                        type="averageEarnedPoints"
                        href={null}
                    />
                </SgCheckInOutGroup>
            </View>
            {/*<View>*/}
            {/*    <SgSectionInfoCard*/}
            {/*        customIcon={ClockHistory}*/}
            {/*        title="Score range won"*/}
            {/*        count='673'*/}
            {/*        href={`/chiefPages/users/${userId}`}*/}
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
                    title={t("averageWorkHours")}
                    time={employeeData?.work_time_avg || '00:00'}
                />
            </View>
        </SgTemplateScreen>
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