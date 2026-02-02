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
    padding: 12,
    borderRadius: 12,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 34,
    letterSpacing: -0.72,
    color: COLORS.gray_900,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: COLORS.gray_500,
  },
  iconText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
    color: COLORS.brand_950,
  },
});

export default styles;