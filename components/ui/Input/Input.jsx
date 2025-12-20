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
    isInvalid = false,
  onChangeText,
    disabled = false,
    max = null,
    min = null
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [counter, setCounter] = useState(Number(value) || 0);

  const handleChange = (val) => {
    const parsed = parseInt(val, 10);
    const newValue = isNaN(parsed) ? 0 : parsed;
    setCounter(newValue);
    if (type === 'counter') {
        if (max && newValue > max) {
            setCounter(max);
            onChangeText({ name, value: newValue });
        }
        else if (min && newValue < min) {
            setCounter(min);
            onChangeText({ name, value: newValue });
        }
        else {
            setCounter(newValue);
            onChangeText({ name, value: newValue });
        }
    }
  };

  const handleIncrease = () => handleChange(max ? (counter + 1 < max ? counter + 1 : max) : counter + 1);
  const handleDecrease = () => handleChange(min ? ((counter - 1 > 0 && counter - 1 > min) ? counter - 1 : 0) : (counter > 0 ? counter - 1 : 0));

  const renderInput = () => {
    switch (type) {
      case 'password':
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              secureTextEntry={!showPassword}
              value={value?.toString()}
              readOnly={disabled}
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
            value={value?.toString()}
            readOnly={disabled}
            onChangeText={(e) => onChangeText({ name, value: e })}
            placeholderTextColor={COLORS.gray_400}
            multiline
            numberOfLines={4}
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
              value={counter?.toString()}
              readOnly={disabled}
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
              value={value?.toString()}
              readOnly={disabled}
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
            value={value?.toString()}
            readOnly={disabled}
            onChangeText={(e) => onChangeText({ name, value: e })}
            placeholderTextColor={COLORS.gray_400}
          />
        );
    }
  };

  return (
    <View style={styles.wrapper}>
      {label && <Text style={[styles.label, isInvalid && styles.labelError]}>{label}</Text>}
      <View style={[styles.inputContainer, isInvalid && styles.inputErrorContainer, type === 'textarea' && styles.textareaContainer]}>
        {renderInput()}
      </View>
    </View>
  );
}
