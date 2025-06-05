{/* <SgSectionStatusInfo 
    title="Progress"
    status="Check Progress"
    statusType="warning"
/> */}


import { View, Text } from 'react-native';
import styles from '@/components/sections/StatusInfo/StatusInfo.styles';
import COLORS from '@/constants/colors';

export default function SgSectionStatusInfo({ title, status, statusType }) {
    const getStatusStyles = (statusType) => {
        switch (statusType) {
            case 'success':
                return {backgroundColor: COLORS.success_100, color: COLORS.success_700};
            case 'danger':
                return {backgroundColor: COLORS.error_100, color: COLORS.error_700};
            case 'warning':
                return {backgroundColor: COLORS.warning_100, color: COLORS.warning_700};
            default:
                return {backgroundColor: COLORS.white, color: COLORS.black};
        }
    };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        {status && (
            <View
                style={[
                    styles.statusBadge,
                    {backgroundColor: getStatusStyles(statusType).backgroundColor},
                ]}
            >
                <Text
                    style={[
                        styles.statusText,
                        {color: getStatusStyles(statusType).color},
                    ]}
                >
                    {status}
                </Text>
            </View>
        )}
      </View>
    </View>
  );
}
