import { StyleSheet } from 'react-native';
import COLORS from '@/constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },

  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray_700,
    lineHeight: 20,
  },
  labelError: {
    color: COLORS.error_700,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.gray_200,
    borderRadius: 12,
    backgroundColor: COLORS.gray_50,
    height: 52,
    paddingHorizontal: 0,
    overflow: 'hidden',
  },
  inputContainerFocused: {
    borderColor: COLORS.brand_950,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.brand_950,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  inputErrorContainer: {
    borderColor: COLORS.error_600,
    backgroundColor: COLORS.error_50,
  },

  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.gray_900,
    paddingHorizontal: 16,
    height: '100%',
  },

  icon: {
    paddingHorizontal: 14,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textarea: {
    textAlignVertical: 'top',
    paddingTop: 14,
    paddingBottom: 14,
  },

  textareaContainer: {
    height: 'auto',
    minHeight: 120,
    alignItems: 'stretch',
  },

  counterButton: {
    width: 48,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  counterInput: {
    paddingVertical: 6,
    textAlign: 'center',
    color: COLORS.gray_900,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: COLORS.gray_200,
    borderRightColor: COLORS.gray_200,
  },
});

export default styles;
