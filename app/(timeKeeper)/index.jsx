import Avatar from "@/assets/images/avatar.png";
import CheckIn from "@/assets/images/check-in.svg";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";
import SgSectionProjectNameCard from "@/components/sections/ProjectNameCard/ProjectNameCard";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import { StyleSheet, View } from "react-native";

export default function Home () {
    const employeeList = [
    { title: 'Jane Doe', role: 'Employee', time: '7:12 AM', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { title: 'John Smith', role: 'Employee', time: '7:14 AM', image: '' },
    { title: 'Ali Veli', role: 'Employee', time: '7:20 AM', image: '' },
  ];

    return(
    <View style={styles.container}>
        <SgTemplateHeader
            name="Jane Doe"
            role="Time Keeper"
            profileImage={Avatar}
        />
        <SgCheckInOutGroup>
            <SgSectionInfoCard
                title="Daily check in"
                count={32}
                type="checkin"
            />
            <SgSectionInfoCard
                title="Daily check out"
                count={12}
                type="checkout"
            />
        </SgCheckInOutGroup>
        <SgSectionInfoCard
                title="Daily check in"
                count={32}
                customIcon={CheckIn}
            />
        <SgFilterTab
            defaultTabIndex={0}
            onTabChange={(index) => console.log('Selected tab:', index)}
            tabs={[
                { label: 'Check in', count: 120 },
                { label: 'Check out', count: 0 },
                { label: 'At work', count: 15 },
            ]}
        />


        {employeeList.map((emp, index) => (
        <SgSectionEmployeeCard
          key={index}
          title={emp.title}
          role={emp.role}
          time={emp.time}
          image={emp.image}
        />
      ))}

      {/* <SgSectionProjectNameCard
        title="Project name"
        description="There are many variations of passages of Lorem Ipsum available"
      /> */}
    </View>
    )}

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
    