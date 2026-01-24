import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ClickupTask.styles';
import {Link, router} from "expo-router";
import moment from "moment";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";

// Android-də LayoutAnimation-ı aktiv etmək üçün
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskCard = ({ task, color }) => (
    <TouchableOpacity onPress={() => {
        router.push(`/chiefPages/projects/${task?.project_id}/${task?.id}`)
    }} style={[styles.taskCard, { borderLeftColor: color }]}>
        <Text style={styles.taskTitle}>{task.name}</Text>
        <Text style={styles.taskDescription} numberOfLines={1}>{task.description}</Text>
    </TouchableOpacity>
);

const TaskStatusList = ({ statusId, statusData, taskData, prefix = '/chiefPages/projects/' }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { name, color } = statusData.info;
    const taskCount = statusData.tasks.length;

    const toggleExpansion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleExpansion}>
                {/* Sol Ox və Status Adı */}
                <View style={styles.headerLeft}>
                    <Ionicons
                        name={isExpanded ? "chevron-down-outline" : "chevron-forward-outline"}
                        size={16}
                        color="#000"
                    />
                    <View style={[styles.statusButton, { backgroundColor: color }]}>
                        <Text style={styles.headerText}>{name}</Text>
                    </View>
                </View>

                <View style={styles.headerRight}>
                    <Text style={styles.taskCountText}>{taskCount} Tasks</Text>
                </View>
            </TouchableOpacity>

            {isExpanded && (
                <View style={[styles.taskList, {gap: 16}]}>
                    {statusData.tasks.map((el, index) => (
                        <SgSectionTaskCard
                            size={'sm'}
                            id={el?.id}
                            projectId={el?.project_id}
                            key={index}
                            time={moment(el?.deadline).format('') || ''}
                            duration={el?.points}
                            title={el?.name}
                            description={el?.description}
                            name={el?.assigned_employee?.full_name}
                            image={null}
                            status={el?.status}
                            href={`${prefix}${el?.project_id}/${el?.id}`}
                        />
                        // <TaskCard key={el.id} task={el} color={color} />
                    ))}
                    {taskCount === 0 && (
                        <Text style={styles.noTasksText}>Bu statusda task yoxdur.</Text>
                    )}
                </View>
            )}
        </View>
    );
};

export default TaskStatusList;