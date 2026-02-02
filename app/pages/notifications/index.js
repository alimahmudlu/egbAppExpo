import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect, useLocalSearchParams, useRouter} from "expo-router";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import COLORS from "@/constants/colors";
import React, {useCallback, useEffect, useState} from "react";
import moment from "moment/moment";
import {useApi} from "@/hooks/useApi";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";
import {Ionicons} from "@expo/vector-icons";
import {useLanguage} from "@/hooks/useLanguage";

export default function NotificationsScreen() {
    const { request } = useApi();
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);
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
        <TouchableOpacity
            onPress={() => handleClickNotificationItem(item.url, item.id)}
            style={[styles.card, unread && styles.cardUnread]}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, unread && styles.iconContainerUnread]}>
                <Ionicons
                    name={unread ? "notifications" : "notifications-outline"}
                    size={20}
                    color={unread ? COLORS.brand_950 : COLORS.gray_500}
                />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <Text style={[styles.title, unread && styles.titleUnread]} numberOfLines={1}>
                        {selectedLanguage?.id !== 'en' ? `${item?.[['title', selectedLanguage?.id].join('_')]}` : `${item?.title}`}
                    </Text>
                    {unread && <View style={styles.unreadDot} />}
                </View>
                <Text style={[styles.description, unread && styles.descriptionUnread]} numberOfLines={2}>
                    {selectedLanguage?.id !== 'en' ? `${item?.[['description', selectedLanguage?.id].join('_')]}` : `${item?.description}`}
                </Text>
                {item.date && (
                    <View style={styles.dateRow}>
                        <Ionicons name="time-outline" size={12} color={COLORS.gray_400} />
                        <Text style={styles.date}>{moment(item.date).format('DD MMM YYYY, HH:mm')}</Text>
                    </View>
                )}
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.gray_400} />
        </TouchableOpacity>
    );


    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('notifications'),
            }} />}
        >
            <View style={styles.container}>
                {((notifications || {}).data || [])?.length === 0 ? (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconContainer}>
                            <Ionicons name="notifications-off-outline" size={48} color={COLORS.gray_300} />
                        </View>
                        <Text style={styles.emptyTitle}>{t('noNotifications') || 'No notifications'}</Text>
                        <Text style={styles.emptyDescription}>{t('noNotificationsDesc') || 'You\'re all caught up!'}</Text>
                    </View>
                ) : (
                    <>
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

                        {((notifications || {}).total || 0) > page * 10 && (
                            <TouchableOpacity
                                onPress={handleMore}
                                style={styles.loadMoreButton}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="chevron-down" size={18} color={COLORS.brand_700} />
                                <Text style={styles.loadMoreText}>{t('loadMore')}</Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </View>
        </SgTemplateScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    // Notification Card
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.gray_100,
        borderRadius: 16,
        gap: 12,
        shadowColor: COLORS.brand_950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    cardUnread: {
        backgroundColor: COLORS.brand_25,
        borderColor: COLORS.brand_100,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: COLORS.gray_100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainerUnread: {
        backgroundColor: COLORS.brand_100,
    },
    contentContainer: {
        flex: 1,
        gap: 4,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    title: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 20,
        color: COLORS.gray_700,
        flex: 1,
    },
    titleUnread: {
        color: COLORS.gray_900,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.brand_600,
    },
    description: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        color: COLORS.gray_500,
    },
    descriptionUnread: {
        color: COLORS.gray_600,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    date: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        color: COLORS.gray_400,
    },
    // Empty State
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
        gap: 12,
    },
    emptyIconContainer: {
        width: 96,
        height: 96,
        borderRadius: 24,
        backgroundColor: COLORS.gray_50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    emptyTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
        color: COLORS.gray_900,
    },
    emptyDescription: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        color: COLORS.gray_500,
        textAlign: 'center',
    },
    // Load More Button
    loadMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: COLORS.brand_50,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginTop: 8,
    },
    loadMoreText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.brand_700,
    },
});