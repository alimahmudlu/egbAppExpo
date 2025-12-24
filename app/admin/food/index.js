import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import {useTranslation} from "react-i18next";
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import {useApi} from "@/hooks/useApi";
import {useFocusEffect, useLocalSearchParams, useRouter} from "expo-router";
import {useData} from "@/hooks/useData";


export default function ChiefMenuScreen() {
    const {t} = useTranslation();
    const {request} = useApi();
    const {storeData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const [today, setToday] = useState({});
    const [list, setList] = useState([]);
    const router = useRouter();


    function toggleReportModal(item) {
        router.navigate(`/adminPages/create-report/${item?.project_id}`)
    }

    function deleteReport(item) {
        request({
            method: "delete",
            url: `/admin/food/report/delete/${item?.project_id}`,
        }).then(res => {
            getData();
        }).catch(err => {
            console.log(err);
        })
    }

    function getData() {
        request({
            url: '/admin/food/report/today', method: 'get',
        }).then(res => {
        }).catch(err => {
            console.log(err);
        })

        request({
            url: '/admin/food/projects', method: 'get',
        }).then(res => {
        }).catch(err => {
            console.log(err);
        })
    }

    useFocusEffect(useCallback(() => {
        getData();

        return () => {
            console.log('Home tab lost focus');
        };
    }, [refreshKey]));

    useEffect(() => {
        setToday(storeData?.cache?.[`GET:/admin/food/report/today`]?.data)
    }, [storeData?.cache?.[`GET:/admin/food/report/today`]])

    useEffect(() => {
        setList(storeData?.cache?.[`GET:/admin/food/projects`]?.data)
    }, [storeData?.cache?.[`GET:/admin/food/projects`]])

    return (
        <SgTemplateScreen
            head={
                <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
                    <SgSectionFileHead
                        title={t('foodSchedule')}
                        // description={t('foodSchedule__description')}
                        iconText={t('foodSchedule__archive')}
                        href={`/adminPages/foodReports`}
                    />
                </View>
            }
        >
            <View style={{gap: 32}}>
                <View style={{gap: 16}}>
                    <Text style={{fontSize: 18, fontWeight: 700}}>
                        {t('ORDER')}
                    </Text>

                    <View style={{gap: 16}}>
                        {(list || []).map((item, index) => {
                            return (
                                <View key={index} style={{borderWidth: 1, borderColor: '#eee', padding: 16, borderRadius: 8, gap: 21}}>
                                    <Text style={{fontWeight: 700, fontSize: 18}}>{item?.project_name}</Text>
                                    <View style={{gap: 8}}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee', borderStyle: 'dashed'}}>
                                            <Text style={{fontWeight: 400}}>{t('EmployeesMorningCheckedIn')}: </Text>
                                            <Text style={{fontWeight: 700}}>{item?.turn1employees || 0}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee', borderStyle: 'dashed'}}>
                                            <Text style={{fontWeight: 400}}>{t('EmployeesNightCheckIn')}: </Text>
                                            <Text style={{fontWeight: 700}}>{item?.turn2employees || 0}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        {(item?.breakfast?.id || item?.lunch?.id || item?.dinner?.id || item?.nightlunch?.id) ?
                                            <View style={{gap: 6, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <SgButton
                                                    bgColor={COLORS.gray_600}
                                                    color={COLORS.white}
                                                    onPress={() => toggleReportModal(item)}
                                                >
                                                    {t('Edit')}
                                                </SgButton>
                                                <SgButton
                                                    bgColor={COLORS.error_600}
                                                    color={COLORS.white}
                                                    onPress={() => deleteReport(item)}
                                                >
                                                    {t('Delete')}
                                                </SgButton>
                                            </View>
                                            :
                                            <SgButton
                                                bgColor={COLORS.brand_600}
                                                color={COLORS.white}
                                                onPress={() => toggleReportModal(item)}
                                            >
                                                {t('FoodSchedule')}
                                            </SgButton>
                                        }
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>
        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
})