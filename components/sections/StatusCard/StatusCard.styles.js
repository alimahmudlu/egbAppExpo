import COLORS from '@/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray_100,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    minHeight: 160,
  },
  containerNoPadding: {
    padding: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 20,
    color: COLORS.gray_500,
  },
  time: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 32,
    textAlign: 'center',
    color: COLORS.gray_800,
  },
  mapImage: {
    width: "100%",
    height: 124,
    borderRadius: 12,
  },
  openMap: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    textAlign: 'center',
    color: COLORS.gray_600,
  },
});

export default styles;
