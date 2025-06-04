import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 16,
    borderColor: COLORS.gray_200,
    borderWidth: 1,
  },
  versionContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versionLabel: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 18,
    color: COLORS.gray_500,
  },
  version: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
    color: COLORS.gray_800,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.gray_200,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 18,
    color: COLORS.gray_500,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    flex: 1,
    borderColor: COLORS.gray_600,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: COLORS.black,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  icon: {
    width: 25,
    height: 25,
  },


});

export default styles;