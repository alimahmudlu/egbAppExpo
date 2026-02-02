import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
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
    const {t} = useTranslation();
    const [filterModal, setFilterModal] = useState(false)
    const [filters, setFilters] = useState({})

    function toggleFilterModal() {
        setFilterModal(!filterModal);
    }

    function resetFilters() {
        setFilters({});
        request({
            url: '/employee/doc/history',
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
            url: '/employee/doc/history',
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
            url: '/employee/doc/history', method: 'get',
        }).then().catch(err => {
            // console.log(err);
        })
        return () => {
            console.log('Home tab lost focus');
        };
    }, [refreshKey]));

    useEffect(() => {
        setDocList(storeData?.cache?.[`GET:/employee/doc/history`]?.data)
    }, [storeData?.cache?.[`GET:/employee/doc/history`]])
    return (
        <SgTemplateScreen
            head={
                <SgTemplatePageHeader
                    data={{ header: t('docsArchive') }}
                    filter={
                        <TouchableOpacity style={styles.iconWrapper} onPress={toggleFilterModal} activeOpacity={0.7}>
                            <FilterIcon width={20} height={20} color={COLORS.brand_950} fill={COLORS.brand_950} />
                        </TouchableOpacity>
                    }
                />
            }
        >
            <View style={styles.listContainer}>
                {(docList || []).length > 0 ? (
                    (docList || []).map((el, index) => (
                        <SgFileCard
                            key={index}
                            fileType={el.mimetype}
                            title={el?.filename}
                            url={el?.filepath}
                            expiryDate={el?.date_of_expiry}
                            issueDate={el?.date_of_issue}
                            migrationId={el?.type}
                        />
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>{t('noDocuments')}</Text>
                    </View>
                )}
            </View>

            <SgPopup
                visible={filterModal}
                onClose={toggleFilterModal}
                title={t('filters')}
                footerButton={
                    <SgButton
                        onPress={handleFilters}
                        bgColor={COLORS.brand_950}
                        color={COLORS.white}
                    >
                        {t('accept')}
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
                            <Text style={styles.clearFiltersText}>{t('clearFilters')}</Text>
                            <ReloadArrow width={16} height={16} color={COLORS.brand_700} fill={COLORS.brand_700} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.filterFields}>
                        <View style={styles.filterField}>
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
                                        name: t('Yes'),
                                        render: <Text>{t('Yes')}</Text>
                                    },
                                    {
                                        id: 2,
                                        name: t('No'),
                                        render: <Text>{t('No')}</Text>
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
        padding: 12,
        borderRadius: 12,
    },
    listContainer: {
        gap: 12,
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
        textAlign: 'center',
        color: COLORS.gray_500,
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
