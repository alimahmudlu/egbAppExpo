import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  profileSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    resizeMode: 'cover',
    backgroundColor: COLORS.gray_200,
  },
  placeholderAvatar: {
    backgroundColor: COLORS.brand_950,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontFamily: 'Inter_700Bold',
    fontWeight: '700',
  },
  nameSection: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: COLORS.gray_900,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
  },
  roleRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  role: {
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.warning_50,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  star: {
    color: '#FBBF24',
  },
  rating: {
    color: COLORS.gray_800,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
  },
});

export default styles;
