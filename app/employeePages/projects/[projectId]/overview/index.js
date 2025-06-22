import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import {useLocalSearchParams, router} from "expo-router";
import LeftIcon from "@/assets/images/chevron-left.svg";
import SgCard from "@/components/ui/Card/Card";
import moment from "moment";
import {useApi} from "@/hooks/useApi";

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
    const { request } = useApi();
    const { projectId } = useLocalSearchParams();
    const [projectDetails, setProjectDetails] = useState({});

    useEffect(() => {
        request({
            url: `/employee/project/item/${projectId}`,
            method: 'get',
        }).then(res => {
            if (res.success) {
                setProjectDetails(res?.data);
            } else {
                // Handle error response
                console.log(res.message);
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
