import {View, StyleSheet, Text} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";
import moment from "moment";
import CollapsibleView from "@/components/ui/Collapse/Collapse";

export default function ProjectItemScreen() {
    const [list, setList] = useState([]);
    const {request} = useApi();
    const {storeData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();


    function getData() {
        request({
            url: '/admin/bus/projects/history', method: 'get',
        }).then(res => {
            console.log(res, 'res');
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
        setList(storeData?.cache?.[`GET:/admin/bus/projects/history`]?.data)
    }, [storeData?.cache?.[`GET:/admin/bus/projects/history`]])


    return (<SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('busReports')
            }}/>}
        >
            <View style={{gap: 12}}>
                {(list || []).map((item, index) => {
                    return (
                        <CollapsibleView key={index} title={`${item?.project_name} ${item.date ? `- ${moment(item.date).format('DD/MM/YYYY')}` : ''}`}>
                            <View style={{gap: 12}}>
                                <View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('Date')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{moment(item.date).format('DD/MM/YYYY')}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('Project')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item?.project_name}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('BusCount')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.bus_count}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('SeatCount')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.seat_count}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1stemployeesbus')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.turn1_employee_count}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn2ndemployeesbus')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.turn2_employee_count}</Text>
                                    </View>
                                </View>
                            </View>
                        </CollapsibleView>
                    )
                })}
            </View>
        </SgTemplateScreen>);
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    }, backButton: {
        padding: 8,
    }, headerTitle: {
        fontSize: 18, fontWeight: 'bold', marginRight: 'auto', marginLeft: 'auto',
    }, overviewButton: {
        paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4,
    }, overviewButtonText: {
        color: '#000000', fontFamily: 'Inter', fontWeight: '500', fontSize: 16, // lineHeight: '24px',
    }, container: {
        flex: 1,
    }, contentText: {
        fontSize: 16,
    }
});
