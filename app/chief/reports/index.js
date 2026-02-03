import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text, ScrollView, TouchableOpacity} from 'react-native';
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

const {width} = Dimensions.get('window');

export default function EmployeeDocsScreen() {
    const {request} = useApi();
    const {user} = useAuth();
    const {storeData} = useData();
    const router = useRouter();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation()
    const [data, setData] = useState([])
    const [statistics, setStatistics] = useState({})
    const [otherStatistics, setOtherStatistics] = useState({})
    const [workingHours, setWorkingHours] = useState({})
    const [currentlyAtWork, setCurrentlyAtWork] = useState({})
    const [projectsList, setProjectsList] = useState([])
    const [filters, setFilters] = useState({
        start_date: moment().endOf('day').utc().startOf('day').format('YYYY-MM-DD'),
        end_date: moment().endOf('day').utc().endOf('day').format('YYYY-MM-DD'),
    })
    const [filterModal, setFilterModal] = useState(false)


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
        getData();
        // console.log(filters);
    }

    function getData() {
        request({
            url: `/chief/reports/list`,
            method: 'get',
            params: {
                ...filters,
                project: filters?.project?.map(el => el.id),
            }
        }).then(res => {
        }).catch(err => {
            console.log(err);
        })

        request({
            url: `/chief/reports/statistics`,
            method: 'get',
            params: {
                ...filters,
                project: filters?.project?.map(el => el.id),
            }
        }).then(res => {
        }).catch(err => {
            console.log(err);
        })

        request({
            url: `/chief/reports/statistics/working_hours`,
            method: 'get',
            params: {
                ...filters,
                project: filters?.project?.map(el => el.id),
            }
        }).then(res => {
        }).catch(err => {
            console.log(err);
        })

        request({
            url: `/chief/reports/statistics/checkin`,
            method: 'get',
            params: {
                ...filters,
                project: filters?.project?.map(el => el.id),
            }
        }).then(res => {
        }).catch(err => {
            console.log(err);
        })

        request({
            url: `/chief/reports/statistics/at_work`,
            method: 'get',
            params: {
                ...filters,
                project: filters?.project?.map(el => el.id),
            }
        }).then(res => {
        }).catch(err => {
            console.log(err);
        })
    }

    useFocusEffect(useCallback(() => {
        getData()


        request({
            url: `/chief/options/projects`, method: 'get',
        }).then(res => {
            if (res.success) {
                setProjectsList(res?.data);
            }
            else {
                // Handle error response
                // console.log(res.message);
            }
        }).catch(err => {
            // console.log(err);
        })

            return () => {
            };
        }, [refreshKey])
    );

    useEffect(() => {
        setData(storeData?.cache?.[`GET:/chief/reports/list`]?.data)
    }, [storeData?.cache?.[`GET:/chief/reports/list`]]);

    useEffect(() => {
        setStatistics(storeData?.cache?.[`GET:/chief/reports/statistics`]?.data)
    }, [storeData?.cache?.[`GET:/chief/reports/statistics`]]);

    useEffect(() => {
        setWorkingHours(storeData?.cache?.[`GET:/chief/reports/statistics/working_hours`]?.data)
    }, [storeData?.cache?.[`GET:/chief/reports/statistics/working_hours`]]);

    useEffect(() => {
        setOtherStatistics(storeData?.cache?.[`GET:/chief/reports/statistics/checkin`]?.data)
    }, [storeData?.cache?.[`GET:/chief/reports/statistics/checkin`]]);

    useEffect(() => {
        setCurrentlyAtWork(storeData?.cache?.[`GET:/chief/reports/statistics/at_work`]?.data)
    }, [storeData?.cache?.[`GET:/chief/reports/statistics/at_work`]]);


    return (
        <SgTemplateScreen
            head={
                <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
                    <SgSectionFileHead
                        title={t('reports')}
                        icon="filter"
                        onPress={toggleFilterModal}
                        // description={t('reports__description')}
                    />
                </View>
            }
        >
            <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false} style={styles.summaryWrapper}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>{t('reports__statistics_Employees')}</Text>
                    <TouchableOpacity onPress={() => {
                        router.navigate(`/chiefPages/reports/${filters.project ? filters.project?.map(el => el.id) : 'all'}?start=${filters?.start_date}&end=${filters?.end_date}`)
                    }}>
                        <Text style={styles.summaryValue}>{statistics?.member_count}</Text>
                    </TouchableOpacity>

                    <Text style={styles.summarySubText}>
                        {t('reports__statistics_Indirect_Employees')} #:
                        <TouchableOpacity onPress={() => {
                            router.navigate(`/chiefPages/reports/${filters.project ? filters.project?.map(el => el.id) : 'all'}?staff_status=2&start=${filters?.start_date}&end=${filters?.end_date}`)
                        }}>
                            <Text style={{fontWeight: 700}}>{statistics?.indirect_member_count}</Text>
                        </TouchableOpacity>
                    </Text>
                    <Text style={styles.summarySubText}>
                        {t('reports__statistics_Direct_Employees')} #:
                        <TouchableOpacity onPress={() => {
                            router.navigate(`/chiefPages/reports/${filters.project ? filters.project?.map(el => el.id) : 'all'}?staff_status=1&start=${filters?.start_date}&end=${filters?.end_date}`)
                        }}>
                            <Text style={{fontWeight: 700}}>{statistics?.direct_member_count}</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>{t('reports__statistics_Currently_at_Work')}</Text>
                    <TouchableOpacity onPress={() => {
                        router.navigate(`/chiefPages/reports/${filters.project ? filters.project?.map(el => el.id) : 'all'}?checkin_status=1&start=${filters?.start_date}&end=${filters?.end_date}`)
                    }}>
                        <Text style={styles.summaryValue}>{statistics?.total_checkin_count}</Text>
                    </TouchableOpacity>

                    <Text style={styles.summarySubText}>(<Text
                        style={{fontWeight: 700}}>{statistics?.total_manual_checkin_count}</Text> Manual, <Text
                        style={{fontWeight: 700}}>{(statistics?.total_checkin_count || 0) - (statistics?.total_manual_checkin_count || 0)}</Text> Auto)</Text>

                    <Text style={styles.summarySubText}>
                        {t('reports__statistics_Indirect_Employees')} #:
                        <TouchableOpacity onPress={() => {
                            router.navigate(`/chiefPages/reports/${filters.project ? filters.project?.map(el => el.id) : 'all'}?staff_status=2&checkin_status=1&start=${filters?.start_date}&end=${filters?.end_date}`)
                        }}>
                            <Text style={{fontWeight: 700}}>{statistics?.indirect_checkin_count}</Text>
                        </TouchableOpacity>
                    </Text>
                    <Text style={styles.summarySubText}>
                        {t('reports__statistics_Direct_Employees')} #:
                        <TouchableOpacity onPress={() => {
                            router.navigate(`/chiefPages/reports/${filters.project ? filters.project?.map(el => el.id) : 'all'}?staff_status=1&checkin_status=1&start=${filters?.start_date}&end=${filters?.end_date}`)
                        }}>
                            <Text style={{fontWeight: 700}}>{statistics?.direct_checkin_count}</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>{t('reports__statistics_Absent')}</Text>
                    <TouchableOpacity onPress={() => {
                        router.navigate(`/chiefPages/reports/${filters.project ? filters.project?.map(el => el.id) : 'all'}?checkin_status=2&start=${filters?.start_date}&end=${filters?.end_date}`)
                    }}>
                        <Text style={styles.summaryValue}>{statistics?.member_count - statistics?.total_checkin_count || '0'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.summarySubText}>
                        {t('reports__statistics_Indirect_Employees')} #:
                        <TouchableOpacity onPress={() => {
                            router.navigate(`/chiefPages/reports/${filters.project ? filters.project?.map(el => el.id) : 'all'}?staff_status=2&checkin_status=2&start=${filters?.start_date}&end=${filters?.end_date}`)
                        }}>
                            <Text style={{fontWeight: 700}}>{statistics?.indirect_member_count - statistics?.indirect_checkin_count}</Text>
                        </TouchableOpacity>
                    </Text>
                    <Text style={styles.summarySubText}>
                        {t('reports__statistics_Direct_Employees')} #:
                        <TouchableOpacity onPress={() => {
                            router.navigate(`/chiefPages/reports/${filters.project ? filters.project?.map(el => el.id) : 'all'}?staff_status=1&checkin_status=2&start=${filters?.start_date}&end=${filters?.end_date}`)
                        }}>
                            <Text style={{fontWeight: 700}}>{statistics?.direct_member_count - statistics?.direct_checkin_count}</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>{t('reports__statistics_Rejected_Check_Ins')}</Text>
                    <TouchableOpacity onPress={() => {
                        router.navigate(`/chiefPages/reports/${filters.project ? filters.project?.map(el => el.id) : 'all'}?checkin_status=3&start=${filters?.start_date}&end=${filters?.end_date}`)
                    }}>
                        <Text style={styles.summaryValue}>{otherStatistics?.rejected_checkins || '0'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false} style={styles.summaryWrapper}>
                <View style={styles.summaryCard2}>
                    <Text style={styles.summaryLabel2}>{t('reports__statistics_Total_Working_Hours')}</Text>
                    <View>
                        <Text style={styles.summaryValue2}>{workingHours?.total_working_hours || '00:00'}</Text>
                    </View>
                </View>
                <View style={styles.summaryCard2}>
                    <Text style={styles.summaryLabel2}>{t('reports__statistics_Day_Shift_Hours')}</Text>
                    <View>
                        <Text style={styles.summaryValue2}>{workingHours?.day_shift_hours || '00:00'}</Text>
                    </View>
                </View>
                <View style={styles.summaryCard2}>
                    <Text style={styles.summaryLabel2}>{t('reports__statistics_Night_Shift_Hours')}</Text>
                    <View>
                        <Text style={styles.summaryValue2}>{workingHours?.night_shift_hours || '00:00'}</Text>
                    </View>
                </View>
                <View style={styles.summaryCard2}>
                    <Text style={styles.summaryLabel2}>{t('reports__statistics_Indirect_Hours')}</Text>
                    <View>
                        <Text style={styles.summaryValue2}>{workingHours?.indirect_hours || '00:00'}</Text>
                    </View>
                </View>
                <View style={styles.summaryCard2}>
                    <Text style={styles.summaryLabel2}>{t('reports__statistics_Direct_Hours')}</Text>
                    <View>
                        <Text style={styles.summaryValue2}>{workingHours?.direct_hours || '00:00'}</Text>
                    </View>
                </View>
                <View style={styles.summaryCard2}>
                    <Text style={styles.summaryLabel2}>{t('reports__statistics_Normal_Hours')}</Text>
                    <View>
                        <Text style={styles.summaryValue2}>{workingHours?.normal_hours || '00:00'}</Text>
                    </View>
                </View>
                <View style={styles.summaryCard2}>
                    <Text style={styles.summaryLabel2}>{t('reports__statistics_Overtime_Hours')}</Text>
                    <View>
                        <Text style={styles.summaryValue2}>{workingHours?.overtime_hours || '00:00'}</Text>
                    </View>
                </View>
            </ScrollView>

            <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false} style={styles.summaryWrapper}>
                <View style={[styles.summaryCard3, {borderLeftColor: '#fd9a00', backgroundColor: '#fffbeb'}]}>
                    <Text style={styles.summaryLabel3}>{t('reports__statistics_Day_Shift_Employees')}</Text>
                    <View>
                        <Text style={styles.summaryValue3}>{currentlyAtWork?.day_shift_count || 0}</Text>
                    </View>
                </View>
                <View style={[styles.summaryCard3, {borderLeftColor: '#4f39f6', backgroundColor: '#eef2ff'}]}>
                    <Text style={styles.summaryLabel3}>{t('reports__statistics_Night_Shift_Employees')}</Text>
                    <View>
                        <Text style={styles.summaryValue3}>{currentlyAtWork?.night_shift_count || 0}</Text>
                    </View>
                </View>
                <View style={[styles.summaryCard3, {borderLeftColor: '#00c951', backgroundColor: '#f0fdf4'}]}>
                    <Text style={styles.summaryLabel3}>{t('reports__statistics_Normal_Check_in_Employees')}</Text>
                    <View>
                        <Text style={styles.summaryValue3}>{currentlyAtWork?.normal_checkin_count || 0}</Text>
                    </View>
                </View>
                <View style={[styles.summaryCard3, {borderLeftColor: '#fb2c36', backgroundColor: '#fef2f2'}]}>
                    <Text style={styles.summaryLabel3}>{t('reports__statistics_Overtime_Employees')}</Text>
                    <View>
                        <Text style={styles.summaryValue3}>{currentlyAtWork?.overtime_count || 0}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.projectSection}>
                {(data || []).map((project) => (
                    <View key={project.id} style={styles.projectBlock}>

                        {/* Project Header */}
                        <View style={styles.projectHeader}>
                            <TouchableOpacity onPress={() => {
                                router.navigate(`/chiefPages/reports/${project.id}?start=${filters?.start_date}&end=${filters?.end_date}`)
                            }}>
                                <View>
                                    <Text style={styles.projectName}>{project.name}</Text>
                                    <Text style={styles.projectId}>ID: {project.id}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.line}/>

                        {/* 9 Statistik Data - 3x3 Grid Sistemi */}
                        <View style={styles.gridContainer}>
                            {/* SIRA 1 */}
                            <View style={styles.gridItem}>
                                <TouchableOpacity onPress={() => {
                                    router.navigate(`/chiefPages/reports/${project.id}?start=${filters?.start_date}&end=${filters?.end_date}`)
                                }}>
                                    <Text style={styles.gridLabel}>{t('Total_employee')}</Text>
                                    <Text style={styles.gridValue}>{project.member_count}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.gridItem}>
                                <TouchableOpacity onPress={() => {
                                    router.navigate(`/chiefPages/reports/${project.id}?staff_status=2&start=${filters?.start_date}&end=${filters?.end_date}`)
                                }}>
                                    <Text style={styles.gridLabel}>{t('Indirect_employee')}</Text>
                                    <Text style={styles.gridValue}>{project.indirect_member_count}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.gridItem}>
                                <TouchableOpacity onPress={() => {
                                    router.navigate(`/chiefPages/reports/${project.id}?staff_status=1&start=${filters?.start_date}&end=${filters?.end_date}`)
                                }}>
                                    <Text style={styles.gridLabel}>{t('Direct_employee')}</Text>
                                    <Text style={styles.gridValue}>{project.direct_member_count}</Text>
                                </TouchableOpacity>
                            </View>

                            {/* SIRA 2 */}
                            <View style={styles.gridItem}>
                                <TouchableOpacity onPress={() => {
                                    router.navigate(`/chiefPages/reports/${project.id}?checkin_status=1start=${filters?.start_date}&end=${filters?.end_date}`)
                                }}>
                                    <Text style={styles.gridLabel}>{t('Total_check_in')}</Text>
                                    <Text style={styles.gridValue}>{project.total_checkin_count}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.gridItem}>
                                <TouchableOpacity onPress={() => {
                                    router.navigate(`/chiefPages/reports/${project.id}?staff_status=2&checkin_status=1start=${filters?.start_date}&end=${filters?.end_date}`)
                                }}>
                                    <Text style={styles.gridLabel}>{t('Check_in_indirect_employee')}</Text>
                                    <Text style={styles.gridValue}>{project.indirect_checkin_count}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.gridItem}>
                                <TouchableOpacity onPress={() => {
                                    router.navigate(`/chiefPages/reports/${project.id}?staff_status=1&checkin_status=1start=${filters?.start_date}&end=${filters?.end_date}`)
                                }}>
                                    <Text style={styles.gridLabel}>{t('Check_in_direct_employee')}</Text>
                                    <Text style={styles.gridValue}>{project.direct_checkin_count}</Text>
                                </TouchableOpacity>
                            </View>

                            {/* SIRA 3 */}
                            <View style={styles.gridItem}>
                                <TouchableOpacity onPress={() => {
                                    router.navigate(`/chiefPages/reports/${project.id}?checkin_status=2&start=${filters?.start_date}&end=${filters?.end_date}`)
                                }}>
                                    <Text style={styles.gridLabel}>{t('Not_Checked_in_Employees')}</Text>
                                    <Text style={styles.gridValue}>{project?.member_count - project?.total_checkin_count}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.gridItem}>
                                <TouchableOpacity onPress={() => {
                                    router.navigate(`/chiefPages/reports/${project.id}?staff_status=2&checkin_status=2&start=${filters?.start_date}&end=${filters?.end_date}`)
                                }}>
                                    <Text style={styles.gridLabel}>{t('Indirect_Not_Checked_in_Employees')}</Text>
                                    <Text style={styles.gridValue}>{project?.indirect_member_count - project?.indirect_checkin_count}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.gridItem}>
                                <TouchableOpacity onPress={() => {
                                    router.navigate(`/chiefPages/reports/${project.id}?staff_status=1&checkin_status=2&start=${filters?.start_date}&end=${filters?.end_date}`)
                                }}>
                                    <Text style={styles.gridLabel}>{t('Direct_Not_Checked_in_Employees')}</Text>
                                    <Text style={styles.gridValue}>{project?.direct_member_count - project?.direct_checkin_count}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                ))}
            </View>

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
                                multiple={true}
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


        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
    summaryWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: 16,
        // flexWrap: 'wrap', // Ekrana sığmasa aşağı düşməsi üçün
        // justifyContent: 'space-between',
        // marginBottom: 10,
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
    summaryCard2: {
        minWidth: width * 2 / 4,
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        marginRight: 12
    },
    summaryCard3: {
        minWidth: width * 2 / 3,
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        marginRight: 12,
        borderLeftWidth: 4
    },
    summaryLabel: {
        fontSize: 9,
        color: '#6B7280',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    summaryLabel2: {
        fontSize: 8,
        color: '#6B7280',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    summaryLabel3: {
        fontSize: 8,
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
    summaryValue2: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginVertical: 4,
    },
    summaryValue3: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginVertical: 4,
    },
    summarySubText: {
        fontSize: 10,
        color: '#838a97',
        marginTop: 12,
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
