import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgSectionProfileBanner from "@/components/sections/ProfileBanner/ProfileBanner";
import Avatar from "@/assets/images/avatar.png";
import SgSectionMenuCard from "@/components/sections/MenuCard/MenuCard";
import SgPopup from "@/components/ui/Modal/Modal";
import LogOutModalIcon from "@/assets/images/logout.svg";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import {useTranslation} from "react-i18next";


export default function EmployeeMenuScreen() {
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
        <SgTemplateScreen
            head={
                <View style={{padding: 16}}>
                    <SgSectionProfileBanner
                        // image={Avatar}
                        name={user?.full_name}
                        role={user?.role?.name}
                        position={user?.position}
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
                title={t('logout')}
                description={t('logout__description')}
                icon={<LogOutModalIcon width={50} height={50} />}
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
        </SgTemplateScreen>
    );
}
