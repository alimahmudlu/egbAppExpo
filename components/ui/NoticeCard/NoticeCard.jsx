import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/components/ui/NoticeCard/NoticeCard.styles';
import COLORS from '@/constants/colors';
import SgButton from '@/components/ui/Button/Button';
import SgPopup from '@/components/ui/Modal/Modal';
import {useRouter} from "expo-router";

export default function SgNoticeCard({ icon, title, buttonText, bgCard, bgButton, href, onClick }) {
    const [modalVisible, setModalVisible] = useState(false);
    let cardBackground;
    let buttonBackground;
    const router = useRouter();

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
    case 'lightSuccess':
      buttonBackground = COLORS.brand_50;
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

    function handleOnClick() {
        if (href) {
            router.navigate(href)
        }
        else {
            onClick?.()
        }
    }

  return (
    <View>
        <View style={[styles.container, { backgroundColor: cardBackground }]}>
            <View style={styles.leftRow}>
                {icon}
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity 
                onPress={(e) => handleOnClick?.(e)}
                style={[styles.button, { backgroundColor: buttonBackground }]}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}
