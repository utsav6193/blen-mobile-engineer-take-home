import AppProviders from '@/providers/app-providers';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigation />
    </AppProviders>
  );
}

function RootNavigation() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
