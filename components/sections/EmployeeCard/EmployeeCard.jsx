import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '@/components/sections/EmployeeCard/EmployeeCard.styles';
import { Ionicons } from '@expo/vector-icons';
import CancelIcon from '@/assets/images/x-close.svg';
import ConfirmIcon from '@/assets/images/check-icon.svg';
import RejectIcon from '@/assets/images/x-close_12.svg';
import AcceptIcon from '@/assets/images/check_12.svg';
export default function SgSectionEmployeeCard ({ image, title, role, time }) {
  return (
    <View style={styles.employeeCard}>
      <View style={styles.avatarContainer}>
        {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
            <Text style={styles.initials}>
                {title ? title.split(' ').map(n => n[0]).join('') : 'NA'}
            </Text>
        )}
      </View>
      <View style={styles.employeeInfo}>
        <Text style={styles.employeeName}>{title}</Text>
        <Text style={styles.employeeRole}>{role}</Text>
        <Text style={styles.checkTime}>Check in: <Text style={styles.time}>{time}</Text></Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]}>
            <CancelIcon with={20} height={20} style={styles.closeIcon}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.confirmButton]}>
            <ConfirmIcon with={20} height={20} style={styles.confirmIcon}/>
        </TouchableOpacity>
      </View>
      {/* Accept and reject Info */}
      {/* <View style={styles.infoGroup}>
        <TouchableOpacity style={[styles.infoButton, styles.rejectButton]}>
            <Text style={[styles.infoText, styles.rejectText]}>Rejected</Text>
            <RejectIcon with={12} height={12} style={styles.rejectIcon}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.infoButton, styles.acceptButton]}>
            <Text style={[styles.infoText, styles.acceptText]}>Accepted</Text>
            <AcceptIcon with={12} height={12} style={styles.acceptIcon}/>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};