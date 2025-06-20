import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {useLocalSearchParams, router} from "expo-router";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import LeftIcon from "@/assets/images/chevron-left.svg";
import Avatar from "@/assets/images/avatar.png";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import SgCard from "@/components/ui/Card/Card";
import ClockHistory from "@/assets/images/coins-stacked.svg";
import SgSectionProgressBar from "@/components/sections/ProgressBar/ProgressBar";


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

            <Text style={styles.headerTitle}>User profile</Text>
        </View>
    );
};

export default function TimeKeeperUserScreen() {
    const { userId } = useLocalSearchParams();
    const data = [
        { label: '1-2', value: 14, percentage: 90 },
        { label: '3-4', value: 9, percentage: 70 },
        { label: '5-6', value: 7, percentage: 50 },
        { label: '7-8', value: 11, percentage: 80 },
        { label: '9-10', value: 2, percentage: 20 },
    ];

    return (
        <SgTemplateScreenView
            head={<ScreenHeader />}
        >
            <View>
                <SgSectionUserInfo
                    rating={3.12}
                    name="Jane Doe"
                    role="Employee"
                    profileImage={Avatar}
                    color="dark"
                    size="md"
                />
            </View>
            <View style={{gap: 12}}>
                <SgCheckInOutGroup>
                    <SgSectionInfoCard
                        title="Active tasks"
                        count={32}
                        type="activeTasks"
                        href={`/chiefPages/users/${userId}/tasks/active`}
                    />
                    <SgSectionInfoCard
                        title="Completed tasks"
                        count={32}
                        type="completedTasks"
                        href={`/chiefPages/users/${userId}/tasks/completed`}
                    />
                </SgCheckInOutGroup>
                <SgCheckInOutGroup>
                    <SgSectionInfoCard
                        title="All Earned Points"
                        count={32}
                        type="earnedPoints"
                        href={null}
                    />
                    <SgSectionInfoCard
                        title="Average Earned Points"
                        count={32}
                        type="averageEarnedPoints"
                        href={null}
                    />
                </SgCheckInOutGroup>
            </View>
            <View>
                <SgSectionInfoCard
                    customIcon={ClockHistory}
                    title="Score range won"
                    count='673'
                    href={`/chiefPages/users/${userId}`}
                >
                    <View >
                        {data.map((item, index) => (
                            <SgSectionProgressBar
                                key={index}
                                label={item.label}
                                value={item.value}
                                percentage={item.percentage}
                            />
                        ))}
                    </View>
                </SgSectionInfoCard>
            </View>
            <View>
                <SgCard
                    title="Average Work Hours"
                    time="6h. 12m."
                />
            </View>
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