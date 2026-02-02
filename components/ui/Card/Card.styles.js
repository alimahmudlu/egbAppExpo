import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray_100,
    shadowColor: COLORS.brand_950,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: COLORS.gray_600,
  },
  time: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    color: COLORS.gray_900,
    letterSpacing: -0.5,
  },
  contentTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: COLORS.gray_500,
    marginBottom: 6,
  },
  contentDesc: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    color: COLORS.gray_900,
  },
  children: {},
});

export default styles;
