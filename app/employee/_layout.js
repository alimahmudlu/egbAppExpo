import { Tabs } from 'expo-router';
import React from 'react';
import {TouchableOpacity, Text, Platform} from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function employeeTabLayout() {
  const { logout } = useAuth();

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
        }}
      />
      <Tabs.Screen
        name="docs"
        options={{
          title: 'My Docs',
          tabBarLabel: 'My Docs',
          headerTitle: 'My Docs',
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarLabel: 'Menu',
          headerTitle: 'Menu',
        }}
      />
    </Tabs>
  );
}