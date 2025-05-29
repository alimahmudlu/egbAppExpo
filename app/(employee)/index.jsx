import { StyleSheet, Text, View } from "react-native";
import SgTemplateHeader from "../../components/templates/Header/Header";
import Avatar from "../../assets/images/avatar.png";
import SgCheckInOutGroup from "../../components/ui/CheckInOutGroup/CheckInOutGroup";
import SgCard from "../../components/ui/Card/Card";
import Clock from "../../assets/images/clock.svg"; 
import { SgSectionStaff } from "../../components/sections/Staff/Staff";

export default function Home() {
    const staffImages = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/women/4.jpg',
    'https://randomuser.me/api/portraits/men/5.jpg',
    'https://randomuser.me/api/portraits/women/6.jpg',
    'https://randomuser.me/api/portraits/women/6.jpg',
  ];
    return (
        <View style={styles.container}>
            <SgTemplateHeader
                name="Jane Doe"
                role="Employee"
                rating="3.12"
                profileImage={Avatar}
            />
            <SgCheckInOutGroup />
            <SgCard 
                title="Work Time"
                time="18:30 AM"
                icon={Clock}
            />

            <SgCard>
                <Text style={styles.title}>Added Projects</Text>
            </SgCard>

            <SgSectionStaff 
                title="Unde omnis iste natus error sit"
                staffImages={staffImages}
            />
                
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 20,
    }
});
