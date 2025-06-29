import {
    Keyboard, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, StyleSheet, TouchableWithoutFeedback, View
} from "react-native";
import React from "react";
import SafeScreen from "@/components/SafeScreen";
import {StatusBar} from "expo-status-bar";

export default function SgTemplateScreenView(props) {
    const {head, children} = props;
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (

        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeScreen>
                    <ScrollView style={styles.container} refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                        <View style={styles.head}>
                            {head}
                        </View>
                        <View style={styles.body}>
                            {children}
                        </View>
                    </ScrollView>
                    {/*<StatusBar hidden={true} style="light" />*/}
                </SafeScreen>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#FFFFFF', flexDirection: 'column', gap: 12
    }, head: {
        flex: 1
    }, body: {
        flex: 1, padding: 16, gap: 12
    }
});