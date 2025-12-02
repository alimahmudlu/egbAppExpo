import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 16
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: COLORS.white,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  selectedItem: {
    backgroundColor: COLORS.gray_50, 
    borderColor: COLORS.gray_200,    
    borderWidth: 1,
    borderRadius: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 20,
    color: COLORS.gray_800,
  },
});

export default styles;