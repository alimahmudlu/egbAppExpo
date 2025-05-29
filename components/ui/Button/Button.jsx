import { TouchableOpacity, Text } from 'react-native';
import styles from './Button.styles';

export default function SgButton({
  children,
  onPress,
  style,
  textStyle,
  disabled = false,
  bgColor,
  color,
}) {
  return (
    <TouchableOpacity
  onPress={disabled ? null : onPress}
  activeOpacity={disabled ? 1 : 0.8}
  style={[
    styles.button,
    style,
    disabled
      ? styles.buttonDisabled
      : bgColor && { backgroundColor: bgColor },
  ]}
  disabled={disabled}
>
  <Text
    style={[
      styles.text,
      textStyle,
      disabled
        ? styles.textDisabled
        : color && { color: color },
    ]}
  >
    {children}
  </Text>
</TouchableOpacity>

  );
}
