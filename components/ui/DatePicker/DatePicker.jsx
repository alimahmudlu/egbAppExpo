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
        isInvalid
    } = props;
    const [datePickerModal, setDatePickerModal] = useState(false);

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
                    <Text style={{color: COLORS.gray_400}}>{value ? moment(value).format('YYYY-MM-DD HH:mm') : placeholder}</Text>
                </Pressable>
            </View>
        </View>

        <SgPopup
            visible={datePickerModal}
            onClose={toggleDatePickerModal}
            footerButton={
                <SgButton
                    bgColor={COLORS.brand_600}
                    color={COLORS.white}
                    onPress={() => {}}
                >
                    Save
                </SgButton>
            }
        >
            <SgSectionDatePicker value={value ?? new Date()} onChange={(data) => {
                onChangeText({
                name: name,
                value: data
            });}} />
        </SgPopup>
    </>
  );
}
