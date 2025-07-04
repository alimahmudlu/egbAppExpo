import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgCard from "@/components/ui/Card/Card";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";

export default function TasksScreen() {
  const { request } = useApi();
  const {storeData} = useData();
  const [projectsList, setProjectsList] = useState([]);


  useEffect(() => {
    request({
      url: `/chief/project/list`,
      method: 'get',
    }).then(res => {
      if (res.success) {
        setProjectsList(res?.data);
      } else {
        // Handle error response
        console.log(res.message);
      }
    }).catch(err => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    setProjectsList(storeData?.cache?.[`GET:/chief/project/list`]?.data)
  }, [storeData?.cache?.[`GET:/chief/project/list`]])

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
                  staffData={project?.members || []}
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