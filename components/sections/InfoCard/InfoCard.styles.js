import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  infoCard: {
    borderRadius: 16,
    padding: 20,
    flex: 1,
    gap: 24,
    justifyContent: 'space-between',
    height: 'auto',
  },

  checkinBg: {
    backgroundColor: COLORS.brand_50, 
  },
  checkoutBg: {
    backgroundColor: COLORS.error_100, 
  },
  grayBg: {
    backgroundColor: COLORS.gray_100, 
  },
  activeTasksBg: {
    backgroundColor: COLORS.warning_100,
  },
  averageEarnedPointsBg: {
    backgroundColor: COLORS.gray_blue_200,
  },

  header: {
    gap: 8,
  },

  cardTitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 20,
    color: COLORS.black,
  },
  cardCount: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 32,
  },

  checkinText: {
    color: COLORS.brand_600, 
  },
  checkoutText: {
    color: COLORS.error_600,
  },
  activeTasksText: {
    color: COLORS.warning_600,
  },
  averageEarnedPointsText: {
    color: COLORS.gray_blue_600,
  },
  defaultText: {
    color: COLORS.gray_800, 
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    marginLeft: 'auto',
  },
});

export default styles;
