import { useEditTask, useEditTaskActions, useTasks } from "@/hooks/tasks-query"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"

// Route : EditTask
// EditTask retrieves the id from the previous page and fetches the task using that id.
// Using the retrieved task, the title and description are listed.
// The user can edit the title and deswcription.
// Save and Delete options are provided for the user to update and delete the task respectively.

export default function EditTask() {
	const router = useRouter()
	const tasks = useTasks()
  const { id } = useLocalSearchParams<{ id: string }>()
  const { title, description, dueDate } = useEditTask()
	const task = tasks.find((task) => task.id === Number(id))
	const { onChangeTitle, onChangeDescription, onChangeDueDate, saveTask, deleteTask, updateTask } = useEditTaskActions()
  
  const isEditing = id !== undefined

	// Navigation Bar Left Bar Button Item (Conditional)
  const DeleteButton = (
		<View>
			<Pressable style={styles.button}
				onPress={() => {
					id && deleteTask(Number(id))
				router.back()
				}}
			>
				<Text style={styles.text}>Delete</Text>
			</Pressable>
		</View>
	)

	// Navigation Bar Right Bar Button Item
	const SaveButton = (
		<View>
			<Pressable style={styles.button}
				onPress={() => {
          saveTask(Number(id))
					router.back()
				}}
			>
				<Text style={styles.text}>Save</Text>
			</Pressable>
		</View>
	)

	// Navigation Bar Right Bar Button Item
	const UpdateButton = (
		<View>
			<Pressable style={styles.button}
				onPress={() => {
          updateTask(Number(id), title, description, dueDate)
					router.back()
				}}
			>
				<Text style={styles.text}>Update</Text>
			</Pressable>
		</View>
	)

	return (
		<View>
			<Stack.Screen
				options={{
					title: id ? "Edit task" : "Add New task",
					headerLeft: () => isEditing && DeleteButton,
					headerRight: () => isEditing? UpdateButton : SaveButton,
				}}
			/>
			<TextInput style={styles.title}
				defaultValue={task?.title ?? ""}
				value={title}
				onChangeText={onChangeTitle}
				placeholder="Enter Task title here"
			/>
			<TextInput style={styles.description}
				multiline
				defaultValue={task?.description ?? ""}
				value={description}
				onChangeText={onChangeDescription}
				placeholder="Enter Task description here"
			/>
			<TextInput style={styles.description}
				multiline
				defaultValue={task?.dueDate ?? ""}
				value={dueDate}
				onChangeText={onChangeDueDate}
				placeholder="Enter Task Due Date here"
			/>
		</View>
	)
}

// StyleSheet for the task-edit page.
const styles = StyleSheet.create({
  title: {
    padding: 20,
    fontSize: 20
  },
  description: {
    paddingLeft: 20,
		paddingTop: 15,
    fontSize: 16
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  button: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});