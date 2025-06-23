import { Tabs } from 'expo-router';
import React, {useEffect} from 'react';
import {TouchableOpacity, Text, Platform} from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import HomeIcon from '@/assets/images/home.svg';
import HomeActiveIcon from '@/assets/images/home-active.svg';
import DocsIcon from '@/assets/images/docs.svg';
import DocsActiveIcon from '@/assets/images/docs-active.svg';
import MenuIcon from '@/assets/images/menu.svg';
import MenuActiveIcon from '@/assets/images/menu-active.svg';
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import SgTemplateHeader from "@/components/templates/Header/Header";
import Avatar from "@/assets/images/avatar.png";
import {useSocket} from "@/hooks/useSocket";

export default function employeeTabLayout() {
  const { logout } = useAuth();
    const { request } = useApi();
    const { setStoreData } = useData();
    const {socket} = useSocket()

    useEffect(() => {
        request({
            url: `/employee/activity/`,
            method: 'get',
        }).then(res => {
            setStoreData(prev => ({
                ...prev,
                checkInData: {
                    checkOut: (res?.data || []).find(el => el.type === 2) || {
                        loading: true
                    },
                    checkIn: (res?.data || []).find(el => el.type === 1) || {
                        loading: true
                    },
                }
            }));
        }).catch(err => {
            setStoreData(prev => ({
                ...prev,
                checkInData: {
                    checkIn: null,
                    checkOut: null,
                }
            }));
        })
    }, []);



    useEffect(() => {
        if (!socket || !socket.connected) return;

        const handler = (data) => {
            console.log("Mesaj gəldi:", data);

            if (data?.data?.type === 1) {
                setStoreData(prev => ({
                    ...prev,
                    checkInData: {
                        ...(prev.checkInData || {}),
                        checkIn: data?.data || {
                            loading: true
                        },
                    }
                }));
            }
            else {
                setStoreData(prev => ({
                    ...prev,
                    checkInData: {
                        ...(prev.checkInData || {}),
                        checkOut: data?.data || {
                            loading: true
                        },
                    }
                }));
            }
        };

        socket.on("update_activity", handler);

        return () => {
            socket.off("update_activity", handler);
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
        name="docs/index"
        options={{
          title: 'My Docs',
          tabBarLabel: 'My Docs',
          headerTitle: 'My Docs',
            tabBarIcon: ({ color, focused }) => focused ? <DocsActiveIcon width={20} height={20} /> : <DocsIcon width={20} height={20} />
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