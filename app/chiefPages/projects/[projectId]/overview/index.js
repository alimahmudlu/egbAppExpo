import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useLocalSearchParams} from "expo-router";
import SgCard from "@/components/ui/Card/Card";
import moment from "moment";
import {useApi} from "@/hooks/useApi";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";
import COLORS from "@/constants/colors";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";

export default function ProjectItemScreen() {
    const { projectId } = useLocalSearchParams();
    const { request } = useApi();
    const {storeData} = useData();
    const [projectDetails, setProjectDetails] = useState({});
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();

    useEffect(() => {
        request({
            url: `/chief/project/item/${projectId}`,
            method: 'get',
            cache: true
        }).then().catch(err => {
            // console.log(err);
        })
    }, [projectId, refreshKey]);

    useEffect(() => {
        setProjectDetails(storeData?.cache?.[`GET:/chief/project/item/${projectId}`]?.data)
    }, [storeData?.cache?.[`GET:/chief/project/item/${projectId}`]])

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('projectOverview'),
            }} />}
        >
            <SgCard
                contentTitle={t('projectName')}
                contentDescription={projectDetails?.name}
            />
            <SgCard
                contentTitle={t('location')}
                contentDescription={projectDetails?.location || '-'}
            />
            <SgCard
                contentTitle={t('timeline')}
                contentDescription={`${moment(projectDetails?.start_date).format('DD-MM-YYYY')} - ${moment(projectDetails?.end_date).format('DD-MM-YYYY')}`}
            />
            <SgCard
                contentTitle={t('optionalNotes')}
                contentDescription={projectDetails?.optional_notes || '-'}
            />


            {(projectDetails?.members || []) ?
                <View style={{gap: 16, marginTop: 32}}>
                    <SgCard>
                        <Text style={styles.title}>{t('projectMembers')}</Text>
                    </SgCard>
                    <View style={{gap: 16}}>
                        {(projectDetails?.members || []).map((el, index) => {
                            return (
                                <View style={{borderBottomWidth: (projectDetails?.members || []).length - 1 > index ? 1 : 0, borderBottomColor: COLORS.gray_200, paddingBottom: 16}} key={index}>
                                    <SgSectionUserInfo
                                        key={index}
                                        name={el?.full_name || ''}
                                        position={el?.position}
                                        role={el?.role?.name || ''}
                                        profileImage={''}
                                        color="dark"
                                        size="md"

                                    />
                                </View>
                            )
                        })}
                    </View>
                </View>
                : null
            }

        </SgTemplateScreen>
    );
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
