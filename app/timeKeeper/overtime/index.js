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
import {useSocket} from "@/hooks/useSocket";
import SgCheckbox from "@/components/ui/Checkbox/Checkbox";

export default function EmployeeDocsScreen() {
    const {request} = useApi();
    const [employees, setEmployees] = useState([]);
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();
    const {storeData, insertData, updateData, changeAddRowData, insertDataWithPagination} = useData();
    const {socket} = useSocket();
    const [activeTab, setActiveTab] = useState('checkIn');

    const [pageAtWork, setPageAtWork] = useState(1);
    const [pageCheckIn, setPageCheckIn] = useState(1);
    const [pageCheckOut, setPageCheckOut] = useState(1);
    const [getDataStatus, setDataStatus] = useState(false);


    const [employeeActivitiesCheckIn, setEmployeeActivitiesCheckIn] = useState({});
    const [employeeActivitiesCheckOut, setEmployeeActivitiesCheckOut] = useState({});
    const [employeeActivitiesAtWork, setEmployeeActivitiesAtWork] = useState({});

    const [filters, setFilters] = useState({});
    const [filterModal, setFilterModal] = useState(false);
    const [projectsList, setProjectsList] = useState([]);


    function getData(_filters = {}, _pageCheckIn = pageCheckIn, _limit = 10) {
        request({
            url: '/timekeeper/overtime/list/checkin',
            method: 'get',
            params: {
                page: pageCheckIn,
                limit: _limit,
                ..._filters,
            }
        }).then(res => {
        }).catch(err => {
            // console.log(err, 'apiservice control err')
        });
    }

    function getDataCheckOut(_filters = {}, _pageCheckOut = pageCheckOut, _limit = 10) {
        request({
            url: '/timekeeper/overtime/list/checkout',
            method: 'get',
            params: {
                ..._filters,
                page: pageCheckOut,
                limit: _limit
            }
        }).then(res => {
        }).catch(err => {
            // console.log(err, 'apiservice control err')
        });
    }

    function getDataAtWork(_filters = {}, _pageAtWork = pageAtWork, _limit = 10) {
        request({
            url: '/timekeeper/overtime/list/atwork',
            method: 'get',
            params: {
                ..._filters,
                page: _pageAtWork,
                limit: _limit
            }
        }).then(res => {
        }).catch(err => {
            // console.log(err, 'apiservice control err')
        });
    }

    useEffect(() => {
        if (!socket) return;

        const handler = (data) => {
            if (data?.data?.type === 3) {
                getData({...filters, project: (filters?.project || []).map(el => el.id)}, 1, 10 * pageCheckIn)
            }
            if (data?.data?.type === 4) {
                getDataCheckOut({...filters, project: (filters?.project || []).map(el => el.id)}, 1, 10 * pageCheckOut)
            }
        };
        const handler2 = (data) => {
            console.log(data, 'socket handler2')
            // removeRowData('GET:/timekeeper/activity/list', data?.data?.activity_id, 'id')
            // changeAddRowData('GET:/timekeeper/overtime/list', {
            //     completed_status: 1
            // }, data?.data?.activity_id, 'id')
            // insertData('GET:/timekeeper/overtime/list', {
            //     ...data?.data,
            //     // complete_status: 1,
            //     // confirm_time: moment(),
            //     // timezone: moment.tz.guess(),
            //     // confirm_employee_id: user?.id,
            //     // status: 2
            // })
        };

        // socket.on('connect', () => {
        socket.on("new_activity", handler);
        socket.on("update_activity", handler2);
        // })

        return () => {
            socket.off("new_activity", handler);
            socket.off("update_activity", handler2);
        };
    }, [socket, pageCheckIn, pageCheckOut, pageAtWork, getDataStatus, filters]);

    useEffect(() => {
        getData({...filters})
    }, [filters])

    useFocusEffect(useCallback(() => {
        getData()
        getDataCheckOut()
        getDataAtWork()

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
        })

        request({
            url: `/notifications/read/group`,
            method: 'post',
            data: {
                group: 'overtime'
            },
        }).then(res => {
        }).catch(err => {
            console.log(err, 'apiservice control err')
        })

        return () => {
            setEmployees([])
            setFilters({})


            setPageCheckIn(1)
            setPageCheckOut(1)
            setPageAtWork(1)
            setEmployeeActivitiesCheckIn({data: []})
            setEmployeeActivitiesCheckOut({data: []})
            setEmployeeActivitiesAtWork({data: []})
            updateData(`GET:/timekeeper/overtime/list/checkin`, {data: []})
            updateData(`GET:/timekeeper/overtime/list/checkout`, {data: []})
            updateData(`GET:/timekeeper/overtime/list/atwork`, {data: []})

            updateData(`GET:/timekeeper/overtime/list`, {data: []})
        };
    }, [refreshKey]));

    useEffect(() => {
        if (pageCheckIn) {
            getData({...filters, project: (filters?.project || []).map(el => el.id)}, 1, 10 * pageCheckIn)
        }
    }, [pageCheckIn, getDataStatus])

    useEffect(() => {
        if (pageCheckOut) {
            getDataCheckOut({...filters, project: (filters?.project || []).map(el => el.id)}, 1, 10 * pageCheckOut)
        }
    }, [pageCheckOut, getDataStatus])

    useEffect(() => {
        if (pageAtWork) {
            getDataAtWork({...filters, project: (filters?.project || []).map(el => el.id)}, 1, 10 * pageAtWork)
        }
    }, [pageAtWork, getDataStatus])

    useEffect(() => {
        setEmployeeActivitiesCheckIn((prevState) => {
                return {
                    ...(storeData?.cache?.[`GET:/timekeeper/overtime/list/checkin`]?.data || {})
                }
        })
    }, [storeData?.cache?.['GET:/timekeeper/overtime/list/checkin']])

    useEffect(() => {
        setEmployeeActivitiesCheckOut((prevState) => {
                return {
                    ...(storeData?.cache?.[`GET:/timekeeper/overtime/list/checkout`]?.data || {})
                }
        })
    }, [storeData?.cache?.['GET:/timekeeper/overtime/list/checkout']])

    useEffect(() => {
        setEmployeeActivitiesAtWork((prevState) => {
            return {
                ...(storeData?.cache?.[`GET:/timekeeper/overtime/list/atwork`]?.data || {})
            }
        })
    }, [storeData?.cache?.['GET:/timekeeper/overtime/list/atwork']])

    function handleMoreCheckIn() {
        setPageCheckIn(pageCheckIn + 1);
    }

    function handleMoreCheckOut() {
        setPageCheckOut(pageCheckOut + 1);
    }

    function handleMoreAtWork() {
        setPageAtWork(pageAtWork + 1);
    }



    function removeRowData(fullData, type) {
        getData({...filters, project: (filters?.project || []).map(el => el.id)}, 1, 10 * pageCheckIn)
        getDataCheckOut({...filters, project: (filters?.project || []).map(el => el.id)}, 1, 10 * pageCheckOut)
        getDataAtWork({...filters, project: (filters?.project || []).map(el => el.id)}, 1, 10 * pageAtWork)
    }



    function handleChange(e) {
        setFilters({...filters, [e.name]: e.value});
    }

    function toggleFilterModal() {
        setFilterModal(!filterModal);
    }

    function resetFilters() {
        setFilters({});
    }

    function handleFilters() {
        setDataStatus(!getDataStatus)
        setPageCheckIn(1)
        setPageCheckOut(1)
        setPageAtWork(1)
    }


    return (
        <SgTemplateScreen
            head={
                <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
                    <SgSectionFileHead
                        title={t("overTime")}
                        icon="filter"
                        onPress={toggleFilterModal}
                    />
                </View>

            }
        >
            <SgFilterTab
                defaultTabId={activeTab || 'checkIn'}
                tabs={[
                    {
                        label: t('checkIn'),
                        id: 'checkIn',
                        count: (employeeActivitiesCheckIn || {})?.total,
                        onClick: setActiveTab
                    },
                    {
                        label: t('checkOut'),
                        id: 'checkOut',
                        count: (employeeActivitiesCheckOut || {})?.total,
                        onClick: setActiveTab
                    },
                    {
                        label: t('atWork'),
                        id: 'atWork',
                        count: (employeeActivitiesAtWork || {})?.total,
                        onClick: setActiveTab
                    }
                ]}
                tabContent={[
                    {
                        element:
                            <>
                                <View style={{gap: 8}}>
                                    {(((employeeActivitiesCheckIn || {})?.data || [])?.map((emp, index) => {
                                        return (
                                            <SgSectionEmployeeCard
                                                cardType={'checkIn'}
                                                removeRowData={removeRowData}
                                                key={index}
                                                fullData={emp}
                                                title={emp?.employee?.full_name}
                                                role={emp?.employee?.role?.name}
                                                project={emp?.project?.name}
                                                checkType={emp?.is_manual ? t('manual') : t('auto')}
                                                time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                                overTime={true}
                                            />
                                        )
                                    }))}
                                    {((employeeActivitiesCheckIn || {})?.total || 0) > pageCheckIn * 10 ?
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
                            </>,
                        id: 'checkIn'
                    },
                    {
                        element:
                            <>
                                <View style={{gap: 8}}>
                                    {(((employeeActivitiesCheckOut || {})?.data || [])?.map((emp, index) => {
                                        return (
                                            <SgSectionEmployeeCard
                                                cardType={'checkOut'}
                                                removeRowData={removeRowData}
                                                key={index}
                                                fullData={emp}
                                                title={emp?.employee?.full_name}
                                                role={emp?.employee?.role?.name}
                                                project={emp?.project?.name}
                                                checkType={emp?.is_manual ? t('manual') : t('auto')}
                                                time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                                overTime={true}
                                            />
                                        )
                                    }))}

                                    {((employeeActivitiesCheckOut || {})?.total || 0) > pageCheckOut * 10 ?
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
                            </>,
                        id: 'checkOut'
                    },
                    {
                        element:
                            <>
                                <View style={{gap: 8}}>
                                    {(((employeeActivitiesAtWork || {})?.data || [])?.map((emp, index) => {
                                        return (
                                            <SgSectionEmployeeCard
                                                cardType={'atWork'}
                                                removeRowData={removeRowData}
                                                key={index}
                                                fullData={emp}
                                                atWork={true}
                                                title={emp?.employee?.full_name}
                                                role={emp?.employee?.role?.name}
                                                project={emp?.project?.name}
                                                checkType={emp?.is_manual ? t('manual') : t('auto')}
                                                time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                                timeRaw={emp.request_time}
                                                editable={false}
                                                overTime={true}
                                            />
                                        )
                                    }))}

                                    {((employeeActivitiesAtWork || {})?.total || 0) > pageAtWork * 10 ?
                                        <View style={{marginTop: 16}}>
                                            <SgButton
                                                onPress={handleMoreAtWork}
                                                bgColor={COLORS.primary}
                                                color={COLORS.white}
                                            >
                                                {t('loadMore')}
                                            </SgButton>
                                        </View>
                                        : null
                                    }
                                </View>
                            </>,
                        id: 'atWork'
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
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.checkboxContainer}
                                onPress={() => {
                                    console.log('subcontractors', filters?.subcontractors)
                                    handleChange({
                                        name: 'subcontractors',
                                        value: filters?.subcontractors ? 0 : 1
                                    })
                                }}
                            >
                                <SgCheckbox
                                    checked={filters?.subcontractors === 1}
                                    onToggle={() => handleChange({
                                        name: 'subcontractors',
                                        value: filters?.subcontractors ? 0 : 1,
                                    })}
                                />
                                <Text style={styles.checkboxLabel}>{t('subcontractors')}</Text>
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
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 20,
        color: COLORS.gray_800
    },
});