import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Vector from '@/assets/images/vector.svg';
import styles from './Header.styles';
import SgSectionUserInfo from '@/components/sections/UserInfo/UserInfo';

import BellIcon from '@/assets/images/bell.svg';
import {useFocusEffect, useLocalSearchParams, useRouter} from "expo-router";
import {request} from "axios";
import {useApi} from "@/hooks/useApi";
import moment from "moment";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";


export default function SgTemplateHeader({name, role, position, rating, profileImage}) {
    const router = useRouter();
    const { request } = useApi();
    const [notifications, setNotifications] = useState([]);

    const {storeData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation()


    useEffect(() => {
        setNotifications(storeData?.cache?.[`GET:/notifications/count`]?.data)
    }, [storeData?.cache?.[`GET:/notifications/count`]]);


    /*useFocusEffect(useCallback(() => {
        request({
            url: `/notifications`,
            method: 'get',
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });

        return () => {
            console.log('Home tab lost focus');
        };
    }, []));*/

    return (
        <View style={styles.wrapper}>
            <Vector style={styles.vectorBackground} width={'100%'} resizeMode="stretch"/>
            <View style={styles.container}>
                <SgSectionUserInfo
                    name={name}
                    role={role}
                    position={position}
                    rating={rating}
                    profileImage={profileImage}
                    color="white"
                    size="lg"
                />
            </View>
            <View style={styles.rightSection}>
                <TouchableOpacity style={styles.notification} onPress={() => {
                    router.push(`/pages/notifications`);
                }}>
                    <BellIcon style={styles.notificationIcon} width={20} height={20} resizeMode='strech'/>
                    {/*{(notifications)?.unread_notifications_count ? <Text style={styles.notificationBadge}>{(notifications)?.unread_notifications_count}</Text> : null}*/}
                    {(notifications)?.unread_notifications_count ? <Text style={styles.notificationBadge}>{(notifications)?.unread_notifications_count}</Text> : null}
                </TouchableOpacity>
            </View>
        </View>
    );
}
