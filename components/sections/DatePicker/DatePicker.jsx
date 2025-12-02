import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Platform, Pressable} from 'react-native';
import styles from "@/components/sections/DatePicker/DatePicker.styles";
import COLORS from '@/constants/colors';
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 7;
const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);


const styles2 = StyleSheet.create({
    container: {
        paddingTop: 32,
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        gap: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        paddingBottom: 12,
    },
    headerInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        textAlign: 'center',
        backgroundColor: '#f2f2f2',
    },
    pickerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    pickerContainer: {
        height: ITEM_HEIGHT * VISIBLE_ITEMS,
        width: '32%',
        overflow: 'hidden',
    },
    item: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontFamily: 'Inter, sans-serif',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 24,
        color: COLORS.gray_600,
    },
    selectedText: {
        fontFamily: 'Inter, sans-serif',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 24,
        color: COLORS.brand_600,
    },
    highlight: {
        position: 'absolute',
        top: ITEM_HEIGHT * CENTER_INDEX,
        height: ITEM_HEIGHT,
        width: '100%',
        borderRadius: 40,
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderColor: '#0f5743',
        backgroundColor: COLORS.brand_50,
        zIndex: -1,
    },
    button: {
        marginTop: 30,
        backgroundColor: '#0f5743',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default function SgSectionDatePicker(props) {
    const {value, onChange} = props;

    const [date, setDate] = useState(value);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);

    const handleChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        // setShow(false);
        setDate(currentDate);

        onChange(selectedDate);
    };


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };




    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <Pressable
                    onPress={showDatepicker}
                    style={styles.input}
                >
                    <Text>
                        {date ? moment(date).format('MMM D, YYYY') : 'Select Date'}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={showTimepicker}
                    style={styles.input}
                >
                    <Text>
                        {date ? moment(date).format('HH:mm') : 'Select Time'}
                    </Text>
                </Pressable>
            </View>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    textColor="black"   // yalnız iOS
                    mode={mode}
                    is24Hour={true}
                    onChange={handleChange}
                />
            )}
        </View>
    );
}