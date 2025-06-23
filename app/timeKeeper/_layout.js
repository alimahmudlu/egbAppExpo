import { Tabs } from 'expo-router';
import React, {useEffect} from 'react';
import {TouchableOpacity, Text, Platform, Alert} from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import HomeActiveIcon from "@/assets/images/home-active.svg";
import HomeIcon from "@/assets/images/home.svg";
import HistoryIcon from '@/assets/images/history.svg';
import HistoryActiveIcon from '@/assets/images/history-active.svg';
import MenuIcon from '@/assets/images/menu.svg';
import MenuActiveIcon from '@/assets/images/menu-active.svg';
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useSocket} from "@/hooks/useSocket";

export default function TimeKeeperTabLayout() {
    const { request } = useApi();
    const { insertData, clearData } = useData();
    const {socket} = useSocket()


    useEffect(() => {
        clearData()
        request({
            url: '/timekeeper/activity/list',
            method: 'get',
        }).then(res => {
        }).catch(err => {
            console.log(err, 'apiservice control err')
        });
    }, []);


    useEffect(() => {
        if (!socket || !socket.connected) return;

        const handler = (data) => {
            insertData('GET:/timekeeper/activity/list', data?.data)
        };

        socket.on("new_activity", handler);

        return () => {
            socket.off("new_activity", handler);
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
            tabBarIcon: ({ color, focused }) => focused ? <HomeActiveIcon width={20} height={20} /> : <HomeIcon width={20} height={20} />
        }}
      />
      <Tabs.Screen
        name="history/index"
        options={{
          title: 'History',
          tabBarLabel: 'History',
          headerTitle: 'History',
            tabBarIcon: ({ color, focused }) => focused ? <HistoryActiveIcon width={20} height={20} /> : <HistoryIcon width={20} height={20} />
        }}
      />
      <Tabs.Screen
        name="menu/index"
        options={{
          title: 'Menu',
          tabBarLabel: 'Menu',
          headerTitle: 'Menu',
            tabBarIcon: ({ color, focused }) => focused ? <MenuActiveIcon width={20} height={20} /> : <MenuIcon width={20} height={20} />
        }}
      />
    </Tabs>
  );
}