import {Tabs} from 'expo-router';
import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import HomeIcon from '@/assets/images/home.svg';
import HomeActiveIcon from '@/assets/images/home-active.svg';
import DocsIcon from '@/assets/images/docs.svg';
import DocsActiveIcon from '@/assets/images/docs-active.svg';
import MenuIcon from '@/assets/images/menu.svg';
import MenuActiveIcon from '@/assets/images/menu-active.svg';
import OvertimeIcon from '@/assets/images/overtime.svg';
import OvertimeActiveIcon from '@/assets/images/overtime-active.svg';
import {useTranslation} from "react-i18next";
import {useSocket} from "@/hooks/useSocket";
import {useAuth} from "@/hooks/useAuth";

export default function EmployeeTabLayout() {
    const {t} = useTranslation();
    const {socket} = useSocket();
    const {getRating} = useAuth();

    useEffect(() => {
        if (!socket) return;

        const taskStatus = (data) => {
            getRating()
        };

        // socket.on('connect', () => {
        socket.on("change_task__by_employee", taskStatus);
        // })

        return () => {
            socket.off("change_task__by_chief", taskStatus);
        };
    }, [socket]);

    return (
        <Tabs
            screenOptions={{
                freezeOnBlur: false,
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
                    freezeOnBlur: false,
                    title: t('tabBar__home'),
                    tabBarLabel: t('tabBar__home'),
                    headerTitle: t('tabBar__home'),
                    tabBarIcon: ({color, focused}) => focused ? <HomeActiveIcon width={20} height={20}/> :
                        <HomeIcon width={20} height={20}/>
                }}
            />
            <Tabs.Screen
                name="overTime/index"
                options={{
                    freezeOnBlur: false,
                    title: t('tabBar__overTime'),
                    tabBarLabel: t('tabBar__overTime'),
                    headerTitle: t('tabBar__overTime'),
                    tabBarIcon: ({color, focused}) => focused ? <OvertimeActiveIcon width={20} height={20}/> :
                        <OvertimeIcon width={20} height={20}/>
                }}
            />
            <Tabs.Screen
                name="docs/index"
                options={{
                    href: null,
                    freezeOnBlur: false,
                    title: t('tabBar__myDocs'),
                    tabBarLabel: t('tabBar__myDocs'),
                    headerTitle: t('tabBar__myDocs'),
                    tabBarIcon: ({color, focused}) => focused ? <DocsActiveIcon width={20} height={20}/> :
                        <DocsIcon width={20} height={20}/>
                }}
            />
            <Tabs.Screen
                name="menu/index"
                options={{
                    freezeOnBlur: false,
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