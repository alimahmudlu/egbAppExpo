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
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import {useData} from "@/hooks/useData";


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
                date: moment().add(1, 'day').format('YYYY-MM-DD'),
                project_id: selectedRow?.project_id,
                turn1employees: selectedRow?.turn1employees || 0,
                turn2employees: selectedRow?.turn2employees || 0,
            },
        }).then(res => {
            setData({
                date: moment().add(1, 'day').format('YYYY-MM-DD')
            })
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
                        description={t('foodSchedule__description')}
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
                    {/*<View style={{borderWidth: 1, borderColor: '#eee', padding: 16, borderRadius: 8, gap: 21}}>
                        <View style={{gap: 8}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee', borderStyle: 'dashed'}}>
                                <Text style={{fontWeight: 700}}>{t('turn1st')}: </Text>
                                <Text style={{fontWeight: 700}}>{today?.todayEmployees?.turn1employees || 0}</Text>
                            </View>
                            <View>
                                <SgInput
                                    placeholder={t('enterturn1order')}
                                    value={data?.turn1order || today?.today?.turn1order || ''}
                                    name='turn1order'
                                    onChangeText={(e) => handleChange(e, 'breakfast')}
                                    type='number'
                                    disabled={today?.today?.status}
                                />
                            </View>
                        </View>
                        <View style={{gap: 8}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee', borderStyle: 'dashed'}}>
                                <Text style={{fontWeight: 700}}>{t('turn2nd')}: </Text>
                                <Text style={{fontWeight: 700}}>{today?.todayEmployees?.turn2employees || 0}</Text>
                            </View>
                            <View>
                                <SgInput
                                    placeholder={t('enterturn2order')}
                                    value={data?.turn2order || today?.today?.turn2order || ''}
                                    name='turn2order'
                                    onChangeText={(e) => handleChange(e, 'breakfast')}
                                    type='number'
                                    disabled={today?.today?.status}
                                />
                            </View>
                        </View>
                        {today?.today?.status ?
                            null
                            :
                            <View>
                                <SgButton
                                    bgColor={COLORS.brand_600}
                                    color={COLORS.white}
                                    onPress={handleSubmit}
                                >
                                    {t('Save')}
                                </SgButton>
                            </View>
                        }
                    </View>*/}


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
                                        {item?.status ?
                                            <SgButton
                                                bgColor={COLORS.gray_600}
                                                color={COLORS.white}
                                                onPress={() => toggleReportModal(item)}
                                            >
                                                {t('ViewScheduleReport')}
                                            </SgButton>
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


            <SgPopup
                visible={reportModal}
                onClose={toggleReportModal}
                title={t('foodSchedule__report')}
                // fullScreen={true}
                description={`${moment().add(-1, 'day').format('DD/MM/YYYY')} ${t('foodSchedule__report__description')}`}
                footerButton={!reportData?.status ?
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleSubmit}
                    >
                        {t('Save')}
                    </SgButton> : null
                }
            >
                <View style={{gap: 32}}>
                    <View style={{gap: 16}}>
                        <Text style={{fontSize: 18, fontWeight: 700, textAlign: 'center'}}>Day Shift</Text>

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
                            <Text style={{fontSize: 14, fontWeight: 700}}>Dinner</Text>
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
                        <Text style={{fontSize: 18, fontWeight: 700, textAlign: 'center'}}>Night Shift</Text>

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
                        <Text style={{fontSize: 18, fontWeight: 700, textAlign: 'center'}}>Extras</Text>

                        <View style={{gap: 16, paddingBottom: 16}}>
                            <View>
                                <SgInput
                                    placeholder={t('enterExtraBread')}
                                    label={t('extraBread')}
                                    value={data?.turnextras?.bread?.order || selectedRow?.nightlunch?.order || ''}
                                    name='order'
                                    onChangeText={(e) => handleChange(e, 'bread', 'extras')}
                                    type='number'
                                />
                            </View>
                            <View>
                                <SgInput
                                    placeholder={t('enterExtraKefir')}
                                    label={t('extraKefir')}
                                    value={data?.turnextras?.kefir?.order || selectedRow?.nightlunch?.order || ''}
                                    name='order'
                                    onChangeText={(e) => handleChange(e, 'kefir', 'extras')}
                                    type='number'
                                />
                            </View>
                            <View>
                                <SgInput
                                    placeholder={t('enterExtraSugar')}
                                    label={t('extraSugar')}
                                    value={data?.turnextras?.sugar?.order || selectedRow?.nightlunch?.order || ''}
                                    name='order'
                                    onChangeText={(e) => handleChange(e, 'sugar', 'extras')}
                                    type='number'
                                />
                            </View>
                            <View>
                                <SgInput
                                    placeholder={t('enterExtraTea')}
                                    label={t('extraTea')}
                                    value={data?.turnextras?.tea?.order || selectedRow?.nightlunch?.order || ''}
                                    name='order'
                                    onChangeText={(e) => handleChange(e, 'tea', 'extras')}
                                    type='number'
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </SgPopup>
        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
})