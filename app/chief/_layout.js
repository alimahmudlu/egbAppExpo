import { Tabs } from 'expo-router';
import React from 'react';
import {TouchableOpacity, Text, Platform} from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function WorkerTabLayout() {
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
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarLabel: 'History',
          headerTitle: 'History',
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarLabel: 'Projects',
          headerTitle: 'Projects',
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