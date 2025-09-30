import {Link, Stack, usePathname, useRouter} from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function NotFoundScreen() {
    const router = useRouter();
    const pathname = usePathname();
  return (
      <>
        <Stack.Screen options={{ title: 'Oops!' }} />
        <View style={styles.container}>
          <Text type="title">{pathname}</Text>
          <Text type="title">This screen does not exist.</Text>
          <Link href="/" style={styles.link}>
            <Text type="link">Go to home screen!</Text>
          </Link>
        </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
