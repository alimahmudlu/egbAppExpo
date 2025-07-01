import {StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import {useLocalSearchParams} from "expo-router";
import SgCard from "@/components/ui/Card/Card";
import moment from "moment";
import {useApi} from "@/hooks/useApi";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useData} from "@/hooks/useData";

export default function ProjectItemScreen() {
    const { projectId } = useLocalSearchParams();
    const { request } = useApi();
    const {storeData} = useData();
    const [projectDetails, setProjectDetails] = useState({});

    useEffect(() => {
        request({
            url: `/chief/project/item/${projectId}`,
            method: 'get',
            cache: true
        }).then().catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        setProjectDetails(storeData?.cache?.[`GET:/chief/project/item/${projectId}`]?.data)
    }, [storeData?.cache?.[`GET:/chief/project/item/${projectId}`]])

    return (
        <SgTemplateScreenView
            head={<SgTemplatePageHeader data={{
                header: 'Project overview'
            }} />}
        >
            <SgCard
                contentTitle='Project name'
                contentDescription={projectDetails?.name}
            />
            <SgCard
                contentTitle='Location'
                contentDescription={projectDetails?.location || '-'}
            />
            <SgCard
                contentTitle='Timeline'
                contentDescription={`${moment(projectDetails?.start_date).format('DD-MM-YYYY')} - ${moment(projectDetails?.end_date).format('DD-MM-YYYY')}`}
            />
            <SgCard
                contentTitle='Optional notes'
                contentDescription={projectDetails?.optional_notes || '-'}
            />

        </SgTemplateScreenView>
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
        fontFamily: 'Inter',
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
