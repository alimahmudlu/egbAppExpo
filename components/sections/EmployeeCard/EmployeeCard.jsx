import {View, Text, Image, TouchableOpacity, TextInput, Pressable, Alert} from 'react-native';
import styles from '@/components/sections/EmployeeCard/EmployeeCard.styles';
import { Ionicons } from '@expo/vector-icons';
import CancelIcon from '@/assets/images/x-close.svg';
import ConfirmIcon from '@/assets/images/check-icon.svg';
import ErrorIconModal from "@/assets/images/errorModal.svg";
import SuccessIconModal from "@/assets/images/successModal.svg";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import SgPopup from "@/components/ui/Modal/Modal";
import React, { useState } from 'react';
import Avatar from "@/assets/images/avatar.png";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import RejectIcon from '@/assets/images/x-close_12.svg';
import AcceptIcon from '@/assets/images/check_12.svg';


export default function SgSectionEmployeeCard ({ image, title, role, time }) {
    const [userOperationModal, setUserOperationModal] = useState(false);
    const [rejectCheckInModal, setRejectCheckInModal] = useState(false);
    const [rejectedCheckInModal, setRejectedCheckInModal] = useState(false);
    const [acceptCheckInModal, setAcceptCheckInModal] = useState(false);
    const [acceptedCheckInModal, setAcceptedCheckInModal] = useState(false);

    function toggleUserOperationModal(status) {
        setUserOperationModal( status === 1 ? false : !userOperationModal);
    }

    function toggleRejectCheckInModal() {
        setRejectCheckInModal(!rejectCheckInModal);
    }

    function handleSubmitReject() {
        toggleRejectedCheckInModal();
    }

    function toggleRejectedCheckInModal() {
        if (rejectedCheckInModal) {
            setRejectCheckInModal(false);
            setUserOperationModal(false)
        }
        setRejectedCheckInModal(!rejectedCheckInModal);
    }

    function toggleAcceptCheckInModal() {
        setAcceptCheckInModal(!acceptCheckInModal);
    }


    function handleSubmitAccept() {
        toggleAcceptedCheckInModal();
    }

    function toggleAcceptedCheckInModal() {
        if (acceptedCheckInModal) {
            setAcceptCheckInModal(false);
            setUserOperationModal(false)
        }
        setAcceptedCheckInModal(!acceptedCheckInModal);
    }

  return (

    <>
        <View style={styles.employeeCard}>
            <Pressable style={styles.employeeCardGroup} onPress={toggleUserOperationModal}>
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
            </Pressable>
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={toggleRejectCheckInModal}>
                    <CancelIcon with={20} height={20} style={styles.closeIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={toggleAcceptCheckInModal}>
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

        <SgPopup
            visible={userOperationModal}
            onClose={() => toggleUserOperationModal()}
            title=" "
        >
            <View style={{gap: 16, width: '100%'}}>
                <View style={styles.modalGroup}>
                    <SgSectionUserInfo
                        rating={3.12}
                        name="Jane Doe"
                        role="Employee"
                        profileImage={Avatar}
                        color="dark"
                        size="md"
                        clickable={'/timeKeeperPages/users/1'}
                    />
                </View>
                <View style={styles.modalGroup}>
                    <Text>
                        MAPS SECTION
                    </Text>
                </View>
                <View style={styles.modalGroup}>
                    <View style={styles.modalGroupButtons}>
                        <SgButton
                            color={COLORS.error_700}
                            bgColor={COLORS.error_50}
                            onPress={toggleRejectCheckInModal}
                        >
                            Reject
                        </SgButton>
                        <SgButton
                            color={COLORS.white}
                            bgColor={COLORS.brand_600}
                            onPress={toggleAcceptCheckInModal}
                        >
                            Accept
                        </SgButton>
                    </View>
                </View>
            </View>
        </SgPopup>

        <SgPopup
            visible={rejectCheckInModal}
            onClose={() => toggleRejectCheckInModal()}
            title="Reject"
            description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
            icon={<ErrorIconModal width={56} height={56} />}
            footerButton={
                <SgButton
                    bgColor={COLORS.error_600}
                    color={COLORS.white}
                    onPress={handleSubmitReject}
                >
                    Yes, reject
                </SgButton>
            }
        >
            <View style={{marginBottom: 16, width: '100%'}}>
                <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={6}
                    // onChangeText={onChangeNumber}
                    // value={''}
                    placeholder="Reject detail..."
                    keyboardType="keyboard-type"
                />
            </View>
        </SgPopup>

        <SgPopup
            visible={rejectedCheckInModal}
            onClose={() => toggleRejectedCheckInModal()}
            title="Check in rejected"
            description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
            icon={<ErrorIconModal width={56} height={56} />}
        />

        <SgPopup
            visible={acceptCheckInModal}
            onClose={() => toggleAcceptCheckInModal()}
            title="Accept"
            description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
            icon={<SuccessIconModal width={56} height={56} />}
            footerButton={
                <SgButton
                    bgColor={COLORS.brand_600}
                    color={COLORS.white}
                    onPress={handleSubmitAccept}
                >
                    Yes, accept
                </SgButton>
            }
        />

        <SgPopup
            visible={acceptedCheckInModal}
            onClose={() => toggleAcceptedCheckInModal()}
            title="Check in accepted"
            description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
            icon={<SuccessIconModal width={56} height={56} />}
        />
    </>
  );
};