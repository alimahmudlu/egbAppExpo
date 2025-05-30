import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import DotsIcon from "../../../assets/images/dots-icon.svg";
import styles from './TaskCard.styles';
import COLORS from '@/constants/colors';
import SgPopup from '@/components/ui/Modal/Modal';
import InfoIcon from "@/assets/images/info-circle.svg"
import SgButton from '@/components/ui/Button/Button';

export default function SgSectionTaskCard({ time, title, description, name, image, status, statusType, duration }) {
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = () => {
        console.log('Check in clicked');
    };

    const getStatusStyles = (statusType) => {
        switch (statusType) {
            case 'success':
                return { backgroundColor: COLORS.success_100, color: COLORS.success_700 };
            case 'warning':
                return { backgroundColor: COLORS.warning_100, color: COLORS.warning_700 };
            default:
                return { backgroundColor: COLORS.white, color: COLORS.black };
        }
    };
  return (
    <View>
        <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.time}>{time}</Text>
        <View style={styles.rightHeader}>
            {status && (
                <View
                    style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusStyles(statusType).backgroundColor },
                    ]}
                >
                    <Text
                    style={[
                        styles.statusText,
                        { color: getStatusStyles(statusType).color },
                    ]}
                    >
                    {status}
                    </Text>
                </View>
            )}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
            <DotsIcon width={20} height={20} style={styles.dotsIcon} />
            </TouchableOpacity>
        </View>
        </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.duration}>{duration}</Text>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholderAvatar}>
              <Text style={styles.avatarText}>
                {name?.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
    <SgPopup
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Task Completed"
        description="You have successfully completed the task."
        iconType="success"
        footerButton={
        <SgButton
            onPress={handleDelete}
            bgColor={COLORS.primary}
            color={COLORS.white}
        >
            Check in
        </SgButton>
        }
        />
    </View>
  );
};
