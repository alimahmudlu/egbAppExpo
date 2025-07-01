import {StyleSheet} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import COLORS from "@/constants/colors";
import React, {useEffect, useState} from "react";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import moment from "moment/moment";
import {useApi} from "@/hooks/useApi";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useData} from "@/hooks/useData";

export default function TimeKeeperUserScreen() {
    const { userId } = useLocalSearchParams();
    const { request } = useApi();
    const [taskList, setTaskList] = useState([]);
    const {storeData} = useData();

    useEffect(() => {
        request({
            url: `/chief/task/list/${userId}`,
            method: 'get',
            params: {
                type: 'completed'
            }
        }).then().catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        setTaskList(storeData?.cache?.[`GET:/chief/task/list/${userId}`]?.data)
    }, [storeData?.cache?.[`GET:/chief/task/list/${userId}`]])
    
    return (
        <SgTemplateScreenView
            head={<SgTemplatePageHeader data={{
                header: 'Completed tasks'
            }} />}
        >
            {taskList?.map((el, index) => (
                <SgSectionTaskCard
                    id={el?.id}
                    projectId={el?.project_id}
                    key={index}
                    time={moment(el?.deadline).format('DD.MM.YYYY / h:mm A') || ''}
                    duration={el?.duration}
                    title={el?.name}
                    description={el?.description}
                    name={el?.assigned_employee?.full_name}
                    image={null}
                    status={el?.status}
                    href={`/chiefPages/projects/${el?.project_id}/${el?.id}`}
                />
            ))}
        </SgTemplateScreenView>
    )
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
    },
    acceptButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: COLORS.brand_50,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    acceptButtonText: {
        fontFamily: 'Inter',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 14,
        color: COLORS.brand_600,
    },
    rejectButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: COLORS.error_100,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    rejectButtonText: {
        fontFamily: 'Inter',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 14,
        color: COLORS.error_600,
    },
    rejectModal: {
        fontFamily: "Inter",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 30,
        marginBottom: 32,
        textAlign: "center",
    },
});