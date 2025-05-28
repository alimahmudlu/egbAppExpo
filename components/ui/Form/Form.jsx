import { View, StyleSheet } from 'react-native';
import styles from './Form.styles';

export default function SgForm({ children }) {
  return <View style={styles.container}>{children}</View>;
}


