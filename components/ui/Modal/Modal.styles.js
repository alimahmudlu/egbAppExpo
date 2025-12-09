import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
    keyboard: {

        flex: 1,
    },
    // modalBackground: {
    //     flex: 1,
    //     backgroundColor: "rgba(0,0,0,0.5)",
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
    // modalContent: {
    //     backgroundColor: "white",
    //     borderRadius: 10,
    //     padding: 20,
    //     width: "90%",
    //     maxHeight: "80%",
    // },
    // scrollContent: {
    //     flexGrow: 1,
    //     justifyContent: "flex-start",
    // },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
      maxHeight: '100%',
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
    fontFamily: 'Inter, sans-serif',
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
    fontFamily: 'Inter, sans-serif',
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
      marginTop: 16
  },
});

export default styles;
