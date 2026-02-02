import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import moment from "moment/moment";
import SgPopup from "@/components/ui/Modal/Modal";
import ReloadArrow from "@/assets/images/reload-arrows.svg";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import SgSelect from "@/components/ui/Select/Select";
import SgInput from "@/components/ui/Input/Input";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import {useTranslation} from "react-i18next";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import TaskListScreen from "@/components/sections/ClickupTask/TaskListScreen";
import FilterIcon from "@/assets/images/filter.svg";

export default function EmployeeDocsScreen() {
    const {request} = useApi();
    const {storeData} = useData();
    const [taskList, setTaskList] = useState([]);
    const [taskStatuses, setTaskStatus] = useState([]);
    const [filters, setFilters] = useState({})
    const [filterModal, setFilterModal] = useState(false)
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();

    function getData(_filters = {}) {
        request({
            url: `/employee/task/clickup/list`, method: 'get', params: {..._filters, status: _filters?.status?.id}
        }).then(resp => {
        }).catch(err => {
            // console.log(err);
        })
    }

    function toggleFilterModal() {
        setFilterModal(!filterModal);
    }

    function resetFilters() {
        setFilters({});
    }

    function handleChange(e) {
        setFilters({...filters, [e.name]: e.value});
    }

    function handleFilters() {
        getData(filters)
    }

    useFocusEffect(useCallback(() => {
        getData();

        request({
            url: `/employee/options/task_statuses`, method: 'get', cache: true,
        }).then().catch(err => {
            // console.log(err);
        })
        return () => {};
    }, [refreshKey]));

    useEffect(() => {
        setTaskStatus(storeData?.cache?.[`GET:/employee/options/task_statuses`]?.data)
    }, [storeData?.cache?.[`GET:/employee/options/task_statuses`]])

    useEffect(() => {
        console.log()
        setTaskList(storeData?.cache?.[`GET:/employee/task/clickup/list`]?.data)
    }, [storeData?.cache?.[`GET:/employee/task/clickup/list`]])

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('allTasks'),
            }}
            filter={
                <TouchableOpacity style={styles.iconWrapper} onPress={toggleFilterModal} activeOpacity={0.7}>
                    <FilterIcon width={20} height={20} color={COLORS.white} fill={COLORS.white} />
                </TouchableOpacity>
            }
            />}
        >
            <TaskListScreen
                prefix='/employeePages/projects/'
                taskList={taskList || []}
            />


            <SgPopup
                visible={filterModal}
                onClose={toggleFilterModal}
                footerButton={<SgButton
                    onPress={handleFilters}
                    bgColor={COLORS.brand_950}
                    color={COLORS.white}
                >
                    {t('accept')}
                </SgButton>}
            >
                <View style={styles.filterContent}>
                    <View style={styles.filterHeader}>
                        <Text style={styles.filterTitle}>{t('filters')}</Text>
                        <TouchableOpacity
                            onPress={resetFilters}
                            style={styles.clearButton}
                            activeOpacity={0.7}
                        >
                            <ReloadArrow width={16} height={16} color={COLORS.brand_700} />
                            <Text style={styles.clearButtonText}>{t('clearFilters')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.filterFields}>
                        <SgSelect
                            label={t('progress')}
                            placeholder={t('select')}
                            modalTitle={t("selectProject")}
                            value={filters?.status}
                            name='status'
                            list={(taskStatuses || []).sort((a, b) => a.id - b.id).map((el) => ({
                                id: el.id,
                                name: el.name,
                                render: (<Text style={styles.selectOptionText}>
                                    {el.id === 1 && t("open")}
                                    {el.id === 2 && t("inProgress")}
                                    {el.id === 3 && t("checkProgressRequested")}
                                    {el.id === 4 && t("checkProgressRequestAccepted")}
                                    {el.id === 5 && t("checkProgressRequestDenied")}
                                    {el.id === 6 && t("completeRequested")}
                                    {el.id === 7 && t("completeRequestAccepted")}
                                    {el.id === 8 && t("completeRequestDenied")}
                                </Text>)
                            }))}
                            onChangeText={handleChange}
                        />
                        <View style={styles.rowFields}>
                            <View style={styles.fieldHalf}>
                                <SgInput
                                    label={t("scoreRange")}
                                    placeholder={t('min')}
                                    value={filters?.score_min}
                                    name='score_min'
                                    onChangeText={handleChange}
                                    type='number'
                                />
                            </View>
                            <View style={styles.fieldHalf}>
                                <SgInput
                                    label=" "
                                    placeholder={t('max')}
                                    value={filters?.score_max}
                                    name='score_max'
                                    onChangeText={handleChange}
                                    type='number'
                                />
                            </View>
                        </View>
                        <View style={styles.rowFields}>
                            <View style={styles.fieldHalf}>
                                <SgDatePicker
                                    label={t('deadlineDateRange')}
                                    placeholder={t('min')}
                                    value={filters?.deadline_min}
                                    name='deadline_min'
                                    onChangeText={handleChange}
                                />
                            </View>
                            <View style={styles.fieldHalf}>
                                <SgDatePicker
                                    label=" "
                                    placeholder={t('max')}
                                    value={filters?.deadline_max}
                                    name='deadline_max'
                                    onChangeText={handleChange}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </SgPopup>
        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand_950,
        padding: 10,
        borderRadius: 12,
    },
    // Filter popup styles
    filterContent: {
        paddingBottom: 16,
    },
    filterHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    filterTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.gray_900,
        letterSpacing: -0.3,
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: COLORS.brand_50,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    clearButtonText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.brand_700,
    },
    filterFields: {
        gap: 16,
    },
    rowFields: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 12,
    },
    fieldHalf: {
        flex: 1,
    },
    selectOptionText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.gray_800,
    },
});