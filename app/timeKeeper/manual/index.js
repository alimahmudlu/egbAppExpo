import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable, TouchableOpacity} from 'react-native';
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import moment from "moment/moment";
import {useApi} from "@/hooks/useApi";
import SgPopup from "@/components/ui/Modal/Modal";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import ReloadArrow from "@/assets/images/reload-arrows.svg";
import SgSelect from "@/components/ui/Select/Select";
import SgInput from "@/components/ui/Input/Input";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import {useData} from "@/hooks/useData";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import {useTranslation} from "react-i18next";
import FilterIcon from "@/assets/images/filter.svg";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgCheckbox from "@/components/ui/Checkbox/Checkbox";

export default function EmployeeDocsScreen() {
    const {request} = useApi();
    const [employees, setEmployees] = useState({});
    const [projectsList, setProjectsList] = useState([]);
    const [filters, setFilters] = useState({})
    const [filterModal, setFilterModal] = useState(false)
    const {storeData, updateData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();
    const [page, setPage] = useState(1);
    const [oldPage, setOldPage] = useState(1);
    const [getDataStatus, setDataStatus] = useState(false)

    function getData(_filters = {}) {
        request({
            url: '/timekeeper/manual/list',
            method: 'get',
            params: {
                ..._filters,
                page: page,
                limit: 10
            },
            pagination: true
        }).then().catch(err => {
            // console.log(err, 'apiservice control err')
        });
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
        setPage(1)
        setDataStatus(!getDataStatus)
    }

    useEffect(() => {
        if (page) {
            getData({...filters, project: filters?.project?.id, application_status: filters?.application_status?.id})
        }
    }, [page, getDataStatus])

    useFocusEffect(useCallback(() => {
        setPage(1);
        setDataStatus(!getDataStatus)

        request({
            url: `/timekeeper/options/projects`, method: 'get',
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
            setPage(0)
            setDataStatus(!getDataStatus)
            setEmployees({})
            setProjectsList([])
            updateData(`GET:/timekeeper/manual/list`, {data: []})
        };
    }, [refreshKey]));

    useEffect(() => {
        setEmployees((prevState) => {
            if (page === 1) {
                return {
                    ...storeData?.cache?.[`GET:/timekeeper/manual/list`]?.data || {}
                }
            } else {
                if (storeData?.cache?.[`GET:/timekeeper/manual/list`]?.data?.page == oldPage) {
                    return {
                        ...storeData?.cache?.[`GET:/timekeeper/manual/list`]?.data || {}
                    }
                } else {
                    setOldPage(page)

                    return {
                        ...storeData?.cache?.[`GET:/timekeeper/manual/list`]?.data || {}
                    }
                }
            }
        })
    }, [storeData?.cache?.[`GET:/timekeeper/manual/list`]]);

    function handleMore() {
        setPage(page + 1);
        setOldPage(page);
    }


    return (
        <SgTemplateScreen
            head={
                <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
                    <SgSectionFileHead
                        title={t("manualCheckInAndCheckOut")}
                        icon="filter"
                        onPress={toggleFilterModal}
                    />
                </View>
            }
        >
            <View style={{gap: 8}}>
                {((employees || {}).data || [])?.map((emp, index) => (
                    <SgSectionEmployeeCard
                        key={index}
                        fullData={emp}
                        title={emp?.full_name}
                        role={emp?.role?.name}
                        timeRaw={emp?.checkin?.review_time || emp?.overtimecheckin?.request_time}
                        time={emp?.checkin?.request_time ? moment(emp?.checkin?.request_time).format('MM-DD-YYYY HH:mm') : (emp?.overtimecheckin?.request_time ? moment(emp?.overtimecheckin?.request_time).format('MM-DD-YYYY HH:mm') : '')}
                        image={emp?.image}
                        editable={true}
                        project={emp?.project?.name}
                        manual={true}
                        checkType={emp?.checkin?.request_time ? 'Manual Check-In' : (emp?.overtimecheckin?.request_time ? 'Manual Overtime Check-In' : '')}
                    />
                ))}

                {((employees || {}).total || 0) > page * 10 ?
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
                        <Text style={{fontSize: 20, fontWeight: 600, lineHeight: 30}}>Filters</Text>

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
                                label={t('employeeName')}
                                placeholder={t('employeeName_placeholder')}
                                value={filters?.full_name}
                                name='full_name'
                                onChangeText={handleChange}
                            />
                        </View>
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
                            <SgSelect
                                label={t("applicationStatus")}
                                placeholder={t("enterApplicationStatus")}
                                modalTitle={t("selectApplicationStatus")}
                                value={filters?.application_status}
                                name='application_status'
                                onChangeText={handleChange}
                                list={[
                                    {
                                        id: '0',
                                        name: 'draft',
                                        render: <View><Text>{t('draft')}</Text></View>
                                    },
                                    {
                                        id: '1',
                                        name: 'done',
                                        render: <View><Text>{t('done')}</Text></View>
                                    }
                                ]}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.checkboxContainer}
                                onPress={() => handleChange({
                                    name: 'ios',
                                    value: filters?.ios ? '0' : '1'
                                })}
                            >
                                <SgCheckbox
                                    checked={filters?.ios === '1'}
                                    onToggle={() => handleChange({
                                        name: 'ios',
                                        value: filters?.ios ? '0' : '1',
                                    })}
                                />
                                <Text style={styles.checkboxLabel}>{t('iosUser')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SgPopup>
        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 15,
    },
    jobCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    activeBadge: {
        backgroundColor: '#e6f7ee',
    },
    closedBadge: {
        backgroundColor: '#ffebee',
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    activeText: {
        color: '#00a86b',
    },
    closedText: {
        color: '#f44336',
    },
    jobDetails: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    jobInfo: {
        fontSize: 14,
        color: '#666',
        marginRight: 15,
        marginBottom: 5,
    },
    applicantsContainer: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 10,
        marginVertical: 10,
    },
    applicantsText: {
        fontSize: 16,
        fontWeight: '500',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    closeButton: {
        backgroundColor: '#f44336',
    },
    reopenButton: {
        backgroundColor: '#4caf50',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    closeButtonText: {
        color: '#fff',
    },
    reopenButtonText: {
        color: '#fff',
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
        fontFamily: 'Inter',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 20,
        color: COLORS.gray_800
    },
});