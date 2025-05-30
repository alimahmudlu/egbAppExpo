import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.labelColor,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',      
    alignItems: 'center',      
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    height: 56,
  },
  input: {
    flex: 1,                   
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#000',
  },
  icon: {
    marginLeft: 12,           
  },
});

export default styles;
