import {View, StyleSheet} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import SgFileCard from "@/components/sections/FileCard/FileCard";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useTranslation} from "react-i18next";

export default function ProjectItemScreen() {
    const [docList, setDocList] = useState([]);
    const {request} = useApi();
    const {storeData} = useData();
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();

    useFocusEffect(useCallback(() => {
      request({
            url: '/chief/doc/history',
            method: 'get',
        }).then().catch(err => {
            console.log(err);
        })
        return () => {
            console.log('Home tab lost focus');
        };
    }, [refreshKey]));

    useEffect(() => {
        setDocList(storeData?.cache?.[`GET:/chief/doc/history`]?.data)
    }, [storeData?.cache?.[`GET:/chief/doc/history`]])
    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('docsArchive')
            }} />}
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
