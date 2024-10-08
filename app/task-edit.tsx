import { useEditTask, useEditTaskActions, useTasks } from "@/hooks/tasks-query"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"

export default function EditTask() {
	const router = useRouter()
	const tasks = useTasks()
	const task = tasks.find((task) => task.id === Number(id))

  const { id } = useLocalSearchParams<{ id: string }>()
	const { title, description } = useEditTask()
	const { onChangeTitle, onChangeDescription, deleteTask } = useEditTaskActions()
  
  const isEditing = id !== undefined

  const DeleteButton = (
		<View>
			<Pressable
				onPress={() => {
					id && deleteTask(Number(id))
				router.back()
				}}
			>
				<Text style={styles.text}>Delete</Text>
			</Pressable>
		</View>
	)

	const SaveButton = (
		<View>
			<Pressable
				onPress={() => {
					router.back()
				}}
			>
				<Text style={styles.text}>Save</Text>
			</Pressable>
		</View>
	)

	return (
		<View>
			<Stack.Screen
				options={{
					title: id ? "Edit task" : "New task",
					headerLeft: () => isEditing && DeleteButton,
					headerRight: () => SaveButton,
				}}
			/>
			<TextInput style={styles.title}
				defaultValue={task?.title ?? ""}
				value={title}
				onChangeText={onChangeTitle}
				placeholder="Title"
			/>
			<TextInput style={styles.description}
				multiline
				defaultValue={task?.description ?? ""}
				value={description}
				onChangeText={onChangeDescription}
				placeholder="Description"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
  title: {
    padding: 20,
    fontSize: 20
  },
  description: {
    padding: 20,
    fontSize: 16
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});