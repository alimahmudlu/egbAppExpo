import { StyleSheet } from 'react-native';
import COLORS from '@/constants/colors';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flex: 1,
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: COLORS.buttonColor,
    color: COLORS.buttonTextColor,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    color: COLORS.buttonTextColor,
    textAlign: 'center',
  }
});

export default styles;
