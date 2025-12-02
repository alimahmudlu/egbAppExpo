import COLORS from '@/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrapper: {
    
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 24,
    color: COLORS.gray_800,
  },
  dateTime: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 8,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 12,
    color: COLORS.brand_600,
  },
  eyeIconWrapper: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: COLORS.gray_50,
  }
});

export default styles;