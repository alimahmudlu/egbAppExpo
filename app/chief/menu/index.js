import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import SgSectionProfileBanner from "@/components/sections/ProfileBanner/ProfileBanner";
import Avatar from "@/assets/images/avatar.png";
import SgSectionMenuCard from "@/components/sections/MenuCard/MenuCard";
import SgPopup from "@/components/ui/Modal/Modal";
import LogOutModalIcon from "@/assets/images/logout.svg";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import {useTranslation} from "react-i18next";


export default function ChiefMenuScreen() {
    const { user, logout } = useAuth();
    const {t} = useTranslation();

    const [logOutModal, setLogOutModal] = useState(false);

    function toggleLogOutModal() {
        setLogOutModal(!logOutModal);
    }

    function handleLogout() {
        // Implement your logout logic here
        // FIXME: This is just a placeholder for the logout logic
        // Alert.alert("Logout successfully!");
        // console.log("User logged out");
        logout();
        toggleLogOutModal();
    }

  return (
    <SgTemplateScreenView
      head={
        <View style={{padding: 16}}>
          <SgSectionProfileBanner
              image={Avatar}
              name={user?.full_name}
              role={user?.role?.name}
              onLogout={toggleLogOutModal}
          />
        </View>
      }
    >
      <View>
        <SgSectionMenuCard />
      </View>

        <SgPopup
            visible={logOutModal}
            onClose={toggleLogOutModal}
            title="Log out"
            description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
            icon={<LogOutModalIcon width={56} height={56} />}
            footerButton={
                <SgButton
                    bgColor={COLORS.error_600}
                    color={COLORS.white}
                    onPress={handleLogout}
                >
                    {t('logout')}
                </SgButton>
            }
        />
    </SgTemplateScreenView>
  );
}
