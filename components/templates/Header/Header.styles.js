import { Platform, StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  vectorBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 0,
},
wrapper: {
  backgroundColor: COLORS.brand_950,
  borderBottomLeftRadius: 32,
  borderBottomRightRadius: 32,
  width: '100%',
  position: 'relative',
  overflow: 'hidden', 
},
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
