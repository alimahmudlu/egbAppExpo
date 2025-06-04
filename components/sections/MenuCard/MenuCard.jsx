import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import GB from '@/assets/images/flags/GB.svg';
import Lang from '@/assets/images/language.svg';
import Notify from '@/assets/images/notification.svg';
import AppInfo from '@/assets/images/appInfo.svg';
import Terms from '@/assets/images/Terms.svg';
import Privacy from '@/assets/images/privacy.svg';
import styles from '@/components/sections/MenuCard/MenuCard.styles';
import RightIcon from '@/assets/images/chevron-right.svg';
import COLORS from '@/constants/colors';
import SgPopup from '@/components/ui/Modal/Modal';
import SgSectionLanguageSelector from '../LanguageSelect/LanguageSelect';
import SgButton from '@/components/ui/Button/Button';


const Divider = () => (
  <View style={styles.divider} />
);

export default function SgSectionMenuCard () {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
        <View style={styles.menuWrapper}>
          <Text style={styles.titleText}>Menus</Text>
          <View style={styles.content}>
          {/* Languages */}
          <TouchableOpacity style={styles.item} onPress={() => setModalVisible(true)}>
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <Lang width={20} height={20} style={styles.icon} />
              </View>
              <Text style={styles.title}>Languages</Text>
            </View>
            <View style={styles.right}>
              <GB width={24} height={24} style={styles.extraIcon} />
              <RightIcon width={20} height={20} />
            </View>
          </TouchableOpacity>
          <Divider />
          {/* Notifications */}
          <View style={styles.item}>
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <Notify width={20} height={20} style={styles.icon} />
              </View>
              <Text style={styles.title}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={() => setNotificationsEnabled(prev => !prev)}
              trackColor={{ false: COLORS.gray_200, true: COLORS.brand_600 }}
              thumbColor={notificationsEnabled ? COLORS.white : COLORS.white}
              ios_backgroundColor={COLORS.gray_200}
              style={{ transform: [{ scaleX: 0.77 }, { scaleY: 0.77 }] }}
            />
          </View>
          <Divider />
          {/* App Info */}
          <TouchableOpacity style={styles.item}>
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <AppInfo width={20} height={20} style={styles.icon} />
              </View>
              <Text style={styles.title}>App Info</Text>
            </View>
            <View style={styles.right}>
              <RightIcon width={20} height={20} />
            </View>
          </TouchableOpacity>
          <Divider />
          {/* Terms & Conditions */}
          <TouchableOpacity style={styles.item}>
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <Terms width={20} height={20} style={styles.icon} />
              </View>
              <Text style={styles.title}>Terms & Conditions</Text>
            </View>
            <View style={styles.right}>
              <RightIcon width={20} height={20} />
            </View>
          </TouchableOpacity>
          <Divider />
          {/* Privacy Policy */}
          <TouchableOpacity style={[styles.item, styles.noBorder]}>
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <Privacy width={20} height={20} style={styles.icon} />
              </View>
              <Text style={styles.title}>Privacy Policy</Text>
            </View>
            <View style={styles.right}>
              <RightIcon width={20} height={20} />
            </View>
          </TouchableOpacity>
          </View>
        </View>
        <SgPopup
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Languages"
          footerButton={
            <SgButton
              onPress={() => setModalVisible(false)}
              bgColor={COLORS.primary}
              color={COLORS.white}
            >
              Save
            </SgButton>
          }
        >
          <SgSectionLanguageSelector />
        </SgPopup>
    </View>
  );
};