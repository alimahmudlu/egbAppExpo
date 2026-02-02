import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: COLORS.brand_950,
    borderRadius: 24,
    padding: 24,
    width: "100%",
    shadowColor: COLORS.brand_950,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
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
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 18,
    resizeMode: "cover",
    backgroundColor: COLORS.brand_800,
  },
  placeholderAvatar: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: COLORS.brand_800,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.white,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 26,
    color: COLORS.white,
    marginBottom: 4,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roleBadge: {
    backgroundColor: COLORS.brand_800,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  role: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.brand_300,
  },
  positionText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.brand_300,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  right: {},
  rightColumn: {
    height: "100%",
    display: "flex",
    alignContent: "flex-start",
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  logoutText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },
});

export default styles;
