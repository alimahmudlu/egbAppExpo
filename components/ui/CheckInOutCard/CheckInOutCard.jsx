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
        reviewer
    } = props;


    const [openSettingsModal, setOpenSettingsModal] = useState(false)
    const [checkInModal, setCheckInModal] = useState(false)
    const [checkInData, setCheckInData] = useState({})
    const [checkOutModal, setCheckOutModal] = useState(false)
    const [checkOutData, setCheckOutData] = useState({})
    const [buttonStatus, setButtonStatus] = useState(false)

    const isCheckIn = type === 'checkin';
    const isCheckOut = type === 'checkout';
    const backgroundColor = isCheckIn ? COLORS.brand_50 : COLORS.error_100;
    const Icon = isCheckIn ? CheckIn : CheckOut;
    const {t} = useTranslation()

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
            url: `/employee/activity/checkin`,
            method: 'post',
            data: {
                time: moment(),
                timezone: moment.tz.guess(),
                latitude: Number(checkInData?.latitude),
                longitude: Number(checkInData?.longitude)
            }
        }).then(res => {
            setStoreData(prev => ({
                ...prev,
                checkIn: res?.data || {
                    loading: true
                },
            }));
        }).catch(err => {
            console.log(err);
        })

        toggleCheckInModal()
    }

    function toggleCheckOutModal() {
        if (checkOutModal) {
            setCheckOutData({})
        }

        setCheckOutModal(!checkOutModal)
    }

    function handleSubmitCheckOut() {
        request({
            url: `/employee/activity/checkout`,
            method: 'post',
            data: {
                time: moment(),
                timezone: moment.tz.guess(),
                latitude: Number(checkOutData?.latitude),
                longitude: Number(checkOutData?.longitude),
                activity_id: checkInId
            }
        }).then(res => {
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
            setButtonStatus(false)
            toggleCheckInModal();
            setCheckInData({latitude, longitude})
        } catch (error) {
            console.error('Error getting location:', error);
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
            setButtonStatus(false)
            toggleCheckOutModal();
            setCheckOutData({latitude, longitude})
        } catch (error) {
            console.error('Error getting location:', error);
            toggleOpenSettingsModal()
        }
    }

    if (type !== 'checkin' && type !== 'checkout') {
        return null;
    }

    return (
        <View style={[styles.card, {backgroundColor}]}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.title2}>{reviewer?.full_name ? `(${reviewer?.full_name})` : ' '}</Text>
                    </View>
                    <Icon width={20} height={20}/>
                </View>
                <Text style={[styles.time, {color: isCheckIn ? COLORS.brand_600 : COLORS.error_600}]}
                >
                    {time ? time : '--:--:--'}
                </Text>
            </View>
            {(isCheckIn && status === 2 && mapData?.checkIn?.latitude && mapData?.checkIn?.longitude) && Platform.OS !== 'web' ?
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
            {(isCheckOut && status === 2 && mapData?.checkOut?.latitude && mapData?.checkOut?.longitude) && Platform.OS !== 'web' ?
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
            <View style={{paddingHorizontal: 4, paddingVertical: 4,}}>
                {isCheckIn ?
                    <>
                        {!status ?
                            <SgButton color={COLORS.brand_600} onPress={handleCheckInRequest} disabled={buttonStatus}>
                                {t('checkIn')}
                            </SgButton>
                            : null
                        }
                        {status === 1 ?
                            <SgButton
                                style={{borderRadius: 12}}
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
                            <SgButton color={COLORS.error_700} onPress={handleCheckOutRequest} disabled={buttonStatus}>
                                {t('checkOut')}
                            </SgButton>
                            : null
                        }
                        {status === 1 ?
                            <SgButton
                                style={{borderRadius: 12}}
                                color={COLORS.white}
                                bgColor={COLORS?.error_600}
                            >
                                {t('waiting')}...
                            </SgButton>
                            : null
                        }
                        {status === 2 ?
                            <SgButton
                                color={COLORS.error_700}
                                onPress={() => openInMaps(mapData?.checkOut.latitude, mapData?.checkOut.longitude)}
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
