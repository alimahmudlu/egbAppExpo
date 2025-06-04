import COLORS from '@/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray_300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: COLORS.brand_600,
  },
  radioWrapper: {
    width: 20,
    height: 20,
    borderRadius: 10,
    padding: 6,
    backgroundColor: COLORS.brand_600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
});

export default styles;