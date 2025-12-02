import { StyleSheet } from 'react-native';
import COLORS from '@/constants/colors';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flex: 1,
    minHeight: 55,
    paddingVertical: 14,
    paddingHorizontal: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonDisabled: {
    backgroundColor: COLORS.buttonColor,
    color: COLORS.buttonTextColor,
  },
  text: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 28,
    color: COLORS.buttonTextColor,
      textAlign: 'center',
  }
});

export default styles;
