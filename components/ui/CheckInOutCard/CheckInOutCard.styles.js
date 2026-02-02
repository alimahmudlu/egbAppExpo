import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 18,
        minHeight: 160,
        justifyContent: 'space-between',
        shadowColor: COLORS.brand_950,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    card2: {
        minHeight: 140,
    },
    content: {
        paddingTop: 16,
        paddingHorizontal: 14,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    title: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 16,
        color: COLORS.gray_700,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    title2: {
        fontFamily: 'Inter_400Regular',
        fontSize: 11,
        fontWeight: '400',
        lineHeight: 14,
        color: COLORS.gray_500,
        marginTop: 4,
    },
    time: {
        fontFamily: 'Inter_700Bold',
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 40,
        letterSpacing: -1,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: COLORS.gray_200,
        borderWidth: 1.5,
        padding: 16,
        gap: 14,
        borderRadius: 14,
        marginBottom: 10,
        backgroundColor: COLORS.white,
    },
    selectedItem: {
        backgroundColor: COLORS.brand_25,
        borderColor: COLORS.brand_950,
    },
    itemTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 22,
        color: COLORS.gray_900,
    },
});

export default styles;
