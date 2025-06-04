import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Sample applications data
const applicationsData = [
  {
    id: '1',
    jobTitle: 'Senior Software Developer',
    company: 'Tech Solutions Inc.',
    location: 'Baku, Azerbaijan',
    appliedDate: '2023-05-15',
    status: 'pending',
  },
  {
    id: '2',
    jobTitle: 'UI/UX Designer',
    company: 'Creative Design Studio',
    location: 'Remote',
    appliedDate: '2023-05-10',
    status: 'interview',
  },
  {
    id: '3',
    jobTitle: 'Project Manager',
    company: 'Global Innovations',
    location: 'Baku, Azerbaijan',
    appliedDate: '2023-04-28',
    status: 'rejected',
  },
  {
    id: '4',
    jobTitle: 'Frontend Developer',
    company: 'Web Solutions',
    location: 'Baku, Azerbaijan',
    appliedDate: '2023-05-05',
    status: 'accepted',
  },
];

export default function ApplicationsScreen() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f9a825'; // Yellow
      case 'interview':
        return '#1e88e5'; // Blue
      case 'accepted':
        return '#43a047'; // Green
      case 'rejected':
        return '#e53935'; // Red
      default:
        return '#757575'; // Grey
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'interview':
        return 'Interview Scheduled';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Not Selected';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderApplicationItem = ({ item }) => (
    <View style={styles.applicationCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.jobTitle}>{item.jobTitle}</Text>
        <View 
          style={[
            styles.statusBadge, 
            { backgroundColor: getStatusColor(item.status) + '20' } // 20 is for opacity
          ]}
        >
          <Text 
            style={[
              styles.statusText, 
              { color: getStatusColor(item.status) }
            ]}
          >
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <Text style={styles.companyName}>{item.company}</Text>
      <Text style={styles.locationText}>{item.location}</Text>
      <Text style={styles.appliedDate}>Applied on {formatDate(item.appliedDate)}</Text>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[
            styles.actionButton,
            item.status === 'rejected' ? styles.disabledButton : null
          ]}
          disabled={item.status === 'rejected'}
        >
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        
        {item.status === 'interview' && (
          <TouchableOpacity style={[styles.actionButton, styles.scheduleButton]}>
            <Text style={styles.scheduleButtonText}>View Schedule</Text>
          </TouchableOpacity>
        )}
        
        {item.status === 'pending' && (
          <TouchableOpacity style={[styles.actionButton, styles.withdrawButton]}>
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={applicationsData}
        renderItem={renderApplicationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You haven't applied to any jobs yet.</Text>
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
  applicationCard: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  companyName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  appliedDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scheduleButton: {
    backgroundColor: '#1e88e5',
  },
  scheduleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  withdrawButton: {
    backgroundColor: '#e53935',
  },
  withdrawButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#bdbdbd',
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