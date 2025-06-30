import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: COLORS.gray_100,
    color: COLORS.black,
  },
  content: {
      paddingVertical: 10,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 20,
    color: COLORS.black,
  },
  time: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 32,
    color: COLORS.gray_800,
    marginBottom: 10,
    flexShrink: 1,
  },
  contentTitle: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 18,
    color: COLORS.gray_500,
    marginBottom: 4,
  },
  contentDesc: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 24,
    color: COLORS.gray_800,
  },
});

export default styles;
