import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray_100,
    shadowColor: COLORS.brand_950,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  versionContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versionLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: COLORS.gray_500,
  },
  version: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    color: COLORS.brand_950,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.gray_100,
  },
  title: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
    color: COLORS.gray_600,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: COLORS.brand_950,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default styles;