import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import styles from "@/components/sections/DatePicker/DatePicker.styles";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import dayjs from 'dayjs';
import LeftIcon from '@/assets/images/chevron-left_2.svg';
import RightIcon from '@/assets/images/chevron-right_2.svg';
import COLORS from '@/constants/colors';

export default function SgSectionDatePicker() {
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const today = dayjs().format('YYYY-MM-DD');

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const goToPreviousMonth = () => {
    const newMonth = currentMonth.subtract(1, 'month');
    setCurrentMonth(newMonth);
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

  return (
    <View style={styles.container}>
      
        <View style={styles.header}>
            <TouchableOpacity style={styles.navButton} onPress={goToPreviousMonth}>
            <LeftIcon width={20} height={20} />
            </TouchableOpacity>
            <Text style={styles.monthText}>
            {currentMonth.format('MMMM YYYY')}
            </Text>
            <TouchableOpacity style={styles.navButton} onPress={goToNextMonth}>
            <RightIcon width={20} height={20} />
            </TouchableOpacity>
        </View>

      
        <View style={styles.inputRow}>
            <TextInput
            style={styles.input}
            placeholder="Select Date"
            value={selectedDate ? dayjs(selectedDate).format('MMM D, YYYY') : ''}
            editable={false}
            />
            <TextInput
            style={styles.input}
            placeholder="-- -- -- --"
            value=""
            editable={false}
            />
        </View>
      
        <Calendar
        key={currentMonth.format('YYYY-MM')}
        current={currentMonth.format('YYYY-MM-DD')}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        hideExtraDays={false}
        disableMonthChange={true}
        renderHeader={() => <View />}
        renderArrow={() => null}
        onPressArrowLeft={() => {}}
        onPressArrowRight={() => {}}
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
    </View>
  );
}