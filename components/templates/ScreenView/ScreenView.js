import {ScrollView, StyleSheet, View} from "react-native";
import React from "react";
import SafeScreen from "@/components/SafeScreen";
import {StatusBar} from "expo-status-bar";

export default function SgTemplateScreenView(props) {
    const {head, children} = props;

    return (
        <SafeScreen>
            <ScrollView style={styles.container}>
                <View style={styles.head}>
                    {head}
                </View>
                <View style={styles.body}>
                    {children}
                </View>
            </ScrollView>
            {/*<StatusBar hidden={true} style="light" />*/}
        </SafeScreen>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        gap: 12
    },
    head: {
        flex: 1
    },
    body: {
        flex: 1,
        padding: 16,
        gap: 12
    }
});