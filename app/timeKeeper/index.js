import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';

// Sample job data
const jobsData = [
  {
    id: '1',
    title: 'Senior Software Developer',
    company: 'Tech Solutions Inc.',
    location: 'Baku, Azerbaijan',
    type: 'Full-time',
    salary: '3000-4000 AZN',
    posted: '2 days ago',
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    company: 'Creative Design Studio',
    location: 'Remote',
    type: 'Contract',
    salary: '2500-3500 AZN',
    posted: '1 week ago',
  },
  {
    id: '3',
    title: 'Project Manager',
    company: 'Global Innovations',
    location: 'Baku, Azerbaijan',
    type: 'Full-time',
    salary: '4000-5000 AZN',
    posted: '3 weeks ago',
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    company: 'Media Group',
    location: 'Ganja, Azerbaijan',
    type: 'Part-time',
    salary: '1500-2000 AZN',
    posted: '1 month ago',
  },
  {
    id: '5',
    title: 'Customer Support Representative',
    company: 'Service Solutions',
    location: 'Baku, Azerbaijan',
    type: 'Full-time',
    salary: '1200-1800 AZN',
    posted: '2 days ago',
  },
];

export default function IsciJobsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobsData);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = jobsData.filter(job => 
        job.title.toLowerCase().includes(text.toLowerCase()) ||
        job.company.toLowerCase().includes(text.toLowerCase()) ||
        job.location.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobsData);
    }
  };

  const renderJobItem = ({ item }) => (
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.companyName}>{item.company}</Text>
      
      <View style={styles.jobDetails}>
        <Text style={styles.jobInfo}>{item.location}</Text>
        <Text style={styles.jobInfo}>{item.type}</Text>
        <Text style={styles.jobInfo}>Salary: {item.salary}</Text>
        <Text style={styles.jobInfo}>Posted: {item.posted}</Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs, companies, or locations..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      
      <FlatList
        data={filteredJobs}
        renderItem={renderJobItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No jobs found matching your search.</Text>
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
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
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
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  jobInfo: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
    marginBottom: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  viewButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 5,
  },
  applyButtonText: {
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