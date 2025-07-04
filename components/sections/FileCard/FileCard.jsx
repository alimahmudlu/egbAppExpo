import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './FileCard.styles';
import moment from "moment/moment";

import XLSXIcon from '@/assets/images/xlsx-icon.svg';
import PDFIcon from '@/assets/images/pdf-icon.svg';
import DOCIcon from '@/assets/images/doc-icon.svg';
import PPTIcon from '@/assets/images/ppt-icon.svg';
import EyeIcon from '@/assets/images/eye.svg';
import COLORS from '@/constants/colors';
import SgPopup from '@/components/ui/Modal/Modal';
import SgButton from '@/components/ui/Button/Button';
import SgTemplateFilePreview from "@/components/templates/FilePreview/FilePreview";


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
        return <DOCIcon width={32} height={32} />;
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

export default function SgFileCard({ fileType, title, description, issueDate, url, expiryDate, migrationId}) {
    const [previewModal, setPreviewModal] = useState(false);

    function togglePreviewModal() {
        setPreviewModal(!previewModal);
    }
    const [status, setStatus] = useState({
        name: "",
        styles: {}
    })

    useEffect(() => {
        const expiresAt = expiryDate
            ? new Date(expiryDate)
            : null;
        let _status = {
            name: 'Active',
            styles: getStatusStyles('success')
        };
        if (expiresAt) {
            const now = new Date();
            const diff =
                (expiresAt.getTime() - now.getTime()) /
                (1000 * 60 * 60 * 24);
            if (diff < 0) {
                _status = {
                    name: 'Expired',
                    styles: getStatusStyles('danger')
                };
            } else if (diff <= 30) {
                _status = {
                    name: 'Expires Soon',
                    styles: getStatusStyles('warning')
                };
            }
        }
        setStatus(_status)

    }, [expiryDate]);

  return (
    <View>
        <View style={styles.card}>
            <View style={styles.topRow}>
                <View>
                    {getFileIcon(fileType)}
                </View>
                <View style={[styles.statusBadge, { backgroundColor: status?.styles?.backgroundColor }]}>
                    <Text style={[styles.statusText, { color: status?.styles?.color }]}>{status?.name}</Text>
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
                    <Text style={styles.expireDate}>{expiryDate ? moment(expiryDate).format('DD.MM.YYYY') : null}</Text>
                </View>
                <TouchableOpacity onPress={togglePreviewModal}>
                    <EyeIcon width={20} height={20} />
                </TouchableOpacity>
            </View>
        </View>
        <SgPopup
            visible={previewModal}
            onClose={togglePreviewModal}
            title='Document view'
        >
            <SgTemplateFilePreview url={url} />
        </SgPopup>
    </View>
  );
}
