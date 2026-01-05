import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import {useTranslation} from "react-i18next";
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgInput from "@/components/ui/Input/Input";
import moment from "moment";
import SgPopup from "@/components/ui/Modal/Modal";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import {useApi} from "@/hooks/useApi";
import {useFocusEffect, useLocalSearchParams, useRouter} from "expo-router";
import {useData} from "@/hooks/useData";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";


export default function ChiefMenuScreen() {
    const {t} = useTranslation();
    const {request} = useApi();
    const {storeData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const [today, setToday] = useState({});
    const [list, setList] = useState([]);
    const [data, setData] = useState({
        turn1order: 0,
        turn2order: 0,
        date: moment().add(1, 'day').format('YYYY-MM-DD')
    });
    const [reportData, setReportData] = useState({});
    const [errors, setErrors] = useState({});
    const [reportModal, setReportModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const { project_id } = useLocalSearchParams();
    const router = useRouter();

    function handleChange(e, type, turn = 1) {
        if (type && turn) {
            setData({
                ...data,
                [`turn${turn}`]: {
                    ...data?.[`turn${turn}`],
                    [type]: {
                        ...data?.[`turn${turn}`]?.[type],
                        [e.name]: e.value,
                    }
                }
            });
        }
        else {
            setData({...data, [e.name]: e.value});
        }
    }

    function handleChangeReport(e) {
        setReportData({...reportData, [e.name]: e.value});
    }

    function toggleReportModal(item) {
        setSelectedRow(item);
        setData({
            turn1: {
                breakFast: item?.breakfast,
                lunch: item?.lunch,
                dinner: item?.dinner,
            },
            turn2: {
                lunch: item?.nightlunch,
            }
        })
        setReportModal(!reportModal);
    }

    function handleSubmit() {
        request({
            method: "post",
            url: "/admin/food/report/add",
            data: {
                ...data,
                date: moment().format('YYYY-MM-DD'),
                project_id: selectedRow?.project_id,
                turn1employees: selectedRow?.turn1employees || 0,
                turn2employees: selectedRow?.turn2employees || 0,
            },
        }).then(res => {
            setData({
                date: moment().format('YYYY-MM-DD')
            })
            router.replace(`/adminPages/foodReports?project_id=${selectedRow?.project_id}`);
        }).catch(err => {
            console.log(err, 'err');
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
            url: `/admin/food/projects/${project_id}`, method: 'get',
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
        console.log(storeData?.cache?.[`GET:/admin/food/report/today`]?.data, 'aaa')
        setToday(storeData?.cache?.[`GET:/admin/food/report/today`]?.data)
    }, [storeData?.cache?.[`GET:/admin/food/report/today`]])

    useEffect(() => {
        setSelectedRow({
            project_id: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.project_id,
            turn1employees: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.turn1employees,
            turn2employees: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.turn2employees,
        })
        console.log({
            turn1: {
                breakfast: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.breakfast,
                lunch: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.lunch,
                dinner: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.dinner,
            },
            turn2: {
                lunch: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.nightlunch,
            },
            turnextras: {
                bread: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.bread,
                kefir: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.kefir,
                sugar: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.sugar,
                tea: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.tea,
            }
        }, 'pros')
        setData({
            turn1: {
                breakfast: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.breakfast,
                lunch: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.lunch,
                dinner: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.dinner,
            },
            turn2: {
                lunch: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.nightlunch,
            },
            turnextras: {
                bread: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.bread,
                kefir: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.kefir,
                sugar: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.sugar,
                tea: storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]?.data?.tea,
            }
        })
    }, [storeData?.cache?.[`GET:/admin/food/projects/${project_id}`]])

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('foodSchedule')
            }}/>}
        >
            <View style={{gap: 32}}>
                <Text style={{textAlign: 'center', fontWeight: 600}}>DATE: {moment().format('DD/MM/YYYY')}</Text>
                <View style={{gap: 16}}>
                    <Text style={{fontSize: 18, fontWeight: 700, textAlign: 'center'}}>{t('DayShift')}</Text>

                    <View style={{gap: 16, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 16}}>
                        <Text style={{fontSize: 14, fontWeight: 700}}>Breakfast</Text>
                        <View>
                            <SgInput
                                placeholder={t('enterOrder')}
                                label={t('order')}
                                value={data?.turn1?.breakfast?.order || selectedRow?.breakfast?.order || ''}
                                name='order'
                                onChangeText={(e) => handleChange(e, 'breakfast', 1)}
                                type='number'
                            />
                        </View>
                        <View>
                            <SgInput
                                placeholder={t('enterNote')}
                                label={t('note')}
                                value={data?.turn1?.breakfast?.note || selectedRow?.breakfast?.note || ''}
                                name='note'
                                onChangeText={(e) => handleChange(e, 'breakfast', 1)}
                                type='textarea'
                            />
                        </View>
                    </View>
                    <View style={{gap: 16, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 16}}>
                        <Text style={{fontSize: 14, fontWeight: 700}}>Lunch</Text>
                        <View>
                            <SgInput
                                placeholder={t('enterOrder')}
                                label={t('order')}
                                value={data?.turn1?.lunch?.order || selectedRow?.lunch?.order || ''}
                                name='order'
                                onChangeText={(e) => handleChange(e, 'lunch', 1)}
                                type='number'
                            />
                        </View>
                        <View>
                            <SgInput
                                placeholder={t('enterNote')}
                                label={t('note')}
                                value={data?.turn1?.lunch?.note || selectedRow?.lunch?.note || ''}
                                name='note'
                                onChangeText={(e) => handleChange(e, 'lunch', 1)}
                                type='textarea'
                            />
                        </View>
                    </View>
                    <View style={{gap: 16, paddingBottom: 16}}>
                        <Text style={{fontSize: 14, fontWeight: 700}}>{t('Dinner')}</Text>
                        <View>
                            <SgInput
                                placeholder={t('enterOrder')}
                                label={t('order')}
                                value={data?.turn1?.dinner?.order || selectedRow?.dinner?.order || ''}
                                name='order'
                                onChangeText={(e) => handleChange(e, 'dinner', 1)}
                                type='number'
                            />
                        </View>
                        <View>
                            <SgInput
                                placeholder={t('enterNote')}
                                label={t('note')}
                                value={data?.turn1?.dinner?.note || selectedRow?.dinner?.note || ''}
                                name='note'
                                onChangeText={(e) => handleChange(e, 'dinner', 1)}
                                type='textarea'
                            />
                        </View>
                    </View>
                </View>
                <View style={{gap: 16}}>
                    <Text style={{fontSize: 18, fontWeight: 700, textAlign: 'center'}}>{t('NightShift')}</Text>

                    <View style={{gap: 16, paddingBottom: 16}}>
                        <Text style={{fontSize: 14, fontWeight: 700}}>Lunch</Text>
                        <View>
                            <SgInput
                                placeholder={t('enterOrder')}
                                label={t('order')}
                                value={data?.turn2?.lunch?.order || selectedRow?.nightlunch?.order || ''}
                                name='order'
                                onChangeText={(e) => handleChange(e, 'lunch', 2)}
                                type='number'
                            />
                        </View>
                        <View>
                            <SgInput
                                placeholder={t('enterNote')}
                                label={t('note')}
                                value={data?.turn2?.lunch?.note || selectedRow?.nightlunch?.note || ''}
                                name='note'
                                onChangeText={(e) => handleChange(e, 'lunch', 2)}
                                type='textarea'
                            />
                        </View>
                    </View>
                </View>
                <View style={{gap: 16}}>
                    <Text style={{fontSize: 18, fontWeight: 700, textAlign: 'center'}}>{t('extras')}</Text>

                    <View style={{gap: 16, paddingBottom: 16}}>
                        <View>
                            <SgInput
                                placeholder={t('enterExtraBread')}
                                label={t('extraBread')}
                                value={data?.turnextras?.bread?.order || selectedRow?.bread?.order || ''}
                                name='order'
                                onChangeText={(e) => handleChange(e, 'bread', 'extras')}
                                type='number'
                            />
                        </View>
                        <View>
                            <SgInput
                                placeholder={t('enterExtraKefir')}
                                label={t('extraKefir')}
                                value={data?.turnextras?.kefir?.order || selectedRow?.kefir?.order || ''}
                                name='order'
                                onChangeText={(e) => handleChange(e, 'kefir', 'extras')}
                                type='number'
                            />
                        </View>
                        <View>
                            <SgInput
                                placeholder={t('enterExtraSugar')}
                                label={t('extraSugar')}
                                value={data?.turnextras?.sugar?.order || selectedRow?.sugar?.order || ''}
                                name='order'
                                onChangeText={(e) => handleChange(e, 'sugar', 'extras')}
                                type='number'
                            />
                        </View>
                        <View>
                            <SgInput
                                placeholder={t('enterExtraTea')}
                                label={t('extraTea')}
                                value={data?.turnextras?.tea?.order || selectedRow?.tea?.order || ''}
                                name='order'
                                onChangeText={(e) => handleChange(e, 'tea', 'extras')}
                                type='number'
                            />
                        </View>
                    </View>
                </View>
            </View>
            {!reportData?.status ?
                <SgButton
                    bgColor={COLORS.brand_600}
                    color={COLORS.white}
                    onPress={handleSubmit}
                >
                    {t('Save')}
                </SgButton> : null}
        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
})