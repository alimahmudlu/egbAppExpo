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
                    name="create-task/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'User page',
                        headerShown: false, // Başlığı göstər
                    }}
                />

                <Stack.Screen
                    name="docs/archive/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'Əsas Səhifə',
                        headerShown: false, // Başlığı göstər
                    }}
                />

                <Stack.Screen
                    name="projects/[projectId]/[taskId]/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'Task page',
                        headerShown: false, // Başlığı göstər
                    }}
                />
                <Stack.Screen
                    name="projects/[projectId]/overview/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'Task page',
                        headerShown: false, // Başlığı göstər
                    }}
                />
                <Stack.Screen
                    name="projects/[projectId]/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'Task page',
                        headerShown: false, // Başlığı göstər
                    }}
                />

                <Stack.Screen
                    name="tasks/active/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'User Check In',
                        headerShown: false, // Başlığı göstər
                    }}
                />
                <Stack.Screen
                    name="tasks/completed/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'User Check Out',
                        headerShown: false, // Başlığı göstər
                    }}
                />

                <Stack.Screen
                    name="users/[userId]/tasks/active/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'User Check In',
                        headerShown: false, // Başlığı göstər
                    }}
                />
                <Stack.Screen
                    name="users/[userId]/tasks/completed/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'User Check Out',
                        headerShown: false, // Başlığı göstər
                    }}
                />
                <Stack.Screen
                    name="users/[userId]/index" // faylın adı: index.js
                    options={{
                        headerTitle: 'User Check Out',
                        headerShown: false, // Başlığı göstər
                    }}
                />
            </Stack>
        </>
    );
}