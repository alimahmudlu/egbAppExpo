import {View, Text, Alert, Platform} from 'react-native';
import CheckIn from "@/assets/images/check-in.svg";
import CheckInModalIcon from "@/assets/images/checkInModal.svg";
import CheckOut from "@/assets/images/check-out.svg";
import CheckOutModalIcon from "@/assets/images/checkOutModal.svg";
import styles from './CheckInOutCard.styles';
import COLORS from '@/constants/colors';
import SgButton from '@/components/ui/Button/Button';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import SgPopup from "@/components/ui/Modal/Modal";
import {useState} from "react";
import moment from "moment-timezone";
import MapView, {Marker} from 'react-native-maps';
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";

export default function SgCheckInOutCard(props) {
    const {request} = useApi();
    const {setStoreData} = useData();
    const {
        type = 'checkin',
        title,
        time,
        status, // 0 - waiting, 1 - success, 2 - failed
        mapData,
        checkInStatus = undefined,
        checkInId = undefined,
        reviewer,
        employeeType = 'employee'
    } = props;


    const [openSettingsModal, setOpenSettingsModal] = useState(false)
    const [checkInModal, setCheckInModal] = useState(false)
    const [checkInData, setCheckInData] = useState({})
    const [checkOutModal, setCheckOutModal] = useState(false)
    const [checkOutData, setCheckOutData] = useState({})
    const [overTimeModal, setOverTimeModal] = useState(false)
    const [overTimeData, setOverTimeData] = useState({})
    const [overTimeOutModal, setOverTimeOutModal] = useState(false)
    const [overTimeOutData, setOverTimeOutData] = useState({})
    const [buttonStatus, setButtonStatus] = useState(false)

    const isCheckIn = type === 'checkin';
    const isCheckOut = type === 'checkout';
    const isOverTime = type === 'overTime';
    const isOverTimeOut = type === 'overTimeOut';
    const backgroundColor = isCheckIn ? COLORS.brand_50 : (isOverTime ? COLORS.blue_50 : COLORS.error_100);
    const Icon = isCheckIn ? CheckIn : (isOverTime ? CheckIn : CheckOut);
    const {t} = useTranslation()

    function toggleOverTimeModal() {
        if (overTimeModal) {
            setOverTimeData({})
        }

        setOverTimeModal(!overTimeModal)
    }

    function handleSubmitOverTime() {
        request({
            url: `/${employeeType}/activity/overtime`,
            method: 'post',
            data: {
                time: moment(),
                timezone: moment.tz.guess(),
                latitude: Number(overTimeData?.latitude),
                longitude: Number(overTimeData?.longitude)
            }
        }).then(res => {
            setButtonStatus(false)
            setStoreData(prev => ({
                ...prev,
                overTime: res?.data || {
                    loading: true
                },
            }));
        }).catch(err => {
            setButtonStatus(false)
            console.log(err);
        })

        toggleOverTimeModal()
    }

    function toggleOverTimeOutModal() {
        if (overTimeOutModal) {
            setOverTimeOutData({})
            setButtonStatus(false)
        }

        setOverTimeOutModal(!overTimeOutModal)
    }

    function handleSubmitOverTimeOut() {
        request({
            url: `/${employeeType}/activity/overtimeout`,
            method: 'post',
            data: {
                time: moment(),
                timezone: moment.tz.guess(),
                latitude: Number(overTimeOutData?.latitude),
                longitude: Number(overTimeOutData?.longitude),
                activity_id: checkInId
            }
        }).then(res => {
            setButtonStatus(false)
            setStoreData(prev => ({
                ...prev,
                overTimeOut: res?.data || {
                    loading: true
                },
            }));
        }).catch(err => {
            setButtonStatus(false)
            console.log(err);
        })

        toggleOverTimeOutModal()
    }



    function toggleCheckInModal() {
        if (checkInModal) {
            setCheckInData({})
        }

        setCheckInModal(!checkInModal)
    }

    function toggleOpenSettingsModal() {
        setOpenSettingsModal(!openSettingsModal)
    }

    function handleSubmitCheckIn() {
        request({
            url: `/${employeeType}/activity/checkin`,
            method: 'post',
            data: {
                time: moment(),
                timezone: moment.tz.guess(),
                latitude: Number(checkInData?.latitude),
                longitude: Number(checkInData?.longitude)
            }
        }).then(res => {
            setButtonStatus(false)
            setStoreData(prev => ({
                ...prev,
                checkIn: res?.data || {
                    loading: true
                },
            }));
        }).catch(err => {
            setButtonStatus(false)
            console.log(err);
        })

        toggleCheckInModal()
    }

    function toggleCheckOutModal() {
        if (checkOutModal) {
            setCheckOutData({})
            setButtonStatus(false)
        }

        setCheckOutModal(!checkOutModal)
    }

    function handleSubmitCheckOut() {
        request({
            url: `/${employeeType}/activity/checkout`,
            method: 'post',
            data: {
                time: moment(),
                timezone: moment.tz.guess(),
                latitude: Number(checkOutData?.latitude),
                longitude: Number(checkOutData?.longitude),
                activity_id: checkInId
            }
        }).then(res => {
            setButtonStatus(false)
            if (res.success) {
                setStoreData(prev => ({
                    ...prev,
                    checkOut: res?.data || {
                        loading: true
                    },
                }));
            } else {
                // Handle error response
                console.log(res.message);
            }
        }).catch(err => {
            setButtonStatus(false)
            console.log(err);
        })
        toggleCheckOutModal()
    }

    function openInMaps(latitude, longitude) {
        const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        const url = Platform.OS === 'ios'
            ? `${scheme}?q=${latitude},${longitude}`
            : `${scheme}${latitude},${longitude}`;

        // For Google Maps specific URL
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

        // Open the map based on platform
        if (Platform.OS === 'ios') {
            // On iOS, give option to choose between Apple Maps and Google Maps
            Linking.openURL(url)
        } else {
            // On Android, directly open Google Maps
            Linking.openURL(googleMapsUrl);
        }
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

    async function handleCheckInRequest() {
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
            toggleCheckInModal();
            setCheckInData({latitude, longitude})
        } catch (error) {
            console.error('Error getting location:', error);
            setButtonStatus(false)
            toggleOpenSettingsModal()
        }
    }

    async function handleCheckOutRequest() {
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
            toggleCheckOutModal();
            setCheckOutData({latitude, longitude})
        } catch (error) {
            console.error('Error getting location:', error);
            setButtonStatus(false)
            toggleOpenSettingsModal()
        }
    }

    async function handleOverTimeRequest() {
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
            toggleOverTimeModal();
            setOverTimeData({latitude, longitude})
        } catch (error) {
            console.error('Error getting location:', error);
            setButtonStatus(false)
            toggleOpenSettingsModal()
        }
    }

    async function handleOverTimeOutRequest() {
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
            toggleOverTimeOutModal();
            setOverTimeOutData({latitude, longitude})
        } catch (error) {
            console.error('Error getting location:', error);
            setButtonStatus(false)
            toggleOpenSettingsModal()
        }
    }

    if (type !== 'checkin' && type !== 'checkout' && type !== 'overTime' && type !== 'overTimeOut') {
        return null;
    }

    return (
        <View style={[styles.card, ['timekeeper', 'chief'].includes(employeeType) ? styles.card2 : null, type === 'overTime' ? styles.card2 : null, {backgroundColor}]}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.title2}>{reviewer?.full_name ? `(${reviewer?.full_name})` : ' '}</Text>
                    </View>
                    <Icon width={20} height={20}/>
                </View>
                <Text style={[styles.time, {color: isCheckIn ? COLORS.brand_600 : (isOverTime ? COLORS.blue_600 : COLORS.error_600)}]}>
                    {time ? time : '--:--'}
                </Text>
            </View>
            {(!['timekeeper', 'chief'].includes(employeeType) && (isCheckIn && status === 2 && mapData?.checkIn?.latitude && mapData?.checkIn?.longitude) && Platform.OS !== 'web') ?
                <View style={{flex: 1, height: 125, borderRadius: 16, overflow: 'hidden', filter: 'grayscale(1)'}}>
                        <MapView
                            style={{flex: 1, height: 125}}
                            initialRegion={{
                                latitude: Number(mapData?.checkIn?.latitude),
                                longitude: Number(mapData?.checkIn?.longitude),
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                        >
                            <Marker coordinate={{
                                latitude: Number(mapData?.checkIn?.latitude),
                                longitude: Number(mapData?.checkIn?.longitude)
                            }}/>
                        </MapView>
                </View>
                : null
            }
            {(!['timekeeper', 'chief'].includes(employeeType) && (isOverTime && status === 2 && mapData?.overTime?.latitude && mapData?.overTime?.longitude) && Platform.OS !== 'web') ?
                <View style={{flex: 1, height: 125, borderRadius: 16, overflow: 'hidden', filter: 'grayscale(1)'}}>
                        <MapView
                            style={{flex: 1, height: 125}}
                            initialRegion={{
                                latitude: Number(mapData?.overTime?.latitude),
                                longitude: Number(mapData?.overTime?.longitude),
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                        >
                            <Marker coordinate={{
                                latitude: Number(mapData?.overTime?.latitude),
                                longitude: Number(mapData?.overTime?.longitude)
                            }}/>
                        </MapView>
                </View>
                : null
            }
            {(!['timekeeper', 'chief'].includes(employeeType) && (isCheckOut && status === 2 && mapData?.checkOut?.latitude && mapData?.checkOut?.longitude) && Platform.OS !== 'web') ?
                <View style={{flex: 1, height: 125, borderRadius: 16, overflow: 'hidden', filter: 'grayscale(1)'}}>
                    <MapView
                        style={{flex: 1, height: 125}}
                        initialRegion={{
                            latitude: Number(mapData?.checkOut?.latitude) || 0,
                            longitude: Number(mapData?.checkOut?.longitude) || 0,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker coordinate={{
                            latitude: Number(mapData?.checkOut?.latitude) || 0,
                            longitude: Number(mapData?.checkOut?.longitude) || 0
                        }}/>
                    </MapView>
                </View>
                : null
            }
            {(!['timekeeper', 'chief'].includes(employeeType) && (isOverTimeOut && status === 2 && mapData?.overTimeOut?.latitude && mapData?.overTimeOut?.longitude) && Platform.OS !== 'web') ?
                <View style={{flex: 1, height: 125, borderRadius: 16, overflow: 'hidden', filter: 'grayscale(1)'}}>
                    <MapView
                        style={{flex: 1, height: 125}}
                        initialRegion={{
                            latitude: Number(mapData?.overTimeOut?.latitude) || 0,
                            longitude: Number(mapData?.overTimeOut?.longitude) || 0,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker coordinate={{
                            latitude: Number(mapData?.overTimeOut?.latitude) || 0,
                            longitude: Number(mapData?.overTimeOut?.longitude) || 0
                        }}/>
                    </MapView>
                </View>
                : null
            }
            <View style={{paddingHorizontal: 4, paddingVertical: 4,}}>
                {isCheckIn ?
                    <>
                        {!status ?
                            <SgButton color={COLORS.brand_600}
                                      onPress={handleCheckInRequest}
                                      disabled={buttonStatus}
                                      style={{paddingVertical: 8, minHeight: 36}}
                                      textStyle={{fontSize: 15}}
                            >
                                {t('checkIn')}
                            </SgButton>
                            : null
                        }
                        {status === 1 ?
                            <SgButton
                                style={{paddingVertical: 8, minHeight: 36, borderRadius: 12}}
                                textStyle={{fontSize: 15}}
                                color={COLORS.white}
                                bgColor={COLORS?.brand_600}
                            >
                                {t('waiting')}...
                            </SgButton>
                            : null
                        }
                        {status === 2 ?
                            <SgButton
                                color={COLORS.brand_600}
                                style={{paddingVertical: 8, minHeight: 36}}
                                textStyle={{fontSize: 15}}
                                onPress={() => openInMaps(mapData?.checkIn.latitude, mapData?.checkIn.longitude)}
                            >
                                {t('openOnMap')}
                            </SgButton>
                            : null
                        }
                    </>
                    : null
                }
                {(isCheckOut && checkInStatus) ?
                    <>
                        {!status || status === 3 ?
                            <SgButton
                                color={COLORS.error_700}
                                onPress={handleCheckOutRequest}
                                disabled={buttonStatus}
                                style={{paddingVertical: 8, minHeight: 36}}
                                textStyle={{fontSize: 15}}
                            >
                                {t('checkOut')}
                            </SgButton>
                            : null
                        }
                        {status === 1 ?
                            <SgButton
                                color={COLORS.white}
                                bgColor={COLORS?.error_600}
                                style={{paddingVertical: 8, minHeight: 36, borderRadius: 12}}
                                textStyle={{fontSize: 15}}
                            >
                                {t('waiting')}...
                            </SgButton>
                            : null
                        }
                        {status === 2 ?
                            <SgButton
                                color={COLORS.error_700}
                                onPress={() => openInMaps(mapData?.checkOut.latitude, mapData?.checkOut.longitude)}
                                style={{paddingVertical: 8, minHeight: 36}}
                                textStyle={{fontSize: 15}}
                            >
                                {t('openOnMap')}
                            </SgButton>
                            : null
                        }
                    </>
                    : null
                }
                {isOverTime ?
                    <>
                        {!status ?
                            <SgButton color={COLORS.brand_600}
                                      onPress={handleOverTimeRequest}
                                      disabled={buttonStatus}
                                      style={{paddingVertical: 8, minHeight: 36}}
                                      textStyle={{fontSize: 15}}
                            >
                                {t('overTime_btn')}
                            </SgButton>
                            : null
                        }
                        {status === 1 ?
                            <SgButton
                                style={{paddingVertical: 8, minHeight: 36, borderRadius: 12}}
                                textStyle={{fontSize: 15}}
                                color={COLORS.white}
                                bgColor={COLORS?.blue_600}
                            >
                                {t('waiting')}...
                            </SgButton>
                            : null
                        }
                        {status === 2 ?
                            <SgButton
                                color={COLORS.blue_600}
                                style={{paddingVertical: 8, minHeight: 36}}
                                textStyle={{fontSize: 15}}
                                onPress={() => openInMaps(mapData?.overTime.latitude, mapData?.overTime.longitude)}
                            >
                                {t('openOnMap')}
                            </SgButton>
                            : null
                        }
                    </>
                    : null
                }
                {(isOverTimeOut && checkInStatus) ?
                    <>
                        {!status || status === 3 ?
                            <SgButton
                                color={COLORS.error_700}
                                onPress={handleOverTimeOutRequest}
                                disabled={buttonStatus}
                                style={{paddingVertical: 8, minHeight: 36}}
                                textStyle={{fontSize: 15}}
                            >
                                {t('checkOut')}
                            </SgButton>
                            : null
                        }
                        {status === 1 ?
                            <SgButton
                                color={COLORS.white}
                                bgColor={COLORS?.error_600}
                                style={{paddingVertical: 8, minHeight: 36, borderRadius: 12}}
                                textStyle={{fontSize: 15}}
                            >
                                {t('waiting')}...
                            </SgButton>
                            : null
                        }
                        {status === 2 ?
                            <SgButton
                                color={COLORS.error_700}
                                onPress={() => openInMaps(mapData?.overTimeOut.latitude, mapData?.overTimeOut.longitude)}
                                style={{paddingVertical: 8, minHeight: 36}}
                                textStyle={{fontSize: 15}}
                            >
                                {t('openOnMap')}
                            </SgButton>
                            : null
                        }
                    </>
                    : null
                }
            </View>

            <SgPopup
                visible={checkInModal}
                onClose={toggleCheckInModal}
                title={t('checkIn')}
                description={t('checkIn__description')}
                icon={<CheckInModalIcon width={56} height={56}/>}
                footerButton={
                    <SgButton
                        loading={status === 1}
                        onPress={handleSubmitCheckIn}
                        bgColor={COLORS.primary}
                        color={COLORS.white}
                    >
                        {t('checkIn')}
                    </SgButton>
                }
            />

            <SgPopup
                visible={overTimeModal}
                onClose={toggleOverTimeModal}
                title={t('overTime')}
                description={t('overTime__description')}
                icon={<CheckInModalIcon width={56} height={56}/>}
                footerButton={
                    <SgButton
                        loading={status === 1}
                        onPress={handleSubmitOverTime}
                        bgColor={COLORS.primary}
                        color={COLORS.white}
                    >
                        {t('overTime_btn')}
                    </SgButton>
                }
            />

            <SgPopup
                visible={overTimeOutModal}
                onClose={toggleOverTimeOutModal}
                title={t('overTime')}
                description={t('overTime__description')}
                icon={<CheckInModalIcon width={56} height={56}/>}
                footerButton={
                    <SgButton
                        loading={status === 1}
                        onPress={handleSubmitOverTimeOut}
                        bgColor={COLORS.error_600}
                        color={COLORS.white}
                    >
                        {t('overTime_btn')}
                    </SgButton>
                }
            />

            <SgPopup
                visible={openSettingsModal}
                onClose={toggleOpenSettingsModal}
                title={t('permissionError')}
                description= {t('permissionError__description')}
                // icon={<CheckInModalIcon width={56} height={56}/>}
                footerButton={
                    <SgButton
                        onPress={handleOpenSettings}
                        bgColor={COLORS.primary}
                        color={COLORS.white}
                    >
                        {t('open')}
                    </SgButton>
                }
            />

            <SgPopup
                visible={checkOutModal}
                onClose={toggleCheckOutModal}
                title={t('checkOut')}
                description={t('checkOut__description')}
                icon={<CheckOutModalIcon width={56} height={56}/>}
                footerButton={
                    <SgButton
                        loading={status === 1}
                        onPress={handleSubmitCheckOut}
                        bgColor={COLORS.error_600}
                        color={COLORS.white}
                    >
                        {t('checkOut')}
                    </SgButton>
                }
            />
        </View>
    );
}
