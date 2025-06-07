import { Pressable, View, Text } from 'react-native';
import styles from '@/components/ui/Checkbox/Checkbox.styles';
import Check from "@/assets/images/check.svg";

export default function SgCheckbox({ label, checked, onToggle }) {
  return (
    <Pressable style={styles.container} onPress={onToggle}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <Check width={12} height={12} />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
}
