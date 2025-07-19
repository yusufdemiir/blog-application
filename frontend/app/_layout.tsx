import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="login" options={{ title: 'Giriş' }} />
      <Stack.Screen name="posts" options={{ title: 'Gönderiler' }} />
    </Stack>
  );
}