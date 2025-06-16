import { Stack } from "expo-router";
import {useState, useEffect} from "react";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import {ActivityIndicator, View} from "react-native";
import { useFonts } from '@expo-google-fonts/inter/useFonts';
import { Inter_100Thin } from '@expo-google-fonts/inter/100Thin';
import { Inter_200ExtraLight } from '@expo-google-fonts/inter/200ExtraLight';
import { Inter_300Light } from '@expo-google-fonts/inter/300Light';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { Inter_800ExtraBold } from '@expo-google-fonts/inter/800ExtraBold';
import { Inter_900Black } from '@expo-google-fonts/inter/900Black';
import { Inter_100Thin_Italic } from '@expo-google-fonts/inter/100Thin_Italic';
import { Inter_200ExtraLight_Italic } from '@expo-google-fonts/inter/200ExtraLight_Italic';
import { Inter_300Light_Italic } from '@expo-google-fonts/inter/300Light_Italic';
import { Inter_400Regular_Italic } from '@expo-google-fonts/inter/400Regular_Italic';
import { Inter_500Medium_Italic } from '@expo-google-fonts/inter/500Medium_Italic';
import { Inter_600SemiBold_Italic } from '@expo-google-fonts/inter/600SemiBold_Italic';
import { Inter_700Bold_Italic } from '@expo-google-fonts/inter/700Bold_Italic';
import { Inter_800ExtraBold_Italic } from '@expo-google-fonts/inter/800ExtraBold_Italic';
import { Inter_900Black_Italic } from '@expo-google-fonts/inter/900Black_Italic';



function RootLayoutNav() {
  const { user, loading } = useAuth();
  const [screens, setScreens] = useState([]);

    useEffect(() => {
        console.log(user, loading, 'user and loading state in RootLayoutNav');
        setScreens([])
        if (!user) {
            setScreens([<Stack.Screen key="auth" name="auth" options={{ headerShown: false }} />]);
        } else if (user?.role?.id === 1) {
            setScreens([
                <Stack.Screen key="employee" name="(employee)" options={{ headerShown: false }} />,
                <Stack.Screen key="employeePages" name="employeePages" options={{ headerShown: false }} />
            ])
        } else if (user?.role?.id === 2) {
            setScreens([
                <Stack.Screen key="timeKeeper" name="(timeKeeper)" options={{ headerShown: false }} />,
                <Stack.Screen key="timeKeeperPages" name="timeKeeperPages" options={{ headerShown: false }} />
            ])
        } else if (user?.role?.id === 3) {
            setScreens([
                <Stack.Screen key="chief" name="(chief)" options={{ headerShown: false }} />,
                <Stack.Screen key="chiefPages" name="chiefPages" options={{ headerShown: false }} />
            ])
        } else {
            setScreens([<Stack.Screen key="auth" name="(auth)" options={{ headerShown: false }} />])
        }

        console.log(screens, 'screens in RootLayoutNav');
    }, [user]);

    return (
        loading ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
            :
            <Stack screenOptions={{ headerShown: false }}>
                {screens}
            </Stack>
    );
}

// Wrap the root layout with the AuthProvider
export default function RootLayout() {
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
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
  );
  }
}
