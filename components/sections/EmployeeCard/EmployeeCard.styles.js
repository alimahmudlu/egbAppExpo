import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  employeeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.white,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    paddingHorizontal: 6,
    paddingVertical: 8,
    backgroundColor: COLORS.gray_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  initials: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 28,
    color: COLORS.gray_700,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 24,
    color: COLORS.gray_800,
  },
  employeeRole: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 14,
    color: COLORS.brand_500,
  },
  checkTime: {
    paddingRight: 4,
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 14,
    color: COLORS.gray_500,
  },
  time: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 14,
    color: COLORS.gray_800,       
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,  
  },
  cancelButton: {
    backgroundColor: COLORS.error_50,
  },
  confirmButton: {
    backgroundColor: COLORS.brand_50,
  },
});

export default styles;