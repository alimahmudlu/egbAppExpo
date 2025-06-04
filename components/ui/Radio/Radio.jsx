import { View } from 'react-native';
import styles from '@/components/ui/Radio/Radio.styles';

export default function SgRadio({ selected }) {
  return (
    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioWrapper}><View style={styles.radioInner}></View></View>}
    </View>
  );
}
