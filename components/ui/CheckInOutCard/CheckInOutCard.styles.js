import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    minHeight: 256,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  card2: {
    minHeight: 170,
  },
  content: {
    paddingTop: 18,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    color: COLORS.black,
  },
  title2: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 9,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 12,
    color: COLORS.black,
    opacity: 0.6,
    marginTop: 2,
  },
  time: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 36,
    color: COLORS.brand_600,
    marginBottom: 12,
    flexShrink: 1,
    letterSpacing: -0.5,
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
