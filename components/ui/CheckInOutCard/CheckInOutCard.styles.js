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
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    color: COLORS.black,
  },
  title2: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 8,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 11,
    color: COLORS.black,
  },
  time: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 32,
    color: COLORS.brand_600,
    marginBottom: 10,
    flexShrink: 1,
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
    itemTitle: {
        fontFamily: "Inter",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 20,
        color: COLORS.black,
    },
});

export default styles;
