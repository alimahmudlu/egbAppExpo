import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import COLORS from "@/constants/colors";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment/moment";
import { useApi } from "@/hooks/useApi";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import { useData } from "@/hooks/useData";
import { useTranslation } from "react-i18next";
import SgPopup from "@/components/ui/Modal/Modal";
import SgButton from "@/components/ui/Button/Button";
import ReloadArrow from "@/assets/images/reload-arrows.svg";
import FilterIcon from "@/assets/images/filter.svg";
import SgInput from "@/components/ui/Input/Input";
import SgSelect from "@/components/ui/Select/Select";
import CollapsibleView from "@/components/ui/Collapse/Collapse";

const EmployeeListItem = ({ name, role, isLast }) => (
  <View style={[styles.employeeItem, !isLast && styles.separator]}>
    <Text style={styles.employeeName}>{name}</Text>
    <Text style={styles.employeeRole}>{role}</Text>
  </View>
);

const ProjectItem = ({ project }) => {
  const { t } = useTranslation();

  return (
    <CollapsibleView
      title={<Text style={styles.projectName}>{project.name}</Text>}
    >
      <Text style={styles.teamHeader}>
        {t("teamMembers")} ({project.members.length})
      </Text>

      <View style={styles.employeesContainer}>
        {project?.members
          ?.sort((a, b) => b?.role?.id - a?.role?.id)
          .map((employee, index) => (
            <EmployeeListItem
              key={index}
              name={employee?.full_name || "N/A"}
              role={employee?.role?.name || "N/A"}
              isLast={index === project?.members?.length - 1}
            />
          ))}
      </View>
    </CollapsibleView>
  );
};

export default function TimeKeeperUserScreen() {
  const { request } = useApi();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    start_date: moment().startOf("month"),
    end_date: moment().endOf("month"),
  });
  const [filterModal, setFilterModal] = useState(false);

  const { storeData } = useData();
  const { refreshKey } = useLocalSearchParams();
  const { t } = useTranslation();

  function toggleFilterModal() {
    setFilterModal(!filterModal);
  }

  function resetFilters() {
    setFilters({});
  }

  function handleChange(name, value) {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFilters() {
    request({
      url: `/my_team/list`,
      method: "get",
      params: {
        full_name: filters.full_name,
        role_id: filters.role_id?.id,
      },
    })
      .then()
      .catch((err) => {
        console.log(err, "apiservice control err");
      });
    toggleFilterModal();
  }

  useFocusEffect(
    useCallback(() => {
      request({
        url: `/my_team/list`,
        method: "get",
        params: filters,
      })
        .then()
        .catch((err) => {
          console.log(err, "apiservice control err");
        });

      return () => {};
    }, [refreshKey])
  );

  useEffect(() => {
    const cached = storeData?.cache?.[`GET:/my_team/list`]?.data;
    if (cached) setData(cached);
  }, [storeData?.cache?.[`GET:/my_team/list`]]);

  return (
    <SgTemplateScreen
      scrollView={false}
      head={
        <SgTemplatePageHeader
          data={{
            header: t("myTeam"),
          }}
          filter={
            <TouchableOpacity style={styles.iconWrapper} onPress={toggleFilterModal} activeOpacity={0.7}>
              <FilterIcon width={20} height={20} color={COLORS.brand_950} fill={COLORS.brand_950} />
            </TouchableOpacity>
          }
        />
      }
    >
      <FlatList
        data={data || []}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => <ProjectItem project={item} />}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{t('noActivities')}</Text>
          </View>
        )}
      />

      <SgPopup
        visible={filterModal}
        onClose={toggleFilterModal}
        title={t("filters")}
        footerButton={
          <SgButton
            onPress={handleFilters}
            bgColor={COLORS.brand_950}
            color={COLORS.white}
          >
            {t("accept")}
          </SgButton>
        }
      >
        <View style={styles.filterContent}>
          <View style={styles.filterHeader}>
            <TouchableOpacity
              onPress={resetFilters}
              style={styles.clearFiltersButton}
              activeOpacity={0.7}
            >
              <Text style={styles.clearFiltersText}>{t("clearFilters")}</Text>
              <ReloadArrow width={16} height={16} color={COLORS.brand_700} fill={COLORS.brand_700} />
            </TouchableOpacity>
          </View>

          <View style={styles.filterFields}>
            <View style={styles.filterField}>
              <SgInput
                label={t("employeeName")}
                placeholder={t("employeeName_placeholder")}
                value={filters?.full_name}
                name="full_name"
                onChangeText={handleChange}
              />
            </View>
            <View style={styles.filterField}>
              <SgSelect
                label={t("role")}
                placeholder={t("enterRole")}
                modalTitle={t("selectProject")}
                value={filters?.role_id}
                name="role_id"
                onChangeText={handleChange}
                list={[
                  {
                    id: 1,
                    name: t("Employee"),
                    render: <Text>{t("Employee")}</Text>,
                  },
                  {
                    id: 2,
                    name: t("TimeKeeper"),
                    render: <Text>{t("TimeKeeper")}</Text>,
                  },
                  {
                    id: 3,
                    name: t("ConstructionChief"),
                    render: <Text>{t("ConstructionChief")}</Text>,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </SgPopup>
    </SgTemplateScreen>
  );
}

const styles = StyleSheet.create({
  employeeItem: {
    paddingVertical: 12,
    flexDirection: "column",
    paddingHorizontal: 4,
  },
  employeeName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray_900,
    lineHeight: 20,
  },
  employeeRole: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.gray_500,
    lineHeight: 18,
    marginTop: 2,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
  },
  projectName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gray_900,
    lineHeight: 26,
  },
  teamHeader: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray_600,
    marginBottom: 4,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
    paddingBottom: 8,
  },
  employeesContainer: {
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 20,
    gap: 16,
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    fontWeight: '400',
    textAlign: "center",
    color: COLORS.gray_500,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.brand_50,
    padding: 12,
    borderRadius: 12,
  },
  filterContent: {
    paddingBottom: 8,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  clearFiltersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.brand_50,
    borderRadius: 10,
  },
  clearFiltersText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.brand_700,
  },
  filterFields: {
    gap: 16,
  },
  filterField: {
    flex: 1,
  },
});
