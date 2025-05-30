import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './FileCard.styles';

import XLSXIcon from '@/assets/images/xlsx-icon.svg';
import PDFIcon from '@/assets/images/pdf-icon.svg';
import DOCIcon from '@/assets/images/doc-icon.svg';
import PPTIcon from '@/assets/images/ppt-icon.svg';
import EyeIcon from '@/assets/images/eye.svg';
import COLORS from '@/constants/colors';
import SgPopup from '@/components/ui/Modal/Modal';
import SgButton from '@/components/ui/Button/Button';


const getFileIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'xlsx':
      return <XLSXIcon width={32} height={32} />;
    case 'pdf':
      return <PDFIcon width={32} height={32} />;
    case 'doc':
      return <DOCIcon width={32} height={32} />;
    case 'ppt':
      return <PPTIcon width={32} height={32} />;
    default:
      return null;
  }
};


const getStatusStyles = (type) => {
  switch (type) {
    case 'danger':
      return { backgroundColor: COLORS.error_100, color: COLORS.error_700 }; 
    case 'success':
      return { backgroundColor: COLORS.success_100, color: COLORS.success_700 }; 
    case 'warning':
      return { backgroundColor: COLORS.warning_100, color: COLORS.warning_700 }; 
    default:
      return { backgroundColor: COLORS.gray_100, color: COLORS.gray_700 };
  }
};

export default function SgFileCard({ fileType, title, description, date, migrationId, statusType, statusText}) {
    const [modalVisible, setModalVisible] = useState(false);

    const status = getStatusStyles(statusType);

  return (
    <View>
        <View style={styles.card}>
            <View style={styles.topRow}>
                {getFileIcon(fileType)}
                <View style={[styles.statusBadge, { backgroundColor: status.backgroundColor }]}>
                <Text style={[styles.statusText, { color: status.color }]}>{statusText}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.migrationBox}>
                    <Text style={styles.migrationText}>{migrationId}</Text>
                </View>

                
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>

            <View style={styles.bottomRow}>
                <View style={styles.expireBox}>
                    <Text style={styles.expireText}>Expire date:</Text>
                    <Text style={styles.expireDate}>{date}</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <EyeIcon width={20} height={20} />
                </TouchableOpacity>
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
