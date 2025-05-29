import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    justifyContent: 'space-between',
    backgroundColor: COLORS.gray_100,
    marginBottom: 24
  },
  content: {
      padding: 20,
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
  time: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 32,
    color: COLORS.gray_800,
    marginBottom: 10,
    flexShrink: 1,
  },
});

export default styles;
