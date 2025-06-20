import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import {useLocalSearchParams, router, Link} from "expo-router";
import LeftIcon from "@/assets/images/chevron-left.svg";
import SgCard from "@/components/ui/Card/Card";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import moment from "moment";
import axios from "axios";
import {useAuth} from "@/hooks/useAuth";
import ApiService from "@/services/ApiService";

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

            <Text style={styles.headerTitle}>Project overview</Text>
        </View>
    );
};

export default function ProjectItemScreen() {
    const { projectId } = useLocalSearchParams();
    const { accessToken } = useAuth();
    const [projectDetails, setProjectDetails] = useState({});

    useEffect(() => {
        ApiService.get(`/employee/project/item/${projectId}`, {
            headers: {
                'authorization': accessToken || ''
            }
        }).then(res => {
            if (res.data.success) {
                setProjectDetails(res?.data?.data);
                console.log(res?.data?.data);
            } else {
                // Handle error response
                console.log(res.data.message);
            }
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <SgTemplateScreenView
            head={<ProjectHeader projectId={projectId} />}
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
