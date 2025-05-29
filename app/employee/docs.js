import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Sample job data
const jobsData = [
  {
    id: '1',
    title: 'Senior Software Developer',
    location: 'Baku, Azerbaijan',
    type: 'Full-time',
    applicants: 8,
    posted: '2 days ago',
    status: 'active',
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    location: 'Remote',
    type: 'Contract',
    applicants: 5,
    posted: '1 week ago',
    status: 'active',
  },
  {
    id: '3',
    title: 'Project Manager',
    location: 'Baku, Azerbaijan',
    type: 'Full-time',
    applicants: 12,
    posted: '3 weeks ago',
    status: 'closed',
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    location: 'Ganja, Azerbaijan',
    type: 'Part-time',
    applicants: 3,
    posted: '1 month ago',
    status: 'active',
  },
  {
    id: '5',
    title: 'Customer Support Representative',
    location: 'Baku, Azerbaijan',
    type: 'Full-time',
    applicants: 7,
    posted: '2 days ago',
    status: 'active',
  },
];

export default function JobsScreen() {
  const renderJobItem = ({ item }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <View 
          style={[
            styles.statusBadge, 
            item.status === 'active' ? styles.activeBadge : styles.closedBadge
          ]}
        >
          <Text 
            style={[
              styles.statusText, 
              item.status === 'active' ? styles.activeText : styles.closedText
            ]}
          >
            {item.status === 'active' ? 'Active' : 'Closed'}
          </Text>
        </View>
      </View>
      
      <View style={styles.jobDetails}>
        <Text style={styles.jobInfo}>{item.location}</Text>
        <Text style={styles.jobInfo}>{item.type}</Text>
        <Text style={styles.jobInfo}>Posted: {item.posted}</Text>
      </View>
      
      <View style={styles.applicantsContainer}>
        <Text style={styles.applicantsText}>
          {item.applicants} {item.applicants === 1 ? 'Applicant' : 'Applicants'}
        </Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Applicants</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, item.status === 'active' ? styles.closeButton : styles.reopenButton]}
        >
          <Text 
            style={[
              styles.actionButtonText, 
              item.status === 'active' ? styles.closeButtonText : styles.reopenButtonText
            ]}
          >
            {item.status === 'active' ? 'Close Job' : 'Reopen Job'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Job Listings</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New Job</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={jobsData}
        renderItem={renderJobItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
  },
  jobCard: {
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
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  activeBadge: {
    backgroundColor: '#e6f7ee',
  },
  closedBadge: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#00a86b',
  },
  closedText: {
    color: '#f44336',
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  jobInfo: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
    marginBottom: 5,
  },
  applicantsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    marginVertical: 10,
  },
  applicantsText: {
    fontSize: 16,
    fontWeight: '500',
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
  closeButton: {
    backgroundColor: '#f44336',
  },
  reopenButton: {
    backgroundColor: '#4caf50',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButtonText: {
    color: '#fff',
  },
  reopenButtonText: {
    color: '#fff',
  },
});