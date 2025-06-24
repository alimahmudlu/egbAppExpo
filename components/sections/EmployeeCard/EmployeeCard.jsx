import {View, Text, Image, TouchableOpacity, TextInput, Pressable, Alert} from 'react-native';
import styles from '@/components/sections/EmployeeCard/EmployeeCard.styles';
import {Ionicons} from '@expo/vector-icons';
import CancelIcon from '@/assets/images/x-close.svg';
import ConfirmIcon from '@/assets/images/check-icon.svg';
import ErrorIconModal from "@/assets/images/errorModal.svg";
import SuccessIconModal from "@/assets/images/successModal.svg";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import SgPopup from "@/components/ui/Modal/Modal";
import React, {useState} from 'react';
import Avatar from "@/assets/images/avatar.png";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import RejectIcon from '@/assets/images/x-close_12.svg';
import AcceptIcon from '@/assets/images/check_12.svg';
import InfoCircleModalIcon from "@/assets/images/infoCircleModal.svg";
import SgCard from "@/components/ui/Card/Card";
import {router} from "expo-router";
import SgSectionStatusCard from "@/components/sections/StatusCard/StatusCard";
import LogIn from "@/assets/images/log-in_20.svg";
import ApiService from "@/services/ApiService";
import {useAuth} from "@/hooks/useAuth";
import {useData} from "@/hooks/useData";
import moment from "moment/moment";


export default function SgSectionEmployeeCard({fullData, image, title, role, time, editable = true, status, reason}) {
    const [userOperationModal, setUserOperationModal] = useState(false);
    const [rejectCheckInModal, setRejectCheckInModal] = useState(false);
    const [rejectedCheckInModal, setRejectedCheckInModal] = useState(false);
    const [acceptCheckInModal, setAcceptCheckInModal] = useState(false);
    const [acceptedCheckInModal, setAcceptedCheckInModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const { accessToken, user: {id: userId} } = useAuth();
    const { removeRowData, insertData } = useData();

    const [rejectInfoModal, setRejectInfoModal] = useState(false);

    function toggleRejectInfoModal() {
        setRejectInfoModal(!rejectInfoModal);
    }


    function toggleUserOperationModal(status) {
        if (editable) {
            setUserOperationModal(status === 1 ? false : !userOperationModal);
        } else {
            router.push(`/timeKeeperPages/users/${fullData?.employee?.id}`)
        }
    }

    function toggleRejectCheckInModal() {
        setRejectCheckInModal(!rejectCheckInModal);
    }

    function handleSubmitReject() {
        ApiService.post('/timekeeper/activity/reject', {
            employee_id: fullData?.employee?.id,
            activity_id: fullData?.id,
            type: fullData?.type,
            confirm_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            reject_reason: rejectReason
        }, {
            headers: {
                'authorization': accessToken || ''
            }
        }).then(res => {
            if (res.data.success) {
                toggleRejectedCheckInModal();
                removeRowData('GET:/timekeeper/activity/list', fullData)
            }
            else {
                Alert.alert('Error', res.data.message || 'An error occurred while accepting the check-in.');
            }
        }).catch(err => {
            console.log(err?.message)
            Alert.alert('Error', 'An error aaaa reject occurred while accepting the check-in.');
        })
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
        ApiService.post('/timekeeper/activity/accept', {
            employee_id: fullData?.employee?.id,
            activity_id: fullData?.id,
            type: fullData?.type,
            confirm_time: moment().format('YYYY-MM-DD HH:mm:ss')
        }, {
            headers: {
                'authorization': accessToken || ''
            }
        }).then(res => {
            if (res.data.success) {
                toggleAcceptedCheckInModal();
                if (fullData?.type === 1) {
                    removeRowData('GET:/timekeeper/activity/list', fullData)
                    insertData('GET:/timekeeper/activity/list', {
                        ...fullData,
                        complete_status: 1,
                        confirm_time: new Date(),
                        confirm_employee_id: userId,
                        status: 1
                    })
                }
                else {
                    removeRowData('GET:/timekeeper/activity/list', fullData)
                }
            }
            else {
                Alert.alert('Error', res.data.message || 'An error occurred while accepting the check-in.');
            }
        }).catch(err => {
            console.log(err?.message)
            Alert.alert('Error', 'An error aaaa occurred while accepting the check-in.');
        })
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
                            <Image source={{uri: image}} style={styles.avatar}/>
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
                {editable ?
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]}
                                          onPress={toggleRejectCheckInModal}>
                            <CancelIcon with={20} height={20} style={styles.closeIcon}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.confirmButton]}
                                          onPress={toggleAcceptCheckInModal}>
                            <ConfirmIcon with={20} height={20} style={styles.confirmIcon}/>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.infoGroup}>
                        {status === 2 ?
                            <TouchableOpacity style={[styles.infoButton, styles.rejectButton]}
                                              onPress={toggleRejectInfoModal}>
                                <Text style={[styles.infoText, styles.rejectText]}>Rejected</Text>
                                <RejectIcon with={12} height={12} style={styles.rejectIcon}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={[styles.infoButton, styles.acceptButton]}>
                                <Text style={[styles.infoText, styles.acceptText]}>Accepted</Text>
                                <AcceptIcon with={12} height={12} style={styles.acceptIcon}/>
                            </TouchableOpacity>
                        }
                    </View>
                }
            </View>


            <SgPopup
                visible={rejectInfoModal}
                onClose={toggleRejectInfoModal}
                icon={<InfoCircleModalIcon width={56} height={56}/>}
            >
                <Text style={styles.rejectModal}>Reject detail</Text>
                <SgCard><Text>{reason}</Text></SgCard>
            </SgPopup>


            <SgPopup
                visible={userOperationModal}
                onClose={() => toggleUserOperationModal()}
                title=" "
            >
                <View style={{gap: 16, width: '100%'}}>
                    <View style={styles.modalGroup}>
                        <SgSectionUserInfo
                            rating={3.12}
                            name={title}
                            role={role}
                            profileImage={image || Avatar}
                            color="dark"
                            size="md"
                            clickable={`/timeKeeperPages/users/${fullData?.employee?.id}`}
                        />
                    </View>
                    <View style={styles.modalGroup}>
                        <View style={{flexDirection: 'row', gap: 12, alignItems: 'stretch'}}>
                            <View style={{flex: 1,}}>
                                <SgSectionStatusCard
                                    title={fullData?.type === 1 ? "Check In" : "Check Out"}
                                    time={time}
                                    icon={<LogIn width={20} height={20}/>}
                                />
                            </View>
                            <View style={{flex: 1}}>
                                <SgSectionStatusCard
                                    mapData={{
                                        latitude: fullData?.latitude,
                                        longitude: fullData?.longitude,
                                    }}
                                    title={fullData?.type === 1 ? "Check In" : "Check Out"}
                                    time={time}
                                    icon={<LogIn width={20} height={20}/>}
                                />
                            </View>
                        </View>
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
                icon={<ErrorIconModal width={56} height={56}/>}
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
                        onChangeText={(e) => {
                            setRejectReason(e)
                        }}
                        value={rejectReason}
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
                icon={<ErrorIconModal width={56} height={56}/>}
            />

            <SgPopup
                visible={acceptCheckInModal}
                onClose={() => toggleAcceptCheckInModal()}
                title="Accept"
                description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
                icon={<SuccessIconModal width={56} height={56}/>}
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
                icon={<SuccessIconModal width={56} height={56}/>}
            />
        </>
    );
};