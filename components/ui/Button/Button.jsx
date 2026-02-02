import { Pressable, Text, Animated } from 'react-native';
import { useRef } from 'react';
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
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: disabled ? 1 : scaleAnim }] }}>
      <Pressable
        onPress={disabled ? null : onPress}
        onPressIn={disabled ? null : handlePressIn}
        onPressOut={disabled ? null : handlePressOut}
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
      </Pressable>
    </Animated.View>
  );
}
