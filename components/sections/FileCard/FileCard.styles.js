import { StyleSheet } from 'react-native';
import COLORS from '@/constants/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray_200,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  content: {
    gap: 4,
  },
  migrationBox: {
    backgroundColor: COLORS.gray_100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  migrationText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 14,
    color: COLORS.black,
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 600,
    color: COLORS.gray_950,
  },
  description: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 14,
    color: COLORS.gray_500,
    marginTop: 4,
  },
  bottomRow: {
      flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  expireBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expireText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 14,
    color: COLORS.gray_500,
  },
  expireDate: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 14,
    color: COLORS.gray_800,
  },
});

export default styles;
