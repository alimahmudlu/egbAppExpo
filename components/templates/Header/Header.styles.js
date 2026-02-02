import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLORS.white,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 20,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        flex: 1,
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: COLORS.brand_950,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 14,
    },
    avatarText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.white,
    },
    infoSection: {
        flex: 1,
        gap: 2,
    },
    greeting: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        fontWeight: '400',
        color: COLORS.gray_500,
    },
    name: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 17,
        fontWeight: '600',
        color: COLORS.gray_900,
        marginBottom: 4,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    roleBadge: {
        backgroundColor: COLORS.brand_950,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    roleText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 11,
        fontWeight: '500',
        color: COLORS.white,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: COLORS.warning_100,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    ratingText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.warning_700,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: COLORS.brand_950,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: COLORS.error_600,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    notificationBadgeText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 10,
        fontWeight: '600',
        color: COLORS.white,
    },
});

export default styles;
