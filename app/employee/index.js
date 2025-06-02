import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import Avatar from "@/assets/images/avatar.png";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import SgCard from "@/components/ui/Card/Card";
import Clock from "@/assets/images/clock.svg";
import {SgSectionProjectListItem, SgSectionStaff} from "@/components/sections/ProjectListItem/ProjectListItem";
import SgCheckInOutCard from "@/components/ui/CheckInOutCard/CheckInOutCard";

export default function employeeDashboard() {
  const { user } = useAuth();
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
    <SgTemplateScreenView head={
      <SgTemplateHeader
          name="Jane Doe"
          role="Employee"
          rating="3.12"
          profileImage={Avatar}
      />
    }>
      <SgCheckInOutGroup>
        <SgCheckInOutCard
            type="checkin"
            title="Check In"
            time=""
            buttonLabel="Check in"
            status={0} // 0: not checked in, 1: waiting, 2: checked in

        />
        <SgCheckInOutCard
            type="checkout"
            title="Check Out"
        />
      </SgCheckInOutGroup>

      <SgCard
          title="Work Time"
          time="18:30 AM"
          icon={Clock}
      />

      <SgCard>
        <Text style={styles.title}>Added Projects</Text>
      </SgCard>

      <View>
        <SgSectionProjectListItem
            title="Unde omnis iste natus error sit"
            staffImages={staffImages}
        />
      </View>
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
