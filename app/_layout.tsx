import AddNewTask from '@/components/add-task-button';
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
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#00008B' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center'
      }}>
      <Stack.Screen name="index" options={{ headerTitle: 'My Tasks', headerShown: true, headerRight: AddNewTask}} />
      <Stack.Screen name="task-edit" options={{headerShown: true}} />
    </Stack> 
  );  
}
