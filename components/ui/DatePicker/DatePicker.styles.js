import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray_700,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    height: 48,
  },
  labelError: {
    color: COLORS.error_700,
  },
  inputErrorContainer: {
    borderColor: COLORS.error_700,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.gray_900,
  },
  icon: {
    marginLeft: 12,
  },
  textarea: {
    textAlignVertical: 'bottom',
  },
  textareaContainer: {
    height: 'auto',
    minHeight: 130,
    alignItems: 'stretch',
  },
});

export default styles;
