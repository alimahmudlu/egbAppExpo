import COLORS from '@/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 8,
    borderColor: COLORS.gray_200,
    borderWidth: 1,
    borderRadius: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 18,
    color: COLORS.gray_500,
  },
  statusBadge: {
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 14,
  },
});

export default styles;