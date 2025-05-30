import { StyleSheet, Dimensions } from "react-native";
import COLORS from "@/constants/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
    paddingTop: 48,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonLayout: {
      paddingVertical: 16,
      paddingHorizontal: 24,
  },
});

export default styles;