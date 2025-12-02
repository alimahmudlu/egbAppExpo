import {router, Stack} from 'expo-router';
import React, {useEffect} from 'react';
import {useAuth} from "@/hooks/useAuth";

export default function TimeKeeperTabLayout() {
    const {isLoggedIn, loading} = useAuth();

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            console.log('not logged in')
            router.replace('/auth')
        }
    }, [isLoggedIn, loading]);

    return (
        <>
            <Stack>
                <Stack.Screen
                    name="docs/archive/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'Əsas Səhifə',
                        headerShown: false, // Başlığı göstər
                    }}
                />
                <Stack.Screen
                    name="users/[userId]/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'User page',
                        headerShown: false, // Başlığı göstər
                    }}
                />
                <Stack.Screen
                    name="users/[userId]/history/checkIn/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'User Check In',
                        headerShown: false, // Başlığı göstər
                    }}
                />
                <Stack.Screen
                    name="users/[userId]/history/checkOut/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'User Check Out',
                        headerShown: false, // Başlığı göstər
                    }}
                />
                <Stack.Screen
                    name="activity/checkIn/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'User Check Out',
                        headerShown: false, // Başlığı göstər
                    }}
                />
                <Stack.Screen
                    name="activity/checkOut/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'User Check Out',
                        headerShown: false, // Başlığı göstər
                    }}
                />
            </Stack>
        </>
    );
}