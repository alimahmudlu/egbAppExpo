import { StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

const styles = StyleSheet.create({
  button: {
    width: '100%',
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
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 28,
    color: COLORS.buttonTextColor,
  }
});

export default styles;
