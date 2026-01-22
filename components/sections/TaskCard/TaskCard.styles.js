import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray_200,
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    gap: 20
  },
    card__sm: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray_200,
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        position: 'relative',
        elevation: 1,
        gap: 14
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
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 18,
    flex: 0
  },

  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
      maxWidth: 200
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
    gap: 6,
    display: 'flex',
  },
  title: {
    flex: 1,
    fontFamily: 'Inter, sans-serif',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    color: COLORS.gray_800,
    display: 'flex',
  },
  description: {
    flex: 1,
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 17,
    color: COLORS.gray_500,
    marginTop: 2,
    display: 'flex',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 18,
    // color: COLORS.gray_500,
      width: 30,
      height: 30,
      backgroundColor: COLORS.gray_50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: "center",
      textAlign: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontFamily: 'Inter, sans-serif',
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
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 10,
    lineHeight: 14,
  },

  statusBadge: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: 200 - 42,
  },
  statusText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 15,
    textAlign: 'center',
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
