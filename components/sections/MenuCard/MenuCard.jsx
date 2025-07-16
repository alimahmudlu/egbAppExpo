import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Switch, TouchableOpacity} from 'react-native';

import Lang from '@/assets/images/language.svg';
import Notify from '@/assets/images/notification.svg';
import AppInfo from '@/assets/images/appInfo.svg';
import Terms from '@/assets/images/Terms.svg';
import Privacy from '@/assets/images/privacy.svg';
import RightIcon from '@/assets/images/chevron-right.svg';
import COLORS from '@/constants/colors';
import styles from '@/components/sections/MenuCard/MenuCard.styles';
import SgPopup from '@/components/ui/Modal/Modal';
import SgSectionLanguageSelector from '../LanguageSelect/LanguageSelect';
import {router} from "expo-router";
import {useLanguage} from "@/hooks/useLanguage";
import {useNotification} from "@/hooks/useNotification";
import {useAuth} from "@/hooks/useAuth";
import {useTranslation} from "react-i18next";

const Divider = () => <View style={styles.divider}/>;

export default function SgSectionMenuCard({extraItems = []}) {
    const [modalVisible, setModalVisible] = useState(false);
    const {handleChangeNotificationPermission, notificationPermission} = useNotification();
    const {selectedLanguage} = useLanguage();
  const { user } = useAuth();
  const {t} = useTranslation();

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
                <Text style={styles.title}>{t('languages')}</Text>
              </View>
              <View style={styles.right}>
                {(selectedLanguage || {}).icon}
                {/*<GB width={24} height={24} style={styles.extraIcon} />*/}
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
                <Text style={styles.title}>{t('notifications')}</Text>
              </View>
              <Switch
                  value={notificationPermission?.permission}
                  onValueChange={(res) => handleChangeNotificationPermission(res)}
                  trackColor={{ false: COLORS.gray_200, true: COLORS.brand_600 }}
                  thumbColor={COLORS.white}
                  ios_backgroundColor={COLORS.gray_200}
                  style={{ transform: [{ scaleX: 0.77 }, { scaleY: 0.77 }] }}
              />
            </View>
            <Divider />

            {/*  */}
            <TouchableOpacity onPress={() => router.push(`/pages/responsibilities/${user?.position?.id}`)} style={styles.item}>
              <View style={styles.left}>
                <View style={styles.iconContainer}>
                  <AppInfo width={20} height={20} style={styles.icon} />
                </View>
                <Text style={styles.title}>{t('duties')}</Text>
              </View>
              <View style={styles.right}>
                <RightIcon width={20} height={20} />
              </View>
            </TouchableOpacity>
            <Divider />

            {/* App Info */}
            <TouchableOpacity onPress={() => router.push('/pages/info')} style={styles.item}>
              <View style={styles.left}>
                <View style={styles.iconContainer}>
                  <AppInfo width={20} height={20} style={styles.icon} />
                </View>
                <Text style={styles.title}>{t('appInfo')}</Text>
              </View>
              <View style={styles.right}>
                <RightIcon width={20} height={20} />
              </View>
            </TouchableOpacity>
            <Divider />

            {/* Terms & Conditions */}
            <TouchableOpacity onPress={() => router.push('/pages/terms_conditions')} style={styles.item}>
              <View style={styles.left}>
                <View style={styles.iconContainer}>
                  <Terms width={20} height={20} style={styles.icon} />
                </View>
                <Text style={styles.title}>{t('termsConditions')}</Text>
              </View>
              <View style={styles.right}>
                <RightIcon width={20} height={20} />
              </View>
            </TouchableOpacity>
            <Divider />

            {/* Privacy Policy */}
            <TouchableOpacity onPress={() => router.push('/pages/privacy_policy')} style={styles.item}>
              <View style={styles.left}>
                <View style={styles.iconContainer}>
                  <Privacy width={20} height={20} style={styles.icon} />
                </View>
                <Text style={styles.title}>{t('privacyPolicy')}</Text>
              </View>
              <View style={styles.right}>
                <RightIcon width={20} height={20} />
              </View>
            </TouchableOpacity>

            {/* Extra items passed as props */}
            {extraItems.length > 0 && extraItems.map((item, index) => (
                <React.Fragment key={item.id || index}>
                  <Divider />
                  <TouchableOpacity style={styles.item} onPress={item.onPress}>
                    <View style={styles.left}>
                      <View style={styles.iconContainer}>
                        <item.icon width={20} height={20} style={styles.icon} />
                      </View>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <View style={styles.right}>
                      <RightIcon width={20} height={20} />
                    </View>
                  </TouchableOpacity>
                </React.Fragment>
            ))}

          </View>
        </View>

        {/* Language Modal */}
        <SgPopup
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title={t('languages')}
            /*footerButton={
              <SgButton
                onPress={() => setModalVisible(false)}
                bgColor={COLORS.primary}
                color={COLORS.white}
              >
                Save
              </SgButton>
            }*/
        >
          <SgSectionLanguageSelector />
        </SgPopup>
      </View>
  );
}


// const Divider = () => (
//     <View style={styles.divider}/>
// );

// export default function SgSectionMenuCard() {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [notificationsEnabled, setNotificationsEnabled] = useState(true);

//     return (
//         <View style={styles.container}>
//             <View style={styles.menuWrapper}>
//                 <Text style={styles.titleText}>Menus</Text>
//                 <View style={styles.content}>
//                     {/* Languages */}
//                     <TouchableOpacity style={styles.item} onPress={() => setModalVisible(true)}>
//                         <View style={styles.left}>
//                             <View style={styles.iconContainer}>
//                                 <Lang width={20} height={20} style={styles.icon}/>
//                             </View>
//                             <Text style={styles.title}>Languages</Text>
//                         </View>
//                         <View style={styles.right}>
//                             <GB width={24} height={24} style={styles.extraIcon}/>
//                             <RightIcon width={20} height={20}/>
//                         </View>
//                     </TouchableOpacity>
//                     <Divider/>
//                     {/* Notifications */}
//                     <View style={styles.item}>
//                         <View style={styles.left}>
//                             <View style={styles.iconContainer}>
//                                 <Notify width={20} height={20} style={styles.icon}/>
//                             </View>
//                             <Text style={styles.title}>Notifications</Text>
//                         </View>
//                         <Switch
//                             value={notificationsEnabled}
//                             onValueChange={() => setNotificationsEnabled(prev => !prev)}
//                             trackColor={{false: COLORS.gray_200, true: COLORS.brand_600}}
//                             thumbColor={notificationsEnabled ? COLORS.white : COLORS.white}
//                             ios_backgroundColor={COLORS.gray_200}
//                             style={{transform: [{scaleX: 0.77}, {scaleY: 0.77}]}}
//                         />
//                     </View>
//                     <Divider/>
//                     {/* App Info */}
//                     <TouchableOpacity onPress={() => router.push('/pages/info')} style={styles.item}>
//                         <View style={styles.left}>
//                             <View style={styles.iconContainer}>
//                                 <AppInfo width={20} height={20} style={styles.icon}/>
//                             </View>
//                             <Text style={styles.title}>App Info</Text>
//                         </View>
//                         <View style={styles.right}>
//                             <RightIcon width={20} height={20}/>
//                         </View>
//                     </TouchableOpacity>
//                     <Divider/>
//                     {/* Terms & Conditions */}
//                     <TouchableOpacity onPress={() => router.push('/pages/terms_conditions')} style={styles.item}>
//                         <View style={styles.left}>
//                             <View style={styles.iconContainer}>
//                                 <Terms width={20} height={20} style={styles.icon}/>
//                             </View>
//                             <Text style={styles.title}>Terms & Conditions</Text>
//                         </View>
//                         <View style={styles.right}>
//                             <RightIcon width={20} height={20}/>
//                         </View>
//                     </TouchableOpacity>
//                     <Divider/>
//                     {/* Privacy Policy */}
//                     <TouchableOpacity onPress={() => router.push('/pages/privacy_policy')} style={[styles.item, styles.noBorder]}>
//                         <View style={styles.left}>
//                             <View style={styles.iconContainer}>
//                                 <Privacy width={20} height={20} style={styles.icon}/>
//                             </View>
//                             <Text style={styles.title}>Privacy Policy</Text>
//                         </View>
//                         <View style={styles.right}>
//                             <RightIcon width={20} height={20}/>
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             <SgPopup
//                 visible={modalVisible}
//                 onClose={() => setModalVisible(false)}
//                 title="Languages"
//                 footerButton={
//                     <SgButton
//                         onPress={() => setModalVisible(false)}
//                         bgColor={COLORS.primary}
//                         color={COLORS.white}
//                     >
//                         Save
//                     </SgButton>
//                 }
//             >
//                 <SgSectionLanguageSelector/>
//             </SgPopup>
//         </View>
//     );
// };
