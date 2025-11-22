import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
    const [data, setData] = useState({
        turn1order: 0,
        turn2order: 0,
        date: moment().add(1, 'day').format('YYYY-MM-DD')
    });
    const [reportData, setReportData] = useState({});
    const [errors, setErrors] = useState({});
    const [reportModal, setReportModal] = useState(false);

    function handleChange(e) {
        setData({...data, [e.name]: e.value});
    }

    function handleChangeReport(e) {
        setReportData({...reportData, [e.name]: e.value});
    }

    function toggleReportModal() {
        setReportModal(!reportModal);
    }

    function handleSubmit() {
        request({
            method: "post",
            url: "/admin/food/report/add",
            data: {
                ...data,
                date: moment().add(1, 'day').format('YYYY-MM-DD'),
                turn1employees: today?.today?.turn1employees || 0,
                turn2employees: today?.today?.turn2employees || 0,
            },
        }).then(res => {
            setData({
                turn1order: 0,
                turn2order: 0,
                date: moment().add(1, 'day').format('YYYY-MM-DD')
            })
        }).catch(err => {
            console.log(err);
        })
    }



    function getData() {
        request({
            url: '/admin/food/report/today', method: 'get',
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
        setToday(storeData?.cache?.[`GET:/admin/food/report/today`]?.data)
    }, [storeData?.cache?.[`GET:/admin/food/report/today`]])

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
                    <View style={{borderWidth: 1, borderColor: '#eee', padding: 16, borderRadius: 8, gap: 21}}>
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
                                    onChangeText={handleChange}
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
                                    onChangeText={handleChange}
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
                    </View>
                    {/*<View style={{borderWidth: 1, borderColor: '#eee', padding: 16, borderRadius: 8, gap: 16}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee', borderStyle: 'dashed'}}>
                            <Text style={{fontWeight: 700}}>2st turn: </Text>
                            <Text style={{fontWeight: 700}}>751</Text>
                        </View>
                        <View>
                            <SgInput
                                placeholder={t('enterturn2order')}
                                value={data?.turn2order}
                                name='turn2order'
                                onChangeText={handleChange}
                                type='number'
                            />
                        </View>
                        <View>
                            <SgButton
                                bgColor={COLORS.brand_600}
                                color={COLORS.white}
                            >
                                Save
                            </SgButton>
                        </View>
                    </View>*/}
                </View>
            </View>


            <SgPopup
                visible={reportModal}
                onClose={toggleReportModal}
                title={t('foodSchedule__report')}
                description={`${moment().add(-1, 'day').format('DD/MM/YYYY')} ${t('foodSchedule__report__description')}`}
                footerButton={''}
            >
                <View style={{gap: 16}}>
                    <View>
                        <SgDatePicker
                            label={t('dateOfIssue')}
                            placeholder={t('enterDate')}
                            type="date"
                            value={reportData?.reportDate}
                            name='reportDate'
                            isInvalid={errors?.reportDate}
                            onChangeText={handleChangeReport}
                        />
                    </View>
                    <View>
                        <SgInput
                            placeholder={t('enterturn1order')}
                            value={data?.turn1order}
                            name='turn1order'
                            onChangeText={handleChange}
                            type='number'
                        />
                    </View>
                </View>
            </SgPopup>
        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
})