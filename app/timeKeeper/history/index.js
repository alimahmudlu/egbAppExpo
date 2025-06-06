import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import SgNoticeCard from "@/components/ui/NoticeCard/NoticeCard";
import SgFileCard from "@/components/sections/FileCard/FileCard";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";

export default function EmployeeDocsScreen() {
  const employeeList = [
    { title: 'Jane Doe CI', type: 'checkIn', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:12 AM', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { title: 'John Smith CI', type: 'checkIn', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { title: 'Ali Veli CI', type: 'checkIn', status: 0, reason: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum", role: 'Employee', date: new Date().toLocaleDateString(), time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { title: 'John Smith CI', type: 'checkIn', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { title: 'Ali Veli CO', type: 'checkOut', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { title: 'John Smith AW', type: 'checkOut', status: 0, reason: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum", role: 'Employee', date: new Date().toLocaleDateString(), time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
    { title: 'Ali Veli AW', type: 'checkOut', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
  ];

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
      <SgFilterTab
          defaultTabId='checkIn'
          onTabChange={(index) => console.log('Selected tab:', index)}
          tabs={[
            { label: 'Check in', id: 'checkIn' },
            { label: 'Check out', id: 'checkOut' },
          ]}
          tabContent={[
            {
              element: (
                  employeeList?.filter(el => el.type === 'checkIn').map((emp, index) => (
                      <SgSectionEmployeeCard
                          key={index}
                          title={emp.title}
                          role={emp.role}
                          time={emp.time}
                          image={emp.image}
                          editable={false}
                          status={emp.status}
                          reason={emp.reason}
                      />
                  ))
              ),
              id: 'checkIn'
            },
            {
              element: (
                  employeeList?.filter(el => el.type === 'checkOut').map((emp, index) => (
                      <SgSectionEmployeeCard
                          key={index}
                          title={emp.title}
                          role={emp.role}
                          time={emp.time}
                          image={emp.image}
                          editable={false}
                          status={emp.status}
                          reason={emp.reason}
                      />
                  ))
              ),
              id: 'checkOut'
            }
          ]}
      />
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