import Avatar from "@/assets/images/avatar.png";
import SgSectionProjectListItem from "@/components/sections/ProjectListItem/ProjectListItem";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import SgCard from "@/components/ui/Card/Card";
import Clock from "@/assets/images/clock.svg";
import SgCheckInOutCard from "@/components/ui/CheckInOutCard/CheckInOutCard";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import { useAuth } from "@/hooks/useAuth";
import { StyleSheet, Text, View } from "react-native";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";

export default function EmployeeDashboardScreen() {
  const { user } = useAuth();
    const employeeList = [
        { title: 'Jane Doe CI', type: 'checkIn', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:12 AM', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { title: 'John Smith CI', type: 'checkIn', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { title: 'Ali Veli CI', type: 'checkIn', status: 0, reason: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum", role: 'Employee', date: new Date().toLocaleDateString(), time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { title: 'John Smith CI', type: 'checkIn', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { title: 'Ali Veli CO', type: 'checkOut', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { title: 'John Smith AW', type: 'checkOut', status: 0, reason: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum", role: 'Employee', date: new Date().toLocaleDateString(), time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
        { title: 'Ali Veli AW', type: 'checkOut', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
    ];

  return (
    <SgTemplateScreenView
      head={
        <SgTemplateHeader
          name="Jane Doe"
          role="Time Keeper"
          profileImage={Avatar}
        />
      }
    >
      <SgCheckInOutGroup>
        <SgSectionInfoCard
            icon="log-in-outline"
            title="Daily check in"
            count={32}
            type="checkin"
        />
        <SgSectionInfoCard
            icon="log-out-outline"
            title="Daily check out"
            count={12}
            type="checkout"
        />
      </SgCheckInOutGroup>

      <SgFilterTab
          defaultTabId='checkOut'
          onTabChange={(index) => console.log('Selected tab:', index)}
          tabs={[
            { label: 'Check in', id: 'checkIn', count: 120 },
            { label: 'Check out', id: 'checkOut', count: 0 },
            { label: 'At work', id: 'atWork', count: 15 },
          ]}
          tabContent={[
            {
              element: (
                  employeeList?.filter(el => el.type === 'checkIn').map((emp, index) => (
                      <SgSectionEmployeeCard
                          key={index}
                          title={emp.title}
                          role={emp.role}
                          time={emp.time}
                          image={emp.image}
                      />
                  ))
              ),
              id: 'checkIn'
            },
            {
              element: (
                  employeeList?.filter(el => el.type === 'checkOut').map((emp, index) => (
                      <SgSectionEmployeeCard
                          key={index}
                          title={emp.title}
                          role={emp.role}
                          time={emp.time}
                          image={emp.image}
                      />
                  ))
              ),
              id: 'checkOut'
            },
            {
              element: (
                  employeeList?.filter(el => el.type === 'atWork').map((emp, index) => (
                      <SgSectionEmployeeCard
                          key={index}
                          title={emp.title}
                          role={emp.role}
                          time={emp.time}
                          image={emp.image}
                      />
                  ))
              ),
              id: 'atWork'
            },
          ]}
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
