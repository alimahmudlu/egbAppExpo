import COLORS from '@/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 20,
    color: COLORS.gray_800,
  },
});

export default styles; 