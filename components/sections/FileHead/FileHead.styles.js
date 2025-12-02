import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
      gap: 16,
      flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.brand_50,
    padding: 14,
    borderRadius: 50,
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 44,
    letterSpacing: -0.72,
    color: COLORS.black,
  },
  description: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 18,
    color: COLORS.gray_500,
  },
});

export default styles;