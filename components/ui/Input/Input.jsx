import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './Input.styles';
import Eye from '@/assets/images/eye.svg';
import COLORS from '@/constants/colors';

export default function SgInput({
  label,
  placeholder,
  type = 'text', // 'text' | 'password' | 'email' | 'textarea'
  value,
  onChangeText
}) {
  const [showPassword, setShowPassword] = useState(false);

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
              onChangeText={onChangeText}
              placeholderTextColor = {COLORS.gray_400}
            />
            <Pressable
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            >
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
            onChangeText={onChangeText}
            placeholderTextColor = {COLORS.gray_400}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
          />
        );

      default:
        return (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor = {COLORS.gray_400}
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
