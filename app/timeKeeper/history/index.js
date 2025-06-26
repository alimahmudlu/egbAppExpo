import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import moment from "moment/moment";
import {useApi} from "@/hooks/useApi";

export default function EmployeeDocsScreen() {
  const { request } = useApi();
  const [employeeActivities, setEmployeeActivities] = useState([]);

  useEffect(() => {
    request({
      url: '/timekeeper/history/list',
      method: 'get',
    }).then(res => {
      setEmployeeActivities(res?.data || []);
    }).catch(err => {
      console.log(err, 'apiservice control err')
    });
  }, []);

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
                  employeeActivities?.filter(el => el.type === 1).map((emp, index) => (
                      <SgSectionEmployeeCard
                          key={index}
                          fullData={emp}
                          title={emp?.employee?.full_name}
                          role={emp?.employee?.role?.name}
                          time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                          image={emp?.employee?.image}
                          editable={false}
                          status={emp.status}
                          reason={emp.reject_reason}
                      />
                  ))
              ),
              id: 'checkIn'
            },
            {
              element: (
                  employeeActivities?.filter(el => el.type === 2).map((emp, index) => (
                      <SgSectionEmployeeCard
                          key={index}
                          fullData={emp}
                          title={emp?.employee?.full_name}
                          role={emp?.employee?.role?.name}
                          time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                          image={emp?.employee?.image}
                          editable={false}
                          status={emp.status}
                          reason={emp.reject_reason}
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