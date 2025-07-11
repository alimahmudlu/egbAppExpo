import { Tabs } from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';
import HomeIcon from '@/assets/images/home.svg';
import HomeActiveIcon from '@/assets/images/home-active.svg';
import DocsIcon from '@/assets/images/docs.svg';
import DocsActiveIcon from '@/assets/images/docs-active.svg';
import MenuIcon from '@/assets/images/menu.svg';
import MenuActiveIcon from '@/assets/images/menu-active.svg';

export default function employeeTabLayout() {

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
          title: 'Home',
          tabBarLabel: 'Home',
          headerTitle: 'Home',
            tabBarIcon: ({ color, focused }) => focused ? <HomeActiveIcon width={20} height={20} /> : <HomeIcon width={20} height={20} />
        }}
      />
      <Tabs.Screen
        name="docs/index"
        options={{
            freezeOnBlur: false,
          title: 'My Docs',
          tabBarLabel: 'My Docs',
          headerTitle: 'My Docs',
            tabBarIcon: ({ color, focused }) => focused ? <DocsActiveIcon width={20} height={20} /> : <DocsIcon width={20} height={20} />
        }}
      />
      <Tabs.Screen
        name="menu/index"
        options={{
            freezeOnBlur: false,
          title: 'Menu',
          tabBarLabel: 'Menu',
          headerTitle: 'Menu',
            tabBarIcon: ({ color, focused }) => focused ? <MenuActiveIcon width={20} height={20} /> : <MenuIcon width={20} height={20} />
        }}
      />
    </Tabs>
  );
}