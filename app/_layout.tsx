import AddTask from '@/components/add-task-button';
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
        headerStyle: { backgroundColor: '#10101E' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center'
      }}>
      <Stack.Screen name="index" options={{ headerTitle: 'My Tasks', headerShown: true, headerRight: AddTask}} />
      <Stack.Screen name="task-new" options={{ presentation: 'modal', headerTitle: 'Add New Task', headerShown: true }} />
      <Stack.Screen name="task-detail" options={{ headerTitle: 'Task Details', headerShown: true }} />
      <Stack.Screen name="task-edit" options={{ headerTitle: 'Edit Task', headerShown: true }} />
    </Stack> 
  );  
}
