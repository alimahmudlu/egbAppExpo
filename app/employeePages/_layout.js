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
                        headerTitle: 'Document Archive',
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
            </Stack>
        </>
    );
}