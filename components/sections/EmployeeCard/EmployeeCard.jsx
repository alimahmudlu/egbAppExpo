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
import React, {useEffect, useState} from 'react';
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
import {useTranslation} from "react-i18next";
import SgRadio from "@/components/ui/Radio/Radio";


export default function SgSectionEmployeeCard(props) {
    const {fullData, image, title, role, position, time, checkType, editable = true, manual=false, manualData = {}, status, reason, atWork, timeRaw, overTime = false} = props;
    const [userOperationModal, setUserOperationModal] = useState(false);
    const [rejectCheckInModal, setRejectCheckInModal] = useState(false);
    const [rejectedCheckInModal, setRejectedCheckInModal] = useState(false);
    const [acceptCheckInModal, setAcceptCheckInModal] = useState(false);
    const [acceptedCheckInModal, setAcceptedCheckInModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const { accessToken, user } = useAuth();
    const { removeRowData, insertData, changeRowData, changeAddRowData } = useData();
    const {request} = useApi();
    const [clickType, setClickType] = useState(null)
    const [openSettingsModal, setOpenSettingsModal] = useState(false)
    const {t} = useTranslation();
    const [buttonStatus, setButtonStatus] = useState(false);
    const [confirmType, setConfirmType] = useState(1);

    const [rejectInfoModal, setRejectInfoModal] = useState(false);

    function toggleRejectInfoModal() {
        setRejectInfoModal(!rejectInfoModal);
    }


    function toggleUserOperationModal() {
        if (editable || (isManualCheckoutAvailable() && atWork)) {
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
        setButtonStatus(true)
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
            setButtonStatus(false)
            if (res.success) {
                toggleRejectedCheckInModal();
                removeRowData('GET:/timekeeper/activity/list', fullData)
            } else {
                console.log('Error', res.data.message || 'An error occurred while accepting the check-in.');
            }

        }).catch(err => {
            setButtonStatus(false)
            console.log(err, 'apiservice control err')
        });
    }

    function handleSubmitRejectOverTime() {
        setButtonStatus(true)
        request({
            url: '/timekeeper/overtime/reject', method: 'post', data: {
                employee_id: fullData?.employee?.id,
                activity_id: fullData?.id,
                type: fullData?.type,
                confirm_time: moment(),
                timezone: moment.tz.guess(),
                reject_reason: rejectReason
            }
        }).then(res => {
            setButtonStatus(false)
            if (res.success) {
                toggleRejectedCheckInModal();
                removeRowData('GET:/timekeeper/overtime/list', fullData)
            } else {
                console.log('Error', res.data.message || 'An error occurred while accepting the check-in.');
            }

        }).catch(err => {
            setButtonStatus(false)
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

    const now = moment();
    const today = moment().format("YYYY-MM-DD");

    const isManualCheckoutAvailable = () => {
        const isToday = moment(timeRaw).format("YYYY-MM-DD") === today;
        const isPastDay = moment(moment(timeRaw).format("YYYY-MM-DD")).isBefore(today);

        if (isPastDay) return true;
        if (isToday && now.isAfter(moment().set({ hour: 6, minute: 0 }))) return true;

        return false;
    };


    function handleSubmitAccept() {
        ApiService.post('/timekeeper/activity/accept', {
            employee_id: fullData?.employee?.id,
            confirm_time: moment(),
            timezone: moment.tz.guess(),
            activity_id: fullData?.id,
            type: fullData?.type,
            confirm_type: fullData?.type === 2 ? confirmType : null
        }, {
            headers: {
                'authorization': accessToken || ''
            }
        }).then(res => {
            setButtonStatus(false)
            if (res.data.success) {
                setAcceptCheckInModal(false);
                setUserOperationModal(false)


                // setAcceptedCheckInModal(false);
                if (fullData?.type === 1) {
                    removeRowData('GET:/timekeeper/activity/list', fullData)
                    insertData('GET:/timekeeper/activity/list', {
                        ...fullData,
                        complete_status: 1,
                        confirm_time: moment(),
                        review_time: moment(),
                        timezone: moment.tz.guess(),
                        confirm_employee_id: user?.id,
                        status: 2
                    })
                }
                if (fullData?.type === 3) {
                    removeRowData('GET:/timekeeper/overtime/list', fullData)
                    // insertData('GET:/timekeeper/overtime/list', {
                    //     ...fullData,
                    //     complete_status: 1,
                    //     confirm_time: moment(),
                    //     review_time: moment(),
                    //     timezone: moment.tz.guess(),
                    //     confirm_employee_id: user?.id,
                    //     status: 2
                    // })
                }
                else {
                    removeRowData('GET:/timekeeper/activity/list', fullData?.activity_id, 'id')
                    removeRowData('GET:/timekeeper/activity/list', fullData)
                    insertData('GET:/timekeeper/activity/list', {
                        ...fullData,
                        activity_id: fullData?.id,
                        confirm_time: moment(),
                        review_time: moment(),
                        timezone: moment.tz.guess(),
                        confirm_employee_id: user?.id,
                        status: 2,
                        complete_status: 1,
                        completed_status: 1,
                    })
                }

            }
            else {
                Alert.alert('Error', res.data.message || 'An error occurred while accepting the check-in.');
            }
        }).catch(err => {
            setButtonStatus(false)
            console.log(err?.message)
            Alert.alert('Error', 'An error aaaa occurred while accepting the check-in.');
        })
    }

    function handleSubmitAcceptOverTime() {
        ApiService.post('/timekeeper/overtime/accept', {
            employee_id: fullData?.employee?.id,
            confirm_time: moment(),
            timezone: moment.tz.guess(),
            activity_id: fullData?.id,
            type: fullData?.type,
            confirm_type: fullData?.type === 4 ? confirmType : null
        }, {
            headers: {
                'authorization': accessToken || ''
            }
        }).then(res => {
            setButtonStatus(false)
            if (res.data.success) {
                // setAcceptCheckInModal(false);
                setUserOperationModal(false)
                setAcceptCheckInModal(false);
                // setAcceptedCheckInModal(false);
                // if (fullData?.type === 3) {
                //     removeRowData('GET:/timekeeper/overtime/list', fullData)
                //     insertData('GET:/timekeeper/overtime/list', {
                //         ...fullData,
                //         complete_status: 0,
                //         confirm_time: moment(),
                //         review_time: moment(),
                //         timezone: moment.tz.guess(),
                //         confirm_employee_id: user?.id,
                //         status: 2
                //     })
                // }
                // if (fullData?.type === 4) {
                //     removeRowData('GET:/timekeeper/overtime/list', fullData)
                //     // insertData('GET:/timekeeper/overtime/list', {
                //     //     ...fullData,
                //     //     complete_status: 1,
                //     //     confirm_time: moment(),
                //     //     review_time: moment(),
                //     //     timezone: moment.tz.guess(),
                //     //     confirm_employee_id: user?.id,
                //     //     status: 2
                //     // })
                // }

                if (fullData?.type === 3) {
                    removeRowData('GET:/timekeeper/overtime/list', fullData)
                    insertData('GET:/timekeeper/overtime/list', {
                        ...fullData,
                        complete_status: 1,
                        confirm_time: moment(),
                        review_time: moment(),
                        timezone: moment.tz.guess(),
                        confirm_employee_id: user?.id,
                        status: 2
                    })
                }
                else {
                    removeRowData('GET:/timekeeper/overtime/list', fullData?.activity_id, 'id')
                    removeRowData('GET:/timekeeper/overtime/list', fullData)
                    insertData('GET:/timekeeper/overtime/list', {
                        ...fullData,
                        activity_id: fullData?.id,
                        confirm_time: moment(),
                        review_time: moment(),
                        timezone: moment.tz.guess(),
                        confirm_employee_id: user?.id,
                        status: 2,
                        complete_status: 1,
                        completed_status: 1,
                    })
                }
            }
            else {
                Alert.alert('Error', res.data.message || 'An error occurred while accepting the check-in.');
            }
        }).catch(err => {
            setButtonStatus(false)
            console.log(err?.message)
            Alert.alert('Error', 'An error aaaa occurred while accepting the check-in.');
        })
    }

    function toggleAcceptedCheckInModal() {
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
        setButtonStatus(true)
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
            setButtonStatus(false)
            toggleOpenSettingsModal()
        }
    }

    function handleManualCheckIn(locationData, type = 'checkin') {
        request({
            url: `/timekeeper/manual/${type}`,
            method: 'post',
            data: {
                employee_id:  (isManualCheckoutAvailable() && atWork) ? fullData?.employee_id : fullData?.id,
                employee_timezone: moment.tz.guess(),
                request_time: moment(),
                longitude: locationData?.longitude,
                latitude: locationData?.latitude,
                work_time: null,
                activity_id: fullData?.checkin?.id,
                confirm_type: confirmType
            }
        }).then(res => {
            changeRowData(`GET:/timekeeper/manual/list`, res?.data, res?.data?.id, 'id')
            setButtonStatus(false)
            if(isManualCheckoutAvailable() && atWork) {
                request({
                    url: '/timekeeper/activity/list', method: 'get'
                }).then(res => {
                }).catch(err => {
                    console.log(err, 'apiservice control err')
                });
            }
            toggleUserOperationModal()
        }).catch(err => {
            console.log('err')
            console.log(err)
            setButtonStatus(false)
        })
    }

    function handleChangeConfirmType(type) {
        setConfirmType(type)
    }

    useEffect(() => {
        setConfirmType(1)
    }, [userOperationModal]);

    return (

        <>
            <View style={styles.employeeCard}>
                <Pressable style={styles.employeeCardGroup} onPress={toggleUserOperationModal}>
                    <View style={styles.avatarContainer}>
                        {image ? (
                            // <Image source={{uri: image}} style={styles.avatar}/>
                            <Text style={styles.initials}>
                                {title ? title?.split(' ')?.splice(0, 2)?.map(n => n?.[0]).join('') : 'NA'}
                            </Text>
                        ) : (
                            <Text style={styles.initials}>
                                {title ? title?.split(' ')?.splice(0, 2)?.map(n => n?.[0]).join('') : 'NA'}
                            </Text>
                        )}
                    </View>
                    <View style={styles.employeeInfo}>
                        <Text style={styles.employeeName}>{title}</Text>
                        <Text style={styles.employeeRole}>{role}</Text>
                        <Text style={styles.checkTime}>{t('checkTime')}: <Text style={styles.time}>{time}</Text></Text>
                        <Text style={styles.checkTime}>{t('checkType')}: <Text style={styles.time}>{checkType}</Text></Text>
                    </View>
                </Pressable>
                <View style={{gap: 16}}>
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
                                        <Text style={[styles.infoText, styles.rejectText]}>{t('rejected')}</Text>
                                        <RejectIcon with={12} height={12} style={styles.rejectIcon}/>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={[styles.infoButton, styles.acceptButton]}>
                                        <Text style={[styles.infoText, styles.acceptText]}>{t('accepted')}</Text>
                                        <AcceptIcon with={12} height={12} style={styles.acceptIcon}/>
                                    </TouchableOpacity>
                                }
                            </View>)
                        : null
                    }
                    {(isManualCheckoutAvailable() && atWork) ?
                        <TouchableOpacity style={[styles.infoButton, styles.rejectButton]}
                                          onPress={toggleUserOperationModal}>
                            <Text style={[styles.infoText, styles.rejectText]}>{t('manualCheckOut')}</Text>
                        </TouchableOpacity>
                        : null
                    }
                </View>
            </View>


            <SgPopup
                visible={rejectInfoModal}
                onClose={toggleRejectInfoModal}
                icon={<InfoCircleModalIcon width={56} height={56}/>}
                autoClose={false}
            >
                <Text style={styles.rejectModal}>{t('rejectDetail')}</Text>
                <SgCard><Text style={styles.title}>{reason || ''}</Text></SgCard>
            </SgPopup>


            <SgPopup
                visible={userOperationModal}
                onClose={() => toggleUserOperationModal()}
                title=" "
                autoClose={false}
            >
                <View style={{gap: 16, width: '100%'}}>
                    <View style={styles.modalGroup}>
                        <SgSectionUserInfo
                            rating={3.12}
                            name={title}
                            role={role}
                            position={position || fullData?.position}
                            profileImage={image}
                            color="dark"
                            size="md"
                            clickable={`/timeKeeperPages/users/${fullData?.employee?.id}`}
                        />
                    </View>
                    {(manual) ?
                        <View style={styles.modalGroup}>
                            <View style={{flexDirection: 'row', gap: 12, alignItems: 'stretch'}}>
                                <View style={{flex: 1,}}>
                                    <SgSectionStatusCard
                                        mapData={{
                                            latitude: fullData?.checkin?.latitude,
                                            longitude: fullData?.checkin?.longitude,
                                        }}
                                        title={t('checkIn')}
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
                                        title={t('checkOut')}
                                        time={time}
                                        icon={<LogIn width={20} height={20}/>}
                                    />
                                </View>
                            </View>
                        </View>
                        :
                        ((isManualCheckoutAvailable() && atWork) ?
                                <View style={styles.modalGroup}>
                                    <View style={{flexDirection: 'row', gap: 12, alignItems: 'stretch'}}>
                                        <View style={{flex: 1,}}>
                                            <SgSectionStatusCard
                                                mapData={{
                                                    latitude: fullData?.latitude,
                                                    longitude: fullData?.longitude,
                                                }}
                                                title={t('checkIn')}
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
                                                title={t('checkOut')}
                                                time={''}
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
                                                title={fullData?.type === 1 ? t('checkIn') : (fullData?.type === 3 ? t('overTime') : t('checkOut'))}
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
                                                title={fullData?.type === 1 ? t('checkIn') : (fullData?.type === 3 ? t('overTime') : t('checkOut'))}
                                                time={time}
                                                icon={<LogIn width={20} height={20}/>}
                                            />
                                        </View>
                                    </View>
                                </View>
                        )
                    }
                    {((manual && !fullData?.checkout?.latitude && fullData?.checkin?.latitude) || (isManualCheckoutAvailable() && atWork) || fullData?.type === 2) ?
                        <View>
                            <TouchableOpacity
                                activeOpacity={1}
                                key={1}
                                onPress={() => handleChangeConfirmType(1)}
                                style={[
                                    styles.item,
                                    confirmType === 1 && styles.selectedItem
                                ]}
                            >
                                <SgRadio selected={confirmType === 1} />
                                <View style={styles.content}>
                                    <Text style={styles.title}>Full Time</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                key={2}
                                onPress={() => handleChangeConfirmType(2)}
                                style={[
                                    styles.item,
                                    confirmType === 2 && styles.selectedItem
                                ]}
                            >
                                <SgRadio selected={confirmType === 2} />
                                <View style={styles.content}>
                                    <Text style={styles.title}>Actual Time</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                key={3}
                                onPress={() => handleChangeConfirmType(3)}
                                style={[
                                    styles.item,
                                    confirmType === 3 && styles.selectedItem
                                ]}
                            >
                                <SgRadio selected={confirmType === 3} />
                                <View style={styles.content}>
                                    <Text style={styles.title}>No Time</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        : null
                    }
                    <View style={styles.modalGroup}>
                        {manual ?
                            <View style={styles.modalGroupButtons}>
                                {!fullData?.checkin?.latitude ?
                                    <SgButton
                                        disabled={buttonStatus}
                                        color={COLORS.error_700}
                                        bgColor={COLORS.error_50}
                                        onPress={() => handleCheckInRequest('checkin')}
                                    >
                                        {t('checkIn')}
                                    </SgButton>
                                    : null
                                }
                                {(!fullData?.checkout?.latitude && fullData?.checkin?.latitude) ?
                                    <SgButton
                                        disabled={buttonStatus}
                                        color={COLORS.white}
                                        bgColor={COLORS.brand_600}
                                        onPress={() => handleCheckInRequest('checkout')}
                                    >
                                        {t('checkOut')}
                                    </SgButton>
                                    : null
                                }
                            </View>
                            :
                            ((isManualCheckoutAvailable() && atWork) ?
                                    <View style={styles.modalGroupButtons}>
                                        <SgButton
                                            color={COLORS.white}
                                            bgColor={COLORS.brand_600}
                                            disabled={buttonStatus}
                                            onPress={() => handleCheckInRequest('checkout')}
                                        >
                                            {t('checkOut')}
                                        </SgButton>
                                    </View>
                                    :
                                    <View style={styles.modalGroupButtons}>
                                        {clickType === 'reject' ?
                                            <SgButton
                                                color={COLORS.error_700}
                                                bgColor={COLORS.error_50}
                                                onPress={toggleRejectCheckInModal}
                                            >
                                                {t('reject')}
                                            </SgButton>
                                            : null
                                        }
                                        {clickType === 'accept' ?
                                            <SgButton
                                                color={COLORS.white}
                                                bgColor={COLORS.brand_600}
                                                // onPress={fullData?.type === 2 ? toggleAcceptCheckInModal : handleSubmitAccept}
                                                onPress={[3, 4].includes(fullData?.type) ? handleSubmitAcceptOverTime : handleSubmitAccept}
                                            >
                                                {t('accept')}
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
                                                    {t('reject')}
                                                </SgButton>
                                                <SgButton
                                                    color={COLORS.white}
                                                    bgColor={COLORS.brand_600}
                                                    // onPress={fullData?.type === 2 ? toggleAcceptCheckInModal : handleSubmitAccept}
                                                    onPress={[3, 4].includes(fullData?.type) ? handleSubmitAcceptOverTime : handleSubmitAccept}
                                                >
                                                    {t('accept')}
                                                </SgButton>
                                            </>
                                            : null
                                        }
                                    </View>
                            )
                        }
                    </View>
                </View>
            </SgPopup>

            <SgPopup
                visible={rejectCheckInModal}
                onClose={() => toggleRejectCheckInModal()}
                title={fullData?.type === 1 ? t('rejectCheckIn') : t('rejectCheckOut')}
                description={fullData?.type === 1 ? t('rejectCheckIn__description') : t('rejectCheckOut__description')}
                icon={<ErrorIconModal width={56} height={56}/>}
                footerButton={
                    [3, 4].includes(fullData?.type) ?
                        <SgButton
                            disabled={buttonStatus}
                            bgColor={COLORS.error_600}
                            color={COLORS.white}
                            onPress={handleSubmitRejectOverTime}
                        >
                            {t('yesReject')}
                        </SgButton>
                        :
                        <SgButton
                            disabled={buttonStatus}
                            bgColor={COLORS.error_600}
                            color={COLORS.white}
                            onPress={handleSubmitReject}
                        >
                            {t('yesReject')}
                        </SgButton>
                }
                autoClose={false}
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
                        placeholder={t('rejectDetail')}
                        keyboardType="default"
                    />
                </View>
            </SgPopup>

            <SgPopup
                visible={rejectedCheckInModal}
                onClose={() => toggleRejectedCheckInModal()}
                title={t('rejectedSuccessfully')}
                description={t('rejectedSuccessfully__description')}
                icon={<ErrorIconModal width={56} height={56}/>}
                autoClose={false}
            />

            <SgPopup
                visible={acceptCheckInModal}
                onClose={() => toggleAcceptCheckInModal()}
                title={t('accept')}
                description={fullData?.type === 1 ? t('checkInAccept__description') : t('checkOutAccept__description')}
                icon={<SuccessIconModal width={56} height={56}/>}
                footerButton={
                    [3, 4].includes(fullData?.type) ?
                        <SgButton
                            bgColor={COLORS.brand_600}
                            color={COLORS.white}
                            onPress={handleSubmitAcceptOverTime}
                        >
                            {t('yesAccept')}
                        </SgButton>
                        :
                        <SgButton
                            bgColor={COLORS.brand_600}
                            color={COLORS.white}
                            onPress={handleSubmitAccept}
                        >
                            {t('yesAccept')}
                        </SgButton>
                }
                autoClose={false}
            >
                {fullData?.type === 2 ?
                    <View style={{marginBottom: 16}}>
                        <TouchableOpacity
                            activeOpacity={1}
                            key={1}
                            onPress={() => handleChangeConfirmType(1)}
                            style={[
                                styles.item,
                                confirmType === 1 && styles.selectedItem
                            ]}
                        >
                            <SgRadio selected={confirmType === 1} />
                            <View style={styles.content}>
                                <Text style={styles.title}>Full Time</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            key={2}
                            onPress={() => handleChangeConfirmType(2)}
                            style={[
                                styles.item,
                                confirmType === 2 && styles.selectedItem
                            ]}
                        >
                            <SgRadio selected={confirmType === 2} />
                            <View style={styles.content}>
                                <Text style={styles.title}>Actual Time</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            key={3}
                            onPress={() => handleChangeConfirmType(3)}
                            style={[
                                styles.item,
                                confirmType === 3 && styles.selectedItem
                            ]}
                        >
                            <SgRadio selected={confirmType === 3} />
                            <View style={styles.content}>
                                <Text style={styles.title}>No Time</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
            </SgPopup>

            <SgPopup
                visible={acceptedCheckInModal}
                onClose={() => toggleAcceptedCheckInModal()}
                title={fullData?.type === 1 ? t('checkInAccepted') : t('checkOutAccepted')}
                description={fullData?.type === 1 ? t('checkInAccepted__description') : t('checkOutAccepted__description')}
                icon={<SuccessIconModal width={56} height={56}/>}
                autoClose={false}
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
                autoClose={false}
            />
        </>
    );
};