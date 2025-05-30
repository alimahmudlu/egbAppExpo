import { useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import styles from './Checkbox.styles';
import Check from "@/assets/images/check.svg";

export default function SgCheckbox({ label }) {
  const [checked, setChecked] = useState(false);

  return (
    <Pressable style={styles.container} onPress={() => setChecked(!checked)}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <Check width={12} height={12} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}