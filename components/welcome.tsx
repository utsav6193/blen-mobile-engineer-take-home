import { Text, View } from 'react-native';

export default function Welcome() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
        Welcome to Senior Mobile Engineer Assessment
      </Text>
      <Text>Follow the instructions in the README.md file.</Text>
    </View>
  );
}
