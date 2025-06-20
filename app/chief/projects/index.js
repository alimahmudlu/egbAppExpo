import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgCard from "@/components/ui/Card/Card";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import ApiService from "@/services/ApiService";
import {useAuth} from "@/hooks/useAuth";

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
  const { user, accessToken } = useAuth();
  const [projectsList, setProjectsList] = useState([]);
  const staffImages = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
    "https://randomuser.me/api/portraits/women/6.jpg",
    "https://randomuser.me/api/portraits/women/6.jpg",
  ];


  useEffect(() => {
    ApiService.get('/chief/project/list', {
      headers: {
        'authorization': accessToken || ''
      }
    }).then(res => {
      if (res.data.success) {
        console.log(res?.data?.data, 'salam');
        setProjectsList(res?.data?.data);
      } else {
        // Handle error response
        console.log(res.data.message);
      }
    }).catch(err => {
      console.log(err);
    })
  }, []);

  return (
      <SgTemplateScreenView
        head={
          <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
            <SgSectionFileHead
                title="Projects"
                description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
            />
          </View>
        }
      >
        <SgCard>
          <Text style={styles.title}>Added Projects</Text>
        </SgCard>

        <View style={{gap: 12}}>
          {(projectsList || []).map((project, index) => (
              <SgSectionProjectListItem
                  key={index}
                  title={project.name}
                  staffImages={project?.members?.map(() => "https://randomuser.me/api/portraits/men/1.jpg")}
                  id={project.id}
                  href={`/chiefPages/projects/${project.id}`}
              />
          ))}
        </View>
      </SgTemplateScreenView>
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