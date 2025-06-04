import COLORS from '@/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    justifyContent: 'space-between',
  },
  label: {
    width: 80,
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 18,
    color: COLORS.gray_600,
  },
  barBackground: {
    flex: 1,
    height: 12,
    backgroundColor: COLORS.gray_300,
    borderRadius: 100,
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  barFill: {
    height: 12,
    backgroundColor: COLORS.gray_800,
    borderRadius: 100,
  },
  value: {
    width: 40,
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 20,
    color: '#121a2e',
  },
});

export default styles;