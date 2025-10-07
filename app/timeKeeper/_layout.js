import {Tabs} from 'expo-router';
import React, {useEffect} from 'react';
import {TouchableOpacity, Text, Platform, Alert} from 'react-native';
import {useAuth} from '@/hooks/useAuth';
import HomeActiveIcon from "@/assets/images/home-active.svg";
import HomeIcon from "@/assets/images/home.svg";
import HistoryIcon from '@/assets/images/history.svg';
import HistoryActiveIcon from '@/assets/images/history-active.svg';
import MenuIcon from '@/assets/images/menu.svg';
import MenuActiveIcon from '@/assets/images/menu-active.svg';
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useSocket} from "@/hooks/useSocket";
import DocsActiveIcon from "@/assets/images/docs-active.svg";
import DocsIcon from "@/assets/images/docs.svg";
import {useTranslation} from "react-i18next";

export default function TimeKeeperTabLayout() {
    const {t} = useTranslation();
    const {storeData} = useData();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarInActiveTintColor: '#98A2B3',
                tabBarActiveTintColor: '#182230',
                tabBarActiveBackgroundColor: '#F2F4F7',
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {
                        boxShadow: '0px -24px 40px -20px #00000014',
                        border: 'none',
                        borderColor: '#FFFFFF'
                    },
                }),
                tabBarItemStyle: {
                    borderRadius: 12,
                    overflow: "hidden"
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: t('tabBar__home'),
                    tabBarLabel: t('tabBar__home'),
                    headerTitle: t('tabBar__home'),
                    tabBarIcon: ({color, focused}) => focused ? <HomeActiveIcon width={20} height={20}/> :
                        <HomeIcon width={20} height={20}/>
                }}
            />
            <Tabs.Screen
                name="docs/index"
                options={{
                    title: t('tabBar__myDocs'),
                    tabBarLabel: t('tabBar__myDocs'),
                    headerTitle: t('tabBar__myDocs'),
                    tabBarIcon: ({color, focused}) => focused ? <DocsActiveIcon width={20} height={20}/> :
                        <DocsIcon width={20} height={20}/>
                }}
            />
            <Tabs.Screen
                name="history/index"
                options={{
                    title: t('tabBar__history'),
                    tabBarLabel: t('tabBar__history'),
                    headerTitle: t('tabBar__history'),
                    tabBarIcon: ({color, focused}) => focused ? <HistoryActiveIcon width={20} height={20}/> :
                        <HistoryIcon width={20} height={20}/>
                }}
            />
            <Tabs.Screen
                name="manual/index"
                options={{
                    title: t('tabBar__manual'),
                    tabBarLabel: t('tabBar__manual'),
                    headerTitle: t('tabBar__manual'),
                    tabBarIcon: ({color, focused}) => focused ? <HistoryActiveIcon width={20} height={20}/> :
                        <HistoryIcon width={20} height={20}/>
                }}
            />
            <Tabs.Screen
                name="overtime/index"
                options={{
                    title: t('tabBar__overTime'),
                    tabBarLabel: t('tabBar__overTime'),
                    headerTitle: t('tabBar__overTime'),
                    tabBarBadge: ((storeData?.cache?.[`GET:/notifications`])?.data || [])?.filter(el => !el?.read).length ? ((storeData?.cache?.[`GET:/notifications`])?.data || [])?.filter(el => !el?.read).length : null,
                    tabBarIcon: ({color, focused}) => focused ? <HistoryActiveIcon width={20} height={20}/> :
                        <HistoryIcon width={20} height={20}/>
                }}
            />
            <Tabs.Screen
                name="menu/index"
                options={{
                    title: t('tabBar__menu'),
                    tabBarLabel: t('tabBar__menu'),
                    headerTitle: t('tabBar__menu'),
                    tabBarIcon: ({color, focused}) => focused ? <MenuActiveIcon width={20} height={20}/> :
                        <MenuIcon width={20} height={20}/>
                }}
            />
        </Tabs>
    );
}