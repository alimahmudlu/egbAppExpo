import styles from './ClickupTask.styles';
import {View} from "react-native";
import TaskStatusList from "@/components/sections/ClickupTask/TaskStatusList";

// Tutaq ki, bu, API-dən gələn Task datasıdır
const DUMMY_TASKS = [
    { id: 1, title: 'Task: Login page design', description: 'Redaksiyalar edilsin', current_status_id: 6 },
    { id: 2, title: 'Task: Backend structure', description: 'API endpoints yaradılsın', current_status_id: 6 },
    { id: 3, title: 'Task: Payment integration', description: 'Stripe ile inteqrasiya', current_status_id: 5 },
    { id: 4, title: 'Task: Profile screen', description: 'Mobil dizayn tamamlanmalı', current_status_id: 1 },
];

const STATUS_MAP = {
    1: { name: 'OPEN', color: '#979797' },
    2: { name: 'IN PROGRESS', color: '#fbbf24' },
    3: { name: 'COMPLETED', color: '#059669' },
};

const groupTasksByStatus = (tasks) => {
    return (tasks || []).reduce((acc, task) => {
        const statusId = task.current_status_id_mapped || task.current_status_id;
        if (!acc[statusId]) {
            acc[statusId] = {
                info: STATUS_MAP[statusId],
                tasks: [],
            };
        }
        acc[statusId].tasks.push(task);
        return acc;
    }, {});
};

const TaskListScreen = ({taskList, prefix}) => {
    const tasks = taskList || [];

    const groupedTasks = groupTasksByStatus(tasks);

    const orderedStatusIds = [3, 2, 1];

    return (
        <View style={styles.screen}>
            <View style={styles.listArea}>
                {orderedStatusIds.sort((a, b) => a - b).map(statusId => {
                    const statusData = groupedTasks[statusId];
                    if (statusData ) {
                        return (
                            <TaskStatusList
                                prefix={prefix}
                                key={statusId}
                                statusId={statusId}
                                statusData={statusData}
                                taskData={groupedTasks}
                            />
                        );
                    }
                    return null;
                })}
            </View>
        </View>
    );
};

export default TaskListScreen;