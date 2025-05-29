import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function employeeDashboard() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.welcomeText}>Welcome, employee!</Text>
        <Text style={styles.emailText}>{user?.email}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Active Jobs</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Applications</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Hired</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <Text style={styles.activityTitle}>New application received</Text>
          <Text style={styles.activityTime}>2 hours ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityTitle}>Job posting viewed 15 times</Text>
          <Text style={styles.activityTime}>5 hours ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityTitle}>Worker accepted your offer</Text>
          <Text style={styles.activityTime}>1 day ago</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  activityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  activityTitle: {
    fontSize: 16,
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});