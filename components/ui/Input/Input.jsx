import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './Input.styles';
import Eye from '@/assets/images/eye.svg';
import Minus from '@/assets/images/minus.svg';
import Plus from '@/assets/images/plus.svg';
import COLORS from '@/constants/colors';

export default function SgInput({
  label,
  placeholder,
  type = 'text', // 'text' | 'password' | 'email' | 'textarea' | 'counter'
  value,
  name,
  onChangeText
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [counter, setCounter] = useState(Number(value) || 0);

  const handleChange = (val) => {
    const parsed = parseInt(val, 10);
    const newValue = isNaN(parsed) ? 0 : parsed;
    setCounter(newValue);
    onChangeText({ name, value: newValue });
  };

  const handleIncrease = () => handleChange(counter + 1);
  const handleDecrease = () => handleChange(counter > 0 ? counter - 1 : 0);

  const renderInput = () => {
    switch (type) {
      case 'password':
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              secureTextEntry={!showPassword}
              value={value}
              onChangeText={(e) => onChangeText({ name, value: e })}
              placeholderTextColor={COLORS.gray_400}
            />
            <Pressable style={styles.icon} onPress={() => setShowPassword(!showPassword)}>
              <Eye width={20} height={20} />
            </Pressable>
          </>
        );

      case 'textarea':
        return (
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder={placeholder}
            value={value}
            onChangeText={(e) => onChangeText({ name, value: e })}
            placeholderTextColor={COLORS.gray_400}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
          />
        );

      case 'counter':
        return (
          <>
            <Pressable style={styles.counterButton} onPress={handleDecrease}>
              <Minus width={20} height={20} />
            </Pressable>

            <TextInput
              style={[styles.input, styles.counterInput]}
              keyboardType="numeric"
              value={counter.toString()}
              onChangeText={handleChange}
              placeholderTextColor={COLORS.gray_400}
            />

            <Pressable style={styles.counterButton} onPress={handleIncrease}>
              <Plus width={20} height={20} />
            </Pressable>
          </>
        );

      case 'number':
        return (
          <>
            <TextInput
              style={[styles.input]}
              keyboardType="numeric"
              value={value}
              placeholder={placeholder}
              onChangeText={(e) => onChangeText({ name, value: e })}
              placeholderTextColor={COLORS.gray_400}
            />
          </>
        );

      default:
        return (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={(e) => onChangeText({ name, value: e })}
            placeholderTextColor={COLORS.gray_400}
          />
        );
    }
  };

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, type === 'textarea' && styles.textareaContainer]}>
        {renderInput()}
      </View>
    </View>
  );
}
