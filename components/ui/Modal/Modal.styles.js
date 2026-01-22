import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
    keyboard: {
        flex: 1,
    },
  container: {
    position: 'relative',
    top: '-20',
    marginBottom: '-20',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '100%',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.gray_300,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
  },
  title: {
    color: COLORS.gray_900,
    fontFamily: 'Inter, sans-serif',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  titleWithoutIcon: {
    paddingTop: 20,
  },
  description: {
    color: COLORS.gray_500,
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    paddingBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  footerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 8,
    paddingTop: 8,
    marginTop: "auto",
  },
});

export default styles;
