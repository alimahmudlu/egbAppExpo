import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/components/ui/NoticeCard/NoticeCard.styles';
import COLORS from '@/constants/colors';
import SgButton from '@/components/ui/Button/Button';
import SgPopup from '@/components/ui/Modal/Modal';

export default function SgNoticeCard({ icon, title, buttonText, bgCard, bgButton }) {
    const [modalVisible, setModalVisible] = useState(false);
    let cardBackground;
    let buttonBackground;

  switch (bgCard) {
    case 'success':
      cardBackground = COLORS.success_100;
      break;
    case 'danger':
      cardBackground = COLORS.error_100;
      break;
    case 'warning':
      cardBackground = COLORS.warning_100;
      break;
    default:
      cardBackground = COLORS.gray_100;
  }

  switch (bgButton) {
    case 'success':
      buttonBackground = COLORS.brand_600;
      break;
    case 'danger':
      buttonBackground = COLORS.error_600;
      break;
    case 'warning':
      buttonBackground = COLORS.warning_700;
      break;
    default:
      buttonBackground = COLORS.gray_700;
  }

  return (
    <View>
        <View style={[styles.container, { backgroundColor: cardBackground }]}>
            <View style={styles.leftRow}>
                {icon}
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity 
                onPress={() => setModalVisible(true)} 
                style={[styles.button, { backgroundColor: buttonBackground }]}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
        <SgPopup
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Task Completed"
        description="You have successfully completed the task."
        iconType="success"
        footerButton={
        <SgButton
            onPress={''}
            bgColor={COLORS.primary}
            color={COLORS.white}
        >
            Check in
        </SgButton>
        }
        />
    </View>
  );
}
