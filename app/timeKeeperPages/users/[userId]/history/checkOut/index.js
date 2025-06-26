import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useLocalSearchParams, router} from "expo-router";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import LeftIcon from "@/assets/images/chevron-left.svg";
import COLORS from "@/constants/colors";
import {useEffect, useState} from "react";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import moment from "moment";
import {useApi} from "@/hooks/useApi";


// Custom header component with back button and overview button
const ScreenHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <LeftIcon width={20} height={20} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Check Out</Text>
        </View>
    );
};

export default function TimeKeeperUserScreen() {
    const { request } = useApi();
    const { userId } = useLocalSearchParams();
    const [employeeActivities, setEmployeeActivities] = useState([]);

    useEffect(() => {
        request({
            url: `/timekeeper/employee/history/${userId}/checkout`,
            method: 'get',
        }).then(res => {
            setEmployeeActivities(res?.data || []);
        }).catch(err => {
            console.log(err, 'apiservice control err')
        });
    }, []);

    return (
        <SgTemplateScreenView
            head={<ScreenHeader />}
        >
            {employeeActivities?.map((emp, index) => (
                <SgSectionEmployeeCard
                    key={index}
                    fullData={emp}
                    title={emp?.employee?.full_name}
                    role={emp?.employee?.role?.name}
                    time={moment(emp.request_time).format('MM-DD-YYYY HH:mm')}
                    image={emp?.employee?.image}
                    editable={false}
                    status={emp.status}
                    reason={emp.reject_reason}
                />
                // <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} key={index}>
                //     <SgListUserItem
                //         key={index}
                //         title={emp.title}
                //         role={emp.role}
                //         date={emp.date}
                //         time={emp.request_time}
                //         image={emp.image}
                //     />
                //     {emp.status === 1 ?
                //         <Pressable
                //             style={styles.acceptButton}
                //         >
                //             <Text style={styles.acceptButtonText}>
                //                 Accepted
                //             </Text>
                //             <CheckIcon width={8} height={8} />
                //         </Pressable>
                //         :
                //         <Pressable
                //             onPress={() => toggleRejectInfoModal(emp?.reason)}
                //             style={styles.rejectButton}
                //         >
                //             <Text style={styles.rejectButtonText}>
                //                 Rejected
                //             </Text>
                //             <CheckIcon width={8} height={8} />
                //         </Pressable>
                //     }
                // </View>
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