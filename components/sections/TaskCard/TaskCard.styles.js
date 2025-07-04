import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray_200,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    elevation: 1,
    gap: 24
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  time: {
    color: COLORS.gray_500,
    textOverflow: 'ellipsis',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 18,
  },

  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  dots: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.gray_50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: "center"
  },
  dotsIcon: {
    resizeMode: 'contain',
  },

  content: {
    flexDirection: "column",
    gap: 8,
    display: 'flex',
  },
  title: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 20,
    color: COLORS.gray_800,
    display: 'flex',
  },
  description: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 14,
    color: COLORS.gray_500,
    marginTop: 4,
    display: 'flex',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 18,
    color: COLORS.gray_500,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 20,
    color: COLORS.gray_800,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 90,
  },
  placeholderAvatar: {
    width: 24,
    height: 24,
    borderRadius: 90,
    padding: 5,
    backgroundColor: COLORS.gray_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.gray_700,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 10,
    lineHeight: 14,
  },

  statusBadge: {
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  statusText: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 14,
  },
//   success: {
//     backgroundColor: COLORS.,
//   },
//   warning: {
//     backgroundColor: '#FBBF24',
//   },
  modalList: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 8
  },
  modalItem: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  modalText: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.gray_800,
  },
  modalIcon: {
    color: COLORS.gray_800,
  }
});

export default styles;
