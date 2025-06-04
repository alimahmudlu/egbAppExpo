import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  dragHandle: {
    width: 48,
    height: 5,
    backgroundColor: COLORS.borderColor,
    borderRadius: 4,
    alignSelf: 'center',
  },
  iconContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    color: COLORS.gray_900,
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 30,
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  titleWithoutIcon: {
    paddingTop: 24,
  },
  description: {
    color: COLORS.gray_700,
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    paddingBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  footerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 10,
    paddingHorizontal: 24,
  },
});

export default styles;
