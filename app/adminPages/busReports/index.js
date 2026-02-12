import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
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
            name: 'Bus Main Day',
            render: <Text>Bus Main Day</Text>,
        },
        {
            id: 3,
            name: 'Bus Main Night',
            render: <Text>Bus Main Night</Text>,
        },
        {
            id: 2,
            name: 'Bus Additional',
            render: <Text>Bus Additional</Text>,
        },
        {
            id: 4,
            name: 'Transit Main Day',
            render: <Text>Transit Main Day</Text>,
        },
        {
            id: 5,
            name: 'Transit Main Night',
            render: <Text>Transit Main Night</Text>,
        },
        {
            id: 6,
            name: 'Transit Additional',
            render: <Text>Transit Additional</Text>,
        },
        {
            id: 7,
            name: 'FMS',
            render: <Text>FMS</Text>,
        },
        {
            id: 8,
            name: 'Airport',
            render: <Text>Airport</Text>,
        },
        {
            id: 9,
            name: 'EGB buses',
            render: <Text>EGB buses</Text>,
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
            toProjectId: item?.to_project_ids || [],
            campId: item?.camp_ids,
            date: item?.date || moment().format('YYYY-MM-DD'),
            otherCamps: item?.othercamps || []
        })
        setReportModal(!reportModal);
    }

    function deleteReport(item) {
        request({
            method: "delete",
            url: `/admin/bus/report/delete/${item?.id}`,
        }).then(res => {
            getData({...filters, project: filters?.project?.id})
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
                toProjectId: data?.toProjectId?.map(el => el.id),
                campId: data?.campId?.map(el => el.id),
                date: selectedRow?.date || moment().utc().format('YYYY-MM-DD'),
                turn1employees: selectedRow?.turn1employees || 0,
                turn2employees: selectedRow?.turn2employees || 0,
                otherCamps: data?.otherCamps || []
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


    const addOtherCamp = () => {
        const currentOthers = data?.otherCamps || [];

        handleChangeReport({
            name: 'otherCamps',
            value: [...currentOthers, ""]
        });
    };

    const removeOtherCamp = (index) => {
        const currentOthers = [...(data?.otherCamps || [])];
        currentOthers.splice(index, 1);
        handleChangeReport({
            name: 'otherCamps',
            value: currentOthers
        });
    };

    const handleOtherCampChange = (index, text) => {
        const currentOthers = [...(data?.otherCamps || [])];
        currentOthers[index] = text.value;

        console.log({
            name: 'otherCamps',
            value: currentOthers
        })

        handleChangeReport({
            name: 'otherCamps',
            value: currentOthers
        });
    };


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
                                        <View style={{gap: 4}}>
                                            {item?.to_project_ids?.map((el, i) => (<View key={i}><Text style={{textAlign: 'right',fontSize: 12, fontWeight: '700'}}>{el.name}</Text></View>))}
                                        </View>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('Camp')}:</Text>
                                        <View style={{gap: 4}}>
                                            {item?.camp_ids?.map((el, i) => (<View key={i}><Text style={{textAlign: 'right',fontSize: 12, fontWeight: '700'}}>{el.name}</Text></View>))}
                                        </View>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('otherCamps')}:</Text>
                                        <View style={{gap: 4}}>
                                            {item?.othercamps?.map((el, i) => (<View key={i}><Text style={{textAlign: 'right',fontSize: 12, fontWeight: '700'}}>{el}</Text></View>))}
                                        </View>
                                    </View>
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
                        value={data?.campId || []}
                        name='campId'
                        multiple={true}
                        isInvalid={errors?.campId}
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
                        value={data?.toProjectId || []}
                        name='toProjectId'
                        multiple={true}
                        isInvalid={errors?.toProjectId}
                        onChangeText={handleChangeReport}
                        list={(projects || []).map(item => ({
                            id: item?.id,
                            name: item?.name,
                            render: <Text>{item?.name}</Text>,
                        }))}
                    />
                </View>

                <TouchableOpacity
                    onPress={addOtherCamp}
                    style={styles.checkboxContainer}
                >
                    <Text style={styles.checkboxLabel}>
                        + {t('addOtherCamp')}
                    </Text>
                </TouchableOpacity>

                {(data?.otherCamps || []).map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <View style={{ flex: 1 }}>
                            <SgInput
                                label={`${t('otherCamp')} ${index + 1}`}
                                placeholder={t('enterCampName')}
                                value={item}
                                onChangeText={(text) => handleOtherCampChange(index, text)}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => removeOtherCamp(index)}
                            style={{ marginTop: 25, padding: 8 }}
                        >
                            <Text style={{ color: 'red', fontSize: 24, fontWeight: 'bold' }}>−</Text>
                        </TouchableOpacity>
                    </View>
                ))}
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
    },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.gray_200,
    },
    checkboxLabel: {
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 20,
        color: COLORS.gray_800
    },
});