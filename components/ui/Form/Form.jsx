import { View, StyleSheet } from 'react-native';
import styles from './Form.styles';

export default function Form({ children }) {
  return <View style={styles.container}>{children}</View>;
}


