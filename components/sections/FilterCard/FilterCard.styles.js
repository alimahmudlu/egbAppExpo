import COLORS from '@/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    gap: 20,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 30,
    color: COLORS.gray_900,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clearText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 20,
    color: COLORS.brand_700,
  },
  checkboxGroup: {
    flexDirection: 'column',
    gap: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
  },
  checkboxLabel: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 20,
    color: COLORS.gray_800
  },
  inputLabel: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 20,
    color: COLORS.gray_700,
  },
  datePicker: {
    gap: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.gray_200,
    paddingVertical: 8,
    paddingHorizontal: 20,
    gap: 8
  },
  inputText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 24,
    color: COLORS.gray_400,
  },
});

export default styles;