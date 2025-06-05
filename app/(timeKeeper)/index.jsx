import Avatar from "@/assets/images/avatar.png";
import CheckIn from "@/assets/images/check-in.svg";
import SgSectionEmployeeCard from "@/components/sections/EmployeeCard/EmployeeCard";
import SgSectionInfoCard from "@/components/sections/InfoCard/InfoCard";
import SgSectionProfileBanner from "@/components/sections/ProfileBanner/ProfileBanner";
import SgSectionProjectNameCard from "@/components/sections/ProjectNameCard/ProjectNameCard";
import SgTemplateHeader from "@/components/templates/Header/Header";
import SgCheckInOutGroup from "@/components/ui/CheckInOutGroup/CheckInOutGroup";
import SgFilterTab from "@/components/ui/FilterTab/FilterTab";
import { StyleSheet, View } from "react-native";
import SgSectionMenuCard from "@/components/sections/MenuCard/MenuCard";
import SgSectionLanguageSelector from "@/components/sections/LanguageSelect/LanguageSelect";
import SgSectionDownloadApp from "@/components/sections/DownloadApp/DownloadApp";
import SgSectionProgressBar from "@/components/sections/ProgressBar/ProgressBar";
import SgSectionIconLabel from "@/components/sections/IconLabel/IconLabel";
import ClockCheck from "@/assets/images/clock-check.svg";
import LogIn from "@/assets/images/log-in_20.svg";
import SgInput from "@/components/ui/Input/Input";
import SgSectionStatusCard from "@/components/sections/StatusCard/StatusCard";
import PPT from "@/assets/images/ppt-icon.svg";
import SgSectionAddFile from "@/components/sections/AddFile/AddFile";
import SgSectionStatusInfo from "@/components/sections/StatusInfo/StatusInfo";
import Lang from '@/assets/images/language.svg';
import Notify from '@/assets/images/notification.svg';
import AppInfo from '@/assets/images/appInfo.svg';

export default function Home () {
    const employeeList = [
    { title: 'Jane Doe CI', status: 'checkIn',  role: 'Employee', time: '7:12 AM', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { title: 'John Smith CI', status: 'checkIn',  role: 'Employee', time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { title: 'Ali Veli CI', status: 'checkIn',  role: 'Employee', time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { title: 'John Smith CO', status: 'checkOut',  role: 'Employee', time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { title: 'Ali Veli CO', status: 'checkOut',  role: 'Employee', time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { title: 'John Smith AW', status: 'atWork',  role: 'Employee', time: '7:14 AM', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
    { title: 'Ali Veli AW', status: 'atWork',  role: 'Employee', time: '7:20 AM', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
  ];

  const data = [
  { label: '1-2', value: 14, percentage: 90 },
  { label: '3-4', value: 9, percentage: 70 },
  { label: '5-6', value: 7, percentage: 50 },
  { label: '7-8', value: 11, percentage: 80 },
  { label: '9-10', value: 2, percentage: 20 },
];

 const fileList = [
    {
    id: '1',
    title: 'Unde omnis iste natus error sit',
    datetime: '13.02.2025 / 4:21 PM',
    filename: 'report1.xlsx',
    type: 'ppt',
  },
  {
    id: '2',
    title: 'Unde omnis iste natus error sit',
    datetime: '13.02.2025 / 4:21 PM',
    filename: 'report1.xlsx',
    type: 'xlsx',
  },
  {
    id: '3',
    title: 'Unde omnis iste natus error sit',
    datetime: '13.02.2025 / 4:21 PM',
    filename: 'report2.xlsx',
    type: 'pdf',
  },
  {
    id: '4',
    title: 'Unde omnis iste natus error sit',
    datetime: '13.02.2025 / 4:21 PM',
    filename: 'report3.xlsx',
    type: 'doc',
  },
];

const extraItems = [
  {
    id: 'faq',
    title: 'FAQ',
    icon: Lang,
    onPress: () => console.log('FAQ clicked'),
  },
  {
    id: 'help',
    title: 'Help Center',
    icon: AppInfo,
    onPress: () => console.log('Help clicked'),
  },
];


    return(
    <View style={styles.container}>
        <SgTemplateHeader
            name="Jane Doe"
            role="Time Keeper"
            profileImage={Avatar}
        />

        {/* <SgSectionProfileBanner
        image={Avatar} 
        name="Jane Doe"
        role="Time Keeper"
        onLogout={() => alert('Logged out')}
      /> */}

       <SgSectionMenuCard extraItems={extraItems} />;

       {/* <SgSectionDownloadApp
            version="2.44.9"
            title="Tətbiqi aşağıdakı platformalarda qiymətləndirin"
            platforms={['android', 'ios']}
        /> */}


        {/* <SgSectionLanguageSelector /> */}

        {/* <SgCheckInOutGroup>
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
        </SgCheckInOutGroup> */}
        {/* <SgSectionInfoCard
                title="Daily check in"
                count={32}
                customIcon={CheckIn}
            /> */}
        {/* <SgFilterTab
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
                        employeeList?.filter(el => el.status === 'checkIn').map((emp, index) => (
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
                        employeeList?.filter(el => el.status === 'checkOut').map((emp, index) => (
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
                        employeeList?.filter(el => el.status === 'atWork').map((emp, index) => (
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
        /> */}

        {/* {employeeList.map((emp, index) => (
        <SgSectionEmployeeCard
          key={index}
          title={emp.title}
          role={emp.role}
          time={emp.time}
          image={emp.image}
        />
      ))} */}

      {/* <SgSectionProjectNameCard
        title="Project name"
        description="There are many variations of passages of Lorem Ipsum available"
      /> */}

      {/* <View >
      {data.map((item, index) => (
        <SgSectionProgressBar
          key={index}
          label={item.label}
          value={item.value}
          percentage={item.percentage}
        />
      ))}
    </View> */}

    {/* <SgSectionIconLabel
        icon={<ClockCheck width={20} height={20} />}
        title="View activities"
      /> */}


    {/* <View style={{ flexDirection: 'row', gap: 12, alignItems: 'stretch'}}>
      <View style={{ flex: 1, }}>
      <SgSectionStatusCard
        title="Check In"
        time="7:12 AM"
        icon={<LogIn width={20} height={20} />}
      />
      </View>
      <View style={{ flex: 1 }}>
      <SgSectionStatusCard
        location="https://www.centurytrails.in/images/plans/century-trails-location-map.webp"
        title="Check In"
        time="7:12 AM"
        icon={<LogIn width={20} height={20} />}
      />
      </View>
    </View> */}

    {/* <SgInput
        placeholder="Reject detail..."
        type="textarea"
    /> */}



    {/* {fileList.map(file => (
    <SgSectionAddFile
        key={file.id}
        title={file.title}
        type={file.type}
        datetime={file.datetime}
        onPress={() => console.log(file.filename)}
    />
    ))} */}



    {/* <SgSectionStatusInfo 
        title="Progress"
        status="Complete"
        statusType="success"
    />
    <SgSectionStatusInfo 
        title="Progress"
        status="Check Progress"
        statusType="warning"
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
        },
        menuContainer: {
            marginHorizontal: 20,
            marginTop: 10,
            backgroundColor: '#F7F7F7',
            borderRadius: 16,
            padding: 10,
        },
    });
    