import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import SgNoticeCard from "@/components/ui/NoticeCard/NoticeCard";
import SgFileCard from "@/components/sections/FileCard/FileCard";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";

export default function EmployeeDocsScreen() {

  const taskList = [
    {
      id: 1,
      projectId: 1,
      time: "12.04.2025 / 10:20 AM",
      duration: "2h. 42m.",
      title: "There are many variations of passages of Lorem Ipsum available but the",
      description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
      name: "Jane Doe",
      image: null,
      status: "Check",
      statusType: "warning",
      type: 'check'
    },
    {
      id: 2,
      projectId: 2,
      time: "12.04.2025 / 10:20 AM",
      duration: "2h. 42m.",
      title: "There are many variations of passages of Lorem Ipsum available but the",
      description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
      name: "Jane Doe",
      image: null,
      status: null,
      statusType: "success",
      type: null
    },
    {
      id: 3,
      projectId: 3,
      time: "12.04.2025 / 10:20 AM",
      duration: "2h. 42m.",
      title: "There are many variations of passages of Lorem Ipsum available but the",
      description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
      name: "Jane Doe",
      image: null,
      status: "Complete",
      statusType: "success",
      type: 'complete'
    },
    {
      id: 4,
      projectId: 4,
      time: "12.04.2025 / 10:20 AM",
      duration: "2h. 42m.",
      title: "There are many variations of passages of Lorem Ipsum available but the",
      description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
      name: "Jane Doe",
      image: null,
      status: null,
      statusType: "success",
      type: null
    },
    {
      id: 5,
      projectId: 5,
      time: "12.04.2025 / 10:20 AM",
      duration: "2h. 42m.",
      title: "There are many variations of passages of Lorem Ipsum available but the",
      description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
      name: "Jane Doe",
      image: null,
      status: "Complete",
      statusType: "success",
      type: 'complete'
    },
    {
      id: 6,
      projectId: 6,
      time: "12.04.2025 / 10:20 AM",
      duration: "2h. 42m.",
      title: "There are many variations of passages of Lorem Ipsum available but the",
      description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
      name: "Jane Doe",
      image: null,
      status: "Complete",
      statusType: "success",
      type: 'complete'
    },
    {
      id: 7,
      projectId: 7,
      time: "12.04.2025 / 10:20 AM",
      duration: "2h. 42m.",
      title: "There are many variations of passages of Lorem Ipsum available but the",
      description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
      name: "Jane Doe",
      image: null,
      status: null,
      statusType: "success",
      type: null
    },
    {
      id: 8,
      projectId: 8,
      time: "12.04.2025 / 10:20 AM",
      duration: "2h. 42m.",
      title: "There are many variations of passages of Lorem Ipsum available but the",
      description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
      name: "Jane Doe",
      image: null,
      status: "Complete",
      statusType: "success",
      type: 'complete'
    },
    {
      id: 9,
      projectId: 9,
      time: "12.04.2025 / 10:20 AM",
      duration: "2h. 42m.",
      title: "There are many variations of passages of Lorem Ipsum available but the",
      description: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages",
      name: "Jane Doe",
      image: null,
      status: "Complete",
      statusType: "success",
      type: 'complete'
    }
  ]

  return (
    <SgTemplateScreenView
      head={
        <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
          <SgSectionFileHead
              title="History"
              description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
              icon="filter"
          />
        </View>
      }
    >
      {taskList?.map((el, index) => (
          <SgSectionTaskCard
              key={index}
              time={el?.time}
              duration={el?.duration}
              title={el?.title}
              description={el?.description}
              name={el?.name}
              image={null}
              status={el?.status}
              statusType={el?.statusType}
              href={`/chiefPages/projects/${el?.projectId}/${el?.id}`}
          />
      ))}
    </SgTemplateScreenView>
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