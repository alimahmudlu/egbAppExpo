import { StyleSheet } from 'react-native';
import COLORS from '@/constants/colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    resizeMode: 'contain',
  },
  textContainer: {
    gap: 8,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
    color: COLORS.gray_900,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: COLORS.gray_500,
  },
});

export default styles;
