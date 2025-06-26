import {Slot, useRouter, usePathname, useSegments} from "expo-router";
import {useEffect, useRef} from "react";
import {AuthProvider, useAuth} from "@/hooks/useAuth";
import {BackHandler, ToastAndroid} from "react-native";
import {useFonts} from '@expo-google-fonts/inter/useFonts';
import {Inter_100Thin} from '@expo-google-fonts/inter/100Thin';
import {Inter_200ExtraLight} from '@expo-google-fonts/inter/200ExtraLight';
import {Inter_300Light} from '@expo-google-fonts/inter/300Light';
import {Inter_400Regular} from '@expo-google-fonts/inter/400Regular';
import {Inter_500Medium} from '@expo-google-fonts/inter/500Medium';
import {Inter_600SemiBold} from '@expo-google-fonts/inter/600SemiBold';
import {Inter_700Bold} from '@expo-google-fonts/inter/700Bold';
import {Inter_800ExtraBold} from '@expo-google-fonts/inter/800ExtraBold';
import {Inter_900Black} from '@expo-google-fonts/inter/900Black';
import {Inter_100Thin_Italic} from '@expo-google-fonts/inter/100Thin_Italic';
import {Inter_200ExtraLight_Italic} from '@expo-google-fonts/inter/200ExtraLight_Italic';
import {Inter_300Light_Italic} from '@expo-google-fonts/inter/300Light_Italic';
import {Inter_400Regular_Italic} from '@expo-google-fonts/inter/400Regular_Italic';
import {Inter_500Medium_Italic} from '@expo-google-fonts/inter/500Medium_Italic';
import {Inter_600SemiBold_Italic} from '@expo-google-fonts/inter/600SemiBold_Italic';
import {Inter_700Bold_Italic} from '@expo-google-fonts/inter/700Bold_Italic';
import {Inter_800ExtraBold_Italic} from '@expo-google-fonts/inter/800ExtraBold_Italic';
import {Inter_900Black_Italic} from '@expo-google-fonts/inter/900Black_Italic';
import {DataProvider} from "@/hooks/useData";
import {SocketProvider} from "@/hooks/useSocket";
import {useInitialRedirect, InitialRedirectProvider} from '@/hooks/useInitialRedirect';
import {LanguageProvider} from "@/hooks/useLanguage";
import {NotificationProvider} from "@/hooks/useNotification";

// Wrap the root layout with the AuthProvider
export default function RootLayout() {
    const router = useRouter();
    const pathname = usePathname();
    const history = useRef([]);
    const backPressCount = useRef(0);
    const backPressTimeout = useRef(null);
    const {initialRedirect, setInitialRedirect} = useInitialRedirect();

    useEffect(() => {
        if (initialRedirect) {
            setInitialRedirect(false); // reset for next time
            return;
        }
        if (history.current[history.current.length - 1] !== pathname) {
            history.current.push(pathname);
        }
    }, [pathname]);

    useEffect(() => {
        const onBackPress = () => {
            if (history.current.length > 2) {
                history.current.pop();
                const prev = history.current[history.current.length - 1];
                router.replace(prev);
                return true;
            } else {
                if (backPressCount.current === 0) {
                    ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
                    backPressCount.current = 1;
                    if (backPressTimeout.current) clearTimeout(backPressTimeout.current);
                    backPressTimeout.current = setTimeout(() => {
                        backPressCount.current = 0;
                    }, 2000);
                    return true;
                } else if (backPressCount.current === 1) {
                    BackHandler.exitApp();
                    return true;
                }
            }
            return false;
        };
        const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => {
            sub.remove();
            if (backPressTimeout.current) clearTimeout(backPressTimeout.current);
        };
    }, []);


    let [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
        Inter_100Thin_Italic,
        Inter_200ExtraLight_Italic,
        Inter_300Light_Italic,
        Inter_400Regular_Italic,
        Inter_500Medium_Italic,
        Inter_600SemiBold_Italic,
        Inter_700Bold_Italic,
        Inter_800ExtraBold_Italic,
        Inter_900Black_Italic
    });
    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <LanguageProvider>
                <InitialRedirectProvider>
                    <AuthProvider>
                        <DataProvider>
                            <NotificationProvider>
                                <SocketProvider>
                                    <Slot/>
                                </SocketProvider>
                            </NotificationProvider>
                        </DataProvider>
                    </AuthProvider>
                </InitialRedirectProvider>
            </LanguageProvider>
        );
    }
}
