import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import {ActivityIndicator, View} from "react-native";


function RootLayoutNav() {
  const { user, loading } = useAuth();

  // Show a loading indicator while checking authentication state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!user ? (
        // User is not authenticated, show auth screens
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        // User is authenticated, show role-based screens
        user.role === 'employee' ? (
          <Stack.Screen name="employee" options={{ headerShown: false }} />
        ) : user.role === 'timeKeeper' ? (
          <Stack.Screen name="timeKeeper" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="chief" options={{ headerShown: false }} />
        )
      )}
    </Stack>
  );
}

// Wrap the root layout with the AuthProvider
export default function RootLayout() {
  return (
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
  );
}
