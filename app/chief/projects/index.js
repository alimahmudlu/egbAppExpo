import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Sample tasks data
const tasksData = [
  {
    id: '1',
    title: 'Fix Plumbing Issue',
    client: 'John Smith',
    location: 'Baku, Azerbaijan',
    dueDate: '2023-05-20',
    status: 'active',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Install Electrical Fixtures',
    client: 'Sarah Johnson',
    location: 'Baku, Azerbaijan',
    dueDate: '2023-05-25',
    status: 'active',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Paint Living Room',
    client: 'Michael Brown',
    location: 'Ganja, Azerbaijan',
    dueDate: '2023-06-01',
    status: 'pending',
    priority: 'low',
  },
  {
    id: '4',
    title: 'Repair Roof Leak',
    client: 'Emily Davis',
    location: 'Baku, Azerbaijan',
    dueDate: '2023-05-18',
    status: 'completed',
    priority: 'high',
  },
  {
    id: '5',
    title: 'Install Kitchen Cabinets',
    client: 'David Wilson',
    location: 'Sumgait, Azerbaijan',
    dueDate: '2023-05-30',
    status: 'active',
    priority: 'medium',
  },
];

export default function TasksScreen() {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#e53935'; // Red
      case 'medium':
        return '#fb8c00'; // Orange
      case 'low':
        return '#43a047'; // Green
      default:
        return '#757575'; // Grey
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'In Progress';
      case 'pending':
        return 'Not Started';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskCard}>
      <View style={styles.cardHeader}>
        <View 
          style={[
            styles.priorityIndicator, 
            { backgroundColor: getPriorityColor(item.priority) }
          ]}
        />
        <Text style={styles.taskTitle}>{item.title}</Text>
      </View>
      
      <View style={styles.taskDetails}>
        <Text style={styles.clientName}>Client: {item.client}</Text>
        <Text style={styles.locationText}>Location: {item.location}</Text>
        <Text style={styles.dueDate}>Due: {formatDate(item.dueDate)}</Text>
        <View 
          style={[
            styles.statusBadge, 
            item.status === 'completed' ? styles.completedBadge : 
            item.status === 'active' ? styles.activeBadge : styles.pendingBadge
          ]}
        >
          <Text 
            style={[
              styles.statusText, 
              item.status === 'completed' ? styles.completedText : 
              item.status === 'active' ? styles.activeText : styles.pendingText
            ]}
          >
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        {item.status !== 'completed' && (
          <>
            <TouchableOpacity 
              style={[styles.actionButton, styles.startButton]}
              disabled={item.status === 'active'}
            >
              <Text style={styles.actionButtonText}>
                {item.status === 'active' ? 'In Progress' : 'Start Task'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.completeButton]}
              disabled={item.status === 'pending'}
            >
              <Text style={styles.actionButtonText}>Complete</Text>
            </TouchableOpacity>
          </>
        )}
        
        {item.status === 'completed' && (
          <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
            <Text style={styles.actionButtonText}>View Details</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasksData}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks assigned yet.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 15,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  taskDetails: {
    marginBottom: 15,
  },
  clientName: {
    fontSize: 16,
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dueDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  activeBadge: {
    backgroundColor: '#e3f2fd',
  },
  pendingBadge: {
    backgroundColor: '#fff8e1',
  },
  completedBadge: {
    backgroundColor: '#e8f5e9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#1976d2',
  },
  pendingText: {
    color: '#f57c00',
  },
  completedText: {
    color: '#388e3c',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: '#1976d2',
  },
  completeButton: {
    backgroundColor: '#388e3c',
  },
  viewButton: {
    backgroundColor: '#757575',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});