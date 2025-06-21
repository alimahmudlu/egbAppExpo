import { StyleSheet } from 'react-native';
import COLORS from '@/constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray_700,
    lineHeight: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray_300,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    height: 56,
    paddingHorizontal: 0,
    overflow: 'hidden',
  },

  input: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    color: COLORS.black,
    paddingHorizontal: 14,
  },

  icon: {
    marginLeft: 12,
    marginRight: 14,
  },

  textarea: {
    textAlignVertical: 'top',
    paddingTop: 12,
    paddingBottom: 12,
  },

  textareaContainer: {
    height: 'auto',
    minHeight: 130,
    alignItems: 'stretch',
  },

  counterButton: {
    width: 56,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  counterInput: {
    paddingVertical: 8,
    textAlign: 'center',
    color: COLORS.gray_800,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: COLORS.gray_200,
    borderRightColor: COLORS.gray_200,

  },
});

export default styles;
