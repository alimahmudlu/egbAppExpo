import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import {useAuth} from "@/hooks/useAuth";
import {ActivityIndicator, View} from "react-native";
import {registerForPushNotificationsAsync} from "@/utils/notification";
import {useApi} from "@/hooks/useApi";
import { useInitialRedirect } from '@/hooks/useInitialRedirect';

export default function Index() {
    const { user, loading } = useAuth();
    const {request} = useApi();
    const router = useRouter();
    const { setInitialRedirect } = useInitialRedirect(); // custom hook/context


    useEffect(() => {
        if (loading) return;

        if (user?.id) {
            console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPPPPPPPPPPPPPPPPPPPPPPAAAAAAAAAAAAAAAAAAAAAAAACCCCCCCC',
                user?.id, router)
        }

        if (!user?.role?.id) {
            setInitialRedirect(true);
            router.replace('/auth');
        }
        else {

            if (user?.role?.id === 1) {
                setInitialRedirect(true);
                router.replace('/employee');
            } else if (user?.role?.id === 2) {
                setInitialRedirect(true);
                router.replace('/timeKeeper');
            } else {
                setInitialRedirect(true);
                router.replace('/chief');
            }
        }
    }, [user?.role.id, loading]);

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007BFF" />
    </View>;
}
