import {Text, View, TouchableOpacity, StyleSheet, ToastAndroid} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import {router} from "expo-router";
import LeftIcon from "@/assets/images/chevron-left.svg";
import COLORS from "@/constants/colors";
import SgInput from "@/components/ui/Input/Input";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import SgSelect from "@/components/ui/Select/Select";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import Avatar from "@/assets/images/avatar.png";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import SgButton from "@/components/ui/Button/Button";
import SgPopup from "@/components/ui/Modal/Modal";
import CompletedModalIcon from "@/assets/images/CompletedIcon.svg";
import {useApi} from "@/hooks/useApi";
import {globalValidate} from "@/utils/validate";
import validationConstraints from "@/app/chiefPages/create-task/constants"

// Custom header component with back button and overview button
const ProjectHeader = ({ projectId }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => router.back()}
            >
                <LeftIcon width={20} height={20} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Create task</Text>

        </View>
    );
};

export default function TaskCreateScreen() {
    const { request } = useApi();
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [projectsList, setProjectsList] = useState([]);
    const [employeesList, setEmployeesList] = useState([]);
    const [createTaskInfoModal, setCreateTaskInfoModal] = useState(false);

    function handleChange(e) {
        setErrors({ ...errors, [e.name]: '' });
        setData({ ...data, [e.name]: e.value });
    }

    useEffect(() => {
        request({
            url: `/chief/options/projects`,
            method: 'get',
        }).then(res => {
            if (res.success) {
                setProjectsList(res?.data);
            } else {
                // Handle error response
                console.log(res.message);
            }
        }).catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        if (data?.project?.id) {
            request({
                url: `/chief/options/employees/${data?.project?.id}`,
                method: 'get',
            }).then(res => {
                if (res.success) {
                    setEmployeesList(res?.data);
                } else {
                    // Handle error response
                    console.log(res.message);
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }, [data?.project?.id]);

    const validate = () => {
        const constraints = validationConstraints('chiefCreateTask', data);
        const { errors } = globalValidate(data, constraints);

        return errors || {};
    }

    function handleSubmit() {
        let errors = validate();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            ToastAndroid.show("error var", ToastAndroid.SHORT)
        }
        else {
            request({
                url: `/chief/task/create`,
                method: 'post',
                data: {
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
                console.log(err, 'err');
            })
        }
    }

    const toggleCreateTaskInfoModal = () => {
        if (createTaskInfoModal) {
            router.back();
        }
        setCreateTaskInfoModal(!createTaskInfoModal);
    };



    return (
        <SgTemplateScreenView
            head={<ProjectHeader />}
        >
            <Text style={{
                fontSize: 12,
                lineHeight: 18,
                color: COLORS.black,
                weight: '500',
            }}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
            </Text>

            <View style={{gap: 16}}>
                <SgSelect
                    label="Project"
                    placeholder="Enter project..."
                    modalTitle="Select project"
                    value={data?.project}
                    name='project'
                    isInvalid={errors?.project}
                    onChangeText={handleChange}
                    list={(projectsList || []).map((project, index) => (
                        {
                            id: project?.id,
                            name: project?.name,
                            render: <SgSectionProjectListItem
                                key={index}
                                title={project.name}
                                staffImages={project?.members?.map(() => "https://randomuser.me/api/portraits/men/1.jpg")}
                                id={project.id}
                            />
                        }
                    ))}
                />
                <SgSelect
                    label="Assign to"
                    placeholder="Select user..."
                    modalTitle="Select user"
                    value={data?.assigned_employee}
                    name='assigned_employee'
                    isInvalid={errors?.assigned_employee}
                    onChangeText={handleChange}
                    list={(employeesList || []).map((employee, index) => (
                        {
                            id: employee?.id,
                            name: employee?.full_name,
                            render: <SgSectionUserInfo
                                name={employee?.full_name}
                                role="Employee"
                                profileImage={Avatar}
                                color="dark"
                                size="md"
                            />
                        }
                    ))}
                />
                <SgInput
                    label="Title"
                    placeholder="Enter Title..."
                    type="text"
                    value={data?.title}
                    name='title'
                    isInvalid={errors?.title}
                    onChangeText={handleChange}
                />
                <SgInput
                    label="Description"
                    placeholder="Enter description..."
                    type="textarea"
                    value={data?.description}
                    name='description'
                    isInvalid={errors?.description}
                    onChangeText={handleChange}
                />
                <SgInput
                    label="Point"
                    placeholder="Enter Point..."
                    type="counter"
                    value={data?.point}
                    name='point'
                    isInvalid={errors?.point}
                    onChangeText={handleChange}
                />
                <SgDatePicker
                    label="Deadline date"
                    placeholder="dd/mm/yyyy - hh/mm A"
                    value={data?.deadline}
                    name='deadline'
                    isInvalid={errors?.deadline}
                    onChangeText={handleChange}
                />

                <SgButton
                    onPress={handleSubmit}
                    bgColor = {COLORS.primary}
                    color= {COLORS.white}
                >
                    Create task
                </SgButton>
            </View>


            <SgPopup
                visible={createTaskInfoModal}
                onClose={toggleCreateTaskInfoModal}
                fullScreen={true}
                title="Task completed"
                description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
                icon={<CompletedModalIcon width={202} height={168} />}
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
