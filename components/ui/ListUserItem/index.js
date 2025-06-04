import {Image, Pressable, Text, View} from "react-native";
import React from "react";
import styles from "@/components/ui/ListUserItem/styles";

export default function SgListUserItem({ image, title, role, time, date }) {
    return (
        <Pressable style={styles.employeeCardGroup}>
            <View style={styles.avatarContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.avatar} />
                ) : (
                    <Text style={styles.initials}>
                        {title ? title.split(' ').map(n => n[0]).join('') : 'NA'}
                    </Text>
                )}
            </View>
            <View style={styles.employeeInfo}>
                <Text style={styles.employeeName}>{title}</Text>
                <Text style={styles.employeeRole}>{role}</Text>
                <View style={{display: "flex", flexDirection: 'row', alignItems: 'center', gap: 4}}>
                    {date ? <Text style={styles.date}>{date}</Text> : ''}<Text style={styles.checkTime}>Check in:</Text><Text style={styles.time}>{time}</Text>
                </View>
            </View>
        </Pressable>
    )
}