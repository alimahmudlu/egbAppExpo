import { StyleSheet } from 'react-native';
import COLORS from '@/constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray_700,
    lineHeight: 18,
  },
  labelError: {
    color: COLORS.error_700,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray_300,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    height: 46,
    paddingHorizontal: 0,
    overflow: 'hidden',
  },
  inputErrorContainer: {
    borderColor: COLORS.error_700,

  },

  input: {
    flex: 1,
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    color: COLORS.black,
    paddingHorizontal: 14,
      height: '100%'
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
    minHeight: 100,
    alignItems: 'stretch',
  },

  counterButton: {
    width: 46,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  counterInput: {
    paddingVertical: 6,
    textAlign: 'center',
    color: COLORS.gray_800,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: COLORS.gray_200,
    borderRightColor: COLORS.gray_200,

  },
});

export default styles;
