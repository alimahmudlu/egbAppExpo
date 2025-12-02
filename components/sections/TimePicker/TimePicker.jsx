import COLORS from '@/constants/colors';
import React, { useState, useRef, useEffect } from 'react';
import {View,Text,FlatList,StyleSheet,Dimensions,TouchableOpacity,} from 'react-native';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 7;
const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);

export default function SgSectionTimePicker () {
  
  const now = new Date();
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
      listRef.current.scrollToIndex({ index, animated: false });
    }
  };

  useEffect(() => {
    scrollToMiddle(hourRef, hours, hour);
    scrollToMiddle(minuteRef, minutes, minute);
    scrollToMiddle(ampmRef, ampmOptions, ampm);
  }, []);

  const handleScroll = (e, data, setter) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    if (data[index]) setter(data[index]);
  };

  const renderPicker = (data, selectedValue, setter, listRef) => (
    <View style={styles.pickerContainer}>
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
        renderItem={({ item, index }) => {
          const selectedIndex = data.indexOf(selectedValue);
          const distance = Math.abs(index - selectedIndex);
          const opacity = Math.max(1 - Math.pow(distance / CENTER_INDEX, 2), 0.15);

          return (
            <View style={styles.item}>
              <Text
                style={[
                  styles.itemText,
                  item === selectedValue && styles.selectedText,
                  { opacity },
                ]}
              >
                {item}
              </Text>
            </View>
          );
        }}
      />
      <View style={styles.highlight} pointerEvents="none" />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerInput}>{formattedDate}</Text>
        <Text style={styles.headerInput}>{`${hour} - ${minute} ${ampm}`}</Text>
      </View>

      <View style={styles.pickerRow}>
        {renderPicker(hours, hour, setHour, hourRef)}
        {renderPicker(minutes, minute, setMinute, minuteRef)}
        {renderPicker(ampmOptions, ampm, setAmPm, ampmRef)}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log(`Selected time: ${hour} - ${minute} ${ampm}`);
        }}
      >
        <Text style={styles.buttonText}>Log Selected Time</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
