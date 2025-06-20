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

    function handleChange() {
        // Handle input change logic here
        // For example, you can update the state with the new value
        // setData({ ...data, title: newValue });
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

            <View>
                <SgInput
                    label="Title"
                    placeholder="Enter Title..."
                    type="text"
                    value={data?.title}
                    onChangeText={handleChange}
                />
                <SgInput
                    label="Description"
                    placeholder="Enter description..."
                    type="textarea"
                    value={data?.description}
                    onChangeText={handleChange}
                />
                <SgInput
                    label="Deadline"
                    placeholder="Enter deadline..."
                    type="textarea"
                    value={data?.description}
                    onChangeText={handleChange}
                />
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
