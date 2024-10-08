import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function AddNewTask(props: any) {
  const { onPress, title = 'Add Task' } = props;
  return (
      <Pressable style={styles.button} onPress={ () => {router.push('/task-edit')}}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
