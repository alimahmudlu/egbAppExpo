import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Dimensions, Pressable} from 'react-native';
import styles from "@/components/sections/DatePicker/DatePicker.styles";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import dayjs from 'dayjs';
import LeftIcon from '@/assets/images/chevron-left_2.svg';
import RightIcon from '@/assets/images/chevron-right_2.svg';
import COLORS from '@/constants/colors';
import moment from "moment";

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
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 24,
        color: COLORS.gray_600,
    },
    selectedText: {
        fontFamily: 'Inter',
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

    const [selectedDate, setSelectedDate] = useState(value);
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [selected, setSelected] = useState('calendar');

    const today = dayjs().format('YYYY-MM-DD');

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const goToPreviousMonth = () => {
        const newMonth = currentMonth.subtract(1, 'month');
        setCurrentMonth(newMonth);
        setSelected('calendar')
    };

    const goToNextMonth = () => {
        const newMonth = currentMonth.add(1, 'month');
        setCurrentMonth(newMonth);
    };

    const markedDates = {
        [today]: {
            marked: true,
            dotColor: '#40cfa5',
        },
        ...(selectedDate && {
            [selectedDate]: {
                selected: true,
                selectedColor: '#0f5743',
                textColor: 'white',
            },
        }),
    };

    const handleScroll = (e, data, setter) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);
        if (data[index]) setter(data[index]);
    };

    const renderPicker = (data, selectedValue, setter, listRef) => (
        <View style={styles2.pickerContainer}>
            <FlatList
                ref={listRef}
                data={data}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                scrollEventThrottle={16}
                onScroll={(e) => handleScroll(e, data, setter)}
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })}
                contentContainerStyle={{
                    paddingVertical: ITEM_HEIGHT * CENTER_INDEX,
                }}
                renderItem={({item, index}) => {
                    const selectedIndex = data.indexOf(selectedValue);
                    const distance = Math.abs(index - selectedIndex);
                    const opacity = Math.max(1 - Math.pow(distance / CENTER_INDEX, 2), 0.15);

                    return (
                        <View style={styles2.item}>
                            <Text
                                style={[
                                    styles2.itemText,
                                    item === selectedValue && styles2.selectedText,
                                    {opacity},
                                ]}
                            >
                                {item}
                            </Text>
                        </View>
                    );
                }}
            />
            <View style={styles2.highlight} pointerEvents="none"/>
        </View>
    );

    const now = new Date(value);
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const isPM = currentHour >= 12;

    const formattedHour = ((currentHour % 12) || 12).toString().padStart(2, '0');
    const formattedMinute = currentMinute.toString().padStart(2, '0');
    const formattedDate = now.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });

    const [hour, setHour] = useState(formattedHour);
    const [minute, setMinute] = useState(formattedMinute);
    const [ampm, setAmPm] = useState(isPM ? 'PM' : 'AM');

    const hours = [...Array(12)].map((_, i) => (i + 1).toString().padStart(2, '0'));
    const minutes = [...Array(60)].map((_, i) => i.toString().padStart(2, '0'));
    const ampmOptions = ['AM', 'PM'];

    const hourRef = useRef(null);
    const minuteRef = useRef(null);
    const ampmRef = useRef(null);

    const scrollToMiddle = (listRef, data, value) => {
        const index = data.indexOf(value);
        if (index !== -1 && listRef.current) {
            listRef.current.scrollToIndex({index, animated: false});
        }
    };

    useEffect(() => {
        scrollToMiddle(hourRef, hours, hour);
        scrollToMiddle(minuteRef, minutes, minute);
        scrollToMiddle(ampmRef, ampmOptions, ampm);
    }, [selected]);

    useEffect(() => {
        // FIXME: This should be a moment object
        onChange?.(moment(`${selectedDate}T${hour}.${minute}.${ampm}`, 'YYYY-MM-DD hh:mm A'))
        // onChange?.(moment(`${selectedDate}T${hour}.${minute}.${ampm}`, 'dd/mm/yyyy - HH/mm'))
    }, [selectedDate, hour, minute, ampm]);


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.navButton} onPress={goToPreviousMonth}>
                    <LeftIcon width={20} height={20}/>
                </TouchableOpacity>
                <Text style={styles.monthText}>
                    {currentMonth.format('MMMM YYYY')}
                </Text>
                <TouchableOpacity style={styles.navButton} onPress={goToNextMonth}>
                    <RightIcon width={20} height={20}/>
                </TouchableOpacity>
            </View>


            <View style={styles.inputRow}>
                <Pressable
                    onPress={() => setSelected('calendar')}
                    style={styles.input}
                >
                    <Text>
                        {selectedDate ? dayjs(selectedDate).format('MMM D, YYYY') : 'Select Date'}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => setSelected('time')}
                    style={styles.input}
                >
                    <Text>
                        {`${hour} - ${minute} ${ampm}`}
                    </Text>
                </Pressable>
            </View>

            {selected === 'calendar' ?
                <Calendar
                    key={currentMonth.format('YYYY-MM')}
                    current={currentMonth.format('YYYY-MM-DD')}
                    onDayPress={handleDayPress}
                    markedDates={markedDates}
                    hideExtraDays={true}
                    disableMonthChange={true}
                    renderHeader={() => <View/>}
                    renderArrow={() => null}
                    onPressArrowLeft={goToPreviousMonth}
                    onPressArrowRight={goToNextMonth}
                    theme={{
                        'stylesheet.calendar.header': {
                            dayHeader: {
                                color: COLORS.gray_700,
                                fontSize: 14,
                                fontWeight: 500,
                            },
                        },
                        selectedDayBackgroundColor: COLORS.brand_600,
                        todayBackgroundColor: COLORS.brand_50,
                        todayTextColor: COLORS.brand_600,
                        dotColor: COLORS.brand_500,
                        textDayFontWeight: '500',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '600',
                    }}
                />
                :
                <View style={styles2.pickerRow}>
                    {renderPicker(hours, hour, setHour, hourRef)}
                    {renderPicker(minutes, minute, setMinute, minuteRef)}
                    {renderPicker(ampmOptions, ampm, setAmPm, ampmRef)}
                </View>
            }
        </View>
    );
}