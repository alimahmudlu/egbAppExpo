import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from '@/components/sections/FilterCard/FilterCard.styles';
import SgCheckbox from '@/components/ui/Checkbox/Checkbox';
import Refresh from '@/assets/images/refresh.svg';
import Calendar from '@/assets/images/calendar.svg';

export default function SgSectionFilterCard() {
  const [constructionChief, setConstructionChief] = useState(false);
  const [employee, setEmployee] = useState(true);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleClearFilters = () => {
    setConstructionChief(false);
    setEmployee(false);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
            <Text style={styles.clearText}>Clear filters</Text>
            <Refresh width={20} height={20} style={styles.refreshIcon} />
        </TouchableOpacity>
      </View>

      {/* Checkbox */}
    <View style={styles.checkboxGroup}>
        <TouchableOpacity 
            activeOpacity={1}
            style={styles.checkboxContainer}
            onPress={() => setConstructionChief(!constructionChief)}
        >
            <SgCheckbox
                checked={constructionChief}
                onToggle={() => setConstructionChief(!constructionChief)}
            />
            <Text style={styles.checkboxLabel}>Construction chief</Text>
        </TouchableOpacity>

        <TouchableOpacity
            activeOpacity={1}
            style={styles.checkboxContainer}
            onPress={() => setEmployee(!employee)}
        >
            <SgCheckbox
                checked={employee}
                onToggle={() => setEmployee(!employee)}
            />
            <Text style={styles.checkboxLabel}>Employee</Text>
        </TouchableOpacity>
    </View>

      {/* Start date */}
        <View style={styles.datePicker}>
            <Text style={styles.inputLabel}>Start date</Text>
            <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.inputBox}>
                <Text style={styles.inputText}>
                    {startDate ? startDate.toLocaleString() : 'dd/mm/yyyy - hh:mm'}
                </Text>
                <Calendar width={20} height={20} /> 
            </TouchableOpacity>
        </View>
      <DateTimePickerModal
        isVisible={showStartPicker}
        mode="datetime"
        onConfirm={(date) => {
          setStartDate(date);
          setShowStartPicker(false);
        }}
        onCancel={() => setShowStartPicker(false)}
      />

      {/* End date */}
        <View style={styles.datePicker}>
            <Text style={styles.inputLabel}>End date</Text>
            <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.inputBox}>
                <Text style={styles.inputText}>
                    {endDate ? endDate.toLocaleString() : 'dd/mm/yyyy - hh:mm'}
                </Text>
                    <Calendar width={20} height={20} />
            </TouchableOpacity>
        </View>
        <DateTimePickerModal
        isVisible={showEndPicker}
        mode="datetime"
        onConfirm={(date) => {
          setEndDate(date);
          setShowEndPicker(false);
        }}
        onCancel={() => setShowEndPicker(false)}
      />
    </ScrollView>
  );
}
