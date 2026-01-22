import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: COLORS.gray_100,
    color: COLORS.black,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  content: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    color: COLORS.black,
  },
  time: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 34,
    color: COLORS.gray_800,
    marginBottom: 8,
    flexShrink: 1,
    letterSpacing: -0.5,
  },
  contentTitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 18,
    color: COLORS.gray_500,
    marginBottom: 4,
  },
  contentDesc: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 24,
    color: COLORS.gray_800,
  },
});

export default styles;
