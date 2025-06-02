import SgTemplateHeader from "@/components/templates/Header/Header";
import { StyleSheet, View } from "react-native";
import Avatar from "@/assets/images/avatar.png";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import SgCheckInOutCard from "@/components/ui/CheckInOutCard/CheckInOutCard";
import { useState } from "react";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";

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
                icon="log-in-outline"
                title="Daily check in"
                count={32}
                type="checkin"
            />
            <View style={{ width: 16 }} />
            <SgSectionInfoCard
                icon="log-out-outline"
                title="Daily check out"
                count={12}
                type="checkout"
            />
        </SgCheckInOutGroup>
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
    