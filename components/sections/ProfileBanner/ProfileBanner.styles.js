import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: COLORS.brand_950,
    borderRadius: 24,
    padding: 24,
    gap: 12,
    width: "100%",
  },
  vectorBackground: {
    position: 'absolute',
    top: 45,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    transform: [{ scaleX: 1.4 }],
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 100,
    resizeMode: "cover",
    backgroundColor: "#ccc",
  },
  placeholderAvatar: {
    width: 96,
    height: 96,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: COLORS.gray_100,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
      fontFamily: "Inter",
      fontSize: 24,
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: 32,
      color: COLORS.gray_700,
  },
  rightColumn: {
    height: "100%",
    display: "flex",
    alignContent: "flex-start",
  },
  logoutButton: {
    backgroundColor: COLORS.brand_600,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
  },
  logoutText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: 20,
    color: COLORS.white,
  },
  name: {
    fontFamily: "Inter",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 38,
    color: COLORS.white,
  },
  role: {
    fontFamily: "Inter",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: 18,
    color: COLORS.brand_300,
  },
});

export default styles;
