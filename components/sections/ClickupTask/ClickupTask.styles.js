import { StyleSheet } from 'react-native';
import COLORS from '@/constants/colors';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    listArea: {
        flex: 1,
    },
    // TaskStatusList styles
    container: {
        marginBottom: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray_100,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 11,
        letterSpacing: 0.3,
        textTransform: 'uppercase',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    statusButtonText: {
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 12,
    },
    taskCountText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 13,
        color: COLORS.gray_500,
        fontWeight: '500',
    },
    taskList: {
        paddingTop: 16,
        paddingBottom: 8,
    },
    noTasksText: {
        fontFamily: 'Inter_400Regular',
        padding: 16,
        textAlign: 'center',
        color: COLORS.gray_400,
        fontSize: 14,
    },
    // TaskCard styles
    taskCard: {
        backgroundColor: COLORS.white,
        padding: 14,
        marginVertical: 6,
        borderRadius: 14,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.brand_600,
        shadowColor: COLORS.brand_950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    taskTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.gray_900,
        marginBottom: 4,
    },
    taskDescription: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: COLORS.gray_500,
        lineHeight: 18,
    }
});

export default styles;