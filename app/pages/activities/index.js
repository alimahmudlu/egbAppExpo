import {Linking, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import FilterIcon from "@/assets/images/filter.svg";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import InfoCircleModalIcon from "@/assets/images/infoCircleModal.svg";
import SgCard from "@/components/ui/Card/Card";

export default function TimeKeeperUserScreen() {
    const { request } = useApi();
    const [employeeActivities, setEmployeeActivities] = useState([]);
    const [employeeWorkHours, setEmployeeWorkHours] = useState([]);
    const [projectsList, setProjectsList] = useState([]);
    const [filters, setFilters] = useState({
        start_date: moment().startOf('month'),
        end_date: moment().endOf('month')
    })
    const [filterModal, setFilterModal] = useState(false)

    const [selectedRow, setSelectedRow] = useState(null)
    const [rejectModal, setRejectModal] = useState(false)

    const {storeData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation()

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
        request({
            url: `/currentUser/activities/list`,
            method: 'get',
            params: {
                ...filters,
                checkStatus: filters?.checkStatus?.id,
                checkType: filters?.checkType?.id
            },
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });
        request({
            url: `/currentUser/activities/work_hours`,
            method: 'get',
            params: {
                ...filters,
                checkStatus: filters?.checkStatus?.id,
                checkType: filters?.checkType?.id
            },
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });
        toggleFilterModal();
    }

    useFocusEffect(useCallback(() => {
        request({
            url: `/currentUser/activities/list`,
            method: 'get',
            params: {
                ...filters,
                checkStatus: filters?.checkStatus?.id,
                checkType: filters?.checkType?.id
            },
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });
        request({
            url: `/currentUser/activities/work_hours`,
            method: 'get',
            params: {
                ...filters,
                checkStatus: filters?.checkStatus?.id,
                checkType: filters?.checkType?.id
            },
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });

        request({
            url: `/timekeeper/options/projects`, method: 'get',
        }).then(res => {
            if (res.success) {
                setProjectsList(res?.data);
            } else {
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
        setEmployeeActivities(storeData?.cache?.[`GET:/currentUser/activities/list`]?.data)
    }, [storeData?.cache?.[`GET:/currentUser/activities/list`]])

    useEffect(() => {
        setEmployeeWorkHours(storeData?.cache?.[`GET:/currentUser/activities/work_hours`]?.data)
    }, [storeData?.cache?.[`GET:/currentUser/activities/work_hours`]])

    const openMap = (lat, lng) => {
        const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        const url = Platform.OS === 'ios'
            ? `${scheme}?q=${lat},${lng}`
            : `${scheme}${lat},${lng}`;

        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

        if (Platform.OS === 'ios') {
            Linking.openURL(url)
        } else {
            Linking.openURL(googleMapsUrl);
        }
    };

    function handleSelectRow(item) {
        setSelectedRow(item);
        setRejectModal(!!item);
    }

    const getStatusBadgeStyle = (statusKey) => {
        if (statusKey?.includes('Rejected') || statusKey?.includes('rejected')) {
            return styles.badgeError;
        }
        if (statusKey?.includes('Completed') || statusKey?.includes('completed')) {
            return styles.badgeSuccess;
        }
        return styles.badgeDefault;
    };

    const getStatusTextStyle = (statusKey) => {
        if (statusKey?.includes('Rejected') || statusKey?.includes('rejected')) {
            return styles.badgeErrorText;
        }
        if (statusKey?.includes('Completed') || statusKey?.includes('completed')) {
            return styles.badgeSuccessText;
        }
        return styles.badgeDefaultText;
    };

    const RenderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.statusBadgeContainer}>
                <View style={[styles.statusBadge, getStatusBadgeStyle(item?.activity_status_key)]}>
                    <Text style={[styles.statusBadgeText, getStatusTextStyle(item?.activity_status_key)]}>
                        {t(item?.activity_status_key)}
                    </Text>
                </View>
            </View>

            <View style={styles.rowBetween}>
                <View style={styles.flex1}>
                    <Text style={styles.label}>{t('checkInDate')}</Text>
                    <Text style={styles.value}>{item.entry_time ? moment(item.entry_time).format("YYYY-MM-DD HH:mm") : '---'}</Text>
                </View>
                <View style={[styles.flex1, styles.alignRight]}>
                    <Text style={styles.label}>{t('checkOutDate')}</Text>
                    <Text style={[styles.value, styles.textRight]}>{item.exit_time ? moment(item.exit_time).format("YYYY-MM-DD HH:mm") : '---'}</Text>
                </View>
            </View>

            <View style={styles.rowBetween}>
                <View style={styles.flex1}>
                    <Text style={styles.label}>{t('checkInBy')}</Text>
                    <Text style={styles.value}>{item.check_in_timekeeper ? item.check_in_timekeeper : '---'}</Text>
                </View>
                <View style={[styles.flex1, styles.alignRight]}>
                    <Text style={styles.label}>{t('checkOutBy')}</Text>
                    <Text style={[styles.value, styles.textRight]}>{item.check_out_timekeeper ? item.check_out_timekeeper : '---'}</Text>
                </View>
            </View>

            <View style={styles.rowBetween}>
                <View style={styles.flex1}>
                    <Text style={styles.label}>{t('checkInStatus')}</Text>
                    <Text style={styles.value}>
                        {item.entry_status === 1 && t('waiting')}
                        {item.entry_status === 2 && t('accepted')}
                        {item.entry_status === 3 && (
                            <TouchableOpacity onPress={() => handleSelectRow(item)} activeOpacity={0.7}>
                                <Text style={styles.link}>{t('rejected')}</Text>
                            </TouchableOpacity>
                        )}
                        {item.entry_status === null && ('--')}
                    </Text>
                </View>
                <View style={[styles.flex1, styles.alignRight]}>
                    <Text style={styles.label}>{t('checkOutStatus')}</Text>
                    <Text style={[styles.value, styles.textRight]}>
                        {item.exit_status === 1 && t('waiting')}
                        {item.exit_status === 2 && t('accepted')}
                        {item.exit_status === 3 && (
                            <TouchableOpacity onPress={() => handleSelectRow(item)} activeOpacity={0.7}>
                                <Text style={styles.link}>{t('rejected')}</Text>
                            </TouchableOpacity>
                        )}
                        {item.exit_status === null && ('--')}
                    </Text>
                </View>
            </View>

            <View style={styles.rowBetween}>
                <View style={styles.flex1}>
                    <Text style={styles.label}>{t('checkStatus')}</Text>
                    <Text style={styles.value}>
                        {item.entry_manual ? t('Manual') : t('Auto')}
                    </Text>
                </View>
                <View style={[styles.flex1, styles.alignRight]}>
                    <Text style={styles.label}>{t('checkType')}</Text>
                    <Text style={[styles.value, styles.textRight]}>
                        {item.entry_type === 1 && t('Normal')}
                        {item.entry_type === 3 && t('OverTime')}
                    </Text>
                </View>
            </View>

            <View style={styles.workHoursBadgeContainer}>
                <View style={styles.workHoursBadge}>
                    <Text style={styles.workHoursBadgeText}>{t('workHours')}: {item.work_duration || '00:00'}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('activities'),
            }} filter={
                <TouchableOpacity style={styles.iconWrapper} onPress={toggleFilterModal} activeOpacity={0.7}>
                    <FilterIcon width={20} height={20} color={COLORS.brand_950} fill={COLORS.brand_950} />
                </TouchableOpacity>
            } />}
        >

            <SgFilterTab
                defaultTabId='checkIn'
                tabs={[
                    {label: t('checkIn'), id: 'checkIn'},
                    {label: t('checkOut'), id: 'checkOut'},
                    {label: t('workTime'), id: 'workHours'},
                ]}
                tabContent={[
                    {
                        element: (
                            <View style={styles.listContainer}>
                                {employeeActivities?.filter(el => (el.type === 1 || el.type === 3)).length > 0 ? (
                                    employeeActivities?.filter(el => (el.type === 1 || el.type === 3)).map((emp, index) => (
                                        <SgSectionEmployeeCard
                                            key={index}
                                            fullData={emp}
                                            title={emp?.employee?.full_name}
                                            role={emp?.employee?.role?.name}
                                            checkType={`${emp?.is_manual ? t('manual') : t('auto')} / ${emp.type === 3 ? t('overTime') : t('normal')}`}
                                            time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                            image={emp?.employee?.image}
                                            editable={false}
                                            status={emp.status}
                                            reason={emp.reject_reason}
                                            project={emp?.project?.name}
                                        />
                                    ))
                                ) : (
                                    <View style={styles.emptyState}>
                                        <Text style={styles.emptyStateText}>{t('noActivities')}</Text>
                                    </View>
                                )}
                            </View>
                        ),
                        id: 'checkIn'
                    },
                    {
                        element: (
                            <View style={styles.listContainer}>
                                {employeeActivities?.filter(el => (el.type === 2 || el.type === 4)).length > 0 ? (
                                    employeeActivities?.filter(el => (el.type === 2 || el.type === 4)).map((emp, index) => (
                                        <SgSectionEmployeeCard
                                            key={index}
                                            fullData={emp}
                                            title={emp?.employee?.full_name}
                                            role={emp?.employee?.role?.name}
                                            checkType={`${emp?.is_manual ? t('manual') : t('auto')} / ${emp.type === 3 ? t('overTime') : t('normal')}`}
                                            time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                            image={emp?.employee?.image}
                                            editable={false}
                                            status={emp.status}
                                            reason={emp.reject_reason}
                                            project={emp?.project?.name}
                                        />
                                    ))
                                ) : (
                                    <View style={styles.emptyState}>
                                        <Text style={styles.emptyStateText}>{t('noActivities')}</Text>
                                    </View>
                                )}
                            </View>
                        ),
                        id: 'checkOut'
                    },
                    {
                        element: (
                            <View style={styles.listContainer}>
                                {employeeWorkHours?.length > 0 ? (
                                    employeeWorkHours?.map((item, index) => (
                                        <RenderItem
                                            key={index}
                                            item={item}
                                        />
                                    ))
                                ) : (
                                    <View style={styles.emptyState}>
                                        <Text style={styles.emptyStateText}>{t('noActivities')}</Text>
                                    </View>
                                )}
                            </View>
                        ),
                        id: 'workHours'
                    }
                ]}
            />


            <SgPopup
                visible={filterModal}
                onClose={toggleFilterModal}
                title={t('filters')}
                footerButton={
                    <SgButton
                        onPress={handleFilters}
                        bgColor={COLORS.brand_950}
                        color={COLORS.white}
                    >
                        {t('accept')}
                    </SgButton>
                }
            >
                <View style={styles.filterContent}>
                    <View style={styles.filterHeader}>
                        <TouchableOpacity
                            onPress={resetFilters}
                            style={styles.clearFiltersButton}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.clearFiltersText}>{t('clearFilters')}</Text>
                            <ReloadArrow width={16} height={16} color={COLORS.brand_700} fill={COLORS.brand_700} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.filterFields}>
                        <View style={styles.filterField}>
                            <SgDatePicker
                                label={t('startDate')}
                                placeholder="dd/mm/yyyy - hh/mm"
                                value={filters?.start_date}
                                name='start_date'
                                onChangeText={handleChange}
                            />
                        </View>
                        <View style={styles.filterField}>
                            <SgDatePicker
                                label={t('endDate')}
                                placeholder="dd/mm/yyyy - hh/mm"
                                value={filters?.end_date}
                                name='end_date'
                                onChangeText={handleChange}
                            />
                        </View>
                        <View style={styles.filterField}>
                            <SgSelect
                                label={t("checkStatus")}
                                placeholder={t("enterCheckStatus")}
                                modalTitle={t("selectCheckStatus")}
                                value={filters?.checkStatus}
                                name='checkStatus'
                                onChangeText={handleChange}
                                list={[
                                    {
                                        id: 1,
                                        name: t('Manual'),
                                        render: <View><Text>{t('Manual')}</Text></View>
                                    },
                                    {
                                        id: 2,
                                        name: t('Auto'),
                                        render: <View><Text>{t('Auto')}</Text></View>
                                    }
                                ]}
                            />
                        </View>
                        <View style={styles.filterField}>
                            <SgSelect
                                label={t("checkType")}
                                placeholder={t("enterCheckType")}
                                modalTitle={t("selectCheckType")}
                                value={filters?.checkType}
                                name='checkType'
                                onChangeText={handleChange}
                                list={[
                                    {
                                        id: 1,
                                        name: t('Normal'),
                                        render: <View><Text>{t('Normal')}</Text></View>
                                    },
                                    {
                                        id: 3,
                                        name: t('OverTime'),
                                        render: <View><Text>{t('OverTime')}</Text></View>
                                    }
                                ]}
                            />
                        </View>
                    </View>
                </View>
            </SgPopup>

            <SgPopup
                visible={rejectModal}
                onClose={() => handleSelectRow(null)}
                icon={<InfoCircleModalIcon width={50} height={50}/>}
                title={t('rejectDetail')}
            >
                <SgCard contentDescription={selectedRow?.entry_reject_reason || selectedRow?.exit_reject_reason || ''} />
            </SgPopup>
        </SgTemplateScreen>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.gray_100,
        shadowColor: COLORS.brand_950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
        gap: 14,
    },
    listContainer: {
        gap: 12,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    flex1: {
        flex: 1,
    },
    alignRight: {
        alignItems: "flex-end",
    },
    textRight: {
        textAlign: "right",
    },
    label: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        color: COLORS.gray_500,
        marginBottom: 2,
    },
    value: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 18,
        color: COLORS.gray_900,
    },
    link: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.error_600,
        textDecorationLine: "underline",
    },
    statusBadgeContainer: {
        alignItems: "center",
    },
    statusBadge: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    badgeDefault: {
        backgroundColor: COLORS.brand_50,
    },
    badgeSuccess: {
        backgroundColor: COLORS.success_50,
    },
    badgeError: {
        backgroundColor: COLORS.error_50,
    },
    statusBadgeText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 18,
    },
    badgeDefaultText: {
        color: COLORS.brand_950,
    },
    badgeSuccessText: {
        color: COLORS.success_700,
    },
    badgeErrorText: {
        color: COLORS.error_700,
    },
    workHoursBadgeContainer: {
        alignItems: "center",
        marginTop: 4,
    },
    workHoursBadge: {
        backgroundColor: COLORS.gray_100,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
    },
    workHoursBadgeText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 20,
        color: COLORS.gray_800,
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand_50,
        padding: 12,
        borderRadius: 12,
    },
    filterContent: {
        paddingBottom: 8,
    },
    filterHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 16,
    },
    clearFiltersButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: COLORS.brand_50,
        borderRadius: 10,
    },
    clearFiltersText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.brand_700,
    },
    filterFields: {
        gap: 16,
    },
    filterField: {
        flex: 1,
    },
    emptyState: {
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyStateText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        fontWeight: '400',
        color: COLORS.gray_500,
    },
});
