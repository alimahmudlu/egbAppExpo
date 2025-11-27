import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
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
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";

export default function EmployeeDocsScreen() {
    const {request} = useApi();
    const [employeeActivitiesCheckIn, setEmployeeActivitiesCheckIn] = useState({});
    const [employeeActivitiesCheckOut, setEmployeeActivitiesCheckOut] = useState({});

    const [page, setPage] = useState(1);
    const [pageCheckOut, setPageCheckOut] = useState(1);

    const [projectsList, setProjectsList] = useState([]);
    const [filters, setFilters] = useState({})
    const [filterModal, setFilterModal] = useState(false)
    const {storeData, updateData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();
    const [activeTab, setActiveTab] = useState('checkIn');
    const [getDataStatus, setDataStatus] = useState(false)

    function getData(_filters = {}) {
        request({
            url: '/timekeeper/history/list/checkin',
            method: 'get',
            params: {
                ..._filters,
                page: page,
                limit: 10
            }
        }).then().catch(err => {
            // console.log(err, 'apiservice control err')
        });
    }

    function getDataCheckOut(_filters = {}) {
        request({
            url: '/timekeeper/history/list/checkout',
            method: 'get',
            params: {
                ..._filters,
                page: pageCheckOut,
                limit: 10
            }
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
        setPageCheckOut(1)
        setDataStatus(!getDataStatus)
    }

    useEffect(() => {
        setPage(1)
        setPageCheckOut(1)
    }, [filters?.full_name])

    useEffect(() => {
        if (page) {
            getData({...filters, project: filters?.project?.id})
        }
    }, [page, filters?.full_name, getDataStatus])

    useEffect(() => {
        if (pageCheckOut) {
            getDataCheckOut({...filters, project: filters?.project?.id})
        }
    }, [pageCheckOut, filters?.full_name, getDataStatus])

    useFocusEffect(useCallback(() => {
        setPage(1)
        setPageCheckOut(1)
        setActiveTab('checkIn')
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
            setFilters({})
            setPage(0)
            setPageCheckOut(0)
            setDataStatus(!getDataStatus)
            setEmployeeActivitiesCheckIn({data: []})
            setEmployeeActivitiesCheckOut({data: []})
            updateData(`GET:/timekeeper/history/list/checkin`, {data: []})
            updateData(`GET:/timekeeper/history/list/checkout`, {data: []})
        };
    }, [refreshKey]));

    useEffect(() => {
        setEmployeeActivitiesCheckIn((prevState) => {
            if (page === 1) {
                return {
                    ...(storeData?.cache?.[`GET:/timekeeper/history/list/checkin`]?.data || {})
                }
            } else {
                return {
                    ...(storeData?.cache?.[`GET:/timekeeper/history/list/checkin`]?.data || {}),
                    data: [...prevState?.data || [], ...((storeData?.cache?.[`GET:/timekeeper/history/list/checkin`]?.data || {})?.data || [])]
                }
            }
        })
    }, [storeData?.cache?.[`GET:/timekeeper/history/list/checkin`]]);

    useEffect(() => {
        setEmployeeActivitiesCheckOut((prevState) => {
            if (pageCheckOut === 1) {
                return {
                    ...storeData?.cache?.[`GET:/timekeeper/history/list/checkout`]?.data || {}
                }
            } else {
                return {
                    ...(storeData?.cache?.[`GET:/timekeeper/history/list/checkout`]?.data || {}),
                    data: [...prevState?.data || [], ...((storeData?.cache?.[`GET:/timekeeper/history/list/checkout`]?.data || {})?.data || [])]
                }
            }
        })
    }, [storeData?.cache?.[`GET:/timekeeper/history/list/checkout`]]);

    function handleMoreCheckIn() {
        setPage(page + 1);
    }

    function handleMoreCheckOut() {
        setPageCheckOut(pageCheckOut + 1);
    }


    return (
        <SgTemplateScreen
            head={
                <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
                    <SgSectionFileHead
                        title={t("history")}
                        description={t('history__description')}
                        icon="filter"
                        onPress={toggleFilterModal}
                    />
                </View>
            }
        >
            <SgFilterTab
                defaultTabId={activeTab || 'checkIn'}
                tabs={[
                    {label: t('checkIn'), id: 'checkIn', onClick: setActiveTab},
                    {label: t('checkOut'), id: 'checkOut', onClick: setActiveTab},
                ]}
                tabContent={[
                    {
                        element: (
                            <>
                                <View>
                                    <View style={{flex: 1}}>
                                        <SgInput
                                            label={t('employeeName')}
                                            placeholder={t('employeeName_placeholder')}
                                            value={filters?.full_name}
                                            name='full_name'
                                            onChangeText={handleChange}
                                        />
                                    </View>
                                </View>
                                <View style={{gap: 8}}>
                                    {((employeeActivitiesCheckIn || {}).data || [])?.map((emp, index) => (
                                        <SgSectionEmployeeCard
                                            key={index}
                                            fullData={emp}
                                            title={emp?.employee?.full_name}
                                            role={emp?.employee?.role?.name}
                                            project={emp?.project?.name}
                                            checkType={`${emp?.is_manual ? t('manual') : t('auto')} / ${emp.type === 3 ? t('overTime') : t('normal')}`}
                                            time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                            image={emp?.employee?.image}
                                            editable={false}
                                            status={emp.status}
                                            reason={emp.reject_reason}
                                        />
                                    ))}

                                    {((employeeActivitiesCheckIn || {}).total || 0) > page * 10 ?
                                        <View style={{marginTop: 16}}>
                                            <SgButton
                                                onPress={handleMoreCheckIn}
                                                bgColor={COLORS.primary}
                                                color={COLORS.white}
                                            >
                                                {t('loadMore')}
                                            </SgButton>
                                        </View>
                                        : null
                                    }
                                </View>
                            </>
                        ),
                        id: 'checkIn'
                    },
                    {
                        element: (
                            // <></>
                            <>
                                <View>
                                    <View style={{flex: 1}}>
                                        <SgInput
                                            label={t('employeeName')}
                                            placeholder={t('employeeName_placeholder')}
                                            value={filters?.full_name}
                                            name='full_name'
                                            onChangeText={handleChange}
                                        />
                                    </View>
                                </View>
                                <View style={{gap: 8}}>
                                    {((employeeActivitiesCheckOut || {}).data || [])?.map((emp, index) => (
                                        <SgSectionEmployeeCard
                                            key={index}
                                            fullData={emp}
                                            title={emp?.employee?.full_name}
                                            role={emp?.employee?.role?.name}
                                            project={emp?.project?.name}
                                            checkType={`${emp?.is_manual ? t('manual') : t('auto')} / ${emp.type === 3 ? t('overTime') : t('normal')}`}
                                            time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                            image={emp?.employee?.image}
                                            editable={false}
                                            status={emp.status}
                                            reason={emp.reject_reason}
                                        />
                                    ))}

                                    {((employeeActivitiesCheckOut || {}).total || 0) > page * 10 ?
                                        <View style={{marginTop: 16}}>
                                            <SgButton
                                                onPress={handleMoreCheckOut}
                                                bgColor={COLORS.primary}
                                                color={COLORS.white}
                                            >
                                                {t('loadMore')}
                                            </SgButton>
                                        </View>
                                        : null
                                    }
                                </View>
                            </>
                        ),
                        id: 'checkOut'
                    }
                ]}
            />

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
});