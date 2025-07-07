import {View, Text, Image, TouchableOpacity, TextInput, Pressable, Alert, Platform} from 'react-native';
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
import moment from "moment-timezone";
import {useApi} from "@/hooks/useApi";
import * as Location from "expo-location";
import * as Linking from "expo-linking";


export default function SgSectionEmployeeCard(props) {
    const {fullData, image, title, role, time, editable = true, manual=false, manualData = {}, status, reason} = props;
    const [userOperationModal, setUserOperationModal] = useState(false);
    const [rejectCheckInModal, setRejectCheckInModal] = useState(false);
    const [rejectedCheckInModal, setRejectedCheckInModal] = useState(false);
    const [acceptCheckInModal, setAcceptCheckInModal] = useState(false);
    const [acceptedCheckInModal, setAcceptedCheckInModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const { accessToken, user } = useAuth();
    const { removeRowData, insertData, changeRowData } = useData();
    const {request} = useApi();
    const [clickType, setClickType] = useState(null)
    const [openSettingsModal, setOpenSettingsModal] = useState(false)

    const [rejectInfoModal, setRejectInfoModal] = useState(false);

    function toggleRejectInfoModal() {
        setRejectInfoModal(!rejectInfoModal);
    }


    function toggleUserOperationModal() {
        if (editable) {
            setUserOperationModal(status === 1 ? false : !userOperationModal);
        } else {
            router.push(`/timeKeeperPages/users/${fullData?.employee?.id}`)
        }
    }

    function toggleRejectCheckInModal() {
        setRejectCheckInModal(!rejectCheckInModal);
        toggleUserOperationModal()
    }

    function handleSubmitReject() {
        request({
            url: '/timekeeper/activity/reject', method: 'post', data: {
                employee_id: fullData?.employee?.id,
                activity_id: fullData?.id,
                type: fullData?.type,
                confirm_time: moment(),
                timezone: moment.tz.guess(),
                reject_reason: rejectReason
            }
        }).then(res => {
            if (res.data.success) {
                toggleRejectedCheckInModal();
                removeRowData('GET:/timekeeper/activity/list', fullData)
            } else {
                console.log('Error', res.data.message || 'An error occurred while accepting the check-in.');
            }
        }).catch(err => {
            console.log(err, 'apiservice control err')
        });
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
        toggleUserOperationModal()
    }


    function handleSubmitAccept() {
        ApiService.post('/timekeeper/activity/accept', {
            employee_id: fullData?.employee?.id,
            confirm_time: moment(),
            timezone: moment.tz.guess(),
            activity_id: fullData?.id,
            type: fullData?.type,
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
                        confirm_time: moment(),
                        timezone: moment.tz.guess(),
                        confirm_employee_id: user?.id,
                        status: 2
                    })
                }
                else {
                    removeRowData('GET:/timekeeper/activity/list', fullData?.activity_id, 'id')
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




    function toggleOpenSettingsModal() {
        setOpenSettingsModal(!openSettingsModal)
    }

    function handleOpenSettings() {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:')
                .catch(() => {
                });
        } else {
            // Android için:
            Linking.openSettings()
                .catch(() => {
                });
        }
    }

    async function handleCheckInRequest(type) {
        try {
            // Request permission to access locations
            let {status, canAskAgain} = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                if (!canAskAgain) {
                    toggleOpenSettingsModal()
                    return;
                }
            }

            // Get the current position
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Lowest,
            });

            const {latitude, longitude} = location.coords;
            // Log the location data
            if (props.onLocationReceived) {
                props.onLocationReceived({latitude, longitude});
            }

            // onSuccess callback
            // FIXME: This is where you would handle the successful check-in logic, sending the location and now time to your backend.
            handleManualCheckIn({latitude, longitude}, type)
        } catch (error) {
            console.error('Error getting location:', error);
            toggleOpenSettingsModal()
        }
    }

    function handleManualCheckIn(locationData, type = 'checkin') {
        request({
            url: `/timekeeper/manual/${type}`,
            method: 'post',
            data: {
                employee_id:  fullData?.id,
                employee_timezone: moment.tz.guess(),
                request_time: moment(),
                longitude: locationData?.longitude,
                latitude: locationData?.latitude,
                work_time: null,
                activity_id: fullData?.checkin?.id,
            }
        }).then(res => {
            changeRowData(`GET:/timekeeper/manual/list`, res?.data, res?.data?.id, 'id')
            toggleUserOperationModal()
        }).catch(err => {
            console.log('err')
            console.log(err)
        })
    }

    return (

        <>
            <View style={styles.employeeCard}>
                <Pressable style={styles.employeeCardGroup} onPress={toggleUserOperationModal}>
                    <View style={styles.avatarContainer}>
                        {image ? (
                            // <Image source={{uri: image}} style={styles.avatar}/>
                            <Text style={styles.initials}>
                                {title ? title.split(' ').map(n => n[0]).join('') : 'NA'}
                            </Text>
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
                {!manual ?
                    (editable ?
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]}
                                              onPress={() => {
                                                  setClickType('reject')
                                                  toggleUserOperationModal()
                                              }}>
                                <CancelIcon with={20} height={20} style={styles.closeIcon}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.confirmButton]}
                                              onPress={() => {
                                                  setClickType('accept')
                                                  toggleUserOperationModal()
                                              }}>
                                <ConfirmIcon with={20} height={20} style={styles.confirmIcon}/>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.infoGroup}>
                            {status === 3 ?
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
                        </View>)
                    : null
                }
            </View>


            <SgPopup
                visible={rejectInfoModal}
                onClose={toggleRejectInfoModal}
                icon={<InfoCircleModalIcon width={56} height={56}/>}
            >
                <Text style={styles.rejectModal}>Reject detail</Text>
                <SgCard><Text style={styles.title}>{reason || ''}</Text></SgCard>
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
                    {manual ?
                        <View style={styles.modalGroup}>
                            <View style={{flexDirection: 'row', gap: 12, alignItems: 'stretch'}}>
                                <View style={{flex: 1,}}>
                                    <SgSectionStatusCard
                                        mapData={{
                                            latitude: fullData?.checkin?.latitude,
                                            longitude: fullData?.checkin?.longitude,
                                        }}
                                        title={"Check In"}
                                        time={time}
                                        icon={<LogIn width={20} height={20}/>}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <SgSectionStatusCard
                                        mapData={{
                                            latitude: fullData?.checkout?.latitude,
                                            longitude: fullData?.checkout?.longitude,
                                        }}
                                        title={"Check Out"}
                                        time={time}
                                        icon={<LogIn width={20} height={20}/>}
                                    />
                                </View>
                            </View>
                        </View>
                        :
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
                    }
                    <View style={styles.modalGroup}>
                        {manual ?
                            <View style={styles.modalGroupButtons}>
                                {!fullData?.checkin?.latitude ?
                                    <SgButton
                                        color={COLORS.error_700}
                                        bgColor={COLORS.error_50}
                                        onPress={() => handleCheckInRequest('checkin')}
                                    >
                                        Check in
                                    </SgButton>
                                    : null
                                }
                                {(!fullData?.checkout?.latitude && fullData?.checkin?.latitude) ?
                                    <SgButton
                                        color={COLORS.white}
                                        bgColor={COLORS.brand_600}
                                        onPress={() => handleCheckInRequest('checkout')}
                                    >
                                        Check out
                                    </SgButton>
                                    : null
                                }
                            </View>
                            :
                            <View style={styles.modalGroupButtons}>
                                {clickType === 'reject' ?
                                    <SgButton
                                        color={COLORS.error_700}
                                        bgColor={COLORS.error_50}
                                        onPress={toggleRejectCheckInModal}
                                    >
                                        Reject
                                    </SgButton>
                                    : null
                                }
                                {clickType === 'accept' ?
                                    <SgButton
                                        color={COLORS.white}
                                        bgColor={COLORS.brand_600}
                                        onPress={toggleAcceptCheckInModal}
                                    >
                                        Accept
                                    </SgButton>
                                    : null
                                }
                                {!clickType ?
                                    <>
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
                                    </>
                                    : null
                                }
                            </View>
                        }
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
                        value={rejectReason || ''}
                        placeholder="Reject detail..."
                        keyboardType="default"
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

            <SgPopup
                visible={openSettingsModal}
                onClose={toggleOpenSettingsModal}
                title="Permission Error"
                description="Location permission error. You have not given permission to access your locations. If you want to turn it on, go to settings. Open settings??"
                // icon={<CheckInModalIcon width={56} height={56}/>}
                footerButton={
                    <SgButton
                        onPress={handleOpenSettings}
                        bgColor={COLORS.primary}
                        color={COLORS.white}
                    >
                        Open
                    </SgButton>
                }
            />
        </>
    );
};