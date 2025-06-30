import {
    Dimensions,
    Keyboard, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, StyleSheet, TouchableWithoutFeedback, View
} from "react-native";
import React from "react";
import SafeScreen from "@/components/SafeScreen";
import {StatusBar} from "expo-status-bar";
import COLORS from "@/constants/colors";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SgTemplateScreenView(props) {
    const {head, children} = props;
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    const insets = useSafeAreaInsets();

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
                        {head ?
                            <View style={styles.head}>
                                {head}
                            </View>
                            : null
                        }
                        <View style={[styles.body]}>
                            {children}
                        </View>
                    </ScrollView>
                    <StatusBar hidden={false} style="light" />
                </SafeScreen>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: COLORS.white, flexDirection: 'column', gap: 12, boxSizing: 'border-box'
    }, head: {
        flex: 1
    }, body: {
        flex: 1, padding: 16, gap: 12
    }
});