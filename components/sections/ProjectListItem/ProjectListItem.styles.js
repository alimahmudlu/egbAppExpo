import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    flex: 1
  },
  rowWrapper: {
    display: 'flex',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 20,
    color: COLORS.black,
  },
  imageRow: {
    flexDirection: 'row',
    position: 'relative',
    height: 30,
    overflow: 'hidden',
    paddingRight: 8,
  },
  imageWrapper: {
    position: 'absolute',
  },
  staffImage: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  hiddenCount: {
    width: 30,
    height: 20,
    borderRadius: 40,
    backgroundColor: COLORS.gray_100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  hiddenCountText: {
    color: COLORS.gray_700,
    fontFamily: 'Inter',
    fontSize: 8,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 12,
  },
  initialsV: {
    backgroundColor: COLORS.gray_100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.white,
    padding: 2,
    width: 24,
    height: 24,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  initialsT: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 12,
  },
});

export default styles;
