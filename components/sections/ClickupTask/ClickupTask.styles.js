import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listArea: {
        flex: 1,
        paddingHorizontal: 10,
    },
    // TaskStatusList Stili
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusButton: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        marginRight: 8,
        marginLeft: 5,
    },
    statusButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    taskCountText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '400',
    },
    taskList: {
        paddingTop: 5,
        paddingBottom: 10,
        // backgroundColor: '#f9f9f9', // Task listesi fonu
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