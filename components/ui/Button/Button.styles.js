import { StyleSheet } from 'react-native';
import COLORS from '@/constants/colors';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flex: 1,
    minHeight: 40,
    paddingVertical: 10,
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
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20,
    color: COLORS.buttonTextColor,
      textAlign: 'center',
  }
});

export default styles;
