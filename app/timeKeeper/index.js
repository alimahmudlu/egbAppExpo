import Avatar from "@/assets/images/avatar.png";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import { useAuth } from "@/hooks/useAuth";
import { StyleSheet } from "react-native";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import {useEffect, useState} from "react";
import moment from "moment";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";

export default function EmployeeDashboardScreen() {
    const { user } = useAuth();
    const { request } = useApi();
    const { storeData } = useData();
    const [employeeActivities, setEmployeeActivities] = useState([]);


    useEffect(() => {
        console.log(storeData?.cache?.['GET:/timekeeper/activity/list']?.data, 'aaaaaaaaa')
        setEmployeeActivities(storeData?.cache?.['GET:/timekeeper/activity/list']?.data)
    }, [storeData?.cache?.['GET:/timekeeper/activity/list']])

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
