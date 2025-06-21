import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
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
    paddingHorizontal: 20,
    height: 56,
  },
  input: {
    flex: 1,                   
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 400,
    fontStyle: 'normal',
    color: COLORS.black,
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
