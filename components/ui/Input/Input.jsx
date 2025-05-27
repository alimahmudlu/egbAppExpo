import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './Input.styles';
import Eye from '../../../assets/images/eye.svg';

export default function Input({
  label,
  placeholder,
  type = 'text', // 'text' | 'password' | 'email'
  value,
  onChangeText
}) {
  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={isPassword && !showPassword}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#999"
          />
          {isPassword && (
            <Pressable
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)} 
            >
              <Eye color={showPassword ? '#000' : '#999'} size={20} />
            </Pressable>
          )}
      </View>
    </View>
  );
}
