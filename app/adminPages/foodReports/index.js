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
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import SgInput from "@/components/ui/Input/Input";
import SgPopup from "@/components/ui/Modal/Modal";

export default function ProjectItemScreen() {
    const [list, setList] = useState([]);
    const {request} = useApi();
    const {storeData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();

    const [reportData, setReportData] = useState({});
    const [errors, setErrors] = useState({});
    const [reportModal, setReportModal] = useState(false);
    const title = {
        1: 'Breakfast',
        2: 'Lunch',
        3: 'Dinenr',
        4: 'Night Lunch',
        5: 'Extra Bread',
        6: 'Extra Kefir',
        7: 'Extra Sugar',
        8: 'Extra Tea'
    }

    function handleChangeReport(e) {
        setReportData({...reportData, [e.name]: e.value});
    }

    function toggleReportModal(e, _data = {}) {
        setReportData(_data);
        setReportModal(!reportModal);
    }

    function handleSubmit() {
        const _data = {
            ...reportData,
            rest: reportData.order - reportData.real < 0 ? 0 : reportData.order - reportData.real,
            missing: reportData.order - reportData.real > 0 ? 0 : (reportData.order - reportData.real) * -1,
        }

        request({
            url: `/admin/food/report/edit/${reportData?.id}`, method: 'post', data: _data
        }).then(res => {
            getData();
        }).catch(err => {
            console.log(err);
        })
    }

    function getData() {
        request({
            url: '/admin/food/report/list', method: 'get',
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
        setList(storeData?.cache?.[`GET:/admin/food/report/list`]?.data)
    }, [storeData?.cache?.[`GET:/admin/food/report/list`]])


    return (<SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('foodReports')
            }}/>}
        >
            <View style={{gap: 12}}>
                {(list || []).map((item, index) => {
                    return (
                        <CollapsibleView key={index} title={`${item.date ? moment(item.date).format('DD/MM/YYYY') : ''} - ${title?.[item?.type]}`}>
                            <View style={{gap: 12}}>
                                <View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1stemployees')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.employees}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1storder')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.order}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1strest')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.rest}</Text>
                                    </View>
                                    <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1stmissing')}:</Text>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{item.missing}</Text>
                                    </View>
                                </View>
                                <View>
                                    {item?.status !== 2 ?
                                        <SgButton
                                            bgColor={COLORS.brand_600}
                                            color={COLORS.white}
                                            onPress={(e) => toggleReportModal(e, item)}
                                        >
                                            {t('AddReport')}
                                        </SgButton>
                                        : null
                                    }
                                </View>
                            </View>
                        </CollapsibleView>
                    )
                })}
            </View>

            <SgPopup
                visible={reportModal}
                onClose={toggleReportModal}
                title={t('foodSchedule__report')}
                description={`${reportData.date ? moment(reportData.date).format('DD/MM/YYYY') : ''} - ${title?.[reportData?.type]} ${t('foodSchedule__report__description')}`}
                footerButton={
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleSubmit}
                    >
                        {t('Save')}
                    </SgButton>
                }
            >
                <View style={{gap: 16, paddingBottom: 16}}>
                    <View style={{gap: 16}}>
                        <View>
                            <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1stemployees')}:</Text>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{reportData.employees}</Text>
                            </View>
                            <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1storder')}:</Text>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{reportData.order}</Text>
                            </View>
                            <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 8, paddingBottom: 8}}>
                                <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1strest')}:</Text>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{reportData.order - reportData.real < 0 ? 0 : reportData.order - reportData.real}</Text>
                            </View>
                            <View style={{gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8}}>
                                <Text style={{fontSize: 16, fontWeight: '400'}}>{t('turn1stmissing')}:</Text>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{reportData.order - reportData.real > 0 ? 0 : (reportData.order - reportData.real) * -1}</Text>
                            </View>
                        </View>
                        <View>
                            <SgInput
                                placeholder={t('enterturn1real')}
                                value={reportData?.real}
                                name='real'
                                onChangeText={handleChangeReport}
                                type='number'
                            />
                        </View>
                    </View>
                </View>
            </SgPopup>
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
        color: '#000000', fontFamily: 'Inter, sans-serif', fontWeight: '500', fontSize: 16, // lineHeight: '24px',
    }, container: {
        flex: 1,
    }, contentText: {
        fontSize: 16,
    }
});
