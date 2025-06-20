import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
  },
  navButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  monthText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 600,
    color: COLORS.gray_700,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  input: {
  flex: 1,
  borderWidth: 1,
  borderColor: COLORS.gray_300,
  paddingHorizontal: 14,
  height: 40,
  paddingVertical: 8,
  borderRadius: 8,
  backgroundColor: COLORS.gray_100,
  fontFamily: 'Inter',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: '400',
  color: COLORS.gray_900,
},

});

export default styles;