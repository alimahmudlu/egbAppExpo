import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text, ScrollView, TouchableOpacity, Pressable} from 'react-native';
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useFocusEffect, useLocalSearchParams, useRouter} from "expo-router";
import {useAuth} from "@/hooks/useAuth";
import {useTranslation} from "react-i18next";
import moment from "moment";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import ReloadArrow from "@/assets/images/reload-arrows.svg";
import SgSelect from "@/components/ui/Select/Select";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import SgPopup from "@/components/ui/Modal/Modal";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import FilterIcon from "@/assets/images/filter.svg";
import SgInput from "@/components/ui/Input/Input";
import SgCheckbox from "@/components/ui/Checkbox/Checkbox";

const {width} = Dimensions.get('window');

export default function EmployeeDocsScreen() {
    const { staff_status, checkin_status, start, end, project_id} = useLocalSearchParams();

    const paramStatus = staff_status;
    const paramPosition = checkin_status;
    const paramStartDate = start;
    const paramEndDate = end;


    const {request} = useApi();
    const {storeData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation()
    const [data, setData] = useState([])
    const [projectsList, setProjectsList] = useState([])
    const [filters, setFilters] = useState({
        today: moment().endOf('day').utc().startOf('day').format('YYYY-MM-DD'),

        staff_status: paramStatus || null,
        checkin_status: paramPosition || null,
        start_date: paramStartDate ? paramStartDate : null,
        end_date: paramEndDate ? paramEndDate : null,
        turn: '',
    })
    const [filterModal, setFilterModal] = useState(false)
    const [page, setPage] = useState(1);
    const [getDataStatus, setDataStatus] = useState(false)


    function handleChange(e) {
        setFilters({...filters, [e.name]: e.value});
    }

    function toggleFilterModal() {
        setFilterModal(!filterModal);
    }

    function resetFilters() {
        setFilters({
            start_date: moment().endOf('day').utc().startOf('day').format('YYYY-MM-DD'),
            end_date: moment().endOf('day').utc().endOf('day').format('YYYY-MM-DD'),
        });
    }

    function handleFilters() {
        // getData()
        setPage(1)
        setDataStatus(!getDataStatus)
    }

    function getData() {
        request({
            url: `/chief/reports/list/item`,
            method: 'get',
            params: {
                ...filters,
                id: project_id === 'all' ? null : project_id,

                page: page,
                limit: 10
            }
        }).then(res => {
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        if (page) {
            getData()
        }
    }, [page, getDataStatus])

    useFocusEffect(useCallback(() => {
        setPage(1)
        setDataStatus(!getDataStatus)

        request({
            url: `/chief/options/projects`, method: 'get',
        }).then(res => {
            if (res.success) {
                setProjectsList(res?.data);
            } else {
                // Handle error response
                // console.log(res.message);
            }
        }).catch(err => {
            // console.log(err);
        })

            return () => {
                setData([])
                setProjectsList([])
            };
        }, [refreshKey])
    );

    useEffect(() => {
        // setData(storeData?.cache?.[`GET:/chief/reports/list/item`]?.data)
        setData((prevState) => {
            if (page === 1) {
                return {
                    ...(storeData?.cache?.[`GET:/chief/reports/list/item`]?.data || {})
                }
            } else {
                return {
                    ...(storeData?.cache?.[`GET:/chief/reports/list/item`]?.data || {}),
                    data: [...prevState?.data || [], ...((storeData?.cache?.[`GET:/chief/reports/list/item`]?.data || {})?.data || [])]
                }
            }
        })
    }, [storeData?.cache?.[`GET:/chief/reports/list/item`]]);


    function handleMore() {
        setPage(page + 1);
    }


    return (
        <SgTemplateScreen
            head={
                <SgTemplatePageHeader
                    data={{
                        header: t('reports'),
                    }}

                      filter={
                          <Pressable style={styles.iconWrapper} onPress={toggleFilterModal}>
                              <Text><FilterIcon width={20} height={20} /></Text>
                          </Pressable>
                      }
                />
            }
        >
            <View style={{marginBottom: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center'}}>
                {paramStatus ?
                    <Text style={{backgroundColor: COLORS.blue_50, padding: 4, borderRadius: 4, color: COLORS.black}}>
                        {t('staffStatus')}:
                        {paramStatus === '1' ?
                            t('direct')
                            :
                            t('indirect')
                        }
                    </Text>
                    : null
                }
                {paramPosition ?
                    <Text style={{backgroundColor: COLORS.blue_50, padding: 4, borderRadius: 4, color: COLORS.black}}>
                        {t('CheckinStatus')}:
                        {paramStatus === '1' ?
                            t('Yes')
                            :
                            t('No')
                        }
                    </Text>
                    : null
                }
                {paramStartDate ?
                    <Text style={{backgroundColor: COLORS.blue_50, padding: 4, borderRadius: 4, color: COLORS.black}}>
                        {t('startDate')}:
                        {paramStartDate}
                    </Text>
                    : null
                }
                {paramEndDate ?
                    <Text style={{backgroundColor: COLORS.blue_50, padding: 4, borderRadius: 4, color: COLORS.black}}>
                        {t('endDate')}:
                        {paramEndDate}
                    </Text>
                    : null
                }
            </View>
            <View style={styles.projectSection}>
                {((data || {})?.data || []).map((project) => (
                    <View key={project.id} style={styles.projectBlock}>
                        <View style={styles.projectHeader}>
                            <View>
                                <Text style={styles.projectName}>{project.full_name}</Text>
                                <Text style={styles.projectId}>ID: {project.employee_id}</Text>
                            </View>
                        </View>

                        <View style={styles.line}/>

                        {/* 9 Statistik Data - 3x3 Grid Sistemi */}
                        <View style={styles.gridContainer}>
                            {/* SIRA 1 */}
                            <View style={styles.gridItem}>
                                <Text style={styles.gridLabel}>{t('staffStatus')}</Text>
                                <Text style={styles.gridValue}>
                                    {project.employee_staff_status === 1 ? t('direct') : null}
                                    {project.employee_staff_status === 2 ? t('indirect') : null}
                                </Text>
                            </View>
                            <View style={styles.gridItem}>
                                <Text style={styles.gridLabel}>{t('role')}</Text>
                                <Text style={styles.gridValue}>{project.employee_role_name}</Text>
                            </View>
                            <View style={styles.gridItem}>
                                <Text style={styles.gridLabel}>{t('position')}</Text>
                                <Text style={styles.gridValue}>{project.employee_position_name}</Text>
                            </View>

                            {/* SIRA 2 */}
                            <View style={styles.gridItem}>
                                <Text style={styles.gridLabel}>{t('projects')}</Text>
                                <Text style={styles.gridValue}>{project.employee_projects}</Text>
                            </View>
                            <View style={styles.gridItem}>
                                <Text style={styles.gridLabel}>{t('CheckinStatus')}</Text>
                                <Text style={styles.gridValue}>{project.is_checked_in_on_date ? t('Yes') : t('No')}</Text>
                            </View>
                            <View style={styles.gridItem}>
                                <Text style={styles.gridLabel}>{t('Shift')}</Text>
                                <Text style={styles.gridValue}>
                                    {project?.employee_turn === 1 ? t('DayShift') :
                                        project?.employee_turn === 2 ? t('NightShift') : '-'}
                                </Text>
                            </View>
                        </View>

                    </View>
                ))}

                {((data || {}).total || 0) > page * 10 ?
                    <View style={{marginTop: 16}}>
                        <SgButton
                            onPress={handleMore}
                            bgColor={COLORS.primary}
                            color={COLORS.white}
                        >
                            {t('loadMore')}
                        </SgButton>
                    </View>
                    : null
                }
            </View>

            <SgPopup
                visible={filterModal}
                onClose={toggleFilterModal}
                // fullScreen={true}
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
                            <SgInput
                                label={t('Name')}
                                placeholder={t('Name')}
                                value={filters?.name}
                                name='name'
                                onChangeText={handleChange}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <SgInput
                                label={t('EmployeeId')}
                                placeholder={t('EmployeeId')}
                                value={filters?.employee_id}
                                name='employee_id'
                                onChangeText={handleChange}
                                type='number'
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <SgSelect
                                label={t("staffStatus")}
                                placeholder={t("enterStaffStatus")}
                                modalTitle={t("selectStaffStatus")}
                                value={filters?.staff_status}
                                name='staff_status'
                                onChangeText={handleChange}
                                list={[
                                    {
                                        id: 1,
                                        name: t('direct'),
                                        render: <View><Text>{t('direct')}</Text></View>
                                    },
                                    {
                                        id: 2,
                                        name: t('indirect'),
                                        render: <View><Text>{t('indirect')}</Text></View>
                                    }
                                ]}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <SgSelect
                                label={t("CheckinStatus")}
                                placeholder={t("enterCheckinStatus")}
                                modalTitle={t("selectCheckinStatus")}
                                value={filters?.checkin_status}
                                name='checkin_status'
                                onChangeText={handleChange}
                                list={[
                                    {
                                        id: 1,
                                        name: t('Yes'),
                                        render: <View><Text>{t('Yes')}</Text></View>
                                    },
                                    {
                                        id: 2,
                                        name: t('No'),
                                        render: <View><Text>{t('No')}</Text></View>
                                    }
                                ]}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <SgSelect
                                label={t("role")}
                                placeholder={t("enterRole")}
                                modalTitle={t("enterRole")}
                                value={filters?.role_id}
                                name='role_id'
                                onChangeText={handleChange}
                                list={[
                                    {
                                        id: 1,
                                        name: t('Employee'),
                                        render: <View><Text>{t('Employee')}</Text></View>
                                    },
                                    {
                                        id: 2,
                                        name: t('TimeKeeper'),
                                        render: <View><Text>{t('TimeKeeper')}</Text></View>
                                    },
                                    {
                                        id: 3,
                                        name: t('ConstructionChief'),
                                        render: <View><Text>{t('ConstructionChief')}</Text></View>
                                    },
                                    {
                                        id: 4,
                                        name: t('Administrator'),
                                        render: <View><Text>{t('Administrator')}</Text></View>
                                    }
                                ]}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <SgSelect
                                label={t("status")}
                                placeholder={t("enterStatus")}
                                modalTitle={t("selectStatus")}
                                value={filters?.status}
                                name='status'
                                onChangeText={handleChange}
                                list={[
                                    {
                                        id: 0,
                                        name: t('autoAccepted'),
                                        render: <View><Text>{t('autoAccepted')}</Text></View>
                                    },
                                    {
                                        id: 1,
                                        name: t('manuallyAccepted'),
                                        render: <View><Text>{t('manuallyAccepted')}</Text></View>
                                    }
                                ]}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <SgSelect
                                label={t("checkType")}
                                placeholder={t("enterCheckType")}
                                modalTitle={t("selectCheckType")}
                                value={filters?.checkType}
                                name='checkType'
                                onChangeText={handleChange}
                                list={[
                                    {
                                        id: 3,
                                        name: t('onlyOverTime'),
                                        render: <View><Text>{t('onlyOverTime')}</Text></View>
                                    },
                                    {
                                        id: 1,
                                        name: t('onlyNormal'),
                                        render: <View><Text>{t('onlyNormal')}</Text></View>
                                    }
                                ]}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <SgSelect
                                label={t("turn")}
                                placeholder={t("enterTurn")}
                                modalTitle={t("selectTurn")}
                                value={filters?.turn}
                                name='turn'
                                onChangeText={handleChange}
                                list={[
                                    {
                                        id: 3,
                                        name: t('DayShift'),
                                        render: <View><Text>{t('DayShift')}</Text></View>
                                    },
                                    {
                                        id: 1,
                                        name: t('NightShift'),
                                        render: <View><Text>{t('NightShift')}</Text></View>
                                    }
                                ]}
                            />
                        </View>

                        {project_id === 'all' ?
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
                            : null
                        }

                        <View style={{flex: 1}}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.checkboxContainer}
                                onPress={() => handleChange({
                                    name: 'dontShowSubcontractors',
                                    value: filters?.dontShowSubcontractors ? '0' : '1'
                                })}
                            >
                                <SgCheckbox
                                    checked={filters?.dontShowSubcontractors === '1'}
                                    onToggle={() => handleChange({
                                        name: 'dontShowSubcontractors',
                                        value: filters?.dontShowSubcontractors ? '0' : '1',
                                    })}
                                />
                                <Text style={styles.checkboxLabel}>{t('Dont_show_subcontractors')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.checkboxContainer}
                                onPress={() => handleChange({
                                    name: 'showSubcontractors',
                                    value: filters?.showSubcontractors ? '0' : '1'
                                })}
                            >
                                <SgCheckbox
                                    checked={filters?.showSubcontractors === '1'}
                                    onToggle={() => handleChange({
                                        name: 'showSubcontractors',
                                        value: filters?.showSubcontractors ? '0' : '1',
                                    })}
                                />
                                <Text style={styles.checkboxLabel}>{t('Show_subcontractors')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SgPopup>


        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
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
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand_50,
        padding: 14,
        borderRadius: 50,
    },
    summaryWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: 16,
        // flexWrap: 'wrap', // Ekrana sığmasa aşağı düşməsi üçün
        // justifyContent: 'space-between',
        marginBottom: 25,
    },
    summaryCard: {
        minWidth: width * 2 / 3,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        marginRight: 12
    },
    summaryLabel: {
        fontSize: 9,
        color: '#6B7280',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    summaryValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        marginVertical: 4,
    },
    summarySubText: {
        fontSize: 10,
        color: '#838a97',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    headerDate: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    projectSection: {},
    projectBlock: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB', // Boz nazik border
        // Hafif kölgə (istəyə bağlı)
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 2,
    },
    projectHeader: {
        marginBottom: 12,
    },
    projectName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
    },
    projectId: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 2,
    },
    line: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginBottom: 16,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '31%', // 3 sütunlu düzülüş üçün
        marginBottom: 15,
    },
    gridLabel: {
        fontSize: 9,
        fontWeight: '600',
        color: '#6B7280',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    gridValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
    },
});
