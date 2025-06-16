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
import {useEffect, useState} from "react";
import ApiService from "@/services/ApiService";
import moment from "moment";

export default function EmployeeDashboardScreen() {
    const { user, accessToken } = useAuth();
    const employeeList = [
        { title: 'Jane Doe CI', type: 'checkIn', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:12 AM', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { title: 'John Smith CI', type: 'checkIn', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { title: 'Ali Veli CI', type: 'checkIn', status: 0, reason: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum", role: 'Employee', date: new Date().toLocaleDateString(), time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { title: 'John Smith CI', type: 'checkIn', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { title: 'Ali Veli CO', type: 'checkOut', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { title: 'John Smith AW', type: 'checkOut', status: 0, reason: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum", role: 'Employee', date: new Date().toLocaleDateString(), time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
        { title: 'Ali Veli AW', type: 'checkOut', status: 1,  role: 'Employee', date: new Date().toLocaleDateString(), time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
    ];
    const [employeeActivities, setEmployeeActivities] = useState([]);

    useEffect(() => {
        ApiService.get('/timekeeper/activity/list', {
            headers: {
                'authorization': accessToken || ''
            }
        }).then(res => {
            setEmployeeActivities(res?.data?.data || []);
        }).catch(err => {
            console.log(err, 'apiservice control err')
        });
    }, []);

  return (
    <SgTemplateScreenView
      head={
        <SgTemplateHeader
        name={user?.full_name}
        role={user?.role?.name}
          profileImage={Avatar}
        />
      }
    >
      <SgCheckInOutGroup>
        <SgSectionInfoCard
            icon="log-in-outline"
            title="Daily check in"
            count={employeeActivities?.filter(el => el.type === 1)?.length}
            type="checkin"
        />
        <SgSectionInfoCard
            icon="log-out-outline"
            title="Daily check out"
            count={employeeActivities?.filter(el => el.type === 2)?.length}
            type="checkout"
        />
      </SgCheckInOutGroup>

      <SgFilterTab
          defaultTabId='checkIn'
          onTabChange={(index) => console.log('Selected tab:', index)}
          tabs={[
            { label: 'Check in', id: 'checkIn', count: employeeActivities?.filter(el => el.type === 1 && el.status === 0)?.length },
            { label: 'Check out', id: 'checkOut', count: employeeActivities?.filter(el => el.type === 2 && el.status === 0)?.length },
            { label: 'At work', id: 'atWork', count: employeeActivities?.filter(el => el.type === 1 && el.status === 1)?.length },
          ]}
          tabContent={[
            {
              element: (
                  employeeActivities?.filter(el => el.type === 1 && el.status === 0).map((emp, index) => (
                      <SgSectionEmployeeCard
                          key={index}
                          fullData={emp}
                          title={emp?.employee?.full_name}
                          role={emp?.employee?.role?.name}
                          time={moment(emp.time).format('MM-DD-YYYY HH:mm')}
                          image={emp?.employee?.image}
                      />
                  ))
              ),
              id: 'checkIn'
            },
            {
              element: (
                  employeeActivities?.filter(el => el.type === 2 && el.status === 0).map((emp, index) => (
                      <SgSectionEmployeeCard
                          key={index}
                          fullData={emp}
                          title={emp?.employee?.full_name}
                          role={emp?.employee?.role?.name}
                          time={moment(emp.time).format('MM-DD-YYYY HH:mm')}
                          image={emp?.employee?.image}
                      />
                  ))
              ),
              id: 'checkOut'
            },
            {
              element: (
                  employeeActivities?.filter(el => el.type === 1 && el.status === 1).map((emp, index) => (
                      <SgSectionEmployeeCard
                          key={index}
                          fullData={emp}
                          title={emp?.employee?.full_name}
                          role={emp?.employee?.role?.name}
                          time={moment(emp.time).format('MM-DD-YYYY HH:mm')}
                          image={emp?.employee?.image}
                          editable={false}
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
