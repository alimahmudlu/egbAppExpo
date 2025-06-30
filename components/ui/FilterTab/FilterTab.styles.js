import { StyleSheet } from 'react-native';
import COLORS from '@/constants/colors';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 100,
    backgroundColor: COLORS.gray_100,
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: COLORS.brand_800,
  },
  tabText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
    color: COLORS.gray_600,
  },
  activeTabText: {
    color: COLORS.white,
  },
  badgeWrapper: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  badge: {
    minWidth: 20,
    backgroundColor: COLORS.error_600,
    borderRadius: 100,
    paddingHorizontal: 6,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Inter',
    fontSize: 8,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 12,
    color: COLORS.white,
  },
});

export default styles;
