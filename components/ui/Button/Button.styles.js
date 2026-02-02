import { StyleSheet } from 'react-native';
import COLORS from '@/constants/colors';

const styles = StyleSheet.create({
    button: {
        width: '100%',
        minHeight: 54,
        paddingVertical: 15,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        shadowColor: COLORS.brand_950,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 4,
    },
    buttonDisabled: {
        backgroundColor: COLORS.gray_100,
        shadowOpacity: 0,
        elevation: 0,
    },
    text: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        textAlign: 'center',
        letterSpacing: -0.2,
    },
    textDisabled: {
        color: COLORS.gray_400,
    },
});

export default styles;
