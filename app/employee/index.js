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
import InfoCircleModalIcon from "@/assets/images/infoCircleModal.svg";
import SgPopup from "@/components/ui/Modal/Modal";
import {useEffect, useState} from "react";
import {useApi} from "@/hooks/useApi";

export default function EmployeeDashboardScreen() {
  const { user } = useAuth();
    const [rejectInfoModal, setRejectInfoModal] = useState(false);
    const [rejectInfoData, setRejectInfoData] = useState("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum");
  const [projectsList, setProjectsList] = useState([]);
  const { request } = useApi();

    function toggleRejectInfoModal() {
      setRejectInfoModal(!rejectInfoModal);
    }

  useEffect(() => {
        request({
          url: '/employee/project/list',
          method: 'get',
        }).then(res => {
          if (res.success) {
            setProjectsList(res?.data);
          } else {
            // Handle error response
            console.log(res.message);
          }
        }).catch(err => {
          console.log(err);
        })
  }, []);


  return (
    <SgTemplateScreenView
      head={
        <SgTemplateHeader
          name={user?.full_name}
          role={user?.role?.name}
          rating="3.12"
          profileImage={Avatar}
        />
      }
    >

      {/*<SgNoticeCard*/}
      {/*    icon={<LoginIcon width={20} height={20} />}*/}
      {/*    title="Check in rejected"*/}
      {/*    buttonText="Reject detail"*/}
      {/*    onClick={toggleRejectInfoModal}*/}
      {/*    bgCard="danger"*/}
      {/*    bgButton="danger"*/}
      {/*/>*/}
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
            time=""
            buttonLabel="Check Out"
            status={0} // 0: not checked in, 1: waiting, 2: checked in
          />
      </SgCheckInOutGroup>

      <SgCard
          title="Work Time"
          time="18:30"
          icon={Clock}
      />

      <SgCard>
        <Text style={styles.title}>Added Projects</Text>
      </SgCard>

      <View style={{gap: 12}}>
        {(projectsList || []).map((project, index) => (
            <SgSectionProjectListItem
                key={index}
                title={project.name}
                staffImages={project?.members?.map(() => "https://randomuser.me/api/portraits/men/1.jpg")}
                id={project.id}
                href={`/employeePages/projects/${project.id}`}
            />
        ))}
      </View>
      <SgPopup
          visible={rejectInfoModal}
          onClose={toggleRejectInfoModal}
          icon={<InfoCircleModalIcon width={56} height={56} />}
      >
        <Text style={styles.rejectModal}>Reject detail</Text>
        <SgCard><Text>{rejectInfoData}</Text></SgCard>
      </SgPopup>
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
  rejectModal: {
    fontFamily: "Inter",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 30,
    marginBottom: 32,
    textAlign: "center",
  },
});
