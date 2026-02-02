import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray_100,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    gap: 12,
    shadowColor: COLORS.brand_950,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  time: {
    fontFamily: 'Inter_400Regular',
    color: COLORS.gray_500,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    maxWidth: 180,
  },
  dots: {
    width: 28,
    height: 28,
    backgroundColor: COLORS.gray_50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: "center"
  },
  dotsIcon: {
    resizeMode: 'contain',
  },
  content: {
    flexDirection: "column",
    gap: 6,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    color: COLORS.gray_900,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: COLORS.gray_500,
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  duration: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    color: COLORS.gray_700,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: COLORS.gray_700,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 8,
  },
  placeholderAvatar: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: COLORS.brand_950,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 9,
    lineHeight: 12,
  },
  statusBadge: {
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    maxWidth: 160,
  },
  statusText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 14,
    textAlign: 'center',
  },
  modalList: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 4,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: COLORS.gray_50,
  },
  modalText: {
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.gray_800,
  },
  modalIcon: {
    color: COLORS.gray_600,
  }
});

export default styles;
