import {View, StyleSheet, Text, Pressable} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import SgFileCard from "@/components/sections/FileCard/FileCard";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";
import SgPopup from "@/components/ui/Modal/Modal";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import ReloadArrow from "@/assets/images/reload-arrows.svg";
import SgSelect from "@/components/ui/Select/Select";
import FilterIcon from "@/assets/images/filter.svg";

export default function ProjectItemScreen() {
    const [docList, setDocList] = useState([]);
    const {request} = useApi();
    const {storeData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation()
    const [filterModal, setFilterModal] = useState(false)
    const [filters, setFilters] = useState({})

    function toggleFilterModal() {
        setFilterModal(!filterModal);
    }

    function resetFilters() {
        setFilters({});
        request({
            url: '/timekeeper/doc/history',
            method: 'get',
        }).then().catch(err => {
            // console.log(err);
        })
        toggleFilterModal()
    }

    function handleChange(e) {
        setFilters({...filters, [e.name]: e.value});
    }

    function handleFilters() {
        request({
            url: '/timekeeper/doc/history',
            method: 'get',
            params: {
                replaced: filters?.replaced?.id
            }
        }).then().catch(err => {
            // console.log(err);
        })
    }

    useFocusEffect(useCallback(() => {
        request({
            url: '/timekeeper/doc/history',
            method: 'get',
        }).then().catch(err => {
            console.log(err);
        })
        return () => {
            console.log('Home tab lost focus');
        };
    }, [refreshKey]));

    useEffect(() => {
        setDocList(storeData?.cache?.[`GET:/timekeeper/doc/history`]?.data)
    }, [storeData?.cache?.[`GET:/timekeeper/doc/history`]])
    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('docsArchive')
            }}
            filter={
                <Pressable style={styles.iconWrapper} onPress={toggleFilterModal}>
                    <Text><FilterIcon width={20} height={20} /></Text>
                </Pressable>
            }
            />}
        >
            <View style={{gap: 12}}>
                {(docList || []).map((el, index) => (
                    <SgFileCard
                        key={index}
                        fileType={el.mimetype}
                        title={el?.filename}
                        url={el?.filepath}
                        expiryDate={el?.date_of_expiry}
                        issueDate={el?.date_of_issue}
                        migrationId={el?.type}
                    />
                ))}
            </View>

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
                            <SgSelect
                                label={t("Replaced")}
                                placeholder={t("enterReplaced")}
                                modalTitle={t("selectReplaced")}
                                value={filters?.replaced}
                                name='replaced'
                                onChangeText={handleChange}
                                list={[
                                    {
                                        id: 1,
                                        name: t('Yes')
                                    },
                                    {
                                        id: 2,
                                        name: t('No')
                                    }
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
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand_50,
        padding: 14,
        borderRadius: 50,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    overviewButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    overviewButtonText: {
        color: '#000000',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
        fontSize: 16,
        // lineHeight: '24px',
    },
    container: {
        flex: 1,
    },
    contentText: {
        fontSize: 16,
    }
});
