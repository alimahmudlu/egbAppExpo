import {
    Dimensions,
    Keyboard, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, StyleSheet, TouchableWithoutFeedback, View
} from "react-native";
import React, {useState} from "react";
import SafeScreen from "@/components/SafeScreen";
import {StatusBar} from "expo-status-bar";
import COLORS from "@/constants/colors";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname, useRouter, useLocalSearchParams } from "expo-router";
import {useIsFocused} from "@react-navigation/native";
export default function SgTemplateScreenView(props) {
    const { head, children } = props;
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const params = useLocalSearchParams(); // Burdan refreshKey alınır
    const insets = useSafeAreaInsets();

    const refreshKey = params?.refreshKey || 0; // default 0
    const isFocused = useIsFocused();
    const [remountKey, setRemountKey] = React.useState(0);

    React.useEffect(() => {
        if (isFocused) {
            setRemountKey(prev => prev + 1);
        }
    }, [isFocused]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        if (!pathname) {
            console.warn("Pathname tapılmadı. Refresh dayandırıldı.");
            setRefreshing(false);
            return;
        }

        const newKey = Date.now();

        router.replace({
            pathname,
            params: {
                ...params,
                refreshKey: newKey,
            },
        });

        setRefreshing(false);
    }, [pathname, params]);

    if (!isFocused) return null;
    return (
        <React.Fragment key={remountKey}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeScreen>
                        <ScrollView
                            key={refreshKey} // ⭐️ Refresh burada olur
                            style={styles.container}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            contentInsetAdjustmentBehavior="never"
                        >
                            {head && <View style={styles.head}>{head}</View>}
                            <View style={[styles.body]}>
                                {children}
                            </View>

                        </ScrollView>
                        <StatusBar hidden={false} style="light" />
                    </SafeScreen>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </React.Fragment>
    );
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