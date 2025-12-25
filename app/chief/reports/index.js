import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text, ScrollView} from 'react-native';
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import {useAuth} from "@/hooks/useAuth";
import {useTranslation} from "react-i18next";

const { width } = Dimensions.get('window');

const SUMMARY_DATA = [
  { id: '1', title: 'Employees #', value: '697', sub: '125 Ind. / 570 Dir.' },
  { id: '2', title: 'Checked In #', value: '638', sub: '299 Man. / 339 Auto' },
  { id: '3', title: 'Not Checked In #', value: '59', sub: '35 Ind. / 22 Dir.' },
];

const PROJECTS_DATA = [
  { id: '18', name: 'Camp Representatives', employees: 10,
    indirect: 9,
    direct: 1,
    checkedIn: 8,
    indChecked: 7,
    dirChecked: 1,
    notChecked: 2,
    indNotChecked: 2,
    dirNotChecked: 0 },
  { id: '17', name: 'Central Office', employees: 10,
    indirect: 9,
    direct: 1,
    checkedIn: 8,
    indChecked: 7,
    dirChecked: 1,
    notChecked: 2,
    indNotChecked: 2,
    dirNotChecked: 0 },
  { id: '15', name: 'SberCity B-11 Apartments', employees: 10,
    indirect: 9,
    direct: 1,
    checkedIn: 8,
    indChecked: 7,
    dirChecked: 1,
    notChecked: 2,
    indNotChecked: 2,
    dirNotChecked: 0 },
];


export default function EmployeeDocsScreen() {
  const {request} = useApi();
  const {user} = useAuth();
  const {storeData} = useData();
  const {refreshKey} = useLocalSearchParams();
  const {t} = useTranslation()
  const [data, setData] = useState([])


  useFocusEffect(useCallback(() => {
    request({
      url: `/chief/reports/list`, method: 'get',
    }).then(res => {
    }).catch(err => {
      console.log(err);
    })

        return () => {};
      }, [refreshKey])
  );

  useEffect(() => {
    setData(storeData?.cache?.[`GET:/chief/reports/list`]?.data)
  }, [storeData?.cache?.[`GET:/chief/reports/list`]]);


  return (
    <SgTemplateScreen
      head={
        <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
          <SgSectionFileHead
              title={t('reports')}
              // description={t('reports__description')}
          />
        </View>
      }
    >
      <ScrollView horizontal={true}
                  showsHorizontalScrollIndicator={false}  style={styles.summaryWrapper}>
        {SUMMARY_DATA.map((item) => (
            <View key={item.id} style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>{item.title}</Text>
              <Text style={styles.summaryValue}>{item.value}</Text>
              <Text style={styles.summarySubText}>{item.sub}</Text>
            </View>
        ))}
      </ScrollView>

      <View style={styles.projectSection}>
        {(data || []).map((project) => (
            <View key={project.id} style={styles.projectBlock}>

              {/* Project Header */}
              <View style={styles.projectHeader}>
                <View>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectId}>ID: {project.id}</Text>
                </View>
              </View>

              <View style={styles.line} />

              {/* 9 Statistik Data - 3x3 Grid Sistemi */}
              <View style={styles.gridContainer}>
                {/* SIRA 1 */}
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>{t('Total_employee')}</Text>
                  <Text style={styles.gridValue}>{project.member_count}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>{t('Indirect_employee')}</Text>
                  <Text style={styles.gridValue}>{project.indirect_member_count}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>{t('Direct_employee')}</Text>
                  <Text style={styles.gridValue}>{project.direct_member_count}</Text>
                </View>

                {/* SIRA 2 */}
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>{t('Total_check_in')}</Text>
                  <Text style={styles.gridValue}>{project.total_checkin_count}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>{t('Check_in_indirect_employee')}</Text>
                  <Text style={styles.gridValue}>{project.indirect_checkin_count}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>{t('Check_in_direct_employee')}</Text>
                  <Text style={styles.gridValue}>{project.direct_checkin_count}</Text>
                </View>

                {/* SIRA 3 */}
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>{t('Not_Checked_in_Employees')}</Text>
                  <Text style={styles.gridValue}>{project?.member_count - project?.total_checkin_count}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>{t('Indirect_Not_Checked_in_Employees')}</Text>
                  <Text style={styles.gridValue}>{project?.indirect_member_count - project?.indirect_checkin_count}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>{t('Direct_Not_Checked_in_Employees')}</Text>
                  <Text style={styles.gridValue}>{project?.direct_member_count - project?.direct_checkin_count}</Text>
                </View>
              </View>

            </View>
        ))}
      </View>


    </SgTemplateScreen>
  );
}

const styles = StyleSheet.create({
  summaryWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 16,
    // flexWrap: 'wrap', // Ekrana sığmasa aşağı düşməsi üçün
    // justifyContent: 'space-between',
    marginBottom: 25,
  },
  summaryCard: {
    minWidth: width * 2 / 3,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginRight: 12
  },
  summaryLabel: {
    fontSize: 9,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginVertical: 4,
  },
  summarySubText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  headerDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  projectSection: {
  },
  projectBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Boz nazik border
    // Hafif kölgə (istəyə bağlı)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 2,
  },
  projectHeader: {
    marginBottom: 12,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  projectId: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  line: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '31%', // 3 sütunlu düzülüş üçün
    marginBottom: 15,
  },
  gridLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
});
