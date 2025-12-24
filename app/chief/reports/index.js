import React, {useCallback} from 'react';
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


  useFocusEffect(useCallback(() => {

        return () => {};
      }, [refreshKey])
  );

  // useEffect(() => {
    // setDocList(storeData?.cache?.[`GET:/chief/doc/list`]?.data)
  // }, [storeData?.cache?.[`GET:/chief/doc/list`]]);


  return (
    <SgTemplateScreen
      head={
        <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
          <SgSectionFileHead
              title={t('myDocs')}
              description={t('myDocs__description')}
              iconText={t('seeExpiredDocs')}
              href={`/employeePages/docs/archive`}
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
        {PROJECTS_DATA.map((project) => (
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
                  <Text style={styles.gridLabel}>Employees</Text>
                  <Text style={styles.gridValue}>{project.employees}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Ind. Emp.</Text>
                  <Text style={styles.gridValue}>{project.indirect}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Dir. Emp.</Text>
                  <Text style={styles.gridValue}>{project.direct}</Text>
                </View>

                {/* SIRA 2 */}
                <View style={styles.gridItem}>
                  <Text style={[styles.gridLabel, {color: '#10B981'}]}>Checked In</Text>
                  <Text style={styles.gridValue}>{project.checkedIn}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Ind. Checked</Text>
                  <Text style={styles.gridValue}>{project.indChecked}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Dir. Checked</Text>
                  <Text style={styles.gridValue}>{project.dirChecked}</Text>
                </View>

                {/* SIRA 3 */}
                <View style={styles.gridItem}>
                  <Text style={[styles.gridLabel, {color: '#EF4444'}]}>Not Checked</Text>
                  <Text style={styles.gridValue}>{project.notChecked}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Ind. Not Chk.</Text>
                  <Text style={styles.gridValue}>{project.indNotChecked}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Dir. Not Chk.</Text>
                  <Text style={styles.gridValue}>{project.dirNotChecked}</Text>
                </View>
              </View>

            </View>
        ))}
      </View>


    </SgTemplateScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  summaryWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 16,
    // flexWrap: 'wrap', // Ekrana sığmasa aşağı düşməsi üçün
    // justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  summaryCard: {
    minWidth: width / 2 + 20,
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
    paddingHorizontal: 16,
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
