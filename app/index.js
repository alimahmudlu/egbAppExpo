import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import {useAuth} from "@/hooks/useAuth";
import {ActivityIndicator, View} from "react-native";

export default function Index() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        if (!user?.role?.id) {
            router.replace('/auth');
        } else if (user?.role?.id === 1) {
            router.replace('/employee');
        } else if (user?.role?.id === 2) {
            router.replace('/timeKeeper');
        } else {
            router.replace('/chief');
        }
    }, [user?.role.id, loading]);

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007BFF" />
    </View>;
}
