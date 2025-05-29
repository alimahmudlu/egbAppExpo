import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 48,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 48,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 60,
    letterSpacing: -0.96,  
  },
  description: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 18,
    opacity: 0.5,
  },
  logo: {
    width: 60,
    height: 80,
    resizeMode: 'contain',
    aspectRatio: 60/80
  },
});

export default styles;