import {FlatList, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import COLORS from "@/constants/colors";
import React, {useCallback, useEffect, useState} from "react";
import moment from "moment/moment";
import {useApi} from "@/hooks/useApi";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";
import SgPopup from "@/components/ui/Modal/Modal";
import SgButton from "@/components/ui/Button/Button";
import ReloadArrow from "@/assets/images/reload-arrows.svg";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import FilterIcon from "@/assets/images/filter.svg";
import SgInput from "@/components/ui/Input/Input";
import SgSelect from "@/components/ui/Select/Select";
import CollapsibleView from "@/components/ui/Collapse/Collapse";

const isAndroid = Platform.OS === 'android';

const EmployeeListItem = ({ name, role, isLast }) => (
    <View style={[styles.employeeItem, !isLast && styles.separator]}>
        <Text style={styles.employeeName}>{name}</Text>
        <Text style={styles.employeeRole}>{role}</Text>
    </View>
);

const ProjectItem = ({ project }) => {
    const {t} = useTranslation()

    return (
        <CollapsibleView title={<Text style={styles.projectName}>{project.name}</Text>}>
            {/*<View style={styles.card}>*/}
            {/*    <Text style={styles.projectName}>{project.name}</Text>*/}
                <Text style={styles.teamHeader}>{t('teamMembers')} ({project.members.length})</Text>

                {/* 3. İşçi Object-lərinin Map ilə Ekranlaşdırılması */}
                <View style={styles.employeesContainer}>
                    {project?.members?.sort((a, b) => b?.role?.id - a?.role?.id).map((employee, index) => (
                        <EmployeeListItem
                            key={index}
                            name={employee?.full_name || 'N/A'}
                            role={employee?.role?.name || 'N/A'}
                            isLast={index === project?.members?.length - 1}
                        />
                    ))}
                </View>
            {/*</View>*/}
        </CollapsibleView>
    );
};

export default function TimeKeeperUserScreen() {
    const { request } = useApi();
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        start_date: moment().startOf('month'),
        end_date: moment().endOf('month')
    })
    const [filterModal, setFilterModal] = useState(false)

    const {storeData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation()

    function toggleFilterModal() {
        setFilterModal(!filterModal);
    }

    function resetFilters() {
        setFilters({});
    }

    function handleChange(e) {
        setFilters({...filters, [e.name]: e.value});
    }

    function handleFilters() {
        console.log("handleFilters", filters);

        request({
            url: `/my_team/list`,
            method: 'get',
            params: {
                full_name: filters.full_name,
                role_id: filters.role_id?.id,
            },
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });
    }

    useFocusEffect(useCallback(() => {
        request({
            url: `/my_team/list`,
            method: 'get',
            params: filters,
        }).then().catch(err => {
            console.log(err, 'apiservice control err')
        });

        return () => {};
    }, [refreshKey]));

    useEffect(() => {
        setData(storeData?.cache?.[`GET:/my_team/list`]?.data)
        console.log(storeData?.cache?.[`GET:/my_team/list`]?.data, 'storeData')
    }, [storeData?.cache?.[`GET:/my_team/list`]])

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('myTeam'),
            }} filter={
                <Pressable style={styles.iconWrapper} onPress={toggleFilterModal}>
                <Text><FilterIcon width={20} height={20} /></Text>
            </Pressable>} />}
        >

            <FlatList
                data={data || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProjectItem project={item} />}
                contentContainerStyle={styles.listContainer}
                // Boş siyahı üçün placeholder (opsiyonel)
                ListEmptyComponent={() => <Text style={styles.emptyText}>Layihə yoxdur.</Text>}
            />


            <SgPopup
                visible={filterModal}
                onClose={toggleFilterModal}
                footerButton={
                    <SgButton
                        onPress={handleFilters}
                        bgColor={COLORS.primary}
                        color={COLORS.white}
                    >
                        {t('accept')}
                    </SgButton>
                }
            >
                <View style={{paddingBottom: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 20, fontWeight: 600, lineHeight: 30}}>{t('filters')}</Text>

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
                            {t('clearFilters')}
                            <ReloadArrow width={20} height={20} style={{marginLeft: 7}}/>
                        </SgButton>
                    </View>

                    <View style={{gap: 16}}>
                        <View style={{flex: 1}}>
                            <SgInput
                                label={t('employeeName')}
                                placeholder={t('employeeName_placeholder')}
                                value={filters?.full_name}
                                name='full_name'
                                onChangeText={handleChange}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <SgSelect
                                label={t("role")}
                                placeholder={t("enterRole")}
                                modalTitle={t("selectProject")}
                                value={filters?.role_id}
                                name='role_id'
                                onChangeText={handleChange}
                                list={([
                                    {
                                        id: 1,
                                        name: 'Employee',
                                        render: <Text>Employee</Text>
                                    },
                                    {
                                        id: 2,
                                        name: 'TimeKeeper',
                                        render: <Text>TimeKeeper</Text>
                                    },
                                    {
                                        id: 3,
                                        name: 'Construction Chief',
                                        render: <Text>Construction Chief</Text>
                                    }
                                ])}
                            />
                        </View>
                    </View>
                </View>
            </SgPopup>
        </SgTemplateScreen>
    )
}

const styles = StyleSheet.create({
    employeeItem: {
        paddingVertical: 10,
        flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        paddingHorizontal: 5,
    },
    employeeName: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333333',
        flex: 2, // Ad çox yer tutsun
    },
    employeeRole: {
        fontSize: 10,
        fontWeight: '400',
        color: '#718096', // Solğun Boz
        // textAlign: 'right',
        flex: 1, // Rol daha az yer tutsun
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE', // Çox yüngül ayırıcı xətt
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        // Modern Kölgə Effekti (Minimalist qalır)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
        borderWidth: isAndroid ? 0 : 0.5,
        borderColor: isAndroid ? 'transparent' : COLORS.gray_200,
    },
    projectName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 15,
    },
    teamHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666666',
        marginBottom: 5,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        paddingBottom: 5,
    },
    employeesContainer: {
        // Artıq flexWrap lazım deyil, çünki alt-alta sıralanır
        marginTop: 5,
    },


    listContainer: {
        paddingBottom: 20, // Aşağıda boşluq yaratmaq üçün
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#999',
    },


    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand_50,
        padding: 14,
        borderRadius: 50,
    },
});