import {router, Tabs} from 'expo-router';
import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import HomeActiveIcon from "@/assets/images/home-active.svg";
import HomeIcon from "@/assets/images/home.svg";
import HistoryActiveIcon from "@/assets/images/history-active.svg";
import HistoryIcon from "@/assets/images/history.svg";
import ProjectsActiveIcon from "@/assets/images/bag-active.svg";
import ProjectsIcon from "@/assets/images/bag.svg";
import MenuActiveIcon from "@/assets/images/menu-active.svg";
import MenuIcon from "@/assets/images/menu.svg";
import ReportsActiveIcon from "@/assets/images/bold.svg";
import ReportsIcon from "@/assets/images/solid.svg";
import {useData} from "@/hooks/useData";
import {useSocket} from "@/hooks/useSocket";
import DocsActiveIcon from "@/assets/images/docs-active.svg";
import DocsIcon from "@/assets/images/docs.svg";
import {useTranslation} from "react-i18next";
import {useAuth} from "@/hooks/useAuth";
import COLORS from '@/constants/colors';

export default function WorkerTabLayout() {
    const {changeRowData} = useData();
    const {socket} = useSocket();
    const {t} = useTranslation()
    const {isLoggedIn, loading} = useAuth();

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            console.log('not logged in')
            router.replace('/auth')
        }
    }, [isLoggedIn, loading]);

    useEffect(() => {
        if (!socket) return;

        const handler = (data) => {
            changeRowData(`GET:/chief/task/list`, data?.data, data?.data?.id)
        };

        socket.on("change_task__by_employee", handler);

        return () => {
            socket.off("change_task__by_employee", handler);
        };
    }, [socket]);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: COLORS.gray_400,
                tabBarActiveTintColor: COLORS.brand_950,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                        backgroundColor: COLORS.white,
                        borderTopWidth: 1,
                        borderTopColor: COLORS.gray_100,
                        height: 85,
                        paddingTop: 8,
                        paddingBottom: 28,
                    },
                    default: {
                        backgroundColor: COLORS.white,
                        borderTopWidth: 1,
                        borderTopColor: COLORS.gray_100,
                        height: 64,
                        paddingTop: 8,
                        paddingBottom: 8,
                    },
                }),
                tabBarItemStyle: {
                    gap: 4,
                },
                tabBarLabelStyle: {
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 10,
                    fontWeight: '600',
                },
                tabBarIconStyle: {
                    marginBottom: 0,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: t('tabBar__home'),
                    tabBarLabel: t('tabBar__home'),
                    headerTitle: t('tabBar__home'),
                    tabBarIcon: ({focused}) => focused
                        ? <HomeActiveIcon width={24} height={24} />
                        : <HomeIcon width={24} height={24} color={COLORS.gray_400} />
                }}
            />
            <Tabs.Screen
                name="docs/index"
                options={{
                    href: null,
                    title: t('tabBar__myDocs'),
                    tabBarLabel: t('tabBar__myDocs'),
                    headerTitle: t('tabBar__myDocs'),
                    tabBarIcon: ({focused}) => focused
                        ? <DocsActiveIcon width={24} height={24} />
                        : <DocsIcon width={24} height={24} color={COLORS.gray_400} />
                }}
            />
            <Tabs.Screen
                name="tasks/index"
                options={{
                    title: t('tabBar__allTasks'),
                    tabBarLabel: t('tabBar__allTasks'),
                    headerTitle: t('tabBar__allTasks'),
                    tabBarIcon: ({focused}) => focused
                        ? <HistoryActiveIcon width={24} height={24} />
                        : <HistoryIcon width={24} height={24} color={COLORS.gray_400} />
                }}
            />
            <Tabs.Screen
                name="history/index"
                options={{
                    title: t('tabBar__history'),
                    tabBarLabel: t('tabBar__history'),
                    headerTitle: t('tabBar__history'),
                    href: null,
                    tabBarIcon: ({focused}) => focused
                        ? <HistoryActiveIcon width={24} height={24} />
                        : <HistoryIcon width={24} height={24} color={COLORS.gray_400} />
                }}
            />
            <Tabs.Screen
                name="projects/index"
                options={{
                    title: t('tabBar__projects'),
                    tabBarLabel: t('tabBar__projects'),
                    headerTitle: t('tabBar__projects'),
                    tabBarIcon: ({focused}) => focused
                        ? <ProjectsActiveIcon width={24} height={24} />
                        : <ProjectsIcon width={24} height={24} color={COLORS.gray_400} />
                }}
            />
            <Tabs.Screen
                name="reports/index"
                options={{
                    title: t('tabBar__reports'),
                    tabBarLabel: t('tabBar__reports'),
                    headerTitle: t('tabBar__reports'),
                    tabBarIcon: ({focused}) => focused
                        ? <ReportsActiveIcon width={24} height={24} />
                        : <ReportsIcon width={24} height={24} color={COLORS.gray_400} />
                }}
            />
            <Tabs.Screen
                name="menu/index"
                options={{
                    title: t('tabBar__menu'),
                    tabBarLabel: t('tabBar__menu'),
                    headerTitle: t('tabBar__menu'),
                    tabBarIcon: ({focused}) => focused
                        ? <MenuActiveIcon width={24} height={24} />
                        : <MenuIcon width={24} height={24} color={COLORS.gray_400} />
                }}
            />
        </Tabs>
    );
}