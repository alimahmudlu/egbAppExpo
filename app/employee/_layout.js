import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { BlurView } from "expo-blur"; // Modern iOS blur effect
import { useTranslation } from "react-i18next";
import { useSocket } from "@/hooks/useSocket";
import { useAuth } from "@/hooks/useAuth";

import HomeIcon from "@/assets/images/home.svg";
import HomeActiveIcon from "@/assets/images/home-active.svg";
import DocsIcon from "@/assets/images/docs.svg";
import DocsActiveIcon from "@/assets/images/docs-active.svg";
import MenuIcon from "@/assets/images/menu.svg";
import MenuActiveIcon from "@/assets/images/menu-active.svg";
import OvertimeIcon from "@/assets/images/overtime.svg";
import OvertimeActiveIcon from "@/assets/images/overtime-active.svg";

export default function EmployeeTabLayout() {
  const { t } = useTranslation();
  const { socket } = useSocket();
  const { getRating } = useAuth();

  useEffect(() => {
    if (!socket) return;
    const taskStatus = () => getRating();
    socket.on("change_task__by_employee", taskStatus);

    return () => {
      socket.off("change_task__by_employee", taskStatus);
    };
  }, [socket]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        freezeOnBlur: false,

        tabBarActiveTintColor: "#0A0A0A",
        tabBarInactiveTintColor: "#9CA3AF",

        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          marginHorizontal: 24,
          height: 65,
          borderRadius: 24,
          paddingBottom: 6,
          paddingTop: 6,
          paddingHorizontal: 10,
          borderWidth: 0,
          backgroundColor: Platform.OS === "ios" ? "transparent" : "#FFFFFFEE",

          ...Platform.select({
            android: {
              elevation: 12,
              shadowColor: "#000",
            },
          }),
        },

        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={40}
              tint="light"
              style={{
                flex: 1,
                borderRadius: 24,
                overflow: "hidden",
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: "#FFFFFFEE",
                borderRadius: 24,
              }}
            />
          ),

        tabBarItemStyle: {
          borderRadius: 20,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: -4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabBar__home"),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeActiveIcon width={22} height={22} />
            ) : (
              <HomeIcon width={22} height={22} />
            ),
        }}
      />

      <Tabs.Screen
        name="overTime/index"
        options={{
          title: t("tabBar__overTime"),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <OvertimeActiveIcon width={22} height={22} />
            ) : (
              <OvertimeIcon width={22} height={22} />
            ),
        }}
      />

      <Tabs.Screen
        name="docs/index"
        options={{
          href: null,
          title: t("tabBar__myDocs"),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <DocsActiveIcon width={22} height={22} />
            ) : (
              <DocsIcon width={22} height={22} />
            ),
        }}
      />

      <Tabs.Screen
        name="menu/index"
        options={{
          title: t("tabBar__menu"),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MenuActiveIcon width={22} height={22} />
            ) : (
              <MenuIcon width={22} height={22} />
            ),
        }}
      />
    </Tabs>
  );
}
