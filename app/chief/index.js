import Avatar from "@/assets/images/avatar.png";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import {useAuth} from "@/hooks/useAuth";
import {StyleSheet, View} from "react-native";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import SgNoticeCard from "@/components/ui/NoticeCard/NoticeCard";
import React, {useCallback, useEffect, useState} from "react";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import moment from "moment";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import {useTranslation} from "react-i18next";

export default function EmployeeDashboardScreen() {
    const {user} = useAuth();
    const {storeData} = useData();
    const {request} = useApi();
    const [taskList, setTaskList] = useState([]);
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();

    useFocusEffect(useCallback(() => {
        request({
            url: `/chief/task/list`, method: 'get'
        }).then().catch(err => {
            console.log(err);
        })
        return () => {
            console.log('Home tab lost focus');
        };
    }, [refreshKey]));

    useEffect(() => {
        setTaskList(storeData?.cache?.[`GET:/chief/task/list`]?.data)
    }, [storeData?.cache?.[`GET:/chief/task/list`]])


    return (<SgTemplateScreen
            head={<SgTemplateHeader
                name={user?.full_name}
                role={user?.role?.name}
                profileImage={''}
            />}
        >
            <SgCheckInOutGroup>
                <SgSectionInfoCard
                    icon="log-in-outline"
                    title={t('activeTasks')}
                    count={taskList?.length - taskList?.filter(el => el?.status?.id === 5)?.length}
                    type="activeTasks"
                />
                <SgSectionInfoCard
                    icon="log-out-outline"
                    title={t('completedTasks')}
                    count={taskList?.filter(el => el?.status?.id === 5)?.length}
                    type="completedTasks"
                />
            </SgCheckInOutGroup>

            <SgNoticeCard
                title={t('activeTasks')}
                buttonText={t('addTask')}
                bgButton="success"
                href="/chiefPages/create-task"
            />

            <SgFilterTab
                defaultTabId='all'
                tabs={[{label: t('allTasks'), id: 'all', count: taskList?.length}, {
                    label: t('check'), id: 'check', count: taskList?.filter(el => [3, 4].includes(el?.status?.id))?.length
                }, {label: t('complete'), id: 'complete', count: taskList?.filter(el => el?.status?.id === 5)?.length},]}
                tabContent={[{
                    element: (<View style={{gap: 16}}>
                            {taskList?.map((el, index) => (<SgSectionTaskCard
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
                                />))}
                        </View>), id: 'all'
                }, {
                    element: (<View style={{gap: 16}}>
                            {taskList?.filter(el => [3, 4].includes(el?.status?.id))?.map((el, index) => (
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
                                />))}
                        </View>), id: 'check'
                }, {
                    element: (<View style={{gap: 16}}>
                            {taskList?.filter(el => el?.status?.id === 5)?.map((el, index) => (<SgSectionTaskCard
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
                                />))}
                        </View>), id: 'complete'
                }]}
            />
        </SgTemplateScreen>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff",
    }, title: {
        fontFamily: "Inter", fontSize: 16, fontStyle: "normal", fontWeight: "600", lineHeight: 20,
    },
});
