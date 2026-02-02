import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerSection: {
    paddingTop: 48,
    marginBottom: 8,
  },
  formSection: {
    flex: 1,
  },
  buttonLayout: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
});

export default styles;
