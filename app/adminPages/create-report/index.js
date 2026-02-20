import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import {useTranslation} from "react-i18next";
import SgInput from "@/components/ui/Input/Input";
import moment from "moment";
import {useApi} from "@/hooks/useApi";
import {useFocusEffect, useLocalSearchParams, useRouter} from "expo-router";
import {useData} from "@/hooks/useData";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import SgSelect from "@/components/ui/Select/Select";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";


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
        date: moment().tz("Europe/Moscow").add(1, 'day').format('YYYY-MM-DD')
    });
    const [reportData, setReportData] = useState({});
    const [errors, setErrors] = useState({});
    const [projectsList, setProjectsList] = useState([]);
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
                project_id: selectedRow?.project_id,
                turn1employees: selectedRow?.turn1employees || 0,
                turn2employees: selectedRow?.turn2employees || 0,
            },
        }).then(res => {
            setData({
                date: moment().tz("Europe/Moscow").format('YYYY-MM-DD')
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
            url: `/admin/food/projects/${data?.project?.id}`, method: 'get',
            params: {
                date: data?.date
            }
        }).then(res => {
        }).catch(err => {
            console.log(err);
        })
    }

    useFocusEffect(useCallback(() => {
        request({
            url: `/admin/options/projects`, method: 'get',
        }).then(res => {
            // console.log(res, 'ressss')
            if (res.success) {
                setProjectsList(res?.data);
            } else {
                // Handle error response
                // console.log(res.message);
            }
        }).catch(err => {
            // console.log(err, 'errrr');
        })

        return () => {
            console.log('Home tab lost focus');
        };
    }, [refreshKey]));

    useEffect(() => {
        if(data?.project?.id) {
            getData();
        }
    }, [data?.project, data?.date]);

    useEffect(() => {
        setToday(storeData?.cache?.[`GET:/admin/food/report/today`]?.data)
    }, [storeData?.cache?.[`GET:/admin/food/report/today`]])

    useEffect(() => {
        setSelectedRow({
            project_id: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.project_id || data?.project?.id,
            turn1employees: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.turn1employees,
            turn2employees: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.turn2employees,
        })

        setData({
            ...data,
            turn1: {
                breakfast: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.breakfast,
                lunch: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.lunch,
                dinner: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.dinner,
            },
            turn2: {
                lunch: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.nightlunch,
            },
            turnextras: {
                bread: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.bread,
                kefir: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.kefir,
                sugar: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.sugar,
                tea: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.tea,
                spoon: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.spoon,
                cup: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.cup,
                salt: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.salt,
                pepper: storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]?.data?.pepper,
            }
        })
    }, [storeData?.cache?.[`GET:/admin/food/projects/${data?.project?.id}`]])

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('foodSchedule')
            }}/>}
        >
            <View style={{gap: 32}}>
                {/*<Text style={{textAlign: 'center', fontWeight: 600}}>DATE: {moment().add(1, 'days').format('DD/MM/YYYY')}</Text>*/}
                <View style={{gap: 16}}>
                    <View style={{flex: 1}}>
                        <SgDatePicker
                            label={t('date')}
                            placeholder={t('date')}
                            value={data?.date}
                            name='date'
                            mode='date'
                            onChangeText={handleChange}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <SgSelect
                            label={t("project")}
                            placeholder={t("enterProject")}
                            modalTitle={t("selectProject")}
                            value={data?.project}
                            name='project'
                            onChangeText={handleChange}
                            list={(projectsList || []).map((project, index) => ({
                                id: project?.id, name: project?.name, render: <SgSectionProjectListItem
                                    key={index}
                                    title={project.name}
                                    staffData={(project?.members || []).filter(el => el.status)}
                                    id={project.id}
                                />
                            }))}
                        />
                    </View>
                </View>
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
                        <View>
                            <SgInput
                                placeholder={t('enterExtraPlasticSpoon')}
                                label={t('extraPlasticSpoon')}
                                value={data?.turnextras?.spoon?.order || selectedRow?.spoon?.order || ''}
                                name='order'
                                onChangeText={(e) => handleChange(e, 'spoon', 'extras')}
                                type='number'
                            />
                        </View>
                        <View>
                            <SgInput
                                placeholder={t('enterExtraPlasticCup')}
                                label={t('extraPlasticCup')}
                                value={data?.turnextras?.cup?.order || selectedRow?.cup?.order || ''}
                                name='order'
                                onChangeText={(e) => handleChange(e, 'cup', 'extras')}
                                type='number'
                            />
                        </View>
                        <View>
                            <SgInput
                                placeholder={t('enterExtraSalt')}
                                label={t('extraSalt')}
                                value={data?.turnextras?.salt?.order || selectedRow?.salt?.order || ''}
                                name='order'
                                onChangeText={(e) => handleChange(e, 'salt', 'extras')}
                                type='number'
                            />
                        </View>
                        <View>
                            <SgInput
                                placeholder={t('enterExtraPepper')}
                                label={t('extraPepper')}
                                value={data?.turnextras?.pepper?.order || selectedRow?.pepper?.order || ''}
                                name='order'
                                onChangeText={(e) => handleChange(e, 'pepper', 'extras')}
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