import { Tabs } from 'expo-router';
import React from 'react';
import {TouchableOpacity, Text, Platform} from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import HomeActiveIcon from "@/assets/images/home-active.svg";
import HomeIcon from "@/assets/images/home.svg";
import HistoryIcon from '@/assets/images/history.svg';
import HistoryActiveIcon from '@/assets/images/history-active.svg';
import MenuIcon from '@/assets/images/menu.svg';
import MenuActiveIcon from '@/assets/images/menu-active.svg';

export default function TimeKeeperTabLayout() {
  const { logout } = useAuth();

  return (
    <Tabs
        screenOptions={{
            headerShown: false,
            tabBarStyle: Platform.select({
                ios: {
                    // Use a transparent background on iOS to show the blur effect
                    position: 'absolute',
                },
                default: {},
            }),
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