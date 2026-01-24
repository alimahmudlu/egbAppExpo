import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './DatePicker.styles';
import COLORS from '@/constants/colors';
import SgPopup from "@/components/ui/Modal/Modal";
import SgSectionDatePicker from "@/components/sections/DatePicker/DatePicker";
import SgButton from "@/components/ui/Button/Button";
import moment from "moment";

export default function SgDatePicker(props) {
    const {
        label,
        placeholder,
        value,
        name,
        onChangeText,
        isInvalid,
        mode = 'date-time' // date | time | date-time
    } = props;
    const [datePickerModal, setDatePickerModal] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [newDate, setNewDate] = useState(value);
    const formats = {
        'date': 'YYYY-MM-DD',
        'time': 'HH:mm',
        'date-time': 'YYYY-MM-DD HH:mm'
    }

    function toggleDatePickerModal() {
        setDatePickerModal(!datePickerModal);
    }

  return (
    <>
        <View style={styles.wrapper}>
            {label && <Text style={[styles.label, isInvalid && styles.labelError]}>{label}</Text>}
            <View style={[styles.inputContainer, isInvalid && styles.inputErrorContainer]}>
                <Pressable
                    onPress={toggleDatePickerModal}
                    style={styles.input}
                >
                    <Text style={{color: COLORS.gray_400}}>{value ? moment(value).format(formats?.[mode]) : placeholder}</Text>
                </Pressable>
            </View>
        </View>

        <SgPopup
            visible={datePickerModal}
            onClose={toggleDatePickerModal}
            onShow={() => {
                console.log('acildi')
                setShowPicker(true)
            }}
            footerButton={
                <SgButton
                    bgColor={COLORS.brand_600}
                    color={COLORS.white}
                    onPress={() => onChangeText({
                        name: name,
                        value: newDate ?? new Date()
                    })}
                >
                    Save
                </SgButton>
            }
        >
            {showPicker ?
                <SgSectionDatePicker firstShow={showPicker} userMode={mode} value={value ? new Date(value) : new Date()} onChange={(data) => {
                    setNewDate(data)
                }} />
                : null
            }
        </SgPopup>
    </>
  );
}
