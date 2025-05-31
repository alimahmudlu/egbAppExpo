import Avatar from "@/assets/images/avatar.png";
import Clock from "@/assets/images/clock.svg";
import { SgSectionStaff } from "@/components/sections/ProjectList/ProjectList";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import SgCard from "@/components/ui/Card/Card";
import SgCheckInOutCard from "@/components/ui/CheckInOutCard/CheckInOutCard";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import { useAuth } from "@/hooks/useAuth";
import { StyleSheet, Text } from "react-native";

export default function employeeDashboard() {
  const { user } = useAuth();
  const staffImages = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
    "https://randomuser.me/api/portraits/women/6.jpg",
    "https://randomuser.me/api/portraits/women/6.jpg",
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
      <SgCheckInOutGroup>
        <SgCheckInOutCard
          type="checkin"
          title="Check In"
          time=""
          buttonLabel="Check in"
          status={0} // 0: not checked in, 1: waiting, 2: checked in
        />
        <SgCheckInOutCard type="checkout" title="Check Out" />
      </SgCheckInOutGroup>
      <SgCard title="Work Time" time="18:30 AM" icon={Clock} />

      <SgCard>
        <Text style={styles.title}>Added Projects</Text>
      </SgCard>

      <SgSectionStaff
        title="Unde omnis iste natus error sit"
        staffImages={staffImages}
      />
    </SgTemplateScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Inter",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 20,
  },
});
