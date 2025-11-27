import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
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

export default function EmployeeDocsScreen() {
    const {request} = useApi();
    const [employees, setEmployees] = useState([]);
    const [filters, setFilters] = useState({})
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();
    const {storeData, insertData, updateData, changeAddRowData, setStoreData} = useData();
    const {socket} = useSocket()

    function getData(_filters = {}) {
        request({
            url: '/timekeeper/overtime/list',
            method: 'get',
            params: {..._filters}
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });
    }

    useEffect(() => {
        if (!socket) return;

        const handler = (data) => {
            insertData('GET:/timekeeper/overtime/list', data?.data)
        };
        const handler2 = (data) => {
            console.log('update_activity', data?.data)
            // removeRowData('GET:/timekeeper/activity/list', data?.data?.activity_id, 'id')
            changeAddRowData('GET:/timekeeper/overtime/list', {
                completed_status: 1
            }, data?.data?.activity_id, 'id')
            insertData('GET:/timekeeper/overtime/list', {
                ...data?.data,
                // complete_status: 1,
                // confirm_time: moment(),
                // timezone: moment.tz.guess(),
                // confirm_employee_id: user?.id,
                // status: 2
            })
        };

        // socket.on('connect', () => {
        socket.on("new_activity", handler);
        socket.on("update_activity", handler2);
        // })

        return () => {
            socket.off("new_activity", handler);
            socket.off("update_activity", handler2);
        };
    }, [socket]);

    useEffect(() => {
        getData({...filters})
    }, [filters])

    useFocusEffect(useCallback(() => {
        getData();

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
            updateData(`GET:/timekeeper/overtime/list`, {data: []})
        };
    }, [refreshKey]));

    useEffect(() => {
        setEmployees(storeData?.cache?.[`GET:/timekeeper/overtime/list`]?.data)
    }, [storeData?.cache?.[`GET:/timekeeper/overtime/list`]]);


    function removeRowData(fullData, type) {
        getData({...filters})
    }


    return (
        <SgTemplateScreen
            head={
                <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
                    <SgSectionFileHead
                        title={t("overTime")}
                    />
                </View>

            }
        >
            <SgFilterTab
                defaultTabId='checkIn'
                tabs={[
                    {
                        label: t('checkIn'),
                        id: 'checkIn',
                        count: employees?.filter(el => el.type === 3 && el.status === 1)?.length
                    },
                    {
                        label: t('checkOut'),
                        id: 'checkOut',
                        count: employees?.filter(el => el.type === 4 && el.status === 1)?.length
                    },
                    {
                        label: t('atWork'),
                        id: 'atWork',
                        count: employees?.filter(el => el.type === 3 && el.status === 2 && el.completed_status === 0)?.length
                    }
                ]}
                tabContent={[
                    {
                        element: (employees?.filter(el => el.type === 3 && el.status === 1).map((emp, index) => (
                            <SgSectionEmployeeCard
                                removeRowData={removeRowData}
                                key={index}
                                fullData={emp}
                                title={emp?.employee?.full_name}
                                role={emp?.employee?.role?.name}
                                project={emp?.project?.name}
                                checkType={emp?.is_manual ? t('manual') : t('auto')}
                                time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                image={emp?.employee?.image}
                                overTime={true}
                            />))), id: 'checkIn'
                    },
                    {
                        element: (employees?.filter(el => el.type === 4 && el.status === 1).map((emp, index) => (
                            <SgSectionEmployeeCard
                                removeRowData={removeRowData}
                                key={index}
                                fullData={emp}
                                title={emp?.employee?.full_name}
                                role={emp?.employee?.role?.name}
                                project={emp?.project?.name}
                                checkType={emp?.is_manual ? t('manual') : t('auto')}
                                time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                image={emp?.employee?.image}
                                overTime={true}
                            />))), id: 'checkOut'
                    },
                    {
                        element: (employees?.filter(el => el.type === 3 && el.status === 2 && el.completed_status === 0).map((emp, index) => (
                            <SgSectionEmployeeCard
                                removeRowData={removeRowData}
                                key={index}
                                fullData={emp}
                                title={emp?.employee?.full_name}
                                role={emp?.employee?.role?.name}
                                project={emp?.project?.name}
                                checkType={emp?.is_manual ? t('manual') : t('auto')}
                                time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                image={emp?.employee?.image}
                                overTime={true}
                                editable={false}
                                atWork={true}
                            />))), id: 'atWork'
                    }
                ]}
            />
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