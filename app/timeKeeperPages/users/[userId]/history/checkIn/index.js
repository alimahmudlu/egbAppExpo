import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {useLocalSearchParams, router} from "expo-router";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import LeftIcon from "@/assets/images/chevron-left.svg";
import Avatar from "@/assets/images/avatar.png";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";


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

    return (
        <SgTemplateScreenView
            head={<ScreenHeader />}
        >

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
    }
});