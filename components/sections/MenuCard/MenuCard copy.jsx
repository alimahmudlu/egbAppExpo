import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
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

const Divider = () => <View style={styles.divider} />;

export default function SgSectionMenuCard () {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const menuItems = [
    {
      key: 'language',
      title: 'Languages',
      icon: Lang,
      rightElement: <GB width={24} height={24} style={styles.extraIcon} />,
      onPress: () => setModalVisible(true),
    },
    {
      key: 'notifications',
      title: 'Notifications',
      icon: Notify,
      type: 'switch',
      switchValue: notificationsEnabled,
      onToggle: () => setNotificationsEnabled(prev => !prev),
    },
    {
      key: 'appInfo',
      title: 'App Info',
      icon: AppInfo,
      onPress: () => {},
    },
    {
      key: 'terms',
      title: 'Terms & Conditions',
      icon: Terms,
      rightElement: <GB width={24} height={24} style={styles.extraIcon} />,
      onPress: () => {},
    },
    {
      key: 'privacy',
      title: 'Privacy Policy',
      icon: Privacy,
      onPress: () => {},
    },
    {
      key: 'newItem',
      title: 'New Menu',
      icon: Privacy,
      onPress: () => alert('New menu tapped'),
    },
    {
      key: 'newIte2',
      type: 'switch',
      switchValue: notificationsEnabled,
      onToggle: () => setNotificationsEnabled(prev => !prev),
      title: 'New Menu2',
      icon: Privacy,
      onPress: () => alert('New menu tapped'),
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.menuWrapper}>
        <Text style={styles.titleText}>Menus</Text>
        <View style={styles.content}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.key}>
              {item.type === 'switch' ? (
                <View style={styles.item}>
                  <View style={styles.left}>
                    <View style={styles.iconContainer}>
                      <item.icon width={20} height={20} style={styles.icon} />
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                  <Switch
                    value={item.switchValue}
                    onValueChange={item.onToggle}
                    trackColor={{ false: COLORS.gray_200, true: COLORS.brand_600 }}
                    thumbColor={COLORS.white}
                    ios_backgroundColor={COLORS.gray_200}
                    style={{ transform: [{ scaleX: 0.77 }, { scaleY: 0.77 }] }}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.item, index === menuItems.length - 1 && styles.noBorder]}
                  onPress={item.onPress}
                >
                  <View style={styles.left}>
                    <View style={styles.iconContainer}>
                      <item.icon width={20} height={20} style={styles.icon} />
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                  <View style={styles.right}>
                    {item.rightElement}
                    <RightIcon width={20} height={20} />
                  </View>
                </TouchableOpacity>
              )}
              {index < menuItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Language Selector Modal */}
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
}
