import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import {useLocalSearchParams, router, Link} from "expo-router";
import LeftIcon from "@/assets/images/chevron-left.svg";
import SgCard from "@/components/ui/Card/Card";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import SgSectionProjectNameCard from "@/components/sections/ProjectNameCard/ProjectNameCard";
import {useAuth} from "@/hooks/useAuth";
import moment from "moment";
import ApiService from "@/services/ApiService";
import COLORS from "@/constants/colors";
import SgInput from "@/components/ui/Input/Input";
import SgSectionDatePicker from "@/components/sections/DatePicker/DatePicker";
import SgSectionTimePicker from "@/components/sections/TimePicker/TimePicker";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import SgSelect from "@/components/ui/Select/Select";
import SgRadio from "@/components/ui/Radio/Radio";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import Avatar from "@/assets/images/avatar.png";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import SgButton from "@/components/ui/Button/Button";

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
    const { accessToken } = useAuth();
    const [data, setData] = useState({});
    const [projectsList, setProjectsList] = useState([]);
    const [employeesList, setEmployeesList] = useState([]);

    function handleChange(e) {
        setData({ ...data, [e.name]: e.value });
    }

    useEffect(() => {
        ApiService.get('/chief/options/projects', {
            headers: {
                'authorization': accessToken || ''
            }
        }).then(res => {
            if (res.data.success) {
                setProjectsList(res?.data?.data);
            } else {
                // Handle error response
                console.log(res.data.message);
            }
        }).catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        if (data?.project?.id) {
            ApiService.get(`/chief/options/employees/${data?.project?.id}`, {
                headers: {
                    'authorization': accessToken || ''
                }
            }).then(res => {
                if (res.data.success) {
                    setEmployeesList(res?.data?.data);
                } else {
                    // Handle error response
                    console.log(res.data.message);
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }, [data?.project?.id]);

    function handleSubmit() {
        ApiService.post('/chief/task/create', data, {
            headers: {
                'authorization': accessToken || ''
            }
        }).then(res => {
            console.log(res, 'res');
        }).catch(err => {
            console.log(err, 'err');
        })
    }



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
                    onChangeText={handleChange}
                />
                <SgInput
                    label="Description"
                    placeholder="Enter description..."
                    type="textarea"
                    value={data?.description}
                    name='description'
                    onChangeText={handleChange}
                />
                <SgDatePicker
                    label="Deadline date"
                    placeholder="dd/mm/yyyy - hh/mm A"
                    value={data?.deadline}
                    name='deadline'
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
