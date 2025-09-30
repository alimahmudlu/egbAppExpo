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
    display: 'flex',
    flexDirection: 'row',
},
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
      flex: 1
  },
    rightSection: {
      padding: 20,
    },

    notification: {
        backgroundColor: '#ccc',
        padding: 8,
        borderRadius: 50,
        position: 'relative'
    },
    notificationIcon: {
        width: 20, header: 20
    },
    notificationBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        color: COLORS.gray_700,
        fontWeight: 700,
        fontSize: 14,
        padding: 1,
        backgroundColor: '#ccc',
        borderRadius: 25,
        width: 16,
        height: 16,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
