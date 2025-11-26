import {Text, View, StyleSheet, ToastAndroid} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {router, useFocusEffect, useLocalSearchParams} from "expo-router";
import COLORS from "@/constants/colors";
import SgInput from "@/components/ui/Input/Input";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import SgSelect from "@/components/ui/Select/Select";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import SgButton from "@/components/ui/Button/Button";
import SgPopup from "@/components/ui/Modal/Modal";
import CompletedModalIcon from "@/assets/images/CompletedIcon.svg";
import {useApi} from "@/hooks/useApi";
import {validate} from "@/utils/validate";
import validationConstraints from "@/app/chiefPages/create-task/constants"
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useTranslation} from "react-i18next";

export default function TaskCreateScreen() {
    const {request} = useApi();
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [projectsList, setProjectsList] = useState([]);
    const [employeesList, setEmployeesList] = useState([]);
    const [createTaskInfoModal, setCreateTaskInfoModal] = useState(false);
    const {refreshKey} = useLocalSearchParams();
    const {t} = useTranslation();

    function handleChange(e) {
        setErrors({...errors, [e.name]: ''});
        setData({...data, [e.name]: e.value});
    }

    useFocusEffect(useCallback(() => {
        request({
            url: `/chief/options/projects`, method: 'get',
        }).then(res => {
            if (res.success) {
                setProjectsList(res?.data);
            } else {
                // Handle error response
                // console.log(res.message);
            }
        }).catch(err => {
            // console.log(err);
        })
        return () => {};
    }, [refreshKey]));

    useEffect(() => {
        if (data?.project?.id) {
            request({
                url: `/chief/options/employees/${data?.project?.id}`, method: 'get',
            }).then(res => {
                if (res.success) {
                    setEmployeesList(res?.data);
                } else {
                    // Handle error response
                    // console.log(res.message);
                }
            }).catch(err => {
                // console.log(err);
            })
        }
    }, [data?.project?.id]);

    // const validate = () => {
    //     const constraints = validationConstraints('chiefCreateTask', data);
    //     const {errors} = globalValidate(data, constraints);
    //
    //     return errors || {};
    // }

    function handleSubmit() {
        let errors = validate(data, 'chiefCreateTask', validationConstraints);

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            ToastAndroid.show("error var", ToastAndroid.SHORT)
        } else {
            request({
                url: `/chief/task/create`, method: 'post', data: {
                    title: data?.title,
                    deadline: data?.deadline,
                    point: data?.point,
                    description: data?.description,
                    assigned_employee_id: data?.assigned_employee?.id,
                    project_id: data?.project?.id,
                }
            }).then(res => {
                toggleCreateTaskInfoModal()
            }).catch(err => {
                // console.log(err, 'err');
            })
        }
    }

    const toggleCreateTaskInfoModal = () => {
        if (createTaskInfoModal) {
            router.back();
        }
        setCreateTaskInfoModal(!createTaskInfoModal);
    };


    return (<SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: t('createTask'),
            }}/>}
        >
            <Text style={{
                fontSize: 12, lineHeight: 18, color: COLORS.black, weight: '500',
            }}>
                {t('createTask__description')}
            </Text>

            <View style={{gap: 16}}>
                <SgSelect
                    label={t("project")}
                    placeholder={t("enterProject")}
                    modalTitle={t("selectProject")}
                    value={data?.project}
                    name='project'
                    isInvalid={errors?.project}
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
                <SgSelect
                    label={t("assignTo")}
                    placeholder={t("selectUser")}
                    modalTitle={t('selectUser')}
                    value={data?.assigned_employee}
                    name='assigned_employee'
                    isInvalid={errors?.assigned_employee}
                    onChangeText={handleChange}
                    list={(employeesList || []).map((employee, index) => ({
                            id: employee?.id, name: employee?.full_name, render: <SgSectionUserInfo
                                name={employee?.full_name}
                                role="Employee"
                                position={employee?.position}
                                profileImage={''}
                                color="dark"
                                size="md"
                            />
                        }))}
                />
                <SgInput
                    label={t("title")}
                    placeholder={t("enterTitle")}
                    type="text"
                    value={data?.title}
                    name='title'
                    isInvalid={errors?.title}
                    onChangeText={handleChange}
                />
                <SgInput
                    label={t("description")}
                    placeholder={t("enterDescription")}
                    type="textarea"
                    value={data?.description}
                    name='description'
                    isInvalid={errors?.description}
                    onChangeText={handleChange}
                />
                <SgInput
                    label={t('point')}
                    placeholder={t('enterPoint')}
                    type="counter"
                    value={data?.point}
                    name='point'
                    isInvalid={errors?.point}
                    onChangeText={handleChange}
                />
                <SgDatePicker
                    label={t('deadlineDate')}
                    placeholder="dd/mm/yyyy - HH/mm"
                    value={data?.deadline}
                    name='deadline'
                    isInvalid={errors?.deadline}
                    onChangeText={handleChange}
                />

                <SgButton
                    onPress={handleSubmit}
                    bgColor={COLORS.primary}
                    color={COLORS.white}
                >
                    {t('createTask')}
                </SgButton>
            </View>


            <SgPopup
                visible={createTaskInfoModal}
                onClose={toggleCreateTaskInfoModal}
                fullScreen={true}
                title={t("taskCreated")}
                description={t("taskCreated__description")}
                icon={<CompletedModalIcon width={202} height={168}/>}
            />
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
