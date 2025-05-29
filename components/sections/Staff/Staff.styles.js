import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
  },
  rowWrapper: {
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
  },
  imageRow: {
    flexDirection: 'row',
    position: 'relative',
    height: 20,
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
});

export default styles;
