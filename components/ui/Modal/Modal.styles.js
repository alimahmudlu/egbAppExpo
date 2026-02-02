import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(10, 41, 38, 0.6)',
  },
  keyboard: {
    flex: 1,
  },
  container: {
    position: 'relative',
    top: -20,
    marginBottom: -20,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 14,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '100%',
    shadowColor: COLORS.brand_950,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 16,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: COLORS.gray_200,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: COLORS.brand_25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  title: {
    color: COLORS.gray_900,
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 16,
    alignSelf: 'center',
    letterSpacing: -0.3,
  },
  titleWithoutIcon: {
    paddingTop: 16,
  },
  description: {
    color: COLORS.gray_500,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 24,
    paddingBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  footerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingTop: 12,
    marginTop: 'auto',
  },
});

export default styles;
