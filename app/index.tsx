import Welcome from '@/components/welcome';
import { View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Welcome />
    </View>
  );
}
