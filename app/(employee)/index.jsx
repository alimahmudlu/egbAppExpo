import SgSectionTaskCard from "@/components/sections/TaskCard/TaskCard"
import SgFileCard from "@/components/sections/FileCard/FileCard";
import { StyleSheet, Text, View } from "react-native";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import SgCard from "@/components/ui/Card/Card";
import Clock from "@/assets/images/clock.svg";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgNoticeCard from "@/components/ui/NoticeCard/NoticeCard";
import LoginIcon from "@/assets/images/login.svg";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import SgCheckInOutCard from "@/components/ui/CheckInOutCard/CheckInOutCard";
import Avatar from "@/assets/images/avatar.png";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import CalendarPicker from "@/components/sections/DatePicker/DatePicker";

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
        <SgTemplateScreenView
            head={
                <SgTemplateHeader
                    name="Jane Doe"
                    role="Employee"
                    rating="3.12"
                    profileImage={Avatar}
                />
            }
        >




            {/* <View style={styles.container}>
                <SgTemplateHeader
                    name="Jane Doe"
                    role="Employee"
                    rating="3.12"
                    profileImage={Avatar}
                />
                <SgCheckInOutGroup>
                    <SgCheckInOutCard
                        type="checkin"
                        title="Check In"
                        time="12.04.2025 / 10:20 AM"
                        buttonLabel="Check in"
                        status={0}
                    />
                    <SgCheckInOutCard
                        type="checkout"
                        title="Check Out"
                        time="12.04.2025 / 10:20 AM"
                        buttonLabel="Check out"
                        status={1}
                    />
                </SgCheckInOutGroup>
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
                    bgColor="gray"
                >
                    <Text style={styles.title}>Added Projects</Text>
                </SgCard>

                <SgSectionProjectListItem
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

                <SgSectionFileHead
                    title="My Docs"
                    description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
                    icon="filter"
                />
                <SgNoticeCard
                    icon={<LoginIcon width={20} height={20} />}
                    title="Check in rejected"
                    buttonText="Reject detail"
                    bgCard="danger"
                    bgButton="danger"
                />

                <SgNoticeCard
                    title="Active Docs"
                    buttonText="Add doc +"
                    bgButton="success"
                />

                <SgSectionUserInfo
                    name="Jane Doe"
                    role="Employee"
                    rating="3.12"
                    profileImage={Avatar}
                    roleColor="gray"
                    color="dark"
                    size="md"
                />

            </View> */}

            
        </SgTemplateScreenView>
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
