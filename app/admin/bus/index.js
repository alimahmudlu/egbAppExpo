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
import SgSelect from "@/components/ui/Select/Select";


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
    const [projects, setProjects] = useState([]);
    const [camps, setCamps] = useState([]);
    const [tripTypeList, setTripTypeList] = useState([
        {
            id: 1,
            name: 'Day Main',
            render: <Text>Day Main</Text>,
        },
        {
            id: 3,
            name: 'Night Main',
            render: <Text>Night Main</Text>,
        },
        {
            id: 2,
            name: 'Additional',
            render: <Text>Additional</Text>,
        },
        {
            id: 5,
            name: 'UFMS',
            render: <Text>UFMS</Text>,
        },
        {
            id: 4,
            name: 'Airport',
            render: <Text>Airport</Text>,
        }
    ]);

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
                tripTypeId: data?.tripType?.id,
                toProjectId: data?.toProject?.id || selectedRow?.project_id,
                campId: data?.camp?.id,
                date: selectedRow?.date || moment().format('YYYY-MM-DD'),
                turn1employees: selectedRow?.turn1employees || 0,
                turn2employees: selectedRow?.turn2employees || 0
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
        }).catch(err => {
            console.log(err);
        })
    }

    useFocusEffect(useCallback(() => {
        getData();

        request({
            url: '/admin/options/projects', method: 'get',
        }).then(res => {
        }).catch(err => {
            console.log(err);
        })

        request({
            url: '/admin/options/camps', method: 'get',
        }).then(res => {
        }).catch(err => {
            console.log(err);
        })

        return () => {
            setProjects([])
            setData({});
            console.log('Home tab lost focus');
        };
    }, [refreshKey]));

    useEffect(() => {
        setToday(storeData?.cache?.[`GET:/admin/bus/projects`]?.data)
    }, [storeData?.cache?.[`GET:/admin/bus/projects`]])

    useEffect(() => {
        setProjects(storeData?.cache?.[`GET:/admin/options/projects`]?.data)
    }, [storeData?.cache?.[`GET:/admin/options/projects`]])

    useEffect(() => {
        setCamps(storeData?.cache?.[`GET:/admin/options/camps`]?.data)
    }, [storeData?.cache?.[`GET:/admin/options/camps`]])

    return (
        <SgTemplateScreen
            head={
                <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
                    <SgSectionFileHead
                        title={t('busSchedule')}
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

                    <View>
                        <SgSelect
                            label={t('tripType')}
                            placeholder={t('tripType')}
                            modalTitle={t('selectTripType')}
                            value={data?.tripType || (tripTypeList || []).find(el => el.id === selectedRow?.report_status?.trip_type)}
                            name='tripType'
                            isInvalid={errors?.tripType}
                            onChangeText={handleChange}
                            list={(tripTypeList || [])}
                        />
                    </View>

                    <View>
                        <SgSelect
                            label={t('Camps')}
                            placeholder={t('Camps')}
                            modalTitle={t('selectCamp')}
                            value={data?.camp || (camps || []).find(el => (el.id === selectedRow?.report_status?.camp_id))}
                            name='camp'
                            isInvalid={errors?.camp}
                            onChangeText={handleChange}
                            list={(camps || []).map(item => ({
                                id: item?.id,
                                name: item?.name,
                                render: <Text>{item?.name}</Text>,
                            }))}
                        />
                    </View>

                    <View>
                        <SgSelect
                            label={t('Project')}
                            placeholder={t('Project')}
                            modalTitle={t('selectProject')}
                            value={data?.toProject || (projects || []).find(el => (el.id === selectedRow?.report_status?.to_project_id || el.id === selectedRow?.project_id))}
                            name='toProject'
                            isInvalid={errors?.toProject}
                            onChangeText={handleChange}
                            list={(projects || []).map(item => ({
                                id: item?.id,
                                name: item?.name,
                                render: <Text>{item?.name}</Text>,
                            }))}
                        />
                    </View>

                    {/*<View>
                        <SgSelect
                            label={t('toProject')}
                            placeholder={t('toProject')}
                            modalTitle={t('selectToProject')}
                            value={data?.toProject || (projects || []).find(el => el.id === selectedRow?.report_status?.to_project_id)}
                            name='toProject'
                            isInvalid={errors?.toProject}
                            onChangeText={handleChange}
                            list={(projects || []).filter(item => item.id !== selectedRow?.project_id)?.map(item => ({
                                id: item?.id,
                                name: item?.name,
                                render: <Text>{item?.name}</Text>,
                            }))}
                        />
                    </View>

                    <View>
                        <SgSelect
                            label={t('fromProject')}
                            placeholder={t('fromProject')}
                            modalTitle={t('selectFromProject')}
                            value={data?.fromProject || (projects || []).find(el => el.id === selectedRow?.report_status?.from_project_id)}
                            name='fromProject'
                            isInvalid={errors?.fromProject}
                            onChangeText={handleChange}
                            list={(projects || []).filter(item => item.id !== selectedRow?.project_id)?.map(item => ({
                                id: item?.id,
                                name: item?.name,
                                render: <Text>{item?.name}</Text>,
                            }))}
                        />
                    </View>*/}
                </View>
            </SgPopup>
        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
})