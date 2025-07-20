import {StyleSheet, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import SgCard from "@/components/ui/Card/Card";
import moment from "moment";
import {useApi} from "@/hooks/useApi";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";
import SgListUserItem from "@/components/ui/ListUserItem";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import COLORS from "@/constants/colors";

export default function ProjectItemScreen() {
    const {request} = useApi();
    const {storeData} = useData();
    const {projectId} = useLocalSearchParams();
    const [projectDetails, setProjectDetails] = useState({});
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();


    useFocusEffect(useCallback(() => {
        request({
            url: `/employee/project/item/${projectId}`, method: 'get',
        }).then().catch(err => {
            console.log(err);
        })
        return () => {
            console.log('Home tab lost focus');
        };
    }, [refreshKey, projectId]));


    useEffect(() => {
        setProjectDetails(storeData?.cache?.[`GET:/employee/project/item/${projectId}`]?.data)
    }, [storeData?.cache?.[`GET:/employee/project/item/${projectId}`]])

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('projectOverview'),
            }}/>}
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


            <View style={{gap: 16, marginTop: 32}}>
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
