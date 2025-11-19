import {FlatList, Linking, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import SgSectionStatusCard from "@/components/sections/StatusCard/StatusCard";
import LogIn from "@/assets/images/log-in_20.svg";
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
            params: filters,
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });
        request({
            url: `/currentUser/activities/work_hours`,
            method: 'get',
            params: filters,
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });
    }

    useFocusEffect(useCallback(() => {
        request({
            url: `/currentUser/activities/list`,
            method: 'get',
            params: filters,
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });
        request({
            url: `/currentUser/activities/work_hours`,
            method: 'get',
            params: filters,
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });

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
        setEmployeeActivities(storeData?.cache?.[`GET:/currentUser/activities/list`]?.data)
    }, [storeData?.cache?.[`GET:/currentUser/activities/list`]])

    useEffect(() => {
        setEmployeeWorkHours(storeData?.cache?.[`GET:/currentUser/activities/work_hours`]?.data)
    }, [storeData?.cache?.[`GET:/currentUser/activities/work_hours`]])

    const openMap = (lat, lng) => {
        // const url = `https://www.google.com/maps?q=${lat},${lng}`;
        // Linking.openURL(url);

        const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        const url = Platform.OS === 'ios'
            ? `${scheme}?q=${lat},${lng}`
            : `${scheme}${lat},${lng}`;

        // For Google Maps specific URL
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

        // Open the map based on platform
        if (Platform.OS === 'ios') {
            // On iOS, give option to choose between Apple Maps and Google Maps
            Linking.openURL(url)
        } else {
            // On Android, directly open Google Maps
            Linking.openURL(googleMapsUrl);
        }
    };

    function handleSelectRow(item) {
        setSelectedRow(item);
        setRejectModal(!!item);
    }

    const RenderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.center}>
                <Text style={styles.badge2}>{t(item?.activity_status_key)}</Text>
            </View>

            <View style={styles.rowBetween}>
                <View style={styles.flex1}>
                    <Text style={styles.label}>{t('checkInDate')}</Text>
                    <Text style={styles.value}>{item.entry_time ? moment(item.entry_time).format("YYYY-MM-DD HH:mm") : '---'}</Text>
                </View>
                <View style={[styles.flex1, styles.alignRight]}>
                    <Text style={styles.label}>{t('checkOutDate')}</Text>
                    <Text style={styles.value}>{item.exit_time ? moment(item.exit_time).format("YYYY-MM-DD HH:mm") : '---'}</Text>
                </View>
            </View>

            <View style={[styles.rowBetween]}>
                {item.entry_latitude ?
                    <TouchableOpacity onPress={() => openMap(item.entry_latitude, item.entry_longitude)}>
                        <Text style={styles.link}>{t('checkInLocation')}</Text>
                    </TouchableOpacity>
                    :
                    <Text>---</Text>
                }
                {item.exit_latitude ?
                    <TouchableOpacity onPress={() => openMap(item.exit_latitude, item.exit_longitude)}>
                        <Text style={styles.link}>{t('checkOutLocation')}</Text>
                    </TouchableOpacity>
                    :
                    <Text>---</Text>
                }
            </View>

            <View style={styles.rowBetween}>
                <View style={styles.flex1}>
                    <Text style={styles.label}>{t('checkInBy')}</Text>
                    <Text style={styles.value}>{item.check_in_timekeeper ? item.check_in_timekeeper : '---'}</Text>
                </View>
                <View style={[styles.flex1, styles.alignRight]}>
                    <Text style={styles.label}>{t('checkOutBy')}</Text>
                    <Text style={{...styles.value, textAlign: "right"}}>{item.check_out_timekeeper ? item.check_out_timekeeper : '---'}</Text>
                </View>
            </View>

            <View style={styles.rowBetween}>
                <View style={styles.flex1}>
                    <Text style={styles.label}>{t('checkInStatus')}</Text>
                    <Text style={styles.value}>
                        {item.entry_status === 1 && t('waiting')}
                        {item.entry_status === 2 && t('accepted')}
                        {item.entry_status === 3 && (
                            <TouchableOpacity onPress={() => handleSelectRow(item)}>
                                <Text style={styles.link}>{t('rejected')}</Text>
                            </TouchableOpacity>
                        )}
                        {item.entry_status === null && ('--')}
                    </Text>
                </View>
                <View style={[styles.flex1, styles.alignRight]}>
                    <Text style={styles.label}>{t('checkOutStatus')}</Text>
                    <Text style={{...styles.value, textAlign: "right"}}>
                        {item.exit_status === 1 && t('waiting')}
                        {item.exit_status === 2 && t('accepted')}
                        {item.exit_status === 3 && (
                            <TouchableOpacity onPress={() => handleSelectRow(item)}>
                                <Text style={styles.link}>{t('rejected')}</Text>
                            </TouchableOpacity>
                        )}
                        {item.exit_status === null && ('--')}
                    </Text>
                </View>
            </View>

            <View style={styles.center}>
                <Text style={styles.badge}>{t('workHours')}: {item.work_duration || '00:00'}</Text>
            </View>
        </View>
    );

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('activities'),
            }} filter={
                <Pressable style={styles.iconWrapper} onPress={toggleFilterModal}>
                <Text><FilterIcon width={20} height={20} /></Text>
            </Pressable>} />}
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
                            <>
                                <View>
                                    {employeeActivities?.filter(el => el.type === 1).map((emp, index) => (
                                        <SgSectionEmployeeCard
                                            key={index}
                                            fullData={emp}
                                            title={emp?.employee?.full_name}
                                            role={emp?.employee?.role?.name}
                                            checkType={emp?.employee?.manual ? t('manual') : t('auto')}
                                            time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                            image={emp?.employee?.image}
                                            editable={false}
                                            status={emp.status}
                                            reason={emp.reject_reason}
                                            project={emp?.project?.name}
                                        />
                                    ))}
                                </View>
                            </>
                        ),
                        id: 'checkIn'
                    },
                    {
                        element: (
                            <>
                                <View>
                                    {employeeActivities?.filter(el => el.type === 2).map((emp, index) => (
                                        <SgSectionEmployeeCard
                                            key={index}
                                            fullData={emp}
                                            title={emp?.employee?.full_name}
                                            role={emp?.employee?.role?.name}
                                            checkType={emp?.employee?.manual ? t('manual') : t('auto')}
                                            time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                                            image={emp?.employee?.image}
                                            editable={false}
                                            status={emp.status}
                                            reason={emp.reject_reason}
                                            project={emp?.project?.name}
                                        />
                                    ))}
                                </View>
                            </>
                        ),
                        id: 'checkOut'
                    },
                    {
                        element: (
                            <>
                                <View>
                                    {employeeWorkHours?.map((item, index) => (
                                        <RenderItem
                                            key={index}
                                            item={item}
                                        />
                                    ))}
                                    {/*{employeeWorkHours?.map((item, index) => (*/}
                                    {/*    <View key={index} style={{flexDirection: 'row', gap: 12, alignItems: 'stretch'}}>*/}
                                    {/*        <View style={{flex: 1,}}>*/}
                                    {/*            <SgSectionStatusCard*/}
                                    {/*                mapData={{*/}
                                    {/*                    latitude: item?.entry_latitude,*/}
                                    {/*                    longitude: item?.entry_longitude,*/}
                                    {/*                }}*/}
                                    {/*                title={t('checkIn')}*/}
                                    {/*                time={moment(item.entry_time).format('YYYY-MM-DD HH:mm')}*/}
                                    {/*                icon={<LogIn width={20} height={20}/>}*/}
                                    {/*            />*/}
                                    {/*        </View>*/}
                                    {/*        <View style={{flex: 1}}>*/}
                                    {/*            <SgSectionStatusCard*/}
                                    {/*                mapData={{*/}
                                    {/*                    latitude: item?.exit_latitude,*/}
                                    {/*                    longitude: item?.exit_longitude,*/}
                                    {/*                }}*/}
                                    {/*                title={t('checkOut')}*/}
                                    {/*                time={moment(item.exit_time).format('YYYY-MM-DD HH:mm')}*/}
                                    {/*                icon={<LogIn width={20} height={20}/>}*/}
                                    {/*            />*/}
                                    {/*        </View>*/}
                                    {/*    </View>*/}
                                    {/*))}*/}
                                    {/*<FlatList*/}
                                    {/*    data={employeeWorkHours}*/}
                                    {/*    keyExtractor={(_, index) => index.toString()}*/}
                                    {/*    renderItem={renderItem}*/}
                                    {/*    contentContainerStyle={{ padding: 12 }}*/}
                                    {/*/>*/}
                                </View>
                            </>
                        ),
                        id: 'workHours'
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

            <SgPopup
                visible={rejectModal}
                onClose={() => handleSelectRow(null)}
                icon={<InfoCircleModalIcon width={56} height={56}/>}
            >
                <Text style={styles.rejectModal}>{t('rejectDetail')}</Text>
                <SgCard>
                    {selectedRow?.entry_reject_reason ? <Text style={styles.title}>{selectedRow?.entry_reject_reason}</Text> : null}
                    {selectedRow?.exit_reject_reason ? <Text style={styles.title}>{selectedRow?.exit_reject_reason}</Text> : null}
                </SgCard>
            </SgPopup>
        </SgTemplateScreen>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOpacity: 0.01,
        shadowRadius: 6,
        elevation: 3,
        gap: 16
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        marginBottom: 4,
    },
    flex1: {
        flex: 1,
    },
    alignRight: {
        alignItems: "flex-end",
        textAlign: "right",
    },
    label: {
        fontSize: 12,
        color: "#6b7280", // gray-500
    },
    value: {
        fontSize: 12,
        fontWeight: "600",
        color: "#111827", // gray-900
    },
    link: {
        // color: "#2563eb", // blue-600
        color: "#111827", // gray-900
        textDecorationLine: "underline",
        fontSize: 14,
    },
    center: {
        marginTop: 8,
        alignItems: "center",
    },
    badge: {
        backgroundColor: "#f3f4f6", // gray-100
        textAlign: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        fontSize: 14,
        fontWeight: "700",
        color: "#1f2937", // gray-800
    },
    badge2: {
        backgroundColor: "#e9f0ff", // gray-100
        width: '100%',
        textAlign: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        fontSize: 14,
        fontWeight: "700",
        color: "#1f2937", // gray-800
    },


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