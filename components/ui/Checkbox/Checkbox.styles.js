import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  box: {
    width: 16,
    height: 16,
    padding: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxChecked: {
    fontWeight: 'bold',
    backgroundColor: COLORS.checkedColor,
    borderColor: COLORS.checkedColor,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: COLORS.checkLabelColor,
    fontWeight: '500',
    lineHeight: 18,
    fontStyle: 'normal',
  },
});

export default styles;