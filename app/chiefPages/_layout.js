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
                    name="create-task/index"
                    options={{
                        headerTitle: 'User page',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="docs/archive/index"
                    options={{
                        headerTitle: 'Əsas Səhifə',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="projects/[projectId]/[taskId]/index"
                    options={{
                        headerTitle: 'Task page',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="projects/[projectId]/overview/index"
                    options={{
                        headerTitle: 'Task page',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="projects/[projectId]/index"
                    options={{
                        headerTitle: 'Task page',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="reports/[project_id]/index"
                    options={{
                        headerTitle: 'Task page',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="tasks/active/index"
                    options={{
                        headerTitle: 'User Check In',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="tasks/completed/index"
                    options={{
                        headerTitle: 'User Check Out',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="users/[userId]/tasks/active/index"
                    options={{
                        headerTitle: 'User Check In',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="users/[userId]/tasks/completed/index"
                    options={{
                        headerTitle: 'User Check Out',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="users/[userId]/index"
                    options={{
                        headerTitle: 'User Check Out',
                        headerShown: false,
                    }}
                />
            </Stack>
        </>
    );
}