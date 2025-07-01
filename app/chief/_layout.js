import {Tabs} from 'expo-router';
import React, {useEffect} from 'react';
import {TouchableOpacity, Text, Platform} from 'react-native';
import {useAuth} from '@/hooks/useAuth';
import HomeActiveIcon from "@/assets/images/home-active.svg";
import HomeIcon from "@/assets/images/home.svg";
import HistoryActiveIcon from "@/assets/images/history-active.svg";
import HistoryIcon from "@/assets/images/history.svg";
import ProjectsActiveIcon from "@/assets/images/bag-active.svg";
import ProjectsIcon from "@/assets/images/bag.svg";
import MenuActiveIcon from "@/assets/images/menu-active.svg";
import MenuIcon from "@/assets/images/menu.svg";
import {useData} from "@/hooks/useData";
import {useSocket} from "@/hooks/useSocket";

export default function WorkerTabLayout() {
    const {logout} = useAuth();
    const {changeRowData} = useData();
    const {socket} = useSocket();

    useEffect(() => {
        if (!socket || !socket.connected) return;

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
                    title: 'Home',
                    tabBarLabel: 'Home',
                    headerTitle: 'Home',
                    tabBarIcon: ({color, focused}) => focused ? <HomeActiveIcon width={20} height={20}/> :
                        <HomeIcon width={20} height={20}/>
                }}
            />
            <Tabs.Screen
                name="history/index"
                options={{
                    title: 'History',
                    tabBarLabel: 'History',
                    headerTitle: 'History',
                    tabBarIcon: ({color, focused}) => focused ? <HistoryActiveIcon width={20} height={20}/> :
                        <HistoryIcon width={20} height={20}/>
                }}
            />
            <Tabs.Screen
                name="projects/index"
                options={{
                    title: 'Projects',
                    tabBarLabel: 'Projects',
                    headerTitle: 'Projects',
                    tabBarIcon: ({color, focused}) => focused ? <ProjectsActiveIcon width={20} height={20}/> :
                        <ProjectsIcon width={20} height={20}/>
                }}
            />
            <Tabs.Screen
                name="menu/index"
                options={{
                    title: 'Menu',
                    tabBarLabel: 'Menu',
                    headerTitle: 'Menu',
                    tabBarIcon: ({color, focused}) => focused ? <MenuActiveIcon width={20} height={20}/> :
                        <MenuIcon width={20} height={20}/>
                }}
            />
        </Tabs>
    );
}