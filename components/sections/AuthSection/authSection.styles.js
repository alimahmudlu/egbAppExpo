import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 40,
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 44,
    letterSpacing: -0.72,
    marginTop: 8,
  },
  description: {
    color: '#000',
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 20,
    opacity: 0.6,
    marginTop: 4,
  },
  logo: {
    width: 56,
    height: 72,
    resizeMode: 'contain',
    aspectRatio: 56/72
  },
});

export default styles;