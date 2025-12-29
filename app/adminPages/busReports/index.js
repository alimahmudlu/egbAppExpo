import {View, StyleSheet, Text} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useFocusEffect, useLocalSearchParams, useRouter} from "expo-router";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";
import moment from "moment";
import CollapsibleView from "@/components/ui/Collapse/Collapse";
import SgSelect from "@/components/ui/Select/Select";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import SgPopup from "@/components/ui/Modal/Modal";
import SgInput from "@/components/ui/Input/Input";

export default function ProjectItemScreen() {
    const [list, setList] = useState([]);
    const router = useRouter();
    const {request} = useApi();
    const {storeData} = useData();
    const {refreshKey, project_id} = useLocalSearchParams();
    const {t} = useTranslation();
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
    const [filters, setFilters] = useState({})
    const [projectsList, setProjectsList] = useState([]);
    const [reportModal, setReportModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [data, setData] = useState({
        turn1order: 0,
        turn2order: 0,
        date: moment().add(1, 'day').format('YYYY-MM-DD')
    });
    const [errors, setErrors] = useState({});

    function handleChangeReport(e) {
        setData({...data, [e.name]: e.value});
    }

    function toggleReportModal(item = {}) {
        setSelectedRow(item);
        setData({
            countOfBus: item?.bus_count,
            countOfSeatInEveryBus: item?.seat_count,
            projectId: item?.project_id,
            tripTypeId: item?.trip_type,
            toProjectId: item?.to_project_id || item?.project_id,
            campId: item?.camp_id,
            date: item?.date || moment().format('YYYY-MM-DD'),
        })
        setReportModal(!reportModal);
    }

    function deleteReport(item) {
        console.log(item, 'item')
        request({
            method: "delete",
            url: `/admin/bus/report/delete/${item?.id}`,
        }).then(res => {
            getData();
        }).catch(err => {
            console.log(err);
        })
    }

    function handleSubmit() {
        request({
            method: "post",
            url: `/admin/bus/report/edit/${selectedRow?.id}`,
            data: {
                ...data,
                countOfBus: data?.countOfBus || selectedRow?.bus_count,
                countOfSeatInEveryBus: data?.countOfSeatInEveryBus || selectedRow?.seat_count,
                projectId: selectedRow?.project_id,
                tripTypeId: data?.tripType?.id || selectedRow?.trip_type,
                toProjectId: data?.toProject?.id || selectedRow?.to_project_id || selectedRow?.project_id,
                campId: data?.camp?.id || selectedRow?.camp_id,
                date: selectedRow?.date || moment().utc().format('YYYY-MM-DD'),
                turn1employees: selectedRow?.turn1employees || 0,
                turn2employees: selectedRow?.turn2employees || 0
            },
        }).then(res => {
            getData({...filters, project: filters?.project?.id});
            // router.replace(`/adminPages/busReports?project_id=${selectedRow?.project_id}`);
        }).catch(err => {
            console.log(err);
        })
    }


    function getData(_filters) {
        request({
            url: '/admin/bus/projects/history',
            method: 'get',
            params: {
                ..._filters
            }
        }).then(res => {
        }).catch(err => {
            console.log(err);
        })
    }

    function resetFilters() {
        setFilters({});
        setList([]);
    }

    function handleChange(e) {
        setFilters({...filters, [e.name]: e.value});
    }

    function handleFilters() {
        getData({...filters, project: filters?.project?.id});
    }

    useFocusEffect(useCallback(() => {
        // getData();

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
        request({
            url: `/admin/options/projects`, method: 'get',
        }).then(res => {
            // console.log(res, 'ressss')
            if (res.success) {
                setProjectsList(res?.data);
            } else {
                // Handle error response
                // console.log(res.message);
            }
        }).catch(err => {
            // console.log(err, 'errrr');
        })

        return () => {
            setProjects([])
            setList([]);
            console.log('Home tab lost focus');
        };
    }, [refreshKey]));

    useFocusEffect(useCallback(() => {
        if (project_id) {
            setFilters({
                project: (projectsList || []).find(el => el.id === Number(project_id)),
                date: moment().format('YYYY-MM-DD')
            })
            getData({
                project: Number(project_id),
                date: moment().format('YYYY-MM-DD')
            })
        }
    }, [project_id, projectsList]))

    useEffect(() => {
        setList(storeData?.cache?.[`GET:/admin/bus/projects/history`]?.data)
    }, [storeData?.cache?.[`GET:/admin/bus/projects/history`]])

    useEffect(() => {
        setProjects(storeData?.cache?.[`GET:/admin/options/projects`]?.data)
    }, [storeData?.cache?.[`GET:/admin/options/projects`]])

    useEffect(() => {
        setCamps(storeData?.cache?.[`GET:/admin/options/camps`]?.data)
    }, [storeData?.cache?.[`GET:/admin/options/camps`]])


    return (<SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('busReports')
            }}/>}
        >
            <View style={{gap: 16}}>
                <View style={{flex: 1}}>
                    <SgSelect
                        label={t("project")}
                        placeholder={t("enterProject")}
                        modalTitle={t("selectProject")}
                        value={filters?.project}
                        name='project'
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
                <View style={{flex: 1}}>
                    <SgDatePicker
                        label={t('date')}
                        placeholder="dd/mm/yyyy"
                        mode='date'
                        value={filters?.date}
                        name='date'
                        onChangeText={handleChange}
                    />
                </View>
                <View style={{flexDirection: 'row', gap: 12}}>
                    <SgButton
                        onPress={handleFilters}
                        color={COLORS.white}
                        bgColor={COLORS.primary}
                        disabled={!(filters?.project && filters?.date)}
                    >
                        {t('accept')}
                    </SgButton>
                    <SgButton
                        onPress={resetFilters}
                        color={COLORS.white}
                        bgColor={COLORS.primary}

                    >
                        {t('clearFilters')}
                    </SgButton>
                </View>
            </View>
            <View style={{gap: 0}}>
                {(list || []).map((item, index) => {
                    return (
                        <CollapsibleView key={index} title={`${item?.project_name} ${item.date ? `- ${moment(item.date).format('DD/MM/YYYY')}` : ''}`}>
                            <View style={{gap: 12}}>
                                <View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('Date')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{moment(item.date).format('DD/MM/YYYY')}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('Project')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item?.project_name}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('BusCount')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.bus_count}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('SeatCount')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.seat_count}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1stemployeesbus')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.turn1_employee_count}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn2ndemployeesbus')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.turn2_employee_count}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('tripType')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{(tripTypeList || []).find(el => el.id === item?.trip_type)?.name}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('toProject')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{(projects || []).find(el => el.id === item?.to_project_id)?.name}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('Camp')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{(camps || []).find(el => el.id === item?.camp_id)?.name}</Text>
                                    </View>
                                    {/*<View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8}}>*/}
                                    {/*    <Text style={{fontSize: 16, fontWeight: '400'}}>{t('fromProject')}:</Text>*/}
                                    {/*    <Text style={{fontSize: 16, fontWeight: '700'}}>{(projects || []).find(el => el.id === item?.from_project_id)?.name}</Text>*/}
                                    {/*</View>*/}
                                </View>
                                <View>
                                    <View style={{gap: 6, flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <SgButton
                                            bgColor={COLORS.gray_600}
                                            color={COLORS.white}
                                            onPress={() => toggleReportModal(item)}
                                        >
                                            {t('Edit')}
                                        </SgButton>
                                        <SgButton
                                            bgColor={COLORS.error_600}
                                            color={COLORS.white}
                                            onPress={() => deleteReport(item)}
                                        >
                                            {t('Delete')}
                                        </SgButton>
                                    </View>
                                </View>
                            </View>
                        </CollapsibleView>
                    )
                })}
            </View>

        <SgPopup
            visible={reportModal}
            onClose={toggleReportModal}
            title={t('busSchedule__report')}
            description={`${selectedRow?.project_name}`}
            footerButton={

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
                        value={data?.countOfBus || ''}
                        name='countOfBus'
                        onChangeText={handleChangeReport}
                        type='number'
                        // disabled={selectedRow?.report_status}
                    />
                </View>
                <View>
                    <SgInput
                        label={t('countOfSeatInEveryBus')}
                        placeholder={t('countOfSeatInEveryBus')}
                        value={data?.countOfSeatInEveryBus || ''}
                        name='countOfSeatInEveryBus'
                        onChangeText={handleChangeReport}
                        type='number'
                        // disabled={selectedRow?.report_status}
                    />
                </View>

                <View>
                    <SgSelect
                        label={t('tripType')}
                        placeholder={t('tripType')}
                        modalTitle={t('selectTripType')}
                        value={data?.tripType || (tripTypeList || []).find(el => el.id === data?.tripTypeId) || ''}
                        name='tripType'
                        isInvalid={errors?.tripType}
                        onChangeText={handleChangeReport}
                        list={(tripTypeList || [])}
                    />
                </View>

                <View>
                    <SgSelect
                        label={t('Camps')}
                        placeholder={t('Camps')}
                        modalTitle={t('selectCamp')}
                        value={data?.camp || (camps || []).find(el => (el.id === data?.campId)) || ''}
                        name='camp'
                        isInvalid={errors?.camp}
                        onChangeText={handleChangeReport}
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
                        value={data?.toProject || (projects || []).find(el => (el.id === data?.toProjectId)) || ''}
                        name='toProject'
                        isInvalid={errors?.toProject}
                        onChangeText={handleChangeReport}
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
        </SgTemplateScreen>);
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
    }, backButton: {
        padding: 8,
    }, headerTitle: {
        fontSize: 18, fontWeight: 'bold', marginRight: 'auto', marginLeft: 'auto',
    }, overviewButton: {
        paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4,
    }, overviewButtonText: {
        color: '#000000', fontFamily: 'Inter, sans-serif', fontWeight: '500', fontSize: 16, // lineHeight: '24px',
    }, container: {
        flex: 1,
    }, contentText: {
        fontSize: 16,
    }
});
