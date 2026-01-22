import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listArea: {
        flex: 1,
        paddingHorizontal: 6,
    },
    // TaskStatusList Stili
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
        letterSpacing: 0.3,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 8,
        marginLeft: 8,
    },
    statusButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
    taskCountText: {
        fontSize: 13,
        color: '#888',
        fontWeight: '500',
    },
    taskList: {
        paddingTop: 12,
        paddingBottom: 16,
    },
    noTasksText: {
        padding: 10,
        textAlign: 'center',
        color: '#888',
    },
    // TaskCard Stili
    taskCard: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 4,
        borderRadius: 6,
        borderLeftWidth: 4,
        borderLeftColor: '#f9ac00', // Məsələn, task prioritet rəngi
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    taskTitle: {
        fontSize: 14,
        fontWeight: '600',
    },
    taskDescription: {
        fontSize: 12,
        color: '#666',
    }
});

export default styles;