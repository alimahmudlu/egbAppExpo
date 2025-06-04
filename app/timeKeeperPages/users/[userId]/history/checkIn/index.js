import {View, Text, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {useLocalSearchParams, router} from "expo-router";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import LeftIcon from "@/assets/images/chevron-left.svg";
import SgListUserItem from "@/components/ui/ListUserItem";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import CheckIcon from "@/assets/images/check.svg";
import InfoCircleModalIcon from "@/assets/images/infoCircleModal.svg";
import SgCard from "@/components/ui/Card/Card";
import SgPopup from "@/components/ui/Modal/Modal";
import {useState} from "react";


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

            <Text style={styles.headerTitle}>Check in</Text>
        </View>
    );
};

export default function TimeKeeperUserScreen() {
    const { userId } = useLocalSearchParams();
    const employeeList = [
        { title: 'Jane Doe CI', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:12 AM', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { title: 'John Smith CI', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { title: 'Ali Veli CI', status: 0, reason: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum", role: 'Employee', date: new Date().toLocaleDateString(), time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { title: 'John Smith CO', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { title: 'Ali Veli CO', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { title: 'John Smith AW', status: 0, reason: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum", role: 'Employee', date: new Date().toLocaleDateString(), time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
        { title: 'Ali Veli AW', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
    ];
    const [rejectInfoModal, setRejectInfoModal] = useState(false);
    const [rejectInfoData, setRejectInfoData] = useState("");

    function toggleRejectInfoModal(selectedData = '') {
        setRejectInfoData(selectedData)
        setRejectInfoModal(!rejectInfoModal);
    }


    return (
        <SgTemplateScreenView
            head={<ScreenHeader />}
        >
            {employeeList?.map((emp, index) => (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} key={index}>
                    <SgListUserItem
                        key={index}
                        title={emp.title}
                        role={emp.role}
                        date={emp.date}
                        time={emp.time}
                        image={emp.image}
                    />
                    {emp.status === 1 ?
                        <Pressable
                            style={styles.acceptButton}
                        >
                            <Text style={styles.acceptButtonText}>
                                Accepted
                            </Text>
                            <CheckIcon width={8} height={8} />
                        </Pressable>
                        :
                        <Pressable
                            onPress={() => toggleRejectInfoModal(emp?.reason)}
                            style={styles.rejectButton}
                        >
                            <Text style={styles.rejectButtonText}>
                                Rejected
                            </Text>
                            <CheckIcon width={8} height={8} />
                        </Pressable>
                    }
                </View>
            ))}
            <SgPopup
                visible={rejectInfoModal}
                onClose={toggleRejectInfoModal}
                icon={<InfoCircleModalIcon width={56} height={56} />}
            >
                <Text style={styles.rejectModal}>Reject detail</Text>
                <SgCard><Text>{rejectInfoData}</Text></SgCard>
            </SgPopup>
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