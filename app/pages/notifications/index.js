import {FlatList, Linking, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect, useLocalSearchParams, useRouter} from "expo-router";
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
import {Ionicons} from "@expo/vector-icons";
import {useLanguage} from "@/hooks/useLanguage";

export default function TimeKeeperUserScreen() {
    const { request } = useApi();
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);
    const [filters, setFilters] = useState({
        start_date: moment().startOf('month'),
        end_date: moment().endOf('month')
    })

    const [page, setPage] = useState(1);
    const [getDataStatus, setDataStatus] = useState(false)

    const {storeData, updateData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation()
    const { selectedLanguage } = useLanguage()

    function handleClickNotificationItem(url, id) {
        request({
            url: `/notifications/read`,
            method: 'post',
            data: {
                url,
                id
            },
        }).then(res => {
            console.log(res, 'apiservice control res')
        }).catch(err => {
            console.log(err, 'apiservice control err')
        })
        router.push(url);
    }

    function getData() {
        request({
            url: `/notifications`,
            method: 'get',
            params: {
                page: page,
                limit: 10
            },
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });
    }

    useFocusEffect(useCallback(() => {
        setPage(1)
        setDataStatus(!getDataStatus)

        return () => {
            setPage(0)
            setNotifications({data: []})
            updateData(`GET:/notifications`, {data: []})
        };
    }, [refreshKey]));

    useEffect(() => {
        if (page) {
            getData()
        }
    }, [page, getDataStatus])

    useEffect(() => {
        setNotifications((prevState) => {
            if (page === 1) {
                return {
                    ...(storeData?.cache?.[`GET:/notifications`]?.data || {})
                }
            }
            else {
                return {
                    ...(storeData?.cache?.[`GET:/notifications`]?.data || {}),
                    data: [...prevState?.data || [], ...((storeData?.cache?.[`GET:/notifications`]?.data || {})?.data || [])]
                }
            }
        })
    }, [storeData?.cache?.[`GET:/notifications`]]);

    function handleMore() {
        setPage(page + 1);
    }


    const RenderItem = ({ item, unread = true }) => (
        <TouchableOpacity onPress={() => handleClickNotificationItem(item.url, item.id)} style={[styles.card, unread ? {borderColor: '#4F46E5'} : null]}>
            <View style={styles.row}>
                <Ionicons name="document-text-outline" size={28} color={unread ? "#4F46E5" : "#1F2937"} />
                <View style={styles.textContainer}>
                    <Text style={[styles.title, unread ? {color: '#4F46E5'} : null]}>
                        {selectedLanguage?.id !== 'en' ? `${item?.[['title', selectedLanguage?.id].join('_')]}` : `${item?.title}`}
                    </Text>
                    <Text style={[styles.description, unread ? {color: '#4F46E5'} : null]}>
                        {selectedLanguage?.id !== 'en' ? `${item?.[['description', selectedLanguage?.id].join('_')]}` : `${item?.description}`}
                    </Text>
                    {item.date ? <Text style={[styles.date, unread ? {color: '#4F46E5'} : null]}>{moment(item.date).format('DD/MM/YYYY HH:mm')}</Text> : null}
                </View>
            </View>
            {/*<Ionicons style={styles.goIcon} name="chevron-forward" size={20} color={unread ? "#4F46E5" : "#9CA3AF"} />*/}
        </TouchableOpacity>
    );


    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('notifications'),
            }} />}
        >
            <View style={{gap: 8}}>
                {((notifications || {}).data || [])?.map((item, index) => (
                    <RenderItem
                        key={index}
                        unread={!item?.read}
                        item={{
                            ...item,
                            date: item?.update_date,
                        }}
                    />
                ))}

                {((notifications || {}).total || 0) > page * 10 ?
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
        </SgTemplateScreen>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#FFF",
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    textContainer: {
        marginLeft: 12,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1F2937",
    },
    description: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 2,
    },
    date: {
        fontSize: 10,
        color: "#6B7280",
        marginTop: 10,
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

    goIcon: {
        width: 20,
        flex: 1
    }
});