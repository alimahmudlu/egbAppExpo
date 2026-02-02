import COLORS from '@/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 12,
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray_100,
    borderWidth: 1,
    borderRadius: 14,
    shadowColor: COLORS.brand_950,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: COLORS.gray_600,
  },
  statusBadge: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    maxWidth: '70%',
  },
  statusText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 16,
    textAlign: 'center',
  },
});

export default styles;