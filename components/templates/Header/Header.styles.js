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
  borderBottomLeftRadius: 28,
  borderBottomRightRadius: 28,
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row',
},
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
    rightSection: {
      padding: 20,
      paddingTop: 24,
    },

    notification: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        padding: 12,
        borderRadius: 50,
        position: 'relative'
    },
    notificationIcon: {
        width: 20,
        height: 20
    },
    notificationBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        color: COLORS.gray_700,
        // color: COLORS.error_700,
        fontWeight: 700,
        fontSize: 10,
        lineHeight: 20,
        backgroundColor: '#ccc',
        borderRadius: 25,
        padding: 0,
        width: '100%',
        maxWidth: 40,
        minWidth: 26,
        height: 22,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;
