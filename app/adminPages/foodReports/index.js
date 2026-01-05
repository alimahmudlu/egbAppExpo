import {View, StyleSheet, Text, Pressable} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";
import moment from "moment";
import CollapsibleView from "@/components/ui/Collapse/Collapse";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import SgInput from "@/components/ui/Input/Input";
import SgPopup from "@/components/ui/Modal/Modal";
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import ReloadArrow from "@/assets/images/reload-arrows.svg";
import SgSelect from "@/components/ui/Select/Select";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import FilterIcon from "@/assets/images/filter.svg";

export default function ProjectItemScreen() {
    const [list, setList] = useState([]);
    const {request} = useApi();
    const {storeData, updateData} = useData();
    const {refreshKey, project_id} = useLocalSearchParams();
    const {t} = useTranslation();

    const [reportData, setReportData] = useState({});
    const [errors, setErrors] = useState({});
    const [reportModal, setReportModal] = useState(false);
    const [filterModal, setFilterModal] = useState(false)
    const [filters, setFilters] = useState({})
    const [projectsList, setProjectsList] = useState([]);

    const title = {
        1: t('Breakfast'),
        2: t('Lunch'),
        3: t('Dinner'),
        4: t('NightLunch'),
        5: t('ExtraBread'),
        6: t('ExtraKefir'),
        7: t('ExtraSugar'),
        8: t('ExtraTea')
    }

    function handleChangeReport(e) {
        setReportData({...reportData, [e.name]: e.value});
    }

    function toggleReportModal(e, _data = {}) {
        setReportData(_data);
        setReportModal(!reportModal);
    }

    function handleSubmit() {
        const _data = {
            ...reportData,
            rest: reportData.order - reportData.real < 0 ? 0 : reportData.order - reportData.real,
            missing: reportData.order - reportData.real > 0 ? 0 : (reportData.order - reportData.real) * -1,
        }

        request({
            url: `/admin/food/report/edit/${reportData?.id}`, method: 'post', data: _data
        }).then(res => {
            getData({...filters, project: filters?.project?.id});
        }).catch(err => {
            console.log(err);
        })
    }

    function getData(_filters) {
        request({
            url: '/admin/food/report/list', method: 'get',
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
        // getData({...filters, project: filters?.project?.id});

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
            setProjectsList([])
            setList([])
            updateData(`GET:/admin/food/report/list`, {data: []})
            updateData(`GET:/admin/options/projects`, {data: []})
        };
    }, [refreshKey]));

    useFocusEffect(useCallback(() => {
        if (project_id) {
            setFilters({
                project: (projectsList || []).find(el => el.id === Number(project_id)),
                date: moment().tz("Europe/Moscow").format('YYYY-MM-DD')
            })
            getData({
                project: Number(project_id),
                date: moment().tz("Europe/Moscow").format('YYYY-MM-DD')
            })
        }
    }, [project_id, projectsList]))

    useEffect(() => {
        setList(storeData?.cache?.[`GET:/admin/food/report/list`]?.data)
    }, [storeData?.cache?.[`GET:/admin/food/report/list`]])

    function toggleFilterModal() {
        setFilterModal(!filterModal);
    }


    return (<SgTemplateScreen
            head={
                <SgTemplatePageHeader data={{
                    header: t('foodReports')
                }}
                /*filter={
                    <Pressable style={styles.iconWrapper} onPress={toggleFilterModal}>
                        <Text><FilterIcon width={20} height={20} /></Text>
                    </Pressable>}*/
                />
            }
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
            <View style={{gap: 12}}>
                {(list || []).map((item, index) => {
                    return (
                        <CollapsibleView key={index} title={`${item.date ? moment(item.date).format('DD/MM/YYYY') : ''} - ${title?.[item?.type]}`}>
                            <View style={{gap: 12}}>
                                <View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1stemployees')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.employees}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1storder')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.order}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1strest')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.rest}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1stmissing')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.missing}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('consumed')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.real}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('note')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.note}</Text>
                                    </View>
                                </View>
                                <View>
                                    {item?.status === 0 ?
                                        <SgButton
                                            bgColor={COLORS.brand_600}
                                            color={COLORS.white}
                                            onPress={(e) => toggleReportModal(e, item)}
                                        >
                                            {t('AddReport')}
                                        </SgButton>
                                        : null
                                    }
                                    {item?.status === 1 ?
                                        <SgButton
                                            bgColor={COLORS.brand_600}
                                            color={COLORS.white}
                                            onPress={(e) => toggleReportModal(e, item)}
                                        >
                                            {t('EditReport')}
                                        </SgButton>
                                        : null
                                    }
                                </View>
                            </View>
                        </CollapsibleView>
                    )
                })}
            </View>

            <SgPopup
                visible={reportModal}
                onClose={toggleReportModal}
                title={t('foodSchedule__report')}
                description={`${reportData.date ? moment(reportData.date).format('DD/MM/YYYY') : ''} - ${title?.[reportData?.type]} ${t('foodSchedule__report__description')}`}
                footerButton={
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleSubmit}
                    >
                        {t('Save')}
                    </SgButton>
                }
            >
                <View style={{gap: 16, paddingBottom: 16}}>
                    <View style={{gap: 16}}>
                        <View>
                            <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1stemployees')}:</Text>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{reportData.employees}</Text>
                            </View>
                            <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1storder')}:</Text>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{reportData.order}</Text>
                            </View>
                            <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1strest')}:</Text>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{reportData.order - reportData.real < 0 ? 0 : reportData.order - reportData.real}</Text>
                            </View>
                            <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8}}>
                                <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1stmissing')}:</Text>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{reportData.order - reportData.real > 0 ? 0 : (reportData.order - reportData.real) * -1}</Text>
                            </View>
                            <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8}}>
                                <Text style={{fontSize: 16, fontWeight: '400'}}>{t('note')}:</Text>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{reportData?.note}</Text>
                            </View>
                        </View>
                        <View>
                            <SgInput
                                placeholder={t('enterturn1real')}
                                value={reportData?.real}
                                name='real'
                                onChangeText={handleChangeReport}
                                type='number'
                            />
                        </View>
                    </View>
                </View>
            </SgPopup>

            <SgPopup
                visible={filterModal}
                onClose={toggleFilterModal}
                footerButton={
                    <SgButton
                        onPress={handleFilters}
                        bgColor={COLORS.primary}
                        color={COLORS.white}
                    >
                        {t('accept')}
                    </SgButton>
                }
            >
                <View style={{paddingBottom: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 20, fontWeight: 600, lineHeight: 30}}>{t('filters')}</Text>

                        <SgButton
                            onPress={resetFilters}
                            color={COLORS.brand_700}
                            style={{
                                flex: 0,
                                width: 'auto',
                                marginLeft: 'auto',
                                paddingVertical: 0,
                                paddingHorizontal: 0,
                                gap: 7
                            }}

                        >
                            {t('clearFilters')}
                            <ReloadArrow width={20} height={20} style={{marginLeft: 7}}/>
                        </SgButton>
                    </View>

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
                                label={t('startDate')}
                                placeholder="dd/mm/yyyy - hh/mm"
                                value={filters?.start_date}
                                name='start_date'
                                onChangeText={handleChange}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <SgDatePicker
                                label={t('endDate')}
                                placeholder="dd/mm/yyyy - hh/mm"
                                value={filters?.end_date}
                                name='end_date'
                                onChangeText={handleChange}
                            />
                        </View>
                    </View>
                </View>
            </SgPopup>

        </SgTemplateScreen>);
}

const styles = StyleSheet.create({
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand_50,
        padding: 14,
        borderRadius: 50,
    },
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
