import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import {useTranslation} from "react-i18next";
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgInput from "@/components/ui/Input/Input";
import moment from "moment";
import SgPopup from "@/components/ui/Modal/Modal";
import {useApi} from "@/hooks/useApi";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import {useData} from "@/hooks/useData";


export default function ChiefMenuScreen() {
    const {t} = useTranslation();
    const {request} = useApi();
    const {storeData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const [today, setToday] = useState([]);
    const [data, setData] = useState({
        turn1order: 0,
        turn2order: 0,
        date: moment().add(1, 'day').format('YYYY-MM-DD')
    });
    const [reportData, setReportData] = useState({});
    const [errors, setErrors] = useState({});
    const [reportModal, setReportModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    function handleChange(e) {
        setData({...data, [e.name]: e.value});
    }

    function handleChangeReport(e) {
        setReportData({...reportData, [e.name]: e.value});
    }

    function toggleReportModal(item = {}) {
        setSelectedRow(item);
        setReportModal(!reportModal);
    }

    function handleSubmit() {
        request({
            method: "post",
            url: "/admin/bus/report/add",
            data: {
                ...data,
                projectId: selectedRow?.project_id,
                date: selectedRow?.date || moment().format('YYYY-MM-DD'),
                turn1employees: selectedRow?.turn1employees || 0,
                turn2employees: selectedRow?.turn2employees || 0,
            },
        }).then(res => {
            setData({});
            getData();
        }).catch(err => {
            console.log(err);
        })
    }



    function getData() {
        request({
            url: '/admin/bus/projects', method: 'get',
        }).then(res => {
            console.log(res, 'res');
        }).catch(err => {
            console.log(err);
        })
    }

    useFocusEffect(useCallback(() => {
        getData();

        return () => {
            console.log('Home tab lost focus');
        };
    }, [refreshKey]));

    useEffect(() => {
        setToday(storeData?.cache?.[`GET:/admin/bus/projects`]?.data)
    }, [storeData?.cache?.[`GET:/admin/bus/projects`]])

    return (
        <SgTemplateScreen
            head={
                <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
                    <SgSectionFileHead
                        title={t('busSchedule')}
                        description={t('busSchedule__description')}
                        iconText={t('busSchedule__archive')}
                        href={`/adminPages/busReports`}
                    />
                </View>
            }
        >
            <View style={{gap: 32}}>
                <View style={{gap: 16}}>
                    <Text style={{fontSize: 18, fontWeight: 700}}>
                        {t('PROJECTS')}
                    </Text>
                    <View style={{gap: 16}}>
                        {(today || []).map((item, index) => (
                            <View key={index} style={{borderWidth: 1, borderColor: '#eee', padding: 16, borderRadius: 8, gap: 21}}>
                                <Text style={{fontWeight: 700, fontSize: 18}}>{item?.project_name}</Text>
                                <View style={{gap: 8}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee', borderStyle: 'dashed'}}>
                                        <Text style={{fontWeight: 400}}>{t('EmployeesMorningCheckedIn')}: </Text>
                                        <Text style={{fontWeight: 700}}>{item?.turn1employees || 0}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee', borderStyle: 'dashed'}}>
                                        <Text style={{fontWeight: 400}}>{t('EmployeesNightCheckIn')}: </Text>
                                        <Text style={{fontWeight: 700}}>{item?.turn2employees || 0}</Text>
                                    </View>
                                </View>
                                <View>
                                    {item?.report_status ?
                                        <SgButton
                                            bgColor={COLORS.gray_600}
                                            color={COLORS.white}
                                            onPress={() => toggleReportModal(item)}
                                        >
                                            {t('ViewScheduleReport')}
                                        </SgButton>
                                        :
                                        <SgButton
                                            bgColor={COLORS.brand_600}
                                            color={COLORS.white}
                                            onPress={() => toggleReportModal(item)}
                                        >
                                            {t('ScheduleABus')}
                                        </SgButton>
                                    }
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>


            <SgPopup
                visible={reportModal}
                onClose={toggleReportModal}
                title={t('busSchedule__report')}
                description={`${selectedRow?.project_name}`}
                footerButton={
                    selectedRow?.report_status ? null :
                        <SgButton
                            bgColor={COLORS.brand_600}
                            color={COLORS.white}
                            onPress={handleSubmit}
                        >
                            {t('Schedule')}
                        </SgButton>
                }
            >
                <View style={{gap: 16}}>
                    <View>
                        <SgInput
                            label={t('countOfBus')}
                            placeholder={t('countOfBus')}
                            value={data?.countOfBus || selectedRow?.report_status?.bus_count}
                            name='countOfBus'
                            onChangeText={handleChange}
                            type='number'
                            disabled={selectedRow?.report_status}
                        />
                    </View>
                    <View>
                        <SgInput
                            label={t('countOfSeatInEveryBus')}
                            placeholder={t('countOfSeatInEveryBus')}
                            value={data?.countOfSeatInEveryBus || selectedRow?.report_status?.seat_count}
                            name='countOfSeatInEveryBus'
                            onChangeText={handleChange}
                            type='number'
                            disabled={selectedRow?.report_status}
                        />
                    </View>
                </View>
            </SgPopup>
        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
})