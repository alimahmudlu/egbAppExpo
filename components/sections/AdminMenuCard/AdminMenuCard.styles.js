import COLORS from '@/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
  },
  menuWrapper: {
    gap: 8
  },
  titleText: {
    paddingHorizontal: 20,
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 20,
    color: COLORS.gray_500,
  },
  content: {
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    borderRadius: 16,
    padding: 20,
    gap: 20,
    flexDirection: 'column',
  },
  item: {
    display: "flex",
    width: '100%',
    flex: 1,
    gap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    backgroundColor: COLORS.brand_50,
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 'auto',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 20,
    color: COLORS.gray_800,
  },
  divider:{ 
    height: 1, 
    backgroundColor: COLORS.gray_200, 
    marginHorizontal: 0 
  }
});

export default styles;