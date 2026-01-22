import { StyleSheet, Dimensions } from "react-native";
import COLORS from "@/constants/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: COLORS.background,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonLayout: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 24,
  },
});

export default styles;