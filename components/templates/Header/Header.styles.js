import { Platform, StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
    backgroundColor: '#ccc',
  },
  nameSection: {
    flex: 1,
  },
  name: {
    color: COLORS.white,
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 30,
  },
  roleRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  role: {
    color: COLORS.brand_300,
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 18,
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
    color: COLORS.white,
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 18,
  },
});

export default styles;
