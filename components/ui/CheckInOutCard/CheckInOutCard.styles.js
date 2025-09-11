import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    minHeight: 256,
    justifyContent: 'space-between',
  },
  card2: {
    minHeight: 160,
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 20,
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
    fontWeight: '400',
    lineHeight: 20,
    color: COLORS.black,
  },
  title2: {
    fontFamily: 'Inter',
    fontSize: 8,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 14,
    color: COLORS.black,
  },
  time: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 32,
    color: COLORS.brand_600,
    marginBottom: 10,
    flexShrink: 1,
  },
});

export default styles;
