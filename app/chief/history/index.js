import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import moment from "moment/moment";
import SgPopup from "@/components/ui/Modal/Modal";
import ReloadArrow from "@/assets/images/reload-arrows.svg";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import SgSelect from "@/components/ui/Select/Select";
import SgInput from "@/components/ui/Input/Input";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import {useApi} from "@/hooks/useApi";

export default function EmployeeDocsScreen() {
  const { request } = useApi();
  const [taskList, setTaskList] = useState([]);
  const [taskStatuses, setTaskStatus] = useState([]);
  const [filters, setFilters] = useState({})
  const [filterModal, setFilterModal] = useState(false)

  function getData() {
    request({
      url: `/chief/task/list`,
      method: 'get',
    }).then(res => {
      if (res.data.success) {
        setTaskList(res?.data?.data);
      } else {
        // Handle error response
        console.log(res.data.message);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  function toggleFilterModal() {
    setFilterModal(!filterModal);
  }

  function resetFilters() {
    setFilters({});
  }

  function handleChange(e) {
    setFilters({ ...filters, [e.name]: e.value });
  }

  function handleFilters() {
    getData()
  }

  useEffect(() => {
    getData();

    request({
      url: `/chief/options/task_statuses`,
      method: 'get',
      cache: true,
    }).then(res => {
      if (res.data.success) {
        setTaskStatus(res?.data?.data);
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
              title="History"
              description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
              icon="filter"
              onPress={toggleFilterModal}
          />
        </View>
      }
    >
      {taskList?.map((el, index) => (
          <SgSectionTaskCard
              id={el?.id}
              projectId={el?.project_id}
              key={index}
              time={moment(el?.deadline).format('DD.MM.YYYY / h:mm A') || ''}
              duration={el?.duration}
              title={el?.name}
              description={el?.description}
              name={el?.assigned_employee?.full_name}
              image={null}
              status={el?.status}
              href={`/chiefPages/projects/${el?.project_id}/${el?.id}`}
          />
      ))}


      <SgPopup
          visible={filterModal}
          onClose={toggleFilterModal}
          footerButton={
            <SgButton
                onPress={handleFilters}
                bgColor={COLORS.primary}
                color={COLORS.white}
            >
              Accept
            </SgButton>
          }
      >
        <View style={{paddingBottom: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: 600, lineHeight: 30}}>Filters</Text>

            <SgButton
                onPress={resetFilters}
                color={COLORS.brand_700}
                style={{
                  flex: 0,
                  width: 'auto',
                  marginLeft: 'auto',
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  gap: 7
                }}

            >
              Clear filters
              <ReloadArrow width={20} height={20} style={{marginLeft: 7}} />
            </SgButton>
          </View>

          <View style={{gap: 16}}>
            <SgSelect
                label="Progress"
                placeholder="Select..."
                modalTitle="Select project"
                value={filters?.status}
                name='status'
                list={(taskStatuses || []).map((el) => ({
                  id: el.id,
                  name: el.name,
                  render: (<Text style={{fontSize: 16, fontWeight: 500}}>{el.name}</Text>)
                }))}
                onChangeText={handleChange}
            />
            <View style={{flexDirection: 'row', alignItems: 'flex-end', gap: 12}}>
              <View style={{flex: 1}}>
                <SgInput
                    label="Scor range"
                    placeholder="min."
                    value={filters?.score_min}
                    name='score_min'
                    onChangeText={handleChange}
                    type='number'
                />
              </View>
              <View style={{flex: 1}}>
                <SgInput
                    label=""
                    placeholder="max."
                    value={filters?.score_max}
                    name='score_max'
                    onChangeText={handleChange}
                    type='number'
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-end', gap: 12}}>
              <View style={{flex: 1}}>
                <SgDatePicker
                    label="Deadline date range"
                    placeholder="min."
                    value={filters?.deadline_min}
                    name='deadline_min'
                    onChangeText={handleChange}
                />
              </View>
              <View style={{flex: 1}}>
                <SgDatePicker
                    placeholder="max."
                    value={filters?.deadline_max}
                    name='deadline_max'
                    onChangeText={handleChange}
                />
              </View>
            </View>
          </View>
        </View>
      </SgPopup>
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