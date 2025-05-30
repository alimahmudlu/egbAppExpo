import { StyleSheet, Text, View } from "react-native";
import SgTemplateHeader from "../../components/templates/Header/Header";
import Avatar from "../../assets/images/avatar.png";
import SgCheckInOutGroup from "../../components/ui/CheckInOutGroup/CheckInOutGroup";
import SgCard from "../../components/ui/Card/Card";
import Clock from "../../assets/images/clock.svg"; 
import { SgSectionStaff } from "../../components/sections/Staff/Staff";
import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard";
import SgFileCard from "@/components/sections/FileCard/FileCard";

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
                bgColor="gray"
            />

            <SgCard
                title="Added Projects"
                contentTitle="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages"
                contentDescription="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages"
                icon={null}
                time="12.04.2025 / 10:20 AM"
                children={<SgFileCard />}
                bgColor="gray"
            >
                <Text style={styles.title}>Added Projects</Text>
            </SgCard>

            <SgSectionStaff 
                title="Unde omnis iste natus error sit"
                staffImages={staffImages}
            />

            <SgSectionTaskCard
                time="12.04.2025 / 10:20 AM"
                duration="2h. 42m."
                title="There are many variations of passages of Lorem Ipsum available but the"
                description="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages"
                name="Jane Doe"
                image={null}
                status="Complete"
                statusType="success"
            />
            <SgSectionTaskCard
                time="12.04.2025 / 10:20 AM"
                duration="2h. 42m."
                title="There are many variations of passages of Lorem Ipsum available but the"
                description="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages"
                name="Jane Doe"
                image={null}
                status="Check progress"
                statusType="warning"
            />

            <SgFileCard
                fileType="xlsx"
                title="Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
                description=""
                date="10.05.2025"
                migrationId="Migration id"
                statusText="Expired"
                statusType="danger"
            />

            <SgCard 
                contentTitle="Sed ut perspic"
                contentDescription="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form variations of passages"
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
