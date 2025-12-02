import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  profileSection: {
    display: "flex",
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    resizeMode: 'cover',
    backgroundColor: '#ccc',
  },
  placeholderAvatar: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: COLORS.gray_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.gray_700,
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: '700',
  },
  nameSection: {
    flex: 1,
  },
  name: {
    color: COLORS.gray_800,
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: '700',
  },
  roleRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  role: {
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  star: {
    color: '#FFA500',
  },
  rating: {
    color: COLORS.black,
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
  },
});

export default styles;
