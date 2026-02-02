import COLORS from '@/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  menuWrapper: {
    gap: 12,
  },
  titleText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
    color: COLORS.gray_500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  content: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 8,
    shadowColor: COLORS.brand_950,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.gray_100,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.brand_50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
    color: COLORS.gray_900,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_100,
    marginLeft: 70,
  },
  chevron: {
    opacity: 0.4,
  },
});

export default styles;