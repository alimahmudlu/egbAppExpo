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

export default function EmployeeDocsScreen() {
    const {request} = useApi();
    const [employees, setEmployees] = useState([]);
    const [projectsList, setProjectsList] = useState([]);
    const [filters, setFilters] = useState({})
    const [filterModal, setFilterModal] = useState(false)
    const {storeData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();

    function getData(_filters = {}) {
        request({
            url: '/timekeeper/manual/list',
            method: 'get',
            params: {..._filters}
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
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
        getData({...filters, project: filters?.project?.id})
    }

    useEffect(() => {
        getData({...filters, project: filters?.project?.id})
    }, [filters?.full_name, filters?.project?.id])

    useFocusEffect(useCallback(() => {
        getData();

        request({
            url: `/timekeeper/options/projects`, method: 'get',
        }).then(res => {
            if (res.success) {
                setProjectsList(res?.data);
            } else {
                // Handle error response
                console.log(res.message);
            }
        }).catch(err => {
            console.log(err);
        })

        return () => {
            console.log('Home tab lost focus');
        };
    }, [refreshKey]));

    useEffect(() => {
        setEmployees(storeData?.cache?.[`GET:/timekeeper/manual/list`]?.data)
    }, [storeData?.cache?.[`GET:/timekeeper/manual/list`]]);


    return (
        <SgTemplateScreen
            head={
                <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
                    <SgSectionFileHead
                        title={t("manualCheckInAndCheckOut")}
                    />
                </View>

            }
        >
            <View>
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
                    <ReloadArrow width={18} height={18} style={{marginLeft: 7}}/>
                </SgButton>
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
                                staffData={project?.members || []}
                                id={project.id}
                            />
                        }))}
                    />
                </View>
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
            <View>
                {employees?.map((emp, index) => (
                    <SgSectionEmployeeCard
                        key={index}
                        fullData={emp}
                        title={emp?.full_name}
                        role={emp?.role?.name}
                        time={emp.request_time ? moment(emp.request_time).format('MM-DD-YYYY HH:mm') : ""}
                        image={emp?.image}
                        editable={true}
                        manual={true}
                    />
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
                                        staffData={project?.members || []}
                                        id={project.id}
                                    />
                                }))}
                            />
                        </View>
                        {/*<View style={{flex: 1}}>*/}
                        {/*    <SgDatePicker*/}
                        {/*        label={t('startDate')}*/}
                        {/*        placeholder="dd/mm/yyyy - hh/mm"*/}
                        {/*        value={filters?.start_date}*/}
                        {/*        name='start_date'*/}
                        {/*        onChangeText={handleChange}*/}
                        {/*    />*/}
                        {/*</View>*/}
                        {/*<View style={{flex: 1}}>*/}
                        {/*    <SgDatePicker*/}
                        {/*        label={t('endDate')}*/}
                        {/*        placeholder="dd/mm/yyyy - hh/mm"*/}
                        {/*        value={filters?.end_date}*/}
                        {/*        name='end_date'*/}
                        {/*        onChangeText={handleChange}*/}
                        {/*    />*/}
                        {/*</View>*/}
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