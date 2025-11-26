import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import COLORS from "@/constants/colors";
import React, {useCallback, useEffect, useState} from "react";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import moment from "moment/moment";
import {useApi} from "@/hooks/useApi";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";
import SgPopup from "@/components/ui/Modal/Modal";
import SgButton from "@/components/ui/Button/Button";
import ReloadArrow from "@/assets/images/reload-arrows.svg";
import SgSelect from "@/components/ui/Select/Select";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import SgInput from "@/components/ui/Input/Input";
import FilterIcon from "@/assets/images/filter.svg";

export default function TimeKeeperUserScreen() {
    const { request } = useApi();
    const [employeeActivities, setEmployeeActivities] = useState({});
    const [projectsList, setProjectsList] = useState([]);
    const [filters, setFilters] = useState({})
    const [filterModal, setFilterModal] = useState(false)
    const {storeData, updateData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation()
    const [page, setPage] = useState(1);
    const [getDataStatus, setDataStatus] = useState(false)

    function toggleFilterModal() {
        setFilterModal(!filterModal);
    }

    function resetFilters() {
        setFilters({});
    }

    function handleChange(e) {
        setFilters({...filters, [e.name]: e.value});
    }

    function getData() {
        request({
            url: `/timekeeper/activity/checkin`,
            method: 'get',
            params: {
                start_date: moment().startOf('day').format(),
                end_date: moment().endOf('day').format(),
                project: filters?.project?.id,
                full_name: filters?.full_name,
                page,
                limit: 10
            },
        }).then().catch(err => {
            // console.log(err, 'apiservice control err')
        });
    }

    function handleFilters() {
        setPage(1);
        setDataStatus(!getDataStatus);
    }

    useEffect(() => {
        setPage(1);
        setDataStatus(!getDataStatus);
    }, [filters?.full_name])

    useEffect(() => {
        if (page) {
            getData()
        }
    }, [page, getDataStatus])

    useFocusEffect(useCallback(() => {
        getData()

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
            setPage(null)
            setProjectsList([])
            setEmployeeActivities({data: []})
            updateData(`GET:/timekeeper/activity/checkin`, {data: []})
        };
    }, [refreshKey]));

    useEffect(() => {
        setEmployeeActivities((prevState) => {
            if (page === 1) {
                return {
                    ...(storeData?.cache?.[`GET:/timekeeper/activity/checkin`]?.data || {})
                }
            }
            else {
                return {
                    ...(storeData?.cache?.[`GET:/timekeeper/activity/checkin`]?.data || {}),
                    data: [...prevState?.data || [], ...((storeData?.cache?.[`GET:/timekeeper/activity/checkin`]?.data || {})?.data || [])]
                }
            }
        })
    }, [storeData?.cache?.[`GET:/timekeeper/activity/checkin`]])

    function handleMoreCheckIn() {
        setPage(page + 1);
    }

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('dailyCheckIn'),
            }} filter={
                <Pressable style={styles.iconWrapper} onPress={toggleFilterModal}>
                <Text><FilterIcon width={20} height={20} /></Text>
            </Pressable>} />}
        >
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
                {((employeeActivities || {})?.data || [])?.map((emp, index) => (
                    <SgSectionEmployeeCard
                        key={index}
                        fullData={emp}
                        title={emp?.employee?.full_name}
                        role={emp?.employee?.role?.name}
                        position={emp?.employee?.position}
                        time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                        image={emp?.employee?.image}
                        editable={false}
                        project={emp?.project?.name}
                        status={emp.status}
                        reason={emp.reject_reason}
                    />
                ))}

                {((employeeActivities || {}).total || 0) > page * 10 ?
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
                        {/*<View style={{flex: 1}}>
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
                        </View>*/}
                    </View>
                </View>
            </SgPopup>
        </SgTemplateScreen>
    )
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
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand_50,
        padding: 14,
        borderRadius: 50,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    overviewButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    overviewButtonText: {
        color: '#000000',
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 16,
        // lineHeight: '24px',
    },
    container: {
        flex: 1,
    },
    contentText: {
        fontSize: 16,
    },
    acceptButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: COLORS.brand_50,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    acceptButtonText: {
        fontFamily: 'Inter',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 14,
        color: COLORS.brand_600,
    },
    rejectButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: COLORS.error_100,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    rejectButtonText: {
        fontFamily: 'Inter',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 14,
        color: COLORS.error_600,
    },
    rejectModal: {
        fontFamily: "Inter",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 30,
        marginBottom: 32,
        textAlign: "center",
    },
});